function getLinks() {
  let tabHost = window.location.hostname.split(".").slice(-2);
  let tabDomainName = tabHost[0] + "." + tabHost[1];

  let aTags = [];
  let anchors = document.querySelectorAll("a");
  for (anchor in anchors) {
    // Lets filter out links on the same domain as the current page
    // Websites lke gmail have navigation that links to gmail (no point in running these)
    let url = anchors[anchor].href;

    try {
      let host = new URL(url).hostname.split(".").slice(-2);
      var domainName = host[0] + "." + host[1];
    } catch (error) {
      continue;
    }
    console.log(domainName);
    if (tabDomainName != domainName) {
      aTags.push(url);
    }
  }
  return aTags;
}

chrome.runtime.sendMessage({
  action: "scrapeLinks",
  source: getLinks(),
});
