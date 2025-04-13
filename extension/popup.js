document.addEventListener("DOMContentLoaded", async () => {
  const button = document.getElementById("signInBtn");

  if (button) {
    try {
      const res = await fetch("http://localhost:3000/api/check-session", {
        credentials: "include",
      });
      const data = await res.json();

      if (!data.signedIn) {
        button.style.display = "block"; // show the button
      } else {
        console.log("User is already signed in:", data.user);
      }
    } catch (err) {
      console.error("Session check failed", err);
      button.style.display = "block"; // fallback: show sign-in just in case
    }

    button.addEventListener("click", () => {
      chrome.tabs.create({
        url: "http://localhost:3000/auth/signin?callbackUrl=http://localhost:3000/extension-success",
      });
    });
  } else {
    console.error("The signInBtn element was not found in the DOM.");
  }
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
