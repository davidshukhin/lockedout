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
