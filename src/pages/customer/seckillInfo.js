$(function() {
     queryData();
});

var isLogin = false; // 是否登录

function queryData() {
    var url = requestPath + "/m/seckill/seckillInfo.htm";
    var dataMap = {};
    dataMap.pkid = $("#pkid").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		console.info(d);
        
        $("#main").html(template('main_page', d));    
    });
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