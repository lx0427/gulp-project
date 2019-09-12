$(function(){
    var cid = getQueryString("cid");
   queryData(cid);
})

function queryData(cid) {
    var url = requestPath + "/m/helpcenter/problemListById.htm";
    var dataMap = {};
    dataMap.cid = cid
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
            $("#list").html(template('list_page', d));
    });
}



function findAnswar(pid){    
    openPage("查看答案", "../helpcenter/answar.html?pid="+pid, "1");
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