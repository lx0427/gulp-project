$(function() {
     queryData();
    $(".rule_close").click(function() {
        $(".rule11").hide();
    });

});

var isLogin = false; // 是否登录
var auctiondata = "";
var interval;
var login_mbname = '';
var mxList = "";
var flag03 = "";

var  title="";
var  content="";
var  wxUrl=""; // 取当前页面地址    
var  imageUrl="";

function queryData() {
    var url = requestPath + "/m/auction/auctionInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        
				login_mbname = d.mbname;
				
        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }

        $("#main").html(template('main_page', d));
        auctiondata = d.data;
		mxList=d.mxList;
		flag03=d.flag03;

      if(d.flag03==1){
		showRule12();
        }

		if(null!=data.bond&&data.bond.status == 120){
        showRule13();
        }

		timenum = 1000;
        clearInterval(interval);
		if(d.data.status==0){
		 interval = setInterval(countdown, 1000);
        }
       
        $("#footer").show();
       
       	var bill=$("#auctionId").val();
	    var url = window.location.href;
        if ( !isNull(d.bean)&&!isNull(d.bean.flag04)&&d.bean.flag04==2) {
        scanRecord(96,1,bill,url,d.data.pm+"-"+d.data.cz+"-"+d.data.gg+"-"+d.data.cd+"-"+d.data.wzid);
        }else{  
        scanRecord(1,1,bill,url,d.data.pm+"-"+d.data.cz+"-"+d.data.gg+"-"+d.data.cd+"-"+d.data.wzid);
        }
		
	    setTimeout(timeRefresh,5000);
		

		//配置分享链接

		if(null!=d.data){
		  title=d.exAuctionActivity.auctionName;
          content=d.exAuctionActivity.shareContent;
          wxUrl = location.href; // 取当前页面地址    
          imageUrl=filePath+d.exAuctionActivity.shareImg;
          shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);
		}
		     
    });
}

function timeRefresh() {
    var url = requestPath + "/m/auction/auctionInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        
				login_mbname = d.mbname;
				
        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }

        $("#main").html(template('main_page', d));
        auctiondata = d.data;
		mxList=d.mxList;
		timenum = 1000;
        clearInterval(interval);
		if(d.data.status==0){
		 interval = setInterval(countdown, 1000);
        }
       
        $("#footer").show();
        if(d.data.status==0){
		  setTimeout(timeRefresh,5000);	
        }
      	
		    
		    
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#auctionId").val())) {
        dataMap.auctionId = $("#auctionId").val();
    }
    if (!isNull($("#auctionmxId").val())) {
        dataMap.auctionmxId = $("#auctionmxId").val();
    }
	if (!isNull($("#flag01").val())) {
        dataMap.flag01 = $("#flag01").val();
    }

    return dataMap;
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

var auctionFlag = false;
var auctionSuccess = false;

function doAuction(auctionId, auctionmxId, price, increasePrice) {
    if(auctionFlag){
        return false;
    }
    
    console.log(login_mbname);
    var tmp_name = $(".shop_table li:first .shop_td").html();
	  console.log(tmp_name);
    if (!isNull(tmp_name)) {
		  console.log(tmp_name);
    	console.log($(".shop_table li:first .shop_td").html().trim());
			var auction_mbname = $(".shop_table li:first .shop_td").html().trim();//已经加价的名称
			if (!isNull(auction_mbname) && !isNull(login_mbname)) {
				if (login_mbname == auction_mbname) {//不能连续出价
					alert('禁止连续出价');
					return false;
				}
			}
    }
    
  
        var url = requestPath + "/m/auction/bidding.htm";
        var dataMap = {};
        dataMap.auctionId = auctionId;
        dataMap.auctionmxId = auctionmxId;
		dataMap.flag03 = flag03;
        dataMap.price = parseFloat(price) + parseFloat(increasePrice);

        auctionFlag = true;
        $.ajaxjsonp(url, dataMap, function(data) {
            auctionSuccess = true;          
            
        }, false, function() {
            auctionFlag = false;  
            // 刷新下
            queryData();          
        });
   
}

