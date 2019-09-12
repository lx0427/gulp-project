$(function() {
   if("en"==i18nLanguage||"ko"==i18nLanguage){
    $("#yuanfh").html("$");
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
    var url = window.location.href;
    scanRecord(10,0,'',url,'','购物车页面');  
    queryRedPoint();
    
});

function initOauth(){
    var wxOpenid = $("#openid").val();
    if(!isNull(wxOpenid)){
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
    queryData();
}

var creditFlag = 0;//会员是否具有可用的融资信用额度
var fcOrderFlag = 0; //是否选择融资
var creditLoans;//逸信代信息

var eloanCredit = 0;//逸白条信用额度
var residueAmt = 0 // 剩余保证金

var shopd=null;//购物车数据
function queryData() {
    var url = requestPath + "/m/shopping/list.htm";
    var dataMap = {};
    var customerId = $("#customerId").val();
    var checkedData = sessionStorage.getItem("shoppingCartData");
    
    if (!isNull(customerId)) {
        dataMap.customerId = customerId;
        $(".wx_hybtmnav").hide();
        // $(".wx_main").css("bottom", "93px");
        $(".wx_btnjs").css("bottom", "0");
    }

	dataMap.language=i18nLanguage;//语言
    dataMap.checkedData = checkedData;
	
    // 优惠类型：0 or null 无优惠，1 优惠券，2 限时抢购, 3 限时竞拍
    var couponType = $("#couponType").val();

    if (!isNull(couponType)) {
        dataMap.couponType = couponType;
        if(couponType == "2" || couponType == "3"){
            dataMap.wzid = $("#wzid").val();
            dataMap.depid = $("#depid").val();
            dataMap.salesType = $("#salesType").val();

			 var flag01 = $("#flag01").val();
			 if (!isNull(flag01)) {
			   dataMap.activityId = $("#activityId").val();
			   dataMap.flag01 = flag01;
			 }
        }
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (!isNull(d.sapContractTypeList) && d.sapContractTypeList.length > 0) {
            bindContractType(d.sapContractTypeList);
        }

        if(d.creditLoans){
            residueAmt = d.creditLoans.totalBrate - d.creditLoans.usedBrate
        }

         d.language=i18nLanguage;
         if("en"==i18nLanguage||"ko"==i18nLanguage){
			 
			d.creditFlag=1;
		 }
		
        // 是否有融资
        if(d.creditFlag==1){
		
            // 借款日期是当天，期限90天，
            var now = new Date();
            var jkqx = d.creditList[0].flag2;
            if(isNull(jkqx) || parseInt(jkqx) == 0){
                jkqx = "90";       
            }
            d.jkqx = jkqx;
            d.jkrq = now.format("yyyy-MM-dd");
            now.setDate(now.getDate() + parseInt(d.jkqx));
            d.hkrq = now.format("yyyy-MM-dd");
            if (!isNull(d.data) && d.data.length > 0) {
                $("#toEnd").css("display","block");
            }
            creditFlag = 1;
        }

		 if(!isNull(d.XfcreditFlag) && d.XfcreditFlag==1){
			 // 借款日期是当天，期限90天，
            var now = new Date();
            var jkqx = d.XfCredit.flag2;
            if(isNull(jkqx) || parseInt(jkqx) == 0){
                jkqx = "90";       
            }
            d.jkqx = jkqx;
            d.jkrq = now.format("yyyy-MM-dd");
            now.setDate(now.getDate() + parseInt(d.jkqx));
            d.hkrq = now.format("yyyy-MM-dd");
		    if (!isNull(d.data) && d.data.length > 0) {
                //$("#toEnd").css("display","block");
            }
			
            creditFlag = 1;
        }



         if (!isNull(d.data) && d.data.length > 0) {
			 shopd=d;
            $(".wx_btnjs").show();
            
            if(isNull(d.data[0].price00)){
            	appointmentFlag = 1;
            }
        } else {
            $(".wx_btnjs").hide();
            $(".totalpri").hide();
			$("#toEnd").css("display","none");
			
        }

	    var customerId = $("#customerId").val();
        if (!isNull(customerId)) {
        	d.customerId = customerId;
        }else{
			d.customerId = "";
		}
        var shoppingCartData = sessionStorage.getItem("shoppingCartData");
        if(!isNull(shoppingCartData) && shoppingCartData!=''){
            d.shoppingCartData = JSON.parse(shoppingCartData);
        }else{
            window.history.go(-1);
        }

        if(d!=null && d.data!=null && d.data.length>0 && shoppingCartData!=null && shoppingCartData.length>0){
            $("#balance").attr('onclick','showConfirm()');
            $("#balance").css('background','#3e7baf');
        }else{
            // $("#balance").css('background','#999');
            $("#balance").html('返回上一页');
            $("#balance").attr('onclick','javascript:history.back(-1);');
        }
        $(".wx_cart").html(template('main_page', d));
        $(".wx_orderinfo").html(template('orderinfo_page', d));
        $(".wx_quan").html(template('wx_quan_page', d));
        $(".wx_rzinfo").html(template('wx_rzinfo_page', d));
        
        //计算信代天数
        if (!isNull(d.creditLoans)) {  
            var days = d.creditLoans.loansDays;
            creditLoans = d.creditLoans;
            //逸信贷
            $(".wx_loansinfo").html(template('wx_loansinfo_page', d));
        }
        
        //逸白条
        if (!isNull(d.eloanCredit)) {  
            eloanCredit = d.eloanCredit;
            //逸白条
            $(".wx_eloaninfo").html(template('wx_eloaninfo_page', d));
        }
        
        var shoppingCartRzFlag = sessionStorage.getItem('shoppingCartRzFlag');
        if(shoppingCartRzFlag!=null && shoppingCartRzFlag==1){

            if(!isNull(eloanCredit) && eloanCredit>0){
            	$("#rzFlag").attr('data-values',7);
                $("#couponType").val(7);
                $("#rzFlag").val('逸白条');
                $(".eloan").show();
            }

            if(!isNull(d.creditList) && d.creditList.length > 0){
                $("#rzFlag").attr('data-values',5);
                $("#couponType").val(5);
                $("#rzFlag").val('逸控代');
                $(".eloan").hide();
                $(".rz").show();
                $("#rzEnd").show();
                $("#shopCarFcCouponList").show();
            }
            
            if (!isNull(creditLoans)) {
            	$(".eloan").hide();
                $(".rz").hide();
                $(".loans").show();
                $("#rzFlag").attr('data-values',13);
                $("#couponType").val(13);
                $("#rzFlag").val('逸信代');
                $("#showMx").show();
            }
                $("#shopCarCouponList").hide();
                // scrollToEnd();
                // $("#couponType").val("");
                $("#couponCode").val("");
                $("#couponName").val("");
                $("#couponAmt").val("");
                $("#ruleId").val("");
                $("#couponLimitMinAmt").val("");
                $("#couponText").val("请选择优惠券");
                $("#couponAmtHtml").html("");
        }else{
        	$(".wx_rzlist").hide();
            $("#rzFlag").attr('data-values',0);
            $("#rzFlag").val('无融资');
        }

        // 计算合计数
        totalSl2();
        totalAmt();
        
        if (!isNull(d.creditList) && d.creditList.length > 1) {
            bindCredit(d.creditList);
        }
		if (!isNull(d.portList) && d.portList.length > 1) {
            portCredit(d.portList);
        }
		if (!isNull(d.portList) && d.portList.length == 1) {
           portMap[d.portList[0].pkid] = d.portList[0];
        }
		
		if (!isNull(d.paymentTermsList) && d.paymentTermsList.length > 1) {
            paymentTermsCredit(d.paymentTermsList);
        }
		if("en"==i18nLanguage||"ko"==i18nLanguage){
        // 贸易条件
        $("#myFlag em").bind("click", function() {
            $("#myFlag em").removeClass("current");
            $(this).addClass("current");
			if($(this).attr("value") == "CIF"){
               freightflag=true;
            }
			if($(this).attr("value") == "FOB"){
               freightflag=false;
            }
			changePortShop();
        })

        }
        
        // 融资类型下拉选择显示
        var jsons = new Array();
        jsons.push({title:"无融资",value:"0"});
        
        if((!isNull(d.creditFlag)&&d.creditFlag==1) || isNull(d.XfcreditFlag)){
        	jsons.push({title:"逸控代",value:"5"});
        }
        
        if((!isNull(d.creditLoans))){
            jsons.push({title:"逸信代",value:"13"});
        }
        
        if(!isNull(d.eloanCredit) && d.eloanCredit>0){
            jsons.push({title:"逸白条",value:"7"});
        }

	    $("#rzFlag").select({
	        title: "选择融资类型",
	        items: jsons,
	        onChange: function(d) {
	            var couType = d.values;
            	if(couType == 0){
                    $("#rzEnd").hide();
                    $("#shopCarCouponList").show();
                    $(".wx_rzlist").hide();
                    $("#shopCarFcCouponList").hide();
                    $("#couponType").val("");
               }else if(couType==13){//逸信代
                    $(".rz").hide();
                    $("#shopCarCouponList").hide();
                    $(".wx_rzlist").hide();
                    $(".loans").show();
                    $("#shopCarFcCouponList").hide();           
	            }else if(couType==5){//逸控代
	            	$(".wx_rzlist").hide();
	            	$(".rz").show();
                    $("#rzEnd").show();
                    $("#shopCarCouponList").hide();
                    $("#shopCarFcCouponList").show();
	            }else if(couType==7){//逸白条
	            	$(".wx_rzlist").hide();
	            	$(".eloan").show();
	            	$("#rzEnd").hide();
	            }
	            $("#couponType").val(couType);
                $("#couponCode").val("");
                $("#couponName").val("");
                $("#couponAmt").val("");
                $("#ruleId").val("");
                $("#couponLimitMinAmt").val("");
                $("#couponText").val("请选择优惠券");
                $("#couponAmtHtml").html("");
                $("#showMx").hide();
	            scrollToEnd();
                totalAmt();
	        },
	        onClear: function() {
                $("#rzEnd").hide();
                $(".wx_rzlist").hide();
                $("#shopCarCouponList").show();
                $("#shopCarFcCouponList").hide();
                $("#couponType").val("");
                $("#couponCode").val("");
                $("#couponName").val("");
                $("#couponAmt").val("");
                $("#ruleId").val("");
                $("#couponLimitMinAmt").val("");
                $("#couponText").val("请选择优惠券");
                $("#couponAmtHtml").html("");
	            
	        }
	    });

        // 是否有优惠券
        if(d.couponFlag){
            setTimeout(function(){
                getCanUseCouponList();
            },10);
        }

		 // 是否有优惠券
        if(d.fccouponFlag){
			
            setTimeout(function(){
                getCanUseFcCouponList();
            },10);
        }
        
        //是否有纤币抵用
        if(!isNull(d.scoreAmt)){
        	$("#useScore div").bind("click", function(){
        		if($(this).hasClass("on")){
        			$(this).removeClass("on");
        			$("#couponType").val(0);
				    $("#couponAmtHtml").html("(优惠0元)");
        			
        		}else{
        			$(this).addClass("on");
        			$("#couponType").val(8);
        			$("#couponCode").val("");
				    $("#couponName").val("");
				    $("#ruleId").val("");
				    $("#couponLimitMinAmt").val("");
				    $("#couponText").val("");
				    $("#couponAmt").val(d.scoreAmt);
				    $("#couponAmtHtml").html("(优惠"+d.scoreAmt+"元)");
        		}
        	});
        	
        	/*setTimeout(function(){
                getCanUseScoreAmt();
            },10);*/
        }


        // 如果是竞拍，量不能修改
        if(!isNull(couponType) && couponType == "3"){
            // 直接选中吧
            $(".wx_cart .current").each(function() {    
                var id = $(this).attr("id");    
                // 箱包数，重量不能修改
                $("#sl01_"+id).attr("readonly", true);   
                $("#sl02_"+id).attr("readonly", true);  
            });
             // 计算合计数
            totalSl2();
            totalAmt();
        }

        // 箱包净重
        $(".xbselect .xbjz").bind("click", function(){
            var id = $(this).parent().attr("id");
            $("#"+id+" em").removeClass("curr");
            $(this).addClass("curr");
            changeSl1(id.substring(8));
            //updateShopping();
        });

		// 箱包净重
        $(".packselect .xbjz").bind("click", function(){
            var id = $(this).parent().attr("id");
            $("#"+id+" em").removeClass("curr");
            $(this).addClass("curr");
            changeSl3(id.substring(8));
            //updateShopping();
        });

		// 箱包净重
        $(".compselect .xbjz").bind("click", function(){
            var id = $(this).parent().attr("id");
            $("#"+id+" em").removeClass("curr");
            $(this).addClass("curr");
            changeSl3(id.substring(8));
            //updateShopping();
        });
        
		 // 今天的日期
        var now = new Date();
        var nowStr = now.format("yyyy-MM-dd");   
		if("zh"==i18nLanguage){
             
        
        //昨天的时间
        var yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
        $("#date10Str").val(nowStr);
        // 要货日期默认当天
        var defaultVal = [];
        defaultVal.push(nowStr);

        // 要货日期
        $("#date10Str").calendar({
            toolbarCloseText: "",
            value: defaultVal,
            minDate: yesterday
        });
        
        // 交货方式
        $("#htflag06 em").bind("click", function() {
            $("#htflag06 em").removeClass("current");
            $(this).addClass("current");
        })
        }else{



		//4周以后的时间
        var yesterday = new Date();
        yesterday.setTime(yesterday.getTime() + 24 * 60 * 60 * 1000 * 7 * 4);
        $("#date10Str").val(yesterday.format("yyyy-MM-dd"));


		// 要货日期默认当天
        var defaultVal = [];
        defaultVal.push(yesterday.format("yyyy-MM-dd"));

        // 要货日期
        $("#date10Str").calendar({
            toolbarCloseText: "",
            value: defaultVal,
            minDate: yesterday
        });
		 
		}

        
		execI18n();
		
				
		var cleckLis = $(".checkicon");
		var liBlock = true;
        var qpBlock = true;//判断物资是否都为锦纶切片
		for (var i=0;i<cleckLis.length;i++) {
			var liId = $(cleckLis[i]).attr("id");
			var liPm = $("#pm_" + liId).val();
			if (liPm != '短纤' && liPm != '锦纶切片') {
				liBlock = false;
                qpBlock = false;
				break;
			}else if (liPm != '短纤') {
                liBlock = false;
            }else if (liPm != '锦纶切片') {
                qpBlock = false;
            }
		}
		if (liBlock  && cleckLis.length != 0) {
			if (!isNull($("#customerId").val())) { //代客下单，会有url?customerId=xxx形式过来，只有 代客下单才展示工厂等
				$("#dxLump").css("display","block");	
				$("#dx").css("display","block");
				$("#jlqp").css("display","none");
			}
		} else if(qpBlock  && cleckLis.length != 0) {
			if (!isNull($("#customerId").val())) { //代客下单，会有url?customerId=xxx形式过来，只有 代客下单才展示工厂等
                $("#dxLump").css("display","block"); 
				$("#dx").css("display","none");
				$("#jlqp").css("display","block");
            }
		}else{
            $("#dxLump").css("display","none");
            $("#dx").css("display","none");
			$("#jlqp").css("display","none"); 
        }
		
		//客户特殊标识
        if(!isNull(d.tabList) && d.tabList.length>0){
        	var array = [];
			for(var i = 0; i< d.tabList.length; i++){
				array[array.length] = d.tabList[i].tab;
			}
			console.info(array);
        	$("#menberTab").select({
		        title: "选择特殊标识",
		        items: array,
		        onChange: function(d) {
	                console.log(d);
		            var tab = d.values;
	                $("#menberTab").val(tab);
			    },
		        onClear: function() {
	                $("#menberTab").val("");
		        }
			});
        }
    });
}

var contractTypeJsons = [];
function bindContractType(list) {
    if (isNull(list) || list.length == 0) {
        return;
    }
    var jsons = [];
    for (var i = 0; i < list.length; i++) {
        var json = {};
        json.title = list[i].contractTypeName;
        json.value = list[i].contractId;
        jsons[i] = json;
    }

    contractTypeJsons = jsons;

}
var creditMap = {};
function bindCredit(creditList) {
    var array = [];
    for(var i = 0; i< creditList.length; i++){
        creditMap[creditList[i].shopno] = creditList[i];
        var json = {};
        json.title = creditList[i].shopname;
        json.value = creditList[i].shopno;
        array[array.length] = json;
    }
    // 融资机构  
    $("#shopname").select({
        title: "请选择融资机构",
        items: array,           
        onChange: function(d) {
            $("#shopno").val(d.values);
        },
        onClose: function() {
            changeShop();
        },
        onClear: function() {
            $("#shopno").val("");
        }        
    }); 
}

function subS(){
   $("#contractTypeIdText").select({
        title: "请选择合同",
        items: contractTypeJsons,
        onChange: function(d) {
           $("#contractTypeId").val(d.values);           
        },       
        onClear: function() {           
            $("#contractTypeId").val("");
        }
    });
}

function changeShop(){
    var shopno = $("#shopno").val();
    if(isNull(shopno)){
        $("#freeamt").val("0");
        $("#freeamtTxt").text("0");
        $("#dqrq").text("");
        $("#tcmxList").html("");
        return false;
    }
    var credit = creditMap[shopno];
    $("#freeamt").val(credit.freeamt);
    $("#freeamtTxt").text(credit.freeamt);
    $("#dqrq").text(formatDate(credit.endDate,"yyyy-MM-dd"));
    
    var jkqx = credit.flag2;
    if(isNull(jkqx) || parseInt(jkqx) == 0){
        jkqx = "90";
    }
    $("#jkqx").text(jkqx);
    var now = new Date();     
    now.setDate(now.getDate() + parseInt(jkqx));
    $("#hkrq").text(now.format("yyyy-MM-dd"));

    $("#brate").text(credit.brate+"%");
    $("#tcmxList").html(template('tcmxList_page', credit)); 
}

/**
* 判断是否只有1个订单
*/
function checkOnlyOrder(){
    var b = true;
    var oldCfxx = "";
    $(".wx_cart .current").each(function() {       
        var id = $(this).attr("id");
        var cfxx = $("#cfxx_" + id).val();
        if(isNull(oldCfxx)){
            oldCfxx = cfxx;
        }else{
            if(oldCfxx !== cfxx){
                b = false;
                return false;
            }
        }
    });
    return b;
}

/**
 *判断时候有短纤或者锦纶切片类产品
 **/
function supportFlat(){
    var b = false;
    $(".wx_cart .current").each(function() {       
        var id = $(this).attr("id");
        var pm = $("#pm_" + id).val();
        
        if(!isNull(pm) && (pm=="短纤" || pm=="锦纶切片")){
           b=true;
           return true;
        }
    });
    return b;
}

function totalSl2() {
    var totalSl1 = 0;
    var totalSl2 = 0;
    $(".wx_cart .current").each(function() {
        var pkid = $(this).attr("id");
        var sl01 = $("#sl01_" + pkid).val(); 
        var sl02 = $("#sl02_" + pkid).val();
        if (!isNull(sl01)) {
            totalSl1 = accAdd(totalSl1, sl01);
        }
        if (!isNull(sl02)) {
            totalSl2 = accAdd(totalSl2, sl02);
        }
    });
    $("#totalSl1").val(totalSl1);
    $("#totalSl2").html(totalSl2);
}

var appointment = 0;//预约订单

function totalAmt() {
    var totalAmt = 0;
	
	var loansOrderFlag = false;//是否是逸信代订单
	var allRate = 0;//利息
	var brateAmt = 0;//保证金
	var brateFeeAmt = 0; //保费金额
	var dayRate = 0;//利率*天数
	var brateRate = 0;//保证金比例
	var brateReturn = 0 //保证金类型 0:无保证金 1:收取 2:退还
	var brateFeeRate = 0; //保费费率
	
	if(!isNull(creditLoans)&&!isNull(creditLoans.rate)&&$("#rzFlag").attr('data-values')==13){
		loansOrderFlag = true;
		dayRate = creditLoans.loansDays*creditLoans.rate*0.0001;
		brateReturn = creditLoans.brateReturn;
		if(brateReturn==1){ //收取
			brateRate = creditLoans.brateRate * 0.01; 
		}else if(brateReturn==2){//退还
			brateRate = creditLoans.brateRate * (-0.01); 
		}
		brateFeeRate = creditLoans.brateFeeRate;
		brateFeeRate=brateFeeRate*0.01;
	}

    $(".wx_cart .current").each(function() {
        var pkid = $(this).attr("id");

        var sl02 = $("#sl02_" + pkid).val();
        var price = $("#price_" + pkid).html();
        
        if(isNull(price)||price==''||price==undefined){
            $("#currentprice_" + pkid).html(0);
            price = 0;
            appointment = 1; //单价为空,默认是预约订单
            
        }

		var mxGoodsAmt = parseFloat(sl02) * parseFloat(price);
        if (!isNull(sl02)) {
            totalAmt = accAdd(totalAmt, mxGoodsAmt);
        }
        
        if(loansOrderFlag){
        	//计算利息 (订单金额*利率*天数（天数为下单当天到结束时间的天数，包括下单当天）)
        	var mxRate = parseFloat(dayRate)*parseFloat(mxGoodsAmt);
        	allRate = accAdd(allRate, parseFloat(mxRate).toFixed(2));
        	console.info("利息:"+allRate);
        	
        	//计算保证金金额 (保证金=订单金额*保证金比例)
			
			var mxBrateAmt = parseFloat(mxGoodsAmt) * parseFloat(brateRate);
            brateAmt = accAdd(brateAmt,parseFloat(mxBrateAmt).toFixed(2));
            // 计算保证金与保证金余额取较小值
            brateAmt = brateAmt<residueAmt?brateAmt:residueAmt
			console.info("保证金:"+brateAmt);
			
			//计算保险费金额 (保费=（订单金额+利息+保证金）*保费费率)
			var mxBrateFeeAmt = accAdd(mxGoodsAmt, mxRate);
			mxBrateFeeAmt = accAdd(mxBrateFeeAmt, mxBrateAmt);
			mxBrateFeeAmt = brateFeeRate*parseFloat(mxBrateFeeAmt);
			brateFeeAmt = accAdd(brateFeeAmt, parseFloat(mxBrateFeeAmt).toFixed(2));
			console.info("保费:"+brateFeeAmt);
        }
        
    });
    
	if(loansOrderFlag){   	
		$("#goodsAmt").html(parseFloat(totalAmt).toFixed(2));
		allRate = accAdd(brateFeeAmt, allRate);
		$("#rateAmt").html(allRate);
		if(creditLoans.brateReturn==0){
			$("#brateAmtP").hide();
		}else{
			$("#brateAmtP").show();
			$("#brateAmt").html(brateAmt);
		}
		
	}
	
	
	//总金额 = 总利息 + 保费 + 保证金 + 货物总金额
	totalAmt = accAdd(totalAmt, allRate);
	totalAmt = accAdd(totalAmt, brateAmt);
	
	if(appointment==1){
		$("#totalAmt").html("未知");
		$("#yuan").hide();
		$("#balance").html("预约下单");
		$("#message").html("我已确认此预约订单信息无误,确定提交预约单?");
	}else{
		$("#totalAmt").html(parseFloat(totalAmt).toFixed(2));
		$("#yuan").show();
		$("#balance").html("提交订单");
		$("#message").html("我已确认此订单信息确认无误，确定提交订单？");
	}   
	
    var rzFlag = $("#rzFlag").attr("data-values");
	var rzly = $("#rzly .current").attr("val");
	if(!isNull(rzFlag) && rzFlag == "5"&& rzly == "2"){
	    $("#dkAmt").html(outputmoney(totalAmt));
		var fwf=parseFloat(totalAmt) * parseFloat(0.09);
		    fwf=fwf/360;
	    $("#xffwf").html(outputmoney(fwf));
    }
    var couponType = $("#couponType").val();
    if(!isNull(couponType)){
        if(couponType == "1"){
            // 判断下金额是否小于优惠最低金额，是的话清空优惠信息
            var couponLimitMinAmt = $("#couponLimitMinAmt").val();
            if(!isNull(couponLimitMinAmt) && parseFloat(couponLimitMinAmt) > 0){
               var ruleId = $("#ruleId").val();
               if(!isNull(ruleId)){
                if(isNull(couponProductList) || couponProductList.length==0){
                    if(parseFloat(totalAmt) < parseFloat(couponLimitMinAmt)){
                    clearCoupon();
                    }
                }else{
                    var amt = 0;
                     for(var i =0;i<couponProductList.length;i++){
                        if(couponProductList[i].indexOf(ruleId+':')!=-1){
                            $(".wx_cart .current").each(function() {
                                var pkid = $(this).attr("id");
                                var gpls = $("#gpls_" + pkid).val();
                                if (couponProductList[i].indexOf(gpls)!=-1) {
                                   var sl02 = $("#sl02_" + pkid).val();
                                   var price = $("#price_" + pkid).html();
                                   if (!isNull(sl02)) {
                                      amt = accAdd(amt,parseFloat(sl02) * parseFloat(price));
                                   } 
                                }
                            });
                        }
                     }  
                    if(parseFloat(amt) < parseFloat(couponLimitMinAmt)){
                        clearCoupon();
                    } 
                }
                }else{
                    if(parseFloat(totalAmt) < parseFloat(couponLimitMinAmt)){
                    clearCoupon();
                    }
                }
            }    
        }else if(couponType == "2"){
            getActivityCouponAmt();  
        }
    }   

}

// 修改重量
function changeSl2(pkid) {
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        updateShopping();
        $("#" + pkid).addClass("current");
    }
    // 判断下值
    if (!checkNumber("sl02_" + pkid, 3, "重量")) {
        return false;
    }
    // 统计总重量
    totalSl2();
    totalAmt();    
    //updateShopping();
}

