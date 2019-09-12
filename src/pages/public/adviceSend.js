$(function(){
    queryData();
})


function queryData(){
    var url = requestPath + "/m/advice/toSend.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
       
    });
}

var clickFlag = false; // 是否允许点击，
function toSend(){
    if(clickFlag){
        return false;
    }
    
}

$("#tj1").one("click",function(){
    var url = requestPath + "/m/advice/sendAdvice.htm";
    var content = $("#content").val();
    if(isNull(content)){
        showMessage("吐槽内容不能为空！");
        return false;
    }
    var dataMap = {};
    var userid = getLocalData("scanuserid");
    // var hydm = getLocalData("scanuserid");
    // var mobile = getLocalData("scanuserid");
    if($("#content").val().length>300){
        showMessage("请输入少于300字的建议");
        return false;
    }
    dataMap.content=content;
    dataMap.userid=userid;
    $.ajaxjsonp(url, dataMap, function(data) {

        openPage("吐槽成功","../public/adviceSuccess.html","1");
        
    });
});

function goback(){
    openPage("","../customer/index.html","1");
}

function myAdvice(){
    openPage("我的吐槽","../public/adviceList.html","1");
}