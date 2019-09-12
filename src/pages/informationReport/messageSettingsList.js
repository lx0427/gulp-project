$(function() {
    $(".kindbtn li").bind("click", function() {
        // 当前选中的
        var currentText = $(".kindbtn .current").text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText) {
            // 不处理
            return;
        }


        if (thisText === "我收到的") {
            //触发查询
            $("#pageIndex").val("0");
            $("#list").html("");
            $("#isReport").val(2);
            $("title").html("我收到的");
            $("title").attr("name","xxfk_wsdd");
            queryData();
            
        } 
        if (thisText === "我上报的") {
            //触发查询
            $("#pageIndex").val("0");
            $("#list").html("");
            $("#isReport").val(1);
            $("title").html("我上报的");
            $("title").attr("name","xxfk_wsbd");
            queryData();
        } 

        if (thisText === "我收到的(老版本)") {
            //触发查询
            $("#pageIndex").val("0");
            $("#list").html("");
            $("#isReport").val(3);
            $("title").html("我收到的(老版本)");
            $("title").attr("name","xxfk_wsbd");
            queryData();
        } 


        $(".kindbtn li").removeClass("current");
        $(this).addClass("current");

    });
    
    $("#form").bind("submit", function() {
    		$("#pageIndex").val(0);
        $("#list").html("");
        queryData();
        return false;
    });
    
    
    $("#whois").select({
        title: "请选择",
        items: [ {
            title: "我收到的",
            value: "2"
        }, {
            title: "我上报的",
            value: "1"
        }, {
            title: "我收到的(老版本)",
            value: "3"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#whois").html("我收到的<span class=\"xl\"></span>");
                $("#isReport").val(2);
            } else {
                $("#whois").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#isReport").val(d.values);
                console.log(d.values);
                //显示标签
                $(".messageLable").show();
                $("#industry").val('');
                $(".messageLable").removeClass('cpx_label_checked');
                if(d.values == 1){
                    $("#xxzt").hide();
                    $("#xxdp").show();
                    $("#xxpm").hide();
                    $("#isMark").val(0);

                    $(".wx_hyfilter3 .ll").parent().css('width','24%');
                    $("#submitReport").show();
                    $("#statisticReport").show();
                    $("#exportReport").hide();
                    // $("#submitReport").css('width','100%');
                }else{
                    $("#xxzt").show();
                    $("#xxdp").hide();
                    $("#xxpm").show();
                    $(".wx_hyfilter3 .ll").parent().css('width','18%');
                    $("#exportReport").show();
                    $("#statisticReport").hide();
                    $("#submitReport").css('width','50%');
                    if(d.values == 3){
                        $("#exportReport").hide();
                        $("#submitReport").hide();
                        $("#statisticReport").hide();
                        //隐藏标签,清空标签值
                        $(".messageLable").hide();
                        $("#industry").val('');
                        $(".messageLable").removeClass('cpx_label_checked');
                    }
                }
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            //清空缓存
            sessionStorage.setItem("scrollTop",'');
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#whois").html("我收到的<span class=\"xl\"></span>").addClass("current");
            $("#isReport").val(2);
            $("#submitReport").show();
            $("#exportReport").show();
            $("#statisticReport").hide();
        }
    });
    
    $("#xxlx").select({
        title: "请选择",
        items: [ {
            title: "随手记",
            value: "1"
        }, {
            title: "客户拜访",
            value: "2"
        }, {
            title: "周报",
            value: "3"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxlx").html("类型<span class=\"xl ll\"></span>");
                $("#whType").val(d.values);
            } else {
                $("#xxlx").html(d.titles + "<span class=\"xl ll\"></span>").addClass("current");
                $("#whType").val(d.values);
                // if(d.values == 1){
                //     $(".messageLable").show();
                // }else{
                //     $(".messageLable").hide();
                //     $("#industry").val('');
                //     $(".messageLable").removeClass('cpx_label_checked');
                // }
            }

        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            //清空缓存
            sessionStorage.setItem("scrollTop",'');
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#xxlx").html("类型<span class=\"xl ll\"></span>").addClass("current");
            $("#whType").val("");
            // $(".messageLable").hide();
        }
    });
    
    $("#xxzt").select({
        title: "请选择",
        items: [ {
            title: "未读",
            value: "0"
        }, {
            title: "已读",
            value: "1"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxzt").html("状态<span class=\"xl ll\"></span>");
                $("#isRead").val("");
            } else {
                $("#xxzt").html(d.titles + "<span class=\"xl ll\" ></span>").addClass("current");
                $("#isRead").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            //清空缓存
            sessionStorage.setItem("scrollTop",'');
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#xxzt").html("状态<span class=\"xl ll\"></span>").addClass("current");
            $("#isRead").val("");
        }
    });
    $("#xxdp").select({
        title: "请选择",
        items: [ {
            title: "新点评",
            value: "1"
        },{
            title: "已点评",
            value: "2"
        },{
            title: "未点评",
            value: "0"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxdp").html("状态<span class=\"xl ll\"></span>");
                $("#isMark").val("");
            } else {
                $("#xxdp").html(d.titles + "<span class=\"xl ll\"></span>").addClass("current");
                $("#isMark").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            //清空缓存
            sessionStorage.setItem("scrollTop",'');
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#xxdp").html("状态<span class=\"xl ll\"></span>").addClass("current");
            $("#isMark").val("");
        }
    });
    $("#xxpm").select({
        title: "请选择",
        items: [ {
            title: "POY",
            value: "POY"
        },{
            title: "DTY",
            value: "DTY"
        },{
            title: "FDY",
            value: "FDY"
        },{
            title: "切片",
            value: "切片"
        },{
            title: "锦纶切片",
            value: "锦纶切片"
        },{
            title: "短纤",
            value: "短纤"
        },{
            title: "差异化",
            value: "差异化"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxpm").html("产品线<span class=\"xl ll\"></span>");
                $("#pm").val("");
            } else {
                $("#xxpm").html(d.titles + "<span class=\"xl ll\"></span>").addClass("current");
                $("#pm").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            //清空缓存
            sessionStorage.setItem("scrollTop",'');
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#xxpm").html("产品线<span class=\"xl ll\"></span>").addClass("current");
            $("#pm").val("");
        }
    });
    $("#xxdate").select({
        title: "请选择",
        items: [ {
            title: "今天",
            value: "0"
        },{
            title: "本周",
            value: "1"
        },{
            title: "本月",
            value: "2"
        },{
            title: "其他",
            value: "3"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxdate").html("日期<span class=\"xl ll\"></span>");
            } else {
                //当选项为其他时,记录当前html内容
                 odlxxdate = $("#xxdate").html();
                if(d.values != 3){  
                    //设置查询时间
                   setDate(d.values);
                }
                $("#xxdate").html(d.titles + "<span class=\"xl ll\"></span>").addClass("current");
                $("#xdate").val(d.values);
            }
        },
        onClose: function(d) {
            console.log(d.data);
            if(dateFlag){  //执行清空功能
                $("#pageIndex").val(0);
                $("#list").html("");
                //清空缓存
                sessionStorage.setItem("scrollTop",'');
                queryData();
            }else if(d.data.values != 3){ 
                $("#pageIndex").val(0);
                $("#list").html("");
                //清空缓存
                sessionStorage.setItem("scrollTop",'');
                queryData();
            }else{  
                //当选项为其他时,显示时间选择页面
                showDatePage();
            }
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");
            dateFlag = true;
            $("#xxdate").html("日期<span class=\"xl ll\"></span>").addClass("current");
            $("#xdate").val("");
        }
    });
    //初始化日期选项页面
    initDatePage();
    //初始化一键导出页面
    exportInit();
    initPage();
    //标签单击事件
    clickEvent();
    queryData();
    setTimeout (function(){
    	 execI18n();
    },500);
});
var odlxxdate;
//记录时间筛选 是清空还是关闭 true清空
var dateFlag = false;
function initPage(){
     var storage = sessionStorage.getItem("scrollTop");
        if(!isNull(storage)){
            var scrollTop = JSON.parse(storage);
            console.log('还原备份');
            console.log(scrollTop);
            if(!isNull(scrollTop)){
                if (!isNull(scrollTop.isReport)) {
                    var isReport = scrollTop.isReport;
                    $("#isReport").val(isReport);
                    if(isReport ==2){}
                    $("#whois").html('我收到的<span class=\"xl\"></span>');
                    if(isReport ==1)
                    $("#whois").html('我上报的<span class=\"xl\"></span>');
                    if(isReport ==3)
                    $("#whois").html('我收到的(老版本)<span class=\"xl\"></span>');
                 
                    if(isReport ==1){
                        if (!isNull(scrollTop.isMark)) {
                            $("#xxzt").hide();
                            $("#xxdp").show();
                            $("#isMark").val(scrollTop.isMark);
                            var reMark = scrollTop.isMark;
                            if(reMark == 0)
                                $("#xxdp").html('未点评<span class=\"xl ll\"></span>');
                            if(reMark == 1)
                                $("#xxdp").html('新点评<span class=\"xl ll\"></span>');
                            if(reMark == 2)
                                $("#xxdp").html('已点评<span class=\"xl ll\"></span>');
                            if(reMark == 4){
                                $("#xxdp").html('已点评<span class=\"xl ll\"></span>');
                                $("#isMark").val(4);
                            }
                        }
                        $(".wx_hyfilter3 .ll").parent().css('width','24%');
                            $("#submitReport").show();
                            $("#exportReport").hide();
                            $("#statisticReport").show();
                    }else{
                        $("#xxzt").show();
                        $("#xxdp").hide();
                        $("#xxpm").show();
                        $(".wx_hyfilter3 .ll").parent().css('width','18%');
                        $("#submitReport").css('width','50%');
                        $("#exportReport").show();
                        $("#statisticReport").hide();
                         if (!isNull(scrollTop.isRead)) {
                            var isRead = scrollTop.isRead;
                             $("#isRead").val(isRead);
                             if(isRead ==0)
                            $("#xxzt").html('未读<span class=\"xl ll\"></span>');
                            if(isRead ==1)
                            $("#xxzt").html('已读<span class=\"xl ll\"></span>');
                        } 
                        if(isReport == 3){
                            $("#exportReport").hide();
                            $("#submitReport").hide();
                            $("#statisticReport").hide();
                        }
                    }
                }
                
                if (!isNull(scrollTop.whType)) {
                    var whType= scrollTop.whType;
                     $("#whType").val(whType);
                     if(whType ==1){
                        $("#xxlx").html('随手记<span class=\"xl ll\"></span>');
                        $(".messageLable").show();
                        var industry = scrollTop.industry;
                        $("#industry").val(industry);
                        if(!isNull(industry)){
                            var arr = industry.split(',');
                            $(".messageLable").each(function(){
                                var text = $(this).html();
                                if(!isNull(arr) && arr.length>0){
                                for(var i=0;i<arr.length;i++){
                                    if(arr[i]==text){
                                        $(this).addClass('cpx_label_checked');
                                    }
                                }
                                }
                            });
                        }

                     }else{
                        $(".messageLable").hide();
                     }
                    if(whType ==2)
                    $("#xxlx").html('客户拜访<span class=\"xl ll\"></span>');
                    if(whType ==3)
                    $("#xxlx").html('周报<span class=\"xl ll\"></span>');
                }
                
                
                
                if (!isNull(scrollTop.querykey)) {
                    $("#querykey").val(scrollTop.querykey);
                    $(".weui_search_bar").addClass('weui_search_focusing');
                }
                if(!isNull(scrollTop.xdate)){
                    var xdate = scrollTop.xdate;
                    $("#xdate").val(xdate);
                    if(xdate == 0)
                        $("#xxdate").html('今天<span class=\"xl ll\"></span>');
                    if(xdate == 1)
                        $("#xxdate").html('本周<span class=\"xl ll\"></span>');
                    if(xdate == 2)
                        $("#xxdate").html('本月<span class=\"xl ll\"></span>');
                    if(xdate == 3)
                        $("#xxdate").html('其他<span class=\"xl ll\"></span>');


                    if(!isNull(scrollTop.rqStart)){
                        var rqstart1 = scrollTop.rqStart;
                        $("#rqStart1").val(rqstart1);
                    }if(!isNull(scrollTop.rqEnd)){
                        var rqstart1 = scrollTop.rqEnd;
                        $("#rqEnd1").val(rqstart1);
                    }
                }
                if(!isNull(scrollTop.productLine)){
                    var pm = scrollTop.productLine;
                    $("#pm").val(pm);
                    if(pm == 'POY')
                        $("#xxpm").html('POY<span class=\"xl ll\"></span>');
                    if(pm == 'DTY')
                        $("#xxpm").html('DTY<span class=\"xl ll\"></span>');
                    if(pm == 'FDY')
                        $("#xxpm").html('FDY<span class=\"xl ll\"></span>');
                    if(pm == '切片')
                        $("#xxpm").html('切片<span class=\"xl ll\"></span>');
                    if(pm == '锦纶切片')
                        $("#xxpm").html('锦纶切片<span class=\"xl ll\"></span>');
                    if(pm == '短纤')
                        $("#xxpm").html('短纤<span class=\"xl ll\"></span>');
                    if(pm == '差异化')
                        $("#xxpm").html('差异化<span class=\"xl ll\"></span>');
                }
            }
        }
}

