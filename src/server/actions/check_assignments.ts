import { supabase } from "~/server/db/index";
import { auth } from "~/server/auth";
import type { Assignment } from "types/assignments";
import { useSession } from "next-auth/react"
import { fetchHTTPResponse } from "node_modules/@trpc/client/dist/links/internals/httpUtils";
const CURRENT_TERM: number = 4710; // Set your desired current term here
const CANVAS_API_URL: string = "https://umd.instructure.com/api/v1"; // Canvas API base URL for UMD

const { data : session } = useSession();

type CurrentAssignmentRow = {
    course_id:     number
    assignment_id: number
  }

  async function fetchUserAssignments(): Promise<[number, number][]> {
    const { data, error } = await supabase
      .from("current_assignments")
      .select("assignment_id, course_id")
      .eq("access_key", session?.user?.id)
      .lte("scheduled_time", new Date().toISOString()); 

  
    if (error || !data) {
      console.error("Error fetching assignments:", error);
      return [];
    }
  
    // Tell TS: “Trust me, this is an array of CurrentAssignmentRow”
    const rows = data as CurrentAssignmentRow[];
  
    // Now map into the tuple shape you want
    return rows.map(
      ({ assignment_id, course_id }) =>
        [assignment_id, course_id] as [number, number]
    );
  }

  async function fetchHasSubmitted(
    courseId:     number,
    assignmentId: number,
    //canvasToken:  string
  ): Promise<boolean> {
    const res = await fetch(
      `${CANVAS_API_URL}/courses/${courseId}/assignments/${assignmentId}`,
      {
        headers: {
          //'Authorization': `Bearer ${canvasToken}`,
          'Content-Type':  'application/json',
        },
      }
    );
  
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Canvas API error ${res.status}: ${body}`);
    }
  
    // Only pull out the one field you care about
    const { has_submitted_submissions } = (await res.json()) as {
      has_submitted_submissions: boolean;
    };
    return has_submitted_submissions;
  }
  

export async function checkAssignments() : Promise<boolean>{
    const user_assignments = await fetchUserAssignments();
    for (const assignment of user_assignments){
        if (await fetchHasSubmitted(assignment[1], assignment[0])){
            const { data, error } = await supabase
            .from("current_assignments")
            .delete()
            .match({
            assignment_id: assignment[0],
            course_id:     assignment[1],
            access_key:    session?.user?.id
            })
        }
    }
    const remaining = await fetchUserAssignments();
    return remaining.length === 0;
}
  