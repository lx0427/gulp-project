$(function() {
    var url = window.location.href;
    scanRecord(20,0,'',url,'我的竞拍');
   queryData();
});

function queryData() {
    var url = requestPath + "/m/auction/auctionList.htm";
    var dataMap = getDataMap();
	$.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		if(d.type==1){
         var dlist=d.data;
		 var auctionId=""
		 for (var i=0;i<dlist.length;i++)
         {
            if(auctionId==dlist[i].auctionId){
               dlist[i].atyp="0";
           }else{
               dlist[i].atyp="1";
           }
           auctionId=dlist[i].auctionId;
           console.log(auctionId); 
           console.log(dlist[i].atyp);         
       }
       d.data=dlist;
           

         if (pullRefresh) {
            $("#list").html(template('list_page1', d));
        } else {
            $("#list").append(template('list_page1', d));
        }
	    }
        if(d.type==2){
         if (pullRefresh) {
            $("#list").html(template('list_page2', d));
        } else {
            $("#list").append(template('list_page2', d));
        }
	    }

        }, true, function() {
		  
     });
}


function loadData(t) {
 $("#type").val(t);

 $("#pageIndex").val(0);
 $("#list").html("");
 if(t=="1"){
 $("#input2").removeClass("input_class_current");
 $("#input1").addClass("input_class_current");

 $("#input1").removeClass("input_class_nocurrent");
 $("#input2").addClass("input_class_nocurrent");
  }
 if(t=="2"){
 $("#input1").removeClass("input_class_current");
 $("#input2").addClass("input_class_current");

 $("#input2").removeClass("input_class_nocurrent");
 $("#input1").addClass("input_class_nocurrent");
  }


    var url = requestPath + "/m/auction/auctionList.htm";
    var dataMap = getDataMap();
	
	 $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		
         if(d.type==1){
         var dlist=d.data;
		 var auctionId=""
		 for (var i=0;i<dlist.length;i++)
           {
			 if(auctionId==dlist[i].auctionId){
				 dlist[i].atyp="0";
			 }else{
				 dlist[i].atyp="1";
			 }
			 auctionId=dlist[i].auctionId;
			 console.log(auctionId); 
             console.log(dlist[i].atyp);         
           }
		   d.data=dlist;
		   }
        

        if(d.type==1){
         if (pullRefresh) {
            $("#list").html(template('list_page1', d));
        } else {
            $("#list").append(template('list_page1', d));
        }
	    }
        if(d.type==2){
         if (pullRefresh) {
            $("#list").html(template('list_page2', d));
        } else {
            $("#list").append(template('list_page2', d));
        }
	    }
        
        }, true, function() {
		  
     });
}

function getDataMap() {
    var dataMap = {};
	if (!isNull($("#type").val())) {
		 dataMap.type = $("#type").val();
    }else{
		dataMap.type="1";
	}
	dataMap.circleId=circleId;
    return dataMap;
}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");

    queryData();
}
function toInvalid() {
    openPage("优惠券", "../customer/invalidCouponList.html", "1");
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
template.helper("getData", function(str) {
    if (isNull(str)) {
        return;
    }
    if(!isNaN(str)){
        str = "恒逸自营";
    }
	return str;
});



var buyFlag = false;
function doBuy(activityId, activityMxId, wzid, depid, salesType) {
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};    
    dataMap.orderType = "0";
    dataMap.activityId = activityId;
    dataMap.activityMxId = activityMxId;
    dataMap.couponType = "3";
    dataMap.circleId=circleId;
    buyFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {

        var d = eval(data);
        scanShopping(d.data);//记录商品添加到购物车操作
        // 购买成功，到购物车页面
        gotoShoppingCart(activityId, activityMxId, wzid, depid, salesType,0);
        
    }, false, function() {
        buyFlag = false;       
    });
}
function doBuyflag(activityId, activityMxId, wzid, depid, salesType, flag01) {
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};    
    dataMap.orderType = "0";
    dataMap.activityId = activityId;
	dataMap.activityMxId = activityMxId;
	dataMap.activityflag01 = flag01;
    dataMap.couponType = "3";
    dataMap.circleId=circleId;
    buyFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {       
        var d = eval(data);
        // 购买成功，到购物车页面
        gotoShoppingCart(activityId, activityMxId, wzid, depid, salesType,flag01);
        
        scanShopping(d.data);//记录商品添加到购物车操作
    }, false, function() {
        buyFlag = false;       
    });
}


function doLd(activityId, activityMxId,flag01) {
    openPage("优惠券", "../customer/lotteryDrawInfo.html?auctionId="+activityId+ "&auctionmxId="+activityMxId+ "&flag01="+flag01, "1");
}



function gotoShoppingCart(activityId, activityMxId, wzid, depid, salesType,flag01) {
    var url = "";
    var params = "activityId=" + activityId + "&couponType=3&couponCode=" + activityMxId + "&wzid=" + wzid + "&depid=" + depid + "&salesType=" + salesType+ "&flag01=" + flag01;
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
    if (!isNull(params)) {
        if (url.indexOf("?") != -1) {
            url += "&" + params;
        } else {
            url += "?" + params;
        }
    }
    openPage("购物车", url, "1");
}


var auctionFlag = false;
var auctionSuccess = false;
function doAuction(auctionId,auctionmxId) {
   

	var url = requestPath + "/m/auction/participate.htm";
    var dataMap = {};
    dataMap.auctionId = auctionId;
    dataMap.auctionmxId = auctionmxId;
	dataMap.circleId=circleId;
    auctionFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        auctionSuccess = true;
        // 到竞拍详情页面
       openPage("竞拍详情", "../customer/auctionInfo.html?auctionId="+auctionId+ "&auctionmxId="+auctionmxId, "1");
    }, false, function() {
        // 失败了才进行刷新，成功不刷新
        if(!auctionSuccess){
            auctionFlag = false;       
         }      
    });
	
}
template.helper("getName", function(str) {
    if (isNull(str)) {
        return "";
    }
	
    if (str.length > 5) {
	   var n=str.length;
	   if(n%2 ==0){
	   var str1 = str.substring(0, n/2-2);
	   var str2 = str.substring(n/2+2, n);
	   return str1+"****"+str2;
	   }else{
	   var n=str.length+1;
       var str1 = str.substring(0, n/2-3);
	   var str2 = str.substring(n/2+1, n-1);
	   return str1+"****"+str2;
	   }
	}else{
	 if (str.length == 5) {
	   var str1 = str.substring(0,1);
	   var str2 = str.substring(4,5);
	   return str1+"***"+str2;
	 }
	 if (str.length == 4) {
	   var str1 = str.substring(0,1);
	   var str2 = str.substring(3,4);
	   return str1+"**"+str2;
	 }
	 if (str.length == 3) {
	   var str1 = str.substring(0,1);
	   var str2 = str.substring(2,3);
	   return str1+"*"+str2;
	 }
	 if (str.length == 2) {
	   var str1 = str.substring(0,1);
	   return str1+"*";
	 }
	 if (str.length == 1) {
	   return "*";
	 }
	
	}
	return str;
});