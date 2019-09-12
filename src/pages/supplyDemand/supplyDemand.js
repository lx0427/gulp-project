$(function() {
    initPage();
    $("#form").bind("submit", function() {
        initPage();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });
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
    var url = requestPath + "/m/supplyDemand/getsupplyDemand.htm";

    var dataMap = getDataMap();
    
    dataMap.isMy = 2;//表示公共 供求
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true, function() {
        queryFlag = false;
        $(".weui-infinite-scroll").hide();
    });
}


function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.flag = $("#querykey").val();
    }
    if (!isNull($("#str01").val())) {
        dataMap.str01 = $("#str01").val();
    }

    return dataMap;
}

//供应点击状态  1 已点击  2未点击
var supplystatus = 2;
//求购点击状态	1 已点击  2未点击
var demandstatus = 2;
function changeSupply(val){
	if(val == '供应' && supplystatus == 2){
		
		supplystatus = 1;
		demandstatus = 2;
		
		$("#str01").val(val);
		
		$("#supply_w").attr("class","current wx_hyfilter_qy");
		$("#supply_n").css("background","../../images/rankxl01.png");
		
		$("#demand_w").attr("class","");
		$("#demand_n").css("background","../../images/rankxl1.png");
	}else if(val == '求购' && demandstatus == 2){
		demandstatus = 1;
		supplystatus = 2;
		
		$("#str01").val(val);
		
		$("#supply_w").attr("class","");
		$("#supply_n").css("background","../../images/rankxl1.png");
		
		$("#demand_w").attr("class","current wx_hyfilter_qy");
		$("#sudemand_npply_n").css("background","../../images/rankxl01.png");
	}else if(val == '供应' && supplystatus == 1){
		
		supplystatus = 2;
		demandstatus = 2;
		
		$("#str01").val("");
		
		$("#demand_w").attr("class","");
		$("#demand_n").css("background","../../images/rankxl1.png");
		$("#supply_w").attr("class","");
		$("#supply_n").css("background","../../images/rankxl1.png");
	}else if(val == '求购' && demandstatus == 1){
		demandstatus = 2;
		supplystatus = 2;
		
		$("#str01").val("");
		
		$("#demand_w").attr("class","");
		$("#demand_n").css("background","../../images/rankxl1.png");
		$("#supply_w").attr("class","");
		$("#supply_n").css("background","../../images/rankxl1.png");
	}
	
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

function toInfo(pkid){
	openPage("供求详情", "supplyDemandInfo.html?pkid="+pkid+"&&isMy=2", "1");
}
