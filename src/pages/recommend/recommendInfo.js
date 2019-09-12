$(function() {
   queryData();
   setTimeout(function(){
   	execI18n();
   },500);
});

function queryData() {
    var url = requestPath + "/m/userShare/shareInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);

        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }
        $("#main").html(template('main_page', d));
    });
}
function getDataMap() {
    var dataMap = {};

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