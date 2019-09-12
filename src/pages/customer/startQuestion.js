$(function() {
	checkQue($('#queId').val());
    queryData();
});

function checkQue(queId){
	var userTempId = localStorage.userTempId;
    if(isNull(userTempId)){
    	getUserTempId();
    	setTimeout(function(){
    		checkData(queId);
    	}, 500);
    }else{
    	checkData(queId);
    }
}

//获取临时用户id
function getUserTempId(){
	var url = requestPath + "/m/question/getUserTempId.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	localStorage.userTempId = d.userid;
    }, true);
}

function checkData(queId) {
	var flag = true;
    var url = requestPath + "/m/question/list.htm";
    var dataMap = {};
    dataMap.openid = localStorage.userTempId
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	console.log(d);
    	if(d.list.length == 0){
    		if(flag){
    			flag = false;
    			showMessage("您没有权限参加这个问卷!");
	    		setTimeout(function(){
	    			window.history.back();
    			},500);
    		}
    	}
        for(var i = 0; i < d.list.length; i++){
        	if(d.list[i].queId == queId){
        		if(d.list[i].isDone == 0){//未参与, 可以参与
        			return;
        		}else{//不可参与
        			if(flag){
        				flag = false;
	        			showMessage("您已经参加这个问卷!");
						setTimeout(function(){
							window.history.back();
						},500);
					}
        		}
        	}
        }
        if(flag){
        	flag = false;
	        showMessage("您没有权限参加这个问卷!");
			setTimeout(function(){
				window.history.back();
			},500);
		}
    }, false);
}

var hasInfo = false;
function queryData() {
    var url = requestPath + "/m/question/myInfo.htm";
    var dataMap = {};
    dataMap.openid = localStorage.userTempId
    dataMap.queId = $('#queId').val();
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	console.log(d);
    	if(d.questionJoin != null){
    		hasInfo = true;
    		$('#companyName').val(d.questionJoin.companyName);
    		$('#userName').val(d.questionJoin.userName);
    		$('#mobile').val(d.questionJoin.mobile);
    	}
        if(d.question !=null){
            sessionStorage.queName = d.question.queName;
            sessionStorage.summary = d.question.summary;
        }
    	$('#needLogin').val(d.question.needLogin);
    	bindPm();
    }, true);
}

function start(){
	var queId = $('#queId').val();
	var needLogin = $('#needLogin').val();
	var url = requestPath + "/m/question/startQuestion.htm";
	if(checkValue()){
		var dataMap = {};
	    dataMap.openid = localStorage.userTempId;
	    dataMap.queId = $('#queId').val();
	    dataMap.companyName = $('#companyName').val();
	    dataMap.userName = $('#userName').val();
	    dataMap.mobile = $('#mobile').val();
	    dataMap.pm = $('#pm').text();
	    $.ajaxjsonp(url, dataMap, function(data) {
	    	var d = eval(data);
	    	console.log(d);
	    	openPage("调查问卷", "../customer/startItem.html?queId="+queId, "1");
	    }, true);
	}
}


function bindPm(){
	var array = [];
	var json = {};
	var pmlist = ['DTY','FDY','POY','短纤','涤纶切片','锦纶切片'];
	for(var i = 0; i<6; i++){
		var json = {};
		json.title = pmlist[i];
		json.value = pmlist[i];
		array[array.length] = json;
	}
	$("#pmli").select({
        title: "请选择产品线",
        items: array,
        onChange: function(d) {
            $('#pm').text(d.titles);
        },
        onClose: function() {
        },
        onClear: function() {
            $("#pm").text("请选择");
        }
    });
}

function checkValue(){
	if($('#companyName').val() == null || $('#companyName').val() == ''){
		showMessage("请输入企业名称!");
		return false;
	}
	if($('#userName').val() == null || $('#userName').val() == ''){
		showMessage("请输入填写人!");
		return false;
	}
	if($('#mobile').val() == null || $('#mobile').val() == ''){
		showMessage("请输入联系方式!");
		return false;
	}
	if(!(/^[1][0-9]{10}$/).test($('#mobile').val())){
		showMessage("请输入正确的联系方式!");
		return false;
	}
	if($('#pm').text() == null || $('#pm').text() == '请选择'){
		showMessage("请选择产品线!");
		return false;
	}
	return true;
}