
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var requestHeaders = details.requestHeaders.reduce(function(headers, header) {
      headers[header.name] = header.value;
      return headers;
    }, {});

    if(details.method==="GET"){
        var requestData = {
        requestId:details.requestId,
        type: details.type,
        method: details.method,
        url: details.url,
        requestHeaders: requestHeaders,
        requestBody: {},
        response:"",
        assertResult:"操作成功",
        result:""
    };

    chrome.storage.local.get("requests", function(data) {
      var requests = data.requests || [];
      requests.push(requestData);
      chrome.storage.local.set({ "requests": requests });
      if('Authorization' in requestHeaders && requestHeaders['Authorization']!=='undefined'){
        chrome.storage.local.set({ "totalHeaders": requestHeaders });
        // console.log('requestHeaders设置'+JSON.stringify(requestHeaders))
        // console.log("totalHeaders设置成功")
      }
    });
    }
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);



chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (
      details.method === 'POST' &&
      details.requestBody &&
      details.requestBody.raw &&
      details.requestBody.raw[0].bytes
    ) {
        chrome.storage.local.get('totalHeaders',(data)=>{
        // var  stringHeaders=data.totalHeaders

        const decoder = new TextDecoder('utf-8');
        const requestBody = decoder.decode(details.requestBody.raw[0].bytes);
        const jsonData = JSON.stringify(requestBody);
          var requestInfo = {
            url: details.url,
            requestId:details.requestId,
            method: details.method,
            requestHeaders: {},
            requestBody: jsonData,
            response:"",
            assertResult:"操作成功",
            result:""
          };
                chrome.storage.local.get('requests', function(data) {
                var requests = data.requests || [];
                requests.push(requestInfo);
                chrome.storage.local.set({ 'requests': requests });
              });
            });
        }
  },
  { urls: ['<all_urls>'] },
  ["requestBody"]
);











