$(function() {   
    var url = window.location.href;
    scanRecord(8,0,'',url,'公告页面');
    queryData();

});

function queryData() {
    var url = requestPath + "/m/notice/noticeList.htm";
    var dataMap = {};
    dataMap.status = 2;
    dataMap.pageSize = 20;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        $("ul").append(template('list_page', d));
    }, true);
}


function info(pkid) {
    openPage("公告详情", "../notice/noticeDetail.html?pkid=" + pkid);
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