// 修改数量
function changeSl1(pkid) {
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        updateShopping();
        $("#" + pkid).addClass("current");            
    }

    //双兔cd=AA的产品加入限定条件
    //var cd = $("#cd_"+pkid).val();
    //var depid = $("#depid_"+pkid).val();

    // 根据数量计算出重量
    var sl01 = $("#sl01_"+pkid).val();
    if(sl01.length > 0){
        if (!checkNumber("sl01_" + pkid, 0, "箱包数")) {
            return false;
        }
        var dz = $("#packstr_" + pkid).val();
        if (isNull(dz)) {
            // 切片，锦纶切片
            dz = $("#packstr_" + pkid + " .curr").attr("val");
        }
        //if (cd=="AA" && parseFloat(sl01)>100 && depid=="9700") {//测试AA产品
        //    sl01=100;
        //    $("#sl01_"+pkid).val("100");
        //    $("#sl01_"+pkid).blur();
        //    showMessage("该产品每单最多可下100包");
        //}

        if (!isNull(dz)) {
            var sl02 = accMul(sl01, dz);
            $("#sl02_" + pkid).val(sl02);
        }        
    }  
        
    // 统计总重量
    totalSl2();
    totalAmt();
    //updateShopping();

    var couponType = $("#couponType").val();
    if(!isNull(couponType) && couponType == "2"){
        // 活动剩余量
        var surplus = $("#surplus").val();
        if(isNull(surplus)){
            showMessage("活动剩余量不足");
            return false;
        }
        if(parseFloat(sl01) > parseFloat(surplus)){
            showMessage("本次购买的箱包数大于活动剩余量");
            return false;
        }  
    }        
    
}
// 修改柜数量
function changeSl3(pkid) {
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        updateShopping();
        $("#" + pkid).addClass("current");            
    }
    var company = $("#company_"+pkid+" .curr").attr("val");
	if("20ft"==company){
		$("#box_" + pkid).addClass("curr");
        $("#pallet_" + pkid).removeClass("curr");
		$("#pallet_" + pkid).css("display","none");	
     }else{
	    $("#pallet_" + pkid).css("display","block");	
	 }
	
    
    // 根据数量计算出重量
    var sl03 = $("#sl03_"+pkid).val();
    if(sl03.length > 0){
        if (!checkNumber("sl03_" + pkid, 0, "柜数")) {
            return false;
        }
        var dz = $("#packstr_" + pkid).val();
        if (isNull(dz)) {
            // 切片，锦纶切片
            dz = $("#packstr_" + pkid + " .curr").attr("val");
        }
        if (!isNull(dz)) {
			var packing = $("#packing_"+pkid+" .curr").attr("val");
			if("Pallet"==packing){
			var cartonPallet = $("#cartonPallet_" + pkid).val();
			var sl01 = accMul(sl03, cartonPallet);
			sl01= sl01.replace('.00', '');
			$("#sl01_" + pkid).val(sl01);
			var palletWeight= $("#palletWeight_" + pkid).val();
			var sl02 = accMul(palletWeight, accMul(sl01, 100));
            $("#sl02_" + pkid).val(sl02);
			}else{
            var cartonBag = $("#cartonBag_" + pkid).val();
			if("20ft"==company){
				cartonBag=300;
			}
			var sl01 = accMul(sl03, cartonBag);
			sl01= sl01.replace('.00', '');
			$("#sl01_" + pkid).val(sl01);
			var sl02 = accMul(sl01, dz);
            $("#sl02_" + pkid).val(sl02);
			}
            
        }        
    }  
    changePortShop(); 
    // 统计总重量
    totalSl2();
    totalAmt();
    //updateShopping();

    var couponType = $("#couponType").val();
    if(!isNull(couponType) && couponType == "2"){
        // 活动剩余量
        var surplus = $("#surplus").val();
        if(isNull(surplus)){
            showMessage("活动剩余量不足");
            return false;
        }
        if(parseFloat(sl01) > parseFloat(surplus)){
            showMessage("本次购买的箱包数大于活动剩余量");
            return false;
        }  
    }        
    
}

