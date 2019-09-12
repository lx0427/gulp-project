$(function(){

    $("#form").bind("submit", function() {
        initPage();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });


    queryData();
})

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
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

function queryData(){
    var url = requestPath + "/m/advice/list.htm";
    var dataMap = {};
    if (!isNull($("#querykey").val())) {
        dataMap.content = $("#querykey").val();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data)
        $("#list").append(template('list_page', d));
        $("#hf1").one("click",function(){
            var url = requestPath + "/m/advice/reply.htm";
            var dataMap = {};
            var content = $("#content").val();
            if(isNull(content)){
                showMessage("吐槽内容不能为空！");
                return false;
            }
            if($("#content").val().length>300){
                showMessage("请回复少于300字的消息");
                return false;
            }
            var userid = getLocalData("scanuserid");
            dataMap.content=content;
            dataMap.userid=userid;
            dataMap.adviceid=$("#hf1").attr("advice");
            dataMap.tomsgid=$("#hf1").attr("last");
            dataMap.lastFid=$("#hf1").attr("lastForm");
            // console.log($("#hf1").attr("advice"))
            // console.log($("#hf1").attr("last"))
            // console.log($("#hf1").attr("lastForm"))
            $.ajaxjsonp(url, dataMap, function(data) {
                var d = eval(data)
                openPage("吐槽成功","../public/adviceSuccess.html","1");
            });
        });
    },true);
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
        $("#sqhf_"+id).removeClass('on');
    }else{
        // $("#btnlist_"+id).show();
        $("#hflist_"+id).show();
        $("#sqhf_"+id).addClass('on');

    }
    
}
function goIndex(){
    openPage("","../customer/index.html","1");
}

function jxPen(){
    openPage("意见箱", "../public/adviceSend.html", "1");
}
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