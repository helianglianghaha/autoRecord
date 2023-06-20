<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.5">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="测试计划" enabled="true">
      <stringProp name="TestPlan.comments"></stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="用户定义的变量" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="线程组" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="循环控制器" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">1</stringProp>
        <stringProp name="ThreadGroup.ramp_time">1</stringProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"></stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
      </ThreadGroup>
      <hashTree>
        <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP信息头管理器" enabled="true">
          <collectionProp name="HeaderManager.headers">
            <elementProp name="" elementType="Header">
              <stringProp name="Header.name">Content-Type</stringProp>
              <stringProp name="Header.value">application/json</stringProp>
            </elementProp>
            <elementProp name="" elementType="Header">
              <stringProp name="Header.name">authorization</stringProp>
              <stringProp name="Header.value"></stringProp>
            </elementProp>
          </collectionProp>
        </HeaderManager>
        <hashTree/>
        <CookieManager guiclass="CookiePanel" testclass="CookieManager" testname="HTTP Cookie管理器" enabled="true">
          <collectionProp name="CookieManager.cookies"/>
          <boolProp name="CookieManager.clearEachIteration">false</boolProp>
          <boolProp name="CookieManager.controlledByThreadGroup">false</boolProp>
        </CookieManager>
        <hashTree/>
        <ConfigTestElement guiclass="HttpDefaultsGui" testclass="ConfigTestElement" testname="HTTP请求默认值" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="用户定义的变量" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain"></stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol"></stringProp>
          <stringProp name="HTTPSampler.contentEncoding">utf-8</stringProp>
          <stringProp name="HTTPSampler.path"></stringProp>
          <stringProp name="HTTPSampler.concurrentPool">6</stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </ConfigTestElement>
<hashTree/>
<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="/shop-common/msg/list" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="/shop-common/msg/list" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">platform.api.qidianbox.com</stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/shop-common/msg/list?is_read=0&amp;shop_id=3</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>
          <stringProp name="TestPlan.comments">注释</stringProp>
        </HTTPSamplerProxy>
<hashTree>
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="789079806">操作成功</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message"></stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">16</intProp>
          </ResponseAssertion>
          <hashTree/>
</hashTree>
<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="/shop-admin/product/info" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="/shop-admin/product/info" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">platform.api.qidianbox.com</stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/shop-admin/product/info?id=26&amp;shop_id=3</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>
          <stringProp name="TestPlan.comments">注释</stringProp>
        </HTTPSamplerProxy>
<hashTree>
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="789079806">操作成功</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message"></stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">16</intProp>
          </ResponseAssertion>
          <hashTree/>
