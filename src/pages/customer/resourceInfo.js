$(function() {
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


var isLogin = false; // 是否登录
function queryData() {
    var url = requestPath + "/m/resource/resourceInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if(!isNull(d.shoppingNum)){
            $("#gwcsl").html("("+d.shoppingNum+")");
        }
        if(!isNull(d.isLogin)){
            isLogin = d.isLogin;
        }
        
        $("#main").html(template('main_page', d));

        // 切片的箱包净重
        if(!isNull(d.packstrList)){
            $("#packstr em").bind("click", function() {
                $("#packstr em").removeClass("current");
                $(this).addClass("current");
				var packNum =$("#packstr .current").attr("val");
				 $("#packNum").val(packNum);
				 changeSl1();
			 });
        }      
            
        $("#footer").show();
        
        var bill= $("#wzid").val();
		    var url = window.location.href;
		    
		    scanRecord(1,1,bill,url,d.data.pm+"-"+d.data.cz+"-"+d.data.gg+"-"+d.data.cd+"-"+d.data.wzid);
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#wzid").val())) {
        dataMap.wzid = $("#wzid").val();
    }
    if (!isNull($("#depid").val())) {
        dataMap.depid = $("#depid").val();
    }
    if (!isNull($("#salesType").val())) {
        dataMap.salesType = $("#salesType").val();
    }

    return dataMap;
}

var saveFlag = false;

function saveShopping() {
    if(!isLogin){
        eval(loginName);
        return false;
    }
    if (saveFlag) {
        return false;
    }
    saveFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = getDataMap();
    dataMap.orderType = "0";
    dataMap.sl02 = $("#sl02").val();    
    dataMap.sl01 = $("#sl01").val();
    dataMap.packstr = $("#packstr .current").attr("val");
    dataMap.remark = $("#remark").val();
    dataMap.lsxs = $("#lsxs").val();

    $.ajaxjsonp(url, dataMap, function(res) {
        showOk("已加入购物车");
        scanShopping(res.data);//记录商品添加到购物车操作
    }, false, function() {
        saveFlag = false;
    });
}

function saveShoppingAndtoShoppingCart() {
    if(!isLogin){
        eval(loginName);
        return false;
    }
    if (saveFlag) {
        return false;
    }
    saveFlag = true;
    if (!checkNumber("sl02", 3, "重量")) {
        saveFlag = false;
        return false;
    }

    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = getDataMap();
    dataMap.orderType = "0";
    dataMap.sl02 = $("#sl02").val();    
    dataMap.sl01 = $("#sl01").val();
    dataMap.packstr = $("#packstr .current").attr("val");
    dataMap.remark = $("#remark").val();
    dataMap.lsxs = $("#lsxs").val();

    $.ajaxjsonp(url, dataMap, function(data) {
        scanShopping(d.data);//记录商品添加到购物车操作
        toShoppingCart();
    }, false, function() {
        saveFlag = false;
    });
}

