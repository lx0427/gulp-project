$(function() {
    initPage();
    $(".rule_close").click(function() {
        $(".rule").hide();
    });

    var url = window.location.href;
    scanRecord(2,0,'',url,'优惠拼团');
});


function initPage() {
    $("#pageIndex").val(0);
    $("#list").html(""); 

    queryData();
}
var isLogin = false; // 是否登录，false 未登录， true 已登录
var interval;

var  title="";
var  content="";
var  wxUrl=""; // 取当前页面地址    
var  imageUrl="";

function queryData() {
    var url = requestPath + "/m/resource/groupBuyList.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
       /* console.info(d);
        console.info(JSON.stringify(d));*/
        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }        
        $("#list").append(template('groupBuyList_page', d));        
        clearInterval(interval);        
        interval = setInterval(countdown, 1000);    


		  //配置分享链接

		if(null!=d.data){
		  title=d.data[0].title;
          content=d.data[0].shareContent;
          wxUrl = location.href; // 取当前页面地址    
          imageUrl=filePath+d.data[0].shareImg;
          shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);
		}
    }, true);
}

function showrule3(remark) {
    $("#rulename").html("团购规则");
    $("#exDiscountRulesList").html(remark);
    $(".rule").show();
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
                $("#btn_"+id).val("去拼团");
                $("#btn_"+id).css("background","#f91033");
                $("#btn_"+id).attr("onclick","doGroupBuy('','"+id+"')");
            }else{
                // 已结束
                $("#title_"+id).text("拼团失败");
                $("#btn_"+id).val("已结束");
                $("#btn_"+id).css("background","#a2a0a0");
                $("#btn_"+id).attr("onclick","javascript:;");
                $("#time_"+id).remove();
                $(this).remove();
                return;
            }            
        }
        $(this).val(time);
        $("#time_"+id).text(getTimeStr(time));
    });
  
   
}

function doGroupBuy(parentpkid,mxpkid) {
    // 判断是否登录
    if (!isLogin) {
        eval(loginName);
        return false;
    }
    var url = "";
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        // 已经授权过了
        url = "../customer/groupBuyInfo.html";
    } else {
        // 还未授权
        if (isWeixinBrowse()) {
            url = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiGroupBuy";
        } else {
            url = "../customer/groupBuyInfo.html";
        }
    }
    if (url.indexOf("?") != -1) {
        url += "&pkid=" + mxpkid + "&ppkid=" + parentpkid;
    } else {
        url += "?pkid=" + mxpkid + "&ppkid=" + parentpkid;
    }
    openPage("团购详情", url, "1");
}


function shareAppMessage () {
	 var url = window.location.href;
    scanRecord(2,2,'',url,'拼团分享');
}

function shareTimeline () {
  
}
function shareQQ () {
  
}