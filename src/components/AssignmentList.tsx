"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import type { Assignment } from "../../types/assignments";
import { createClient } from "@supabase/supabase-js";
import { toast } from 'sonner';
import { useSession } from "next-auth/react";

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
    if (!session?.user?.id || !selectedAssignment) return;

    try {
      const { data, error } = await supabase
        .from('current_assignments')
        .insert({
          user_id: session.user.id,
          assignment_id: selectedAssignment.id,
          access_key: localStorage.getItem("canvasKey"),
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ready to lock in?</DialogTitle>
            <DialogDescription>
              {selectedAssignment ? (
                <>
                  <p className="mb-1">
                    <strong>Assignment:</strong> {selectedAssignment.name}
                  </p>
                  <p className="mb-1">
                    <strong>Course:</strong> {selectedAssignment.course}
                  </p>
                  <p>
                    <strong>Due:</strong>{" "}
                    {new Date(selectedAssignment.due_date).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm ">
                    Your block rules will go into effect when you click "Yes".
                  </p>
                </>
              ) : (
                <p>No assignment selected.</p>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={async () => {
                await lockOut();
                toast("Rules locked in for this assignment!");
                setOpen(false);
              }}
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast("Action canceled");
                setOpen(false);
              }}
              className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

