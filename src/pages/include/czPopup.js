$(function() {
    getCzList();

    $("#czForm").bind("submit", function() {
        getCzList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#czKeyword").val())) {
            return false;
        }
        $("#czKeyword").val("");
        getCzList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#czKeyword").val())) {
            return false;
        }
        $("#czKeyword").val("");
        getCzList();
    });
});

function getCzList() {
    var url = requestPath + "/m/select/czList.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
    var czKeyword = $("#czKeyword").val();
    if (!isNull(czKeyword)) {
        dataMap.cz = czKeyword;
    }
    var pm = $("#pm").val();
    if (!isNull(pm)) {
        dataMap.pm = $("#pm").val();
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#czList").html(template('czList_page', d));
    });
}

function showCzPopup() {
    $("#czPopup").popup();
}

var selectCzId = "";
function showCzPopupById(CzId) {
    selectCzId = CzId;
    $("#czPopup").popup();
}

function chooseCz(cz) {
    if (!isNull(selectCzId)) {
        $("#cz_" + selectCzId).val(cz);
        $("#cz_" + selectCzId).trigger("change");
    } else {
        $("#cz").val(gg);
        $("#cz").trigger("change");
    }
}

