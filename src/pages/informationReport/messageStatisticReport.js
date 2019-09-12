$(function() {
    $(".wx_hyfilter3 li").bind("click", function() {
        // 当前选中的
        var currentText = $(".wx_hyfilter3 .current").text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText && currentText!='自定义') {
            // 不处理
            return;
        }
        if (thisText === "今天") {
            //触发查询
            setDate(0);
            queryData();
        } 
        if (thisText === "本周") {
            //触发查询
            setDate(1);
            queryData();
        } 
        if (thisText === "本月") {
            //触发查询
            setDate(2);
            queryData();
        } 
        if (thisText === "自定义") {
            //触发查询
            showDatePage();
        } 
        $(".wx_hyfilter3 li").removeClass("current");
        $(this).addClass("current");
    });
    //初始化日期选项页面
    initDatePage();
    //初始化页面,判断是否用缓存
    initPage();
    queryData();
    setTimeout (function(){
    	 execI18n();
    },500);
});
function initPage(){
    var storage = sessionStorage.getItem("statisticStorage");
        if(!isNull(storage)){
            var statisticStorage = JSON.parse(storage);
            console.log('还原备份');
            console.log(statisticStorage);
            if(!isNull(statisticStorage)){
                if(!isNull(statisticStorage.xdate)){
                    var xdate = statisticStorage.xdate;
                    $(".wx_hyfilter3 li").removeClass("current");
                    if(xdate == 0)
                        $("#0").addClass("current");
                    if(xdate == 1)
                        $("#1").addClass("current");
                    if(xdate == 2)
                        $("#2").addClass("current");
                    if(xdate == 3)
                        $("#3").addClass("current");


                    if(!isNull(statisticStorage.rqStart)){
                        var rqStart = statisticStorage.rqStart;
                        $("#rqStart").val(rqStart);
                        if(xdate == 3){
                            $("#rqStart1").val(rqStart);
                        }else{
                            $("#rqStart1").val("");
                        }
                    }else{
                        $("#rqStart").val("");
                    }if(!isNull(statisticStorage.rqEnd)){
                        var rqEnd = statisticStorage.rqEnd;
                        $("#rqEnd").val(rqEnd);
                        if(xdate == 3){
                            $("#rqEnd1").val(rqEnd);
                        }else{
                            $("#rqEnd1").val("");
                        }
                    }else{
                        $("#rqEnd1").val("");
                    }
                }
            }
        }
}

function queryData() {
    var url = requestPath + "/m/informationReports/statistic.htm";
    var dataMap = {};
    dataMap = getDataMap(); 
    console.info(dataMap);
    //return false;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        //记录每个数据是否有返回值
        var n = true;
        var c = true;
        var w = true;
        var nm = true;
        var cm = true;
        var wm = true;
        if( !isNull(d.dataType) && d.dataType.length!=0){
            for(var i=0;i<d.dataType.length;i++){
                var whtype = d.dataType[i][0];
                if(whtype==1){
                    $("#note").html(d.dataType[i][1]);
                    n=false;
                }if(whtype==2){
                    $("#customer").html(d.dataType[i][1]);
                    c=false;
                }if(whtype==3){
                    $("#weekReport").html(d.dataType[i][1]);
                    w=false;
                }
            }
            if(n)
                $("#note").html(0);
            if(c)
                $("#customer").html(0);
            if(w)
                $("#weekReport").html(0);
        }else{
            $("#customer").html(0);
            $("#note").html(0);
            $("#weekReport").html(0);
        }
        if( !isNull(d.dataMark) && d.dataMark.length!=0){
            for(var i=0;i<d.dataMark.length;i++){
                var whtype = d.dataMark[i][0];
                if(whtype==1){
                    $("#noteMark").html(d.dataMark[i][1]);
                    nm=false;
                }if(whtype==2){
                    $("#customerMark").html(d.dataMark[i][1]);
                    cm=false;
                }if(whtype==3){
                    $("#weekReportMark").html(d.dataMark[i][1]);
                    wm=false;
                }
            }

            if(nm)
                $("#noteMark").html(0);
            if(cm)
                $("#customerMark").html(0);
            if(wm)
                $("#weekReportMark").html(0);
        }else{
            $("#customerMark").html(0);
            $("#noteMark").html(0);
            $("#weekReportMark").html(0);
        }
        $("#userid").val(d.userid);
    }, false, function () {
        setTimeout("$('#dateQueryTrue').css('pointer-events','auto');",500);
    }); 
}

