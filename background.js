chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "injectInterceptor") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["page-interceptor.js"],
      world: "MAIN",
    });
  }
});
