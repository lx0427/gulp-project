$(function() {
    initDatePage();
    queryData();
   });


function queryData(){
	var url = requestPath + "/m/order/getSapSalesmanOrder.htm";
    var dataMap = getDateMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if(d!=null && d.data!=null && d.data.length>0){
            if(scrollLoading){
              $("#list").append(template('list_page2',d));
            }else{
              $("#list").html(template('list_page',d));
            }
        }else{
            $("#list").html("<div style='text-align: center; margin-top: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
        }
    },true,function(){
        setTimeout("$('#dateQueryTrue').css('pointer-events','auto');",1000);
});
}
function getDateMap(){
    var dataMap = {};
    var pm = $("#pm").val();
    if(!isNull(pm) && pm != '0'){
        dataMap.str01 = pm;
    }
    if (!isNull($("#rqStart").val())) {
        dataMap.rqStart = $("#rqStart").val(); 
    }
    if (!isNull($("#rqEnd").val())) {
        dataMap.rqEnd = $("#rqEnd").val();
    }
    return dataMap;
}
function saveShopping(gpls, wzid, depid, salesType, pm, str02) {
	
    if ($("#" + gpls).hasClass("current")) {
        deleteShopping(gpls, wzid, depid, salesType);
        return;
    }
    if(pm=='POY' && str02 == '车丝'){
        confirmMsg("该物资属于车丝，确定加入购物车吗?", function() {
            if (saveFlag) {
                return false;
            }
            saveFlag = true;
            var url = requestPath + "/m/shopping/saveShopping.htm";
            var dataMap = {};
            dataMap.gpls = gpls;
            dataMap.wzid = wzid;
            dataMap.depid = depid;
            dataMap.salesType = salesType;
            dataMap.orderType = "0";
			dataMap.language=i18nLanguage;
            var customerId = $("#customerId").val();
            if (!isNull(customerId)) {
                dataMap.customerId = customerId;
            }
            // 是否合约下单
            if($(".xdlx").css("display") != "none"){
                var xdlx = $(".xdlx .current").attr("val");
                if(!isNull(xdlx) && xdlx == "1"){
                    dataMap.flag11 = xdlx;//$("#xdlxFlag").val()
                }
            }
            
            $.ajaxjsonp(url, dataMap, function(data) {
                $("#" + gpls).addClass("current");
                var d = eval(data);
                if(!isNull(d.amount)){
                    $("#amount").html(d.amount);
                }  
        scanShopping(d.data);//记录商品添加到购物车操作
            }, false, function() {
                saveFlag = false;
            });
        });
    }else{
        if (saveFlag) {
            return false;
        }
        saveFlag = true;
        var url = requestPath + "/m/shopping/saveShopping.htm";
        var dataMap = {};
        dataMap.gpls = gpls;
        dataMap.wzid = wzid;
        dataMap.depid = depid;
        dataMap.salesType = salesType;
        dataMap.orderType = "0";
		dataMap.language=i18nLanguage;
        var customerId = $("#customerId").val();
        if (!isNull(customerId)) {
            dataMap.customerId = customerId;
        }
        // 是否合约下单
        if($(".xdlx").css("display") != "none"){
            var xdlx = $(".xdlx .current").attr("val");
            if(!isNull(xdlx) && xdlx == "1"){
                dataMap.flag11 = $("#xdlxFlag").val();//xdlx
            }
        }
        
        $.ajaxjsonp(url, dataMap, function(data) {
            $("#" + gpls).addClass("current");
            var d = eval(data);
            if(!isNull(d.amount)){
                $("#amount").html(d.amount);
            }  
        scanShopping(d.data);//记录商品添加到购物车操作
        }, false, function() {
            saveFlag = false;
        });
    }
    
}
var toResemble = true;
function findResemble(pm,gg,cz){
    if(toResemble){
        toResemble = false;
    }
    var url = "../customer/resemble.html"
    if(!isNull(pm)&&!isNull(gg)&&!isNull(cz)){
        var resembleParam = {};
        resembleParam.pm = pm;
        resembleParam.gg = gg;
        resembleParam.cz = cz;
        sessionStorage.setItem("resembleParam",JSON.stringify(resembleParam));
    }else{
        showMessage("物资信息异常");
        setTimeout('toResemble = true;',1000);
        return false;
    }
    //商品信息通过url传递,参数接在url后面
    openPage("",url,1);
}