function queryData() {
    var url = requestPath + "/m/informationReports/getReports.htm";
    var dataMap = {};
    dataMap = getDataMap(); 
console.info(dataMap);
    //return false;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        $("#userid").val(d.userid);   
        console.log(d.userid);
        if (!isNull($("#isReport").val()) && $("#isReport").val()==2) {
            $("#list").append(template('list_page1', d));
        }else if(!isNull($("#isReport").val()) && $("#isReport").val()==1){
            $("#list").append(template('list_page2', d));
        }else if(!isNull($("#isReport").val()) && $("#isReport").val()==3){
            $("#list").append(template('list_page3', d));
        }   
    }, true, function () {
    	if ($("#isReport").val() == "1") {//上报
	    	// var redMsg = $(".redMsg");
	    	// redMsg.each(function(){
	    	// 	if ($(this).attr("isRead") == "1") {
	    	// 		$(this).html("");
	    	// 	} else {
	    	// 		$(this).html("未被查看");
	    	// 	}
	    	// });
	    	var fromWhere = $(".fromWhere");
	    	fromWhere.each(function(){
	    		$(this).html($(this).attr("receiveUserName"));
	    	});
	    	$("title").html("我上报的");
	    	$("title").attr("name","xxfk_wsbd");
	    } else if($("#isReport").val() == "2") {//我收到的
	    	var redMsg = $(".redMsg");
	    	redMsg.each(function(){
	    		if ($(this).attr("isRead") == "1") {
	    			$(this).html("");
	    		} else {
	    			$(this).html("未读");
	    		}
	    	});
	    	var fromWhere = $(".fromWhere");
	    	fromWhere.each(function(){
	    		$(this).html($(this).attr("reportUserName"));
	    	});
	    	$("title").html("我收到的");
	    	$("title").attr("name","xxfk_wsdd");
	    }
        else if($("#isReport").val() == "3"){//我收到的(老版本)
            var redMsg = $(".redMsg");
            redMsg.each(function(){
                if ($(this).attr("isRead") == "1") {
                    $(this).html("");
                } else {
                    $(this).html("未读");
                }
            });
            var fromWhere = $(".fromWhere");
            fromWhere.each(function(){
                $(this).html($(this).attr("reportUserName"));
            });
            $("title").html("我收到的(老版本)");
            $("title").attr("name","xxfk_wsdd");
        }
	    $(".weui-infinite-scroll").hide();
        //回恢复上次跳转时访问位置
        var storage = sessionStorage.getItem("scrollTop");
        if(!isNull(storage)){
            var scrollTop = JSON.parse(storage);
            if(!isNull(scrollTop) && !isNull(scrollTop.position)){
            $("#infinitePage").scrollTop(scrollTop.position);
            }
        }
        setTimeout("$('#xxdp').css('pointer-events','auto');",1000);
        setTimeout("$('#dateQueryTrue').css('pointer-events','auto');",1000);
        dateFlag = false;
    });
    
}

