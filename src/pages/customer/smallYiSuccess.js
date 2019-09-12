$(function(){

    timenum = 3;
    timefun = setInterval(smsSendNum, 1000);
})

var timenum, timefun;
function smsSendNum() {
    $("#btnSend").html("查看我的问题(" + timenum + ")");
    timenum--;
    if (timenum <= 0) {
        openPage("我的问题","../customer/smallYiList.html","1");
    }
}

function goback(){
    openPage("","../customer/index.html","1");
}

function myAdvice(){
    openPage("我的问题","../customer/smallYiList.html","1");
}
function toMyAdvice(){
    openPage("我的问题","../customer/smallYiList.html","1");
}