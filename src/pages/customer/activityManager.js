$(function() {
    initPage();

    $(".rule_close").click(function() {
        $(".rule").hide();
    });
});


function initPage() {
	$("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

function queryData() {
    var url = requestPath + "/m/resource/getActivityManagers.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);            
        $("#list").append(template('activityList_page', d));         
    },true);
    
   
}

function showrule(remark) {
    $("#rulename").html("优惠规则");
    $("#exDiscountRulesList").html(remark);
    $(".rule").show();
}

/**
 * 限时抢购
 * @param activityId     -- 活动ID
 * @param activityName   -- 活动名称
 * @param activityMxId   -- 活动资源ID
 * @param wzid           -- wzid
 * @param depid          -- depid
 * @param salesType      -- salesType
 * @param surplus        -- 活动剩余量
 */
var flashSaleFlag = false;
var flashSaleSuccess = false;

function doFlashSale(activityId, activityName, activityMxId, wzid, depid, salesType) {
    var surplus = $("#surplus_" + activityMxId).html();
    if (isNull(surplus) || parseFloat(surplus) == 0) {
        $("#flashSale_" + activityMxId).val("抢购结束");
        $("#flashSale_" + activityMxId).attr("onclick", "javascirpt:;");
        $("#flashSale_" + activityMxId).addClass("end");
        return false;
    }
    if (flashSaleFlag) {
        return false;
    }
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.orderType = "0";
    dataMap.activityId = activityId;
    dataMap.activityMxId = activityMxId;
    dataMap.couponType = "2";

    flashSaleFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        flashSaleSuccess = true; 
        scanShopping(d.data);//记录商品添加到购物车操作       
        // 购买成功，到购物车页面
         gotoShoppingCart(activityId, activityName, activityMxId, wzid, depid, salesType, surplus);

    }, false, function() {
        flashSaleFlag = false;
        // 失败了才进行刷新，成功不刷新，直接跳转到购物车页面
        if (!flashSaleSuccess) {            
            // 刷新下剩余量，从服务端获取
            refreshSurplus(activityMxId);
        }

    });
}
function scanRL(d) {
    var url = window.location.href;
    //FDY-GD10503-54D/24F(60dtex/24f)-AA-000000001000311683
    var title=d.data.pm+"-"+d.data.cz+"-"+d.data.gg+"-"+d.data.cd+"-"+d.data.wzid;
    console.info(title);
    scanRecord("97","1","1",url,title+";加入购物车");
}
function refreshSurplus(pkid) {
    var url = requestPath + "/m/resource/getActivityMxSurplus.htm";
    var dataMap = {};
    dataMap.pkid = pkid;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#surplus_" + pkid).html(d.surplus);
        if (parseFloat(d.surplus) == 0) {
            $("#flashSale_" + pkid).val("抢购结束");
            $("#flashSale_" + pkid).attr("onclick", "javascirpt:;");
            $("#flashSale_" + pkid).addClass("end");
        }
    });
}

function gotoShoppingCart(activityId, activityName, activityMxId, wzid, depid, salesType, surplus) {
    var url = "";
    var params = "activityId=" + activityId + "&couponType=2&couponCode=" + activityMxId + "&couponName=" + activityName + "&wzid=" + wzid + "&depid=" + depid + "&salesType=" + salesType + "&surplus=" + surplus;
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        // 已经授权过了
        // url = "../public/shoppingCart.html";
        url = "../public/shoppingCart1.html";
    } else {
        // 还未授权
        if (isWeixinBrowse()) {
            url = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiShoppingCart";
        } else {
            // url = "../public/shoppingCart.html";
        url = "../public/shoppingCart1.html";
        }
    }
    if (!isNull(params)) {
        if (url.indexOf("?") != -1) {
            url += "&" + params;
        } else {
            url += "?" + params;
        }
    }
    openPage("购物车", url, "1");
}