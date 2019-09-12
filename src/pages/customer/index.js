$(function() {
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
    var wxOpenid = $("#openid").val();
    if(!isNull(wxOpenid)){
        sessionStorage.setItem("wxOpenid", wxOpenid);
		initOauth();
    }else if(!isNull(sessionStorage.getItem("wxOpenid"))){
    	$("#openid").val(sessionStorage.getItem("wxOpenid"));
    	initOauth();
    }else{
       if(isWeixinBrowse()){
		 	getOauthOpenid("initOauth");
		}else{
			initOauth();
		}
     } 
     queryPurchase();
     //显示红点
    queryRedPoint();
     //获取海报
    getposterimg();

    newMember();

//  newMember();

    //节日礼包弹窗
//  giftPop();
    
});
var pkid;
function giftPop(){
	if($('#newGift').css("display") == "none"){
		var url = requestPath + "/m/gift/giftPop.htm";
		var dataMap = {};
		$.ajaxjsonp(url, dataMap, function(data) {
			var d = eval(data);
	        console.info(d);
	        if(d.gift != null){
	        	$('#giftName').text(d.gift.giftName);
	        	$('#couponName').text(d.gift.couponName);
	        	pkid = d.gift.pkid;
	        	$('#gift').show();
	        }
		});
	}
}
var lotterUrl;
function newMember(){
	var url = requestPath + "/m/gift/newMember.htm";
	var dataMap = {};
	$.ajaxjsonp(url, dataMap, function(data) {
		var d = eval(data);
        console.info(d);
        if(d.gift != null){
        	$('#giftName1').text(d.gift.giftName);
        	lotterUrl = d.gift.retext;
        	$('#newGift').show();
        }
        
	});
}

function getlottery(){
	openPage("优惠券", lotterUrl, "1");
}
/**
 * 领取礼包
 */
function getGift(){
	var url = requestPath + "/m/gift/receive.htm";
	var dataMap = {};
	dataMap.pkid = pkid;
	$.ajaxjsonp(url, dataMap, function(data) {
		var d = eval(data);
        console.info(d);
        openPage("优惠券", "../customer/couponList.html", "1");
        
	});
}


function initOauth(){  
    queryData();
    var url = window.location.href;
    scanRecord(0,0,"",url,"",'首页');

    $(".rule_close").click(function() {
        $(".rule").hide();
    });
}


function showrule(remark) {
    $("#rulename").html($.i18n.prop('in_rulename'));
    $("#exDiscountRulesList").html(remark);
    $(".rule").show();
}

var isLogin = false; // 是否登录，false 未登录， true 已登录
function queryData() {
    var url = requestPath + "/m/resource/index.htm";
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
        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }
        if (!d.isLogin){
            $("#guessLike").text('猜你喜欢');
        }

        if (!isNull(d.pubmsg)) {
            /*$("#msgTitle").html(d.pubmsg.title);
            $("#msgTitle").click(function() {
                openPage("公告详情", "../notice/noticeDetail.html?pkid=" + d.pubmsg.pkid);
            });*/
            
            $("#msgTitle").html(template('msgTitle_page', d));
            //$(".hynotice").swiper({
            //    loop: true,
            //    autoplayDisableOnInteraction: false,
            //   autoplay: 5000
            //});
            
            $("#more").show();
        } else {
            $("#msgTitle").html("暂无公告");
            $("#more").hide();
        }
        if (!isNull(d.data)) {
            $("#focusList").html(template('focusList_page', d));
        }

        if (!isNull(d.activityList)) {
            $("#activityList").html(template('activityList_page', d));
        } 

        if (!isNull(d.seckillGroup)) {
            $("#seckillList").html(template('seckillList_page', d));
            seckillTime = d.seckillGroup.startMs;

            clearInterval(seckillInterval);             
            seckillInterval = setInterval(showSeckillTime, 1000);
        }else{
            seckillTime = null;
        }       
        if (!isNull(d.auctionList)) {
            $("#auctionList").html(template('auctionList_page', d));
            if(!isNull(d.auctionList.startTimeStr)){
                auctionTime = d.auctionList.startTimeStr;
            }else{
                auctionTime = d.auctionList.endTimeStr;
            }
            clearInterval(auctionInterval);             
                auctionInterval = setInterval(showAuctionTime, 1000);
        }else{
            auctionTime = null;
        }
        //活动4张图片
        $("#activityPhotos").html(template('activityPhotos_page', d));
        if((!isNull(d.activity5)) || (!isNull(d.activity6))){
        	console.log(d.activity5);
        	$("#activityPhotos1").html(template('activityPhotos_page1', d));
        }
        //特殊活动图片,差异化,专访,抽奖等
        $("#specialActivity").html(template('specialActivity_page', d));


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
        }
        if(!isNull(d.policyList) && d.policyList.length > 0){
            $("#marketingPolicy").html(template('policyList',d));
            $("#count").val(d.policyList.length);
            $("#marketingPolicy").show();
            $("#mark").show();
            $('#0').show();
        }else{
            $("#marketingPolicy").hide();
        }
        if(!isNull(d.questionId)){
            $("#questionId").val(d.questionId);
             $("#question").show();
        }
        
        //节日图片
        if(!isNull(d.festivalActivity)){
        	$("#festivalImg").attr("src", filePath+d.festivalActivity.imgUrl);
        	$("#festivalImg").show();
        }
        
        var backgroundcolor = $("#backgroundcolor").val();
        if(isNull(backgroundcolor)){
        	backgroundcolor = d.backgroundcolor;
        }
        //首页背景色后台如果有设置
        if(!isNull(backgroundcolor)){
	      	document.body.style.backgroundColor = backgroundcolor; 
	        $("#specialActivity").css("backgroundColor","'"+backgroundcolor+"'");
	        $(".wx_indtit h2").css("background-image","linear-gradient(to bottom,"+backgroundcolor+","+backgroundcolor+" 80%)");
	        $(".wx_hybtmnavmc li.current em, .wx_hybtmnavmc li.current i").css("color",backgroundcolor);
        }
        execI18n();
    });
}

