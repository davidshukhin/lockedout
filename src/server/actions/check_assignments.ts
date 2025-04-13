import { supabase } from "~/server/db/index";
import type { Assignment } from "types/assignments";
import { getServerSession } from "next-auth/next";
import { authConfig } from "~/server/auth/config";
import { fetchHTTPResponse } from "node_modules/@trpc/client/dist/links/internals/httpUtils";

const CURRENT_TERM: number = 4710; // Set your desired current term here
const CANVAS_API_URL: string = "https://umd.instructure.com/api/v1"; // Canvas API base URL for UMD

type CurrentAssignmentRow = {
  course_id: number
  assignment_id: number
}

/**
 * Fetches the list of current assignments for a user
 * @param userId The user's ID
 * @returns Array of tuples with [assignment_id, course_id]
 */
async function fetchUserAssignments(userId: string): Promise<[number, number][]> {
  const { data, error } = await supabase
    .from("current_assignments")
    .select("assignment_id, course_id")
    .eq("access_key", userId)
    .lte("scheduled_time", new Date().toISOString());

  if (error || !data) {
    console.error("Error fetching assignments:", error);
    return [];
  }

  // Tell TS: "Trust me, this is an array of CurrentAssignmentRow"
  const rows = data as CurrentAssignmentRow[];

  // Now map into the tuple shape you want
  return rows.map(
    ({ assignment_id, course_id }) =>
      [assignment_id, course_id] as [number, number]
  );
}

/**
 * Checks if an assignment has been submitted
 * @param courseId Course ID
 * @param assignmentId Assignment ID
 * @returns True if the assignment has been submitted, false otherwise
 */
async function fetchHasSubmitted(
  courseId: number,
  assignmentId: number,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${CANVAS_API_URL}/courses/${courseId}/assignments/${assignmentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`Canvas API error ${res.status}: ${body}`);
      return false; // Assume not submitted if API error
    }

    // Only pull out the one field you care about
    const { has_submitted_submissions } = (await res.json()) as {
      has_submitted_submissions: boolean;
    };
    return has_submitted_submissions;
  } catch (error) {
    console.error("Error checking submission status:", error);
    return false; // Assume not submitted if there's an error
  }
}

/**
 * Checks if the user has any active assignments
 * @returns true if all assignments are submitted, false if there are pending assignments
 */
export async function checkAssignments(): Promise<boolean> {
  // Get the user's session
  const session = await getServerSession(authConfig);
  if (!session || !session.user || !session.user.id) {
    console.error("No active user session");
    return true; // Assume all assignments are submitted if not logged in (don't block)
  }

  const userId = session.user.id;
  const user_assignments = await fetchUserAssignments(userId);
  
  console.log(`Found ${user_assignments.length} assignments for user ${userId}`);
  
  if (user_assignments.length === 0) {
    console.log("No assignments found - don't need to block");
    return true; // No assignments to check, so all are "completed"
  }
  
  let allSubmitted = true;
  
  for (const assignment of user_assignments) {
    const hasSubmitted = await fetchHasSubmitted(assignment[1], assignment[0]);
    console.log(`Assignment ${assignment[0]} in course ${assignment[1]}: submitted = ${hasSubmitted}`);
    
    if (hasSubmitted) {
      const { data, error } = await supabase
        .from("current_assignments")
        .delete()
        .match({
          assignment_id: assignment[0],
          course_id: assignment[1],
          access_key: userId
        });
      
      if (error) {
        console.error("Error deleting assignment:", error);
      } else {
        console.log(`Removed submitted assignment ${assignment[0]} from database`);
      }
    } else {
      // If any assignment is not submitted, we need to block
      allSubmitted = false;
    }
  }
  
  // If we get here and allSubmitted is still true, all assignments have been submitted
  // Return true = all submitted, false = some pending
  return allSubmitted;
}
  