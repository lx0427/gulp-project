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
    var url = requestPath + "/m/sapProductInuse/list.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true, function() {
    	execI18n();
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

function toEditPage(pkid){
    openPage("物料对照关系编辑", "../salesman/materialEdit.html?pkid=" + pkid);
}

function toAddPage(){
    openPage("物料对照关系新增", "../salesman/materialEdit.html");
}
