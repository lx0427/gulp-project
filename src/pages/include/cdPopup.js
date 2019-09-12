$(function() {
    getCdList();
    $("#cdForm").bind("submit", function() {
        getCdList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#cdKeyword").val())) {
            return false;
        }
        $("#cdKeyword").val("");
        getCdList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#cdKeyword").val())) {
            return false;
        }
        $("#cdKeyword").val("");
        getCdList();
    });
});

var cdQueryFlag = false;
function getCdList() {
    if(cdQueryFlag){
        return;
    }
    cdQueryFlag = true;
    var url = requestPath + "/m/select/cdList.htm";
    var dataMap = {};
    dataMap.language=i18nLanguage;
	var cdKeyword = $("#cdKeyword").val();
    if (!isNull(cdKeyword)) {
        dataMap.cd = cdKeyword;
    }
    var pm = "";
    if(isNull(selectCdId)){
        pm = $("#pm").val();
    }else{
        pm = $("#pm_"+selectCdId).val();
    }
    if (!isNull(pm)) {
        dataMap.pm = pm;
    }
    var gg = "";
    if(isNull(selectCdId)){
        gg = $("#gg").val();
    }else{
        gg = $("#gg_"+selectCdId).val();
    }
    if (!isNull(gg)) {
        dataMap.gg = gg;
    }
    var cz = "";
    if(isNull(selectCdId)){
        cz = $("#cz").val();
    }else{
        cz = $("#cz_"+selectCdId).val();
    }
    if (!isNull(cz)) {
        dataMap.cz = cz;
    }
    if($("#pm").val() === "POY"||$("#pm").val() === "FDY"){
        var lx = $("#lx").val();
        if (!isNull(lx)) {
            dataMap.wzlb = lx;
        }
    } 
    if($("#pm").val() === "DTY"){
        var sz = $("#sz").val();
        if (!isNull(sz)) {
            dataMap.str03 = $("#sz").val();
        }
        var nx = $("#nx").val();
        if (!isNull(nx)) {
            dataMap.str02 = $("#nx").val();
        }
    } 
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#cdList").html(template('cdList_page', d));
    }, false, function(){
        cdQueryFlag = false;
    });
}

function showCdPopup() {    
    $("#cdPopup").popup();
}

var selectCdId = "";
function showCdPopupById(cdId) {
    selectCdId = cdId;
    $("#cdList").html("");
    getCdList();
    $("#cdPopup").popup();
}

function chooseCd(cd) {
    if (!isNull(selectCdId)) {
        $("#cd_" + selectCdId).val(cd);
        $("#cd_" + selectCdId).trigger("change");
    } else {
        $("#cd").val(cd);
        $("#cd").trigger("change");
    }
}

