$(function(){

    timenum = 3;
    timefun = setInterval(smsSendNum, 1000);
})

var timenum, timefun;
function smsSendNum() {
    $("#btnSend").html("查看我的吐槽(" + timenum + ")");
    timenum--;
    if (timenum <= 0) {
        openPage("我的吐槽","../public/adviceList.html","1");
    }
}

function goback(){
    openPage("","../customer/index.html","1");
}

function myAdvice(){
    openPage("我的吐槽","../public/adviceList.html","1");
}
function toMyAdvice(){
    openPage("我的吐槽","../public/adviceList.html","1");
}