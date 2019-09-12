$(function() {
    
    var mobile = sessionStorage.getItem("loginMobile");
    $("#logmobile").val(mobile);
});

function sendSms() {
    var mobile = $("#logmobile").val();
    if (isNull(mobile)) {
        showToptip($.i18n.prop('fp_phonetip'), "logmobile");
        return false;
    }
    if (!checkMobile(mobile)) {
        showToptip($.i18n.prop('fp_sjhgsbzq'), "logmobile");
        return false;
    }
    if (timenum > 0) {
        return false;
    }
    var url = requestPath + "/m/my/sendRandomCode.htm";
    console.log("URL:"+url);
    var dataMap = {};
    dataMap.mobile = mobile;
    dataMap.showLoading = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        timenum = 60;
        timefun = setInterval(smsSendNum, 1000);
    });
}

var timenum, timefun;
function smsSendNum() {
    $("#yzmBtn").html(timenum);
    timenum--;
    if (timenum < 0) {
        clearInterval(timefun);
        $("#yzmBtn").html($.i18n.prop('fp_captchaobt'));
    }
}

var findPwdFlag = false;
function findPwd() {
    if (findPwdFlag) {
        return false;
    }
    if (!checkValue()) {
        return false;
    }

    var url = requestPath + "/m/my/findPwd.htm";
    var dataMap = getDataMap();    
    findPwdFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showOk(function() {
        openPage($.i18n.prop('fp_login'), "../customer/login.html", "1");            
        });
        
    }, false, function() {
        findPwdFlag = false;
    });
}

function checkValue() {    
    var mobile = $("#logmobile").val();
    if (isNull(mobile)) {
        showToptip($.i18n.prop('fp_phonetip'), "mobile");
        return false;
    }
    var randCode = $("#randCode").val();
    if (isNull(randCode)) {
        showToptip($.i18n.prop('fp_captchatip'), "randCode");
        return false;
    }
    var logpwd = $("#logpwd").val();
    if (isNull(logpwd)) {
        showToptip($.i18n.prop('fp_newpwdtip'), "logpwd");
        return false;
    }
    var logpwd2 = $("#logpwd2").val();
    if (isNull(logpwd2)) {
        showToptip($.i18n.prop('fp_querenpwdtip'), "logpwd2");
        return false;
    }
    if (logpwd !== logpwd2) {
        showToptip($.i18n.prop('fp_lcssmmbyy'), "logpwd2");
        return false;
    }
    return true;
}

function getDataMap() {
    var dataMap = {};
    dataMap.mobile = $("#logmobile").val();
    dataMap.randCode = $("#randCode").val();
    dataMap.logpwd = hex_md5($("#logpwd").val());
    dataMap.logpwd2 = hex_md5($("#logpwd2").val());
    return dataMap;
}




