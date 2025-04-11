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

bigRedButton.addEventListener("click", () => {
    console.log("Big Red Button clicked! Nuking cookies now...");
    clearAllCookies(); // Clear all cookies immediately when clicked
    statusText.textContent = "AutoNuke: Off"; // Optionally reset status to "Off" after the manual nuke
});
function clearAllCookies() {
    chrome.cookies.getAll({}, (cookies) => {
        if (cookies.length === 0) {
            console.log("No cookies found to clear.");
        } else {
            console.log(`Found ${cookies.length} cookies. Nuking them now...`);
        }

        for (let cookie of cookies) {
            const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
            chrome.cookies.remove({
                url: url,
                name: cookie.name
            }, (result) => {
                if (result) {
                    console.log(`Cookie ${cookie.name} removed from ${url}`);
                } else {
                    console.log(`Failed to remove cookie ${cookie.name} from ${url}`);
                }
            });
        }
    });
}