// background.js
function updateBlockingRules(blockList: string[]): void {
  const rules: chrome.declarativeNetRequest.Rule[] = blockList.map((domain, index): chrome.declarativeNetRequest.Rule => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" as chrome.declarativeNetRequest.RuleActionType },
    condition: {
      urlFilter: domain,
      resourceTypes: ["main_frame"] as chrome.declarativeNetRequest.ResourceType[],
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: rules.map(rule => rule.id),
      addRules: rules,
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error updating rules:", chrome.runtime.lastError);
      } else {
        console.log("Blocking rules updated successfully.");
      }
    }
  );
}

// Example polling every 5 minutes:
async function syncBlockList() {
  try {
    const response = await fetch('https://your-backend-domain.com/api/blocklist', {
      credentials: 'include'  // or use tokens as appropriate
    });
    const data = await response.json();
    updateBlockingRules(data.blockList || []);
  } catch (error) {
    console.error("Failed to sync block list:", error);
  }
}

// Initial sync, then repeat periodically:
syncBlockList();
setInterval(syncBlockList, 5 * 60 * 1000);
