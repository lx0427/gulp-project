$(function() {
  bindPm();
  bindStr00();
    $("#dq_txt").cityPicker({
        title: "选择地区",
        onChange: function(picker, values, displayValues) {
            $("#dq_txt").val(displayValues[0] + " " + displayValues[1] + " " + displayValues[2]);
            $("#dq1code").val(values[0]);
            $("#dq1name").val(displayValues[0]);
            $("#dqcode").val(values[1]);
            $("#dqname").val(displayValues[1]);
            $("#xjcode").val(values[2]);
            $("#xjname").val(displayValues[2]);
        },
        onClear: function() {
            $("#dq_txt").val("");
            $("#dq1code").val("");
            $("#dq1name").val("");
            $("#dqcode").val("");
            $("#dqname").val("");
            $("#xjcode").val("");
            $("#xjname").val("");
        }
    });

    var wxOpenid = sessionStorage.getItem("wxOpenid");
    if(!isNull(wxOpenid)){
        $("#openid").val(wxOpenid);
        $("#appid").val(sessionStorage.getItem("wxAppid"));
    }else if(!isNull($("#openid").val())){
    		wxOpenid = $("#openid").val();
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }else{
        getOauthOpenid("initOauth"); 
    }  

    // 通过分享链接地址或者扫描二维码进入注册页面
    var fxflag = $("#fxflag").val(); // 1 分享链接 2 扫描二维码
    var fxgid = $("#fxgid").val();

    //alert(fxflag);
    //alert($("#typ").val());
    //alert(fxgid);

    if (!isNull(fxflag)) {
        var url = requestPath + "/m/userShare/saveShare.htm";
        if (fxflag == "1") {
            var dataMap = {};
            dataMap.fxflag = 1;
            dataMap.fxgid = fxgid;
            dataMap.userid = $("#userId").val(); // 业务员id
            dataMap.openid = $("#openid").val();
            dataMap.typ = $("#typ").val();
            $.ajaxjsonp(url, dataMap, function(data) {

            });
        } else if (fxflag == "2") {
            var dataMap = {};
            dataMap.fxflag = 2;
            dataMap.fxgid = fxgid;
            dataMap.userid = $("#userId").val(); // 业务员id
            dataMap.openid = $("#openid").val();
            dataMap.typ = $("#typ").val();
            $.ajaxjsonp(url, dataMap, function(data) {

            });
        }
       
    }
    var mobile = sessionStorage.getItem("loginMobile");
    $("#logmobile").val(mobile);
});

function initOauth(){
    var wxOpenid = $("#openid").val();
    if(!isNull(wxOpenid)){
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
}


//当点击地址选择时，为防止软键盘弹出，取消所有Input的焦点即可
function unFocus(){
    $("input").blur();
}

function sendSms() {
    var mobile = $("#logmobile").val();
    if (isNull(mobile)) {
        showToptip($.i18n.prop('re_phonetip'), "logmobile");
        return false;
    }
    if (!checkMobile(mobile)) {
        showToptip($.i18n.prop('re_sjhgsbzq'), "logmobile");
        return false;
    }
    if (timenum > 0) {
        return false;
    }
    var url = requestPath + "/m/register/sendRandomCode.htm";
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
        $("#yzmBtn").html($.i18n.prop('re_re_verificationcodeobt'));
    }
}

var registerFlag = false;

function register() {
    if (registerFlag) {
        return false;
    }
    if (!checkValue()) {
        return false;
    }

    var url = requestPath + "/m/register/register.htm";
    var dataMap = getDataMap();    
    registerFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showOk('注册成功，审核通过后即可参与抽奖,登陆微商城首页即可抽奖.',function() {
            openPage($.i18n.prop('re_login'), "../customer/login.html", "1");
        });        
    }, false, function() {
        registerFlag = false;
    });
}