function openFavorites() {
    openPage("我的收藏","../customer/favorites.html",1);
}
function toOrderResourceList1(){

}
function doCheck(pkid) {
    if ($("#" + pkid).hasClass("current")) {
        $("#" + pkid).removeClass("current");
    } else {
        $("#" + pkid).addClass("current");
    }
}
var pmcode = "0"
function showPmSelect() {
    $("#xlsx3").html(template('pmlist_page', 1));
    $("#pm" + pmcode).addClass("current");
    $("#datetitle").removeClass("current");
    $("#pmtitle").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    if ($(".wx_pulldownbox").css("display") == "none") {
        $("#pmtitle").removeClass("current");
    } else {
        $("#pmtitle").addClass("current");
    }
}
function pmSelect(pm, code) {
    pmcode = code;
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $("#pmtitle").removeClass("current");
    $("#pmtitle").html(pm+"<span class='xxl'>▼</span>");
    $("#pm").val(pm);
    $("#pageIndex").val(0);
    $("#list").html("");
    if(code == "0"){
        $("#pm").val("");
    }
    show();
    queryData();
}
function show() {
    // $("#statustitle").hide();
}
var datecode = '0';
function showDateSelect() {
   
    $("#xlsx3").html(template('datelist_page', 1));
    $("#date" + datecode).addClass("current");
    $("#pmtitle").removeClass("current");
    $("#datetitle").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    if ($(".wx_pulldownbox").css("display") == "none") {
        $("#datetitle").removeClass("current");
    } else {
        $("#datetitle").addClass("current");
    }
}
var oldDateHtml;
function dateSelect(date, code) {
    datecode = code;
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $("#datetitle").removeClass("current");
    oldDateHtml = $("#datetitle").html();
    $("#datetitle").html(date+"<span class='xxl'>▼</span>");
    show();
    if(code == '4'){
        showDatePage();
        // $("#date").val(date);
        return;
    }
    // $("#date").val(date);
    $("#pageIndex").val(0);
    $("#list").html("");
    if(code == '0'){
        $("#rqStart").val("");
        $("#rqEnd").val("");
        queryData();
    }else{
        setDate(code);
        queryData();
    }
}
//确定按时间查询
function doDateQuery(){
    $('#dateQueryTrue').css('pointer-events','none');
    $("#pageIndex").val(0);
    $("#list").html("");
    $("#rqStart").val($("#rqStart1").val());
    $("#rqEnd").val($("#rqEnd1").val());
    queryData();
    $("#datePage").hide();
    odlxxdate = '';
}
function showDatePage(){
    // $("#rqStart1").val('');
    // $("#rqEnd1").val('');
    $("#datePage").show();
}
//取消按自定义时间查询
function doCancleDatePage(){
    $("#datePage").hide();
    $("#datetitle").html(oldDateHtml);
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
    if(flag==1){  //近一周
        $("#rqStart").val(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-'));
        // $("#rqEnd1").val(date.toLocaleDateString().replaceAll('/','-'));
        // console.log(date.toLocaleDateString().replaceAll('/','-')+'....'+date.toLocaleDateString().replaceAll('/','-'));
    }
    if(flag==2){  //近一个月
        $("#rqStart").val(getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        // $("#rqEnd1").val(getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        // console.log(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-')+'....'+getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
        
    }
    if(flag==3){   //近三个月
        $("#rqStart").val(getCurrentWeekLast3().toLocaleDateString().replaceAll('/','-'));
        // $("#rqEnd1").val(getCurrentMonthLast().toLocaleDateString().replaceAll('/','-'));
        // console.log(getCurrentMonthFirst().toLocaleDateString().replaceAll('/','-')+'....'+getCurrentMonthLast().toLocaleDateString().replaceAll('/','-'));
    }
    console.log($("#rqStart").val());
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
//获得一周前的日期
function getCurrentWeekFirst(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()-7);
}
//获得一个月前的日期
function getCurrentWeekLast(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth()-1,date.getDate());
}
//获得三个月前的日期
function getCurrentWeekLast3(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth()-3,date.getDate());
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

// 再来一单
var buyAgainFlag = false;
function buyAgain(hydm, hyname, wzid, depid, salesType, isSalesman) {
    if (buyAgainFlag) {
        return false;
    }
    buyAgainFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    if (!isNull(isSalesman) && isSalesman == "1") {
        // 业务员代客下单
        dataMap.customerId = hydm;
        dataMap.customerName = hyname;
        dataMap.orderType = "1";
    } else {
        // 客户下单
        dataMap.orderType = "0";
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        scanShopping(d.data);//记录商品添加到购物车操作
        showOk("已加入购物车", function() {
            if (!isNull(isSalesman) && isSalesman == "1") {
                toShoppingCart(hydm);               
            } else {
                toShoppingCart();                
            }
        });
    }, false, function() {
        buyAgainFlag = false;
    });
}
function showAll(){

    $(".wx_hyordermesbox").removeClass('orderDisplayNone');
    $("#wx_vaguebox").hide();
    $(".infinitePage").attr('id','infinitePage');
        $("#infinitePage").infinite().on("infinite", function() {
        if (scrollLoading) {
            return;
        }
        var pageIndex = $("#pageIndex").val(); // 当前页
        var pageCount = $("#pageCount").val(); // 总页数
        if (isNull(pageIndex) && isNull(pageCount)) {
            // 不需要分页
            $(".weui-infinite-scroll").hide();
            return;
        }
        if (parseInt(pageIndex) >= parseInt(pageCount)) {
            // 已经是最后一页了
            $(".weui-infinite-scroll").hide();
            return;
        }

        scrollLoading = true;
        setTimeout(function() {
            queryData();
        }, 10);
    });
}