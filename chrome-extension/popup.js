var bkg = chrome.extension.getBackgroundPage();

chrome.runtime.onMessage.addListener( async function(request, sender) {
  if (request.action == "scrapeLinks") {
    bkg.log(request.source);
  let response;
  try {
    response = await fetch('18.216.209.229/8081/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: response.source.join(", "),
    })
    } catch (error) {
      console.error(error);
    }
  }
});

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  });
}

window.onload = onWindowLoad;