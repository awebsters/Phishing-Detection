var bkg = chrome.extension.getBackgroundPage();

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "scrapeLinks") {
    bkg.log(request.source);
  }
});

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  });
}

window.onload = onWindowLoad;