$(function() {

    var url = window.location.href;
    scanRecord(4,0,1,url,'燃辅料外卖');
    setTimeout(function() {
    updatePpData();
    }, 10);
    queryData();
});

function queryData() {

    var url = requestPath + "/m/purchasing/excipient/list.htm";
    var dataMap = {};
	if (!isNull($("#pp").val())) {
        dataMap.str04 = $("#pp").val();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);            
        $("#list").append(template('list_page', d));         
         /*console.info(d);
         console.info(JSON.stringify(d));*/
    }, true);
}





	var saveFlag = false;


function saveShopping(gpls, wzid) {
    if ($("#" + gpls).hasClass("buybtn1")) {
        deleteShopping(gpls, wzid);
        return;
    }
    if (saveFlag) {
        return false;
    }
    saveFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.gpls = gpls;
    dataMap.type = "excipient";

    $.ajaxjsonp(url, dataMap, function(data) {
        $("#" + gpls).addClass("buybtn1");
    }, false, function() {
        saveFlag = false;
    });
}

function deleteShopping(gpls, wzid) {
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.gpls = gpls;
    dataMap.type = "excipient";

    var url = requestPath + "/m/shopping/deleteShopping.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
        $("#" + gpls).removeClass("buybtn1");
    });
}

function gotoShoppingCart() {
    var url = "";
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        // 已经授权过了
        // url = "../purchasing/shoppingCart.html";
        url = "../public/shoppingCart1.html";
    } else {
        // 还未授权
        if (isWeixinBrowse()) {
            url = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiShoppingCart";
        } else {
            // url = "../purchasing/shoppingCart.html";
        url = "../public/shoppingCart1.html";
        }
    }
   
    openPage("购物车", url, "1");
}

var json;

// 更新品牌数据
function updatePpData() {
    var url = requestPath + "/m/purchasing/excipient/ppList.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		json = d;
    });
}
var middle = "";
function showSelect(str) {
    $("#xlsx").html(template(str + 'list_page', json));
    $("#" + str + "_" + middle).addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
  
}
function toHide() {
    $(".wx_pulldownbox2").hide();
    $(".wx_opacity2").hide();
}

function middleSelect(str1, str2, id) {
   $("#" + str2 + "title").html(str1 + "<span class=\"xl\"></span>");
   $("#" + str2 + "_" + middle).removeClass("current");
   if (str1 == "品牌") {
	  
        $("#" + str2 + "").val("");
        middle = "";
        $("#" + str2 + "title").removeClass("current");
    } else {
        $("#" + str2 + "").val(str1);
        $("#" + str2 + "title").addClass("current");
        $("#" + str2 + "_" + id).addClass("current");
        middle = id;
    }
  

    toHide();

    if (str2 == "wzlb") {
        var pm = $("#pm").val();
        if (pm == "切片" || pm == "锦纶切片") {
            // 更新等级
            setTimeout(function() {
                updateCdData();
            }, 10);
        }
    }

    $("#list").html("");
    $("#pageIndex").val(0);
    queryData();


}