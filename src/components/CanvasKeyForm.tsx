// src/components/CanvasKeyForm.tsx
"use client";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import type { Assignment } from "../../types/assignments";
import { saveCanvasKey } from "~/server/actions/canvas";
import { AssignmentList } from "./AssignmentList";
export function CanvasKeyForm() {
  const [canvasKey, setCanvasKey] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [linkedCanvas, setLinkedCanvas] = useState<boolean>(false);
  useEffect(() => {
    const canvasKey = localStorage.getItem("canvasKey");
    if (canvasKey) {
      setLinkedCanvas(true);
    }

  }, [canvasKey])

  const saveKey = api.canvas.saveKey.useMutation({
    onSuccess(data) {
      setAssignments(data); // make sure your mutation returns Assignment[]
    }
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveKey.mutate({ canvasKey });
  }
  {/*
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveKey.mutate({ canvasKey });
    console.log("called canvas/save")
    const res = await fetch("/api/canvas/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ canvasKey }),
    });

    const data = await res.json();
    console.log(data.unsubmittedAssignments)
    setAssignments(data.unsubmittedAssignments); // assuming this is an array of assignments
  }
  */}

  return (<>
    {
      linkedCanvas ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
          {/*action={async (formData) => {
      "use server";
      const canvasKey = formData.get("canvasKey")?.toString();
      if (canvasKey && canvasKey !== "canvasKey") {
        const data = await saveCanvasKey(canvasKey);
        setAssignments(data)

      }
    }}*/}

          < label htmlFor="canvasKey" className="text-lg font-semibold" >
            Canvas Access Key
          </label>
          <input
            type="password"
            id="canvasKey"
            name="canvasKey"
            placeholder="Enter your Canvas access key"
            className="rounded-lg bg-white/10 px-4 py-2 text-white"
            value={canvasKey}
            onChange={(e) => {
              setCanvasKey(e.target.value)
              localStorage.setItem("canvasKey", e.target.value);
            }}
          />
          <button
            type="submit"
            className="rounded-full bg-[hsl(280,100%,70%)] px-6 py-2 font-semibold text-black"
          >
            Save Key
          </button>
          <div>
            <AssignmentList title="upcoming assignments" assignments={assignments} />
          </div></form >
      ) : (
        <AssignmentList title="upcoming assignmnets" assignments={assignments} />
      )
    }</>
  );

}
