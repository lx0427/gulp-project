$(function() {
    queryData();
    setTimeout(function () {
		execI18n();
	},500);
});

function queryData() {
    var url = requestPath + "/m/merchant/getMerchantDisplayInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);    
        $("#main").html(template('main_page', d));

    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }
   
    return dataMap;
}