function toResourceList(pm) {
    openPage("资源列表", "../customer/resourceList.html?pm=" + pm, "1");
}

function toSearchHistoryList() {
    openPage("搜索历史", "../customer/searchHistoryList.html", "1");
}

function noticeList() {
    openPage("公告列表", "../notice/noticeList.html", "1");
}

function diffList() {
    openPage("差异化产品首页", "../differentation/index.html", "1");
}

function toResourceInfo(wzid, depid, salesType) {
    openPage("资源详情", "../customer/resourceInfo.html?wzid=" + wzid + "&depid=" + depid + "&salesType=" + salesType, "1");
}
function toFavorites(){
    openPage("收藏夹", "../customer/favorites.html", "1");
}
/**
 * 限时抢购
 * @param activityId     -- 活动ID
 * @param activityName   -- 活动名称
 * @param activityMxId   -- 活动资源ID
 * @param wzid           -- wzid
 * @param depid          -- depid
 * @param salesType      -- salesType
 * @param surplus        -- 活动剩余量
 */
var flashSaleFlag = false;
var flashSaleSuccess = false;

function doFlashSale(activityId, activityName, activityMxId, wzid, depid, salesType,pm,cz,gg,cd) {
    var localurl = window.location.href;
    scanRecord(3,1,activityId,localurl,pm+"-"+cz+"-"+gg+"-"+cd+"-"+wzid);
    var surplus = $("#surplus_" + activityMxId).html();
    if (isNull(surplus) || parseFloat(surplus) == 0) {
        $("#flashSale_" + activityMxId).val("抢购结束");
        $("#flashSale_" + activityMxId).attr("onclick", "javascirpt:;");
        $("#flashSale_" + activityMxId).addClass("end");
        return false;
    }
    if (flashSaleFlag) {
        return false;
    }
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.orderType = "0";
    dataMap.activityId = activityId;
    dataMap.activityMxId = activityMxId;
    dataMap.couponType = "2";

    flashSaleFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        flashSaleSuccess = true;   
        scanShopping(d.data);//记录商品添加到购物车操作     
        // 购买成功，到购物车页面
        gotoShoppingCart(activityId, activityName, activityMxId, wzid, depid, salesType, surplus);
        
    }, false, function() {
        flashSaleFlag = false;
        // 失败了才进行刷新，成功不刷新，直接跳转到购物车页面
        if (!flashSaleSuccess) {            
            // 刷新下剩余量，从服务端获取
            refreshSurplus(activityMxId);
        }

    });
}

function refreshSurplus(pkid) {
    var url = requestPath + "/m/resource/getActivityMxSurplus.htm";
    var dataMap = {};
    dataMap.pkid = pkid;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#surplus_" + pkid).html(d.surplus);
        if (parseFloat(d.surplus) == 0) {
            $("#flashSale_" + pkid).val("抢购结束");
            $("#flashSale_" + pkid).attr("onclick", "javascirpt:;");
            $("#flashSale_" + pkid).addClass("end");
        }
    });
}

