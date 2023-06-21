

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes('.js')) {
      // JS file handling logic
      console.log("JS file URL: " + details.url);
    } else if (details.url.includes('.html')) {
      // HTML file handling logic
      console.log("HTML file URL: " + details.url);
    } else if ( details.url.includes('.ico')) {
      // ICO file handling logic
      console.log("ICO file URL: " + details.url);
    }else if ( details.url.includes('.png')) {
      // ICO file handling logic
      console.log("ICO file URL: " + details.url);
    }else if ( details.url.includes('.css')) {
      // ICO file handling logic
      console.log("ICO file URL: " + details.url);
    }
    else if ( details.url.includes('.woff')) {
      // ICO file handling logic
      console.log("ICO file URL: " + details.url);
    }
    else if ( details.url.includes('.jpg')) {
      // ICO file handling logic
      console.log("ICO file URL: " + details.url);
    }
    else{
        // if(isWhitelisted(details)){
            chrome.storage.local.get("requests", function(data) {
                  var requests = data.requests || [];
                  requests.push(details);
                  chrome.storage.local.set({ "requests": requests });
                });
      // }else{
      //       return { cancel: !isWhitelisted(details.url) };
      //   }

    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (
      details.method === 'POST' &&
      details.requestBody &&
      details.requestBody.raw &&
      details.requestBody.raw[0].bytes
    ) {
        const decoder = new TextDecoder('utf-8');
        const requestBody = decoder.decode(details.requestBody.raw[0].bytes);
        const jsonData = JSON.parse(requestBody);
      var requestInfo = {
        url: details.url,
        method: details.method,
        requestHeaders: details.requestHeaders,
        requestBody: jsonData
      };
        // if(isWhitelisted(details.url)){
            chrome.storage.local.get('requests', function(data) {
            var requests = data.requests || [];
            requests.push(requestInfo);
            chrome.storage.local.set({ 'requests': requests });
          });
        }
    // }
  },
  { urls: ['<all_urls>'] },
  ['requestBody']
);