function doAuctionflag(auctionId, auctionmxId, price, increasePrice) {
    if(auctionFlag){
        return false;
    }
    
    console.log(login_mbname);
    var tmp_name = $(".shop_table li:first .shop_td").html();
	  console.log(tmp_name);
    if (!isNull(tmp_name)) {
		  console.log(tmp_name);
    	console.log($(".shop_table li:first .shop_td").html().trim());
			var auction_mbname = $(".shop_table li:first .shop_td").html().trim();//已经加价的名称
			if (!isNull(auction_mbname) && !isNull(login_mbname)) {
				if (login_mbname == auction_mbname) {//不能连续出价
					alert('禁止连续出价');
					return false;
				}
			}
    }



    
  
        var url = requestPath + "/m/auction/bidding.htm";
        var dataMap = {};
        dataMap.auctionId = auctionId;
        dataMap.auctionmxId = auctionmxId;
        dataMap.flag03 = flag03;
		
        dataMap.price = parseFloat(price) + parseFloat(increasePrice);
        var jsons = [];
	    for (var i=0;i<mxList.length;i++)
        {
		  var json = {};
		  json.auctionId = mxList[i].auctionId;
          json.auctionmxId = mxList[i].pkid;
		
		  if(null!=mxList[i].bidList&&mxList[i].bidList.length>0){
			   console.log(mxList[i].bidList);
			   json.price = parseFloat(mxList[i].bidList[0].price) + parseFloat(increasePrice);
	      }else{
			   console.log(2222);
		   json.price = parseFloat(mxList[i].price03) + parseFloat(increasePrice);
	      
		  }
           
          jsons[jsons.length] = json;
        }
        dataMap.jsonStr=JSON.stringify(jsons);


        auctionFlag = true;
        $.ajaxjsonp(url, dataMap, function(data) {
            auctionSuccess = true;          
            
        }, false, function() {
            auctionFlag = false;  
            // 刷新下
            queryData();          
        });
   
}



var timenum = 1000;

function countdown() {
    var difference = "0";
    if (null != auctiondata.startMs) {
        var difference = auctiondata.startMs;
    }
    if (null != auctiondata.endMs) {
        var difference = auctiondata.endMs;
    }
    // difference of dates
    difference = difference - timenum;

    // if difference is negative than it's pass the target date
    if (difference < 0) {
        // stop timer
        clearInterval(interval);
        queryData();
        return;
    }
    timenum = timenum + 1000;
    // basic math variables
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    // calculate dates
    var days = Math.floor(difference / _day);

    var hours = Math.floor((difference % _day) / _hour);

    var minutes = Math.floor((difference % _hour) / _minute);

    var seconds = Math.floor((difference % _minute) / _second);
    // fix dates so that it will show two digets
    days = (String(days).length >= 2) ? days : '0' + days;
    hours = (String(hours).length >= 2) ? hours : '0' + hours;
    minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
    seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;



    // set to DOM
    $('#size_time').find('.days').text(days);
    $('#size_time').find('.hours').text(hours);
    $('#size_time').find('.minutes').text(minutes);
    $('#size_time').find('.seconds').text(seconds);
};

function showrule2(remark) {
    $("#rulename").html($.i18n.prop('ai_jpgz'));
    $("#exDiscountRulesList").html(remark);
    $(".rule11").show();
}

function doBid(auctionId, auctionmxId, price, increasePrice) {   
	auctionIdB=auctionId;
	auctionmxIdB=auctionmxId;
	priceB=price;
	increasePriceB=increasePrice;
	$("#price").val(increasePrice); 
    $(".rule22").show();
    $("#price").focus();
}

function doBidflag(auctionId, auctionmxId, price, increasePrice) {   
	auctionIdB=auctionId;
	auctionmxIdB=auctionmxId;
	priceB=price;
	increasePriceB=increasePrice;
	flagB="1";
	$("#price").val(increasePrice); 
    $(".rule22").show();
    $("#price").focus();
}
function doCancel() {
	auctionIdB="";
	auctionmxIdB="";
	priceB="";
	increasePriceB="";
    $(".rule22").hide();

	$(".rule12").hide();
    $(".rule13").hide();
    $(".rule14").hide();
}

var auctionIdB="";
var auctionmxIdB="";
var priceB="";
var increasePriceB="";
var flagB="";

function doOk() {
   $(".rule22").hide();
   var price = $("#price").val();  
   if(!checkNumber("price", 2 , "加价幅度")){
        return false;
    }
   if (parseFloat(price) < parseFloat(increasePriceB)) {
        showMessage("加价幅度["+price+"]小于默认加价幅度["+increasePriceB+"]");
        return false;
    }

   
   if(flagB=="1"){
   doAuctionflag(auctionIdB,auctionmxIdB,priceB,price);
   }else{
   doAuction(auctionIdB,auctionmxIdB,priceB,price);
   }
   
}


function showRule12() {
	 $(".rule12").show();
	 $(".rule13").hide();
     $(".rule14").hide();
}
function showRule13() {
	  $(".rule12").hide();
	  $(".rule13").show();
      $(".rule14").hide();
}
function showRule14(){
     $(".rule14").show();
     $(".rule12").hide();
     $(".rule13").hide();
}

function doShOk() {
       var dataMap = {};
       var url = requestPath + "/m/auction/bonding.htm";
        $.ajaxjsonp(url, dataMap, function(data) {
           showMessage("申请成功");
		   initPage();
         });

      $(".rule12").hide();
      $(".rule13").hide();
      $(".rule14").hide();
}
function shareAppMessage () {
	var url = window.location.href;
    scanRecord(1,2,'',url,'竞拍分享');
}

function shareTimeline () {
  
}
function shareQQ () {
  
}