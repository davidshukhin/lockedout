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
    // Create a Supabase client instance directly (no dynamic import)
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
        'Cache-Control': 'no-cache',
        'Origin': chrome.runtime.getURL('')
      },
      mode: 'cors'
    });

    if (!response.ok) {
      console.error("[CHECK] Error fetching assignments. Status:", response.status);
      console.error("[CHECK] Status text:", response.statusText);
      const errorText = await response.text();
      console.error("[CHECK] Error details:", errorText);
      return false;
    }

    const data = await response.json();
    console.log("[CHECK] Assignment check response:", data);

    // API returns true when all assignments are submitted (meaning we should NOT block)
    // So we need to return the opposite of what the API returns
    const shouldBlock = !data.allSubmitted;
    console.log("[CHECK] Should block based on assignments?", shouldBlock);
    return shouldBlock;
  } catch (e) {
    console.error("[CHECK] Exception while checking assignments:", e);
    console.error("[CHECK] Stack trace:", e.stack);
    return false;
  }
}

// Listen for messages from the API about new assignments
chrome.runtime.onMessageExternal.addListener(
  async function(request, sender, sendResponse) {
    if (request.type === 'ASSIGNMENT_ADDED') {
      console.log("[BACKGROUND] New assignment added, updating rules immediately");
      await fetchBlockedDomains(); // Immediate update of block rules
      sendResponse({status: 'ok'});
    }
  }
);

// Make checks much more frequent (every 5 seconds instead of 15)
chrome.alarms.create('checkAssignments', { periodInMinutes: 0.083 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkAssignments') {
    console.log("[ALARM] Running periodic assignment check...");
    checkAssignments().then(shouldBlock => {
      console.log("[ALARM] Periodic assignment check result:", shouldBlock);
      // Actually update the blocking rules when assignment status changes
      fetchBlockedDomains(); // This will clear or set rules based on assignment status
    });
  }
  // Keep the existing refreshBlockList alarm handler
  else if (alarm.name === 'refreshBlockList') {
    checkAuthAndUpdateBlockList();
  }
});

// Also modify the initial check to actually update rules
console.log("[BACKGROUND] Initial assignment check...");
checkAssignments().then(shouldBlock => {
  console.log("[BACKGROUND] Initial assignment check result:", shouldBlock);
  // Update blocking rules on initial check
  fetchBlockedDomains();
});

/**
 * Fetches and updates the blocked domains from Supabase. Blocking is only active if:
 * 1. The user has a current assignment (a row in current_assignments).
 * 2. The assignment has not been submitted.
 * Otherwise, blockedDomains is cleared to disable blocking.
 */
async function fetchBlockedDomains() {
  console.log("[FETCH] Running immediate domain fetch...");
  try {
    const shouldBlock = await checkAssignments();
    if (!shouldBlock) {
      console.log("[FETCH] No active assignments, clearing block list");
      await updateBlockingRules([]);
      return;
    }

    if (!supabase) {
      console.error("[FETCH] Supabase client not initialized");
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      console.log("[FETCH] No active user session");
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

    if (!data?.block_list || data.block_list.length === 0) {
      console.log("[FETCH] No blocked domains found");
      await updateBlockingRules([]);
      return;
    }

    console.log("[FETCH] Applying immediate blocks for domains:", data.block_list);
    await updateBlockingRules(data.block_list);
  } catch (e) {
    console.error("[FETCH] Exception while fetching blocked domains:", e);
  }
}

// Add immediate rule application
async function applyBlockingRules(domains) {
  console.log("[RULES] Applying immediate blocking rules for domains:", domains);
  try {
    // Remove existing rules first
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);
    
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds
    });

    if (!domains || domains.length === 0) {
      console.log("[RULES] No domains to block, rules cleared");
      return;
    }

    // Create and apply new rules immediately
    const rules = domains.map((domain, index) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
        redirect: {
          url: chrome.runtime.getURL("/blocked.html") + "?url=" + encodeURIComponent(domain)
        }
      },
      condition: {
        urlFilter: `||${domain}`,
        resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
      }
    }));

    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules
    });
    console.log("[RULES] Rules applied immediately:", rules);
  } catch (err) {
    console.error("[RULES] Error applying rules:", err);
  }
}

// Modify updateBlockingRules to be more immediate
async function updateBlockingRules(domains) {
  console.log("[RULES] Updating blocking rules...");
  
  try {
    const shouldBlock = await checkAssignments();
    console.log("[RULES] Should block?", shouldBlock);

    if (!shouldBlock) {
      console.log("[RULES] No need to block, clearing rules");
      await applyBlockingRules([]);
      return;
    }

    console.log("[RULES] Applying immediate blocks");
    await applyBlockingRules(domains);
  } catch (err) {
    console.error("[RULES] Error updating rules:", err);
  }
}

// Add tab update listener with immediate blocking
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    console.log("[TAB] Tab loading, checking immediately:", tab.url);
    const shouldBlock = await checkAssignments();
    if (shouldBlock) {
      // Get the current block list and apply immediately
      const storage = await chrome.storage.local.get(['BLOCK_LIST']);
      const blockList = storage.BLOCK_LIST || [];
      if (blockList.length > 0) {
        console.log("[TAB] Applying immediate block");
        await applyBlockingRules(blockList);
      }
    }
  }
});

// Add navigation listener for immediate checks
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId === 0) { // Main frame only
    console.log("[NAV] Navigation detected, checking immediately:", details.url);
    const shouldBlock = await checkAssignments();
    if (shouldBlock) {
      const storage = await chrome.storage.local.get(['BLOCK_LIST']);
      const blockList = storage.BLOCK_LIST || [];
      if (blockList.length > 0) {
        console.log("[NAV] Applying immediate block");
        await applyBlockingRules(blockList);
      }
    }
  }
});

// Listen for assignment updates from the server
chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'ASSIGNMENT_ADDED' || request.type === 'ASSIGNMENT_UPDATED') {
    console.log("[EXTERNAL] Assignment update received, checking immediately");
    const shouldBlock = await checkAssignments();
    if (shouldBlock) {
      const storage = await chrome.storage.local.get(['BLOCK_LIST']);
      const blockList = storage.BLOCK_LIST || [];
      if (blockList.length > 0) {
        console.log("[EXTERNAL] Applying immediate block");
        await applyBlockingRules(blockList);
      }
    }
    sendResponse({ status: 'ok' });
  }
});

// Add storage change listener for immediate updates
chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === 'local' && changes.BLOCK_LIST) {
    console.log("[STORAGE] Block list updated, applying immediately");
    const newBlockList = changes.BLOCK_LIST.newValue || [];
    await updateBlockingRules(newBlockList);
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