function getDataMap(){
	
		var dataMap = {};
		
		console.log($("#isReport").val());
		if (!isNull($("#isReport").val())) {
			dataMap.isReport = $("#isReport").val();
            if (dataMap.isReport != 1 && !isNull($("#isRead").val())) {
            dataMap.isRead = $("#isRead").val();
            }
            if (dataMap.isReport == 1 && !isNull($("#isMark").val())) {
            dataMap.isMark = $("#isMark").val();
            }
		}
		if (!isNull($("#whType").val())) {
			dataMap.whType = $("#whType").val();
		}
		if(!isNull($("#pm").val())){
            if($("#isReport").val() == 1){
                // dataMap.informationSources = $("#pm").val();
            }else{
            dataMap.productLine = $("#pm").val();
            }
        }
		if (!isNull($("#querykey").val())) {
			dataMap.querykey = $("#querykey").val();
		}
        if (!isNull($("#xdate").val())) {
            dataMap.xdate = $("#xdate").val();
        }
        if(!dateFlag){
            if (!isNull($("#rqStart1").val())) {
                dataMap.rqStart = $("#rqStart1").val();
            }if (!isNull($("#rqEnd1").val())) {
                dataMap.rqEnd = $("#rqEnd1").val();
            }
        }
		if(!isNull($("#industry").val())){
            dataMap.industry = $("#industry").val();
        }
		return dataMap;
}

