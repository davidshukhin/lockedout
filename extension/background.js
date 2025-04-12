// Testing for extension
const blockedSites = [
    "*://www.reddit.com/*",
    "*://www.tiktok.com/*",
    "*://twitter.com/*"
  ];
  
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      return { cancel: true };
    },
    { urls: blockedSites },
    ["blocking"]
  );
  