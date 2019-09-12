$(function(){

    $("#form").bind("submit", function() {
        queryData();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        queryData();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        queryData();
    });
    $(".kindbtn li").bind("click", function() {
        // 当前选中的
        var currentText = $(".kindbtn .current").text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText) {
            // 不处理
            return;
        }
        $(".kindbtn li").removeClass('current');
        $(this).addClass('current');
       $("#category").val($(this).attr('tab'));
        queryData();
        

    });
    initPage();

})

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    initData();
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
function initData(){
    var category =null;
    //判断是否有新消息
    $("#pageIndex").val(0);
    $("#list").html("");
    var url = requestPath + "/m/customerCall/isNewMessage.htm";//提问列表
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data)
        console.log(d);
        d.filePathOld = filePathOld;
       //对有新消息的加红点
       if (!isNull(d)) {
         if (!isNull(d.complaintEm)) {
            $("#complaintEm").show();
         }if (!isNull(d.adviceEm)) {
            console.log(d.adviceEm,'d.adviceEm')
            $("#adviceEm").show();
         }if (!isNull(d.problemEm)) {
            $("#problemEm").show();
         }if (!isNull(d.otherEm)) {
            $("#otherEm").show();
         }
         category = d.category;
         if (!isNull(category)) {
            $("#category").val(category);
            $(".kindbtn li").removeClass('current');
            $(".kindbtn li").each(function(){
                if($(this).attr("tab")==category){
                    $(this).addClass('current');
                }
            });
         }
       }
       
    },true,function(){
        //加载问题列表
    $("#pageIndex").val(0);
    $("#list").html("");
    var url = requestPath + "/m/customerCall/list.htm";//提问列表
    var url2 = requestPath + "/m/complaint/list.htm";  //投诉列表
    if (isNull(category)) {
        category = $("#category").val();
    }
    var dataMap = {};
    if(!isNull(category)){
        dataMap.flag02 = category
    }
    if (!isNull($("#querykey").val())) {
        dataMap.content = $("#querykey").val();
    }
    if(category==1){
        url = url2;
        dataMap.smallYi = 1;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data)
        console.log(d);
        d.filePathOld = filePathOld;
        if(category==1){
            if (!scrollLoading) {
                $("#list").html(template('list_page2', d));
            }else{
                $("#list").append(template('list_page2', d));
            }
        }else{
            if (!scrollLoading) {
                $("#list").html(template('list_page', d));
            }else{
                $("#list").append(template('list_page', d));
            }
        }
    },true,function(){
        $(".hf1").click(function(){
            var url = requestPath + "/m/customerCall/reply.htm";
            var dataMap = {};
            var content = $(this).parent().parent().find('textarea').val();
            if(isNull(content)){
                showMessage("提问内容不能为空！");
                return false;
            }
            if(content.length>300){
                showMessage("请回复少于300字的内容");
                return false;
            }
            var userid = getLocalData("scanuserid");
            dataMap.content=content;
            dataMap.userid=userid;
            dataMap.adviceid=$(this).attr("advice");
            dataMap.tomsgid=$(this).attr("last");
            dataMap.lastFid=$(this).attr("lastForm");
            // console.log($("#hf1").attr("advice"))
            // console.log($("#hf1").attr("last"))
            // console.log($("#hf1").attr("lastForm"))
            $.ajaxjsonp(url, dataMap, function(data) {
                var d = eval(data)
               openPage("提问成功","../customer/smallYiSuccess.html","1");
            });
        });
    });

    });
}
function queryData(){
    if(!scrollLoading){
    $("#pageIndex").val(0);
    $("#list").html("");
    }
    var url = requestPath + "/m/customerCall/list.htm";//提问列表
    var url2 = requestPath + "/m/complaint/list.htm";  //投诉列表
    var category = $("#category").val();
    var dataMap = {};
    if(!isNull(category)){
        dataMap.flag02 = category
    }
    if (!isNull($("#querykey").val())) {
        dataMap.content = $("#querykey").val();
    }
    if(category==1){
        url = url2;
        dataMap.smallYi = 1;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data)
        console.log(d);
        d.filePathOld = filePathOld;
        if(category==1){
            if (!scrollLoading) {
                $("#list").html(template('list_page2', d));
            }else{
                $("#list").append(template('list_page2', d));
            }
        }else{
            if (!scrollLoading) {
                $("#list").html(template('list_page', d));
            }else{
                $("#list").append(template('list_page', d));
            }
        }
       
    },true,function(){
         $(".hf1").click(function(){
            var url = requestPath + "/m/customerCall/reply.htm";
            var dataMap = {};
            var content = $(this).parent().parent().find('textarea').val();
            if(isNull(content)){
                showMessage("提问内容不能为空！");
                return false;
            }
            if(content.length>300){
                showMessage("请回复少于300字的内容");
                return false;
            }
            var userid = getLocalData("scanuserid");
            dataMap.content=content;
            dataMap.userid=userid;
            dataMap.adviceid=$(this).attr("advice");
            dataMap.tomsgid=$(this).attr("last");
            dataMap.lastFid=$(this).attr("lastForm");
            // console.log($("#hf1").attr("advice"))
            // console.log($("#hf1").attr("last"))
            // console.log($("#hf1").attr("lastForm"))
            $.ajaxjsonp(url, dataMap, function(data) {
                var d = eval(data)
               openPage("提问成功","../customer/smallYiSuccess.html","1");
            });
        });
    });
}

