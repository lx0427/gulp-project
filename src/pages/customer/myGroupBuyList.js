$(function() {
    var url = window.location.href;
    scanRecord(19,0,'',url,'我的拼团');
    queryData();

    $(".my_shop_btn").bind("click", function(){
    	if(!$(this).hasClass("active")){
    		$(".my_shop_btn").removeClass("active");
    		$(this).addClass("active");
    		$("#pageIndex").val(0);
    		$("#list").html("");
    		queryData();
    	}
    });
});

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

function queryData() {
    var url = requestPath + "/m/group/buy/list.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true);
}

function getDataMap(){
	var dataMap = {};
	var gbType = $(".my_shop .active").attr("gbType");
	if(!isNull(gbType)){
		dataMap.gbType = gbType;
	}	
	return dataMap;
}

function showRules(pkid){
    $("#rule .rule_detail").html($("#rules_"+pkid).val());
    $("#rule").show();
}

function closeRules(){
    $("#rule").hide();
}