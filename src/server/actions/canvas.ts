"use server";

import { supabase } from "~/server/db";
import { auth } from "~/server/auth";
import type { Assignment } from "types/assignments";
const CURRENT_TERM: number = 4713; // Set your desired current term here
const CANVAS_API_URL: string = "https://umd.instructure.com/api/v1"; // Canvas API base URL for UMD

/**
 * Retrieve all active courses for the user and filter by the current term.
 * @param headers HTTP headers including authorization
 */
export async function getCourses(headers: HeadersInit): Promise<any[]> {
  const initialUrl = `${CANVAS_API_URL}/courses?enrollment_state=active&per_page=100`;
  let courses: any[] = [];

  try {
    let response = await fetch(initialUrl, { headers });
    if (!response.ok) {
      console.error("Error fetching courses:", response.status, await response.text());
      return courses;
    }

    courses = courses.concat(await response.json());

    // Handle pagination if more courses are available.
    let linkHeader = response.headers.get("link");
    while (linkHeader) {
      const links = parseLinkHeader(linkHeader);
      if (!links["next"]) break;
      const nextUrl = links["next"];
      response = await fetch(nextUrl, { headers });
      try {
        courses = courses.concat(await response.json());
      } catch (e) {
        console.error("Error parsing JSON on pagination for courses:", e);
        break;
      }
      linkHeader = response.headers.get("link");
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  // Filter courses based on the current term.
  const filteredCourses = courses.filter(course => course.enrollment_term_id === CURRENT_TERM);
  return filteredCourses;
}

export async function saveCanvasKey(canvasKey: string) {
  const session = await auth();
  console.log(session?.user.id)
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  await supabase.from("canvas_tokens").upsert({
    user_id: session.user.id,
    access_token: canvasKey,
  });


  /**
   * Retrieve all assignments for a given course.
   * Includes submission details in the response.
   * @param headers HTTP headers including authorization
   * @param courseId The ID of the course to retrieve assignments for.
   */
  async function getAssignments(headers: HeadersInit, courseId: number): Promise<any[]> {
    const initialUrl = `${CANVAS_API_URL}/courses/${courseId}/assignments?include[]=submission&include[]=all_dates&per_page=100`;
    let assignments: any[] = [];
    try {
      let response = await fetch(initialUrl, { headers });
      if (!response.ok) {
        console.error(
          `Error fetching assignments for course ${courseId}:`,
          response.status,
          await response.text()
        );
        return assignments;
      }

      assignments = assignments.concat(await response.json());

      // Handle pagination for assignments.
      let linkHeader = response.headers.get("link");
      while (linkHeader) {
        const links = parseLinkHeader(linkHeader);
        if (!links["next"]) break;
        const nextUrl = links["next"];
        response = await fetch(nextUrl, { headers });
        try {
          assignments = assignments.concat(await response.json());
        } catch (e) {
          console.error("Error parsing JSON on pagination for assignments:", e);
          break;
        }
        linkHeader = response.headers.get("link");
      }
    } catch (error) {
      console.error(`Error fetching assignments for course ${courseId}:`, error);
    }
    return assignments;
  }

  /**
   * Retrieve user information including courses and their assignments.
   * Splits assignments into submitted and unsubmitted.
   * @param accessToken The access token used for API authentication.
   */
  async function getUserInfo(accessToken: string) {
    // HTTP headers for authentication.
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
    };

    const courses = await getCourses(headers);
    if (!courses.length) {
      console.log("No courses found for term:", CURRENT_TERM);

    }

    const submitted: Assignment[] = [];
    const unsubmitted: Assignment[] = [];

    for (const course of courses) {
      const courseId: number = course.id;
      const courseName: string = course.name;
      //console.log(`\nCourse: ${courseName} (ID: ${courseId})`);

      const assignments = await getAssignments(headers, courseId);
      let submittedAssignments: Assignment[] = [];
      let unsubmittedAssignments: Assignment[] = [];

      if (!assignments.length) {
        console.log("  No assignments found.");
      } else {
        // Filter assignments for published ones with val
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 7);

        const filteredAssignments = assignments.filter((assignment: any) =>
          assignment.published &&
          assignment.submission_types &&
          JSON.stringify(assignment.submission_types) !== JSON.stringify(["none"]) &&
          assignment.due_at &&
          new Date(assignment.due_at) > oneDayAgo
        );


        for (const assignment of filteredAssignments) {

          const a: Assignment = {
            name: assignment.name as string,
            due_date: assignment.due_at as string,
            //lock_time: assignment.lock_at as string,
            course: courseName as string,
            id: assignment.id as number,
            course_id: assignment.course_id as number,
            //scheduled_time : new Date() as Date,
          }
          const turnedIn = assignment.has_submitted_submissions;

          //console.log(`  Assignment: ${assignmentName} (ID: ${assignmentId})`);
          //console.log(`    Due Date: ${dueDate}`);
          //console.log(`    Turned In: ${turnedIn ? "Yes" : "No"}`);
          const dt: Date = new Date(assignment.due_at);
          const now: Date = new Date();
          if ((!assignment.has_submitted_submissions) && (now < dt)) {
            unsubmitted.push(a);
          }
        }
      }
    }

    unsubmitted.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
    console.log("unsubmitted assignments", unsubmitted)

    return { submitted, unsubmitted };
  }
  const { submitted, unsubmitted } = await getUserInfo(canvasKey);
  return unsubmitted;

}


/**
 * Helper function to parse Link headers
 * Example header:
 *   <https://example.com/api/v1/courses?page=2>; rel="next", <https://example.com/api/v1/courses?page=3>; rel="last"
 */
function parseLinkHeader(header: string): Record<string, string> {
  const links: Record<string, string> = {};
  const parts = header.split(',');
  for (const part of parts) {
    const section = part.split(';');
    if (section.length < 2) continue;
    const url = section[0]?.trim().replace(/^<(.+)>$/, '$1') || '';
    const relMatch = section[1]?.trim().match(/rel="(.+)"/);
    if (relMatch) {
      const rel = relMatch[1];
      if (rel) {
        links[rel] = url;
      }
    }
  }
  return links;
}