// function doHf(ad,last,lastF){
   
// }
$(document).ready(function(){

})
 
 


function toHf(id){
    $("#hftext_"+id).show();
    $("#btn_"+id).show();
}
function qxHf(id){
    $("#hftext_"+id).hide();
    $("#btn_"+id).hide();
}
function showLi(id){
    if($("#seeMore_"+id).hasClass('canSee')){

        $(".noneLi_"+id).show();
        $('#seeMore_'+id).removeClass('canSee');
        $('#seeMoreS_'+id).text('收起更多');
    }else{
        $(".noneLi_"+id).hide();
        $('#seeMore_'+id).addClass('canSee');
        $('#seeMoreS_'+id).text('查看更多');
    }
    
}
function sqhf(id){

    if($("#sqhf_"+id).hasClass('on')){
        // $("#btnlist_"+id).hide();
        $("#hflist_"+id).hide();
        $("#sqhf_"+id).html("查看回复<i class='arrow'></i>");
        $("#sqhf_"+id).removeClass('on');
    }else{
        // $("#btnlist_"+id).show();
        $("#hflist_"+id).show();
        $("#sqhf_"+id).html("收起回复<i class='arrow'></i>");
        $("#sqhf_"+id).addClass('on');

    }
    
}
function goIndex(){
    openPage("","../customer/index.html","1");
}

function jxPen(){
    openPage("客服中心", "../customer/smallYi.html?category=3", "1");
}
var i = 0;
function showContent(id){
    // $("#content_"+id).hide();
    // $("#contenth_"+id).show();
    var clamp = $("#content_"+id).css('-webkit-line-clamp');
    if(clamp=='2'){
        $("#content_"+id).css('-webkit-line-clamp','inherit');
    }else{
        $("#content_"+id).css('-webkit-line-clamp','2');
    }
    
}
function openImg(url){
    window.location.href = url;
}
function showImgs(src,id){
    // 先把之前的移除掉
    $(".weui-photo-browser-modal").remove();
        var index = 0;
    // 根据样式获取图片数组
    var imgs = [];
        imgs.push(src);
    var pb = $.photoBrowser({
        items:imgs,
        initIndex:index
    });
    pb.open();
}
function toHandle(pkid) {
    openPage("投诉详情", "../complaint/complaintInfo.html?pkid="+pkid, "1");
}