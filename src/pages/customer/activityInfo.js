$(function() {
    wxconfig();
    var clientRequest = getRequest();
    var pkid = clientRequest["pkid"];
    if (isNull(pkid)) {
        showMessage("参数错误");
        return false;
    }
    queryData(pkid);
    var url = window.location.href;
    scanRecord(66,0,'',url,'活动详情');
});
function queryData(pkid) {
    var url = requestPath + "/m/activityInfo/getActivityList.htm";
    var dataMap = {};
    dataMap.pkid=pkid;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        console.info(d);
        if(d.obj!=null){
            $("#list").append(template('activityList_page', d)); 
            //页面背景色  
            if(d.obj.str01!=null){
                $(".sg").css("background-color",d.obj.str01);
                $(".bg").css("background-color",d.obj.str01);
                $(".yhfw").css("background-color",d.obj.str01);
            }  
            //文字模块背景色
            if(d.obj.str03!=null){
                $(".textbg").css("background-color",d.obj.str03);
            }
            //文字模块字体颜色
            if(d.obj.str02!=null){
                $("#str02").html(d.obj.str02);
            }
            //下方文字颜色
            if(d.obj.str04!=null){
                $(".bottomtext").css("color",d.obj.str04); 
                $(".wx_memday .bot .tit").css("border-top-color",d.obj.str04);
                $("<style type='text/css' id='dynamic-before' />").appendTo("head");
                $("<style type='text/css' id='dynamic-after' />").appendTo("head");
                $("#dynamic-before").text(".wx_memday .bot .tit span::before {background:" + d.obj.str04+ ";}");
                $("#dynamic-after").text(".wx_memday .bot .tit span::after{background:" + d.obj.str04+ ";}");
         }
            //配置分享链接
            var title="";
            var imageUrl="";
            if(d.obj!=null && d.obj.hdname!=null){
                title=d.obj.hdname;
                document.title = d.obj.hdname; 
            }else{ 
                title="活动详情";
            }
            if(d.list1[0]!=null){
                imageUrl=filePath+d.list1[0].imgurl;
            }
            if(imageUrl=="" && d.list2[0]!=null){
                imageUrl=filePath+d.list2[0].imgurl;
            }
            var content="点击查看详情...";
            var wxUrl = window.location.href; // 取当前页面地址  
            if(isWeixinBrowse()){
                shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);
            }
        }else{
            
        }
    },true);
}
function imgClick(url){
    if(url==""){
        return;
    }
    openPage("",url,"1");
}

function shareAppMessage () {
  //分享成功回调
  var url = window.location.href;
    scanRecord(66,1,'',url,'活动详情');
}

function shareTimeline () {
    //分享成功回调
    var url = window.location.href;
    scanRecord(66,1,'',url,'活动详情');
}
function shareQQ () {
    //分享成功回调
    var url = window.location.href;
    scanRecord(66,1,'',url,'活动详情');
}
