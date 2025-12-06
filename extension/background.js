"use strict";

console.log("[BACKGROUND] Starting background script.");

// Configuration
const API_BASE_URL = "http://localhost:3000";
const SYNC_INTERVAL_MINUTES = 1;

/**
 * Syncs the extension state with the server.
 * Fetches shouldBlock status and blockList in a single call.
 */
async function syncState() {
  console.log("[SYNC] Starting state sync...");
  try {
    const response = await fetch(`${API_BASE_URL}/api/extension/sync`, {
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (response.status === 401) {
      console.log("[SYNC] Unauthorized. User likely not logged in.");
      await chrome.storage.local.set({
        isAuthenticated: false,
        shouldBlock: false,
        blockList: []
      });
      await updateBlockingRules(false, []);
      return;
    }

    if (!response.ok) {
      console.error("[SYNC] API error:", response.status);
      return;
    }

    const data = await response.json();
    console.log("[SYNC] Received data:", data);

    // Update local storage
    await chrome.storage.local.set({
      isAuthenticated: true,
      shouldBlock: data.shouldBlock,
      blockList: data.blockList,
      lastUpdated: data.lastUpdated
    });

    // Update blocking rules
    await updateBlockingRules(data.shouldBlock, data.blockList);

  } catch (error) {
    console.error("[SYNC] Network error:", error);
  }
}

/**
 * Updates the dynamic blocking rules based on state.
 * @param {boolean} shouldBlock 
 * @param {string[]} blockList 
 */
async function updateBlockingRules(shouldBlock, blockList) {
  console.log(`[RULES] Updating rules. ShouldBlock: ${shouldBlock}, Count: ${blockList?.length}`);

  try {
    // Always clear existing rules first to ensure clean state
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    if (existingRuleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds
      });
    }

    if (!shouldBlock || !blockList || blockList.length === 0) {
      console.log("[RULES] Blocking disabled or empty list. Rules cleared.");
      return;
    }

    // Create new rules
    const rules = blockList.map((domain, index) => ({
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

    console.log(`[RULES] Applied ${rules.length} rules.`);

  } catch (error) {
    console.error("[RULES] Error applying rules:", error);
  }
}

// Alarms for periodic sync
chrome.alarms.create('syncState', { periodInMinutes: SYNC_INTERVAL_MINUTES });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'syncState') {
    syncState();
  }
});

// Initial sync on startup
syncState();

// Listen for messages from web app (if we implement push notifications later)
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.type === 'SYNC_NOW') {
    console.log("[MSG] Received SYNC_NOW request");
    syncState();
    sendResponse({ status: 'ok' });
  }
});

// Navigation listener - purely for logging/debugging now, NO network requests
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId === 0) {
    const storage = await chrome.storage.local.get(['shouldBlock', 'blockList']);
    if (storage.shouldBlock) {
      // Logic to check if current URL is in blocklist is handled by DNR, 
      // but we can log here if needed.
      console.log("[NAV] Navigation to:", details.url, "Blocking active.");
    }
  }
});

// Test functions for debugging
async function testAPI() {
  console.log("[TEST] Testing API endpoint...");
  try {
    const response = await fetch(`${API_BASE_URL}/api/extension/sync`, {
      credentials: "include"
    });
    console.log('[TEST] API Response Status:', response.status);
    const data = await response.json();
    console.log('[TEST] API Response Data:', data);
  } catch (e) {
    console.error('[TEST] API Test Error:', e);
  }
}

async function testBlockingRule(url) {
  console.log("[TEST] Testing blocking for URL:", url);
  try {
    const { shouldBlock, blockList } = await chrome.storage.local.get(['shouldBlock', 'blockList']);
    console.log("[TEST] Local State - ShouldBlock:", shouldBlock, "BlockList:", blockList);

    const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
    console.log("[TEST] Active DNR Rules:", currentRules);

    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    const isBlocked = blockList?.some(domain => hostname.includes(domain));
    console.log("[TEST] Is URL in blocklist?", isBlocked);

    const matchingRule = currentRules.find(rule =>
      rule.condition.urlFilter && hostname.includes(rule.condition.urlFilter.replace('||', ''))
    );
    console.log("[TEST] Matching DNR Rule:", matchingRule);

    return {
      shouldBlock,
      isBlocked,
      hasMatchingRule: !!matchingRule
    };
  } catch (err) {
    console.error("[TEST] Error testing URL:", err);
  }
}

// Expose tests to global scope for console usage
self.testAPI = testAPI;
self.testBlockingRule = testBlockingRule;
