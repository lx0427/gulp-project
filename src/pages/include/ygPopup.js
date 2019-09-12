$(function() {
    //getYgList();
    $("#ygForm").bind("submit", function() {
        getYgList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#gyKeyword").val())) {
            return false;
        }
        $("#ygKeyword").val("");
        getYgList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#ygKeyword").val())) {
            return false;
        }
        $("#ygKeyword").val("");
        getYgList();
    });
});

var ygQueryFlag = false;
function getYgList() {
    if(ygQueryFlag){
        return;
    }
    ygQueryFlag = true;
    var url = requestPath + "/m/menberManager/yglist.htm";
    var dataMap = {};
    dataMap.language=i18nLanguage;
	var ygKeyword = $("#ygKeyword").val();
    if (!isNull(ygKeyword)) {
        dataMap.querykey = ygKeyword;
    }
        dataMap.repid = selectYgId;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#ygList").html(template('ygList_page', d));
    }, false, function(){
        ygQueryFlag = false;
    });
}

function showYgPopup() {    
    $("#ygPopup").popup();
}

var selectYgId = "";
var sendid = "";
function showYgPopupById(repid,id) {
    selectYgId = repid;
    sendid=id;
    $("#ygList").html("");
    getYgList();
    $("#ygPopup").popup();
}

function chooseYg(repid,repname) {
        $("#yg"+sendid).text(repname);
        $("#repid").val(repid);
  
}

