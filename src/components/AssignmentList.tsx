"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog"
import type { Assignment } from "../../types/assignments";
import { createClient } from "@supabase/supabase-js";
import { toast } from 'sonner';
import { useSession } from "next-auth/react";
import { Calendar } from "~/components/ui/calendar";
//ximport { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { TimePicker } from "./ui/time-picker";
import { Label } from "~/components/ui/label";

const supabase = createClient(
  'https://rskjrsazcyckwkeoxcch.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza2pyc2F6Y3lja3drZW94Y2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MzYzNzksImV4cCI6MjA2MDAxMjM3OX0.0Ic91nz833pqSsg3h_NgpRlX6csaMyVFD9cIMEwBHek'
);

interface BlockRule {
  id: string;
  name: string;
  description?: string;
}

interface AssignmentListProps {
  title?: string;
  assignments: Assignment[];
}

interface CurrentAssignment extends Assignment {
  assignment_id: number;
  user_id: string;
  access_key: string;
}

const LoadingAssignmentCard = () => (
  <div className="rounded-md px-4 py-3 shadow bg-white/10">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="h-6 bg-white/20 rounded w-2/3 mb-2 sm:mb-0"></div>
      <div className="h-5 bg-white/20 rounded w-1/3"></div>
    </div>
    <div className="h-4 bg-white/20 rounded w-1/4 mt-2"></div>
  </div>
);

export function AssignmentList({ title, assignments }: AssignmentListProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>();
  const [blockRules, setBlockRules] = useState<BlockRule[]>([]);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [currentAssignments, setCurrentAssignments] = useState<CurrentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const checkBlocks = async () => {
      if (status !== 'authenticated' || !session?.user?.id) {
        if (status !== 'loading') {
          setLoading(false);
          setInitialized(true);
        }
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("current_assignments")
          .select("*")
          .eq("user_id", session.user.id);
          
        if (error) {
          console.error('Error fetching current assignments:', error);
          return;
        }
        
        setCurrentAssignments(data as CurrentAssignment[]);
      } catch (err) {
        console.error('Error fetching current assignments:', err);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    checkBlocks();
  }, [session?.user?.id, status]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (open && session?.user?.id) {
      const fetchBlockRules = async () => {
        try {
          const { data, error } = await supabase
            .from("user_blocklists")
            .select("*")
            .eq("user_id", session.user.id);

          if (error) {
            toast("Failed to fetch block rules");
            console.error(error);
            return;
          }

          setBlockRules(data ?? []);
        } catch (err) {
          console.error('Error fetching block rules:', err);
        }
      };

      fetchBlockRules();
    }
  }, [open, session?.user?.id]);

  const lockOut = async () => {
    if (!date || !time) {
      toast("Please select both date and time");
      return;
    }

    // Validate time
    const hours = time.getHours();
    const minutes = time.getMinutes();
    
    if (hours > 12 || minutes > 59) {
      toast("Invalid time selected. Please choose a valid time.");
      return;
    }

    // Combine date and time
    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(time.getHours());
    scheduledDateTime.setMinutes(time.getMinutes());

    // Adjust for timezone offset
    const timezoneOffset = scheduledDateTime.getTimezoneOffset();
    scheduledDateTime.setMinutes(scheduledDateTime.getMinutes() - timezoneOffset);

    if (!session?.user?.id || !selectedAssignment) return;

    try {
      const { data, error } = await supabase
        .from('current_assignments')
        .insert({
          user_id: session.user.id,
          assignment_id: selectedAssignment.id,
        course_id: selectedAssignment?.course_id,
       
          access_key: localStorage.getItem("canvasKey"),
        scheduled_time: scheduledDateTime.toISOString(),
          course_id: selectedAssignment.course_id
        })
        .select();

      if (error) {
        toast.error("Failed to lock assignment");
        return;
      }

      setCurrentAssignments(prev => [...prev, data[0] as CurrentAssignment]);
    } catch (err) {
      console.error('Error locking assignment:', err);
      toast.error("Failed to lock assignment");
    }
  };

  // Show loading state while data is being fetched or assignments aren't available yet
  if (!initialized || status === 'loading' || loading) {
    return (
      <div className="w-full space-y-6">
        {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <LoadingAssignmentCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If there are no assignments, show a message
  if (!assignments || assignments.length === 0) {
    return (
      <div className="w-full">
        {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
        <div className="text-center py-8">
          <p className="text-white/70 text-lg">No upcoming assignments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment, i) => {
          const isCurrent = currentAssignments.some(
            (a) => a.assignment_id === assignment.id || a.id === assignment.id
          );

          return (
            <li
              key={`${assignment.name}-${i}`}
              className={`rounded-md px-4 py-3 shadow transition ${
                isCurrent
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "cursor-pointer bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => {
                if (!isCurrent) {
                  setSelectedAssignment(assignment);
                  setOpen(true);
                  setDate(new Date());
                  setTime(new Date());
                }
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="font-medium">{assignment.name}</div>
                <div className="text-sm text-white/70">
                  Due: {new Date(assignment.due_date).toLocaleString()}
                </div>
              </div>

              <div className="text-sm text-white/50">
                Course: {assignment.course.split("-")[0]}
              </div>
            </li>
          );
        })}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[280px] p-6 mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Ready to lock in?</DialogTitle>
            <p className="text-sm text-muted-foreground text-center">
              Choose what time to initiate block
            </p>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label className="text-center">Date</Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-center">Time</Label>
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (!date) return;
                      const newTime = time ? new Date(time) : new Date();
                      newTime.setHours(newTime.getHours() + 1);
                      setTime(newTime);
                    }}
                  >
                    ↑
                  </Button>
                  <div className="text-2xl font-mono">
                    {(time?.getHours() ?? 0).toString().padStart(2, '0')}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (!date) return;
                      const newTime = time ? new Date(time) : new Date();
                      newTime.setHours(newTime.getHours() - 1);
                      setTime(newTime);
                    }}
                  >
                    ↓
                  </Button>
                </div>
                <div className="text-2xl">:</div>
                <div className="flex flex-col items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (!date) return;
                      const newTime = time ? new Date(time) : new Date();
                      const currentMinutes = newTime.getMinutes();
                      newTime.setMinutes(Math.ceil(currentMinutes / 5) * 5 + 5);
                      setTime(newTime);
                    }}
                  >
                    ↑
                  </Button>
                  <div className="text-2xl font-mono">
                    {(time?.getMinutes() ?? 0).toString().padStart(2, '0')}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (!date) return;
                      const newTime = time ? new Date(time) : new Date();
                      const currentMinutes = newTime.getMinutes();
                      newTime.setMinutes(Math.floor(currentMinutes / 5) * 5 - 5);
                      setTime(newTime);
                    }}
                  >
                    ↓
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div 
          className="flex flex-col justify-center items-center gap-4">
          <DialogFooter className="mt-6 flex-col justify-cente items-center gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={lockOut}>Confirm</Button>
          </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

