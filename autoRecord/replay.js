// 发送回放请求
function sendReplayRequest() {
  chrome.runtime.sendMessage({ action: 'replay' }, function(response) {
    // 处理回放数据
    displayResponseData(response);
  });
}

// 显示回放数据
function displayResponseData(trafficData) {
  const responseList = document.getElementById('responseList');
  responseList.innerHTML = ''; // 清空列表

  trafficData.forEach(function(data) {
    const listItem = document.createElement('li');
    const requestURL = document.createElement('p');
    requestURL.textContent = '请求URL: ' + data.request.url;
    const responseBody = document.createElement('p');
    responseBody.textContent = '响应体: ' + data.response.body;

    listItem.appendChild(requestURL);
    listItem.appendChild(responseBody);
    responseList.appendChild(listItem);
  });
}

// 点击回放按钮时触发回放请求
document.getElementById('replayButton').addEventListener('click', sendReplayRequest);
