"use strict";
// We'll move the service worker to a standard script (not a module)
// and use a local script to handle Supabase initialization

console.log("[BACKGROUND] Starting background script.");

let supabase = null;

// Initialize Supabase client from storage
chrome.storage.local.get(['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SESSION'], async (result) => {
  if (!result.SUPABASE_URL || !result.SUPABASE_ANON_KEY) {
    console.error("[BACKGROUND] Missing Supabase configuration!");
    return;
  }

  try {
    // Load the Supabase client script
    await import('./lib/supabase.js');
    
    // Create a Supabase client instance
    // @ts-ignore - Supabase is loaded globally
    supabase = supabaseJs.createClient(result.SUPABASE_URL, result.SUPABASE_ANON_KEY);
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
 * @returns {Promise<boolean>} True if there are active assignments that require blocking, false if no active assignments
 */
async function checkAssignments() {
  console.log("[CHECK] Starting assignment check...");
  
  try {
    // Add timestamp to avoid caching
    const timestamp = new Date().getTime();
    console.log("[CHECK] Fetching from /api/check-assignments...");
    const response = await fetch(`http://localhost:3000/api/check-assignments?t=${timestamp}`, {
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      console.error("[CHECK] Error fetching assignments. Status:", response.status);
      console.error("[CHECK] Status text:", response.statusText);
      const errorText = await response.text();
      console.error("[CHECK] Error details:", errorText);
      return false;
    }

    const data = await response.json();
    console.log("[CHECK] Assignment check response:", {
      shouldBlock: data.shouldBlock,
      message: data.message,
      fullResponse: data
    });

    // Add a test call to verify it's working
    console.log("[CHECK] Test - calling checkAssignments directly");
    return data.shouldBlock;
  } catch (e) {
    console.error("[CHECK] Exception while checking assignments:", e);
    console.error("[CHECK] Stack trace:", e.stack);
    return false;
  }
}

// Add an immediate check when the extension loads
console.log("[BACKGROUND] Initial assignment check...");
checkAssignments().then(shouldBlock => {
  console.log("[BACKGROUND] Initial assignment check result:", shouldBlock);
});

// Set up periodic checks more frequently (every minute)
chrome.alarms.create('checkAssignments', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkAssignments') {
    console.log("[ALARM] Running periodic assignment check...");
    checkAssignments().then(shouldBlock => {
      console.log("[ALARM] Periodic assignment check result:", shouldBlock);
    });
  }
});

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

    // Check assignments first - only block if there are active assignments
    const hasActiveAssignments = await checkAssignments();
    
    if (!hasActiveAssignments) {
      console.log("[FETCH] No active assignments, clearing block list");
      blockedDomains = [];
      await updateBlockingRules([]);
      return;
    }

    console.log("[FETCH] User has active assignments, fetching block list");
    const { data, error } = await supabase
      .from('user_blocklists')
      .select('block_list')
      .eq('user_id', session.user.id)
      .single();
      

    if (error) {
      console.error("[FETCH] Error fetching blocked domains:", error);
      return;
    }

    if (!data || !data.block_list || data.block_list.length === 0) {
      console.log("[FETCH] No blocked domains found in database");
      blockedDomains = [];
      await updateBlockingRules([]);
      return;
    }

    console.log("[FETCH] Found blocked domains in database:", data.block_list);
    const domains = data.block_list;
    
    console.log("[FETCH] Processed domains for blocking:", domains);
    blockedDomains = domains;
    await updateBlockingRules(domains);
  } catch (e) {
    console.error("[FETCH] Exception while fetching blocked domains:", e);
  }
}

/**
 * Updates the blocking rules.
 * @param {string[]} domains - An array of domain strings to block.
 */
