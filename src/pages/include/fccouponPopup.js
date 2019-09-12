
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

var fccouponFlag = false;
function getCanUseFcCouponList() {
    if(fccouponFlag){
        return;
    }
    fccouponFlag = true;
    var url = requestPath + "/m/coupon/getCanUseFcCouponList.htm";

	console.log(url);
    var dataMap = {};
	 dataMap.language=i18nLanguage;
    var customerId = $("#customerId").val();
    if (!isNull(customerId)) {
        dataMap.hydm = customerId;
    }
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#fccouponList").html(template('fccouponList_page', d));
		execI18n();
    }, false, function(){
        fccouponFlag = false;
    });
}

function showFcCouponPopup() {    
    $("#fccouponPopup").popup();
}

/**
* 选择优惠券
* @param couponCode         -- 优惠券代码
* @param couponName         -- 优惠券名称
* @param couponAmt          -- 优惠券金额
* @param couponLimitMinAmt  -- 优惠券最低满足金额
*/
function chooseFcCoupon(couponCode, couponName, freeDays) {
    // 本次订单金额
    var amt = $("#totalAmt").html();
    if(isNull(amt)){
        amt = 0;
    }
    if(parseFloat(amt) < parseFloat(couponLimitMinAmt)){
        showMessage("本次选购金额低于免息券最低金额，不能使用");
        return false;
    }
    //$("#couponType").val(1);
    $("#fccouponCode").val(couponCode);
    $("#fccouponName").val(couponName);
	$("#freeDays").val(freeDays);
    //$("#couponAmt").val(couponAmt);
    //$("#couponLimitMinAmt").val(couponLimitMinAmt);
    $("#fccouponText").val(couponName+":免息"+freeDays+"天");
    //$("#couponAmtHtml").html("(优惠"+couponAmt+"元)");

    $.closePopup();
}

