$(function() {

   var url = window.location.href;
    scanRecord(5,0,1,url,'物资外卖');
    queryData();
});

function queryData() {

    var url = requestPath + "/m/resource/getTakeOutList.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);            
        $("#list").append(template('takeoutList_page', d));         
         /*console.info(d);
         console.info(JSON.stringify(d));*/

    }, true);
    
}
// 图片点击事件
function bindImgClick(obj){
    // 先把之前的移除掉
    $(".weui-photo-browser-modal").remove();	
    // 根据样式获取图片数组
    var imgs = [];
    $(".img_" + obj.attr("index")).each(function(){
    	var imgJson = {};
    	imgJson.image = $(this).attr("value");
    	imgJson.caption = $(this).attr("imgRemark");
    	imgs.push(imgJson);
    });
    var pb = $.photoBrowser({
        items:imgs,
        initIndex:0
    });
    pb.open();
}
