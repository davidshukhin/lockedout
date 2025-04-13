
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function AssignmentList({ title, assignments }: AssignmentListProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [blockRules, setBlockRules] = useState<BlockRule[]>([]);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (open && session?.user?.id) {
      console.log("Fetching block rules for user", session.user.id);

      supabase
        .from("user_blocklists")
        .select("*")
        .eq("user_id", session.user.id)
        .then(({ data, error }) => {
          if (error) {
            toast("Failed to fetch block rules");
            console.error(error);
          } else {
            console.log("Fetched block rules:", data);
            setBlockRules(data ?? []);
          }
        });
    }
  }, [open, session?.user?.id]);



  return (
    <div className="w-full">
      {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment, i) => (
          <li
            key={`${assignment.name}-${i}`}
            className="cursor-pointer rounded-md bg-white/10 px-4 py-3 text-white shadow hover:bg-white/20 transition"
            onClick={() => {
              setSelectedAssignment(assignment);
              setOpen(true);
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="font-medium">{assignment.name}</div>
              <div className="text-sm text-white/70">
                Due: {new Date(assignment.due_date).toLocaleString()}
              </div>
            </div>
            <div className="text-sm text-white/50">Course: {assignment.course}</div>
          </li>
        ))}
      </ul>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ready to lock in?</DialogTitle>
            <DialogDescription>
              Your blocked rules will go into effect.
            </DialogDescription>
          </DialogHeader>


          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => {
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

