$(function() {
    var url = window.location.href;
    scanRecord(16,0,'',url,'','余额查询');
     queryData();
});

function queryData() {
    var url = requestPath + "/m/customerBalance/getCustomerBalanceList.htm";

    var dataMap = {};
    var sapCustomerId = $("#sapCustomerId").val();
    if(!isNull(sapCustomerId)){
        dataMap.sapCustomerId = sapCustomerId;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
 		$("#main").append(template('main_page', d));
    });
}

