$(function() {
	var pkid = $("#pkid").val();
	if (!isNull(pkid)) {
		$("#pkid").val(pkid);
	}

    $("textarea").each(function(){
        autoTextarea(this); // 调用
    });

	queryData();	
});

function showImgs(className, index){
    // 先把之前的移除掉
    $(".weui-photo-browser-modal").remove();
    if(isNull(index)){
        index = 0;
    }
    // 根据样式获取图片数组
    var imgs = [];
    $("."+className).each(function(){
        imgs.push($(this).attr("src"));
    });
    var pb = $.photoBrowser({
        items:imgs,
        initIndex:index
    });
    pb.open();
}


var interval;
function queryData() {
    var url = requestPath + "/m/informationReports/getUnFinishWeekReport.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data){
        var d = eval(data);
        console.info(d);
        //每隔10s执行备份方法
        clearInterval(interval); 
        interval = setInterval(tempSaveStorage, 10000);

        //begin 判断是否是撤销回来编辑的
        if(!isNull($("#pkid").val())){
            removeStorage();//清空缓存
            var url = requestPath + "/m/informationReports/getInfo.htm";
            var dataMap = {};
            dataMap.pkid = $("#pkid").val();
            dataMap.isReport = 1;
            dataMap.revocationFlag = 1;
            $.ajaxjsonp(url, dataMap, function(data) {
                var d = eval(data);
                console.info(d);
                showText(d);         //撤销回来的 pkid不能再用原来的了  
            });
        }
        //end 判断是否是撤销回来编辑的

        //从本地取出备份内容
        var weekReport = sessionStorage.getItem("weekReport");
        //有备份内容优先回显备份内容
        if(!isNull(weekReport)){
            console.log("同步备份"+weekReportFromJson(weekReport));
            d.data = weekReportFromJson(weekReport);
            showText(d);
        }else{
            if(!isNull(d.data)){//判断是否之前存了草稿
                console.log("同步草稿")
                showText(d);
            }
        }
    });


}

var editFlag = false;
function doSave(saveFlag){
    if(editFlag){
        return false;
    }
    if(saveFlag==1 && !checkHaveValue()){//必填项限定, 存为草稿无此限定, 保存时有
        return false;
    }
    if(!checkValue()){
        return false;
    }
    editFlag = true;
	var url = requestPath + "/m/informationReports/saveVistAddress.htm";
    var dataMap = getDataMap();
    dataMap.reportStatus = saveFlag;//存为草稿还是直接上报
    console.info(dataMap);
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        removeStorage();
        openPage("信息反馈列表", "../informationReport/messageSettingsList.html");
    });
}

function getDataMap(){
    var dataMap = {};
    dataMap.whType = 3;//周报类型
    var pm = $("#pmDiv a.on").text();
    dataMap.informationSources = pm;

    dataMap.pkid = $("#pkid").val();
    if(pm=="POY"){
        dataMap.monthGoalFinishPresentation = textareaTo($("#monthGoalFinishPresentation").val());
        dataMap.marketPrisentation = textareaTo($("#marketPrisentation").val());
        dataMap.productPrisentation = textareaTo($("#productPrisentation").val());
        dataMap.restorePrisentation = textareaTo($("#restorePrisentation").val());
        dataMap.lastWeekVistSuggestions = textareaTo($("#lastWeekVistSuggestions").val());
        dataMap.nextWeekVistSuggestions = textareaTo($("#nextWeekVistSuggestions").val());
    }
    if(pm=="DTY"){
        dataMap.monthGoalFinishPresentation = textareaTo($("#monthGoalFinishPresentation2").val());
        dataMap.marketPrisentation = textareaTo($("#marketPrisentation2").val());
        dataMap.productPrisentation = textareaTo($("#productPrisentation2").val());
        dataMap.restorePrisentation = textareaTo($("#restorePrisentation2").val());
        dataMap.salePlan = textareaTo($("#salePlan2").val());
        dataMap.evectionPlan = textareaTo($("#evectionPlan2").val());
        dataMap.learnPlan = textareaTo($("#learnPlan2").val());
    }
    if(pm=="FDY"){
        dataMap.downMarketCustomerOpenRate = textareaTo($("#downMarketCustomerOpenRate").val());
        dataMap.inventoryPresentation = textareaTo($("#inventoryPresentation").val());
        dataMap.downMarketCustomerPayOff = textareaTo($("#downMarketCustomerPayOff").val());
        dataMap.priceComparePresentation = textareaTo($("#priceComparePresentation").val());
        dataMap.marketRestorePresentation = textareaTo($("#marketRestorePresentation").val());
        dataMap.customerChangePresentation = textareaTo($("#customerChangePresentation").val());
        dataMap.externalCustomerPresentation = textareaTo($("#externalCustomerPresentation").val());
    }
    if(pm=="差异化" || pm=="涤纶切片" || pm=="锦纶切片"){
        dataMap.taskFinishPresentation = textareaTo($("#taskFinishPresentation").val());
        dataMap.customerDevelopPresentation = textareaTo($("#customerDevelopPresentation").val());
        dataMap.existProblem = textareaTo($("#existProblem").val());
        dataMap.marketAnalyses = textareaTo($("#marketAnalyses").val());
        dataMap.salePlan = textareaTo($("#salePlan").val());
        dataMap.evectionPlan = textareaTo($("#evectionPlan").val());
        dataMap.learnPlan = textareaTo($("#learnPlan").val());
        dataMap.suggestions = textareaTo($("#suggestions").val());
    }
    if(pm=="短纤"){
        dataMap.taskFinishPresentation = textareaTo($("#taskFinishPresentation1").val());
        dataMap.customerDevelopPresentation = textareaTo($("#customerDevelopPresentation1").val());
        dataMap.existProblem = textareaTo($("#existProblem1").val());
        dataMap.marketAnalyses = textareaTo($("#marketAnalyses1").val());
        dataMap.salePlan = textareaTo($("#salePlan1").val());
        dataMap.evectionPlan = textareaTo($("#evectionPlan1").val());
        dataMap.learnPlan = textareaTo($("#learnPlan1").val());
    }

    var fileNum = $("#exsitfileul").children().length;
    console.info("fileNum" + fileNum);
    if(fileNum>0){
        var saleTableFilePath = "";
        for(var i=0; i<fileNum; i++){
            saleTableFilePath += ","+ $("#exsitfileul").children().eq(i).find(".weekFilePath").text();
        }
        console.log(saleTableFilePath.substring(1));
        dataMap.saleTableFilePath = saleTableFilePath.substring(1);
    }
    
    dataMap.jsonstring = getJsonString();
    return dataMap;
}

