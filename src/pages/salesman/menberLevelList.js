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
var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/menberLevel/list.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
        execI18n();
    }, true, function() {
        queryFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};
    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    return dataMap;
}
