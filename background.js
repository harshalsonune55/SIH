chrome.webRequest.onCompleted.addListener(async (details) => {
    let result = await checkThreat(details.ip, details.url, details.statusCode, Date.now());
    if (result.threat) {
      chrome.notifications.create({
        type: "basic",
        title: "Suspicious Connection Detected!",
        message: `${details.ip} → ${details.url}`
      });
  
      // Send message to popup if open
      chrome.runtime.sendMessage({
        type: "threatDetected",
        ip: details.ip,
        url: details.url
      });
    }
  }, { urls: ["<all_urls>"] });
  