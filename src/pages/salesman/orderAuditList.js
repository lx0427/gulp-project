$(function() {
    initPage();

    $("#form").bind("submit", function() {
        initPage();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });
        
});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
    
    
}

function queryData() {
    var url = requestPath + "/m/orderAudit/getOrderAuditList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        $("#list").append(template('list_page', d));
        setTimeout(function(){
		    	execI18n();
		    },500);
    }, true);
    
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
	dataMap.status00 = 3;
    return dataMap;
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

function orderAuditView(fphm, pm) {
    openPage("订单审核", "../salesman/orderAuditView.html?fphm=" + fphm + "&pm=" + pm, "1");
}
function orderAuditViewFc(fphm, pm ,status01) {
    openPage("融资订单审核", "../salesman/fcOrderAuditView.html?fphm="+fphm+"&pm="+pm+"&status01="+status01, "1");
}
function updateOrder(fphm, pm) {
    openPage("修改订单", "../salesman/updateOrder.html?fphm=" + fphm + "&pm=" + pm, "1");
}

function qxOrder(fphm) {
    confirmMsg("是否确定取消订单[" + fphm + "]？", function() {
        var url = requestPath + "/m/orderAudit/qxOrder.htm";
        var dataMap = {};
        dataMap.fphm = fphm;
        $.ajaxjsonp(url, dataMap, function(data) {
            showOk("订单取消成功", function() {
                $("#" + fphm).remove();
            });
        });
    });
}

// 再来一单
var buyAgainFlag = false;

function buyAgain(hydm, hyname, wzid, depid, salesType, contractTypes) {
    if (buyAgainFlag) {
        return false;
    }
    buyAgainFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.customerId = hydm;
    dataMap.customerName = hyname;
    dataMap.orderType = "1";
    if (contractTypes != null && contractTypes != "0") {
        dataMap.flag11 = "1";//明确是合约下单的，后台会根据客户处理价格
    } else {
        dataMap.flag11 = "0";
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("已加入购物车", function() {
            toShoppingCart(hydm);            
        });
    }, false, function() {
        buyAgainFlag = false;
    });
}
