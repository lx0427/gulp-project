$(function() {
    getCanUseCouponList();
});
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

var couponFlag = false;
var couponProductList;
function getCanUseCouponList() {
    if(couponFlag){
        return;
    }
    couponFlag = true;
    var url = requestPath + "/m/coupon/getCanUseCouponList.htm";
    var dataMap = {};
	 dataMap.language=i18nLanguage;
    var customerId = $("#customerId").val();
    //增加对产品的判断
    var jsons = new Array();
    $(".wx_tasdelist .isChecked").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.gpls = $("#gpls_" + id).val();
        json.pm = $("#pm_" + id).val();
        var differentiation = $("#differentiation_" + id).val();
        if(isNull(differentiation)){
            json.differentiation = 0
        }else{
            json.differentiation = differentiation;
        }
        jsons[jsons.length] = json;
    });
    dataMap.jsonstring = JSON.stringify(jsons);
    if (!isNull(customerId)) {
        dataMap.hydm = customerId;
    }
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#couponList").html(template('couponList_page', d));
        if(d==null||d.data==null||d.data.length<=0){
            $("#confirmOrderCoupon").html("无");
            $("#confirmOrderCoupon").attr("onclick","javaScript:;");
        }
        if(!isNull(d.couponProductJsons)){
            couponProductList = d.couponProductJsons.split('],');
            // console.log(d.couponProductJsons);
            // console.log(couponProductList);
        }else{
            couponProductList="";
        }
		execI18n();
    }, false, function(){
        couponFlag = false;
    });
}

function showCouponPopup() {    
    $("#couponPopup").popup();
   // getCanUseCouponList();
}

/**
* 选择优惠券
* @param couponCode         -- 优惠券代码
* @param couponName         -- 优惠券名称
* @param couponAmt          -- 优惠券金额
* @param couponLimitMinAmt  -- 优惠券最低满足金额
*/
function chooseCoupon(couponCode, couponName, couponAmt, couponLimitMinAmt,ruleId) {
    // 本次订单金额
    var amt = $("#totalAmt").html();
    if(isNull(amt)){
        amt = 0;
    }
    if(!isNull(ruleId)){
        if(isNull(couponProductList) || couponProductList.length==0){
            showMessage("此优惠券限指定商品使用,购物车中没有对应商品,不能使用");
            return false;
        }else{
            amt = 0;
             for(var i =0;i<couponProductList.length;i++){
                if(couponProductList[i].indexOf(ruleId+':')!=-1){
                    $(".wx_tasdelist .current").each(function() {
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
                showMessage("本次可用产品选购金额低于优惠券最低金额，不能使用");
                return false;
            }
        }
    }
    if(parseFloat(amt) < parseFloat(couponLimitMinAmt)){
        showMessage("本次选购金额低于优惠券最低金额，不能使用");
        return false;
    }
    $("#couponType").val(1);
    $("#couponCode").val(couponCode);
    $("#couponName").val(couponName);
    $("#couponAmt").val(couponAmt);
    $("#ruleId").val(ruleId);
    $("#couponLimitMinAmt").val(couponLimitMinAmt);
    $("#couponText").val(couponName+":"+couponAmt+"元");
    $("#couponAmtHtml").html("(优惠"+couponAmt+"元)");

	$("#useScore div").removeClass("on");
    $.closePopup();
}