</hashTree>
 <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="/shop-admin/product/edit"enabled="true">
          <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
            <collectionProp name="Arguments.arguments">
              <elementProp name="" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">{&quot;active_desc&quot;:&quot;限时抢购&quot;,&quot;attribute&quot;:[{&quot;attr_val&quot;:&quot;灰色&quot;,&quot;id&quot;:232,&quot;name&quot;:&quot;颜色&quot;,&quot;product_id&quot;:26},{&quot;attr_val&quot;:&quot;100X200&quot;,&quot;id&quot;:233,&quot;name&quot;:&quot;规格&quot;,&quot;product_id&quot;:26},{&quot;attr_val&quot;:&quot;双人&quot;,&quot;id&quot;:234,&quot;name&quot;:&quot;规格2&quot;,&quot;product_id&quot;:26}],&quot;category_id&quot;:3193,&quot;category_ids&quot;:&quot;1,1826,3193&quot;,&quot;category_names&quot;:&quot;家居建材&gt;床上用品&gt;被子/被芯定制&quot;,&quot;comment_group_id&quot;:0,&quot;desc&quot;:&quot;&quot;,&quot;detail&quot;:&quot;<p&gt;<img src=\&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/1686793547241t0oIOxCUaV.png\&quot; alt=\&quot;\&quot; data-href=\&quot;\&quot; style=\&quot;\&quot;/&gt;<img src=\&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/168679354723979QrZfAWDr.png\&quot; alt=\&quot;\&quot; data-href=\&quot;\&quot; style=\&quot;\&quot;/&gt;<img src=\&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/16867935472411FihC4FJ98.png\&quot; alt=\&quot;\&quot; data-href=\&quot;\&quot; style=\&quot;\&quot;/&gt;<img src=\&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/1686793547238HoPiQ15DxN.png\&quot; alt=\&quot;\&quot; data-href=\&quot;\&quot; style=\&quot;\&quot;/&gt;<img src=\&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/1686793547241strvmdq1ts.png\&quot; alt=\&quot;\&quot; data-href=\&quot;\&quot; style=\&quot;\&quot;/&gt;<img src=\&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/1686793547239jl6vHaKH4H.png\&quot; alt=\&quot;\&quot; data-href=\&quot;\&quot; style=\&quot;\&quot;/&gt;</p&gt;&quot;,&quot;ensure&quot;:1,&quot;freight&quot;:0,&quot;freight_type&quot;:1,&quot;id&quot;:26,&quot;image&quot;:&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/16867935092151M8SAQakMh.png&quot;,&quot;image_ids&quot;:&quot;https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/16867935092151M8SAQakMh.png,https://qidian-1256760867.cos.ap-shanghai.myqcloud.com/prod/1686793509217q4MCn1y8UV.png&quot;,&quot;is_temp&quot;:1,&quot;is_unit&quot;:2,&quot;limit_active&quot;:1,&quot;old_price&quot;:89,&quot;on_sale&quot;:0,&quot;point_origin&quot;:&quot;&quot;,&quot;price&quot;:59,&quot;product_code&quot;:&quot;&quot;,&quot;protection&quot;:&quot;1,2,3,4&quot;,&quot;recommend_tag&quot;:&quot;好物推荐&quot;,&quot;recommend_tag_color&quot;:&quot;linear-gradient(90deg, #ff9000 0%, #ff5000 100%)&quot;,&quot;recommend_tag_txt&quot;:&quot;好物推荐 爆款热销&quot;,&quot;records_list&quot;:[{&quot;author_name&quot;:&quot;superMan&quot;,&quot;created_time&quot;:1687249908,&quot;deleted_at&quot;:0,&quot;id&quot;:181,&quot;images&quot;:[],&quot;product_id&quot;:26,&quot;remark&quot;:&quot;修改商品&quot;,&quot;updated_time&quot;:0},{&quot;author_name&quot;:&quot;superMan&quot;,&quot;created_time&quot;:1687249033,&quot;deleted_at&quot;:0,&quot;id&quot;:180,&quot;images&quot;:[],&quot;product_id&quot;:26,&quot;remark&quot;:&quot;修改商品&quot;,&quot;updated_time&quot;:0},{&quot;author_name&quot;:&quot;superMan&quot;,&quot;created_time&quot;:1687248978,&quot;deleted_at&quot;:0,&quot;id&quot;:179,&quot;images&quot;:[],&quot;product_id&quot;:26,&quot;remark&quot;:&quot;修改商品&quot;,&quot;updated_time&quot;:0},{&quot;author_name&quot;:&quot;superMan&quot;,&quot;created_time&quot;:1687248777,&quot;deleted_at&quot;:0,&quot;id&quot;:178,&quot;images&quot;:[],&quot;product_id&quot;:26,&quot;remark&quot;:&quot;修改商品&quot;,&quot;updated_time&quot;:0},{&quot;author_name&quot;:&quot;superMan&quot;,&quot;created_time&quot;:1687248658,&quot;deleted_at&quot;:0,&quot;id&quot;:177,&quot;images&quot;:[],&quot;product_id&quot;:26,&quot;remark&quot;:&quot;修改商品&quot;,&quot;updated_time&quot;:0},{&quot;author_name&quot;:&quot;superMan&quot;,&quot;created_time&quot;:1687248138,&quot;deleted_at&quot;:0,&quot;id&quot;:176,&quot;images&quot;:[],&quot;product_id&quot;:26,&quot;remark&quot;:&quot;修改商品&quot;,&quot;updated_time&quot;:0}],&quot;remark&quot;:&quot;&quot;,&quot;rolling&quot;:1,&quot;sale_tag&quot;:&quot;放心购&quot;,&quot;sale_tag_color&quot;:&quot;#FF5000&quot;,&quot;sale_tag_txt&quot;:&quot;正品保障·交易监管·急速售后&quot;,&quot;sales_initial&quot;:0,&quot;sales_type&quot;:1,&quot;selling_point&quot;:&quot;&quot;,&quot;send_time&quot;:2,&quot;ship_address&quot;:&quot;&quot;,&quot;shop_id&quot;:3,&quot;skuData&quot;:{&quot;columns&quot;:[{&quot;label&quot;:&quot;产品主图&quot;,&quot;prop&quot;:&quot;name&quot;,&quot;slot&quot;:true,&quot;width&quot;:98},{&quot;label&quot;:&quot;活动售价&quot;,&quot;prop&quot;:&quot;price&quot;,&quot;required&quot;:true,&quot;slot&quot;:true,&quot;width&quot;:175},{&quot;label&quot;:&quot;划线价&quot;,&quot;prop&quot;:&quot;old_price&quot;,&quot;slot&quot;:true,&quot;width&quot;:165},{&quot;label&quot;:&quot;库存&quot;,&quot;prop&quot;:&quot;stock_num&quot;,&quot;slot&quot;:true,&quot;width&quot;:165},{&quot;label&quot;:&quot;规格编号&quot;,&quot;minWidth&quot;:165,&quot;prop&quot;:&quot;code&quot;,&quot;slot&quot;:true},{&quot;fixed&quot;:&quot;right&quot;,&quot;label&quot;:&quot;操作&quot;,&quot;prop&quot;:&quot;handle&quot;,&quot;slot&quot;:true,&quot;width&quot;:110}],&quot;list&quot;:[],&quot;skuFilter&quot;:[],&quot;specColumns&quot;:[]},&quot;sku_list&quot;:[],&quot;sort&quot;:0,&quot;spec_list&quot;:[],&quot;status&quot;:0,&quot;stock_num&quot;:49,&quot;title&quot;:&quot;雅鹿100%纯棉花空调被全棉花夏凉被薄被子可水洗夏季单双人被芯可机洗 烟灰大格-复制&quot;,&quot;undeliver_id&quot;:0}</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain">platform.api.qidianbox.com</stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol">'+httpProtocol+'</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/shop-admin/product/edit</stringProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>
          <stringProp name="TestPlan.comments">注释</stringProp>
        </HTTPSamplerProxy>
