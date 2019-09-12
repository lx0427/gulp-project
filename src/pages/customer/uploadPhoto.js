$(function() {
	initPage();
	// 图片上传
  $("#addImg").bind("click", function() {
      // 最多上传9张
      var len = $(".img").length;
      startUploadPics("imgCallback", 9 - len);
  });
});

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
var _count = 0;
function imgCallback(img) {
    var imgHtml = "<li style='top:10px;'>";
    imgHtml += "<p><img classP='img' data-src='" + img + "' src='" + filePath + img + "' index='" + _count + "' class='img' onclick='imgImClick(this);' /></p>";
    imgHtml += "<em><i class='iconfont icon-jian'></i></em>";
    imgHtml += "</li>";

    $("#addImg").append(imgHtml);

    if ($(".img").length == 9) {
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
  var className = $(obj).attr("class");
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
template.helper("getImg", function (path,value) {
		var mx=value.split(",");
		var html = "";
		for (var i = 0; i < mx.length; i++) {
			 html += " <li style='top:10px;'><p><img class='img' classP='img' onclick='imgImClick(this);' index='"+i+"' data-src='" + mx[i] + "' src="+path+mx[i] + "></p> ";
			 html += "<em onclick='re(this);'><i class='iconfont icon-jian'></i></em></li>";
		}
    return html;
});
function re (obj) {
	$(obj).parent().remove();
  $("#addImg").show();
}


// 初始化微信授权id
function initOauth() {
    var wxOpenid = $("#openid").val();
    if (!isNull(wxOpenid)) {
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
}


function getDataMap() {
    var dataMap = {};

    // 图片路径
    // dataMap.complaintImages = "xxx.jpg";
    var complaintImages = "";
    $("img[classP='img']").each(function() {
        complaintImages += "," + $(this).attr("data-src");
    });
    if (!isNull(complaintImages)) {
        complaintImages = complaintImages.substring(1);
    }
    dataMap.photoUrl = complaintImages;
    dataMap.fphm = $("#vbeln").val();
		dataMap.type = 1;
		dataMap.delFlag = 1;
		if (!isNull($("#pkid").val())) {
			dataMap.pkid = $("#pkid").val();
		}

    return dataMap;
}

function checkValue(){
	
    var imgLen = $(".img").length;
    /*if(imgLen == 0){
        showMessage("请上传图片");
        return false;
    }*/

    return true;
}

var editFlag = false;
function savePhoto () {
	
    if (!checkValue()) {
    	return false;
    }
    
    if (editFlag) {
        return false;
    }
    editFlag = true;
    
    var dataMap = getDataMap ();
    if (isNull(dataMap)) {
        editFlag = false;
        return false;
    }
    var url = requestPath + "/m/exPhoto/photoSave.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
       sapOrder();
    }, false, function() {
        editFlag = false;
    });

}
function sapOrder() {
    openPage("订单查询", "../customer/unconfirmedOrder.html?from=customer", "1");
}

function initPage() {
    var url = requestPath + "/m/exPhoto/photoDetail.htm";
    var dataMap = {};
    dataMap.fphm = $("#vbeln").val();
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       if (!isNull(d.data)) {
	       if (!isNull(d.data[0].pkid)) {
	       	$("#pkid").val(d.data[0].pkid);
	       }
	       if (!isNull(d.data[0].type)) {
	       	$("#type").val(d.data[0].type);
	       }
       	$("#imgs").html(template('imgs_page', d));
      }
    }, false);
}