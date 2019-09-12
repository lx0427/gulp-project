$(function() {
    setTimeout(function () {
        execI18n();
    },500);
    
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
 
    //品名
    $("#pm").select({
        title: "请选择品名",
        items: [{
            title: "DTY",
            value: "DTY",
        }, {
            title: "FDY",
            value: "FDY"
        }, {
            title: "POY",
            value: "POY"
        }, {
            title: "切片",
            value: "切片"
        }, {
            title: "短纤",
            value: "短纤"
        }, {
            title: "锦纶切片",
            value: "锦纶切片"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#pm").html("品名<span class=\"xl\"></span>");
                $("#pm1").val("");
            } else {
                $("#pm").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#pm1").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pm").html("品名<span class=\"xl\"></span>");
            $("#pm1").val("");
            initPage();
        }
    });

//等级
    $("#level").select({
        title: "请选择等级",
        items: [{
            title: "VIP客户",
            value: "VIP客户",
        }, {
            title: "核心客户",
            value: "核心客户"
        }, {
            title: "价值客户",
            value: "价值客户"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#level").html("等级<span class=\"xl\"></span>");
                $("#levelName").val("");
            } else {
                $("#level").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#levelName").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#level").html("等级<span class=\"xl\"></span>");
            $("#levelName").val("");
            initPage();
        }
    });

    //排序
    var orderName = "";
    var order = "";
    $("#sort").select({
        title: "请选择",
        items: [{
            title: "默认",
            value: "",
        }, {
            title: "编码升序",
            value: "asc"
        }, {
            title: "编码降序",
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
                $("#orderName").val("mbname");
                $("#order").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();       
            $("#orderName").val("");
            $("#order").val("");
            $("#sort").html("排序<span class=\"xl\"></span>");
            initPage();
        }
    });

    initPage();
});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/customerMKT/list.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true, function() {
        queryFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};
   

    if (!isNull($("#pm1").val())) {
        dataMap.pm1 = $("#pm1").val();
    }
    if (!isNull($("#levelName").val())) {
        dataMap.levelName = $("#levelName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    var clientRequest = getRequest();
    dataMap.userid = clientRequest["userid"];
    dataMap.flag03 = sessionStorage.getItem("flag03"); 
    return dataMap;
}


function info(mktid){
    openPage("MKT客户详情", "../salesman/menberMKTInfo.html?mktid="+mktid);
}

