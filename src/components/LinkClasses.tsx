"use client";

import { useState, useEffect } from 'react';
import { useAssignmentStore } from "stores/assignmentStore";
import { api } from "~/trpc/react";
import CanvasWalkthrough from './CanvasWalkthrough';
export function LinkClasses() {
  const [canvasKey, setCanvasKey] = useState("");
  const [canvasLinked, setCanvasLinked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setAssignments = useAssignmentStore((state) => state.setAssignments);
  const saveKey = api.canvas.saveKey.useMutation({
    onSuccess(data) {
      setAssignments(data);
      setCanvasLinked(true);
      setShowInput(false);
      setIsLoading(false);
    },
    onError() {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    const existingKey = localStorage.getItem("canvasKey");
    if (existingKey) {
      setIsLoading(true);
      setCanvasKey(existingKey);
      saveKey.mutate({ canvasKey: existingKey }, {
        onSettled: () => setIsLoading(false)
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem("canvasKey", canvasKey);
    saveKey.mutate({ canvasKey });
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : !canvasLinked || showInput ? (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
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
              disabled={isLoading || !canvasKey.trim()}
              className={`rounded-full px-6 py-2 font-semibold text-black transition-all duration-200 ${
                isLoading 
                  ? "bg-[hsl(280,70%,70%)] cursor-not-allowed"
                  : "bg-[hsl(280,100%,70%)] hover:bg-[hsl(280,100%,65%)] active:bg-[hsl(280,100%,60%)]"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                canvasLinked ? "Replace Key" : "Save Key"
              )}
            </button>
          </form>
          <CanvasWalkthrough />
        </div>
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

