$(function() {
    var url = window.location.href;
    scanRecord(18,0,'',url,'发票对账');
    queryData();
});

function queryData(){
    //后台没有发票对账功能，先写到MobileCouponAction里面
	var url = requestPath + "/m/coupon/list.htm";
	var dataMap = {};
    dataMap.status = 0;
    dataMap.imgLocation = 25;
	$.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        // 是否是下拉刷新
        // if(pullRefresh){
        //     $("#list").html(template('list_page', d));
        // }else{
        //     $("#list").append(template('list_page', d));
        // }
        if(!isNull(d.otherBanner) && d.otherBanner.length>0){   
        $("#wx_banner").html(template('otherBanner_page', d));
         $(".swiper-container").swiper({
                loop: true,
                autoplayDisableOnInteraction: false,
                autoplay: 5000
            });
        }else {
            // 没上传就显示默认的图片吧
            // $("#wx_banner").html("<img src='../../images/hybanner.jpg' />");
        }
    }, true);
}

function toLinkUrl(title, linkUrl) {
    if (isNull(linkUrl)) {
        return false;
    }
    setTimeout(function() {
        openPage(title, linkUrl, "1");
    }, 500);

    // 统计
    var url = requestPath + "/m/home/statistics/record.htm";
    var dataMap = {};
    dataMap.hsName = title;
    dataMap.hsUrl = linkUrl;
    dataMap.hsType = 1;
    dataMap.flag00 = 2;//类型,1.首页统计,2横幅统计
    $.ajaxjsonp(url, dataMap, function(data) {

    }, false);
}