function c(obj) {
	var emVal = $(obj).attr("val");
	if (emVal == 2) {
		openPage("周报", "../informationReport/messageVistAddressAdd.html");
	}
	if (emVal == 3) {
		openPage("周报", "../informationReport/messageWeekAdd.html");
	}
}

function toHistoryList(){
    openPage("历史记录", "../informationReport/messageHistoryList.html?whType=3");
}

var productDiv=0;
function addDiv(){
    var d={};
    productDiv=productDiv+1;
    d.data=productDiv;
    $("#list").append(template('list_page', d));

    var text = $("#content_"+productDiv)[0];
    autoTextarea(text); // 调用
}

function toPmDiv(obj){
    $(".pmmeau").removeClass("on");
    $(obj).addClass("on");

    var pmValue = $(obj).text();
    checkPmValue(pmValue);
    
}

function checkValue(){//检查字段过长判断
    var pm = $("#pmDiv a.on").text();
    if(isNull(pm)){
        showMessage("产品线不能为空!");
        return false;
    }
    if(pm=="POY"){
        var monthGoalFinishPresentation = textareaTo($("#monthGoalFinishPresentation").val());
        var limit_monthGoalFinishPresentation = monthGoalFinishPresentation.length - 800;
        if(!isNull(monthGoalFinishPresentation) && limit_monthGoalFinishPresentation > 0){
            showMessage("月度目标完成情况内容超过最大值,超了"+limit_monthGoalFinishPresentation+"个字!");
            return false;
        }
        var marketPrisentation = textareaTo($("#marketPrisentation").val());
        var productPrisentation = textareaTo($("#productPrisentation").val());
        var restorePrisentation = textareaTo($("#restorePrisentation").val());
        if(!isNull(marketPrisentation))
        var limit_marketPrisentation = marketPrisentation.length - 800;
        if(!isNull(marketPrisentation) && limit_marketPrisentation > 0){
            showMessage("市场行情方面,市场方面内容超过最大值,超了"+limit_marketPrisentation+"个字!");
            return false;
        }
        if(!isNull(productPrisentation))
        var limit_productPrisentation = productPrisentation.length - 500;
        if(!isNull(productPrisentation) && limit_productPrisentation > 0){
            showMessage("市场行情方面,产品方面内容超过最大值,超了"+limit_productPrisentation+"个字!");
            return false;
        }
        if(!isNull(restorePrisentation))
        var limit_restorePrisentation =  restorePrisentation.length - 250;
        if(!isNull(restorePrisentation) && limit_restorePrisentation > 0){
            showMessage("预测内容超过最大值,超了"+limit_restorePrisentation+"个字!");
            return false;
        }
        var lastWeekVistSuggestions = textareaTo($("#lastWeekVistSuggestions").val());
        var nextWeekVistSuggestions = textareaTo($("#nextWeekVistSuggestions").val());
        if(!isNull(lastWeekVistSuggestions))
        var limit_lastWeekVistSuggestions =  lastWeekVistSuggestions.length - 800;
        if(!isNull(lastWeekVistSuggestions) && limit_lastWeekVistSuggestions > 0){
            showMessage("上周走访回馈内容超过最大值,超了"+limit_lastWeekVistSuggestions+"个字!");
            return false;
        }
        if(!isNull(nextWeekVistSuggestions))
        var limit_nextWeekVistSuggestions =  nextWeekVistSuggestions.length - 800;
        if(!isNull(nextWeekVistSuggestions) && limit_nextWeekVistSuggestions > 0){
            showMessage("下周计划走访客户内容超过最大值,超了"+limit_nextWeekVistSuggestions+"个字!");
            return false;
        }
        
    }
    
    if(pm=="DTY"){
       var monthGoalFinishPresentation = textareaTo($("#monthGoalFinishPresentation2").val());
       if(!isNull(monthGoalFinishPresentation))
       var limit_monthGoalFinishPresentation =  monthGoalFinishPresentation.length - 800;
       if(!isNull(monthGoalFinishPresentation) && limit_monthGoalFinishPresentation > 0){
            showMessage("月度目标完成情况内容超过最大值,超了"+limit_monthGoalFinishPresentation+"个字!");
            return false;
        }

       var marketPrisentation = textareaTo($("#marketPrisentation2").val());
       var productPrisentation = textareaTo($("#productPrisentation2").val());
       var restorePrisentation = textareaTo($("#restorePrisentation2").val());
       if(!isNull(marketPrisentation))
       var limit_marketPrisentation =  marketPrisentation.length - 800;
       if(!isNull(marketPrisentation) && limit_marketPrisentation > 0){
            showMessage("市场行情方面,市场方面内容超过最大值,超了"+limit_marketPrisentation+"个字!");
            return false;
        }
       if(!isNull(productPrisentation))
       var limit_productPrisentation = productPrisentation.length - 800 ;
       if(!isNull(productPrisentation) && limit_productPrisentation > 0){
            showMessage("市场行情方面,产品方面内容超过最大值,超了"+limit_productPrisentation+"个字!");
            return false;
        }
       if(!isNull(restorePrisentation))
       var limit_restorePrisentation = restorePrisentation.length - 250 ;
       if(!isNull(restorePrisentation) && limit_restorePrisentation > 0){
            showMessage("预测内容内容超过最大值,超了"+limit_restorePrisentation+"个字!");
            return false;
        }

       var salePlan = textareaTo($("#salePlan2").val());
       var evectionPlan = textareaTo($("#evectionPlan2").val());
       var learnPlan = textareaTo($("#learnPlan2").val());
       if(!isNull(salePlan))
       var limit_salePlan = salePlan.length - 500 ;
       if(!isNull(salePlan) && limit_salePlan > 0){
            showMessage("销售计划内容超过最大值,超了"+limit_salePlan+"个字!");
            return false;
        }
       if(!isNull(evectionPlan))
       var limit_evectionPlan = evectionPlan.length - 500 ;
       if(!isNull(evectionPlan) && limit_evectionPlan > 0){
            showMessage("出差计划内容超过最大值,超了"+limit_evectionPlan+"个字!");
            return false;
        }
       if(!isNull(learnPlan))
       var limit_learnPlan = learnPlan.length - 500 ;
       if(!isNull(learnPlan) && limit_learnPlan > 0){
            showMessage("学习计划内容超过最大值,超了"+limit_learnPlan+"个字!");
            return false;
        }
    }
    if(pm=="FDY"){
       var downMarketCustomerOpenRate = textareaTo($("#downMarketCustomerOpenRate").val());
       if(!isNull(downMarketCustomerOpenRate))
       var limit_downMarketCustomerOpenRate = downMarketCustomerOpenRate.length - 800 ;
       if(!isNull(downMarketCustomerOpenRate) && limit_downMarketCustomerOpenRate > 0){
            showMessage("下游客户开机率超过最大值,超了"+limit_downMarketCustomerOpenRate+"个字!");
            return false;
        }
       var inventoryPresentation = textareaTo($("#inventoryPresentation").val());
       if(!isNull(inventoryPresentation))
       var limit_inventoryPresentation = inventoryPresentation.length - 800 ;
       if(!isNull(inventoryPresentation) && limit_inventoryPresentation > 0){
            showMessage("原料及面料库存情况内容超过最大值,超了"+limit_inventoryPresentation+"个字!");
            return false;
        }
       var downMarketCustomerPayOff = textareaTo($("#downMarketCustomerPayOff").val());
       if(!isNull(downMarketCustomerPayOff))
       var limit_downMarketCustomerPayOff = downMarketCustomerPayOff.length - 800 ;
       if(!isNull(downMarketCustomerPayOff) && limit_downMarketCustomerPayOff > 0){
            showMessage("下游客户盈利状况内容超过最大值,超了"+limit_downMarketCustomerPayOff+"个字!");
            return false;
        }
       var priceComparePresentation = textareaTo($("#priceComparePresentation").val());
       if(!isNull(priceComparePresentation))
       var limit_priceComparePresentation = priceComparePresentation.length - 800 ;
       if(!isNull(priceComparePresentation) && limit_priceComparePresentation > 0){
            showMessage("同行价格对比情况内容超过最大值,超了"+limit_priceComparePresentation+"个字!");
            return false;
        }
       var marketRestorePresentation = textareaTo($("#marketRestorePresentation").val());
       if(!isNull(marketRestorePresentation))
       var limit_marketRestorePresentation = marketRestorePresentation.length - 800 ;
       if(!isNull(marketRestorePresentation) && limit_marketRestorePresentation > 0){
            showMessage("市场趋势判断情况内容超过最大值,超了"+limit_marketRestorePresentation+"个字!");
            return false;
        }
       var customerChangePresentation = textareaTo($("#customerChangePresentation").val());
       if(!isNull(customerChangePresentation))
       var limit_customerChangePresentation = customerChangePresentation.length - 800 ;
       if(!isNull(customerChangePresentation) && limit_customerChangePresentation > 0){
            showMessage("自身客户变动情况内容超过最大值,超了"+limit_customerChangePresentation+"个字!");
            return false;
        }
       var externalCustomerPresentation = textareaTo($("#externalCustomerPresentation").val());
       if(!isNull(externalCustomerPresentation))
       var limit_externalCustomerPresentation = externalCustomerPresentation.length - 800 ;
       if(!isNull(externalCustomerPresentation) && limit_externalCustomerPresentation > 0){
            showMessage("外围倍捻客户情况内容超过最大值,超了"+limit_externalCustomerPresentation+"个字!");
            return false;
        }
    }
    if(pm=="差异化" || pm=="涤纶切片" || pm=="锦纶切片"){
       var taskFinishPresentation = textareaTo($("#taskFinishPresentation").val());
       var customerDevelopPresentation = textareaTo($("#customerDevelopPresentation").val());
       var existProblem = textareaTo($("#existProblem").val());
       if(!isNull(taskFinishPresentation))
       var limit_taskFinishPresentation = taskFinishPresentation.length - 500 ;
       if(!isNull(taskFinishPresentation) && limit_taskFinishPresentation > 0){
            showMessage("本周销售情况及存在问题内容超过最大值,超了"+limit_taskFinishPresentation+"个字!");
            return false;
        }
       if(!isNull(customerDevelopPresentation))
       var limit_customerDevelopPresentation =  customerDevelopPresentation.length - 500;
       if(!isNull(customerDevelopPresentation) && limit_customerDevelopPresentation>0){
            showMessage("客户开发情况内容超过最大值,超了"+limit_customerDevelopPresentation+"个字!");
            return false;
        }
       if(!isNull(existProblem))
       var limit_existProblem =  existProblem.length - 800;
       if(!isNull(existProblem) && limit_existProblem > 0){
            showMessage("存在的问题内容超过最大值,超了"+limit_existProblem+"个字!");
            return false;
        }

       var marketAnalyses = textareaTo($("#marketAnalyses").val());
       if(!isNull(marketAnalyses))
       var limit_marketAnalyses =  marketAnalyses.length - 500;
       if(!isNull(marketAnalyses) && limit_marketAnalyses>0){
            showMessage("行情分析内容超过最大值,超了"+limit_marketAnalyses+"个字!");
            return false;
        }
       var salePlan = textareaTo($("#salePlan").val());
       var evectionPlan = textareaTo($("#evectionPlan").val());
       var learnPlan = textareaTo($("#learnPlan").val());
       if(!isNull(salePlan))
       var limit_salePlan = salePlan.length - 500;
       if(!isNull(salePlan) && limit_salePlan > 0){
            showMessage("销售计划内容超过最大值,超了"+limit_salePlan+"个字!");
            return false;
        }
       if(!isNull(evectionPlan))
       var limit_evectionPlan = evectionPlan.length - 500;
       if(!isNull(evectionPlan) && limit_evectionPlan > 0){
            showMessage("出差计划内容超过最大值,超了"+limit_evectionPlan+"个字!");
            return false;
        }
       if(!isNull(learnPlan))
       var limit_learnPlan = learnPlan.length - 500 ;
       if(!isNull(learnPlan) && limit_learnPlan > 0){
            showMessage("学习计划内容超过最大值,超了"+limit_learnPlan+"个字!");
            return false;
        }
       var suggestions = textareaTo($("#suggestions").val());
       if(!isNull(suggestions))
       var limit_suggestions = suggestions.length - 800 ;
       if(!isNull(suggestions) && limit_suggestions>0){
            showMessage("改进建议内容超过最大值,超了"+limit_suggestions+"个字!");
            return false;
        }
    }
    if(pm=="短纤"){
       var taskFinishPresentation = textareaTo($("#taskFinishPresentation1").val());
       if(!isNull(taskFinishPresentation))
       var limit_taskFinishPresentation = taskFinishPresentation.length - 500 ;
       if(!isNull(taskFinishPresentation) && limit_taskFinishPresentation > 0){
            showMessage("本周质量反馈内容超过最大值,超了"+limit_taskFinishPresentation+"个字!");
            return false;
        }
       var customerDevelopPresentation = textareaTo($("#customerDevelopPresentation1").val());
       if(!isNull(customerDevelopPresentation))
       var limit_customerDevelopPresentation = customerDevelopPresentation.length - 500 ;
       if(!isNull(customerDevelopPresentation) && limit_customerDevelopPresentation>0){
            showMessage("客户开发情况内容超过最大值,超了"+limit_customerDevelopPresentation+"个字!");
            return false;
        }
       var existProblem = textareaTo($("#existProblem1").val());
       if(!isNull(existProblem))
       var limit_existProblem = existProblem.length - 800 ;
       if(!isNull(existProblem) && limit_existProblem>0){
            showMessage("遇到问题内容超过最大值,超了"+limit_existProblem+"个字!");
            return false;
        }
       var marketAnalyses = textareaTo($("#marketAnalyses1").val());
       if(!isNull(marketAnalyses))
       var limit_marketAnalyses = marketAnalyses.length - 500 ;
       if(!isNull(marketAnalyses) && limit_marketAnalyses > 0){
            showMessage("行情分析内容超过最大值,超了"+limit_marketAnalyses+"个字!");
            return false;
        }
       var salePlan = textareaTo($("#salePlan1").val());
       var evectionPlan = textareaTo($("#evectionPlan1").val());
       var learnPlan = textareaTo($("#learnPlan1").val());
       if(!isNull(salePlan))
       var limit_salePlan = salePlan.length - 500 ;
       if(!isNull(salePlan) && limit_salePlan > 0){
            showMessage("销售计划内容超过最大值,超了"+limit_salePlan+"个字!");
            return false;
        }
       if(!isNull(evectionPlan))
       var limit_evectionPlan = evectionPlan.length - 500 ;
       if(!isNull(evectionPlan) && limit_evectionPlan>0){
            showMessage("出差计划内容超过最大值,超了"+limit_evectionPlan+"个字!");
            return false;
        }
       if(!isNull(learnPlan))
       var limit_learnPlan =  learnPlan.length - 500;
       if(!isNull(learnPlan) && limit_learnPlan > 0){
            showMessage("学习计划内容超过最大值,超了"+limit_learnPlan+"个字!");
            return false;
        }
    }

    if(productDiv>0){
        for(var i=1; i<=productDiv; i++){
           var content = textareaTo($("#content_"+i).val());
           var title = textareaTo($("#title_"+i).val());
           if(!isNull(title)){
              var limit_title =  title.length - 200;
              if( limit_title > 0){
                showMessage("新增的第"+i+"填写项标题超过最大值,超了"+limit_title+"个字!");
                return false;
              }
            }
           if(!isNull(content)){
              var limit_content =  content.length - 2000;
              if(limit_content > 0){
                showMessage("新增的第"+i+"填写项内容超过最大值,超了"+limit_content+"个字!");
                return false;
              }
           }
        }
    }
    return true;
}

