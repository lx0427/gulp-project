$(function() {
    var url = window.location.href;
    scanRecord(39,0,'',url,'','物流查询');

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
    var url = requestPath + "/m/order/toHtmsList.htm?vbeln="+$("#vbeln").val() + "&&pm=" + $("#pm").val() + "&&cz=" +$("#cz").val() + "&&nx=" + $("#nx").val() + "&&sz=" + $("#sz").val() + "&&gg=" + $("#gg").val() + "&&cd=" + $("#cd").val() + "&&wzlb=" + $("#wzlb").val() + "&&lbsm=" + $("#lbsm").val();

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        
        $("#list").append(template('list_page', d));

    }, true, function() {
        queryFlag = false;
        $(".weui-infinite-scroll").hide();
    });
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

//跳转至物流信息详情界面
function toHtmsInfo (orderCode, sapCode) {
	
		openPage("物流信息界面", "../public/htmsInfo.html?vbeln=" + orderCode +"&&sapCode=" + sapCode, "1");

}

