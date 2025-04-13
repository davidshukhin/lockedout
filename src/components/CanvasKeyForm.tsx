
"use client";

import { useEffect, useState } from "react";
import { AssignmentList } from "./AssignmentList";
import { useAssignmentStore } from "stores/assignmentStore";

export function CanvasKeyForm() {
  const assignments = useAssignmentStore((state) => state.assignments);
  const [hasCanvasKey, setHasCanvasKey] = useState<boolean>(false);

  useEffect(() => {
    const existingKey = localStorage.getItem("canvasKey");
    setHasCanvasKey(!!existingKey);
  }, []);

  return (
    <div className="w-full">
      {hasCanvasKey ? (
        assignments.length > 0 ? (
          <AssignmentList title="Upcoming Assignments" assignments={assignments} />
        ) : (
          <p className="text-white text-lg font-medium mt-4">
            You have no upcoming assignments.
          </p>
        )
      ) : (
        <p className="text-white text-lg font-medium mt-4">
          Please link your Canvas account to view assignments.
        </p>
      )}
    </div>
  );
}

