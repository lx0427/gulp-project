$(function() {
    var url = window.location.href;
    scanRecord(22,0,'',url,'燃辅料订单');
    var statusTitle = $("#shStatusStr").val();
    $("#statusTitle").html(statusTitle)

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

    var rqChange = false;
    var rqStr = "";
    $("#date10Str").calendar({
        onOpen: function() {
            if (rqChange) {
                rqStr = "";
                rqChange = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange = true;
            rqStr = values;
        },
        onClose: function() {
            if (rqChange) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#cdate").val(rqStr);
                queryData();
                $("#dateli").html(rqStr).parent().addClass("current");
            } else {
                var emrq = $("#dateli").html();

                // if (!isNull(rqStr) && emrq != "日期") {
                //    $("#pageIndex").val(0);
                //    $("#list").html("");
                //    $("#cdate").val(rqStr);
                //    queryData();

                //    $("#dateli").html(rqStr).parent().addClass("current");
                // }
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#cdate").val("");
                queryData();

                $("#dateli").html("日期").parent().removeClass("current");
            }

            rqChange = false;
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
            $("#sort").html(d.titles + "<span class=\"xl\"></span>").addClass("current");

            $("#orderName").val("cdate");
            $("#order").val(d.values);
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
            //$("#status").html(statusStr + "<span class=\"xl\"></span>").addClass("current");
        },
        onClear: function() {
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#orderName").val("");
            $("#order").val("");
            queryData();
            $("#sort").html("排序<span class=\"xl\"></span>").removeClass("current");
        }
    });

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var isSaleman = "";
var queryFlag = false;
function queryData() {
    if(queryFlag){
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/order/getCustomerOrderList.htm";

    var dataMap = getDataMap();
	dataMap.blly='11';
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));

        isSaleman = d.isSaleman;

    }, true, function(){
        queryFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    if (!isNull($("#cdate").val())) {
        dataMap.rqStart = $("#cdate").val();
        dataMap.rqEnd = $("#cdate").val();
    }
    if (!isNull($("#shStatus").val())) {
        dataMap.shStatus = $("#shStatus").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }

    console.log(dataMap);
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


var buyAgainFlag = false;
// 再来一单
function buyAgain(wzid, depid, salesType, htflag11) {
    if (buyAgainFlag) {
        return false;
    }
    buyAgainFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.orderType = "0";
    if (htflag11 != null && htflag11 != "0") {
        dataMap.flag11 = "1";//明确是合约下单的，后台会根据客户处理价格
    } else {
        dataMap.flag11 = "0";
    }
    

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("已加入购物车", function() {
            toShoppingCart();            
        });
    }, false, function() {
        buyAgainFlag = false;
    });
}
