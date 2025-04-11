const toggle = document.getElementById('toggle');
const statusText = document.getElementById("statusText");

chrome.storage.sync.get("enabled", (data) => {
    const isEnabled = data.enabled ?? false;
    toggle.checked = isEnabled;
    statusText.textContent = `AutoNuke: ${isEnabled ? "On" : "Off"}`;
    console.log("Initial state loaded:", isEnabled ? "On" : "Off");
});

toggle.addEventListener("change", () => {
    const isEnabled = toggle.checked;
    console.log("Toggle state changed to:", isEnabled ? "On" : "Off");
    chrome.storage.sync.set({enabled: isEnabled }, () => {
        console.log("Updated storage with enabled:", isEnabled);
    }) ;
    statusText.textContent = `AutoNuke: ${isEnabled ? "On": "Off"}`;
});

