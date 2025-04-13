document.getElementById("signInBtn").addEventListener("click", () => {
    chrome.tabs.create({
      url: "http://localhost:3000/auth/signin?callbackUrl=http://localhost:3000/extension-success",
    });
  });