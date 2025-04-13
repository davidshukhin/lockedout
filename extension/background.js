"use strict";
// Import the Supabase client library.
import { createClient } from '@supabase/supabase-js';
// Import the assignment submission checker (adjust the path as needed)
// This function should accept the user id and assignment id and return a Promise<boolean>
import { checkAssignments } from '../src/server/actions/check_assignments.js';

// Ensure environment variables are set.
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables!');
}

// Create a Supabase client instance.
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Global variable for the list of domains to block.
 /** @type {string[]} */
let blockedDomains = [];

/**
 * Fetches and updates the blocked domains from Supabase. Blocking is only active if:
 * 1. The user has a current assignment (a row in current_assignments).
 * 2. The assignment has not been submitted.
 * Otherwise, blockedDomains is cleared to disable blocking.
 */
async function fetchBlockedDomains() {
  try {
    // Retrieve the current session from Supabase auth.
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user || !session.user.id) {
      console.error('User session not found or error retrieving session:', sessionError);
      return;
    }
    const userId = session.user.id;

    // Check if the user has a current assignment in the 'current_assignments' table.
    const {
      data: assignmentData,
      error: assignmentError,
    } = await supabase
      .from('current_assignments')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Expect a single row or null

    if (assignmentError) {
      console.error("Error fetching current assignment:", assignmentError);
      return;
    }
    
    // If no current assignment found, disable blocking.
    if (!assignmentData) {
      console.log('No current assignment found for user, disabling blocking.');
      blockedDomains = [];
      return;
    }
    
    // Check if the assignment has been submitted.
    // The isAssignmentSubmitted function is assumed to return a boolean.
    const submitted = await checkAssignments();
    if (submitted) {
      console.log('Assignment already submitted, disabling blocking.');
      blockedDomains = [];
      return;
    }

    // If we reach here, the user has an active assignment that has not yet been submitted.
    // Now fetch the user's block list from the 'user_blocklists' table.
    const { data, error } = await supabase
      .from('user_blocklists')
      .select('block_list')
      .eq('user_id', userId)
      .single(); // Because user_id is unique.

    if (error) {
      console.error('Error fetching blocked domains:', error);
      return;
    }

    if (data && data.block_list) {
      // Update the blockedDomains global variable.
      blockedDomains = data.block_list;
      console.log('Blocked domains updated:', blockedDomains);
    } else {
      console.log('No block list found for user:', userId);
    }
  } catch (e) {
    console.error('Exception while fetching blocked domains:', e);
  }
}

// Initial fetch on extension startup.
fetchBlockedDomains();

// Use Chrome Alarms API to refresh the block list (and current assignment status) periodically (every 60 minutes).
chrome.alarms.create('refreshBlockedDomains', { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshBlockedDomains') {
    fetchBlockedDomains();
  }
});

/**
 * Listener to intercept network requests. If a URL matches any domain from the blockedDomains array,
 * and blocking is enabled (i.e. blockedDomains is not empty), redirect the user to the custom blocked page.
 */
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (
      blockedDomains.length > 0 &&
      blockedDomains.some((domain) => details.url.includes(domain))
    ) {
      console.log('Blocked URL detected:', details.url);
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
      console.error("Error updating rules:", chrome.runtime.lastError);
    } else {
      console.log("Blocking rules updated successfully.");
    }
  });
}

// Example polling every 5 minutes:
// async function syncBlockList() {
//     try {
//         const response = await fetch('https://your-backend-domain.com/api/blocklist', {
//             credentials: 'include' // or use tokens as appropriate
//         });
//         const data = await response.json();
//         updateBlockingRules(data.blockList || []);
//     }
//     catch (error) {
//         console.error("Failed to sync block list:", error);
//     }
// }
// // Initial sync, then repeat periodically:
// syncBlockList();
// setInterval(syncBlockList, 5 * 60 * 1000);
