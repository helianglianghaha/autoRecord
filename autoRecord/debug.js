document.addEventListener('DOMContentLoaded', function() {
  var debugForm = document.getElementById('debugForm');
  var queryParams = new URLSearchParams(window.location.search);
  var debug = document.getElementById('debug');
  var dataParam = queryParams.get('data');

  var decodedString = decodeURIComponent(dataParam);
  var requestData = JSON.parse(decodedString);

  debugForm.method.value =""
  debugForm.url.value=""
  debugForm.headers.value=""
  debugForm.body.value=""



  var delHeaderAfter =delHeaderPro(requestData.requestHeaders)

  if(requestData.method==="GET"){
    debugForm.method.value = requestData.method || '';
    debugForm.url.value = requestData.url || '';
    debugForm.headers.value = JSON.stringify(delHeaderAfter,null,2) || '';
    debugForm.body.value = JSON.stringify(requestData.requestBody,null,2) || '';
  }else{
    chrome.storage.local.get('totalHeaders',(data)=>{
      var postRequsetHeaders=delHeaderPro(data.totalHeaders)
      var postData=JSON.parse(localStorage.getItem("postRequestData"));
      debugForm.method.value = postData.method || '';
      debugForm.url.value = postData.url || '';
      debugForm.headers.value = JSON.stringify(postRequsetHeaders,null,2) || '';
      debugForm.body.value = JSON.stringify(JSON.parse(JSON.parse(postData.requestBody)),null,2) || '';
    })
  }

  debug.addEventListener('click',function () {
        if (debugForm.method.value === "get") {
          sendRequest(requestData);
        } else {
          var postData = {
            url: debugForm.url.value,
            method: debugForm.method.value,
            requestHeaders: debugForm.headers.value,
            requestBody: debugForm.body.value
          }
          sendRequest(postData)
        }
      }

  );
  function delHeaderPro(headers) {
    // headers['authorization']=headers['Authorization']
    for(var key in headers){
      if(key==="Authorization"){

      }else{
        delete headers[key]
      }
    }
    return headers
  }
  function showAlert(message) {
      var alertBox = document.createElement("span");
      alertBox.textContent = message;
      alertBox.style.backgroundColor = "#67C23A";
      alertBox.style.border = "1px solid #ccc";
      alertBox.style.padding = "10px";
      alertBox.style.position = "fixed";
      alertBox.style.top = "60%";
      alertBox.style.color="white";
      alertBox.style.left = "50%";
      alertBox.style.transform = "translate(-50%, -50%)";
      alertBox.style.transition = "opacity 0.5s";
      alertBox.style.opacity = "1";

      document.body.appendChild(alertBox);

      // 延迟2秒后关闭提示框
      setTimeout(function() {
        alertBox.style.opacity = "0";
        setTimeout(function() {
          document.body.removeChild(alertBox);
        }, 500);
      }, 2000);
    }
  function sendRequest(requestData) {
    // import axios from 'axios'

    const url=requestData.url
    const method=requestData.method
    const headers=JSON.parse(requestData.requestHeaders)

    const body=JSON.stringify(requestData.requestBody)

    if(method=="GET"){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = xhr.responseText;
            debugForm.response.value=JSON.stringify(JSON.parse(response),null,2);
            showAlert("请求成功")
          } else {
            console.error('Request failed with status:', xhr.status);
          }
        }
      };
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', headers['Authorization']);
      xhr.send();


    }else if(method=="POST"){
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = xhr.responseText;
            debugForm.response.value=JSON.stringify(JSON.parse(response),null,2);
            showAlert("请求成功")
          } else {
            console.error('Request failed with status:', xhr.status);
          }
        }
      };
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', headers['Authorization']);
      // alert('body'+debugForm.body.value)
      xhr.send(debugForm.body.value);



      // axios.post(url, body, { headers })
      //   .then(response => {
      //     debugForm.response.value=JSON.stringify(response.data,null,2);
      //   })
      //   .catch(error => {
      //     alert(error);
      //   });
    }
    else if(requestData.method=="DELETE"){
      axios.delete(url, body, { headers })
        .then(response => {
          debugForm.response.value=JSON.stringify(response.data,null,2);
        })
        .catch(error => {
          alert(error);
        });
    }
  }

});
