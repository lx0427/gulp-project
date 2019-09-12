$(function(){
    queryData();
})

function queryData() {
    var url = requestPath + "/m/helpcenter/problemCategoryList.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
            $("#list").html(template('list_page', d));
    });
}



function findProblem(cid){    
    openPage("问题列表", "../helpcenter/problemlist.html?cid="+cid, "1");
}
function findAnswar(pid){    
    openPage("查看答案", "../helpcenter/answar.html?pid="+pid, "1");
    var uri = window.location.href;
    scanRecord(94,1,pid,uri,'帮助中心常见问题');
}
