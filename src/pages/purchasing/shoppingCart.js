$(function() {
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if(!isNull(wxOpenid)){
        $("#openid").val(wxOpenid);
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

function queryData() {
    var url = requestPath + "/m/shopping/list.htm";
    var dataMap = {};
	dataMap.type = "excipient";
    var customerId = $("#customerId").val();
    if (!isNull(customerId)) {
        dataMap.customerId = customerId;
    }


    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);

        if (!isNull(d.data) && d.data.length > 0) {
            $(".wx_btnjs").show();
        } else {
            $(".wx_btnjs").hide();
            $(".totalpri").hide();
        }
        $("#main").html(template('main_page', d));





    });
}


function doCheck(pkid) {
    if ($("#" + pkid).hasClass("current")) {
        $("#" + pkid).removeClass("current");
    } else {
        $("#" + pkid).addClass("current");
    }

    // 计算合计数
    totalSl2();
    totalAmt();

    // 判断下是否是同一个订单，如果是多个订单清空优惠信息
    var b = true;
    var oldCfxx = "";
    $(".wx_tasdelist .current").each(function() {       
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
        clearCoupon();
    }
}

function totalSl2() {
    var totalSl2 = 0;
    $(".wx_tasdelist .current").each(function() {
        var pkid = $(this).attr("id");
        var sl02 = $("#sl02_" + pkid).val();
        if (!isNull(sl02)) {
            totalSl2 = accAdd(totalSl2, sl02);
        }
    });
    $("#totalSl2").html(totalSl2);
}

function totalAmt() {
    var totalAmt = 0;

    $(".wx_tasdelist .current").each(function() {
        var pkid = $(this).attr("id");

        var sl02 = $("#sl02_" + pkid).val();
        var price = $("#price_" + pkid).html();
        if (!isNull(sl02)) {
            totalAmt = accAdd(totalAmt, parseFloat(sl02) * parseFloat(price));
            $("#amt_" + pkid).html(parseFloat(parseFloat(sl02) * parseFloat(price)).toFixed(2));
          }
       
    });

    $("#totalAmt").html(parseFloat(totalAmt).toFixed(2));

    var couponType = $("#couponType").val();
    if(!isNull(couponType)){
        if(couponType == "1"){
            // 判断下金额是否小于优惠最低金额，是的话清空优惠信息
            var couponLimitMinAmt = $("#couponLimitMinAmt").val();
            if(!isNull(couponLimitMinAmt) && parseFloat(couponLimitMinAmt) > 0){
                if(parseFloat(totalAmt) < parseFloat(couponLimitMinAmt)){
                    clearCoupon();
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
        $("#" + pkid).addClass("current");
    }
    // 判断下值
    if (!checkNumber("sl02_" + pkid, 3, "重量")) {
        return false;
    }
    // 统计总重量
    totalSl2();
    totalAmt();
	updateShopping();
    
}

// 修改数量
function changeSl1(pkid) {
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        $("#" + pkid).addClass("current");            
    }

   

    // 根据数量计算出重量
    var sl01 = $("#sl01_"+pkid).val();
    if(sl01.length > 0){
        if (!checkNumber("sl01_" + pkid, 0, "桶数")) {
            return false;
        }
        var dz = $("#packstr_" + pkid).val();
        if (isNull(dz)) {
            // 切片，锦纶切片
            dz = $("#packstr_" + pkid + " .curr").attr("val");
        }
        
        if (!isNull(dz)) {
            var sl02 = accMul(sl01, dz);
			$("#sl02_" + pkid).val(sl02);
        }        
    }  
        
    // 统计总重量
    totalSl2();
    totalAmt();
    updateShopping();

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
        $("#" + pkid).addClass("current");            
    }
    updateShopping();
    
}



function doSubmit() {
    if (!checkValue()) {
        return false;
    }
    confirmMsg("我已确认此订单信息准确无误，确定提交订单？", function() {
            // 提交订单
            createbill();
       
    });
}

function createbill() {
    var url = requestPath + "/m/createOrder/createbill.htm";
    var dataMap = getOrderDataMap();
	dataMap.blly='11';
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showOk("订单提交成功", function() {
            if (!isNull(d.isSalesman) && d.isSalesman === 1) {
                openPage("工作台", "../salesman/workbench.html", "1");
            } else {
                openPage("我的", "../customer/my.html", "1");
            }
        });
    });
}

function checkValue() {
    if ($(".wx_tasdelist .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    var couponType = $("#couponType").val();
    var b = true;
    $(".wx_tasdelist .current").each(function() {
        var id = $(this).attr("id");

		if (!checkNumber("sl01_" + id, 0, "桶数")) {
            b = false;
            return false;
        }
        if (!checkNumber("sl02_" + id, 3, "重量")) {
            b = false;
            return false;
        }

 
    });
    if (!b) {
        return false;
    }
 

    return true;
}


 function getOrderDataMap() {
    var dataMap = {};
    
    dataMap.wxOpenid = $("#openid").val();
    var jsons = new Array();
    $(".wx_tasdelist .current").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.pkid = id;
        json.cfxx = $("#cfxx_" + id).val();
        jsons[jsons.length] = json;
    });
    dataMap.jsonstring = JSON.stringify(jsons);

    return dataMap;
}

function deleteShopping(gpls, wzid) {
    if (isNull(gpls)) {
        showMessage("请选择资源");
        return false;
    }
    var dataMap = {};    
    dataMap.wzid = wzid;
    dataMap.gpls = gpls;
    dataMap.type = "excipient";

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

        $(".wx_tasdelist li").each(function() {
            $(this).removeClass("current");
        });
    } else {
        $(obj).parent().addClass("current");

        $(".wx_tasdelist li").each(function() {
            $(this).addClass("current");            
        });
    }

    totalSl2();
    totalAmt();   
}

// 显示优惠券列表
function showCouponList(){
    if ($(".wx_tasdelist .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    // 判断下是几个订单
    var b = true;
    var oldCfxx = "";
    $(".wx_tasdelist .current").each(function() {       
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
        showMessage("选择的资源包含多个订单，不能使用优惠券");
        return false;
    }

    showCouponPopup();
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
function getJsonString() {
    var jsons = [];
    $(".wx_tasdelist .current").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.pkid = id;
        json.sl01 = $("#sl01_" + id).val();
        json.sl02 = $("#sl02_" + id).val();
		json.remark = $("#remark_" + id).val();

        jsons[jsons.length] = json;
    });
    return JSON.stringify(jsons);
}