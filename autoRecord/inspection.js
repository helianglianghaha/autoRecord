chrome.storage.local.get('xunJianList', function(data) {
    var xunJianList = data.xunJianList || [];

    returnRequestList(xunJianList);
  });


// 获取表格和相关元素
var table = document.getElementById('inspection-table');
var tbody = document.getElementById('inspection-rows');
var tbodySummary=document.getElementById('summary-rows');
var downLoadRequest=document.getElementById('downLoadRequest');
var uploadRequest=document.getElementById('uploadRequest');

downLoadRequest.addEventListener('click',function () {

    chrome.storage.local.get('xunJianList', function (data) {
        var xunJianList = data.xunJianList || [];
        saveLocalVariableToJsonFile(xunJianList)
    });
});
function saveLocalVariableToJsonFile(yourLocalVariable) {
  var jsonData = JSON.stringify(yourLocalVariable, null, 2); // 第二个参数是缩进用于更好的可读性

  var blob = new Blob([jsonData], { type: 'application/json' });

  var downloadLink = document.createElement('a');
  downloadLink.download = 'requests.json';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.click();
}

uploadRequest.addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    try {
      var jsonData = JSON.parse(e.target.result);
      // 在这里可以将jsonData保存为本地变量
      console.log('成功读取JSON文件并保存为本地变量:', jsonData);
      chrome.storage.local.remove('xunJianList');
      // chrome.storage.local.set('xunJianList',jsonData);

      chrome.storage.local.set({ xunJianList: jsonData }, function() {
                        alert("文件上传成功");
                      });
      chrome.storage.local.get('xunJianList',(data)=>{
          var xunJianList=data.xunJianList;
          renderInspections(xunJianList);
          // updateSummary();
      })


    } catch (error) {
      console.error('读取JSON文件出错：', error);
    }
  };

  reader.readAsText(file);
});


let requestList=[]
function xunJianRqueset(){
    chrome.storage.local.get('xunJianList',(data)=>{

        var xunJianList = data.xunJianList || [];


        for (var i = 0; i < xunJianList.length; i++) {
          (function(index) {
            var requestData=xunJianList[index]
                console.log("===========开始执行定时任务=============")
                requestList=[]
                console.log("=====开始"+JSON.stringify(xunJianList[index]))
                if(requestData.method==="GET"){
                    console.log('======GET请求======')
                    chrome.storage.local.get('totalHeaders',(data)=>{
                            // console.log(">totalHeaders:"+JSON.stringify(data.totalHeaders))
                            var postRequsetHeaders=delHeaderPro(data.totalHeaders)
                            var requestList={
                            method :requestData.method,
                            url : requestData.url,
                            requestHeaders : JSON.stringify(postRequsetHeaders),
                            // requestHeaders : JSON.stringify(delHeaderPro(requestData.requestHeaders)),
                            body : JSON.stringify(requestData.requestBody),
                            assertResult:JSON.stringify(requestData.assertResult),
                            afindex:index,
                            elementLength:xunJianList.length,
                                result:''
                            }
                            configAssertFirst(requestList)
                        })
                  }else{
                        console.log('======POST请求======')
                        chrome.storage.local.get('totalHeaders',(data)=>{
                        console.log(data)
                        var postRequsetHeaders=delHeaderPro(data.totalHeaders)
                        var requestListafter={
                        method :requestData.method,
                        url : requestData.url,
                        requestHeaders : JSON.stringify(postRequsetHeaders),
                        body : JSON.stringify(JSON.parse(JSON.parse(requestData.requestBody))),
                        assertResult:JSON.stringify(requestData.assertResult),
                        afindex:index,
                        elementLength:xunJianList.length,
                            result:''
                        }
                        configAssertFirst(requestListafter)
                    })
              }
                console.log("当前执行元素index"+JSON.stringify(index))

          })(i);
        }
        updateSummary()
    })

}
function delHeaderPro(headers) {
    for(var key in headers){
      if(key==="Authorization"){

      }else{
        delete headers[key]
      }
    }
    return headers
  }
function returnRequestList(xunJianList){

          renderInspections(xunJianList);

}

