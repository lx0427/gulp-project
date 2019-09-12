$(function(){
    var obj=$("#object").val();
    var object = obj.split("-");
    var objStr=[];
    for (var i = 0; i < object.length; i++) {
        objStr.push(object[i]);
        
    }       

    var posnr = $("#posnr").val(objStr[1]);
    var vbeln = $("#vbeln").val(objStr[0]);
    // var posnr=$("#posnr").val();
    // var vbeln=$("#vbeln").val();
    // if(isNull(posnr) && isNull(vbeln)){
    //     showMessage("参数错误，单号为空");
    //     return false;
    // }
    $("#addImg").bind("click", function() {
        // 最多上传9张
        var len = $(".img").length;
        startUploadPics("imgCallback", 4 - len);
    });

    queryData();
})

// function doaddImg(){
    
// }
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
    var url = requestPath + "/m/order/toOrderInfo.htm";
    var dataMap={};
    dataMap.vbeln=$("#vbeln").val();
    dataMap.posnr=$("#posnr").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
         
        $("#list").append(template('list_page', d));
        $("#czyid").val(d.data.userId);

        // if(d.orderEvaluate!=null){
        //     $("#tj").hide();
        // }

         /**
         * 评价分控件
         * 鼠标点击，该元素包括该元素之前的元素获得样式,并给result赋值
         * 鼠标移入，样式随鼠标移动
         * 鼠标移出，样式移除但被鼠标点击的该元素和之前的元素样式不变
         * 每次触发事件，移除所有样式，并重新获得样式
         */
        var stars = $('.wx_stars');
        var Len = stars.length;
    
        //遍历每个评分的容器
        for(i=0;i<Len;i++){
    
            //每次触发事件，清除该项父容器下所有子元素的样式所有样式
            function clearAll(obj){
                obj.parent().children('i').removeClass('on');
            }
            stars.eq(i).find('i').click(function(){
                var num = $(this).index();
                clearAll($(this));
                //当前包括前面的元素都加上样式
                $(this).addClass('on').prevAll('i').addClass('on');
                //给隐藏域赋值
                // $(this).siblings('.result').html('<em>'+(num+1)+'</em><span class="mr10">分</span>'+$(this).attr('title'));
                $(this).siblings('.result').html('<em class=num_val>'+(num+1)+'</em><span class="mr10">分</span>'+$(this).attr('title'));
            });
            stars.eq(i).find('i').hover(function(){
                var num = $(this).index();
                clearAll($(this));
                //当前包括前面的元素都加上样式
                $(this).addClass('on').prevAll('i').addClass('on');
            },function(){
                clearAll($(this));
                var score = $(this).siblings('.result').find('em').text();
                //触发点击事件后有值
                for(i=0;i<score;i++){
                    $(this).parent().find('i').eq(i).addClass('on');
                }
            });
        }
    })
}


window.doEvaluate = function (){
    var dom = $('.num_val');
    var array = [];
    if(dom && dom.length>0){
        for (var i = 0; i < dom.length; i++) {
            if($(dom[i]).text() == '请评分'){
                array.push('0');
                // showMessage("请选择评分");
            }else{
                array.push($(dom[i]).text());
            }
        }
        console.log(array)
    }

    if($("#proText").val().length>300){
        showMessage("请输入少于300字的建议");
        return false;
    }
    if($("#perText").val().length>300){
        showMessage("请输入少于300字的建议");
        return false;
    }

    var url = requestPath + "/m/order/doEvaluate.htm";
    var dataMap = {};
    dataMap.vbeln=$("#vbeln").val();
    dataMap.posnr=$("#posnr").val();
    dataMap.fphm=$("#vbeln").val();
    dataMap.userid=$("#czyid").val();
    dataMap.productAdvice=$("#proText").val();
    dataMap.personalAdvice=$("#perText").val();
    dataMap.productTyp=array[0];
    dataMap.knowledgeTyp=array[1];
    dataMap.speedTyp=array[2];
    dataMap.honestyTyp=array[3];

		// 上传图片
		var complaintImages = "";
        $(".img").each(function() {
            complaintImages += "," + $(this).attr("data-src");
        });
        if (!isNull(complaintImages)) {
            complaintImages = complaintImages.substring(1);
        }
        dataMap.uploadUrl = complaintImages;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d=eval(data);
        showOk("确认成功",function() {
            openPage("订单查询","../public/sapOrder.html","1");
        });
    });

}

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
function imgCallback(img) {
    var imgHtml = "<li>";
    imgHtml += "<p><img class='img' data-src='" + img + "' src='" + filePath + img + "' /></p>";
    imgHtml += "<em><i class='iconfont icon-jian'></i></em>";
    imgHtml += "</li>";

    $("#addImg").before(imgHtml);

    if ($(".img").length == 4) {
        $("#addImg").hide();
    } else {
        $("#addImg").show();
    }

    $("#img_ul em").unbind("click");
    $("#img_ul em").bind("click", function() {
        $(this).parent().remove();
        $("#addImg").show();
    });

}

// function imgImClick(obj){
//   var className = $(obj).attr("class");
//   var index = $(obj).attr("index");
//   showImgs(className, index);
// }

// function showImgs(className, index){
// 	// 先把之前的移除掉
// 	$(".weui-photo-browser-modal").remove();
// 	if(isNull(index)){
// 		index = 0;
// 	}
// 	// 根据样式获取图片数组
// 	var imgs = [];
// 	$("."+className).each(function(){
// 		imgs.push($(this).attr("src"));
// 	});
// 	var pb = $.photoBrowser({
// 		items:imgs,
// 		initIndex:index
// 	});
// 	pb.open();
// }