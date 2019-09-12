$(function() {
    $(".rule_close").click(function() {
        $(".rule11").hide();
    });


    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        $("#openid").val(wxOpenid);
        queryData();
    } else if(!isNull($("#openid").val())){
    	wxOpenid = $("#openid").val();
        sessionStorage.setItem("wxOpenid", wxOpenid);
        queryData();
    }else {
        getOauthOpenid("initOauth");
    }
});


function initOauth() {
    var wxOpenid = $("#openid").val();
    if (!isNull(wxOpenid)) {
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
    queryData();
}

var interval;



var  title="";
var  content="";
var  wxUrl=""; // 取当前页面地址    
var  imageUrl="";

function queryData() {
    var url = requestPath + "/m/group/buy/groupBuyInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#main").html(template('main_page', d));
        $("#mxid").val(d.data.pkid);
        $("#gbid").val(d.data.gbid);
        if (d.data.status == 1) {
            clearInterval(interval);
            interval = setInterval(countdown, 1000);            
        }
        
        var ppkid = $("#ppkid").val();
        var url = window.location.href;
        scanRecord(2,1,ppkid,url,d.data.pm+"-"+d.data.cz+"-"+d.data.gg+"-"+d.data.cd+"-"+d.data.wzid);


		  //配置分享链接

		if(null!=d.data){
		  title=d.exGroupBuy.title;
          content=d.exGroupBuy.shareContent;
          
		  // 还未授权
         if (isWeixinBrowse()) {
            wxUrl = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiGroupBuy";
         } else {
            wxUrl = window.location.href; // 取当前页面地址
         }
         if (wxUrl.indexOf("?") != -1) {
         wxUrl += "&pkid=" + d.data.pkid + "&ppkid=" + ppkid;
         } else {
         wxUrl += "?pkid=" + d.data.pkid + "&ppkid=" + ppkid;
         }
         imageUrl=filePath+d.exGroupBuy.shareImg;
          shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);
		}
    });
}

function getDataMap() {
    var dataMap = {};
    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
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
        var n = str.length;
        if (n % 2 == 0) {
            var str1 = str.substring(0, n / 2 - 2);
            var str2 = str.substring(n / 2 + 2, n);
            return str1 + "****" + str2;
        } else {
            var n = str.length + 1;
            var str1 = str.substring(0, n / 2 - 3);
            var str2 = str.substring(n / 2 + 1, n - 1);
            return str1 + "****" + str2;
        }
    } else {
        if (str.length == 5) {
            var str1 = str.substring(0, 1);
            var str2 = str.substring(4, 5);
            return str1 + "***" + str2;
        }
        if (str.length == 4) {
            var str1 = str.substring(0, 1);
            var str2 = str.substring(3, 4);
            return str1 + "**" + str2;
        }
        if (str.length == 3) {
            var str1 = str.substring(0, 1);
            var str2 = str.substring(2, 3);
            return str1 + "*" + str2;
        }
        if (str.length == 2) {
            var str1 = str.substring(0, 1);
            return str1 + "*";
        }
        if (str.length == 1) {
            return "*";
        }

    }
    return str;
});

var groupBuyFlag = false;
var groupBuySuccess = false;

function doGroupBuy() {    
    $(".rule22").show();
    $("#sl").focus();
}

function doOk() {
    if(groupBuyFlag){
        return false;
    }
    var url = requestPath + "/m/group/buy/join.htm";
    var dataMap = {};
    dataMap.mxid = $("#mxid").val();

    var sl = $("#sl").val();  
    var typ = $("#typ").val();  
    var len = 0;
    if(typ == "2"){
        len = 3;
    }
    if(!checkNumber("sl", len , "团购量")){
        return false;
    }
    var maxsl = $("#maxsl").val();
    if (parseFloat(sl) > parseFloat(maxsl)) {
        showMessage("本次拼团量["+sl+"]大于团购剩余量["+maxsl+"]");
        return false;
    }

    dataMap.sl = $("#sl").val();
    dataMap.gbid = $("#gbid").val();
    var openid = $("#openid").val();
    if(!isNull(openid)){
        dataMap.openid = openid;
    }
    groupBuyFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        groupBuySuccess = true;
    }, false, function() {
        groupBuyFlag = false;
        // 刷新下
        if(groupBuySuccess){
            $(".rule22").hide();
            groupBuySuccess = false;
            queryData();
        }        
    });
}

function doCancel() {
    $(".rule22").hide();
}


function countdown() {
    $(".time").each(function(){
        var id = $(this).attr("id");
        var time = $(this).val();
        time = time - 1000;
        if(time < 0 ){
            // 获取下结束时间
            var endMs = $("#endMs_"+id).val();
            if(!isNull(endMs) && endMs > 0){
                // 未开始转为开始
                time = endMs;
                $("#endMs_"+id).remove();
                $("#title_"+id).text("结束倒计时");
                $("#btn_"+id).val("我要拼团");
                $("#btn_"+id).css("background","#f91033");
                $("#btn_"+id).attr("onclick","doGroupBuy()");
            }else{
                // 已结束
                // $("#title_"+id).text("拼团失败");
                // $("#btn_"+id).val("已结束");
                // $("#btn_"+id).css("background","#a2a0a0");
                // $("#btn_"+id).attr("onclick","javascript:;");
                // $("#time_"+id).remove();
                // $(this).remove();
                queryData();
                return;
            }            
        }
        $(this).val(time);
        $("#time_"+id).text(getTimeStr(time));
    });    
}

function showrule2(remark) {
    $("#rulename").html("团购规则");
    $("#exDiscountRulesList").html(remark);
    $(".rule11").show();
}

function shareAppMessage () {
	 var url = window.location.href;
    scanRecord(2,2,'',url,'拼团分享');
}

function shareTimeline () {
  
}
function shareQQ () {
  
}