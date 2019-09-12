$(function() {
    queryData();    
    setTimeout(function () {
        execI18n();
    },500);
});

function queryData() {
    var url = requestPath + "/m/complaint/info.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        $("#main").html(template('main_page', d));

        bindImgClick();
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }
   
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

template.helper("getImg", function (value) {
	    var mx=value.split(",");
		var html = "";
		for (var i = 0; i < mx.length; i++) {
			 html += " <li><p><img class='kstp' index='"+i+"' src="+filePathOld+mx[i] + "></p> </li>";
		}
        return html;
    });


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