function gotoShoppingCart(activityId, activityName, activityMxId, wzid, depid, salesType, surplus) {
    var url = "";
    var params = "activityId=" + activityId + "&couponType=2&couponCode=" + activityMxId + "&couponName=" + activityName + "&wzid=" + wzid + "&depid=" + depid + "&salesType=" + salesType + "&surplus=" + surplus;
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        // 已经授权过了
        // url = "../public/shoppingCart.html";
        url = "../public/shoppingCart1.html";
    } else {
        // 还未授权
        if (isWeixinBrowse()) {
            url = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiShoppingCart";
        } else {
            url = "../public/shoppingCart1.html";
            // url = "../public/shoppingCart.html";
        }
    }
    if (!isNull(params)) {
        if (url.indexOf("?") != -1) {
            url += "&" + params;
        } else {
            url += "?" + params;
        }
    }
    openPage("购物车", url, "1");
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
    dataMap.flag00 = 1;//类型,1.首页统计,2横幅统计
    $.ajaxjsonp(url, dataMap, function(data) {

    }, false);
}

// 限时竞拍
function auctionList(type){ 
    if (!isNull(type)&&type==2) {
        openPage("限时竞拍", "../customer/auctionThird.html", "1");
    }else{
     openPage("限时竞拍", "../customer/auction1.html", "1");
    }
}

//优惠拼团
function groupBuyList(){
     openPage("优惠拼团", "../customer/groupPurchase.html", "1");
}

// 物资外卖
function takeOutList(){    
     openPage("物资外卖", "../purchasing/takeoutList.html", "1");
}
// 燃辅料外卖
function excipientList(){    
     openPage("燃辅料外卖", "../purchasing/excipientList.html", "1");
}

//跳转至公告详情
function toNoticeInfo(pkid) {
	if (!isLogin) {
        toLogin();
        return false;
    }

	openPage("公告详情", "../notice/noticeDetail.html?pkid=" + pkid);
}

function getRedPacket(){
    showMessage("新活动上线中，敬起期待");
}

function showSm(){
    // $("#erwm").show();
    // $("#kefu").hide();
    openPage('客服中心','../customer/smallYi.html?category=3','1');
}

function colseEem(){
     $("#erwm").hide();
}
function toLogin() {    
    eval(loginName);
}

function queryRedPoint(){
	 var url = requestPath + "/m/login/isRedPoint.htm";
	    var dataMap = {};
	    $.ajaxjsonp(url, dataMap, function(data) {
	    	if(data.count > 0){
	            $('#mypoint').show();
	        }else{
	            $('#mypoint').hide();
	        }
			if(data.amount > 0){
				$('#shopAmount').html(data.amount);
	            $('#shopAmount').show();             
	        }else{
	            $('#shopAmount').hide();
	        }
	    });
}

function doCancelPolicy(policy){
    $('#'+policy).hide();
    policy++;
    var count = $("#count").val();
    if(policy>=count){
         $("#mark").hide();
    }else{
        $('#'+policy).show();
    }
    
}
function getposterimg(){
    var url = requestPath + "/m/poster/getPoster.htm";
	 var dataMap = {};
	 $.ajaxjsonp(url, dataMap, function(data) {
        var d=eval(data);
        if(d.list==null){
            return;
        }
        $("#doposter").html(template('postertemp', d));
     })
}
var flag=0;
function doPosterClick(urls,type,couponid,title,pkid){
    if(flag==1){
        return;
    }
    flag=1;
    if(type=="0"){
        // 统计
        var url = requestPath + "/m/home/statistics/record.htm";
        var dataMap = {};
        dataMap.hsName = title;
        dataMap.hsUrl = pkid+"-"+urls;
        dataMap.hsType = 1;
        $.ajaxjsonp(url, dataMap, function(data) {
        }, false);
        var a= urls.substring(0,4);
        if(a!="http"){
         urls="http://"+urls; 
        }
        openPage("",urls,"1");

    }else{
        var url = requestPath + "/m/poster/getCoupon.htm";
        var dataMap = {};
        dataMap.couponPkid=couponid;
        dataMap.posterid = pkid;
        $.ajaxjsonp(url, dataMap, function(data) {
            flag=0;
            var d=eval(data);
            showOk(d.msg);
        }, false, function() {
            flag=0;
        });
    
    }
}