// 计算下优惠金额
function getActivityCouponAmt(){
    var url = requestPath + "/m/shopping/getActivityCouponAmt.htm";
    var dataMap = {};
    dataMap.activityId = $("#activityId").val();
    dataMap.sl1 = $("#totalSl1").val();
    dataMap.sl2 = $("#totalSl2").html();

    if(isNull(dataMap.activityId) || isNull(dataMap.sl1) || isNull(dataMap.sl2)){
        console.log("计算优惠金额参数错误");
        return false;
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#couponAmtHtml").html("(优惠"+d.couponAmt+"元)");
    });
}

function changeRemark(pkid){
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        updateShopping();
        $("#" + pkid).addClass("current");            
    }

    //updateShopping();
}


function changeSun(pkid){ 
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        updateShopping();
        $("#" + pkid).addClass("current");            
    }


    $(".wx_cart .current").each(function() {
        var id = $(this).attr("id");
        
         var sunshineDiscount = $("#sunshineDiscount_" + id).val();
		 if (!isNull(sunshineDiscount)) {
		 if (!checkNumber("sunshineDiscount_" + id, 2, "阳光折扣")) {
            
			$("#sunshineDiscount_" + id).val("");
           
         }

		 var sunshineRemark = $("#sunshineRemark_" + id).val();
         if(isNull(sunshineRemark)){
		    showToptip("有阳光折扣时折扣原因必填");
                
		 }
         }
       

		var policyPreferences = $("#policyPreferences_" + id).val();
		 if (!isNull(policyPreferences)) {
		if (!checkNumber("policyPreferences_" + id, 2, "政策优惠")) {
            $("#policyPreferences_" + id).val("");
           
        }
		}
    });
    //updateShopping();
	
    
}