function checkHaveValue(){//必填项限定, 存为草稿无此限定, 保存时有
    var pm = $("#pmDiv a.on").text();
    if(isNull(pm)){
        showMessage("产品线不能为空!");
        return false;
    }
    if(pm=="POY"){
        var monthGoalFinishPresentation = textareaTo($("#monthGoalFinishPresentation").val());
        if(isNull(monthGoalFinishPresentation)){
          showMessage("月度目标完成情况内容不能为空");
          return false;
        }

        var marketPrisentation = textareaTo($("#marketPrisentation").val());
        var productPrisentation = textareaTo($("#productPrisentation").val());
        var restorePrisentation = textareaTo($("#restorePrisentation").val());
        if(isNull(marketPrisentation) && isNull(productPrisentation) && isNull(restorePrisentation)){
          showMessage("市场行情分析内容至少填写一项");
          return false;
        }
        
        var lastWeekVistSuggestions = textareaTo($("#lastWeekVistSuggestions").val());
        var nextWeekVistSuggestions = textareaTo($("#nextWeekVistSuggestions").val());
        if(isNull(lastWeekVistSuggestions) && isNull(nextWeekVistSuggestions)){
          showMessage("下周工作计划内容至少填写一项");
          return false;
        }
    }
    
    if(pm=="DTY"){
       var monthGoalFinishPresentation = textareaTo($("#monthGoalFinishPresentation2").val());
        if(isNull(monthGoalFinishPresentation)){
          showMessage("月度目标完成情况内容不能为空");
          return false;
        }
       
       var marketPrisentation = textareaTo($("#marketPrisentation2").val());
       var productPrisentation = textareaTo($("#productPrisentation2").val());
       var restorePrisentation = textareaTo($("#restorePrisentation2").val());
       if(isNull(marketPrisentation) && isNull(productPrisentation) && isNull(restorePrisentation)){
          showMessage("市场行情分析内容至少填写一项");
          return false;
        }
       
       var salePlan = textareaTo($("#salePlan2").val());
       var evectionPlan = textareaTo($("#evectionPlan2").val());
       var learnPlan = textareaTo($("#learnPlan2").val());
        if(isNull(salePlan) && isNull(evectionPlan) && isNull(learnPlan)){
          showMessage("下周计划内容至少填写一项");
          return false;
        }
    }
    if(pm=="FDY"){
       var downMarketCustomerOpenRate = textareaTo($("#downMarketCustomerOpenRate").val());
        if(isNull(downMarketCustomerOpenRate)){
          showMessage("下游客户开机率内容不能为空");
          return false;
        }
      
       var inventoryPresentation = textareaTo($("#inventoryPresentation").val());
        if(isNull(inventoryPresentation)){
          showMessage("原料及面料库存情况不能为空");
          return false;
        }
       
       var downMarketCustomerPayOff = textareaTo($("#downMarketCustomerPayOff").val());
        if(isNull(downMarketCustomerPayOff)){
          showMessage("下游客户盈利状况内容不能为空");
          return false;
        }
      
       var priceComparePresentation = textareaTo($("#priceComparePresentation").val());
        if(isNull(priceComparePresentation)){
          showMessage("同行价格对比情况不能为空");
          return false;
        }
       
       var marketRestorePresentation = textareaTo($("#marketRestorePresentation").val());
        if(isNull(marketRestorePresentation)){
          showMessage("市场趋势判断情况不能为空");
          return false;
        }
       
       var customerChangePresentation = textareaTo($("#customerChangePresentation").val());
        if(isNull(customerChangePresentation)){
          showMessage("自身客户变动情况不能为空");
          return false;
        }
     
       var externalCustomerPresentation = textareaTo($("#externalCustomerPresentation").val());
        if(isNull(externalCustomerPresentation)){
          showMessage("外围倍捻客户情况不能为空");
          return false;
        }
    }
    if(pm=="差异化" || pm=="涤纶切片" || pm=="锦纶切片"){
       var taskFinishPresentation = textareaTo($("#taskFinishPresentation").val());
       var customerDevelopPresentation = textareaTo($("#customerDevelopPresentation").val());
       var existProblem = textareaTo($("#existProblem").val());
        if(isNull(taskFinishPresentation) && isNull(customerDevelopPresentation) && isNull(existProblem)){
          showMessage("本周销售情况及存在问题内容不能为空");
          return false;
        }
       
       var marketAnalyses = textareaTo($("#marketAnalyses").val());
        if(isNull(marketAnalyses)){
          showMessage("行情分析内容不能为空");
          return false;
        }
       
       var salePlan = textareaTo($("#salePlan").val());
       var evectionPlan = textareaTo($("#evectionPlan").val());
       var learnPlan = textareaTo($("#learnPlan").val());
        if(isNull(salePlan) && isNull(evectionPlan) && isNull(learnPlan)){
          showMessage("下周计划内容至少填写一项");
          return false;
        }
       
       var suggestions = textareaTo($("#suggestions").val());
        if(isNull(suggestions)){
          showMessage("改进建议内容不能为空");
          return false;
        }
    }
    if(pm=="短纤"){
       var taskFinishPresentation = textareaTo($("#taskFinishPresentation1").val());
        if(isNull(taskFinishPresentation)){
          showMessage("本周质量反馈内容不能为空");
          return false;
        }
      
       var customerDevelopPresentation = textareaTo($("#customerDevelopPresentation1").val());
        if(isNull(customerDevelopPresentation)){
          showMessage("客户开发情况不能为空");
          return false;
        }
       
       var existProblem = textareaTo($("#existProblem1").val());
        if(isNull(existProblem)){
          showMessage("遇到问题内容不能为空");
          return false;
        }
      
       var marketAnalyses = textareaTo($("#marketAnalyses1").val());
        if(isNull(marketAnalyses)){
          showMessage("行情分析内容不能为空");
          return false;
        }
       
       var salePlan = textareaTo($("#salePlan1").val());
       var evectionPlan = textareaTo($("#evectionPlan1").val());
       var learnPlan = textareaTo($("#learnPlan1").val());
        if(isNull(salePlan) && isNull(evectionPlan) && isNull(learnPlan)){
          showMessage("下周计划内容至少填写一项");
          return false;
        }
    }
    return true;
}

