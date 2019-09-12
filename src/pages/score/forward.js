$(function() {
    queryData();


});
var imageUrl;
var shareTitle =222;
var shareContent =222 ;
var shareUri ;
var isLogin = false; // 是否登录
function queryData() {
    var url = requestPath + "/m/score/forward/forwardList.htm";
    var dataMap = {};
    dataMap.pageSize = 20;
    currentAjax  = $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       account = d.account;
       // console.log(d.signMap.today.dataString);
       if(!isNull(d.data)){
            if(scrollLoading){
                $("#list").append(template('list_page', d));
            }else{
                 $("#list").html(template('list_page', d));
            }
            $("#timemd5").val(account.timemd5);
        }else{
            $("#list").html("<div style='text-align: center; margin-top: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
        }

    },true,function(){
    });
}

        

function openLink(url){
    window.location.href = url;
}
function showForward(id,url,title,content,img){
    // $("#pkid").val(id);
    openPage('转发详情','./forwardInfo.html?pkid='+id,1);
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
    var id = $("#articleId").val();
    if (!isNull($("#articleId").val())) {
        dataMap.articleId = $("#articleId").val();
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
        $("#timemd5").val(d.account.timemd5);
        showMessage("分享成功，奖励2000纤币");
        $("#"+id).removeClass('xbdh_btn');
        $("#"+id).html('已转发');
    });
}

