$(function() {
    var from = $("#from").val();
    if (!isNull(from) && from === "customer") {
        $("#khname").hide();
        $("#depname").show();
    } else {
        $("#khname").show();
        $("#depname").hide();
    }

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
            $(".wx_hyfilter li").removeClass();
            if (rqChange) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#cdate").val(rqStr);
                queryData();
                $("#dateli").html(rqStr).parent().addClass("current");
            } else {
                var emrq = $("#dateli").html();
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#cdate").val("");
                queryData();
                $("#dateli").html("日期");
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


    $("#mbname").bind("change", function() {
        $(".wx_hyfilter li").removeClass();
        var mbname = $("#mbname").val();
        if (isNull(mbname)) {
            $("#khname").html("客户<span class=\"xl\"></span>");
        } else {
            $("#khname").html(mbname).addClass("current");
        }
        $("#pageIndex").val(0);
        $("#list").html("");
        queryData();
    });

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var bindFlag = false;
var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/order/orderManager.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));

        if (!bindFlag) {
            bindFlag = true;
            if (!isNull(d.isSalesman) && d.isSalesman === 1) {
                // 业务员查询，显示客户下拉
                $("#khname").show();
                $("#depname").hide();
            } else {
                // 客户查询，显示销售组织
                $("#khname").hide();
                $("#depname").show();
                bindDepname(d.depList);
            }
        }
		//处理语言
		execI18n();

    }, true, function() {
        queryFlag = false;
        $(".weui-infinite-scroll").hide();
    });
}

// 绑定销售组织
function bindDepname(data) {
    $("#depname").select({
        title: "请选择销售组织",
        items: data,
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#depname").html("销售组织<span class=\"xl\"></span>");
                $("#vkorg").val("");
            } else {
                $("#depname").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#vkorg").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#depname").html("销售组织<span class=\"xl\"></span>");
            $("#vkorg").val("");
            initPage();
        }
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
    if (!isNull($("#wbsta").val())) {
        dataMap.wbsta = $("#wbsta").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    if (!isNull($("#sapCustomerId").val())) {
        dataMap.kunnr = $("#sapCustomerId").val();
    }
    if (!isNull($("#vkorg").val())) {
        dataMap.vkorg = $("#vkorg").val();
    }

    return dataMap;
}