function getJsonString(){
    var jsons = [];
    for(var i=1;i<=productDiv; i++){
        if(!isNull($("#title_"+i).val()) || !isNull($("#content_"+i).val())){
            var json = {};
            json.title = $("#title_"+i).val();//标题
            json.content = textareaTo($("#content_"+i).val());//内容
            //console.info("JSON.stringify(jsons)"+JSON.stringify(jsons));
            jsons[jsons.length] = json;
        }
    }
    return JSON.stringify(jsons);
}

//备份填写内容
function tempSaveStorage(){
    var weekReportOld = sessionStorage.getItem("weekReport");
    htoTextarea(weekReportOld);

    var weekReportNew = weekReportToJson();
    if(weekReportOld != weekReportNew){
        // textareaToh(weekReportNew);
        console.info("完成备份"+weekReportNew);
        sessionStorage.setItem("weekReport", weekReportNew);
    }

}

//清除备份填写内容
function removeStorage(){
        sessionStorage.setItem("weekReport", "");
}

//带有换行标签的字符串转义
function htoTextarea(str){
    if(!isNull(str)){
        str = str.replace(new RegExp("<br>","gm"), "\n");
    }
    return str;
}
//换行转义成带有标签的字符串
function textareaToh(str){
    if(!isNull(str)){
        str = str.replace(new RegExp("\n", "gm"), "<br>");
    }
    return str;
}
//将页面中的周报内容转换成json
function weekReportToJson(){
  var weekReport = {};
  weekReport = getDataMap();
  var weekReportJson = JSON.stringify(weekReport);
  return weekReportJson;
}
//将json转换成周报内容
function weekReportFromJson(json){
    var weekReport = {}
    weekReport = JSON.parse(json);
    var jsonstring = JSON.parse(weekReport.jsonstring);
    weekReport.informationReportsMx = jsonstring;
    return weekReport;
}