function goReportInformation () {
    openPage("我要上报", "../informationReport/messageVistAddressAdd.html", "1");
}

template.helper("getDate", function(str, pattern) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(pattern);
});

function toInfo (pkid,whType,pm) {
    var isReport = $("#isReport").val();
    console.log($(this).find('.redMsg').first().text()=='未读');
    if($(this).find('.redMsg').first().text()=='未读'){
        $(this).find('.redMsg').first().text("");
    }
    //记录跳转时访问位置和筛选条件
    sessionScrollTop();
    if(whType==1){//随手记
        openPage("随手记明细", "../informationReport/messageNoteInfo1.html?pkid="+pkid+"&isReport="+isReport, "1");
    }
    if(whType==2){//客户拜访
        openPage("客户拜访明细", "../informationReport/messageVistAddressInfo.html?pkid="+pkid+"&isReport="+isReport, "1");
    }
    if(whType==3){//周报
        openPage("周报明细", "../informationReport/messageWeekInfo.html?pkid="+pkid+"&isReport="+isReport, "1");
    }
}

function toInfo1 (pkid) {
    //记录跳转时访问位置和筛选条件
    sessionScrollTop();
    openPage("明细", "../salesman/messageReportInfo.html?pkid="+pkid+"&isReport=2", "1");
}