async function updateBlockingRules(domains) {
  console.log("[RULES] Updating blocking rules for domains:", domains);
  
  try {
    // First, get existing rules to properly clean up
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);
    
    console.log("[RULES] Removing existing rules:", existingRuleIds);

    // Remove existing rules first
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds
    });
    console.log("[RULES] Existing rules removed");

    if (!domains || domains.length === 0) {
      console.log("[RULES] No domains to block, all rules cleared");
      return;
    }

    // Create new rules - one rule per domain with a simple pattern
    const rules = domains.map((domain, index) => {
      // Clean the domain (remove protocol, www, etc)
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
      console.log(`[RULES] Creating rule for domain: ${cleanDomain}`);
      
      return {
        id: index + 1,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            url: chrome.runtime.getURL("/blocked.html") + "?url=" + encodeURIComponent(cleanDomain)
          }
        },
        condition: {
          // Simpler URL pattern that matches the domain anywhere in the hostname
          urlFilter: `||${cleanDomain}`,
          resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
        }
      };
    });

    console.log("[RULES] Created rules:", JSON.stringify(rules, null, 2));
    
    // Add new rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules
    });
    
    // Verify the rules were added
    const allRules = await chrome.declarativeNetRequest.getDynamicRules();
    console.log("[RULES] Current blocking rules:", JSON.stringify(allRules, null, 2));
    
    // Test if rules match example URLs
    for (const domain of domains) {
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
      const testUrl = `https://www.${cleanDomain}`;
      console.log(`[RULES] Testing URL pattern for ${testUrl}`);
      
      const matchedRules = await chrome.declarativeNetRequest.getMatchedRules({
        urlFilter: testUrl
      });
      console.log(`[RULES] Matched rules for ${testUrl}:`, matchedRules);
    }
  } catch (err) {
    console.error("[RULES] Failed to update blocking rules:", err);
    console.error("[RULES] Error details:", err.message);
    if (err.stack) console.error("[RULES] Stack trace:", err.stack);
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
  console.log("[UPDATE] Checking for auth session and updating block list");
  try {
    // Check auth session
    const res = await fetch("http://localhost:3000/api/auth/session", {
      credentials: "include"
    });
    const session = await res.json();

    if (!session || !session.user) {
      console.log("[UPDATE] No active auth session found");
      return;
    }
    
    console.log("[UPDATE] Found auth session:", session.user.email);

    // Fetch latest block list
    console.log("[UPDATE] Fetching block list from API");
    const blockListRes = await fetch("http://localhost:3000/api/blocklist", {
      credentials: "include"
    });
    
    if (!blockListRes.ok) {
      console.error("[UPDATE] Failed to fetch block list:", blockListRes.status, blockListRes.statusText);
      return;
    }
    
    const blockListData = await blockListRes.json();
    
    if (!blockListData || !blockListData.blockList) {
      console.log("[UPDATE] No block list found in API response");
      return;
    }
    
    console.log("[UPDATE] Block list from API:", blockListData.blockList);
    
    // Update storage and rules
    chrome.storage.local.set({ BLOCK_LIST: blockListData.blockList });
    console.log("[UPDATE] Block list stored in extension storage");
    
    // Apply the rules
    await updateBlockingRules(blockListData.blockList);
  } catch (err) {
    console.error("[UPDATE] Failed to update block list:", err);
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

// Before redirecting to blocked page, double-check if assignments are completed
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  // Only check for main frame navigations (not iframes, etc.)
  if (details.frameId !== 0) return;
  
  // Check if this URL is in our blocked domains list
  const url = new URL(details.url);
  const shouldCheck = blockedDomains.some(domain => url.hostname.includes(domain));
  
  if (shouldCheck) {
    console.log(`[BLOCK] Checking assignments before blocking ${url.hostname}`);
    
    // Check assignments - returns true if there are active assignments
    const hasActiveAssignments = await checkAssignments();
    
    if (!hasActiveAssignments) {
      console.log(`[BLOCK] No active assignments, allowing access to ${url.hostname}`);
      // Update rules to unblock
      await fetchBlockedDomains();
    } else {
      console.log(`[BLOCK] Active assignments found, blocking access to ${url.hostname}`);
    }
  }
}, { url: [{ schemes: ['http', 'https'] }] });

/**
 * Test function to verify blocking functionality
 * @param {string} url - The URL to test
 */
async function testBlockingRule(url) {
  console.log("[TEST] Testing blocking for URL:", url);
  
  try {
    // Check if URL is in blocked domains
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    console.log("[TEST] URL hostname:", hostname);
    
    const isInBlockList = blockedDomains.some(domain => {
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
      const matches = hostname.includes(cleanDomain);
      console.log(`[TEST] Checking if ${hostname} matches ${cleanDomain}:`, matches);
      return matches;
    });
    
    console.log("[TEST] URL is in block list:", isInBlockList);
    
    // Get all current rules
    const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
    console.log("[TEST] Current rules:", JSON.stringify(currentRules, null, 2));
    
    // Check if any rules would match this URL
    const matchingRules = currentRules.filter(rule => {
      const pattern = rule.condition.urlFilter;
      console.log(`[TEST] Checking rule pattern ${pattern} against ${url}`);
      return true; // Log all rules for now
    });
    
    console.log("[TEST] Matching rules:", JSON.stringify(matchingRules, null, 2));
    
    // Check assignments status
    const hasAssignments = await checkAssignments();
    console.log("[TEST] Has active assignments:", hasAssignments);
    
    return {
      isInBlockList,
      hasMatchingRules: matchingRules.length > 0,
      hasAssignments,
      currentRules: currentRules,
      matchingRules
    };
  } catch (err) {
    console.error("[TEST] Error testing URL:", err);
    return null;
  }
}

// Example usage in console:
// testBlockingRule('https://example.com')

// Add this test function
async function testAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/check-assignments', {
      credentials: 'include'
    });
    console.log('API Response Status:', response.status);
    const data = await response.json();
    console.log('API Response Data:', data);
  } catch (e) {
    console.error('API Test Error:', e);
  }
}

// Call it on startup
console.log("[TEST] Testing API endpoint...");
testAPI();

