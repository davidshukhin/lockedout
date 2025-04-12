// src/components/CanvasKeyForm.tsx
"use client";

import { useState } from "react";
import type { Assignment } from "../../types/assignments";
import { saveCanvasKey } from "~/server/actions/canvas";
export function CanvasKeyForm() {
  const [canvasKey, setCanvasKey] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/canvas/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ canvasKey }),
    });

    const data = await res.json();
    setAssignments(data); // assuming this is an array of assignments
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" action={async (formData) => {
      "use server";
      const canvasKey = formData.get("canvasKey")?.toString();
      if (canvasKey && canvasKey !== "canvasKey") {
        const data = await saveCanvasKey(canvasKey);
        setAssignments(data)

      }
    }}
    >
      <label htmlFor="canvasKey" className="text-lg font-semibold">
        Canvas Access Key
      </label>
      <input
        type="password"
        id="canvasKey"
        name="canvasKey"
        placeholder="Enter your Canvas access key"
        className="rounded-lg bg-white/10 px-4 py-2 text-white"
        value={canvasKey}
        onChange={(e) => setCanvasKey(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-full bg-[hsl(280,100%,70%)] px-6 py-2 font-semibold text-black"
      >
        Save Key
      </button>

      {assignments.length > 0 && (
        <ul className="mt-4 space-y-2">
          {assignments.map((a, i) => (
            <li key={i} className="text-sm">
              ✅ {a.name} — due {new Date(a.due_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
