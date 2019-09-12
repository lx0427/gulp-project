$(function() {
    var url = window.location.href;
    scanRecord(45,0,"",url,"",'秒杀活动');
    //页面显示判断
    if("zh"==i18nLanguage){
		     $("#activity").show();
	         $("#prozh").show();
	         $("#proen").hide();
	}else{
		     $("#activity").hide();
		     $("#prozh").hide();
	         $("#proen").show();
	}

    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if(!isNull(wxOpenid)){
        $("#openid").val(wxOpenid);
        $("#zwt-img").css('display','none');
        queryData();
    }else if(!isNull($("#openid").val())){
    	wxOpenid = $("#openid").val();
        sessionStorage.setItem("wxOpenid", wxOpenid);
        $("#zwt-img").css('display','none');
        queryData();
    }else{
        getOauthOpenid("initOauth"); 
    }
});

function initOauth(){
    var wxOpenid = $("#openid").val();
    if(!isNull(wxOpenid)){
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
    queryData();
}


var interval;//开始倒计时, 结束倒计时

function queryData() {
    var url = requestPath + "/m/seckill/index.htm";
    var dataMap = {};

    var language = i18nLanguage;
    if (!isNull(language)) {
    	if (language == 'zh') {
    		dataMap.flag05 = 0;
    	}else if (language == 'en') {
    		dataMap.flag05 = 2;
    	}else if (language == 'ko') {
    		dataMap.flag05 = 1;
    	}
    	
    }

	dataMap.language=language;

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (!isNull(d.data)) {
            $("#meau_list").html(template('meau_list_page', d));
            $("#list").html(template('list_page', d));
            var len = 100/d.data.length;
            $(".ms_tab li").css("width", len+"%");
        }else{
            $("#meau_list").html('<img src="../../images/zwt.png" class="img">');
        }

        if (!isNull(d.sapBanner) && d.sapBanner.length > 0) {
            $("#wx_banner").html(template('sapBanner_page', d));
            $(".swiper-container").swiper({
                loop: true,
                autoplayDisableOnInteraction: false,
                autoplay: 5000
            });
        } else {
            // 没上传就显示默认的图片吧
            $("#wx_banner").html("<img src='../../images/hybanner.jpg' />");
            $("#ruleProduct").css("display","none");
        }

        clearInterval(interval);             
        interval = setInterval(countdown, 1000);


        execI18n();
    });
}

function onStatus(i) {
    $(".ms_tab_checked").removeClass("ms_tab_checked");
    $("#meauid_"+i).addClass("ms_tab_checked");

    $(".seckill_div").css("display","none");
    $("#mx_"+i).css("display","block");
}

function toResourceInfo(wzid, depid, salesType) {
    openPage("资源详情", "../customer/resourceInfo.html?wzid=" + wzid + "&depid=" + depid + "&salesType=" + salesType, "1");
}

function countdown() {
    $(".time").each(function(){
        var id = $(this).attr("id");
        var pkids = id.split("-");
        var time = $(this).val();
        time = time - 1000;
        $("#line_"+id).css("display","block");
        for(var i=0; i<pkids.length; i++){
            if(time < 0){   
               time = -time; 
               $(this).val(time);
               $("#time_"+id).text(getTimeStr(time));   
               $("#title_"+id).text("结束倒计时:");         
            }else if(time>0){
                $(this).val(time);
                $("#time_"+id).text(getTimeStr(time));
            }else{
                queryData();
            }
        }              
    });  
}


function doSeckill(activityId) { 
    var url = requestPath + "/m/seckill/join.htm";
    var dataMap = {};
    dataMap.pkid = activityId;

    confirmMsg("秒杀成功后直接生成订单，确定参加秒杀？", function() {
        $.ajaxjsonp(url, dataMap, function(data) {  
             showMessage("恭喜秒杀成功,正在生成订单!");
             createbill(activityId);              
        }, false, function() {
             // 刷新下
             queryData();          
        });
    });    
}

function createbill(activityId) {
    var url = requestPath + "/m/createOrder/createbillNoShopping.htm";
    var dataMap = getOrderDataMap();
    dataMap.activityId = activityId;

    dataMap.language=i18nLanguage;//语言
     
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        showOk("订单提交成功", function() {
            if (!isNull(d.isSalesman) && d.isSalesman === 1) {
                openPage("工作台", "../salesman/workbench.html", "1");
            } else {
                openPage("我的", "../public/orderSucceed.html?fcOrderFlag=0", "1");
            }
        });
    });
}


function getOrderDataMap() {
    var dataMap = {};
    var now = new Date();
    var nowStr = now.format("yyyy-MM-dd"); 
    dataMap.date10Str = nowStr;//要货日期 默认当天

    dataMap.remark = "秒杀订单";
    dataMap.wxOpenid = $("#openid").val();
    // 优惠信息
    dataMap.couponType = 6;//秒杀
   
    return dataMap;
}