function queryPurchase(){
	var url = requestPath + "/m/purchase/indexList.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	console.log(d);
    	var hasData = 0;
    	if(d.list != null){
    		hasData = 1;
	    	$("#purchase").append(template('purchaseList', d));
    	}
    	if(hasData == 1){
    		time = d.time;
    		clearInterval(interval); 
    		purchaseStarted = d.started;
        	interval = setInterval(updateTime, 1000);
        	if(d.started == 0){
        		$('.ms_djs span').css('left', '43%');
        		$('.ms_djs span').html('限时购(即将开始):<em id="hour">00</em>:<em id="min">00</em>:<em id="sec">00</em>');
        	}else{
        		$('.ms_djs span').css('left', '50%');
        		$('.ms_djs span').html('限时购:<em id="hour">00</em>:<em id="min">00</em>:<em id="sec">00</em>');
        	}
        	$('.purchase').show();
    	}
    });
}
var time;
var interval;
var purchaseStarted;
function updateTime(){
	time -= 1000;
	if(time < 0){
		location.reload();
		return;
	}
	var t = new Date();
	t.setTime(time);
	var hours = (t.getDate() - 1) * 24 + t.getHours() - 8;
	var minutes = t.getMinutes();
	var seconds = t.getSeconds();
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	if(hours > 99){
		hours = 99;
		minutes = 60;
		seconds = 60;
	}
	$('#hour').text(hours);
	$('#min').text(minutes);
	$('#sec').text(seconds);
	
}

var seckillTime;
var seckillInterval;
function showSeckillTime(){
    if(seckillTime==null){
        $("#seckillList").css("display","none");
        return;
    }
    if(seckillTime < 0){
        seckillTime = -seckillTime;
    }
    if(seckillTime==0){
        queryData();
    }
    seckillTime -= 1000;
    var t = new Date();
    t.setTime(seckillTime);
    var hours = (t.getDate() - 1) * 24 + t.getHours() - 8;
    var minutes = t.getMinutes();
    var seconds = t.getSeconds();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(hours > 99){
        hours = 99;
        minutes = 60;
        seconds = 60;
    }
    $('#shour').text(hours);
    $('#smin').text(minutes);
    $('#ssec').text(seconds);
    
}

function toPurchase(){
	openPage("限时购", "../customer/purchase.html");
}

function toSeckillList(){
    openPage("秒杀", "../customer/seckillActivity.html");
}


function purchase(pkid, wzid, depid, salesType, gpls, purid){
	if(time < 1000){
		showMessage("抢购已结束");
		return;
	}
	var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.gpls = gpls;
    dataMap.orderType = "0";
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
	dataMap.language=i18nLanguage;
	dataMap.activityId=purid;
	dataMap.activityMxId=pkid;
	dataMap.str05 = "限时购";
	dataMap.str06 = pkid;
	dataMap.flag11=0;
	dataMap.couponType = "10";
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	console.log(d);
        scanShopping(d.data);//记录商品添加到购物车操作
    	gotoShoppingCar("10");
    });
}
 
function gotoShoppingCar(couponType) {
    var url = "";
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        // 已经授权过了
        // url = "../public/shoppingCart.html";
        url = "../public/shoppingCart1.html";
    } else {
        // 还未授权
        if (isWeixinBrowse()) {
            url = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiShoppingCart";
        } else {
            // url = "../public/shoppingCart.html";
            url = "../public/shoppingCart1.html";
        }
    }
    if (!isNull(couponType)) {
        if (url.indexOf("?") != -1) {
            url += "&couponType=" + couponType;
        } else {
            url += "?couponType=" + couponType+"";
        }
    }
	var d = Math.random();
	 if (url.indexOf("?") != -1) {
            url += "&d=" + d;
        } else {
            url += "?d=" + d;
        }
    openPage("购物车", url, "1");
}

function doSeckill(activityId) {
    if (!isLogin) {
        toLogin();
        return false;
    } 
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


var auctionTime;
var auctionInterval;
function showAuctionTime(){
    if(auctionTime==null){
        $("#auctionList").css("display","none");
        return;
    }
    if(auctionTime < 0){
        auctionTime = -auctionTime;
    }
    if(auctionTime<=0){
        queryData();
    }
    auctionTime -= 1000;
    var t = new Date();
    t.setTime(auctionTime);
    var hours = (t.getDate() - 1) * 24 + t.getHours() - 8;
    var minutes = t.getMinutes();
    var seconds = t.getSeconds();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(hours > 99){
        hours = 99;
        minutes = 60;
        seconds = 60;
    }
    $('#ahour').text(hours);
    $('#amin').text(minutes);
    $('#asec').text(seconds);
    
}

function goQuestion(){
    var questionId = $("#questionId").val();
    if(!isNull(questionId)){
        openPage("问卷调查", "../customer/startQuestion.html?queId="+questionId, "1");
    }else{
        showMessage("当前问卷已失效!");
        $("#question").hide();
    }
}
function closeQuestion(){
    $("#question").hide();
}