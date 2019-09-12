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
    var pm = $("#pm").val();
    if (!isNull(pm)) {
        dataMap.pm = $("#pm").val();
    }
    var cd = $("#cd").val();
    if (!isNull(cd)) {
        dataMap.cd = $("#cd").val();
    }   
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#ggList").html(template('ggList_page', d));
    });
}

function showGgPopup() {
    $("#ggPopup").popup();
}

var selectGgId = "";
function showGgPopupById(ggId) {
    selectGgId = ggId;
    $("#ggPopup").popup();
}

function chooseGg(gg) {
    if (!isNull(selectGgId)) {
        $("#gg_" + selectGgId).val(gg);
        $("#gg_" + selectGgId).trigger("change");
    } else {
        $("#gg").val(gg);
        $("#gg").trigger("change");
    }
}