template.helper("toTextarea", function (str) {
    var reg=new RegExp("<br>","g");
    var regSpace=new RegExp("&nbsp;","g");
    str = str.replace(reg,"\n");
    str = str.replace(regSpace," ");
    return str;
 });

function sessionScrollTop(){
    //记录跳转时访问位置
    var scrollTop = getDataMap();
    scrollTop.position = $("#infinitePage").scrollTop();
    sessionStorage.setItem("scrollTop",JSON.stringify(scrollTop));
}

function queryMark(){
    $("#xxdp").css('pointer-events','none');
    $(".wx_hyfilter li").removeClass();
    $("#pageIndex").val(0);
    $("#list").html("");
    var reMark = $("#isMark").val();
    if(reMark==1){
        $("#isMark").val(0);
    }else{
        $("#isMark").val(1);
        $("#xxdp").addClass('current');
    }
    //清空缓存
    sessionStorage.setItem("scrollTop",'');
    queryData();
}
//绑定导出界面加载事件
function exportInit(){
    $("#exportPage").hide();
    //绑定信息反馈类型单击事件
    $(".fle p").bind("click", function() {
        // 当前选中的
        var currentText = $(".fle p .icon-check").parent().text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText) {
            // 不处理
            return;
        }
        $(".fle p .icon-check").addClass('icon-checkk')
        $(".fle p .icon-check").removeClass('icon-check');
        $(this).find('i').removeClass('icon-checkk');
        $(this).find('i').addClass('icon-check');
    });
    var rqChange_start = false;
    var rqStr_start = "";
    $("#rqStart").calendar({
        onOpen: function() {
            if (rqChange_start) {
                rqStr_start = "";
                rqChange_start = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_start = true;
            rqStr_start = values;
        },
        onClose: function() {
            if (rqChange_start) {
                $("#rqStart").val(rqStr_start);
            } else {
                $("#rqStart").val("");
                rqStr_start = "";
            }
            rqChange_start = false;
        }
    });

    var rqChange_end = false;
    var rqStr_end = "";
    $("#rqEnd").calendar({
        onOpen: function() {
            if (rqChange_end) {
                rqStr_end = "";
                rqChange_end = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_end = true;
            rqStr_end = values;
        },
        onClose: function() {
            if (rqChange_end) {
                $("#rqEnd").val(rqStr_end);
            } else {
                $("#rqEnd").val("");
                rqStr_start = "";
            }
            rqChange_end = false;
        }
    });

    //绑定导出页面选择时间单击事件
    $(".datefle p").bind("click", function() {
        // 当前选中的
        var currentText = $(".datefle p .icon-check").parent().text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText) {
            // 不处理
            return;
        }
        if(thisText == '其他'){
            $("#otherDate").show();
        }else{
            $("#otherDate").hide();
        }
        $(".datefle p .icon-check").addClass('icon-checkk')
        $(".datefle p .icon-check").removeClass('icon-check');
        $(this).find('i').removeClass('icon-checkk');
        $(this).find('i').addClass('icon-check');
    });
    bindProductLine();
}
function bindProductLine(){
    var array = [];
    //var json = {};
    var pmlist = ['DTY','FDY','POY','短纤','切片','锦纶切片','差异化'];
    for(var i = 0; i<7; i++){
        var json = {};
        json.title = pmlist[i];
        json.value = pmlist[i];
        array[array.length] = json;
    }
    $("#productLine").select({
        title: "请选择(可多选)",
        multi: true,
        items: array,
        onChange: function(d) {
        },
        onClose: function() {
        },
        onClear: function() {
        }
    });
}