// 修改购物车
function updateShopping(){
    setTimeout(function(){
        var url = requestPath + "/m/shopping/updateShopping.htm";
        var dataMap = {};
        dataMap.jsonstring = getJsonString();
        // 先修改购物车信息
        $.ajaxjsonp(url, dataMap, function(data) {
            
        });
    }, 10);    
}

function showConfirm(){
    $("#balance").css('pointer-events','none');
    if (!checkValue()) {
        $(".fc_pop").hide();
        setTimeout("$('#balance').css('pointer-events','auto');",500);
        return false;
    }
    if(flag==true){
        showMessage("您刚提交了订单，请再等等吧！");
        $(".fc_pop").hide();
        setTimeout("$('#balance').css('pointer-events','auto');",500);
        return false;
    }
    $(".fc_pop").show();
}
function doSubmit() {
    if (!checkValue()) {
        $(".fc_pop").hide();
        setTimeout("$('#balance').css('pointer-events','auto');",500);
        return false;
    }
    if(flag==true){
        showMessage("您刚提交了订单，请再等等吧！");
        $(".fc_pop").hide();
        setTimeout("$('#balance').css('pointer-events','auto');",500);
        return false;
    }

    //confirmMsg("我已确认此订单信息准确无误，确定提交订单？", function() {
        // var url = requestPath + "/m/shopping/updateShopping.htm";
        // var dataMap = {};        
        // dataMap.jsonstring = getJsonString();
        flag = true;
        // 先修改购物车信息
        // $.ajaxjsonp(url, dataMap, function(data) {
            // 提交订单
            createbill();
        // });
   // });
}

function timeRefresh() {
    flag=false;
}

var appointmentFlag = 0;
var flag=false;
function createbill() {
    var url = requestPath + "/m/createOrder/createbill.htm";
    var dataMap = getOrderDataMap();

    var couponType = $("#couponType").val();  //13逸信贷
    var activityId = $("#activityId").val();
    var auctionmxId = $("#couponCode").val();
    var flag01 = $("#flag01").val();
    
    if(appointment==1){
    	console.info("预约下单");
    	dataMap.appointment = 1;
    }
    //是否已经抽过奖,或者已过期
    var hasDraw = $("#flag02").val();

	//特殊标识
    var menberTab = $("#menberTab").val();
    if(!isNull(menberTab)){
    	dataMap.wbno06 = menberTab;
    }
    
	  dataMap.language=i18nLanguage;//语言
     
	  if("en"==i18nLanguage||"ko"==i18nLanguage){
			 url = requestPath + "/m/createOrder/createbillByEn.htm";
	 }
	 flag=true;
	 setTimeout(timeRefresh,15000);	
     dataMap.showLoading = true
     $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        flag=false;
        if(d.isyz!=null){
               showSendRandom();
            return;
        }
        sessionStorage.setItem("shoppingCartData",'');
        sessionStorage.setItem("shoppingCartRzFlag",'');
        
        var msg = "订单提交成功";
        if(appointment==1 && isNull(totalAmt)){
	    	msg = "订单预约成功";
	    }
        $.toast(msg);
        setTimeout(function(){
            if (!isNull(d.isSalesman) && d.isSalesman === 1) {
                openPage("工作台", "../salesman/workbench.html", "1");
            }
            else if(!isNull(couponType) && couponType==3 && hasDraw!=1 && hasDraw!=2){
                openPage("竞拍抽奖", "../public/auctionSucceed.html?auctionId="+activityId+"&auctionmxId="+auctionmxId+"&flag01="+flag01, "1");
            }
            else{
                openPage("我的", "../public/orderSucceed.html?fcOrderFlag="+fcOrderFlag+"&appointmentFlag="+appointmentFlag, "1");
            }
        },2000)
     },false, function(){
		  flag=false;
        $(".fc_pop").hide();
        setTimeout("$('#balance').css('pointer-events','auto');",500);
     });
}

