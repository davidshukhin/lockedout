"use strict";
// Import the Supabase client library.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

console.log("[BACKGROUND] Starting background script.");

let supabase = null;

// Initialize Supabase client from storage
chrome.storage.local.get(['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SESSION'], async (result) => {
  if (!result.SUPABASE_URL || !result.SUPABASE_ANON_KEY) {
    console.error("[BACKGROUND] Missing Supabase configuration!");
    return;
  }

  try {
    // Create a Supabase client instance
    supabase = createClient(result.SUPABASE_URL, result.SUPABASE_ANON_KEY);
    console.log("[BACKGROUND] Supabase client created.");

    // Check for stored session
    if (result.SUPABASE_SESSION) {
      console.log("[BACKGROUND] Found stored session");
      const { data: { session }, error } = await supabase.auth.setSession(result.SUPABASE_SESSION);
      if (error) {
        console.error("[BACKGROUND] Error setting session:", error);
        return;
      }
      if (session) {
        console.log("[BACKGROUND] Session restored successfully");
        await fetchBlockedDomains();
      }
    } else {
      console.log("[BACKGROUND] No stored session found");
    }

    // Set up auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("[AUTH] Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        // Store the session
        chrome.storage.local.set({ SUPABASE_SESSION: session });
        fetchBlockedDomains();
      } else if (event === 'SIGNED_OUT') {
        // Clear the session
        chrome.storage.local.remove('SUPABASE_SESSION');
      }
    });

  } catch (error) {
    console.error("[BACKGROUND] Error during initialization:", error);
  }
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

    console.log("[CHECK] Assignments:", assignments);

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
    if (!supabase) {
      console.error("[FETCH] Supabase client not initialized");
      return;
    }

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("[FETCH] Error getting session:", sessionError);
      return;
    }

    if (!session || !session.user || !session.user.id) {
      console.log("[FETCH] No active user session");
      return;
    }

    const { data, error } = await supabase
      .from('blocked_domains')
      .select('domain')
      .eq('user_id', session.user.id);

    if (error) {
      console.error("[FETCH] Error fetching blocked domains:", error);
      return;
    }

    const domains = data.map(item => item.domain);
    await updateBlockingRules(domains);
    blockedDomains = domains;
    console.log("[FETCH] Updated blocked domains:", domains);
  } catch (e) {
    console.error("[FETCH] Exception while fetching blocked domains:", e);
  }
}

/**
 * Updates the blocking rules.
 * @param {string[]} domains - An array of domain strings to block.
 */
async function updateBlockingRules(domains) {
  try {
    // First, get existing rules to properly clean up
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    // Create new rules
    const rules = domains.map((domain, index) => {
      // Clean the domain (remove protocol, www, etc)
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
      
      return {
        id: index + 1,
        priority: 2, // Higher priority than static rules
        action: {
          type: "redirect",
          redirect: {
            url: chrome.runtime.getURL("/blocked.html") + "?url=" + encodeURIComponent(cleanDomain)
          }
        },
        condition: {
          domains: [cleanDomain],
          urlFilter: "*",
          resourceTypes: ["main_frame"]
        }
      };
    });

    // Update the rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds,
      addRules: rules
    });
    
    // Log the current state of all rules
    const allRules = await chrome.declarativeNetRequest.getDynamicRules();
    console.log("Current blocking rules:", allRules);
    
  } catch (err) {
    console.error("Failed to update blocking rules:", err);
  }
}

// Listen for changes to the block list in storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.BLOCK_LIST) {
    const newBlockList = changes.BLOCK_LIST.newValue || [];
    updateBlockingRules(newBlockList);
  }
});

// Check for updates to the block list periodically
chrome.alarms.create('refreshBlockList', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshBlockList') {
    checkAuthAndUpdateBlockList();
  }
});

async function checkAuthAndUpdateBlockList() {
  try {
    // Check auth session
    const res = await fetch("http://localhost:3000/api/auth/session", {
      credentials: "include"
    });
    const session = await res.json();

    if (session && session.user) {
      // Fetch latest block list
      const blockListRes = await fetch("http://localhost:3000/api/blocklist", {
        credentials: "include"
      });
      const blockListData = await blockListRes.json();
      
      // Update storage and rules
      if (blockListData.blockList) {
        chrome.storage.local.set({ BLOCK_LIST: blockListData.blockList });
        await updateBlockingRules(blockListData.blockList);
      }
    }
  } catch (err) {
    console.error("Failed to update block list:", err);
  }
}

// Initial check
checkAuthAndUpdateBlockList();

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
