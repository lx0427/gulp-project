$(function() {
	// 图片上传
	$("#addImg").bind("click", function() {
		// 最多上传9张
		var len = $(".img").length;
		startUploadPics("imgCallback", 9 - len);
	});

	var text = $("#problem")[0];
    autoTextarea(text); // 调用自动修改文本textarea高度

	/*$("#problem").height($("#problem")[0].scrollHeight);
	$("#problem").on("keyup keydown focus", function(){
		$("#note").hide();
	    $(this).height(this.scrollHeight);
	});*/
	//标签单击事件
	$("#lable span span").bind("click", function() {
		var industry = $("#industry").val();
		var currentText = $(this).html();
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			var arr = industry.split(',');
			if(arr!=null && arr.length!=0){
			for(var i = 0;i<arr.length;i++){
				if(arr[i] == currentText){
					arr.splice(i,1);
					--i;
				}
			}
			$("#industry").val(arr.join(','));
		}else{
			$("#industry").val('');
		}
			}else{
				$(this).addClass("cpx_label_checked");
				if(isNull(industry)){
					$("#industry").val(currentText);
				}else{
				$("#industry").val(industry+','+currentText);
				}
			}
			// console.log($("#industry").val());
		});
	queryData();

});


// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
var _count = 0;
function imgCallback(img) {
	var imgHtml = "<li>";
	imgHtml += "<p><img classP='img' data-src='" + img + "' src='" + filePathOld + img + "' index='" + _count + "' class='img_" + _count + "' onclick='imgImClick(this);' /></p>";
	imgHtml += "<em><i class='iconfont icon-jian'></i></em>";
	imgHtml += "</li>";

	$("#addImg").before(imgHtml);

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

var interval;
function queryData() {
    var url = requestPath + "/m/informationReports/index.htm";
    var dataMap = {};
    dataMap.whType = 1;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if(!isNull(d.data)){
        	$("#titssj").hide();
        	$("#list").append(template('list_page', d));
		}	
    }, false, function(){});


    //判断是否是撤销回来编辑的
    if(!isNull($("#pkid").val())){
    	removeStorage();//清空缓存
    	var url = requestPath + "/m/informationReports/getInfo.htm";
	    var dataMap = {};
	    dataMap.pkid = $("#pkid").val();
	    dataMap.isReport = 1;
	    dataMap.revocationFlag = 1;
	    $.ajaxjsonp(url, dataMap, function(data) {
	        var d = eval(data);
	        console.info(d);

        	if(!isNull(d.data)){
        		$("#note").hide();
	        	$("#problem").text(toTextarea(d.data.problem));
			}
				
	    });
    }
    //每隔10s执行备份方法
	clearInterval(interval); 
	interval = setInterval(tempSaveStorage, 10000);
	//从本地取出备份内容
	var problem = sessionStorage.getItem("report_problem");
	if(!isNull(problem)){
		$("#note").hide();
		htoTextarea(problem);
		$("#problem").text(problem);	
	}
}

var editFlag = false;
function doSave(saveFlag){
	if (!checkValue()) {
		return false;
	}
	if (editFlag) {
		return false;
	}

	var url = requestPath + "/m/informationReports/saveVistAddress.htm";
    var dataMap = {};
    dataMap.whType = 1;//随手记类型
    dataMap.reportStatus = 1;
    dataMap.problem = textareaTo($("#problem").val());
    dataMap.industry = $("#industry").val();
    editFlag = true;
    // 上传图片
	var complaintImages = "";
	$("img[classP='img']").each(function() {
		complaintImages += "," + $(this).attr("data-src");
	});
	if (!isNull(complaintImages)) {
		complaintImages = complaintImages.substring(1);
	}
	dataMap.uploadAppendageAddress = complaintImages;

    $.ajaxjsonp(url, dataMap, function(data) {
	        var d = eval(data);
	        removeStorage();
			openPage("信息反馈列表", "../informationReport/messageSettingsList.html");
    	}, false, function() {
			editFlag = false;
		}
	);
}

function onPage(obj) {
	if (obj == 2) {
		openPage("客户拜访", "../informationReport/messageVistAddressAdd.html");
	}
	if (obj == 3) {
		openPage("周报", "../informationReport/messageWeekAdd.html");
	}
}

// 初始化微信授权id
function initOauth() {
	var wxOpenid = $("#openid").val();
	if (!isNull(wxOpenid)) {
		sessionStorage.setItem("wxOpenid", wxOpenid);
	}
}

function checkValue(){
	if(isNull($("#problem").val())){
		showMessage("请输入随手记!");
		return false;
	}
	var problemText = textareaTo($("#problem").val());
	if(problemText.length >= 2000){
		showMessage("内容字数超过最大值!");
		return false;
	}
	return true;
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

function toInfo(pkid){
	openPage("随手记详情", "../informationReport/messageNoteInfo1.html?pkid="+pkid+"&isReport=1");
}


function toHistoryList(){
	openPage("历史记录", "../informationReport/messageHistoryList.html?whType=1");
}

//备份填写内容
function tempSaveStorage(){
	var oldProblem = sessionStorage.getItem("report_problem");
	htoTextarea(oldProblem);

	var newProblem = $("#problem").val();
	if(oldProblem != newProblem){
    	textareaToh(newProblem);
    	console.info("完成备份:"+newProblem);
		sessionStorage.setItem("report_problem", newProblem);
	}

}

function removeStorage(){
	sessionStorage.setItem("report_problem", "");
}

//带有换行标签的字符串转义
function htoTextarea(str){
	if(!isNull(str)){
		str = str.replace(new RegExp("<br>","gm"), "\n");
	}
	return str;
}
//换行转义带有标签的字符串
function textareaToh(str){
	if(!isNull(str)){
		str = str.replace(new RegExp("\n", "gm"), "<br>");
	}
	return str;
}



