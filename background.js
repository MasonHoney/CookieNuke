chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed. Setting alarm for cookie clearing");
    chrome.alarms.create("clearCookiesAtNoon", {
        when: getNextNoon(),
        periodInMinutes: 1440 // 24hrs
    });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm triggered:", alarm.name)
    if (alarm.name === "clearCookiesAtNoon") {
        clearAllCookies();
    }
});

function getNextNoon() {
    const now = new Date();
    const noon = new Date();
    noon.setHours(12, 0, 0, 0);
    if (now > noon) {
        noon.setDate(noon.getDate() + 1);
    }
    return noon.getTime();
}

function clearAllCookies() {
    chrome.cookies.getAll({}, (cookies) => {
        for (let cookie of cookies) {
            const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
            chrome.cookies.remove({
                url: url,
                name: cookie.name
            });
        }
    });
}