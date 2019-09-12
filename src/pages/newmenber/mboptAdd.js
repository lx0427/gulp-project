$(function() {
    var hydm = $("#hydm").val();
    if (isNull(hydm)) {
        showMessage($.i18n.prop('com_errorpar'));
        return false;
    }

    //是否为管理员，操作员
    $("#power").select({
        title: "请选择权限",
        items: [{
            title: "管理员",
            value: "1"
        }, {
            title: "操作员",
            value: "0"
        }],
        onChange: function(d) {

            if (isNull(d.values)) {
                $("#power").html("<span class=\"xl\"></span>");
                $("#isadmin").val("");
            } else {
                $("#power").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#isadmin").val(d.values);
            }
        },
        onClose: function() {

        },
        onClear: function() {
            $("#power").html("<span class=\"xl\"></span>");
            $("#isadmin").val("");
        }
    });



});



var saveFlag = false;
var timenum, timefun;
function doSave() {
    if (saveFlag) {
        return false;
    }

    var url = requestPath + "/m/menber/saveOpt.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return null;
    }
    saveFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
            showOk("新增成功", function() {
                openPage("操作员列表", "../newmenber/mboptList.html?hydm=" + $("#hydm").val(), "1");
            });
    }, false, function() {
        saveFlag = false;
    });
}



function getDataMap() {
    var dataMap = {};

    var username = $("#username").val();
    if (!isNull(username)) {
        dataMap.username = username;
    } else {
        showMessage($.i18n.prop('mb_nametip'));
        return null;
    }

    dataMap.isadmin = 0;
    
    if (!isNull($("#mobile").val())) {
        if(!checkMobile($("#mobile").val())){
            showMessage($.i18n.prop('mb_errorphone'));
            return null;
        }
        dataMap.mobile = $("#mobile").val();
    } else {
        showMessage($.i18n.prop('com_phonetip'));
        return null;
    }
    if (!isNull($("#randCode").val())) {
        dataMap.randCode = $("#randCode").val();
    } else {
        showMessage($.i18n.prop('re_verificationcodetip'));
        return null;
    } 
    if (!isNull($("#pwd").val())) {
        dataMap.pwd = hex_md5($("#pwd").val());
    } else {
        showMessage($.i18n.prop('mb_pwdtip'));
        return null;
    }
    dataMap.hydm = $("#hydm").val();

    return dataMap;
}
function sendSmsYz() {
    var mobile = $("#mobile").val();
    if (isNull(mobile)) {
        showToptip($.i18n.prop('re_phonetip'), "mobile");
        return false;
    }  
    if (!checkMobile(mobile)) {
        showToptip("手机号格式不正确", "mobile");
        return false;
    }
    if (timenum > 0) {
        return false;
    }
    var url = requestPath + "/m/register/sendOptCode.htm";
    var dataMap = {};
    dataMap.mobile = mobile;
    dataMap.showLoading = true;
    dataMap.hydm = $("#hydm").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if(d!=null&&d.apply!=null&&d.apply==1){
            if(!isNull($("#username").val())){
                d.aname = $("#username").val();
            }
            showMboptApply();
            if(d.mboptApply!=null){
                $("#apply_ul").html(template('apply_page2', d));
            }else{
                $("#apply_ul").html(template('apply_page', d));
            }
            initSelect();
        }else{
            console.info(d);
            timenum = 60;
            timefun = setInterval(smsSendNum, 1000);
        }
    });
}
function smsSendNum() {
    $("#yzmBtn").css("color","#999");
    $("#yzmBtn").html("("+timenum+")后可重发");
    timenum--;
    if (timenum < 0) {
        clearInterval(timefun);
        $("#yzmBtn").html("重新发送");
        $("#yzmBtn").css("color","#3e7caf");
    }
}
function showMboptApply(){
    $("#applyPage").show();
}
function doCancleApplyPage(num){
     if(num==1){
        $("#applyPage").hide();
    }
    if(num==2 || num==3){
        $("#applyPage2").hide();
    }
}
var submitFlag=false;
function doApply(num){
    if(num==1){
        $("#applyPage").hide();
        $("#applyPage2").show();
    }
    if(num==2){
        if(submitFlag){
            return;
        }
        submitFlag = true;
        if(!checkValue()){
            setTimeout("submitFlag=false;",500);
            return;
        }
        var url = requestPath + "/m/mboptApply/save.htm";
        var dataMap = {};
        dataMap.aname = $("#aname").val();
        dataMap.identity = $("#identity").val();
        dataMap.aphone = $("#aphone").val();
        dataMap.hydm = $("#hydm").val();
        dataMap.mbname = $("#mbname").val();
        dataMap.fr = $("#fr").val();
        dataMap.position = $("#position").val();
        $.ajaxjsonp(url, dataMap, function(data){
            showOk("提交成功", function() {
                openPage("操作员列表", "../newmenber/mboptList.html?hydm=" + $("#hydm").val(), "1");
            });
        },false,function(){
            setTimeout("submitFlag=false;",500);
            setTimeout("$('#dateQueryTrue').css('pointer-events','auto');",500);
        });
    }
}
function checkValue(){
    var aname = $("#aname").val();
    if (isNull(aname)) {
        showToptip("操作员姓名未输入","aname");
        return false;
    }
    var identity = $("#identity").val();
    if (isNull(identity)) {
        showToptip("操作员身份未选择","identity");
        return false;
    }  
    var aphone = $("#aphone").val();
    if (isNull(aphone)) {
        showToptip("手机号未输入","aphone");
        return false;
    }  
    if (!checkMobile(aphone)) {
        showToptip("手机号格式不正确", "aphone");
        return false;
    }
    var mbname = $("#mbname").val();
    if (isNull(mbname)) {
        showToptip("企业名称未输入","mbname");
        return false;
    } 
    var fr = $("#fr").val();
    if (isNull(fr)) {
        showToptip("企业法人未输入","fr");
        return false;
    } 
    return true;
}
function initSelect(){
    $("#identitySelect").select({
        title: "请选择",
        items: [{
            title: "法人",
            value: "法人",
        }, {
            title: "老板",
            value: "老板"
        }, {
            title: "出纳",
            value: "出纳"
        }, {
            title: "采购",
            value: "采购"
        }, {
            title: "子女",
            value: "子女"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#identity").val("");
            } else {
                $("#identity").val(d.values);
            }
        },
        onClose: function() {
        },
        onClear: function() {
            $("#identity").val("");
        }
    });

}