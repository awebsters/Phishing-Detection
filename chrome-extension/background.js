const SERVER_URL = "http://3.139.57.29/";

var RUN = localStorage.getItem("autoRun") == "true";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "scrapeLinks") {
    let urls = request.source;
    let response;
    try {
      fetch(SERVER_URL + "/multi-predict", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urls),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          chrome.storage.local.set({ data: data });
          chrome.tabs.executeScript(null, {
            file: "injectWarnings.js",
          });
        });
    } catch (error) {
      console.error(error);
    }
  }
});

/*
  On a tab update, rescan if its the active tab
*/

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active && RUN) {
    // Only scan website tabs (not for example, setting tabs)
    if (tab.url.startsWith("http")) {
      chrome.tabs.executeScript(null, {
        file: "getPagesSource.js",
      });
    }
  }
});
