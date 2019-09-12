$(function() {
    setTimeout(function () {
        execI18n();
    },500);
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
    var url = requestPath + "/m/customerMKT/customerInfo.htm";

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
    var clientRequest = getRequest();
    dataMap.mktid = clientRequest["mktid"];
    return dataMap;
}



