$(function() {
    queryData();
    setTimeout(function () {
		execI18n();
	},1000);
});

function queryData() {
    var url = requestPath + "/m/msgInfo/getInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#main").html(template('main_page', d));
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#type").val())) {
        dataMap.type = $("#type").val();
    }
    if (!isNull($("#fphm").val())) {
        dataMap.fphm = $("#fphm").val();
    }
    if (!isNull($("#vbeln").val())) {
        dataMap.vbeln = $("#vbeln").val();
    }
    if (!isNull($("#transno").val())) {
        dataMap.transno = $("#transno").val();
    }
   
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
template.helper("getStrByZero", function(str) {
    if (isNull(str)) {
        return;
    }
    str = str + "";
    if(str.indexOf(".") > -1){
    	str = str.substring(0,str.indexOf(".") + 3);
    }
    return str;
});