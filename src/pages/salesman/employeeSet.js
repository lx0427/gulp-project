$(function() {
    initPage();

    $("#form").bind("submit", function() {
        $("#pageIndex").val(0);
        $("#list").html("");
        queryData();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#pageIndex").val(0);
        $("#list").html("");
        $("#querykey").val("");
        queryData();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#pageIndex").val(0);
        $("#list").html("");
        $("#querykey").val("");
        queryData();
    });
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
    var url = requestPath + "/m/optUser/list.htm";

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
    dataMap.pageSize = 15;

    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    return dataMap;
}

var tongbuFlag = false;

function tongBu() {
    $("#wx_btnnextid").html("员工数据同步中...")

    if (tongbuFlag) {
        return false;
    }

    var url = requestPath + "/m/optUser/doImport.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return null;
    }
    tongbuFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        $("#wx_btnnextid").html("同步员工数据")
        showOk("同步数据成功");
    }, false, function() {
        tongbuFlag = false;
    });
}

function toPage(userid,dpname){
    openPage("员工设置", "../salesman/employeeEdit.html?userid=" + userid + "&dpname=" + dpname);
}
