$(function() {
    wxconfig();
    scanRecord(93,0,'',uri,'客户专访');
    initPage(); 
   
});
function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData(); 
}

var uri = window.location.href;
var definedt1;
var definedt2;
var definedt3;
var definedt4;
var definedt5;

function queryData() {
     var url = requestPath + "/m/interview/list.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data); 
        if(scrollLoading){
            d.recordCount = d.recordCount - (($("#pageIndex").val()-1) * 10)
             $("#list").append(template('list_page', d));
        }else{
            $("#list").html(template('list_page', d));
            //顶部横幅
            if(!isNull(d.otherBanner) && d.otherBanner.length>0){   
            $("#wx_banner").html(template('otherBanner_page', d));
             $(".swiper-container").swiper({
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    autoplay: 5000
                });
             $("#obanner").attr("src", $('#obanner').attr("src")).load(function() {
                   var realHeight = this.height;
                   var hy =  (parseInt(realHeight)-1)+'px';
                });  
            }
            if(d.data.length<3){
                $("#botbox").css('position','absolute');
            }
            if(!isNull(d.temp.color) && d.temp.color.length>0){
                $("#botbox").css('background-color',d.temp.color);
            }
        }

          imageUrl=filePath+d.temp.imgUrl;
         shareTitle = d.temp.essayTitle;
         shareContent = d.temp.essayUrl;
         shareUri = location.href;
          shareWx0(shareTitle,shareContent, shareUri, imageUrl, shareUri, shareUri);
        }, true);
}
var imageUrl;
var shareTitle;
var shareContent;
var shareUri;
var intervalId = null
var shareDoNum = 0;
function openVideo(id){
    var a = $("#mark"+id).html(); 
    $("#mark").html(a); 
     $("#mark").show();
    var uri1 = window.location.href;
     //单个视频播放量
    scanRecord(93,2,id+'video',uri1,'客户专访'); 
    //记录到专访表
    scanRecordInterview(id,'0');
}

wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    shareWx0(shareTitle,shareContent, shareUri, imageUrl, shareUri, shareUri);
});
function openRecord(id,url){
    if(!isNull(url)){
        var uri2 = window.location.href;
        //单个推文点击量
        scanRecord(93,2,id+'title',uri2,'客户专访'); 
        //记录到专访表
        scanRecordInterview(id,'1');
        window.location.href = url;
    }
}
function doCancelPolicy(id){
    $("#mark").hide();
    $("#mark").html(''); 
}

function getDataMap() {
    var dataMap = {};
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

function toLinkUrl(title, linkUrl) {
    if (isNull(linkUrl)) {
        return false;
    }
    setTimeout(function() {
        openPage(title, linkUrl, "1");
    }, 500);

    // 统计
    var url = requestPath + "/m/home/statistics/record.htm";
    var dataMap = {};
    dataMap.hsName = title;
    dataMap.hsUrl = linkUrl;
    dataMap.hsType = 1;
    $.ajaxjsonp(url, dataMap, function(data) {

    }, false);
}

function shareAppMessage () {
    // showMessage("分享成功");
    //分享成功回调
    scanRecord(93,1,'',uri,'客户专访');
}

function shareTimeline () {
    // showMessage("分享成功");
    scanRecord(93,1,'',uri,'客户专访');
  
}
function shareQQ () {
    // showMessage("分享成功");
    scanRecord(93,1,'',uri,'客户专访');
}

function scanRecordInterview(id,str00){
    var url = requestPath + "/m/interview/saveRecord.htm";
    var dataMap = {};
    dataMap.eid = id;
    dataMap.str00 = str00;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
    });
}