function configAssertFirst(requestData){
        console.log("=======接口执行开始=========")
        console.log(JSON.stringify(requestData))
        var url=requestData.url
        var method=requestData.method
        var headers=JSON.parse((requestData.requestHeaders))
        if(method=="GET"){
            var body={}
        }else{
             var body=(requestData.body)
        }

        var assertData=(requestData.assertResult)

        if(method=="GET"){
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                var response = (xhr.responseText);
                  if(response.includes(assertData)){
                      chrome.storage.local.get('xunJianList', function(data) {
                      var xunJianList = data.xunJianList || [];
                      var index=requestData.afindex
                      console.log(typeof(requestData.afindex))
                      // console.log(JSON.stringify(xunJianList))
                      xunJianList[(requestData.afindex)].result = "Success";
                      console.log(JSON.stringify(requestData))
                      chrome.storage.local.set({ xunJianList: xunJianList }, function() {
                        console.log("执行成功");
                      });
                      renderInspections(xunJianList)
                    });
                      console.log("执行成功")
                  }else{
                     var  message=(">出BUG了,断言信息不在返回值中 \n"+
                          ">请求方法:"+method+"\n"+
                          ">url:"+url+"\n"+
                          ">断言值:"+assertData+"\n"+
                          ">返回值:"+JSON.stringify(xhr.responseText))
                        console.log("post请求"+JSON.stringify(requestData))
                      chrome.storage.local.get('xunJianList', function(data) {
                      var xunJianList = data.xunJianList || [];
                      xunJianList[requestData.afindex].result = "Fail";
                      chrome.storage.local.set({ xunJianList: xunJianList }, function() {
                        // console.log("执行成功");
                      });
                      renderInspections(xunJianList)
                    });
                      // console.log("requestList",requestList)
                      sendNotificationToRobot(message)
                  }
              } else {
                var message=("接口请求异常,断言信息不在返回值中 \n"+
                               ">请求方法:"+method+"\n"+
                               ">URL:"+url+"\n"+
                               ">Body:"+body+"\n"+
                               ">断言值:"+assertData+"\n"+
                               ">返回值:"+JSON.stringify(xhr.responseText))
                sendNotificationToRobot(message)
              }
            }
          };
          xhr.setRequestHeader('Content-Type', 'application/json');
          // console.log(JSON.stringify(headers))
          xhr.setRequestHeader('Authorization', headers['Authorization']);
          xhr.send();
        }else if(method=="POST"){
            chrome.storage.local.get('totalHeaders',(data)=>{
                // console.log('获取到的post请求'+JSON.stringify(data.totalHeaders))
                var postRequsetHeaders=delHeaderPro(data.totalHeaders)
                var xhr = new XMLHttpRequest();
                  xhr.open('POST', url, true);
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                      if (xhr.status === 200) {
                        var response = xhr.responseText;
                        if(response.includes(assertData)){
                              chrome.storage.local.get('xunJianList', function(data) {
                              var xunJianList = data.xunJianList || [];
                              xunJianList[requestData.afindex].result = "Success";
                              chrome.storage.local.set({ xunJianList: xunJianList }, function() {
                              });
                              console.log("post执行成功"+JSON.stringify(xunJianList[requestData.afindex]))
                              renderInspections(xunJianList)
                        });
                            console.log("执行成功")
                      }else{
                           var message=("接口请求异常,断言信息不在返回值中 \n"+
                               ">请求方法:"+method+"\n"+
                               ">URL:"+url+"\n"+
                               ">Body:"+body+"\n"+
                               ">断言值:"+assertData+"\n"+
                               ">返回值:"+JSON.stringify(xhr.responseText))

                            sendNotificationToRobot(message)
                            chrome.storage.local.get('xunJianList', function(data) {
                              var xunJianList = data.xunJianList || [];
                              xunJianList[requestData.afindex].result = "Fail";
                              console.log("异常POST"+JSON.stringify( xunJianList[requestData.afindex]))
                              chrome.storage.local.set({ xunJianList: xunJianList }, function() {
                              });
                              renderInspections(xunJianList)
                            });
                        }
                      } else {
                        var message=("接口请求异常,断言信息不在返回值中 \n"+
                               ">请求方法:"+method+"\n"+
                               ">URL:"+url+"\n"+
                               ">Body:"+body+"\n"+
                               ">断言值:"+assertData+"\n"+
                               ">返回值:"+JSON.stringify(xhr.responseText))
                        sendNotificationToRobot(message)
                      }
                    }
                  };
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.setRequestHeader('Authorization', postRequsetHeaders['Authorization']);
              xhr.send(body);
            })
        }
        else if(requestData.method=="DELETE"){
          axios.delete(url, body, { headers })
            .then(response => {

              var assertData=assertObject(response)
                requestData.assertResult=assertData
                return requestData
            })
            .catch(error => {
              console.log('>接口请求出错: \n'+error);
            });
        }
        if(requestData.lastIndex+1===requestData.elementLength){
            console.log("执行到最后一个元素了")
            chrome.storage.local.set('xunJianList',(requestList))
            renderInspections(requestList)

        }
        console.log("=======接口执行结束=========")
}

