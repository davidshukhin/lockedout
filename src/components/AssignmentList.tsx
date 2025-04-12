
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

  useEffect(() => {
    if (open && blockRules.length === 0) {
      supabase
        .from("block_rules")
        .select("*")
        .then(({ data, error }) => {
          if (error) {
            toast("set websites to block");
          } else {
            setBlockRules(data ?? []);
          }
        });
    }
  }, [open]);

  return (
    <div className="w-full max-w-3xl">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      <ul className="space-y-3">
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
            <DialogTitle>Assign Block Rule</DialogTitle>
            <DialogDescription>
              Select a rule for <strong>{selectedAssignment?.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            {blockRules.map(rule => (
              <button
                key={rule.id}
                className="rounded border border-gray-300 px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  // Save logic here
                  toast("Time to lock in")

                  setOpen(false);
                }}
              >
                <div className="font-medium">{rule.name}</div>
                {rule.description && (
                  <div className="text-sm text-gray-500">{rule.description}</div>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

