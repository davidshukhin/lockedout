"use strict";
// Import the Supabase client library.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

console.log("[BACKGROUND] Starting background script.");

let supabase = null;

// Initialize Supabase client from storage
chrome.storage.local.get(['SUPABASE_URL', 'SUPABASE_ANON_KEY'], (result) => {
  if (!result.SUPABASE_URL || !result.SUPABASE_ANON_KEY) {
    console.error("[BACKGROUND] Missing Supabase configuration!");
    return;
  }

  // Create a Supabase client instance.
  supabase = createClient(result.SUPABASE_URL, result.SUPABASE_ANON_KEY);
  console.log("[BACKGROUND] Supabase client created.");

  // Initial fetch on extension startup.
  console.log("[BACKGROUND] Initiating initial fetchBlockedDomains call.");
  fetchBlockedDomains();
});

// Global variable for the list of domains to block.
/** @type {string[]} */
let blockedDomains = [];

/**
 * Checks if the current user has any active assignments
 * @returns {Promise<boolean>} True if all assignments are submitted, false otherwise
 */
async function checkAssignments() {
  if (!supabase) {
    console.error("[CHECK] Supabase client not initialized");
    return true; // Assume no active assignments if client not ready
  }

  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session?.user?.id) {
      console.log("[CHECK] No active user session");
      return true; // No assignments if not logged in
    }

    const { data: assignments, error } = await supabase
      .from("current_assignments")
      .select("*")
      .eq("user_id", session.data.session.user.id);

    if (error) {
      console.error("[CHECK] Error fetching assignments:", error);
      return true; // Assume no active assignments on error
    }

    return !assignments || assignments.length === 0;
  } catch (e) {
    console.error("[CHECK] Exception while checking assignments:", e);
    return true; // Assume no active assignments on error
  }
}

/**
 * Fetches and updates the blocked domains from Supabase. Blocking is only active if:
 * 1. The user has a current assignment (a row in current_assignments).
 * 2. The assignment has not been submitted.
 * Otherwise, blockedDomains is cleared to disable blocking.
 */
async function fetchBlockedDomains() {
  console.log("[FETCH] Running fetchBlockedDomains() ...");
  try {
    // Retrieve the current session from Supabase auth.
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    console.log("[FETCH] Session retrieval complete:", session);

    if (sessionError || !session || !session.user || !session.user.id) {
      console.error("[FETCH] User session not found or error retrieving session:", sessionError);
      return;
    }
    const userId = session.user.id;
    console.log("[FETCH] User ID:", userId);

    // Check if the user has a current assignment in the 'current_assignments' table.
    console.log("[FETCH] Querying 'current_assignments' table for user:", userId);
    const {
      data: assignmentData,
      error: assignmentError,
    } = await supabase
      .from('current_assignments')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Expect a single row or null

    if (assignmentError) {
      console.error("[FETCH] Error fetching current assignment:", assignmentError);
      return;
    }
    
    if (!assignmentData) {
      console.log("[FETCH] No current assignment found for user, disabling blocking.");
      blockedDomains = [];
      return;
    }
    console.log("[FETCH] Current assignment found:", assignmentData);

    // Check if the assignment has been submitted.
    console.log("[FETCH] Checking if assignment has been submitted...");
    const submitted = await checkAssignments();
    console.log("[FETCH] Assignment submission status:", submitted);

    if (submitted) {
      console.log("[FETCH] Assignment already submitted, disabling blocking.");
      blockedDomains = [];
      return;
    }

    // If we reach here, the user has an active assignment that has not yet been submitted.
    console.log("[FETCH] User has an active, not-submitted assignment. Fetching block list...");
    // Now fetch the user's block list from the 'user_blocklists' table.
    const { data, error } = await supabase
      .from('user_blocklists')
      .select('block_list')
      .eq('user_id', userId)
      .single(); // Because user_id is unique.

    if (error) {
      console.error("[FETCH] Error fetching blocked domains:", error);
      return;
    }

    if (data && data.block_list) {
      blockedDomains = data.block_list;
      console.log("[FETCH] Blocked domains updated:", blockedDomains);
    } else {
      console.log("[FETCH] No block list found for user:", userId);
    }
  } catch (e) {
    console.error("[FETCH] Exception while fetching blocked domains:", e);
  }
}

// Use Chrome Alarms API to refresh the block list (and current assignment status) periodically (every 60 minutes).
chrome.alarms.create('refreshBlockedDomains', { periodInMinutes: 60 });
console.log("[ALARM] Alarm 'refreshBlockedDomains' created to run every 60 minutes.");

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("[ALARM] Alarm triggered:", alarm.name);
  if (alarm.name === 'refreshBlockedDomains') {
    console.log("[ALARM] Refreshing block list via fetchBlockedDomains()");
    fetchBlockedDomains();
  }
});

/**
 * Listener to intercept network requests. If a URL matches any domain from the blockedDomains array,
 * and blocking is enabled (i.e. blockedDomains is not empty), redirect the user to the custom blocked page.
 */
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Log the URL before checking.
    console.log("[WEBREQUEST] Intercepted URL:", details.url);
    if (
      blockedDomains.length > 0 &&
      blockedDomains.some((domain) => details.url.includes(domain))
    ) {
      console.log("[WEBREQUEST] Blocked URL detected:", details.url);
      // Redirect to the extension's local blocked page.
      return { redirectUrl: chrome.runtime.getURL('blocked.html') };
    }
    // Allow the request if it doesn't match any blocked domain.
    return {};
  },
  {
    urls: ['<all_urls>'] // Monitor all main_frame navigations.
  },
  ['blocking']
);

/**
 * Updates the blocking rules.
 * @param {string[]} blockList - An array of domain strings.
 */
function updateBlockingRules(blockList) {
  console.log("[RULES] Updating blocking rules with blockList:", blockList);
  const rules = blockList.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: /** @type {chrome.declarativeNetRequest.RuleAction} */ ({ type: "block" }),
    condition: {
      urlFilter: domain,
      resourceTypes: /** @type {chrome.declarativeNetRequest.ResourceType[]} */ (["main_frame"]),
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules,
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("[RULES] Error updating rules:", chrome.runtime.lastError);
    } else {
      console.log("[RULES] Blocking rules updated successfully.");
    }
  });
}

// Example polling every 5 minutes (commented out):
// async function syncBlockList() {
//     try {
//         console.log("[SYNC] Syncing block list from external API...");
//         const response = await fetch('https://your-backend-domain.com/api/blocklist', {
//             credentials: 'include' // or use tokens as appropriate
//         });
//         const data = await response.json();
//         console.log("[SYNC] Block list data received:", data);
//         updateBlockingRules(data.blockList || []);
//     }
//     catch (error) {
//         console.error("[SYNC] Failed to sync block list:", error);
//     }
// }
// // Initial sync, then repeat periodically:
// // syncBlockList();
// // setInterval(syncBlockList, 5 * 60 * 1000);
