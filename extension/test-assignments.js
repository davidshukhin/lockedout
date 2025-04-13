/*
 * TEST ASSIGNMENT UTILITY SCRIPT
 * ------------------------------
 * IMPORTANT: This file is NOT meant to be imported or executed directly.
 * 
 * INSTRUCTIONS:
 * 1. Open Chrome Extension Developer Tools for this extension
 * 2. Go to the "Console" tab for the background script
 * 3. Copy-paste the entire contents of this file into the console
 * 4. Use the provided functions to create/remove test assignments
 *
 * This script accesses globals (supabase, fetchBlockedDomains) that exist
 * in the background script context but not in this file directly.
 */

// Test script to add or remove test assignments for debugging blocking functionality

// Create a test assignment
async function createTestAssignment() {
  if (typeof supabase === 'undefined') {
    console.error("Supabase client not initialized or not available in this context");
    console.log("Make sure you're running this in the background script console");
    return;
  }

  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session?.user?.id) {
      console.error("No active user session, please sign in first");
      return;
    }

    const userId = session.data.session.user.id;
    
    // Check if assignment already exists
    const { data: existing } = await supabase
      .from("current_assignments")
      .select("*")
      .eq("access_key", userId)
      .eq("assignment_id", 999999)
      .eq("course_id", 999999);
    
    if (existing && existing.length > 0) {
      console.log("Test assignment already exists!");
      return;
    }

    // Add a test assignment
    const { data, error } = await supabase
      .from("current_assignments")
      .insert([
        {
          access_key: userId,
          assignment_id: 999999, // Test assignment ID
          course_id: 999999, // Test course ID
          scheduled_time: new Date().toISOString() // Current time
        }
      ]);

    if (error) {
      console.error("Error creating test assignment:", error);
    } else {
      console.log("Test assignment created successfully!");
      console.log("This should activate blocking. Try visiting a blocked site now.");
      
      // Refresh block list
      if (typeof fetchBlockedDomains === 'function') {
        await fetchBlockedDomains();
      } else {
        console.log("fetchBlockedDomains function not available. You may need to manually reload the extension.");
      }
    }
  } catch (e) {
    console.error("Exception creating test assignment:", e);
  }
}

// Remove the test assignment
async function removeTestAssignment() {
  if (typeof supabase === 'undefined') {
    console.error("Supabase client not initialized or not available in this context");
    console.log("Make sure you're running this in the background script console");
    return;
  }

  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session?.user?.id) {
      console.error("No active user session, please sign in first");
      return;
    }

    const userId = session.data.session.user.id;
    
    // Remove the test assignment
    const { data, error } = await supabase
      .from("current_assignments")
      .delete()
      .match({
        access_key: userId,
        assignment_id: 999999,
        course_id: 999999
      });

    if (error) {
      console.error("Error removing test assignment:", error);
    } else {
      console.log("Test assignment removed successfully!");
      console.log("This should disable blocking. Try visiting a previously blocked site now.");
      
      // Refresh block list
      if (typeof fetchBlockedDomains === 'function') {
        await fetchBlockedDomains();
      } else {
        console.log("fetchBlockedDomains function not available. You may need to manually reload the extension.");
      }
    }
  } catch (e) {
    console.error("Exception removing test assignment:", e);
  }
}

// List current assignments
async function listAssignments() {
  if (typeof supabase === 'undefined') {
    console.error("Supabase client not initialized or not available in this context");
    console.log("Make sure you're running this in the background script console");
    return;
  }

  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session?.user?.id) {
      console.error("No active user session, please sign in first");
      return;
    }

    const userId = session.data.session.user.id;
    
    // Get current assignments
    const { data, error } = await supabase
      .from("current_assignments")
      .select("*")
      .eq("access_key", userId);

    if (error) {
      console.error("Error fetching assignments:", error);
    } else {
      console.log(`Found ${data.length} assignments:`);
      console.table(data);
    }
  } catch (e) {
    console.error("Exception fetching assignments:", e);
  }
}

console.log(`
Test Assignment Functions Loaded:
--------------------------------
createTestAssignment() - Creates a test assignment to enable blocking
removeTestAssignment() - Removes the test assignment to disable blocking
listAssignments() - Lists all current assignments

Instructions:
1. Make sure you're in the background script console (devtools for the extension background)
2. Run createTestAssignment() to enable blocking
3. Visit a blocked site to test if blocking works
4. Run removeTestAssignment() to disable blocking
5. Visit the same site to verify blocking is disabled
`); 