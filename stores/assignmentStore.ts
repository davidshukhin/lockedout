// stores/assignmentStore.ts
import { create } from "zustand";
import type { Assignment } from "../types/assignments";

type AssignmentState = {
  assignments: Assignment[];
  setAssignments: (data: Assignment[]) => void;
};

export const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  setAssignments: (data) => set({ assignments: data }),
}));
