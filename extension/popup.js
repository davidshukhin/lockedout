document.addEventListener("DOMContentLoaded", async () => {
  const loginButton = document.getElementById("signInBtn");
  const userInfo = document.getElementById("userInfo");
  const logoutButton = document.getElementById("logoutButton");
  const statusDiv = document.getElementById("status");
  const blockListContainer = document.getElementById("blockList");

  // Function to check auth status and fetch block list
  async function checkAuthAndFetchBlockList() {
    try {
      const res = await fetch("http://localhost:3000/api/auth/session", {
        credentials: "include",
      });
      const session = await res.json();

      if (session && session.user) {
        // User is signed in
        if (statusDiv) {
          statusDiv.textContent = `Signed in as ${session.user.email}`;
          statusDiv.className = "status signed-in";
        }
        if (loginButton) loginButton.style.display = "none";
        if (userInfo) userInfo.style.display = "block";
        if (logoutButton) logoutButton.style.display = "block";
        
        // Fetch block list
        const blockListRes = await fetch("http://localhost:3000/api/blocklist", {
          credentials: "include"
        });
        const blockListData = await blockListRes.json();
        
        // Store block list in extension storage
        chrome.storage.local.set({ 
          AUTH_SESSION: session,
          BLOCK_LIST: blockListData.blockList
        });

        // Display block list if container exists
        if (blockListContainer && blockListData.blockList) {
          blockListContainer.innerHTML = `
            <h3>Blocked Sites</h3>
            <ul>
              ${blockListData.blockList.map(site => `<li>${site}</li>`).join('')}
            </ul>
          `;
        }
      } else {
        // User is not signed in
        if (statusDiv) {
          statusDiv.textContent = "Not signed in";
          statusDiv.className = "status signed-out";
        }
        if (loginButton) loginButton.style.display = "block";
        if (userInfo) userInfo.style.display = "none";
        if (logoutButton) logoutButton.style.display = "none";
        if (blockListContainer) blockListContainer.innerHTML = '';
        
        // Clear session and block list from storage
        chrome.storage.local.remove(['AUTH_SESSION', 'BLOCK_LIST']);
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
      if (statusDiv) {
        statusDiv.textContent = "Error checking auth status";
        statusDiv.className = "status error";
      }
      if (loginButton) loginButton.style.display = "block";
    }
  }

  // Check auth status and fetch block list when popup opens
  await checkAuthAndFetchBlockList();

  // Handle login button click
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      chrome.tabs.create({
        url: "http://localhost:3000/api/auth/signin",
      });
    });
  }

  // Handle logout button click
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/signout", {
          method: "POST",
          credentials: "include",
        });
        
        if (res.ok) {
          await checkAuthAndFetchBlockList(); // Refresh the UI
        }
      } catch (err) {
        console.error("Logout failed:", err);
      }
    });
  }

  // Listen for tab updates to detect successful sign-in
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
      changeInfo.url && 
      changeInfo.url.startsWith("http://localhost:3000") &&
      !changeInfo.url.includes("/api/auth/signin")
    ) {
      // Refresh auth status when returning to main site
      checkAuthAndFetchBlockList();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('configForm');
  const status = document.getElementById('status');
  
  // Load existing configuration
  chrome.storage.local.get(['SUPABASE_URL', 'SUPABASE_ANON_KEY'], (result) => {
    if (result.SUPABASE_URL) {
      document.getElementById('supabaseUrl').value = result.SUPABASE_URL;
    }
    if (result.SUPABASE_ANON_KEY) {
      document.getElementById('supabaseKey').value = result.SUPABASE_ANON_KEY;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const supabaseUrl = document.getElementById('supabaseUrl').value.trim();
    const supabaseKey = document.getElementById('supabaseKey').value.trim();
    
    if (!supabaseUrl || !supabaseKey) {
      showStatus('Please fill in all fields', false);
      return;
    }

    // Save to chrome.storage
    chrome.storage.local.set({
      SUPABASE_URL: supabaseUrl,
      SUPABASE_ANON_KEY: supabaseKey
    }, () => {
      if (chrome.runtime.lastError) {
        showStatus('Error saving configuration: ' + chrome.runtime.lastError.message, false);
      } else {
        showStatus('Configuration saved successfully!', true);
        // Reload the background script to apply new configuration
        chrome.runtime.reload();
      }
    });
  });

  function showStatus(message, success) {
    status.textContent = message;
    status.style.display = 'block';
    status.className = 'status ' + (success ? 'success' : 'error');
    
    // Hide the status message after 3 seconds
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
});

// Check auth status on popup open
document.addEventListener('DOMContentLoaded', async () => {
  const statusDiv = document.getElementById('status');
  const loginButton = document.getElementById('loginButton');
  const userInfo = document.getElementById('userInfo');
  const userName = document.getElementById('userName');
  const logoutButton = document.getElementById('logoutButton');

  // Check stored session
  const result = await chrome.storage.local.get(['SUPABASE_SESSION']);
  
  if (result.SUPABASE_SESSION) {
    statusDiv.textContent = 'Signed in';
    statusDiv.className = 'status signed-in';
    loginButton.style.display = 'none';
    userInfo.style.display = 'block';
    userName.textContent = result.SUPABASE_SESSION.user.email;
  } else {
    statusDiv.textContent = 'Not signed in';
    statusDiv.className = 'status signed-out';
    loginButton.style.display = 'block';
    userInfo.style.display = 'none';
  }

  // Handle login
  loginButton.addEventListener('click', () => {
    statusDiv.textContent = 'Redirecting to login...';
    statusDiv.className = 'status loading';
    chrome.tabs.create({
      url: 'http://localhost:3000/api/auth/signin'
    });
  });

  // Handle logout
  logoutButton.addEventListener('click', async () => {
    await chrome.storage.local.remove(['SUPABASE_SESSION']);
    statusDiv.textContent = 'Signed out';
    statusDiv.className = 'status signed-out';
    loginButton.style.display = 'block';
    userInfo.style.display = 'none';
  });
});

// Listen for auth success message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AUTH_SUCCESS') {
    chrome.storage.local.set({ 
      SUPABASE_SESSION: message.session,
      SUPABASE_URL: 'YOUR_SUPABASE_URL',
      SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY'
    }, () => {
      // Reload the popup to show updated status
      window.location.reload();
    });
  }
});
