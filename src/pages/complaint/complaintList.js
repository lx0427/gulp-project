$(function() {
    var url = window.location.href;
    scanRecord(25,0,'',url,'售后服务');
   queryData();
   setTimeout(function () {
        execI18n();
    },500);
});

function queryData() {
    var url = requestPath + "/m/complaint/list.htm";
    var dataMap = getDataMap();
	$.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		if (pullRefresh) {
            $("#list").html(template('list_page1', d));
        } else {
            $("#list").append(template('list_page1', d));
        }
	    
       }, true, function() {
		  
     });
}

function getDataMap() {
    var dataMap = {};
	
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
function toHandle(pkid) {
	openPage("投诉详情", "../complaint/complaintInfo.html?pkid="+pkid, "1");
}


function toComplaint(){
    openPage("我要投诉", "../complaint/customerComplaint.html", "1");
    // openPage("我要投诉", "../customer/smallYi.html?category=1", "1");
}