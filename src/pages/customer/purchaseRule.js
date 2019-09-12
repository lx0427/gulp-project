$(function() {
	queryData();
});

function queryData(){
	var url = requestPath + "/m/purchase/getRule.htm";
    var dataMap = {};
    dataMap.pkid = $('#purid').val();
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	console.log(d);
    	$('#content').html(d.purchase.rule);
    });
}