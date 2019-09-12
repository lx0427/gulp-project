$(function() {
    $("body").keydown(function(event){
        if(event.keyCode==8){
            //alert(1);
            var a = $("#number1").attr("num");
            var b = $("#number2").attr("num");
            var c = $("#number3").attr("num");
            var d = $("#number4").attr("num");
            var aval = $("#number1").val();
            var bval = $("#number2").val();
            var cval = $("#number3").val();
            var dval = $("#number4").val();
            if(b=="1"){
                if(bval==""){
                    $("#number1").focus();
                }
            }
            if(c=="1"){
                if(cval==""){
                    $("#number2").focus();
                }
            }
            if(d=="1"){
                if(dval==""){
                    $("#number3").focus();
                }
            }
        }
    
    });

});
function number1input(){
       var number2 = $("#number2").val();
       var number1 = $("#number1").val();
       if(number2 == "" && number1 !="" ){
        $("#number2").focus();
       }
       issave();
}
function number2input(){
    var number3 = $("#number3").val();
    var number2 = $("#number2").val();
    if(number3 == ""&& number2 !=""){
     $("#number3").focus();
    }
    issave();
}
function number3input(){
    var number4 = $("#number4").val();
    var number3 = $("#number3").val();
    if(number4 == ""&& number3 !=""){
     $("#number4").focus();
    }
    issave();
}

var timenum, timefun;
function getRandomCode() {
    var url = requestPath + "/m/createOrder/sendRandomCode.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if(d.mobile!=null){
            $("#mobile").html(d.mobile);
            timenum = 60;
            timefun = setInterval(smsSendNum, 1000);
            $("#number1").focus();
        }
    });
}

function showSendRandom() {    
    $("#sendRandomCode").popup();
    getRandomCode();
}

var saveFlag = false;
function save(){
    if (saveFlag) {
        return false;
    }
    var number1= $("#number1").val();
    var number2= $("#number2").val();
    var number3= $("#number3").val();
    var number4= $("#number4").val();

    if(number1==null || number1==""|| number2==null || number2==""|| number3==null || number3==""|| number4==null || number4==""){
        showMessage("请填写验证码");
        return;
    }
    var random=number1+number2+number3+number4;
    var url = requestPath + "/m/createOrder/codeVerify.htm";
    var dataMap = {};
    dataMap.randCode=random;
    saveFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        showOk("验证码正确");
        setTimeout("$('#closepop').click();")
    }, false, function() {
        $("#number1").val("");
        $("#number2").val("");
        $("#number3").val("");
        $("#number4").val("");
        $("#number1").focus();
        saveFlag = false;
    });

}  
function smsSendNum() {
    $("#yztime").html(timenum);
    timenum--;
    if (timenum < 0) {
        clearInterval(timefun);
        $("#yztime").html("发送验证码");
    }
}
function numberfocus(num){
    $("#number1").attr("num","0");
    $("#number2").attr("num","0");
    $("#number3").attr("num","0");
    $("#number4").attr("num","0");
    $("#number"+num).attr("num","1");
}
function cxfs(){
    var yztime = $("#yztime").html();
    if(yztime =="发送验证码"){
        getRandomCode();
    }
}
function issave(){
    var number1= $("#number1").val();
    var number2= $("#number2").val();
    var number3= $("#number3").val();
    var number4= $("#number4").val();
    if(number1!="" && number2!="" && number3!="" && number4!=""){
        save();
    }
}