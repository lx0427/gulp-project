$(function() {
    getNxList();
    $("#nxForm").bind("submit", function() {
        getNxList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#nxKeyword").val())) {
            return false;
        }
        $("#nxKeyword").val("");
        getNxList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#nxKeyword").val())) {
            return false;
        }
        $("#nxKeyword").val("");
        getNxList();
    });
});

var nxQueryFlag = false;
function getNxList() {
    if(nxQueryFlag){
        return;
    }
    nxQueryFlag = true;
    var url = requestPath + "/m/select/str02List.htm";
    var dataMap = {};
    dataMap.language=i18nLanguage;
	var nxKeyword = $("#nxKeyword").val();
    if (!isNull(nxKeyword)) {
        dataMap.str02 = nxKeyword;
    }
    var pm = "";
    if(isNull(selectNxId)){
        pm = $("#pm").val();
    }else{
        pm = $("#pm_"+selectNxId).val();
    }
    if (!isNull(pm)) {
        dataMap.pm = pm;
    }
    var gg = "";
    if(isNull(selectNxId)){
        gg = $("#gg").val();
    }else{
        gg = $("#gg_"+selectNxId).val();
    }
    if (!isNull(gg)) {
        dataMap.gg = gg;
    }
    var cz = "";
    if(isNull(selectNxId)){
        cz = $("#cz").val();
    }else{
        cz = $("#cz_"+selectNxId).val();
    }
    if (!isNull(cz)) {
        dataMap.cz = cz;
    }

    var cd = $("#cd").val();
    if (!isNull(cd)) {
        dataMap.cd = $("#cd").val();
    }

    var sz = $("#sz").val();
    if (!isNull(sz)) {
        dataMap.str03 = $("#sz").val();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#nxList").html(template('nxList_page', d));
    }, false, function(){
        nxQueryFlag = false;
    });
}

function showNxPopup() {    
    $("#nxPopup").popup();
}

var selectNxId = "";
function showNxPopupById(nxId) {
    selectNxId = nxId;
    $("#nxList").html("");
    getNxList();
    $("#nxPopup").popup();
}

function chooseNx(nx) {
    if (!isNull(selectNxId)) {
        $("#nx_" + selectNxId).val(nx);
        $("#nx_" + selectNxId).trigger("change");
    } else {
        $("#nx").val(nx);
        $("#nx").trigger("change");
    }
}

