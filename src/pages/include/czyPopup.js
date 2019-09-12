$(function() {
    // 滚动加载,需要分页的地方id必须是infinitePage
    $("#menberInfinitePage").infinite().on("infinite", function() {
        if (scrollLoading) {
            return;
        }
        var pageIndex = $("#pageIndex").val(); // 当前页
        var pageCount = $("#pageCount").val(); // 总页数
        if (isNull(pageIndex) && isNull(pageCount)) {
            // 不需要分页
            $(".weui-infinite-scroll").hide();
            return;
        }
        if (parseInt(pageIndex) >= parseInt(pageCount)) {
            // 已经是最后一页了
            $(".weui-infinite-scroll").hide();
            return;
        }

        scrollLoading = true;
        setTimeout(function() {
            getMenberList();
        }, 10);
    });

    getMenberList();

    $("#menberForm").bind("submit", function() {
        $("#pageIndex").val("0");
        $("#menberList").html("");
        getMenberList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#username").val())) {
            return false;
        }
        $("#username").val("");
        $("#pageIndex").val("0");
        $("#menberList").html("");
        getMenberList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#username").val())) {
            return false;
        }
        $("#username").val("");
        $("#pageIndex").val("0");
        $("#menberList").html("");
        getMenberList();
    });
});

function getMenberList() {
    var url = requestPath + "/m/select/mbOptList.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
    var username = $("#username").val();
    if (!isNull(username)) {
        dataMap.username = username;
    }
    // var pm = $("#pm").val();
    // if (!isNull(pm)) {
    //     $("#pmname").html(pm);
    //     dataMap.pm = $("#pm").val();
    // }
    dataMap.pageSize = 20;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#menberList").append(template('menberList_page', d));
        $("#menberCount").html(d.recordCount);
    },true);
}


function chooseMenber(userid) {
    $("#userid").val(userid);
    $("#userid").trigger("change");
}
