$(function() {
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if (!isNull(wxOpenid)) {
        $("#openid").val(wxOpenid);
    }else if(!isNull($("#openid").val())){
    	wxOpenid = $("#openid").val();
        sessionStorage.setItem("wxOpenid", wxOpenid);
    } else {
        getOauthOpenid("initOauth");
    }

    // 业务员二维码
    var matrixUrl = "";
    var userid = $("#userid").val();
    if (!isNull(userid)) {
    	matrixUrl = filePath + "/matrix/" + userid + ".jpg";
    	$("#ewm").attr("src", matrixUrl);
    }

    fxgid = newGuid();

    var title = "客户注册!";
    var content = "注册成为恒逸客户";
    var targetUrl = "";
    var imageUrl = matrixUrl; // 分享图标 这里放业务员二维码

    // 分享链接
    //var fxUrl = window.location.host + "/hengyi-mobile/wx/pages/customer/register.html?userId=" + userid + "&fxgid=" + fxgid;
    var fxUrl = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiRegister&userId="+userid + "&fxgid=" + fxgid + "&fxflag=1";
    var wxUrl = fxUrl;
	var qqUrl = fxUrl;

    //alert("wxUrl:" + wxUrl);

    shareWx00(title, content, targetUrl, imageUrl, wxUrl, qqUrl);
});

// 初始化微信授权id
function initOauth() {
    var wxOpenid = $("#openid").val();
    if (!isNull(wxOpenid)) {
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
}

// 分享给朋友
function shareAppMessage() {
    //alert("回调函数");
	doShare();
}

// 分享到朋友圈
function shareTimeline() {
   doShare();
}

// 分享到QQ
function shareQQ() {
   doShare();
}

// 分享次数记录
var fxgid = "";
function doShare() {
    var url = requestPath + "/m/userShare/saveShare.htm";
    var dataMap = {};
    dataMap.userid = $("#userid").val(); // 业务员id
    dataMap.openid = $("#openid").val();
    dataMap.fxgid = fxgid;
    dataMap.fxflag = 0; // 0 分享成功
    $.ajaxjsonp(url, dataMap, function(data) {

    });
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;    
}

function shareWx00(title, content, targetUrl, imageUrl, wxUrl, qqUrl) {
    // 分享给朋友
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: content, // 分享描述
        link: wxUrl, // 分享链接
        imgUrl: imageUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
            shareAppMessage();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });

    // 分享到朋友圈
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: wxUrl, // 分享链接
        imgUrl: imageUrl, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
            shareTimeline();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });

    // 分享到QQ
    wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: content, // 分享描述
        link: qqUrl, // 分享链接
        imgUrl: imageUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           shareQQ();
        },
        cancel: function () { 
           // 用户取消分享后执行的回调函数
        }
    });
}