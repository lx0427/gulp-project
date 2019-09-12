$(function() {
    var url = window.location.href;
    //scanRecord(21,0,'',url,'我的免息券');
   queryData();
});

var sapgg = null;

function queryData() {
    var url = requestPath + "/m/coupon/listFc.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if (pullRefresh) {
            $("#list").html(template('list_page', d));
        } else {
            $("#list").append(template('list_page', d));
        }
        if(d.data == ""){
		 
		  $("#yhqnull1").css('display','block');
		  $("#yhqnull2").css('display','block');
		}else{
		  $("#yhqnull1").css('display','none');
		  $("#yhqnull2").css('display','none');
		}
		if(d.isInvalid ==false){
		  $("#yhqnull0").css('display','none');
		}else{
		  $("#yhqnull0").css('display','block');
		}

		//顶部横幅
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
        }, true, function() {
		  $("#zwt-img").css('display','none');
     });
}

function getDataMap() {
    var dataMap = {};
     dataMap.status = 0;
    return dataMap;
}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");

    queryData();
}
function toInvalid() {
    openPage("失效的免息券", "../customer/invalidCouponList.html?fcFlag=1", "1");
}


template.helper("getDate", function(str, pattern) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
	return date.format(pattern);
});
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