function checkValue() {
	
    if ($(".wx_cart .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    
    var rzFlag = $("#rzFlag").attr("data-values");
	var rzly = $("#rzly .current").attr("val");
    console.log(rzFlag,'rzFlag');
    
    //逸信代
    if (!isNull(rzFlag) && rzFlag == "13") {
        var availableAmt = $("#availableAmt").val();
        var totalAmt = $("#totalAmt").text();
        if (parseFloat(availableAmt) < parseFloat(totalAmt)) {
            showMessage("可用额度小于订单金额");
            return false;
        }

        if(!checkOnlyOrder()){
            showMessage("融资订单一次只能生成1个");
            return false;
        }
    }
    
    //逸白条
    if (!isNull(rzFlag) && rzFlag == "7") {
        var availableAmt = $("#freeamt").val();
        var totalAmt = $("#totalAmt").text();
        if (parseFloat(availableAmt) < parseFloat(totalAmt)) {
            showMessage("可用额度小于订单金额");
            return false;
        }
    }
    
    //逸控代
    if(!isNull(rzFlag) && rzFlag == "5"&& rzly == "1"){
        var shopno = $("#shopno").val();
        if (isNull(shopno)) {
            showMessage("请选择融资机构");
            return false;
        }

        if((creditFlag!=null && creditFlag==1) && supportFlat()){//融资订单暂不支持短纤,锦纶切片类产品
           showMessage("融资订单暂不支持短纤,锦纶切片类产品");
           return false;
        }

        var freeamt = $("#freeamt").val();
        var totalAmt = $("#totalAmt").text();
        if (parseFloat(freeamt) < parseFloat(totalAmt)) {
            showMessage("可用额度小于订单金额");
            return false;
        }

        if(!checkOnlyOrder()){
            showMessage("融资订单一次只能生成1个");
            return false;
        }
    }
	if(!isNull(rzFlag) && rzFlag == "5"&& rzly == "2"){
       
        if((creditFlag!=null && creditFlag==1) && supportFlat()){//融资订单暂不支持短纤,锦纶切片类产品
           showMessage("融资订单暂不支持短纤,锦纶切片类产品");
           return false;
        }

        var freeamt = $("#freeamt").val();
        var totalAmt = $("#totalAmt").text();
        if (parseFloat(freeamt) < parseFloat(totalAmt)) {
            showMessage("可用额度小于订单金额");
            return false;
        }

        if(!checkOnlyOrder()){
            showMessage("融资订单一次只能生成1个");
            return false;
        }
    }
	
    var couponType = $("#couponType").val();
    var b = true;
    $(".wx_cart .current").each(function() {
        var id = $(this).attr("id");
        if (!checkNumber("sl02_" + id, 3, "重量")) {
            b = false;
            return false;
        }

        // 如果是竞价资源，箱包数不判断，由sap内勤自己输入
        if(isNull(couponType) || couponType != 3){
            // 如果有箱包净重的，箱包数必填 2017-09-13
            var dz = $("#packstr_" + id).val(); 

            // FDY 和 POY、DTY的A B C等级箱包数 不必选
            var pm = $("#pm_" + id).val();
            var cd = $("#cd_" + id).val();        
            // if (!isNull(dz) || (pm != "FDY" && cd != "A" && cd != "B" && cd != "C")) {
            // 2017-09-14 最新规则： 1 FDY不是必填的 2 除FDY外有箱包净重的必须填 
            if (pm != "FDY" && !isNull(dz)) {
			
                if (!checkNumber("sl01_" + id, 0, "箱包数")) {
                    b = false;
                    return false;
                }
				
            } else {
                // 控制下不能为负数吧
                var sl01 = $("#sl01_" + id).val();
                if (isNull(sl01)) {
                    $("#sl01_" + id).val("0");
                }
                if (!isNull(sl01) && parseFloat(sl01) < 0) {
                    showToptip("箱包数请输入大于0的数字");
                    b = false;
                    return false;
                }
            }
        }

		var sunshineDiscount = $("#sunshineDiscount_" + id).val();
		 if (!isNull(sunshineDiscount)) {
		 if (!checkNumber("sunshineDiscount_" + id, 2, "阳光折扣")) {
             b = false;
            return false;
         }

		 var sunshineRemark = $("#sunshineRemark_" + id).val();
         if(isNull(sunshineRemark)){
		    showToptip("有阳光折扣时折扣原因必填");
                b = false;
                return false;
		 }

		 }
       

		var policyPreferences = $("#policyPreferences_" + id).val();
		 if (!isNull(policyPreferences)) {
		if (!checkNumber("policyPreferences_" + id, 2, "政策优惠")) {
             b = false;
            return false;
        }
		}
        /*
        if (isNull($("#packstr_" + id).val())) {
            showMessage("请选择箱包净重");
            b = false;
            return false;
        }
        */
    });
	
    if (!b) {
        return false;
    }

	
	if("zh"==i18nLanguage){
	if ($("#htflag06 .current").length === 0) {
        showMessage("请选择交货方式");
        return false;
    }
    var kpdm = $("#kpdm").val();
    if (isNull(kpdm)) {
        showMessage("请选择开票单位");
        return false;
    }
    }else{
	var paymentTerms = $("#paymentTerms").val();
    if (isNull(paymentTerms)) {
        showMessage("请选择付款方式");
        return false;
    }
	var port = $("#port").val();
    if (isNull(port)) {
        showMessage("请选择港口");
        return false;
    }
	
	}
	var date10Str = $("#date10Str").val();
    if (isNull(date10Str)) {
        showMessage("请选择要货日期");
        return false;
    }
    var cleckLis = $(".wx_cart .current");
		var liBlock = true;
		for (var i=0;i<cleckLis.length;i++) {
			var liId = $(cleckLis[i]).attr("id");
			var liPm = $("#pm_" + liId).val();
			if (liPm != '短纤' && liPm != '锦纶切片') {
				liBlock = false;
				break;
			}
		}

		if (liBlock  && cleckLis.length != 0 && !isNull($("#customerId").val())) {
			//判断工厂是否选中
			var gcs = $(".gcs.current");
			if (isNull(gcs) || gcs.length == 0) {
				showToptip("请选择工厂名称");
				return false;
			}
			
			//先判断下级是否隐藏，未隐藏，则必填
			var shengDisplay = $("#sheng_id").css("display");
			 console.log(shengDisplay);
			if (!isNull(shengDisplay) && shengDisplay == 'block') {
		 			 var provinceVal = $("#provinceVal").val();
		 			 if (isNull(provinceVal)) {
		 			 		showToptip("请选择省");
		 			 		return false;
		 			 }
		  }
		  
		  var shiDisplay = $("#shi_id").css("display");
			if (!isNull(shiDisplay) && shiDisplay == 'block') {
		 			 var cityVal = $("#cityVal").val();
		 			 if (isNull(cityVal)) {
		 			 		showToptip("请选择市");
		 			 		return false;
		 			 }
		  }
		  
		  var townDisplay = $("#town_id").css("display");
			if (!isNull(townDisplay) && townDisplay == 'block') {
		 			 var townVal = $("#townVal").val();
		 			 if (isNull(townVal)) {
		 			 		showToptip("请选择区");
		 			 		return false;
		 			 }
		  }
		  
		  var streetDisplay = $("#street_id").css("display");
			if (!isNull(streetDisplay) && streetDisplay == 'block') {
		 			 var streetVal = $("#streetVal").val();
		 			 if (isNull(streetVal)) {
		 			 		showToptip("请选择镇");
		 			 		return false;
		 			 }
		  } 			
		}
	
	//逸信代强制下单,非要使用逸信代下单
	if(!isNull(creditLoans) && creditLoans.flag01==1 && creditLoans.availableAmt>0 && couponType != 13){
        if (isNull($("#customerId").val())) {
	    	showMessage("您已申请了逸信代额度, 融资类型请选择逸信代类型!");
	    }else{
	    	showMessage("该客户已申请了逸信代额度, 融资类型只能选择逸信代类型!");
	    }
	    return false;
    }
	
    return true;
}


function getJsonString() {
    var jsons = [];
    $(".wx_cart .current").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.pkid = id;        
        var sl01 = $("#sl01_" + id).val();
        var sl02 = $("#sl02_" + id).val();
        if(isNull(sl01)){
            sl01=0;
        }
        if(isNull(sl02)){
            sl02=0;
        }
        json.sl01 = sl01;
        json.sl02 = sl02;
        if(!isNull($("#packstr_" + id+" .curr").attr("val"))){
            json.packstr = $("#packstr_" + id+" .curr").attr("val");
        }       
        json.remark = $("#remark_" + id).val();

        


	    json.sunshineDiscount = $("#sunshineDiscount_" + id).val();
		json.sunshineRemark = $("#sunshineRemark_" + id).val();
		json.policyPreferences = $("#policyPreferences_" + id).val();

        jsons[jsons.length] = json;
    });
    return JSON.stringify(jsons);
}


