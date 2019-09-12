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

function queryData() {
    var url = requestPath + "/m/salesData/list.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true);

}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

function getDataMap() {
    var dataMap = {};
    dataMap.pageSize = 15;
    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    return dataMap;
}

function toBalance(sapCustomerId) {
    openPage("客户余额", "../public/balance.html?sapCustomerId=" + sapCustomerId, "1");
}
