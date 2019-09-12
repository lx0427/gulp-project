$(function() {
	var pid = getQueryString("pid");
    queryData(pid);
});

function queryData(pid) {
    var url = requestPath + "/m/helpcenter/findAnswar.htm";
    var dataMap = {};
    dataMap.pid=pid;
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       $("#list").html(template('list_page', d));
       $("#answar").html(data.answar.answar);
    });
}

function goback(){    
    openPage("帮助中心", "../helpcenter/helpcenter.html", "1");
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}