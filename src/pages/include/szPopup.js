$(function() {
    getSzList();
    $("#szForm").bind("submit", function() {
        getSzList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#szKeyword").val())) {
            return false;
        }
        $("#szKeyword").val("");
        getSzList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#szKeyword").val())) {
            return false;
        }
        $("#szKeyword").val("");
        getSzList();
    });
});

var szQueryFlag = false;
function getSzList() {
    if(szQueryFlag){
        return;
    }
    szQueryFlag = true;
    var url = requestPath + "/m/select/str03List.htm";
    var dataMap = {};
    dataMap.language=i18nLanguage;
	var szKeyword = $("#szKeyword").val();
    if (!isNull(szKeyword)) {
        dataMap.str03 = szKeyword;
    }
    var pm = "";
    if(isNull(selectSzId)){
        pm = $("#pm").val();
    }else{
        pm = $("#pm_"+selectSzId).val();
    }
    if (!isNull(pm)) {
        dataMap.pm = pm;
    }
    var gg = "";
    if(isNull(selectSzId)){
        gg = $("#gg").val();
    }else{
        gg = $("#gg_"+selectSzId).val();
    }
    if (!isNull(gg)) {
        dataMap.gg = gg;
    }
    var cz = "";
    if(isNull(selectSzId)){
        cz = $("#cz").val();
    }else{
        cz = $("#cz_"+selectSzId).val();
    }
    if (!isNull(cz)) {
        dataMap.cz = cz;
    }
    var cd = $("#cd").val();
    if (!isNull(cd)) {
        dataMap.cd = $("#cd").val();
    }

    var nx = $("#nx").val();
    if (!isNull(nx)) {
        dataMap.str02 = $("#nx").val();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#szList").html(template('szList_page', d));
    }, false, function(){
        szQueryFlag = false;
    });
}

function showSzPopup() {    
    $("#szPopup").popup();
}

var selectSzId = "";
function showSzPopupById(szId) {
    selectSzId = szId;
    $("#szList").html("");
    getSzList();
    $("#szPopup").popup();
}

function chooseSz(sz) {
    if (!isNull(selectSzId)) {
        $("#sz_" + selectSzId).val(sz);
        $("#sz_" + selectSzId).trigger("change");
    } else {
        $("#sz").val(sz);
        $("#sz").trigger("change");
    }
}

