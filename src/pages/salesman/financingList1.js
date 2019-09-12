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
       
    var rqChange_start = false;
    var rqStr_start = "";
    $("#date10Str_start").calendar({
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
            $(".wx_hyfilter li").removeClass();
            if (rqChange_start) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#start_date").val(rqStr_start);
                queryData();
                $("#dateli_start").html(rqStr_start).parent().addClass("current");
            } else {
                var emrq = $("#dateli_start").html();
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#start_date").val("");
                queryData();
                $("#dateli_start").html("开始日期");
            }
            rqChange = false;
        }
    });
    
    var rqChange_end = false;
    var rqStr_end = "";
    $("#date10Str_end").calendar({
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
            $(".wx_hyfilter li").removeClass();
            if (rqChange_end) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#end_date").val(rqStr_end);
                queryData();
                $("#dateli_end").html(rqStr_end).parent().addClass("current");
            } else {
                var emrq = $("#dateli_end").html();
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#end_date").val("");
                queryData();
                $("#dateli_end").html("结束日期");
            }
            rqChange_end = false;
        } 
    });

    //排序
    var orderName = "",
        order = "";
    $("#sort").select({
        title: "请选择",
        items: [{
            title: "默认",
            value: "",
        }, {
            title: "按时间升序",
            value: "asc"
        }, {
            title: "按时间降序",
            value: "desc"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#sort").html("排序<span class=\"xl\"></span>");
                $("#orderName").val("");
                $("#order").val("");
            } else {
                $("#sort").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#orderName").val("cdate");
                $("#order").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#orderName").val("");
            $("#order").val("");
            queryData();
            $("#sort").html("排序<span class=\"xl\"></span>");
        }
    });

    //状态
    $("#shStatus").select({
        title: "请选择",
        items: [
        {
            title: "业务员审核中",
            value: "11"
        },{
            title: "后台审核中",
            value: "12"
        },{
            title: "交易已完结",
            value: "100"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#shStatus").html("状态<span class=\"xl\"></span>");
                $("#status01").val("");

            } else {
                $("#shStatus").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#status01").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#status01").val("");

            queryData();
            $("#shStatus").html("状态<span class=\"xl\"></span>");
        }
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
    if (!isNull($("#start_date").val())) {
        dataMap.rqStart = $("#start_date").val(); 
    }
    if (!isNull($("#end_date").val())) {
        dataMap.rqEnd = $("#end_date").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    if (!isNull($("#status01").val())) {
        dataMap.status01 = $("#status01").val();
    }
	dataMap.couponType = 5;
    dataMap.jstatus01 = 11;
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
