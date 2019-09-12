$(function() {
    initPage();

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var bindFlag = false;
var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/order/getHyCustomerOrderSlList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
        //处理语言
		execI18n();
    }, true, function() {
        queryFlag = false;
      
    });
}



function getDataMap() {
    var dataMap = {};

    return dataMap;
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


//导出订单数据
function toExport(){
	var url = requestPath + "/m/order/export.htm";
	var e_circleId = $("#e_circleId").val();
  var e_isSalesman = $("#e_isSalesman").val();
  var e_userId = $("#e_userId").val();
  var e_sapCustomerId = $("#e_sapCustomerId").val();
	url=url+"?callback=xxxxx&&querykey="+$("#querykey").val()+"&&rqStart="+$("#start_date").val()+"&&rqEnd="+$("#end_date").val()+"&&wbsta="+$("#wbsta").val()+"&&orderName="+$("#orderName").val()+"&&order="+$("#order").val()+"&&kunnr="+$("#sapCustomerId").val()+"&&vkorg="+$("#vkorg").val()+"&&e_circleId="+e_circleId+"&&e_isSalesman="+e_isSalesman+"&&e_userId="+e_userId+"&&e_sapCustomerId="+e_sapCustomerId;
	
	openPage("导出订单数据", url, "1");
}


function toList (sapCustomerId) {
	openPage("合约客户订单", "../public/sapHyOrderList.html?sapCustomerId=" + sapCustomerId, "1");
}