function getOrderDataMap() {
    var dataMap = {};
    dataMap.htflag06 = $("#htflag06 .current").attr("val");
    dataMap.kpdm = $("#kpdm").val();
    dataMap.kpname = $("#kpname").val();
    dataMap.date10Str = $("#date10Str").val();
    dataMap.remark = $("#remark").val();
    dataMap.wxOpenid = $("#openid").val();
    // 优惠信息
    var couponType = $("#couponType").val();
    if(isNull(couponType)){
        couponType = 0;//普通订单
    }
    dataMap.couponType = couponType;
    var activityId = $("#activityId").val();
    if(!isNull(activityId)){
        dataMap.activityId = activityId;
    }
    var couponCode = $("#couponCode").val();
    if(!isNull(couponCode)){
        dataMap.couponCode = couponCode;
    }
    var couponName = $("#couponName").val();
    if(!isNull(couponName)){
        dataMap.couponName = couponName;
    }
    var couponAmt = $("#couponAmt").val();
    if(!isNull(couponAmt)){
        dataMap.couponAmt = couponAmt;
    }
    var couponLimitMinAmt = $("#couponLimitMinAmt").val();
    if(!isNull(couponLimitMinAmt)){
        dataMap.couponLimitMinAmt = couponLimitMinAmt;
    }
	//

	var fccouponCode = $("#fccouponCode").val();
    if(!isNull(fccouponCode)){
        dataMap.fcCouponCode = fccouponCode;
    }
    var fccouponName = $("#fccouponName").val();
    if(!isNull(fccouponName)){
        dataMap.fcCouponName = fccouponName;
    }
	var freeDays = $("#freeDays").val();
    if(!isNull(freeDays)){
        dataMap.freeDays = freeDays;
    }

    //
	var paymentTerms = $("#paymentTerms").val();
    if(!isNull(paymentTerms)){
        dataMap.paymentTerms = paymentTerms;
    }
	var paymentCode = $("#paymentCode").val();
    if(!isNull(paymentCode)){
        dataMap.paymentCode = paymentCode;
    }
	var tradeTerms = $("#myFlag .current").attr("value");
	console.log(tradeTerms);
     if(!isNull(tradeTerms)){
        dataMap.tradeTerms = tradeTerms;
    }
	var port = $("#port").val();
    if(!isNull(port)){
        dataMap.port = port;
    }
	var freightAmt = $("#freightAmt").val();
    if(!isNull(freightAmt)){
        dataMap.freightAmt = freightAmt;
    }
	var portCode = $("#portCode").val();
    if(!isNull(portCode)){
        dataMap.portCode = portCode;
    }



	var jsons = new Array();
    $(".wx_cart .current").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.pkid = id;
        json.cfxx = $("#cfxx_" + id).val();
        jsons[jsons.length] = json;
    });
    dataMap.jsonstring = JSON.stringify(jsons);

    //将订单合同id传给明细表，销售单传给集控时，需要这个合同标识
    if (!isNull($("#contractTypeId").val())) {
        dataMap.mddm = $("#contractTypeId").val();
    } 

    // 融资信息
    var rzFlag = $("#rzFlag").attr("data-values");
	var rzly = $("#rzly .current").attr("val");
    // console.log('rzFlag:'+rzFlag);
    // console.log('rzly:'+rzly);
    if(!isNull(rzFlag) && rzFlag == "5"&&rzly=="1"){
        dataMap.couponType = "5"; // 5 融资
        dataMap.couponCode = $("#shopno").val(); // 商户号      
        dataMap.couponName = "1"; // 融资类型，1 逸控代，2 信用
        fcOrderFlag = 1;
    }

	 if(!isNull(rzFlag) && rzFlag == "5"&&rzly=="2"){
        dataMap.couponType = "5"; // 5 融资
        dataMap.couponCode = "xf"; // 商户号      
        dataMap.couponName = "2"; // 融资类型，1 逸控代，2 信用
        fcOrderFlag = 1;
    }
	 if(!isNull(couponType) && couponType == "13"){
        fcOrderFlag = 2;//逸信代
    }
	 
	 if(!isNull(couponType) && couponType == "7"){
        fcOrderFlag = 3;//逸白条
    }
    
    //add by zx start   
    var cleckLis = $(".wx_cart .current");
		var liBlock = true;
		for (var i=0;i<cleckLis.length;i++) {
			var liId = $(cleckLis[i]).attr("id");
			var liPm = $("#pm_" + liId).val();
			if (liPm != '短纤' && liPm != '锦纶切片') {
				liBlock = false;
				break;
			}
		}
		
		if (liBlock  && cleckLis.length != 0) {
			//判断工厂是否选中
			var gcs = $(".gcs.current");
			dataMap.wbno08 =  gcs.attr("val");
			
			//先判断下级是否隐藏，未隐藏，则必填
			var wbno09 = "";
			var shengDisplay = $("#sheng_id").css("display");
			if (!isNull(shengDisplay) && shengDisplay == 'block') {
		 			 var provinceVal = $("#provinceVal").val();
		 			 wbno09 = wbno09 + provinceVal + ",";
		  }
		  
		  var shiDisplay = $("#shi_id").css("display");
			if (!isNull(shiDisplay) && shiDisplay == 'block') {
		 			 var cityVal = $("#cityVal").val();
		 			 wbno09 = wbno09 + cityVal + ",";
		  }
		  
		  var townDisplay = $("#town_id").css("display");
			if (!isNull(townDisplay) && townDisplay == 'block') {
		 			 var townVal = $("#townVal").val();
		 			 wbno09 = wbno09 + townVal + ",";
		  }
		  
		  var streetDisplay = $("#street_id").css("display");
			if (!isNull(streetDisplay) && streetDisplay == 'block') {
		 			 var streetVal = $("#streetVal").val();
		 			 wbno09 = wbno09 + streetVal + ",";
		  }			  
		  dataMap.wbno09 = wbno09.substring(0,wbno09.length-1);
		  
		  dataMap.wbno10 = $("#fare_price_text").val();
		}	
    //add by zx end

    return dataMap;
}

function deleteShopping(gpls, wzid, depid, salesType) {
    if (isNull(gpls)) {
        showMessage("请选择资源");
        return false;
    }
    var dataMap = {};    
    dataMap.gpls = gpls;
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;

    confirmMsg("您是否确认删除？", function() {
        var url = requestPath + "/m/shopping/deleteShopping.htm";
        $.ajaxjsonp(url, dataMap, function(data) {
            showMessage("删除成功");
            queryData();
        });
    });
}

function removeInputBlur() {
    $('input,textarea').each(function() {
        $(this).blur();
    });
}

function doCheckAll(obj) {   

    if ($(obj).parent().hasClass("current")) {
        $(obj).parent().removeClass("current");

        $(".wx_cart li").each(function() {
            $(this).removeClass("current");
        });
    } else {
        $(obj).parent().addClass("current");

        $(".wx_cart li").each(function() {
            $(this).addClass("current");            
        });
    }

    totalSl2();
    totalAmt();   
}

