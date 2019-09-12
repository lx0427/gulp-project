$(function() {
    var url = window.location.href;
    var statusTitle = $("#apStatusStr").val();
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

                $("#dateli").html($.i18n.prop('com_date')).parent().removeClass("current");
            }

            rqChange = false;
        }
    });

    // 订单状态
    var statusStr = "";
    var statusChange = false;
    $("#status").select({
        title: $.i18n.prop('uo_qingxuanze'),
        items: [{
            title: "全部",
            value: ""
        }, {
            title: "新建",
            value: "0"
        }, {
            title: "已转化",
            value: "1"
        }, {
            title: "已失效",
            value: "2"
        }],
        onChange: function(d) {
            statusChange = true;
            $("#apStatus").val(d.values);
            statusStr = d.titles;
            $("#status").html(statusStr + "<span class=\"xl\"></span>").addClass("current");
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            $("#apStatus").val("");
            queryData();
            $("#status").html("状态<span class=\"xl\"></span>").removeClass("current");
        }
    });

    //排序
    var orderName = "",
        order = "";
    $("#sort").select({
        title: $.i18n.prop('uo_qingxuanze'),
        items: [{
            title:$.i18n.prop('uo_moren'),
            value: "",
        }, {
            title:$.i18n.prop('uo_shengtime'),
            value: "asc"
        }, {
            title: $.i18n.prop('uo_jiangtime'),
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
            $("#sort").html($.i18n.prop('com_sorting')+"<span class=\"xl\"></span>").removeClass("current");
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
    var url = requestPath + "/m/order/getAppointmentOrderList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (!isNull(d.isSaleman) && d.isSaleman === 1) {
            $("#status").show();
            $(".wx_hyfilter li").css("width", "33.3%");
        }
        $("#list").append(template('list_page', d));

        isSaleman = d.isSaleman;
       //处理语言
		execI18n();
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
    if (!isNull($("#apStatus").val())) {
        dataMap.apStatus = $("#apStatus").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
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