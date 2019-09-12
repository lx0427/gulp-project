$(function() {


    var clientRequest = getRequest();
    var pkid = clientRequest["pkid"];
    if (isNull(pkid)) {
        showMessage("参数错误");
        return false;
    }
    queryData(pkid);

});

function queryData(pkid) {

    var url = requestPath + "/m/notice/noticeDetail.htm";

    var dataMap = {};
    if (!isNull(pkid)) {
        dataMap["pkid"] = pkid;
    } else {
        showMessage("参数错误");
        return false;
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#title").html(d.data.title);
        $("#dates").html(getDatas(d.data.modrq, "yyyy-MM-dd HH:mm"));
        $("#content").html(d.data.content);
    });


}




function getDatas(str, pattern) {

    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(pattern);

}
