$(function() {
    // 图片上传
    $("#addImg").bind("click", function() {
        // 只能上传1张
        startUploadPics("imgCallback", 1);
    });
    lableClick();
        queryData();
});
var isLogin = false; // 是否登录
function queryData() {
    var url = requestPath + "/m/helpcenter/findMobileHotProblem.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       if(!isNull(d)){
            $("#list").html(template('list_page', d));
            // if(isNull(d.tokenId)){
            //     showMessage("未获取到提交id请刷新页面试试");
            // }else{
                $("#tokenId").val(d.tokenId);
            // }

        }else{
            showMessage("未获取到热门问题列表");
        }
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

function toHelpCenter(){
    openPage("帮助中心", "../helpcenter/helpcenter.html", "1");
}
function openAnswar(pid){    
    openPage("查看答案", "../helpcenter/answar.html?pid="+pid, "1");
    var uri = window.location.href;
    scanRecord(94,1,pid,uri,'帮助中心常见问题');
}
function saveProblem(){
    $("#sub").css('pointer-events','none');
    var url = requestPath + "/m/customerCall/sendAdvice.htm";
    var content = $("#content").val();
    setTimeout(getDataMap,1000);
    if(isNull(content)){
        showMessage("提问内容不能为空！");
    $("#sub").css('pointer-events','auto');
        return false;
    }
    var dataMap = {};
    var userid = getLocalData("scanuserid");
    // var hydm = getLocalData("scanuserid");
    // var mobile = getLocalData("scanuserid");
    if($("#content").val().length>300){
        showMessage("请输入少于300字的内容");
    $("#sub").css('pointer-events','auto');
        return false;
    }
    var flag02 = $("#flag02").val();
     if(isNull(flag02)){
        showMessage("问题分类至少选择一个");
        $("#sub").css('pointer-events','auto');
        return false;
    }
    if (flag02==1) {
        showMessage("提交模板有误");
        setTimeout("openPage('我要投诉', '../complaint/customerComplaint.html', '1');",500)
        
    }
    dataMap.content=content;
    dataMap.userid=userid;
    dataMap.flag02 = flag02;
    var str02 = $("#imgUrl").attr('data-src');  //图片
    if( !isNull(str02)){
     dataMap.str02 = str02;
    }
    if(!isNull($("#tokenId").val())){
        dataMap.tokenId = $("#tokenId").val();
    }else{
        // showMessage("提交错误,请刷新页面重试");
        // $("#sub").css('pointer-events','auto');
        // return false;
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        openPage("提问成功","../customer/smallYiSuccess.html","1");
        
    },false,function(){
        setTimeout(" $('#sub').css('pointer-events','auto');",1000);
    });
}

function goIndex(){
    openPage("","../customer/index.html","1");
}

function jxPen(){
    openPage("我的提问", "../customer/smallYiList.html", "1");
}

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
var _count = 0;
function imgCallback(img) {
    var imgHtml = "<li>";
    imgHtml += "<p><img id='imgUrl' classP='img' data-src='" + img + "' src='" + filePathOld + img + "' index='" + _count + "' class='img_" + _count + "' onclick='imgImClick(this);' style='width:75px;' /></p>";
    imgHtml += "<em><i class='iconfont icon-jian'></i></em>";
    imgHtml += "</li>";

    $("#addImg").before(imgHtml);

    if ($(".img").length == 1) {
        $("#addImg").hide();
    } else {
        $("#addImg").show();
    }

    $("#img_ul em").unbind("click");
    $("#img_ul em").bind("click", function() {
        $(this).parent().remove();
        $("#addImg").show();
    });
    _count ++ ;

}

 function imgImClick(obj){
    // showMessage($("#imgUrl").attr("src"));
  var index = 0;
  showImgs(index);
}
function showImgs(index){
    // 先把之前的移除掉
    $(".weui-photo-browser-modal").remove();
    if(isNull(index)){
        index = 0;
    }
    // 根据样式获取图片数组
    var imgs = [];
        imgs.push($("#imgUrl").attr("src"));
    var pb = $.photoBrowser({
        items:imgs,
        initIndex:index
    });
    pb.open();
}
// 初始化微信授权id
function initOauth() {
    var wxOpenid = $("#openid").val();
    if (!isNull(wxOpenid)) {
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
}

function lableClick(){
    var category = $("#category").val();
    $("#flag02").val(category);
    $(".tslx").each(function(){
        if($(this).attr('value')==category){
            $(".tslx").removeClass("cpx_label_checked");
            $(this).addClass('cpx_label_checked')
        }
    });
    if(category==2){
    }else if (category==3) {

    }else if (category==1) {
    openPage("我要投诉", "../complaint/customerComplaint.html", "1");
    }else if (category==0) {

    }
    $(".tslx").bind('click',function(){
        $(".tslx").removeClass("cpx_label_checked");
        $(this).addClass('cpx_label_checked')
        if ($(this).attr('value')==1) {
            openPage("我要投诉", "../complaint/customerComplaint.html", "1");
        }
        $("#flag02").val($(this).attr('value'));
    });
}