function checkPmValue(pmValue){
    if(pmValue=="POY"){
        $("#poy").show();
        $("#dty").hide();
        $("#diff_qp").hide();
        $("#dq").hide();
        $("#fdy").hide();
    }
    if(pmValue=="DTY"){
        $("#poy").hide();
        $("#dty").show();
        $("#diff_qp").hide();
        $("#dq").hide();
        $("#fdy").hide();
    }
    if(pmValue=="FDY"){
        $("#poy").hide();
        $("#dty").hide();
        $("#diff_qp").hide();
        $("#dq").hide();
        $("#fdy").show();
    }
    if(pmValue=="涤纶切片"){
        $("#poy").hide();
        $("#dty").hide();
        $("#diff_qp").show();
        $("#dq").hide();
        $("#fdy").hide();
    }
    if(pmValue=="锦纶切片"){
        $("#poy").hide();
        $("#dty").hide();
        $("#diff_qp").show();
        $("#dq").hide();
        $("#fdy").hide();
    }
    if(pmValue=="短纤"){
        $("#poy").hide();
        $("#dty").hide();
        $("#diff_qp").hide();
        $("#dq").show();
        $("#fdy").hide();
    }
    if(pmValue=="差异化"){
        $("#poy").hide();
        $("#dty").hide();
        $("#diff_qp").show();
        $("#dq").hide();
        $("#fdy").hide();
    }
}

