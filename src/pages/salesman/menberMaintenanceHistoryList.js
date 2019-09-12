$(function() {

    queryData();

});

function queryData() {
    var url = requestPath + "/m/menberMaintenance/menberHistoryList.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        $("#list").append(template('list_page', d));
        execI18n();
    }, true);
}

function info(pkid,sapCustomerId) {
    var userid = $("#userid").val();
    openPage("我要维护", "../salesman/doMaintence.html?userid=" + userid + "&pkid=" + pkid + "&sapCustomerId=" + sapCustomerId, "1");
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
    var clientRequest = getRequest();
    dataMap.sapCustomerId = clientRequest["sapCustomerId"];
    return dataMap;
}
