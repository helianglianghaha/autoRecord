
document.addEventListener('DOMContentLoaded', function() {
  // var filterSwitch = document.getElementById('filterSwitch');
  var clearButton = document.getElementById('clearButton');
  var requestTableBody = document.getElementById('requestTableBody');
  var downloadButton = document.getElementById('downloadButton');

  // Function to handle whitelist configuration
function openWhitelistPopup() {
  const whitelistWindow = window.open('whitelist.html', '_blank', 'width=400,height=300');

}



document.getElementById('viewWhitelistBtn').addEventListener('click', openWhitelistPopup);

  downloadButton.addEventListener('click',function () {

    chrome.storage.local.get('requests', function(data) {
    var requests = data.requests || [];
    const jmeterXML = generateJMeterXML(requests);
    saveJMeterFile(jmeterXML);
  });

function saveJMeterFile(jmeterXML) {
    const blob = new Blob([jmeterXML], { type: 'application/xml' });

    // Prompt the user to save the file
    const saveLink = document.createElement('a');
    saveLink.href = URL.createObjectURL(blob);
    saveLink.download = 'requests.jmx';
    saveLink.click();
  }

    function generateJMeterXML(requests) {

        let requestXML='<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.5">\n' +
            '  <hashTree>\n' +
            '    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="测试计划" enabled="true">\n' +
            '      <stringProp name="TestPlan.comments"></stringProp>\n' +
            '      <boolProp name="TestPlan.functional_mode">false</boolProp>\n' +
            '      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>\n' +
            '      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>\n' +
            '      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="用户定义的变量" enabled="true">\n' +
            '        <collectionProp name="Arguments.arguments"/>\n' +
            '      </elementProp>\n' +
            '      <stringProp name="TestPlan.user_define_classpath"></stringProp>\n' +
            '    </TestPlan>\n' +
            '    <hashTree>\n' +
            '      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="线程组" enabled="true">\n' +
            '        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>\n' +
            '        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="循环控制器" enabled="true">\n' +
            '          <boolProp name="LoopController.continue_forever">false</boolProp>\n' +
            '          <stringProp name="LoopController.loops">1</stringProp>\n' +
            '        </elementProp>\n' +
            '        <stringProp name="ThreadGroup.num_threads">1</stringProp>\n' +
            '        <stringProp name="ThreadGroup.ramp_time">1</stringProp>\n' +
            '        <boolProp name="ThreadGroup.scheduler">false</boolProp>\n' +
            '        <stringProp name="ThreadGroup.duration"></stringProp>\n' +
            '        <stringProp name="ThreadGroup.delay"></stringProp>\n' +
            '        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>\n' +
            '      </ThreadGroup>\n' +
            '      <hashTree>\n' +
            '        <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP信息头管理器" enabled="true">\n' +
            '          <collectionProp name="HeaderManager.headers">\n' +
            '            <elementProp name="" elementType="Header">\n' +
            '              <stringProp name="Header.name">Content-Type</stringProp>\n' +
            '              <stringProp name="Header.value">application/json</stringProp>\n' +
            '            </elementProp>\n' +
            '            <elementProp name="" elementType="Header">\n' +
            '              <stringProp name="Header.name">authorization</stringProp>\n' +
            '              <stringProp name="Header.value"></stringProp>\n' +
            '            </elementProp>\n' +
            '          </collectionProp>\n' +
            '        </HeaderManager>\n' +
            '        <hashTree/>\n' +
            '        <CookieManager guiclass="CookiePanel" testclass="CookieManager" testname="HTTP Cookie管理器" enabled="true">\n' +
            '          <collectionProp name="CookieManager.cookies"/>\n' +
            '          <boolProp name="CookieManager.clearEachIteration">false</boolProp>\n' +
            '          <boolProp name="CookieManager.controlledByThreadGroup">false</boolProp>\n' +
            '        </CookieManager>\n' +
            '        <hashTree/>\n' +
            '        <ConfigTestElement guiclass="HttpDefaultsGui" testclass="ConfigTestElement" testname="HTTP请求默认值" enabled="true">\n' +
            '          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="用户定义的变量" enabled="true">\n' +
            '            <collectionProp name="Arguments.arguments"/>\n' +
            '          </elementProp>\n' +
            '          <stringProp name="HTTPSampler.domain"></stringProp>\n' +
            '          <stringProp name="HTTPSampler.port"></stringProp>\n' +
            '          <stringProp name="HTTPSampler.protocol"></stringProp>\n' +
            '          <stringProp name="HTTPSampler.contentEncoding">utf-8</stringProp>\n' +
            '          <stringProp name="HTTPSampler.path"></stringProp>\n' +
            '          <stringProp name="HTTPSampler.concurrentPool">6</stringProp>\n' +
            '          <stringProp name="HTTPSampler.connect_timeout"></stringProp>\n' +
            '          <stringProp name="HTTPSampler.response_timeout"></stringProp>\n' +
            '        </ConfigTestElement>\n'+
            '<hashTree/>\n'


      for(let i =0;i<requests.length;i++){
        const request = requests[i];
        const domainList=['platform.admin.qidianbox.com','platformtest.boss.qidianbox.com','platformtest.admin.qidianbox.com','platform.boss.qidianbox.com','platform.api.qidianbox.com','platformtest.api.qidianbox.com']

        const httpProtocol=getProtocol(request.url);
        const httpDomain=getDomainFromUrl(request.url);

        const httpRote=getRequestRoute(request.url);
        const httpMethod=request.method;
        const httpSingleRoute=getSingleRoute(request.url);
        // if(domainList.includes(httpDomain)){
              if(httpMethod==='GET'){
                let getXml=
                    '<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname=\"'+httpSingleRoute+'\" enabled="true">\n' +
                    '          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname=\"'+httpSingleRoute+'\" enabled="true">\n' +
                    '            <collectionProp name="Arguments.arguments"/>\n' +
                    '          </elementProp>\n' +
                    '          <stringProp name="HTTPSampler.domain">'+httpDomain+'</stringProp>\n' +
                    '          <stringProp name="HTTPSampler.port"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.protocol">'+httpProtocol+'</stringProp>\n' +
                    '          <stringProp name="HTTPSampler.contentEncoding"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.path">'+httpRote+'</stringProp>\n' +
                    '          <stringProp name="HTTPSampler.method">'+httpMethod+'</stringProp>\n' +
                    '          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>\n' +
                    '          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>\n' +
                    '          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>\n' +
                    '          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>\n' +
                    '          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.connect_timeout"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>\n' +
                    '          <stringProp name="TestPlan.comments">注释</stringProp>\n' +
                    '        </HTTPSamplerProxy>\n'+
                    '<hashTree>\n' +
                    '          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">\n' +
                    '            <collectionProp name="Asserion.test_strings">\n' +
                    '              <stringProp name="789079806">操作成功</stringProp>\n' +
                    '            </collectionProp>\n' +
                    '            <stringProp name="Assertion.custom_message"></stringProp>\n' +
                    '            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>\n' +
                    '            <boolProp name="Assertion.assume_success">false</boolProp>\n' +
                    '            <intProp name="Assertion.test_type">16</intProp>\n' +
                    '          </ResponseAssertion>\n' +
                    '          <hashTree/>\n'+
                    '</hashTree>\n'
                requestXML += getXml;

              }else {
                const httpRespond=escapeSpecialCharacters(JSON.stringify(request.requestBody));

                let postXml=
                    ' <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname=\"'+httpSingleRoute+'\"enabled="true">\n' +
                    '          <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>\n' +
                    '          <elementProp name="HTTPsampler.Arguments" elementType="Arguments">\n' +
                    '            <collectionProp name="Arguments.arguments">\n' +
                    '              <elementProp name="" elementType="HTTPArgument">\n' +
                    '                <boolProp name="HTTPArgument.always_encode">false</boolProp>\n' +
                    '                <stringProp name="Argument.value">'+httpRespond+'</stringProp>\n' +
                    '                <stringProp name="Argument.metadata">=</stringProp>\n' +
                    '              </elementProp>\n' +
                    '            </collectionProp>\n' +
                    '          </elementProp>\n' +
                    '          <stringProp name="HTTPSampler.domain">'+httpDomain+'</stringProp>\n' +
                    '          <stringProp name="HTTPSampler.port"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.protocol">\'+httpProtocol+\'</stringProp>\n' +
                    '          <stringProp name="HTTPSampler.contentEncoding"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.path">'+httpRote+'</stringProp>\n' +
                    '          <stringProp name="HTTPSampler.method">'+httpMethod+'</stringProp>\n' +
                    '          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>\n' +
                    '          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>\n' +
                    '          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>\n' +
                    '          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>\n' +
                    '          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.connect_timeout"></stringProp>\n' +
                    '          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>\n' +
                    '          <stringProp name="TestPlan.comments">注释</stringProp>\n' +
                    '        </HTTPSamplerProxy>\n'+
                    '<hashTree>\n' +
                    '          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">\n' +
                    '            <collectionProp name="Asserion.test_strings">\n' +
                    '              <stringProp name="789079806">操作成功</stringProp>\n' +
                    '            </collectionProp>\n' +
                    '            <stringProp name="Assertion.custom_message"></stringProp>\n' +
                    '            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>\n' +
                    '            <boolProp name="Assertion.assume_success">false</boolProp>\n' +
                    '            <intProp name="Assertion.test_type">16</intProp>\n' +
                    '          </ResponseAssertion>\n' +
                    '          <hashTree/>\n'+
                        '</hashTree>\n'
                requestXML += postXml;

              }


        // }else{
        //   continue;
        // }
      }
      let endXml='        <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="查看结果树" enabled="true">\n' +
          '          <boolProp name="ResultCollector.error_logging">false</boolProp>\n' +
          '          <objProp>\n' +
          '            <name>saveConfig</name>\n' +
          '            <value class="SampleSaveConfiguration">\n' +
          '              <time>true</time>\n' +
          '              <latency>true</latency>\n' +
          '              <timestamp>true</timestamp>\n' +
          '              <success>true</success>\n' +
          '              <label>true</label>\n' +
          '              <code>true</code>\n' +
          '              <message>true</message>\n' +
          '              <threadName>true</threadName>\n' +
          '              <dataType>true</dataType>\n' +
          '              <encoding>false</encoding>\n' +
          '              <assertions>true</assertions>\n' +
          '              <subresults>true</subresults>\n' +
          '              <responseData>false</responseData>\n' +
          '              <samplerData>false</samplerData>\n' +
          '              <xml>false</xml>\n' +
          '              <fieldNames>true</fieldNames>\n' +
          '              <responseHeaders>false</responseHeaders>\n' +
          '              <requestHeaders>false</requestHeaders>\n' +
          '              <responseDataOnError>false</responseDataOnError>\n' +
          '              <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>\n' +
          '              <assertionsResultsToSave>0</assertionsResultsToSave>\n' +
          '              <bytes>true</bytes>\n' +
          '              <sentBytes>true</sentBytes>\n' +
          '              <url>true</url>\n' +
          '              <threadCounts>true</threadCounts>\n' +
          '              <idleTime>true</idleTime>\n' +
          '              <connectTime>true</connectTime>\n' +
          '            </value>\n' +
          '          </objProp>\n' +
          '          <stringProp name="filename"></stringProp>\n' +
          '        </ResultCollector>\n' +
          '        <hashTree/>\n' +
          '      </hashTree>\n' +
          '    </hashTree>\n' +
          '  </hashTree>\n' +
          '</jmeterTestPlan>'

        requestXML += endXml;
        return requestXML;
      };

  });

  clearButton.addEventListener('click', function() {
    requestTable.innerHTML = '';
    chrome.storage.local.remove('requests');
      var row = document.createElement('tr');
      // var domainCell = document.createElement('td');
      // domainCell.textContent = getDomainFromUrl(request.url);
      var methodCell = document.createElement('td');
      methodCell.textContent = '';
      var routeCell = document.createElement('td');
      routeCell.textContent = '';
      row.appendChild(methodCell);
      row.appendChild(routeCell);
      requestTableBody.appendChild(row);
  });

  chrome.storage.local.get('requests', function(data) {
    var requests = data.requests || [];
    // Render the table with the requests
    renderTable(requests);
  });



function renderTable(requests) {

    var table = document.getElementById('requestTable');
    var tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    // Populate the table with requests
  chrome.storage.local.get(['whitelist'], (result) => {
    whitelist = result.whitelist || [];
    // updateWhitelistDisplay();
    requests.forEach(function(request, index) {
      // if(isWhitelisted(request.url)){
      const hostName=getDomainFromUrl(request.url)
      if(whitelist.includes(hostName)){
        var row = document.createElement('tr');

      var protocolCell = document.createElement('td');
      protocolCell.textContent = getProtocol(request.url);

      var domainCell = document.createElement('td');
      domainCell.textContent = getDomainFromUrl(request.url);

      var methodCell = document.createElement('td');
      methodCell.textContent = request.method;

      var routeCell = document.createElement('td');
      routeCell.textContent = getSingleRoute(request.url);

      var resultCell = document.createElement('td');
      resultCell.textContent='--'
      var detailsCell = document.createElement('td');
      var detailsButton = document.createElement('button');

      detailsButton.textContent = '查看详情';
      detailsButton.dataset.index = index;
      detailsButton.id=""
      detailsButton.addEventListener('click', showRequestDetails);
      detailsCell.appendChild(detailsButton);

      row.appendChild(methodCell);
      row.appendChild(protocolCell);
      row.appendChild(domainCell);
      row.appendChild(routeCell);
      // row.appendChild(resultCell);
      row.appendChild(detailsCell);
      tbody.appendChild(row);
      }
    });
  });
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
    if (match && match[1]) {
      route = match[1];
    }
    return route;
  }


  function showRequestDetails(event) {
        var index = parseInt(event.target.dataset.index);
        chrome.storage.local.get('requests', function(data) {
          var requests = data.requests || [];
          var request = requests[index];

          alert('Request Details:\n\n' + JSON.stringify(request));
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


});
