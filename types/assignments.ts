export type Assignment = {
  name: string;
  due_date: string;
  course: string;
  id: number;
  course_id: number;
  assignment_id?: number; // For current assignments table
}
