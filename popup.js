document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
  
    // Listen for messages from background.js
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "threatDetected") {
        output.innerHTML = `
          🚨 Suspicious Connection Detected! <br>
          <b>IP:</b> ${message.ip} <br>
          <b>URL:</b> ${message.url}
        `;
      }
    });
  });
  