//打开一键导出界面
function goExportReportInformation(){
    $("#exportPage").show();
}
//一键导出
function exportReportInformation(){
    $('#exportReportTrue').css('pointer-events','none');
    $("#excelExport").attr("href","");
    $("#excelExport").hide();
    var url2 = requestPath + "/m/informationReports/export.htm?";
    var url = requestPath + "/m/informationReports/export.htm?";
    var isReport = $("#isReport").val();
    if(!isNull(isReport) &&  isReport == "3")
     url = requestPath + "/m/ sapInformationReports/export.htmp?";
    var dataMap = {};
    var rqStart;
    var rqEnd;
    var whType = $(".fle .icon-check").parent().text();
    if(!isNull($("#userid").val())){
        dataMap.userid = $("#userid").val();
        url += 'userid='+$("#userid").val()+'&'
    }else{
        showMessage("未登录,请重新登录");
        $('#exportReportTrue').css('pointer-events','auto');
        return false;
    }
    if(isNull(whType)){
        showMessage("请选择您要导出的信息类型!");
        $('#exportReportTrue').css('pointer-events','auto');
        return false;
    }
    if(whType == '随手记'){
       dataMap.whType = 1;
       url += 'whType=1&'
    }
    if(whType == '新客户拜访'){
       dataMap.whType = 2;
       dataMap.customerType = 0;
       url += 'whType=2&customerType=0&'
    }
    if(whType == '老客户拜访'){
       dataMap.whType = 2;
       dataMap.customerType = 1;
       url += 'whType=2&customerType=1&'
    }
    if(whType == '周报'){
       dataMap.whType = 3;
       url += 'whType=3&'
    }
    var datetime = $(".datefle .icon-check").parent().text();
    if(datetime == '今天'){
       var date = new Date();
       rqStart =  date.toLocaleDateString().replaceAll('/','-');
       rqEnd = date.toLocaleDateString().replaceAll('/','-');
       url += 'rqStart='+rqStart+'&rqEnd='+rqEnd+'&';
    }
    if(datetime == '本周'){
       rqStart =  getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-');
       rqEnd = getCurrentWeekLast().toLocaleDateString().replaceAll('/','-');
       url += 'rqStart='+rqStart+'&rqEnd='+rqEnd+'&';
    }
    if(datetime == '本月'){
       rqStart =  getCurrentMonthFirst().toLocaleDateString().replaceAll('/','-');
       rqEnd = getCurrentMonthLast().toLocaleDateString().replaceAll('/','-');
       url += 'rqStart='+rqStart+'&rqEnd='+rqEnd+'&';
    }
    if(datetime == '其他'){
        rqStart = $("#rqStart").val();
        if(!isNull(rqStart)){
            // rqStart = $("#rqStart").val() + " 00:00:00";
            url += 'rqStart='+rqStart+'&';
        }
        rqEnd = $("#rqEnd").val();
        if(!isNull(rqEnd)){
            // rqEnd = $("#rqEnd").val() + " 23:59:59";
            url += 'rqEnd='+rqEnd+'&';
        }
        if(!isNull(rqStart) && !isNull(rqEnd)){
            if(rqStart > rqEnd){
            showMessage("开始时间不能大于结束时间!");
        $('#exportReportTrue').css('pointer-events','auto');
            return false;
        }
        }
    }
    dataMap.rqStart = rqStart;
    dataMap.rqEnd = rqEnd;
    var productLine = $("#productLine").val();
    if(!isNull(productLine)){
        dataMap.productLine = productLine;
        url += "productLine="+productLine+"&";
    }
    // console.info(url);
$.ajax({
        type: "POST",
        url: url2,
        async: !0,
        data: dataMap,
        dataType: "jsonp",
        // jsonpCallback: callname,
        beforeSend: function() {
            dataMap.showLoading && $.showLoading()
        },
        success: function(data) {
            var d = eval(data);
                 showMessage(d.msg);
        setTimeout("$('#exportReportTrue').css('pointer-events','auto');",1000);
        },
        error: function(e, t, a) {
            window.location.href = url;
            setTimeout(doCancle,300);
        setTimeout("$('#exportReportTrue').css('pointer-events','auto');",1000);
        }
    })
    // }
}
//取消导出
function doCancle(){
    $("#exportPage").hide();
}
//确定按时间查询
function doDateQuery(){
    $('#dateQueryTrue').css('pointer-events','none');
    $("#pageIndex").val(0);
    $("#list").html("");
    //清空缓存
    sessionStorage.setItem("scrollTop",'');
    queryData();
    $("#datePage").hide();
    odlxxdate = '';
}
function showDatePage(){
    $("#rqStart1").val('');
    $("#rqEnd1").val('');
    $("#datePage").show();
}
//取消按自定义时间查询
function doCancleDatePage(){
    $("#datePage").hide();
    $("#xxdate").html(odlxxdate);
}
function initDatePage(){
    var rqChange_start1 = false;
    var rqStr_start1 = "";
    $("#rqStart1").calendar({
        onOpen: function() {
            if (rqChange_start1) {
                rqStr_start1 = "";
                rqChange_start1 = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_start1 = true;
            rqStr_start1 = values;
        },
        onClose: function() {
            if (rqChange_start1) {
                $("#rqStart1").val(rqStr_start1);
            } else {
                $("#rqStart1").val("");
                rqStr_start1 = "";
            }
            rqChange_start1 = false;
        }
    });

    var rqChange_end1 = false;
    var rqStr_end1 = "";
    $("#rqEnd1").calendar({
        onOpen: function() {
            if (rqChange_end1) {
                rqStr_end1 = "";
                rqChange_end1 = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_end1 = true;
            rqStr_end1 = values;
        },
        onClose: function() {
            if (rqChange_end1) {
                $("#rqEnd1").val(rqStr_end1);
            } else {
                $("#rqEnd1").val("");
                rqStr_end1 = "";
            }
            rqChange_end1 = false;
        }
    });


}
//设置查询时间
function setDate(flag){
 var date=new Date();
    if(flag==0){  //今天
        $("#rqStart1").val(date.toLocaleDateString().replaceAll('/','-'));
        $("#rqEnd1").val(date.toLocaleDateString().replaceAll('/','-'));
        // console.log(date.toLocaleDateString().replaceAll('/','-')+'....'+date.toLocaleDateString().replaceAll('/','-'));
    }
    if(flag==1){  //本周
        $("#rqStart1").val(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-'));
        $("#rqEnd1").val(getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        // console.log(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-')+'....'+getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        
    }
    if(flag==2){   //本月
        $("#rqStart1").val(getCurrentMonthFirst().toLocaleDateString().replaceAll('/','-'));
        $("#rqEnd1").val(getCurrentMonthLast().toLocaleDateString().replaceAll('/','-'));
        // console.log(getCurrentMonthFirst().toLocaleDateString().replaceAll('/','-')+'....'+getCurrentMonthLast().toLocaleDateString().replaceAll('/','-'));
    }
    // console.log(new Date('2018','12','32').toLocaleDateString().replaceAll('/','-'));
}
//获取当月第一天日期
function getCurrentMonthFirst(){
 var date=new Date();
 date.setDate(1);
 return date;
}
//获取当月最后一天日期
function getCurrentMonthLast(){
 var date=new Date();
 var currentMonth=date.getMonth();
 var nextMonth=++currentMonth;
 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
 var oneDay=1000*60*60*24;
 return new Date(nextMonthFirstDay-oneDay);
}
//获得本周第一天日期
function getCurrentWeekFirst(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()-date.getDay()+1);
}
//获得本周最后一天日期
function getCurrentWeekLast(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()-date.getDay()+7);
}

function goStatisticReport(){

    //清空统计报表缓存
    sessionStorage.setItem("statisticStorage",'');
    //记录跳转时访问位置和筛选条件
    sessionScrollTop();
    openPage("统计报表", "../informationReport/messageStatisticReport.html", "1");
}


function clickEvent(){
    //标签单击事件
    $(".messageLable").bind("click", function() {
        var industry = $("#industry").val();
        var currentText = $(this).html();
        if($(this).hasClass("cpx_label_checked")){
            $(this).removeClass("cpx_label_checked");
            var arr = industry.split(',');
            if(arr!=null && arr.length!=0){
                for(var i = 0;i<arr.length;i++){
                    if(arr[i] == currentText){
                        arr.splice(i,1);
                        --i;
                    }
                }
                $("#industry").val(arr.join(','));
            }else{
                $("#industry").val('');
            }
        }else{
            $(this).addClass("cpx_label_checked");
            if(isNull(industry)){
                $("#industry").val(currentText);
            }else{
                $("#industry").val(industry+','+currentText);
            }
        }
            // console.log($("#industry").val());
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        });
}