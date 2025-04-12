"use server";

import { supabase } from "~/server/db";
import { auth } from "~/server/auth";
const CURRENT_TERM: number = 4710; // Set your desired current term here
const CANVAS_API_URL: string = "https://umd.instructure.com/api/v1"; // Canvas API base URL for UMD
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
	
	/**
	 * Retrieve all active courses for the user and filter by the current term.
	 * @param headers HTTP headers including authorization
	 */
	async function getCourses(headers: HeadersInit): Promise<any[]> {
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
	
	/**
	 * Retrieve all assignments for a given course.
	 * Includes submission details in the response.
	 * @param headers HTTP headers including authorization
	 * @param courseId The ID of the course to retrieve assignments for.
	 */
	async function getAssignments(headers: HeadersInit, courseId: number): Promise<any[]> {
	const initialUrl = `${CANVAS_API_URL}/courses/${courseId}/assignments?per_page=100&include[]=submission`;
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
	async function getUserInfo(accessToken: string): Promise<{
	submitted: Record<string, any[]>;
	unsubmitted: Record<string, any[]>;
	}> {
	// HTTP headers for authentication.
	const headers = {
		"Authorization": `Bearer ${accessToken}`,
	};
	
	const courses = await getCourses(headers);
	if (!courses.length) {
		console.log("No courses found for term:", CURRENT_TERM);
		return { submitted: {}, unsubmitted: {} };
	}
	
	const submitted: Record<string, any[]> = {};
	const unsubmitted: Record<string, any[]> = {};
	
	for (const course of courses) {
		const courseId: number = course.id;
		const courseName: string = course.name;
		console.log(`\nCourse: ${courseName} (ID: ${courseId})`);
	
		const assignments = await getAssignments(headers, courseId);
		let submittedAssignments: any[] = [];
		let unsubmittedAssignments: any[] = [];
	
		if (!assignments.length) {
		console.log("  No assignments found.");
		} else {
		// Filter assignments for published ones with valid due dates and non-empty submission types.
		const filteredAssignments = assignments.filter((assignment: any) =>
			assignment.published &&
			assignment.submission_types &&
			// Check that submission_types array is not just ['none']
			JSON.stringify(assignment.submission_types) !== JSON.stringify(["none"]) &&
			assignment.due_at != null
		);
	
		for (const assignment of filteredAssignments) {
			const assignmentId = assignment.id;
			const assignmentName = assignment.name;
			const dueDate = assignment.due_at; // May be null if no due date is set
			const turnedIn = assignment.has_submitted_submissions;
	
			console.log(`  Assignment: ${assignmentName} (ID: ${assignmentId})`);
			console.log(`    Due Date: ${dueDate}`);
			console.log(`    Turned In: ${turnedIn ? "Yes" : "No"}`);
	
			if (turnedIn) {
			submittedAssignments.push({ name: assignmentName, due_date: dueDate });
			} else {
			unsubmittedAssignments.push({ name: assignmentName, due_date: dueDate });
			}
	
			// Debug output for a specific assignment (HW4).
			if (assignmentName === "HW4") {
			console.log(assignment);
			}
		}
		}
		submitted[courseName] = submittedAssignments;
		unsubmitted[courseName] = unsubmittedAssignments;
	}
	
	return { submitted, unsubmitted };
	}

	getUserInfo(canvasKey)
	.then(result => {
		console.log("\nSubmitted Assignments:", result.submitted);
		console.log("Unsubmitted Assignments:", result.unsubmitted);
	})
	.catch(err => console.error(err));
	  

} 