<hashTree>
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="789079806">操作成功</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message"></stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">16</intProp>
          </ResponseAssertion>
          <hashTree/>
</hashTree>
<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="/shop-common/msg/list" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="/shop-common/msg/list" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">platform.api.qidianbox.com</stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/shop-common/msg/list?is_read=0&amp;shop_id=3</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>
          <stringProp name="TestPlan.comments">注释</stringProp>
        </HTTPSamplerProxy>
<hashTree>
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="789079806">操作成功</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message"></stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">16</intProp>
          </ResponseAssertion>
          <hashTree/>
</hashTree>
<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="/shop-admin/product/list" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="/shop-admin/product/list" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">platform.api.qidianbox.com</stringProp>
          <stringProp name="HTTPSampler.port"></stringProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/shop-admin/product/list?page=1&amp;page_size=10&amp;is_examine=0&amp;price_sort=&amp;sales_actual_sort=&amp;sort=&amp;shop_id=3&amp;is_temp=1</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout">5000</stringProp>
          <stringProp name="TestPlan.comments">注释</stringProp>
        </HTTPSamplerProxy>
<hashTree>
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="响应断言" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="789079806">操作成功</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message"></stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">16</intProp>
          </ResponseAssertion>
          <hashTree/>
</hashTree>
        <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="查看结果树" enabled="true">
          <boolProp name="ResultCollector.error_logging">false</boolProp>
          <objProp>
            <name>saveConfig</name>
            <value class="SampleSaveConfiguration">
              <time>true</time>
              <latency>true</latency>
              <timestamp>true</timestamp>
              <success>true</success>
              <label>true</label>
              <code>true</code>
              <message>true</message>
              <threadName>true</threadName>
              <dataType>true</dataType>
              <encoding>false</encoding>
              <assertions>true</assertions>
              <subresults>true</subresults>
              <responseData>false</responseData>
              <samplerData>false</samplerData>
              <xml>false</xml>
              <fieldNames>true</fieldNames>
              <responseHeaders>false</responseHeaders>
              <requestHeaders>false</requestHeaders>
              <responseDataOnError>false</responseDataOnError>
              <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
              <assertionsResultsToSave>0</assertionsResultsToSave>
              <bytes>true</bytes>
              <sentBytes>true</sentBytes>
              <url>true</url>
              <threadCounts>true</threadCounts>
              <idleTime>true</idleTime>
              <connectTime>true</connectTime>
            </value>
          </objProp>
          <stringProp name="filename"></stringProp>
        </ResultCollector>
        <hashTree/>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>