// 关注
function doFocus(){
    var url = requestPath + "/m/resource/doFocus.htm";
    var dataMap = {};
    dataMap.gpls = $("#gpls").val();
    dataMap.wzid = $("#wzid").val();

    $.ajaxjsonp(url, dataMap, function(data){
        $("#focus").html("已收藏");
        $("#focus").attr("onclick","javascript:cancelFocus();");
        $("#focus").removeClass("focus").addClass("yfocus");
    });
}
function cancelFocus(){ 
    confirmMsg("确定取消收藏此物品吗?", function() {
        var url = requestPath + "/m/resource/cancelFocus.htm";
        var dataMap = {};
        dataMap.gpls = $("#gpls").val();
        dataMap.wzid = $("#wzid").val();

        $.ajaxjsonp(url, dataMap, function(data){
            $("#focus").html("收藏");
            $("#focus").attr("onclick","javascript:doFocus();");
            $("#focus").removeClass("yfocus").addClass("focus");
        });
    });
}
// 修改重量
function changeSl2() {
    
    // 判断下值
    if (!checkNumber("sl02", 3, "重量")) {
        return false;
    }
    updateShopping();
}
// 修改数量
function changeSl1() {
    console.log('计算重量');
    //双兔cd=AA的产品加入限定条件
    var cd = $("#cd").val();
    var depid = $("#depid").val();

    // 根据数量计算出重量
    var sl01 = $("#sl01").val();
    if(sl01.length > 0){
         console.log('重量为'+sl01);
        if (!checkNumber("sl01" , 0, "箱包数")) {
            console.log('重量为0');
            return false;
        }
        var dz = $("#packNum").val();
        if (isNull(dz)) {
            console.log('重量dz');
            // 切片，锦纶切片
            dz =  $("#packstr .current").attr("val");
        }
          if (cd=="AA" && parseFloat(sl01)>100 && depid=="9700") {//测试AA产品
            console.log('重量AA');
            sl01=100;
            $("#sl01").val("100");
            $("#sl01").blur();
            showMessage("该产品每单最多可下100包");
        }
        if (!isNull(dz)) {
            console.log('输出重量1');
            var sl02 = accMul(sl01, dz);
            $("#sl02").val(sl02);
            console.log('输出重量2'+sl02);
        }  
        console.log('重量计算结束');      
    } else{

     console.log('未输入重量'); 
    }   
    // 统计总重量
    //totalSl2();
    //totalAmt();


   
	  updateShopping();
	
    

       
    
}


function updateShopping() {
     if(!isLogin){
        eval(loginName);
        return false;
    }
    if (saveFlag) {
        return false;
    }
 
    saveFlag = true;
    var url = requestPath + "/m/shopping/saveOrUpdateShopping.htm";
    var dataMap = getDataMap();
    dataMap.orderType = "0";
    dataMap.sl02 = $("#sl02").val();    
    dataMap.sl01 = $("#sl01").val();

    dataMap.packstr = $("#packstr .current").attr("val");
    dataMap.remark = $("#remark").val();
    dataMap.lsxs = $("#lsxs").val();
    var id =  $("#pkid").val();
    $.ajaxjsonp(url, dataMap, function(data) {
     if (isNull(id)) {
     queryData();
	 }
       
    }, false, function() {
        saveFlag = false;
    });
}
function timeRefresh() {
 flag=false;
}
var fcOrderFlag = 0; //是否选择融资
var flag=false;
function createbill() {

	if (!checkValue()) {
        return false;
    }
    var url = requestPath + "/m/createOrder/createbill.htm";
    var dataMap = getOrderDataMap();
    flag=true;
	 setTimeout(timeRefresh,15000);	
     $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		flag=false;
        showOk("订单提交成功", function() {
            if (!isNull(d.isSalesman) && d.isSalesman === 1) {
                openPage("工作台", "../salesman/workbench.html", "1");
            }else{
                openPage("我的", "../public/orderSucceed.html?fcOrderFlag="+fcOrderFlag, "1");
            }
        });
     }, false, function() {
		  flag=false;
     });
}


function getOrderDataMap() {
    var dataMap = {};
    dataMap.htflag06 ="3";
    dataMap.kpdm = $("#kpdm").val();
    dataMap.kpname = $("#kpname").val();

	var now = new Date();
    dataMap.date10Str =  now.format("yyyy-MM-dd");   
    dataMap.remark = $("#remark").val();
    dataMap.wxOpenid = $("#openid").val();






	var jsons = new Array();
    var id =  $("#pkid").val();
        var json = {};
        json.pkid = id;
        json.cfxx = $("#cfxx").val();
        jsons[jsons.length] = json;
    
    dataMap.jsonstring = JSON.stringify(jsons);




    return dataMap;
}

function checkValue() {
   var b = true;
   if (!checkNumber("sl01", 0, " 箱包数")) {
            b = false;
            return false;
   }
   if (!checkNumber("sl02", 3, "重量")) {
            b = false;
            return false;
   }

       
    if (!b) {
        return false;
    }




    return true;
}

