// src/components/AssignmentList.tsx
"use client";

import type { Assignment } from "../../types/assignments";

interface AssignmentListProps {
  title?: string;
  assignments: Assignment[];
}

export function AssignmentList({ title, assignments }: AssignmentListProps) {
  if (assignments.length === 0) return null;

  return (
    <div className="w-full max-w-3xl">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      <ul className="space-y-3">
        {assignments.map((assignment, i) => (
          <li
            key={`${assignment.name}-${i}`}
            className="rounded-md bg-white/10 px-4 py-3 text-white shadow"
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
    </div>
  );
}
