$(function() {
    
    queryData();
   });


function queryData(){
	var url = requestPath + "/m/resource/getFavorites.htm";
    var dataMap = getDateMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if(d!=null && d.data!=null && d.data.length>0){
            if(scrollLoading){
              $("#list").append(template('list_page',d));
            }else{
              $("#list").html(template('list_page',d));
            }
        }else{
            $("#list").html("<div style='text-align: center; margin-top: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
        }
    },true);
}
function getDateMap(){
    var dataMap = {};
    var pm = $("#pm").val();
    if(!isNull(pm) && pm != '品名'){
        dataMap.pm = pm;
    }
    var status = $("#status").val();
    if(!isNull(status) && status != '-1'){
        dataMap.status = status;
    }
    // var focusList = [{"gpls":"111","wzid":"000"},{"gpls":"121","wzid":"020"},{"gpls":"131","wzid":"030"}];
    // dataMap.focusList =  JSON.stringify(focusList);
    return dataMap;
}
var goods = [];
var saveFlag = false;
function saveShopping(gpls, wzid, depid, salesType, pm, str02) {
	
        if (saveFlag) {
            return false;
        }
        saveFlag = true;
    if ($("#" + gpls).hasClass("current")) {
        if(!isNull(goods) && goods.length>0){
            for(var i =0;i<goods.length;i++){
                if(goods[i]!=null && gpls == goods[i].gpls){
                    goods.splice(i,1);
                }
            }
        }
        $("#" + gpls).removeClass("current");
        // deleteShopping(gpls, wzid, depid, salesType);
        setTimeout("saveFlag = false;",500);
        return;
    }
    if(pm=='POY' && str02 == '车丝'){
        confirmMsg("该物资属于车丝，确定选择加入购物车吗?", function() {
            var dataMap = {};
            dataMap.gpls = gpls;
            dataMap.wzid = wzid;
            dataMap.depid = depid;
            dataMap.salesType = salesType;
            dataMap.orderType = "0";
			dataMap.language=i18nLanguage;
            if(!isNull(goods) && goods.length>=0){
                for(var i =0;i<goods.length;i++){
                    if(goods[i]!=null && gpls == goods[i].gpls){
                        setTimeout("saveFlag = false;",500);
                        $("#" + gpls).addClass("current");
                       return;
                    }
                }
                goods[goods.length] = dataMap;
            }else{
                goods = [];
                goods[0] = dataMap;
            }
        $("#" + gpls).addClass("current");
        });
    }else{
        var dataMap = {};
        dataMap.gpls = gpls;
        dataMap.wzid = wzid;
        dataMap.depid = depid;
        dataMap.salesType = salesType;
        dataMap.orderType = "0";
		dataMap.language=i18nLanguage;
        if(!isNull(goods) && goods.length>=0){
                for(var i =0;i<goods.length;i++){
                    if(goods[i]!=null && gpls == goods[i].gpls){
                setTimeout("saveFlag = false;",500);
                $("#" + gpls).addClass("current");
                       return;
                    }
                }
                goods[goods.length] = dataMap;
            }else{
                goods = [];
                goods[0] = dataMap;
            }
    }
        $("#" + gpls).addClass("current");
    setTimeout("saveFlag = false;",500);
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

function openHistoryBuying() {
    openPage("历史购买","../customer/historyBuying.html",1);
}
function doCheck(gpls) {
    if ($("#" + gpls).hasClass("current")) {
        $("#" + gpls).removeClass("current");
    } else {
        $("#" + gpls).addClass("current");
    }
}
var pmcode = "0"
function showPmSelect() {
    $("#xlsx3").html(template('pmlist_page', 1));
    $("#pm" + pmcode).addClass("current");
    $("#pmtitle").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    if ($(".wx_pulldownbox2").css("display") == "none") {
        $("#statustitle").removeClass("current");
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
    show();
    queryData();
}
function show() {
    // $("#statustitle").hide();
}
var statuscode = "-1"
function showStatusSelect() {
    $("#xlsx3").html(template('statuslist_page', 1));
    $("#status" + statuscode).addClass("current");
    $("#statustitle").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();

    if ($(".wx_pulldownbox2").css("display") == "none") {
        $("#statustitle").removeClass("current");
        $("#pmtitle").removeClass("current");
    } else {
        $("#statustitle").addClass("current");
    }
}
function statusSelect(status, code) {
    statuscode = code;
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    $("#statustitle").removeClass("current");
    $("#statustitle").html(status+"<span class='xxl'>▼</span>");
    $("#status").val(code);
    $("#pageIndex").val(0);
    $("#list").html("");
    show();
    queryData();
}

function toShoppingCar(){
    $("#tocar").css("pointer-events","none");
    var url = requestPath + "/m/shopping/saveAllShopping.htm";
        var dataMap = {};
        if(!isNull(goods) && goods.length>0){
            dataMap.goods = JSON.stringify(goods);
            $.ajaxjsonp(url, dataMap, function(data) {
                // $("#" + gpls).addClass("current");
                var d = eval(data);
                if(!isNull(d.amount)){
                    // $("#amount").html(d.amount);

                    toShoppingCart();
                }else{
                    showMessage("添加失败");
                }  
            }, false, function(){
                setTimeout("$('#tocar').css('pointer-events','auto');",1000);
            });
        }else{
             toShoppingCart();
        }
        setTimeout("$('#tocar').css('pointer-events','auto');",1000);
}
