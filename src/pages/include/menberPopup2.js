$(function() {
    // 滚动加载,需要分页的地方id必须是infinitePage
    // $("#menberInfinitePage").infinite().on("infinite", function() {
    //     if (scrollLoading) {
    //         return;
    //     }
    //     var pageIndex = $("#pageIndex").val(); // 当前页
    //     var pageCount = $("#pageCount").val(); // 总页数
    //     if (isNull(pageIndex) && isNull(pageCount)) {
    //         // 不需要分页
    //         $(".weui-infinite-scroll").hide();
    //         return;
    //     }
    //     if (parseInt(pageIndex) >= parseInt(pageCount)) {
    //         // 已经是最后一页了
    //         $(".weui-infinite-scroll").hide();
    //         return;
    //     }

    //     scrollLoading = true;
    //     setTimeout(function() {
    //         getMenberList();
    //     }, 10);
    // });

    // getMenberList();

    $("#menberForm").bind("submit", function() {
        $("#pageIndex").val("1");
        $("#menberList").html("");
        getMenberList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#menberKeyword").val())) {
            return false;
        }
        $("#menberKeyword").val("");
        $("#pageIndex").val("1");
        $("#menberList").html("");
        // getMenberList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#menberKeyword").val())) {
            return false;
        }
        $("#menberKeyword").val("");
        $("#pageIndex").val("1");
        $("#menberList").html("");
        // getMenberList();
    });
});

var lcouponCode="";

function getMenberList() {
    var url = requestPath + "/m/coupon/searchMenber.htm";
    var dataMap = {};
    dataMap.pageSize = 200;
	dataMap.language=i18nLanguage;
    var menberKeyword = $("#menberKeyword").val();
    if (!isNull(menberKeyword)) {
        dataMap.mbname = menberKeyword;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#menberList").append(template('menberList_page', d));
        $("#menberCount").html(d.data.length);
    },false);
}

function showMenberPopup(couponCode) {
    lcouponCode = couponCode;
    $("#menberPopup").popup();
}

function chooseMenber(hydm) {
   confirmMsg("确认将优惠券赠送给他?", function() {
        var url = requestPath + "/m/coupon/transferOwner.htm";
        var dataMap = {};
		dataMap.language=i18nLanguage;
        dataMap.hydm = hydm;
        dataMap.couponCode = lcouponCode;
        console.info(dataMap);
        $.ajaxjsonp(url, dataMap, function(data) {
            showMessage("赠送成功!");
            setTimeout("toMyCouponList()",1000) ;
            
        });
    });
}

function toMyCouponList(){
    openPage("我的优惠券", "../customer/couponList.html", "1");
}