$(function() {

    $("#form").bind("submit", function() {
        $("#pageIndex").val(0);
        $("#list").html("");
        queryData();
        return false;
    });

    queryData();

});

function queryData() {
    var url = requestPath + "/m/menberMaintenance/menberList.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        $("#list").append(template('list_page', d));
        execI18n();
    }, true);
}

//根据 hydm -> sap_customer_id 查找客户维护的数据集合
function info(hydm) {
    var userid = $("#userid").val();
    openPage("客户维护列表", "../salesman/menberMaintenanceHistoryList.html?sapCustomerId=" + hydm + "&userid=" + userid);
}

//我要维护
//1 查看当前业务员负责的产品线有哪些
//2 根据产品线类型以及相应业务员查询其客户有哪些  ，这里不需要区分该客户是否已经维护过，都存放到维护的记录表当中去
//3 提示框
//4 相应字段即可
//5 保存后跳转至相应客户的维护列表界面，显示这个客户的维护数据集合
function doMaintence() {
    var userid = $("#userid").val();
    openPage("我要维护", "../salesman/doMaintence.html?userid="+userid, "1");
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

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    var clientRequest = getRequest();
    dataMap.userid = clientRequest["userid"];
    return dataMap;
}
