$(function() {
    initPage();

    $("#form").bind("submit", function() {
        $("#pageIndex").val(0);
        $("#list").html("");
        queryData();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#pageIndex").val(0);
        $("#list").html("");
        $("#querykey").val("");
        queryData();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#pageIndex").val(0);
        $("#list").html("");
        $("#querykey").val("");
        queryData();
    });

    $("#userid").bind("change", function() {
        tongBu();
    });
    
    setTimeout (function(){
    	 execI18n();
    },500);

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}
var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/customerRelation/list.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true, function() {
        queryFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};
    dataMap.pageSize = 15;

    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    return dataMap;
}

var tongbuFlag = false;
function tongBu() {
    if(tongbuFlag){
        return false;
    }
        
    var url = requestPath + "/m/customerRelation/doImport.htm";
    var dataMap = {};
    dataMap.userId = $("#userid").val();
    $("#wx_btnnextid").html("客户关系数据同步中...")
    tongbuFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("数据同步成功");
    }, false, function() {
        $("#wx_btnnextid").html("同步客户关系数据")
        tongbuFlag = false;
    });   

}

function showMenberPopup() {
    if(tongbuFlag){
        return false;
    }
    $("#menberPopup").popup();
}