function checkResult(message){

}
function sendNotificationToRobot(message) {
  // 使用企信机器人的 API 或 SDK 发送通知消息
  // 请根据企信机器人的文档和要求进行相应的配置和调用

    chrome.storage.local.get('noticeList', function(data) {
        var noticeList=data.noticeList|| [];
        if(noticeList.length===0){
           alert('企信通知为空')
        }else{
            noticeList.forEach(function(notice, index) {
              var webhookUrl = notice;
              var requestBody = {
                msgtype: 'text',
                text: {
                  content: message
                }
              };
              var xhr = new XMLHttpRequest();
              xhr.open('POST', webhookUrl, true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    console.log('企信机器人通知发送成功');
                  } else {
                    console.log('企信机器人通知发送失败');
                  }
                }
              };
              xhr.send(JSON.stringify(requestBody));
            })
        }
    })

  // 示例代码（假设使用企信机器人的 webhook）

}

function assertObject(obj){
   // 获取对象的所有键的数组
  var keys = Object.keys(obj);

  // 随机选择一个键
  var randomKey = keys[Math.floor(Math.random() * keys.length)];

  // 返回键值对
  return randomKey
}


// 渲染巡检列表
function renderInspections(xunJianList) {
  tbody.innerHTML = '';

  xunJianList.forEach(function(inspection,index) {
    var row = document.createElement('tr');

    var methodCell = document.createElement('td');
    methodCell.textContent = inspection.method;
    row.appendChild(methodCell);

    var protocolCell = document.createElement('td');
    protocolCell.textContent = getProtocol(inspection.url);
    row.appendChild(protocolCell);

    var domainCell = document.createElement('td');
    domainCell.textContent = getDomainFromUrl(inspection.url);
    row.appendChild(domainCell);

    var routeCell = document.createElement('td');
    routeCell.textContent = getSingleRoute(inspection.url);
    row.appendChild(routeCell);

    var assertCell = document.createElement('td');
    assertCell.textContent = inspection.assertResult || "未设置";
    row.appendChild(assertCell);

    var resultCell = document.createElement('td');
    resultCell.textContent = inspection.result || "未执行";
    if(inspection.result==="Success"){
        resultCell.style.color="#67C23A"
    }
    if(inspection.result==="Fail"){
        row.style.color="red"
    }

    row.appendChild(resultCell);

    var actionCell = document.createElement('td');

    var assertButton = document.createElement('button');
    assertButton.textContent = '修改断言';
    assertButton.dataset.index=index;
    assertButton.id="assertButton";
    assertButton.addEventListener('click',configAssert);
    actionCell.appendChild(assertButton);


    var detailsXunJianButton = document.createElement('button');
    detailsXunJianButton.textContent = '查看详情';
    detailsXunJianButton.dataset.index=index;
    detailsXunJianButton.id=""
    detailsXunJianButton.addEventListener('click', showXunjianRequestDetails);
    actionCell.appendChild(detailsXunJianButton);

    var debugButton = document.createElement('button');
    debugButton.textContent = '接口调试';
    debugButton.dataset.index=index;
    debugButton.id="debugButton";
    debugButton.addEventListener('click',debugRequest);
    actionCell.appendChild(debugButton);

    var cancelButton = document.createElement('button');
    cancelButton.textContent = '删除';
    cancelButton.style.background='#F56C6C';
    cancelButton.style.color='white';
    cancelButton.style.border='0px solid #dcdfe6;'
    cancelButton.dataset.index=index;
    cancelButton.id="delButton";
    cancelButton.addEventListener('click',deleteRequest);
    actionCell.appendChild(cancelButton);

    row.appendChild(actionCell);

    tbody.appendChild(row);
  });
  updateSummary()
}

// 渲染汇总结果
function updateSummary() {
      tbodySummary.innerHTML = '';
      var count = 0;
        var failCount=0;
        var undoCont=0;
        chrome.storage.local.get('xunJianList', function(data) {
        for (var i = 0; i < data.xunJianList.length; i++) {
          if (data.xunJianList[i].result === "Success") {
            count++;
          }else if(data.xunJianList[i].result === "Fail"){
            failCount++;
          }else{
              undoCont++;
          }
        }

      var totalCount = data.xunJianList.length;
      var successCount = count
      var failureCount = failCount;
      var successRate = (successCount / totalCount * 100).toFixed(2)+"%";

        var row = document.createElement('tr');

        var methodCell = document.createElement('td');
        methodCell.textContent =totalCount ;
        row.appendChild(methodCell);

        var protocolCell = document.createElement('td');
        protocolCell.textContent =successCount ;
        row.appendChild(protocolCell);

        var domainCell = document.createElement('td');
        domainCell.textContent = failureCount;
        row.appendChild(domainCell);

        var routeCell = document.createElement('td');
        routeCell.textContent =successRate ;
        row.appendChild(routeCell);

        tbodySummary.appendChild(row);
    })


}

