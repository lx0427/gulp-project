$(function() {
    var url = window.location.href;
    scanRecord(12,0,'',url,$.i18n.prop('cu_qhyhsuccess'));
    queryData();
});

function queryData() {
    var url = requestPath + "/m/login/getMboptRelationList.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#main").html(template('main_page', d));
    });
}

var changeUserFlag = false;
function changeUser(userid) {
	if(changeUserFlag){
		return false;
	}
	changeUserFlag = true;
    var url = requestPath + "/m/login/changeUser.htm";
    var dataMap = {};
    dataMap.userid = userid;
	var wxOpenid = sessionStorage.getItem("wxOpenid");
    if(!isNull(wxOpenid)){
            dataMap.openid = wxOpenid;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        showOk($.i18n.prop('cu_qhyhsuccess'), function() {
            openPage($.i18n.prop('com_myname'), "../customer/my1.html", "1");
        });
    }, false, function(){
    	changeUserFlag = false;
    });
}