// 显示优惠券列表
function showCouponList(){
    if ($(".wx_cart .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    // 判断下是几个订单
    var b = true;
	var f = true;
    var oldCfxx = "";
    $(".wx_cart .current").each(function() {       
        var id = $(this).attr("id");
        var cfxx = $("#cfxx_" + id).val();
        if(isNull(oldCfxx)){
            oldCfxx = cfxx;
        }else{
            if(oldCfxx !== cfxx){
                b = false;
                return false;
            }
        }

		var flag11=$("#flag11_" + id).val();

		if(!isNull(flag11)){
		   if(flag11=='1'){
		     f=false;
		   }
		}
    });
     if(!b){
        showMessage("选择的资源包含多个订单，不能使用优惠券");
        return false;
    }
	if(!f){
        showMessage("选择的资源是合约价资源，不能使用优惠券");
        return false;
    }
    showCouponPopup();
}

// 显示免息券列表
function showFcCouponList(){
    if ($(".wx_cart .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    // 判断下是几个订单
    var b = true;
    var oldCfxx = "";
    $(".wx_cart .current").each(function() {       
        var id = $(this).attr("id");
        var cfxx = $("#cfxx_" + id).val();
        if(isNull(oldCfxx)){
            oldCfxx = cfxx;
        }else{
            if(oldCfxx !== cfxx){
                b = false;
                return false;
            }
        }
    });
    if(!b){
        showMessage("选择的资源包含多个订单，不能使用免息券");
        return false;
    }
    showFcCouponPopup();
}

// 清空优惠券信息
function clearCoupon(){ 
    $("#couponType").val("");
    $("#couponCode").val("");
    $("#couponName").val("");
    $("#couponAmt").val("");
    $("#couponLimitMinAmt").val("");
    $("#couponText").val("");
    $("#couponAmtHtml").html("");

	$("#fccouponCode").val("");
    $("#fccouponName").val("");
	$("#freeDays").val("");
	$("#fccouponText").val("");
}

function scrollToEnd(){//滚动到底部
   $('.wx_main').scrollTop($('.wx_main')[0].scrollHeight);
    console.info("height: "+$('.wx_main')[0].scrollHeight);
}


//点击工厂名称获取与其有关的地区信息，一级级获取，因为可能会出现只选择省的情况
//这个位置后期需要优化，不要每次点击都请求，要缓存到页面里，如果缓存到页面，需要压力测试的，因为nodejs目前是单线程回掉方式请求数据，可能会出现资源共享的情况，这就出问题了！
function lightThis (obj,level) {
	
	var dataMap = {};
	
	if (level == 0) {//根据工厂代码获取省
		$(".gcs").removeClass("current");
		obj.addClass("current");
		var factoryCode = obj.attr("val");
  	dataMap.factoryCode = factoryCode;
  	
  	emptyVal(0);
	}
	
	if (level == 1) {//根据工厂代码省代码获取市
		var factoryCode = $(".gcs.current").attr("val");
		var provinceCode = obj.attr("data-values");
  	dataMap.factoryCode = factoryCode;
  	dataMap.provinceCode = provinceCode;
  	
  	emptyVal(1);
	}
	
	if (level == 2) {//根据工厂代码省代码市代码获取区
		var factoryCode = $(".gcs.current").attr("val");
		dataMap.factoryCode = factoryCode;
		var cityCode = $(".gcs.current").parent().parent().find("#city_text").attr("data-values");
		dataMap.cityCode = cityCode;
		var provinceCode = $(".gcs.current").parent().parent().find("#province_text").attr("data-values");
		dataMap.provinceCode = provinceCode;
		
		emptyVal(2);
	}
	
	if (level == 3) {//根据工厂代码省代码市代码区代码获取镇
		var factoryCode = $(".gcs.current").attr("val");
		dataMap.factoryCode = factoryCode;
		var cityCode = $(".gcs.current").parent().parent().find("#city_text").attr("data-values");
		dataMap.cityCode = cityCode;
		var provinceCode = $(".gcs.current").parent().parent().find("#province_text").attr("data-values");
		dataMap.provinceCode = provinceCode;
		var townCode = $(".gcs.current").parent().parent().find("#town_text").attr("data-values");
		dataMap.townCode = townCode;
		
		emptyVal(3);
	}
	
	if (level == 4) {
		console.log("结束节点");
		return false;
	}
    var url = requestPath + "/m/sapFreight/list.htm";
	var cleckLis = $(".checkicon");
    for (var i=0;i<cleckLis.length;i++) {
        var liId = $(cleckLis[i]).attr("id");
        var liPm = $("#pm_" + liId).val();
        if (liPm == '锦纶切片') {
            url = requestPath + "/m/sapFreightChinlon/list.htm";
            break;
        }
    }
  
  $.ajaxjsonp(url, dataMap, function(data) {
      var d = eval(data);
            
      if (d.data.length != 0) {
      	if (level == 0) {
      		$(".gcs.current").parent().parent().find("#sheng_id").css("display","block");
      		
      		$(".gcs.current").parent().parent().find("#province_text").select({
			        title: "请选择省份",
			        items: [],
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#provinceVal").val(d.values + "-" + d.titles); 
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("#provinceVal").val("");
			            
			        }
			    });
			    
				    var provinces = [];
			     	for (var i = 0;i < d.data.length; i++ ) {
			     		if (isNull(d.data[i].provinceName) || isNull(d.data[i].provinceCode)) {
			     			continue;
			     		}
			     		var proMap = {};
			     		proMap.title = d.data[i].provinceName;
			     		proMap.value = d.data[i].provinceCode;
			     		provinces.push(proMap);
			     	}
			     	
			     	if (provinces.length == 0) {
			     		$(".gcs.current").parent().parent().find("#sheng_id").css("display","none");
			     		getFarePrice();
			     	}
			     	
			     	$(".gcs.current").parent().parent().find("#shi_id").css("display","none");
			     	$(".gcs.current").parent().parent().find("#town_id").css("display","none");
			     	$(".gcs.current").parent().parent().find("#street_id").css("display","none");
			     	$(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
			     	
			     	$(".gcs.current").parent().parent().find("#province_text").select("update",{
			     		title: "请选择省份",
			     		items:unique(provinces),
			     		onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#provinceVal").val(d.values + "-" + d.titles); 
			           
			           var thisDisplay = $(".gcs.current").parent().parent().find("#sheng_id").css("display");
								 if (!isNull(thisDisplay) && thisDisplay == 'none') {
								 		getFarePrice();		 
								 } 
								 
								 	$(".gcs.current").parent().parent().find("#shi_id").css("display","none");
						     	$(".gcs.current").parent().parent().find("#town_id").css("display","none");
						     	$(".gcs.current").parent().parent().find("#street_id").css("display","none");
						     	$(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("#provinceVal").val("");
			            emptyVal(0);
			        }
			     	});	     	
			     	
      	}
      	if (level == 1) {
      		$(".gcs.current").parent().parent().find("#shi_id").css("display","block");
      		
      		$(".gcs.current").parent().parent().find("#city_text").select({
			        title: "请选择市",
			        items: [],
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#cityVal").val(d.values + "-" + d.titles);     
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("cityVal").val("");
			            emptyVal(1);
			        }
			    });
			    
				    var citys = [];
			     	for (var i = 0;i < d.data.length; i++ ) {
			     		if (isNull(d.data[i].cityName) || isNull(d.data[i].cityCode)) {
			     			continue;
			     		}
			     		var cityMap = {};
			     		cityMap.title = d.data[i].cityName;
			     		cityMap.value = d.data[i].cityCode;
			     		citys.push(cityMap);
			     	} 
			     	
			     	if (citys.length == 0) {
			     		$(".gcs.current").parent().parent().find("#shi_id").css("display","none");
			     		getFarePrice();		 
			     	}
			     	
			     	$(".gcs.current").parent().parent().find("#town_id").css("display","none");
			     	$(".gcs.current").parent().parent().find("#street_id").css("display","none");
			     	$(".gcs.current").parent().parent().find("#fare_price_id").css("display","none");
			     	
			     	$(".gcs.current").parent().parent().find("#city_text").select("update",{
			     		title: "请选择市",
			     		items:unique(citys),
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#cityVal").val(d.values + "-" + d.titles);     
			           
			           var thisDisplay = $(".gcs.current").parent().parent().find("#shi_id").css("display");
								 if (!isNull(thisDisplay) && thisDisplay == 'none') {
								 		getFarePrice();		 
								 } 
								 
							$(".gcs.current").parent().parent().find("#town_id").css("display","none");
			     			$(".gcs.current").parent().parent().find("#street_id").css("display","none");
			     			$(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("cityVal").val("");
			            emptyVal(1);
			        } 	
			     	});      
		      	 
      	}
      	
      	if (level == 2) {
      		$(".gcs.current").parent().parent().find("#town_id").css("display","block");
      		
      		$(".gcs.current").parent().parent().find("#town_text").select({
			        title: "请选择区",
			        items: [],
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#townVal").val(d.values + "-" + d.titles);     			           
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("townVal").val("");
			            emptyVal(2);
			        }
			    });
			    
				    var towns = [];
		      	for (var i = 0;i < d.data.length; i++ ) {
		      		if (isNull(d.data[i].townName) || isNull(d.data[i].townCode)) {
			     			continue;
			     		}
			     		var townMap = {};
			     		townMap.title = d.data[i].townName;
			     		townMap.value = d.data[i].townCode;
			     		towns.push(townMap);
			     	}
			     	
			     	if (towns.length == 0) {
			     		$(".gcs.current").parent().parent().find("#town_id").css("display","none");
			     		getFarePrice();	
			     	}
			     	
			     	$(".gcs.current").parent().parent().find("#street_id").css("display","none");
			     	$(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
			     	 
			     	$(".gcs.current").parent().parent().find("#town_text").select("update",{
			     		title: "请选择区",
			     		items:unique(towns),
			        onChange: function(d) {
			        	console.log("d: " + JSON.stringify(d));
			           $(".gcs.current").parent().parent().find("#townVal").val(d.values + "-" + d.titles);     
								 
								 var thisDisplay = $(".gcs.current").parent().parent().find("#town_id").css("display");
								 if (!isNull(thisDisplay) && thisDisplay == 'none') {
								 		getFarePrice();		 
								 }
								 
								 $(".gcs.current").parent().parent().find("#street_id").css("display","none");   
								 $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none");     
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("townVal").val("");
			            emptyVal(2);
			        }   	
			     	});      
		      	
      	}
      	
      	if (level == 3) {
      		$(".gcs.current").parent().parent().find("#street_id").css("display","block");
      		
      		$(".gcs.current").parent().parent().find("#street_text").select({
			        title: "请选择镇",
			        items: [],
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#streetVal").val(d.values);     			           
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("streetVal").val("");
			            emptyVal(3);
			        }
			    });
			    
				    var streets = [];
		      	for (var i = 0;i < d.data.length; i++ ) {
		      		if (isNull(d.data[i].street) || isNull(d.data[i].street)) {
			     			continue;
			     		}
			     		var streetMap = {};
			     		streetMap.title = d.data[i].street;
			     		streetMap.value = d.data[i].street;
			     		streets.push(streetMap);
			     	} 
			     	
			     	if (streets.length == 0) {
			     		$(".gcs.current").parent().parent().find("#street_id").css("display","none");
			     		getFarePrice();
			     	}
			     	
			     	$(".gcs.current").parent().parent().find("#street_text").select("update",{
			     		title: "请选择镇",
			     		items:unique(streets),
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#streetVal").val(d.values);     
			           
			           //选到镇，目前就结束了！显示运费
			           $(".gcs.current").parent().parent().find("#fare_price_id").css("display","block");
			           getFarePrice();
			           
			           	
			        },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("streetVal").val("");
			            emptyVal(3);
			        }	
			     	});      
			     	
      	}

      }  	
  });
}

function unique(arrs){
     var result = {};
     var finalResult=[];
     for(var i=0;i<arrs.length;i++){
				 var keyName = arrs[i].title;
         result[keyName] = arrs[i];//简易处理
     }
     for(item in result){
         finalResult.push(result[item]);
     }
     
     return finalResult;
}