function debugRequest(event){
    var index = parseInt(event.target.dataset.index);
    var debugUrl = chrome.runtime.getURL('debug.html');
    chrome.storage.local.get('xunJianList', function(data) {
    var xunJianList =data.xunJianList;
    var request=xunJianList[index];

    var queryParams = new URLSearchParams();
    if(request.method==="GET"){
        queryParams.set('data', JSON.stringify(request));
        debugUrl += '?' + queryParams.toString();
        window.open(debugUrl);
    }
    else{
        chrome.storage.local.remove('postRequestData', function() {
              console.log('postRequestData successfully removed');
            });
        localStorage.setItem("postRequestData", JSON.stringify(request));
        queryParams.set('data', JSON.stringify(request.method));
        debugUrl += '?' + queryParams.toString();
        window.open(debugUrl);
      }

    })

}


function showXunjianRequestDetails(event){
    var index = parseInt(event.target.dataset.index);
        chrome.storage.local.get('xunJianList', function(data) {
          var xunJianListData = data.xunJianList || [];
          var xunjianData = xunJianListData[index];
          alert('返回值:\n\n' + JSON.stringify(xunjianData,null,2));
        });
}

function deleteRequest(event){
    var index = parseInt(event.target.dataset.index);
        chrome.storage.local.get('xunJianList', function(data) {
          var xunJianList = data.xunJianList || [];
          xunJianList.splice(index,1)
          chrome.storage.local.set({ xunJianList: xunJianList }, function() {
            alert("删除成功");
          });
          renderInspections(xunJianList)

        });

}

function configAssert(event){
    var index = parseInt(event.target.dataset.index);
    chrome.storage.local.get('xunJianList', function(data) {
        var xunJianList=data.xunJianList;
        const assertResult = xunJianList[index].assertResult;
          const editAssertResult = prompt('请填写断言', assertResult);
          if (editAssertResult) {
            xunJianList[index].assertResult = editAssertResult;
            chrome.storage.local.set({ xunJianList });
            renderInspections(xunJianList);
          }

    });

}
function saveXunJianList() {
  chrome.storage.local.set({ whitelist });
}
function openAssertionConfiguration() {
  // 在此处创建断言配置界面，例如弹出窗口或模态框
  var newValue = prompt('请输入要更新的属性值：');
  // 在保存后更新列表
  if (newValue) {
    updateObjectProperty(newValue);
    updateList();
  }
}

function escapeSpecialCharacters(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  return str;
}

  function getProtocol(url) {
      const prefixes = ["http://", "https://"];
      for (const prefix of prefixes) {
        if (url.startsWith(prefix)) {
          return prefix.replace('://', '')
        }
      }
      return null;
    }




// 取消巡检按钮点击事件处理函数
function handleCancelInspection(event) {
  var row = event.target.closest('tr');
  var index = Array.from(row.parentNode.children).indexOf(row);
  inspections.splice(index, 1); // 从数据中移除相应的巡检记录
  renderInspections();
  updateSummaryResults();
}


 function showRequestDetails(event) {
        var index = parseInt(event.target.dataset.index);
        chrome.storage.local.get('requests', function(data) {
          var requests = data.requests || [];
          var request = requests[index];

          alert('Response:\n\n' + JSON.stringify(request,null,2));
        });
      }

  function getDomainFromUrl(url) {
    var domain = '';
    var match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
    if (match && match[1]) {
      domain = match[1];
    }
    return domain;
  }

   function getRequestRoute(url) {
      const prefixes = ["http://", "https://"];
      for (const prefix of prefixes) {
        if (url.startsWith(prefix)) {
          const domain=getDomainFromUrl(url)
          const routeUrl=prefix+domain
          return replaceAmpersand(url.substring(routeUrl.length));
        }
      }
      return null;
    }

    function replaceAmpersand(str) {
  return str.replace(/&/g, '&amp;');
}

  function getSingleRoute(url) {
    var route = '';
    var match = url.match(/https?:\/\/[^\/]+(\/[^?]+)/i);
    if (match && match[1]){
      route = match[1];
    }
    return route;
  }

//  定时任务
setInterval(xunJianRqueset, 3*60* 1000);

