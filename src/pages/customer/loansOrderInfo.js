$(function() {
    var fphm = $("#fphm").val();
    if (isNull(fphm)) {
        showMessage("参数错误，单号为空");
        return false;
    }
    queryData();
});

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

function queryData() {
    var url = requestPath + "/m/jkqd/info.htm";
    var dataMap = {};
    dataMap.fphm = $("#fphm").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#main").html(template('main_page', d));
    });
}