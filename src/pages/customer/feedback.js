$(function() {
    

});

function doSave(){
 	var content = $("#content").val();
 	if(isNull(content)){
 		showMessage("请输入内容");
 		return false;
 	}
 	var url = requestPath + "/m/my/feedback.htm";
 	var dataMap = {};
 	dataMap.content = content;
 	$.ajaxjsonp(url, dataMap, function(data) {
        showMessage("已接到您的宝贵意见");
		$("#content").val("");
        goBack();
    });
}