function getDataMap(){
		var dataMap = {};
		if (!isNull($("#rqStart").val())) {
                dataMap.rqStart = $("#rqStart").val();
            }
        if (!isNull($("#rqEnd").val())) {
                dataMap.rqEnd = $("#rqEnd").val();
            }	
		return dataMap;
}

function showDatePage(){
    $("#datePage").show();
}
//确定按自定义时间查询
function doDateQuery(){
    // $('#dateQueryTrue').css('pointer-events','none');
    $("#rqStart").val($("#rqStart1").val());
    $("#rqEnd").val($("#rqEnd1").val());
    queryData();
    $("#datePage").hide();
}
//取消按自定义时间查询
function doCancleDatePage(){
    $("#datePage").hide();
}
function initDatePage(){
    var rqChange_start1 = false;
    var rqStr_start1 = "";
    $("#rqStart1").calendar({
        onOpen: function() {
            if (rqChange_start1) {
                rqChange_start1 = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_start1 = true;
        },
        onClose: function() {
            if (!rqChange_start1) {
                $("#rqStart1").val("");
            }
            rqChange_start1 = false;
        }
    });
    var rqChange_end1 = false;
    var rqStr_end1 = "";
    $("#rqEnd1").calendar({
        onOpen: function() {
            if (rqChange_end1) {
                rqChange_end1 = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_end1 = true;
        },
        onClose: function() {
            if (!rqChange_end1) {
                $("#rqEnd1").val("");
            }
            rqChange_end1 = false;
        }
    });
    //默认查本月的数据
   setDate(2);

}
//设置查询时间
function setDate(flag){
 var date=new Date();
    if(flag==0){  //今天
        $("#rqStart").val(date.toLocaleDateString().replaceAll('/','-'));
        $("#rqEnd").val(date.toLocaleDateString().replaceAll('/','-'));
        // console.log(date.toLocaleDateString().replaceAll('/','-')+'....'+date.toLocaleDateString().replaceAll('/','-'));
    }
    if(flag==1){  //本周
        $("#rqStart").val(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-'));
        $("#rqEnd").val(getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        // console.log(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-')+'....'+getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        
    }
    if(flag==2){   //本月
        $("#rqStart").val(getCurrentMonthFirst().toLocaleDateString().replaceAll('/','-'));
        $("#rqEnd").val(getCurrentMonthLast().toLocaleDateString().replaceAll('/','-'));
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
function openMassageSettingList(whtype,isMark){
    //写进信息反馈列表缓存
    var scrollTop = {};
        scrollTop.isReport =1;
        scrollTop.isMark = isMark;
        scrollTop.isRead = "";
        scrollTop.whType = whtype;
        scrollTop.xdate = $(".wx_hyfilter3 .current").attr('id');
        scrollTop.rqStart = $("#rqStart").val();
        scrollTop.rqEnd = $("#rqEnd").val();
        sessionStorage.setItem("scrollTop",JSON.stringify(scrollTop));
        var userid = $("#userid").val();
    //记录当前页面缓存
    var statisticStorage={};
        statisticStorage.xdate= $(".wx_hyfilter3 .current").attr('id');
        statisticStorage.rqStart = $("#rqStart").val();
        statisticStorage.rqEnd = $("#rqEnd").val();
        sessionStorage.setItem("statisticStorage",JSON.stringify(statisticStorage));
    openPage("信息管理", "../informationReport/messageSettingsList.html?userid="+userid, "1");
}