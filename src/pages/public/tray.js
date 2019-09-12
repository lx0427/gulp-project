$(function() {
   /* var url = window.location.href;
    scanRecord(16,0,'',url,'','余额查询');*/
     queryData();
});

function queryData() {
    var url = requestPath + "/m/searchHistory/getTrayInfo.htm";

    var dataMap = {};
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if(!isNull(d.data)){
            $("#main").append(template('main_page', d.data));
        }else{
            $("#main").html('<img src="../../images/zwt.png" class="img">');
        }
    });
}