function emptyVal(level) {
	
	/*var clearButtons = $(".clear-button");
	for (var i=0;i<clearButtons.length;i++) {
		$(clearButtons[i]).click();
	}*/
	
	if (level == 0) {//清空掉省及以下的设置值
		$(".gcs.current").parent().parent().find("#province_text").attr("value","");
		$(".gcs.current").parent().parent().find("#province_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#provinceVal").attr("value","");
		
		$(".gcs.current").parent().parent().find("#sheng_id").html("<span class='i18n' name='or_sheng'>省</span><input type='text' readonly='readonly' id='province_text' placeholder='省' class='hynewlytext' onchange='lightThis($(this),1)' /><input type='hidden' id='provinceVal' value='' />");
		$(".gcs.current").parent().parent().find("#province_text").select("close");
		
		$(".gcs.current").parent().parent().find("#city_text").attr("value","");
		$(".gcs.current").parent().parent().find("#city_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#cityVal").attr("value","");
		
		$(".gcs.current").parent().parent().find("#shi_id").html("<span class='i18n' name='or_shi'>市</span><input type='text' readonly='readonly' id='city_text' placeholder='市' class='hynewlytext' onchange='lightThis($(this),2)' /><input type='hidden' id='cityVal' value='' />");
		$(".gcs.current").parent().parent().find("#city_text").select("close");
		
		$(".gcs.current").parent().parent().find("#town_text").attr("value","");
		$(".gcs.current").parent().parent().find("#town_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#townVal").attr("value","");
		
		$(".gcs.current").parent().parent().find("#town_id").html("<span class='i18n' name='or_town'>区</span><input type='text' readonly='readonly' id='town_text' placeholder='区' class='hynewlytext' onchange='lightThis($(this),3)' /><input type='hidden' id='townVal' value='' />");
		$(".gcs.current").parent().parent().find("#town_text").select("close");
		
		$(".gcs.current").parent().parent().find("#street_text").attr("value","");
		$(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#streetVal").attr("value","");
		$(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
		$(".gcs.current").parent().parent().find("#street_text").select("close");
		
	}
	
	
	if (level == 1) {//清空掉市及以下的设置值
		$(".gcs.current").parent().parent().find("#city_text").attr("value","");
		$(".gcs.current").parent().parent().find("#city_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#cityVal").attr("value","");
		$(".gcs.current").parent().parent().find("#shi_id").html("<span class='i18n' name='or_shi'>市</span><input type='text' readonly='readonly' id='city_text' placeholder='市' class='hynewlytext' onchange='lightThis($(this),2)' /><input type='hidden' id='cityVal' value='' />");
		$(".gcs.current").parent().parent().find("#city_text").select("close");
		
		
		$(".gcs.current").parent().parent().find("#town_text").attr("value","");
		$(".gcs.current").parent().parent().find("#town_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#townVal").attr("value","");
		$(".gcs.current").parent().parent().find("#town_id").html("<span class='i18n' name='or_town'>区</span><input type='text' readonly='readonly' id='town_text' placeholder='区' class='hynewlytext' onchange='lightThis($(this),3)' /><input type='hidden' id='townVal' value='' />");
		$(".gcs.current").parent().parent().find("#town_text").select("close");
		
		$(".gcs.current").parent().parent().find("#street_text").attr("value","");
		$(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#streetVal").attr("value","");
		$(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
		$(".gcs.current").parent().parent().find("#street_text").select("close");

	}
	
	if (level == 2) {//清空掉区及以下的设置值
		$(".gcs.current").parent().parent().find("#town_text").attr("value","");
		$(".gcs.current").parent().parent().find("#town_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#townVal").attr("value","");
		$(".gcs.current").parent().parent().find("#town_id").html("<span class='i18n' name='or_town'>区</span><input type='text' readonly='readonly' id='town_text' placeholder='区' class='hynewlytext' onchange='lightThis($(this),3)' /><input type='hidden' id='townVal' value='' />");
		$(".gcs.current").parent().parent().find("#town_text").select("close");
		
		$(".gcs.current").parent().parent().find("#street_text").attr("value","");
		$(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#streetVal").attr("value","");
		$(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
		$(".gcs.current").parent().parent().find("#street_text").select("close");

	}
	
	if (level == 3) {//清空掉镇及以下的设置值
		$(".gcs.current").parent().parent().find("#street_text").attr("value","");
		$(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
		$(".gcs.current").parent().parent().find("#streetVal").attr("value","");
		$(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
		$(".gcs.current").parent().parent().find("#street_text").select("close");

	}
}

function getFarePrice(){
	
	var dataMap = {};
	
	var factoryCode = $(".gcs.current").attr("val");
	if (!isNull(factoryCode)) {
		dataMap.factoryCode = factoryCode;
	}
	
	var cityCode = $(".gcs.current").parent().parent().find("#city_text").attr("data-values");
	dataMap.cityCode = cityCode;
	if (!isNull(cityCode)) {
		dataMap.cityCode = cityCode
	}
	
	var provinceCode = $(".gcs.current").parent().parent().find("#province_text").attr("data-values");
	dataMap.provinceCode = provinceCode;
	if (!isNull(provinceCode)) {
		dataMap.provinceCode = provinceCode
	}
	
	var street = $(".gcs.current").parent().parent().find("#street_text").attr("value");
	dataMap.street = street;
	if (!isNull(street)) {
		dataMap.street = street
	}
	
	var townCode = $(".gcs.current").parent().parent().find("#town_text").attr("data-values");
	dataMap.townCode = townCode;
	if (!isNull(townCode)) {
		dataMap.townCode = townCode
	}
		
	var url = requestPath + "/m/sapFreight/list.htm";
    var cleckLis = $(".checkicon");
    for (var i=0;i<cleckLis.length;i++) {
        var liId = $(cleckLis[i]).attr("id");
        var liPm = $("#pm_" + liId).val();
        if (liPm == '锦纶切片') {
            url = requestPath + "/m/sapFreightChinlon/list.htm";
            break;
        }
    }
  
  $.ajaxjsonp(url, dataMap, function(data) {
      var d = eval(data);  
      var farePriceResult = d.data[0].farePrice;
      
      $(".gcs.current").parent().parent().find("#fare_price_id").css("display","block");
      $(".gcs.current").parent().parent().find("#fare_price_text").val(farePriceResult);
  });
}


function weeksCredit() {
    var array = [];
    for(var i = 1; i< 11; i++){
        var json = {};
        json.title = "   "+i+" weeks";
        json.value = i;
        array[array.length] = json;
    }
    // 要货日期
    $("#weeksStr").select({
        title: "请选择",
        items: array,           
        onChange: function(d) {
            $("#weeks").val(d.values);
        },
        onClose: function() {
            //选中后处理数据
        },
        onClear: function() {
            $("#weeks").val("");
        }        
    }); 
}
var  portMap = {};
function portCredit(portList) {
    var array = [];
     for(var i = 0; i< portList.length; i++){
        portMap[portList[i].pkid] = portList[i];
        var json = {};
        json.title = portList[i].str02+"-"+ portList[i].str01;
        json.value = portList[i].pkid;
        array[array.length] = json;
    }
    // 港口
    $("#port").select({
        title: "请选择",
        items: array,           
        onChange: function(d) {
            $("#portCode").val(d.values);
        },
        onClose: function() {
            //选中后处理数据
			changePortShop();
        },
        onClear: function() {
            $("#portCode").val("");
        }        
    }); 
}
var paymentTermsMap = {};
function paymentTermsCredit(paymentTermsList) {
    var array = [];
     for(var i = 0; i< paymentTermsList.length; i++){
        paymentTermsMap[paymentTermsList[i].paymentTermsCode] = paymentTermsList[i];
        var json = {};
        json.title = paymentTermsList[i].paymentTermsName;
        json.value = paymentTermsList[i].paymentTermsCode;
        array[array.length] = json;
    }
    
    $("#paymentTerms").select({
        title: "请选择",
        items: array,           
        onChange: function(d) {
            $("#paymentCode").val(d.values);
        },
        onClose: function() {
            //选中后处理数据
			
        },
        onClear: function() {
            $("#paymentCode").val("");
        }        
    }); 
}


template.helper("getPrice", function(price,portList) {
	    console.log(price);
	    if(!isNull(portList) && portList.length > 0) {
            return accAdd(price,parseFloat(portList[0].carriage) * parseFloat(1.03));
        }else{
		    return price;
		}
      
});

var freightflag=true;
function changePortShop(){
    var pkid = $("#portCode").val();
    if(isNull(pkid)){
       return false;
    }
    var port = portMap[pkid];
	$("#freightAmt").val(port.carriage);
	var list=shopd.data;
	
	
	for(var i = 0; i< list.length; i++){
		   if(freightflag){
           var packing = $("#packing_"+list[i].pkid+" .curr").attr("val");
	var amt=0;
	
	if("Pallet"==packing){
		console.log(packing);
	amt=0.02;
	}
           var price=accAdd(list[i].price00,amt);
		   price=accAdd(price,parseFloat(port.carriage) * parseFloat(1.03));
		   $("#price_"+list[i].pkid).html(price);
		   }else{
		   $("#price_"+list[i].pkid).html(list[i].price00);
		   }
	}
    totalAmt();
    
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
	    });
}


template.helper("getXfPrice", function(price) {
	     if(!isNull(price) && price == 0) {
            return "0.00";
        }else{
         return outputmoney(price);
		}
      
});



function outputmoney(number) {
	if (isNaN(number) || number == "") return "";
	number = Math.round(number * 100) / 100;
	if (number < 0)
		return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
	else
		return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}
//格式化金额 
function outputdollars(number) {
	if (number.length <= 3)
		return (number == '' ? '0' : number);
	else {
		var mod = number.length % 3;
		var output = (mod == 0 ? '' : (number.substring(0, mod)));
		for (i = 0; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod + 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
}
function outputcents(amount) {
	amount = Math.round(((amount) - Math.floor(amount)) * 100);
	return (amount < 10 ? '.0' + amount : '.' + amount);
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


function toFavorites(){
    openPage("收藏夹", "../customer/favorites.html", "1");
}
function doCancle(){
    $(".fc_pop").hide();
    setTimeout("$('#balance').css('pointer-events','auto');",500);
}


//纤币抵用金额
function getCanUseScoreAmt(){
	
}

function mxShow(){
	$("#amtMx").show();
	$("#amtMx .fc_close").attr("onclick", "mxHide()");
}

function mxHide(){
	$("#amtMx").hide();
}
