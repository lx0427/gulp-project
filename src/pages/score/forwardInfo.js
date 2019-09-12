$(function() {
    if (!isNull($("#link").val())) {
        window.location.href = $("#link").val();
    }else{
        wxconfig();
        queryData();
    }

});
var account;
var imageUrl;
var title ;
var content;
var wxUrl;
function queryData() {
    var url = requestPath + "/m/score/forward/forwardList.htm";
    var dataMap = {};
    dataMap.pageSize = 20;
    if (isNull($("#pkid").val())) {
        showMessage('参数错误');
        setTimeout('history.back(-1)',700);
    }
    dataMap.pkid = $("#pkid").val();
    currentAjax  = $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       account = d.account;
       if(!isNull(d.data)){
            $("#mcover").show();
            title=d.data[0].title;
            content=d.data[0].shareContent;
            wxUrl = window.location.href+"&link="+d.data[0].articleUrl; // 推文地址    
            console.log(wxUrl);
            imageUrl=filePath+d.data[0].shareImg;
            setTimeout(function(){
                if (isWeixinBrowse()) {
                    shareWx0(title, content, '', imageUrl, wxUrl, wxUrl);
                }
            },500);
            
            $("#timemd5").val(account.timemd5);

        }else{ 
            $("#list").html("<div style='text-align: center; margin-top: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
      
            showMessage('未查到推文信息');
            setTimeout("openPage('转发列表','./forward.html',1);",900);
        }

    },false,function(){
    });
}

        

function openLink(url){
    window.location.href = url;
}


function shareAppMessage () {
    //分享成功回调
    doForward();
}

function shareTimeline () {
    doForward();
}
function shareQQ () {
    doForward();
}
function doForward(){
    $("#mcover").hide();
    var url = requestPath + "/m/score/forward/scoreForward.htm";
    var dataMap = {};
    var id = $("#pkid").val();
    if (!isNull($("#pkid").val())) {
        dataMap.articleId = $("#pkid").val();
    }else{
        showMessage('未获取到分享信息！');
        return;
    } 
    if (!isNull($("#timemd5").val())) {
        dataMap.timemd5 = $("#timemd5").val();
    }else{
        showMessage('未获取到分享信息！');
        return;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
         var d = eval(data);
        console.log(d);
        if (d.result==1) {
            showMessage("分享成功，奖励2000纤币");
        }else if (d.result==2) {
            showMessage("分享成功，今天奖励次数已达3次");
        }else{
            showMessage("分享成功");
        }
        
    },false,function(){
        setTimeout("openPage('转发列表','./forward.html',1);",800);
    });
}