function showText(d){
   $("#pkid").val(d.data.pkid); 

   if(!isNull(d.data.saleTableFilePath)){
     var pathts = d.data.saleTableFilePath.split(",");
     var len = pathts.length;
     for(var i=0; i<len; i++){
        var patht = pathts[i];
        var pathr = filePathOld + pathts[i];

                var weekFilePathstrs = pathr.split('/');
                var imgHtml = "<li class='fileli'>";
                imgHtml += "<a href='" + pathr + "' target='_blank' class='bluebtn'>" + weekFilePathstrs[weekFilePathstrs.length-1] +"</a>"
                imgHtml += "<span class='weekFilePath'style='display:none'>"+patht+"</span>";
        //      var imgHtml = "<li class='fileli'>";
        //      imgHtml += "<a href='" + pathr + "' target='_blank' class='bluebtn'>"+patht+"</a>"
                imgHtml += "<em class='fileem'><i class='iconfont icon-jian'></i></em>";
                imgHtml += "</li>";
                $("#exsitfileul").append(imgHtml);

                $("#exsitfileul li em").bind("click", function(){
                    $(this).parent().remove();
                });
     }
   }
   $(".note").hide();
   $(".pmmeau").removeClass("on");
   if(!isNull(d.data) && d.data.informationSources=='POY'){
        $("#monthGoalFinishPresentation").val(toTextarea(d.data.monthGoalFinishPresentation));
        $("#marketPrisentation").val(toTextarea(d.data.marketPrisentation));
        $("#productPrisentation").val(toTextarea(d.data.productPrisentation));
        $("#restorePrisentation").val(toTextarea(d.data.restorePrisentation));
        $("#lastWeekVistSuggestions").val(toTextarea(d.data.lastWeekVistSuggestions));
        $("#nextWeekVistSuggestions").val(toTextarea(d.data.nextWeekVistSuggestions));
       
        $("#poya").addClass("on");
        $("#poy").show();
        $("#dty").hide();
        $("#diff_qp").hide();
        $("#dq").hide();
        $("#fdy").hide();
   }
   if(!isNull(d.data) && d.data.informationSources=='DTY'){
        $("#monthGoalFinishPresentation2").val(toTextarea(d.data.monthGoalFinishPresentation));
        $("#marketPrisentation2").val(toTextarea(d.data.marketPrisentation));
        $("#productPrisentation2").val(toTextarea(d.data.productPrisentation));
        $("#restorePrisentation2").val(toTextarea(d.data.restorePrisentation));
        $("#salePlan2").val(toTextarea(d.data.salePlan));
        $("#evectionPlan2").val(toTextarea(d.data.evectionPlan));
        $("#learnPlan2").val(toTextarea(d.data.learnPlan));
        $("#dtya").addClass("on");
        $("#poy").hide();
        $("#dty").show();
        $("#diff_qp").hide();
        $("#dq").hide();
        $("#fdy").hide();
   }
   if(!isNull(d.data) && d.data.informationSources=='FDY'){
        $("#downMarketCustomerOpenRate").val(toTextarea(d.data.downMarketCustomerOpenRate));
        $("#inventoryPresentation").val(toTextarea(d.data.inventoryPresentation));
        $("#downMarketCustomerPayOff").val(toTextarea(d.data.downMarketCustomerPayOff));
        $("#priceComparePresentation").val(toTextarea(d.data.priceComparePresentation));
        $("#marketRestorePresentation").val(toTextarea(d.data.marketRestorePresentation));
        $("#customerChangePresentation").val(toTextarea(d.data.customerChangePresentation));
        $("#externalCustomerPresentation").val(toTextarea(d.data.externalCustomerPresentation));

        $("#fdya").addClass("on");
        $("#poy").hide();
        $("#dty").hide();
        $("#fdy").show();
        $("#diff_qp").hide();
        $("#dq").hide();
        

   }
   if(!isNull(d.data) && (d.data.informationSources=='锦纶切片' || 
    d.data.informationSources=='涤纶切片' || d.data.informationSources=='差异化')){
        $("#taskFinishPresentation").val(toTextarea(d.data.taskFinishPresentation));
        $("#customerDevelopPresentation").val(toTextarea(d.data.customerDevelopPresentation));
        $("#existProblem").val(toTextarea(d.data.existProblem));
        $("#marketAnalyses").val(toTextarea(d.data.marketAnalyses));
        $("#salePlan").val(toTextarea(d.data.salePlan));
        $("#evectionPlan").val(toTextarea(d.data.evectionPlan));
        $("#learnPlan").val(toTextarea(d.data.learnPlan));
        $("#suggestions").val(toTextarea(d.data.suggestions));
        if(d.data.informationSources=='锦纶切片'){
            $("#jlqpa").addClass("on");
        }
        if(d.data.informationSources=='涤纶切片'){
            $("#dlqpa").addClass("on");
        }
        if(d.data.informationSources=='差异化'){
            $("#diffa").addClass("on");
        }
        $("#poy").hide();
        $("#dty").hide();
        $("#fdy").hide();
        $("#diff_qp").show();
        $("#dq").hide();
   }
   if(!isNull(d.data) && d.data.informationSources=='短纤'){
        $("#taskFinishPresentation1").val(toTextarea(d.data.taskFinishPresentation));
        $("#customerDevelopPresentation1").val(toTextarea(d.data.customerDevelopPresentation));
        $("#existProblem1").val(toTextarea(d.data.existProblem));
        $("#marketAnalyses1").val(toTextarea(d.data.marketAnalyses));
        $("#salePlan1").val(toTextarea(d.data.salePlan));
        $("#evectionPlan1").val(toTextarea(d.data.evectionPlan));
        $("#learnPlan1").val(toTextarea(d.data.learnPlan));

        $("#dqa").addClass("on"); 
        $("#poy").hide();
        $("#dty").hide();
        $("#fdy").hide();
        $("#diff_qp").hide();
        $("#dq").show();    
   }

   if(!isNull(d.data.informationSources) && !isNull(d.data.informationReportsMx)){
        productDiv = d.data.informationReportsMx.length;
        $("#list").append(template('list_page', d));
        var text = $("#content_"+productDiv)[0];
        autoTextarea(text); // 调用
   }
}

