// stores/assignmentStore.ts
import { create } from "zustand";
import type { Assignment } from "../types/assignments";

type AssignmentState = {
  assignments: Assignment[];
  isLoading: boolean;
  error: string | null;
  setAssignments: (data: Assignment[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  isLoading: true,
  error: null,
  setAssignments: (data) => set({ assignments: data, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}));
