$(function() { 
    getLxList();
    $("#lxForm").bind("submit", function() {
        getLxList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#lxKeyword").val())) {
            return false;
        }
        $("#lxKeyword").val("");
        getLxList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#lxKeyword").val())) {
            return false;
        }
        $("#lxKeyword").val("");
        getLxList();
    });
});

var lxQueryFlag = false;
function getLxList() {
    if(lxQueryFlag){
        return;
    }
    lxQueryFlag = true;
    var url = requestPath + "/m/select/wzlbList.htm";
    var dataMap = {};
    dataMap.language=i18nLanguage;
	var lxKeyword = $("#lxKeyword").val();
    if (!isNull(lxKeyword)) {
        dataMap.wzlb = lxKeyword;
    }
    var pm = "";
    if(isNull(selectlxId)){
        pm = $("#pm").val();
    }else{
        pm = $("#pm_"+selectlxId).val();
    }
    if (!isNull(pm)) {
        dataMap.pm = pm;
    }
    var gg = "";
    if(isNull(selectlxId)){
        gg = $("#gg").val();
    }else{
        gg = $("#gg_"+selectlxId).val();
    }
    if (!isNull(gg)) {
        dataMap.gg = gg;
    }
    var cz = "";
    if(isNull(selectlxId)){
        cz = $("#cz").val();
    }else{
        cz = $("#cz_"+selectlxId).val();
    }
    if (!isNull(cz)) {
        dataMap.cz = cz;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#lxList").html(template('lxList_page', d));
    }, false, function(){
        lxQueryFlag = false;
    });
}

function showLxPopup() {    
    $("#lxPopup").popup();
}

var selectlxId = "";
function showLxPopupById(lxId) {
    selectlxId = lxId;
    $("#lxList").html("");
    getLxList();
    $("#lxPopup").popup();
}

function chooseLx(lx) {
    if (!isNull(selectlxId)) {
        $("#lx_" + selectlxId).val(lx);
        $("#lx_" + selectlxId).trigger("change");
    } else {
        $("#lx").val(lx);
        $("#lx").trigger("change");
    }
}

