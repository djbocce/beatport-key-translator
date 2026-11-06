const toggle = document.getElementById("toggle");

// Load saved state
chrome.storage.sync.get("enabled", (data) => {
  toggle.checked = data.enabled ?? true;
});

// Save state when toggled
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});
