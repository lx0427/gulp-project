$(function() {
	queryData();
});


function queryData() {
    var url = requestPath + "/m/informationReports/getHistorList.htm";
    var dataMap = {};
    dataMap.whType = $("#whType").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        $("#list").append(template('list_page', d));
        var html = "本月:"+d.monthNum+"条"+", 总计:"+d.recordCount+"条";
        $("#totalNum").text(html);
    }, true, function(){});
    
}

function onPage(obj) {
	if (obj == 2) {
		openPage("客户拜访", "../informationReport/messageVistAddressAdd.html");
	}
	if (obj == 3) {
		openPage("周报", "../informationReport/messageWeekAdd.html");
	}
}

// 初始化微信授权id
function initOauth() {
	var wxOpenid = $("#openid").val();
	if (!isNull(wxOpenid)) {
		sessionStorage.setItem("wxOpenid", wxOpenid);
	}
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

function toInfo(pkid, whType){
    if(whType==1){
        openPage("随手记详情", "../informationReport/messageNoteInfo1.html?pkid="+pkid+"&isReport=1");
    }
	if(whType==2){
        openPage("拜访详情", "../informationReport/messageVistAddressInfo.html?pkid="+pkid+"&isReport=1");
    } 
    if(whType==3){
        openPage("周报详情", "../informationReport/messageWeekInfo.html?pkid="+pkid+"&isReport=1");
    }
}