function checkValue() {
    var mbname = $("#mbname").val();
    if (isNull(mbname)) {
        showToptip($.i18n.prop('re_companynametip'), "mbname");
        return false;
    }
    var pm = $("#pm").val();
    if (isNull(pm)) {
        showToptip($.i18n.prop('re_pmtip'), "pm");
        return false;
    }
    var str00 = $("#str00").val();
    if (isNull(str00)) {
        showToptip('请选择您的拿货渠道', "str00");
        return false;
    }
    var dq1code = $("#dq1code").val();
    var dqcode = $("#dqcode").val();
    var xjcode = $("#xjcode").val();
    if (isNull(dq1code) ||isNull(dqcode) ||isNull(xjcode)) {
        showToptip('请选择您的地区', "xjcode");
        return false;
    }
    var copaddr = $("#copaddr").val();
    if (isNull(copaddr)) {
        showToptip('请输入您的详细地址', "copaddr");
        return false;
    }
    var logname = $("#logname").val();
    if (isNull(logname)) {
        showToptip($.i18n.prop('re_nametip'), "logname");
        return false;
    }
    var logmobile = $("#logmobile").val();
    if (isNull(logmobile)) {
        showToptip($.i18n.prop('re_phonetip'), "logmobile");
        return false;
    }
    var randCode = $("#randCode").val();
    if (isNull(randCode)) {
        showToptip("请输入验证码", "randCode");
        return false;
    }
    var logpwd = $("#logpwd").val();
    if (isNull(logpwd)) {
        showToptip($.i18n.prop('re_passwordtip'), "logpwd");
        return false;
    }
    var logpwd2 = $("#logpwd2").val();
    if (isNull(logpwd2)) {
        showToptip($.i18n.prop('re_querenpasswordtip'), "logpwd2");
        return false;
    }
    if (logpwd !== logpwd2) {
        showToptip($.i18n.prop('re_lcssmmbyy'), "logpwd2");
        return false;
    }
    return true;
}

function getDataMap() {
    var dataMap = {};
    dataMap.appid = $("#appid").val();
    dataMap.openid = $("#openid").val();
    dataMap.mbname = $("#mbname").val();
    dataMap.dq1code = $("#dq1code").val();
    dataMap.dq1name = $("#dq1name").val();
    dataMap.dqcode = $("#dqcode").val();
    dataMap.dqname = $("#dqname").val();
    dataMap.xjcode = $("#xjcode").val();
    dataMap.xjname = $("#xjname").val();
    dataMap.copaddr = $("#copaddr").val();
    dataMap.logname = $("#logname").val();
    dataMap.logmobile = $("#logmobile").val();
    dataMap.randCode = $("#randCode").val();
	dataMap.fxgid = $("#fxgid").val();
    dataMap.logpwd = hex_md5($("#logpwd").val());
    dataMap.logpwd2 = hex_md5($("#logpwd2").val());
    dataMap.typ = $("#typ").val();
    dataMap.pm = $("#pm").val();
    dataMap.str00 = $("#str00").val();
    if (!isNull($("#userId").val())) {
		dataMap.userId = $("#userId").val(); // 推荐业务员
    }

    return dataMap;
}

function bindPm(){
    $("#pm").select({
        title: "请选择(可多选)",
        multi: true,
        items: ['DTY','FDY','POY','短纤','涤纶切片','锦纶切片'],
        onChange: function(d) {
        },
        onClose: function() {
        },
        onClear: function() {
        }
    });
}
function bindStr00(){
    $("#str00").select({
        title: "请选择(可多选)",
        multi: true,
        items: ['桐昆','新凤鸣','恒力','盛虹','荣盛','百宏','天圣','申久','东南','古纤道','佳宝','新民','力恒','聚合顺','三房巷','华西村','德赛','仪征','翔鹭','其他'],
        onChange: function(d) {
        },
        onClose: function() {
        },
        onClear: function() {
        }
    });
}

function guanbiselect(){
    $("#pm").select("close");

}

