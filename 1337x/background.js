const TARGET_URL = "https://1337x.to";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes(TARGET_URL)) {
        console.log("Target URL activated!");
        chrome.tabs.sendMessage(tabId, { action: "activate" });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const url = request.url;

    if (request.action === "openLink") {        

        chrome.tabs.create({ url: "https://1337x.to" + url });
        console.log("Opening link:", url);

    } else if (request.action === "magnetlink") {

        chrome.tabs.create({ url: url });
        chrome.tabs.remove(sender.tab.id);
        console.log("Closing tab:", sender.tab.id);

        
    }



});