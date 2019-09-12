$(function() {
    getGgList();

    $("#ggForm").bind("submit", function() {
        getGgList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#ggKeyword").val())) {
            return false;
        }
        $("#ggKeyword").val("");
        getGgList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#ggKeyword").val())) {
            return false;
        }
        $("#ggKeyword").val("");
        getGgList();
    });
});

function getGgList() {
    var url = requestPath + "/m/select/ggList.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
    var ggKeyword = $("#ggKeyword").val();
    if (!isNull(ggKeyword)) {
        dataMap.gg = ggKeyword;
    }
    var pm = $("#"+pmId+" span.cpx_label_checked").text();
    if (!isNull(pm)) {
        var pmt = $("#"+pmId+" span.cpx_label_checked").text();
        if(pmt=="涤纶切片"){
            pmt = "切片";
        }
        dataMap.pm = pmt;
    }
       
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        $("#ggList").html(template('ggList_page', d));
    });
}

function showGgPopup() {
    $("#ggReportPopup").popup();
}

var selectGgId = "";
function showGgPopupById(gGId) {
    selectGgId = gGId;
    $("#ggReportPopup").popup();
}

function chooseGg(obj) {
    var c = "ggp_"+obj.id;
    if($("#"+c).hasClass("checked_flag")){
        $("#"+c).removeClass("checked_flag");
    }else{
        $("#"+c).addClass("checked_flag");
    }
}

function submitGG(){
    var gg = "";
    $(".checked_flag").each(function(){
        gg = gg + $(this).text() + ", ";
    });
    gg = gg.substring(0, gg.length-2);
    $("#"+ggId).val(gg);
}

