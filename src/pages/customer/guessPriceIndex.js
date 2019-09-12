$(function() {
    queryData();

});

var  title="";
var  content="";
var  wxUrl=""; // 取当前页面地址    
var  imageUrl="";
var  isLogin=false;
function queryData() {
    var url = requestPath + "/m/guessPrice/index.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        console.info(d);
        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }
        if(!isLogin){
        	$("#isLoginAlert").show();
        }
        
        
        if(d.groupList != null && d.groupList.length>0){
            $("#list").html(template('list_page', d));   
        }
        
        if(d.discussList != null && d.discussList.length>0){
            console.info("discussList:"+d.discussList);
            $("#discussArea").html(template('discussArea_page', d));
        }

        if(!isNull(d.data)){
            flag2 = d.data.flag2;
            $("#flag2").html(flag2);
            activityId = d.data.pkid;
            $("#effectProud").html(d.data.startDate.substring(0,10)+" "+d.data.startTime.substring(11,19)+"-"+d.data.endTime.substring(11,19));
        	if(!isNull(d.data.guessRules)){
        		$("#rule").attr("href", requestPath+"/wx/pages/customer/guessPriceRules.html?pkid="+d.data.guessRules);
        	}
        	
        }else{
            $(".wx_priceexp .discussid").hide();
            $(".wx_expcomment .myreply").hide();
            
            $("#noneData").show();        
        }
        if(d.messageNum!=null && d.messageNum>0){
        	$("#mypoint").show();
        }else{
        	$("#mypoint").hide();
        }
        //配置分享链接
        title="恒逸微商城有奖价格预测活动开始啦，老板们都在猜，你猜了吗";
        imageUrl = requestPath+"/wx/images/guessPriceShare.jpg";
        content="点击链接，一键参与，还能赢取千元代金券哦";
        wxUrl = window.location.href; // 取当前页面地址  
        setTimeout(function() {
	        if(isWeixinBrowse()){
	            shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);
	        }
	    }, 500);
		
		//记录浏览记录
		var url = window.location.href;
    	scanRecord(69,0,activityId,url,'猜价活动');
    
    },true);
}

var activityId = "";
var flag2 = 0;
//讨论区
function toDiscuss(){
	if(!isLogin){
		toLogin();
	}
    openPage("讨论区", "../customer/guessPriceDiscuss.html?activityId="+activityId+"&flag2="+flag2, "1");
}

//我要出价
function toGuess(parentId){
	if(!isLogin){
		toLogin();
	}
    $("#parentId").val(parentId);
    $(".rule22").show();
}

//取消保存
function doCancel() {
    $("#parentId").val("");
    $(".rule22").hide();
}

//保存出价
var recordFlag = false;
function doOk() {
   $(".rule22").hide();
   var price = $("#price").val();  
   if(!checkNumber("price", 3 , "预测价格")){
        return false;
    }
    if(recordFlag){
        return false;
    }
    recordFlag=true;
   var url = requestPath + "/m/guessPrice/saveRecord.htm";
   var dataMap = {};
   dataMap.parentId =  $("#parentId").val();
   dataMap.activityId =  activityId;
   dataMap.price = price;
   $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);        
       console.info(d);
       $("#price").val(""); 
       recordFlag = false;
       queryData();
   });
}

//取消回复
function replyCancel(discussid){
    if(isNull(discussid)){
        $("#content").val("");
    }else{
        $("#id_"+discussid).hide();
    }
}

//评论回复
var editFlag = false;
function doReply(discussid){
    if (!checkValue(discussid)) {
        return false;
    }
    if (editFlag) {
        return false;
    }

   var url = requestPath + "/m/guessPriceDiscuss/save.htm";
   var dataMap = {};
   dataMap.activityId = activityId;
   dataMap.flag02 = flag2;
   if(!isNull(discussid)){
    dataMap.content = $("#content_"+discussid).val();
    dataMap.parentid = discussid;//回复
    dataMap.discussType = 2;
   }else{
    dataMap.content = $("#content").val();
    dataMap.discussType = 1;//发表
   }

   editFlag = true;
   $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);        
       $("#content").val("");
       editFlag = false;
       queryData();
   });
}

function checkValue(discussid){
    var content = "";
    if(!isNull(discussid)){
        content = $("#content_"+discussid).val();
    }else{
        content = $("#content").val();
    }
    if(isNull(content)){
        showMessage("回复内容不能为空!");
        return false;
    }
    if(content.length>300){
        var len=content.length-300;
        showMessage("回复内容超长,超出了"+len+"个字!");
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

function toShowReply(id){
	if(!isLogin){
		toLogin();
	}
    $("#id_"+id).show();
}

function toHideReply(id){
    $("#id_"+id).hide();
}

//点赞,取消点赞
var zanFalg = false;
function toCollect(pkid,flag){
	if(!isLogin){
		toLogin();
	}
   var url = requestPath + "/m/guessPriceDiscuss/priseOrCancle.htm";
   var dataMap = {};
   dataMap.flag = flag;
   dataMap.pkid = pkid;
   if(zanFalg){
      return false;
   }
   zanFalg = true;
   $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       zanFalg = false;        
       queryData();
   });    

}


function shareAppMessage () {

}

function shareTimeline () {
  
}
function shareQQ () {
  
}

function closeAlert(){
	$("#isLoginAlert").hide();
}

function toLogin() {    
    eval(loginName);
}
