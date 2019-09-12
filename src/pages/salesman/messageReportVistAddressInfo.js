$(function() {
    queryData();    
});

function queryData() {
    var url = requestPath + "/m/sapInformationReports/getVistAddressInfo.htm";
    var dataMap = {};
	 dataMap.pkid = $("#pkid").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);     
        console.log(d);
        if(!isNull(d.data)){
            $("#main").html(template('main_page', d));
        }
        bindImgClick();
        setTimeout (function(){
                 execI18n();
            },500);
    });
}

 function imgImClick(obj){
  var className = $(obj).attr("classP");
  var index = $(obj).attr("index");
  showImgs(className, index);
}

function showImgs(className, index){
    // 先把之前的移除掉
    $(".weui-photo-browser-modal").remove();
    if(isNull(index)){
        index = 0;
    }
    // 根据样式获取图片数组
    var imgs = [];
    $("."+className).each(function(){
        imgs.push($(this).attr("src"));
    });
    var pb = $.photoBrowser({
        items:imgs,
        initIndex:index
    });
    pb.open();
}

// 图片点击事件
function bindImgClick(){
    $("img").unbind("click");
    $("img").bind("click",function(){
        var className = $(this).attr("class");
        var index = $(this).attr("index");
        showImgs(className, index);
    });
}

function showImgs(className, index){
    // 先把之前的移除掉
    $(".weui-photo-browser-modal").remove();
    if(isNull(index)){
        index = 0;
    }
    // 根据样式获取图片数组
    var imgs = [];
    $("."+className).each(function(){
        imgs.push($(this).attr("src"));
    });
    var pb = $.photoBrowser({
        items:imgs,
        initIndex:index
    });
    pb.open();
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

template.helper("getImg", function (path,value) {
        var mx=value.split(",");
        var html = "";
        for (var i = 0; i < mx.length; i++) {
             html += " <li><p><img class='img' classP='kstp" + i + "' onclick='imgImClick(this);' index='"+i+"' src="+path+mx[i] + "></p> </li>";
        }
        return html;
 });