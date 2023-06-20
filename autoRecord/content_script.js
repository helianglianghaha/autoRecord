// 使用XMLHttpRequest进行拦截
var originalXhrOpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, url, async) {
  if (method.toUpperCase() === 'POST' && this.setRequestHeader) {
    var originalSend = this.send;
    this.send = function(body) {
      if (body) {
        // 在这里处理请求体数据，例如将其发送给扩展的background脚本
        // body即为请求体的JSON数据
        chrome.runtime.sendMessage({ requestBody: body });
      }
      originalSend.apply(this, arguments);
    };
  }
  originalXhrOpen.apply(this, arguments);
};

// 使用fetch API进行拦截
var originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (options && options.method && options.method.toUpperCase() === 'POST') {
    var originalFetchFunction = originalFetch.bind(window);
    return originalFetchFunction(url, options).then(function(response) {
      if (options.body) {
        // 在这里处理请求体数据，例如将其发送给扩展的background脚本
        // options.body即为请求体的JSON数据
        chrome.runtime.sendMessage({ requestBody: options.body });
      }
      return response;
    });
  }
  return originalFetch.apply(this, arguments);
};
