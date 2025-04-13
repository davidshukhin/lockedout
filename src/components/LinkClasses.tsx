

"use client";

import { useState, useEffect } from 'react';
import { useAssignmentStore } from "stores/assignmentStore";
import { api } from "~/trpc/react";
import CanvasWalkthrough from './CanvasWalkthrough';
export function LinkClasses() {
  const [canvasKey, setCanvasKey] = useState("");
  const [canvasLinked, setCanvasLinked] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const setAssignments = useAssignmentStore((state) => state.setAssignments);
  const saveKey = api.canvas.saveKey.useMutation({
    onSuccess(data) {
      setAssignments(data);
      setCanvasLinked(true);
      setShowInput(false);
    },
  });

  useEffect(() => {
    const existingKey = localStorage.getItem("canvasKey");
    if (existingKey) {
      setCanvasKey(existingKey);
      saveKey.mutate({ canvasKey: existingKey });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("canvasKey", canvasKey);
    saveKey.mutate({ canvasKey });
  };

  return (
    <div className="w-full">
      <CanvasWalkthrough />
      {!canvasLinked || showInput ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="canvasKey" className="text-lg font-semibold text-white">
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
            {canvasLinked ? "Replace Key" : "Save Key"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-green-400 font-semibold">Canvas successfully linked ✅</p>
          <button
            onClick={() => setShowInput(true)}
            className="text-sm text-white underline hover:text-gray-300"
          >
            Replace Canvas Key
          </button>
        </div>
      )}
    </div>
  );
}