template.helper("toTextarea", function(str) {
    var content = toTextarea(str);
    return content;
});


function fsubmit() {
        var uploadFileNum = $("#exsitfileul").children("li").length;
        if(uploadFileNum>=5){
          showMessage("最多只能上传5个附件");
          return false;
        }

        var form=document.getElementById("form1");
        var formData=new FormData(form);
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange=function(){
          if(oReq.readyState==4){
            if(oReq.status==200){
                var json=JSON.parse(oReq.responseText);
                var mdata = JSON.stringify(json.mdata);
                var json1 = JSON.parse(mdata);
                var weekFilePath = JSON.stringify(json1.weekFilePath);
                if(!isNull(weekFilePath)){
                  weekFilePath = weekFilePath.substring(1,weekFilePath.length-1);//去掉两边的引号
                }
                var pathr = filePathOld + weekFilePath;
                var weekFilePathstrs = weekFilePath.split('/');
                var imgHtml = "<li class='fileli'>";
                imgHtml += "<a href='" + pathr + "' target='_blank' class='bluebtn'>" + weekFilePathstrs[weekFilePathstrs.length-1] +"</a>"
                imgHtml += "<span class='weekFilePath'style='display:none'>"+weekFilePath+"</span>";
                imgHtml += "<em class='fileem'><i class='iconfont icon-jian'></i></em>";
                imgHtml += "</li>";
                $("#exsitfileul").append(imgHtml);

                showMessage("上传成功!");

                $("#exsitfileul li em").bind("click", function(){
                    $(this).parent().remove();
                });
            }
          }
        }
        oReq.open("POST", requestPath + "/m/informationReports/uploadFile.htm");
        oReq.send(formData); 
        return false;
    } 