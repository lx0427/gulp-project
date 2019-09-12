$(function() {
   queryData();
});

var sapgg = null;

function queryData() {
	var fcFlag=$("#fcFlag").val();
    var url = requestPath + "/m/coupon/list.htm";
    var dataMap = getDataMap();
    
    if(fcFlag==1){
		url = requestPath + "/m/coupon/listFc.htm";
	}
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (pullRefresh) {
            $("#list").html(template('list_page', d));
        } else {
            $("#list").append(template('list_page', d));
        }
        if(d.data == ""){
		 
		  $("#yhqnull1").css('display','block');
		  $("#yhqnull2").css('display','block');
		}else{
		 
		  $("#yhqnull1").css('display','none');
		  $("#yhqnull2").css('display','none');
		}
        }, true, function() {
		  $("#zwt-img").css('display','none');
     });
}

function getDataMap() {
    var dataMap = {};
    dataMap.status = 2;
    return dataMap;
}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
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