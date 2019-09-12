$(function() {    
    queryData();
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
});

function initOauth(){
    var wxOpenid = $("#openid").val();
    if(!isNull(wxOpenid)){
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
}

function queryData() {
    var url = requestPath + "/m/menberManager/bySalesman/toEdit.htm";
    var dataMap = {};
    var clientRequest = getRequest();   
    dataMap.hydm = clientRequest["hydm"];
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);

            console.info(d);
            console.info(JSON.stringify(d));
            $("#hydm").val(d.data.hydm);
            $("#mbname").val(d.data.mbname);
            oldMbName = d.data.mbname;
            $("#fr").val(d.data.fr);
            $("#frtel").val(d.data.frtel);
            $("#dq1code").val(d.data.dq1code);
            $("#dq1name").val(d.data.dq1name);
            $("#dqcode").val(d.data.dqcode);
            $("#dqname").val(d.data.dqname);
            $("#xjcode").val(d.data.xjcode);
            $("#xjname").val(d.data.xjname);
            if(d.data.dq1name!=null&&d.data.dqname!=null&&d.data.xjname!=null){
                $("#dq_txt").val(d.data.dq1name + " " + d.data.dqname + " " + d.data.xjname);
            }
            $("#copaddr").val(d.data.copaddr);
            $("#shno1").val(d.data.shno1);
            $("#khbank").val(d.data.khbank);
            $("#khzh").val(d.data.khzh);
            $("#coplxr").val(d.data.coplxr);
            $("#mobile").val(d.data.mobile);
            if(d.data.flag13!=null&&d.data.flag13==0){
                $("#radio1").attr("checked", "checked");
            } 
            if(d.data.flag13!=null&&d.data.flag13==1){
                $("#radio2").attr("checked", "checked");
            }            
            $("#position").val(d.data.position);
            $("#copfax").val(d.data.copfax);

            $("#shno2url").val(d.data.shno2url);
            $("#shno2urlImg").attr("src", d.data.shno2url);
            $("#shno2url1").val(d.data.shno2url1);
            $("#shno2url1Img").attr("src", d.data.shno2url1);
            $("#shno2url2").val(d.data.shno2url2);
            $("#shno2url2Img").attr("src", d.data.shno2url2);
            $("#threeInOne").val(d.data.threeInOne);
            $("#threeInOneImg").attr("src", d.data.threeInOne);
            $("#fiveInOne").val(d.data.threeInOne);
            $("#fiveInOneImg").attr("src", d.data.fiveInOne);
            $("#billingInfo").val(d.data.billingInfo);
            $("#billingInfoImg").attr("src", d.data.billingInfo);
    }, false);
}

function toLogin() {    
    eval(loginName);
}

//当点击地址选择时，为防止软键盘弹出，取消所有Input的焦点即可
function unFocus(){
    $("input").blur();
}

var registerFlag = false;

function update() {
    if (registerFlag) {
        return false;
    }
    if (!checkValue()) {
        return false;
    }

    var url = requestPath + "/m/menberManager/bySalesman/update.htm";
    var dataMap = getDataMap();  
    console.info(dataMap);  
    console.info(JSON.stringify(dataMap));

    registerFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showOk($.i18n.prop('ebs_updatasuccess'),function() {
            openPage($.i18n.prop('ebs_fhlb'), "../newmenber/menberList.html", "1");
        });        
    }, false, function() {
        registerFlag = false;
    });
}

function checkValue() {
    var mbname = $("#mbname").val();
    if (isNull(mbname)) {
        showToptip($.i18n.prop('ebs_khnametip'), "mbname");
        return false;
    }
    var fr = $("#fr").val();
    if (isNull(fr)) {
        showToptip($.i18n.prop('ebs_frdbtip'), "fr");
        return false;
    }
    var frtel = $("#frtel").val();
    if (isNull(frtel)) {
        showToptip($.i18n.prop('ebs_kpphonetip'), "frtel");
        return false;
    }
    if (!checkMobile(frtel)&&checkTel(frtel)) {
        showToptip($.i18n.prop('ebs_kpdhgsbzq'), "frtel");
        return false;
    }
    var copaddr = $("#copaddr").val();
    if (isNull(copaddr)) {
        showToptip($.i18n.prop('ebs_gsaddresstip'), "copaddr");
        return false;
    }
    var shno1 = $("#shno1").val();
    if (isNull(shno1)) {
        showToptip($.i18n.prop('ebs_shtip'), "shno1");
        return false;
    }
    var khbank = $("#khbank").val();
    if (isNull(khbank)) {
        showToptip($.i18n.prop('ebs_khhtip'), "khbank");
        return false;
    }
    var khzh = $("#khzh").val();
    if (isNull(khzh)) {
        showToptip($.i18n.prop('ebs_yhnumbertip'), "khzh");
        return false;
    }
    if(khzh.length < 9 || khzh.length > 30) {
        // showToptip("请输入验证码", "khzh");
    　　showToptip($.i18n.prop('ebs_yhkhcd'));
    　　return false;
    }
    var num = /^\d*$/; //全数字
    if(!num.exec(khzh)) {
    　　showToptip($.i18n.prop('ebs_yhkbxwsz'));
    　　return false;
    }
    var dq1name = $("#dq1name").val();
    if (isNull(dq1name)) {
        showToptip($.i18n.prop('ebs_qsrsf'), "dq1name");
        return false;
    }
    var dqname = $("#dqname").val();
    if (isNull(dqname)) {
        showToptip($.i18n.prop('ebs_qsrcs'), "dqname");
        return false;
    }
    var mobile = $("#mobile").val();
    if (isNull(mobile)) {
        showToptip($.i18n.prop('ebs_lxrphonetip'), "mobile");
        return false;
    }
    if (!checkMobile(mobile)&&checkTel(mobile)) {
        showToptip($.i18n.prop('ebs_sjhgsbzq'), "mobile");
        return false;
    }
    return true;
}

function getDataMap() {
    var dataMap = {};
    dataMap.hydm = $("#hydm").val();
    dataMap.mbname = $("#mbname").val();
    dataMap.fr = $("#fr").val();
    dataMap.frtel = $("#frtel").val();
    dataMap.dq1code = $("#dq1code").val();
    dataMap.dq1name = $("#dq1name").val();
    dataMap.dqcode = $("#dqcode").val();
    dataMap.dqname = $("#dqname").val();
    dataMap.xjcode = $("#xjcode").val();
    dataMap.xjname = $("#xjname").val();
    dataMap.copaddr = $("#copaddr").val();
    dataMap.shno1 = $("#shno1").val();
    dataMap.khbank = $("#khbank").val();
    dataMap.khzh = $("#khzh").val();
	dataMap.coplxr = $("#coplxr").val();
    dataMap.mobile = $("#mobile").val();
    dataMap.flag13 = $('input:radio:checked').val();
    dataMap.position = $("#position").val();
    dataMap.copfax = $("#copfax").val();

    dataMap.shno2url = $("#shno2url").val();
    dataMap.shno2url1 = $("#shno2url1").val();
    dataMap.shno2url2 = $("#shno2url2").val();
    dataMap.threeInOne = $("#threeInOne").val();
    dataMap.fiveInOne = $("#fiveInOne").val();
    dataMap.billingInfo = $("#billingInfo").val();
    dataMap.flag14 = 1;
   
    if (!isNull($("#userId").val())) {
		dataMap.userId = $("#userId").val(); // 推荐业务员
    }

    return dataMap;
}

 function checkTel(tel){
    if(!(/^0\d{2,3}-[1-9]\d{6,7}$/.test(tel))){
        return false;
    }
}

// 上传附件图片
var photoType = "";
function loadShno2urlPic() {
    photoType=0;
    startUpload("photoCallback");
}
function loadShno2url1Pic() {
    photoType=1;
    startUpload("photoCallback");
}
function loadShno2url2Pic() {
    photoType=2;
    startUpload("photoCallback");
}
function loadThreeInOnePic() {
    photoType=3;
    startUpload("photoCallback");
}
function loadFiveInOnePic() {
    photoType=4;
    startUpload("photoCallback");
}
function loadBillingInfoPic() {
    photoType=5;
    startUpload("photoCallback");
}
// 头像上传回调
function photoCallback(data) {
    var d = JSON.parse(data);
    if(photoType==0){
        $("#shno2url").val(filePath+d.result);
        $("#shno2urlImg").attr("src", filePath + d.result);
    }
    if(photoType==1){
        $("#shno2url1").val(filePath+d.result);
        $("#shno2url1Img").attr("src", filePath + d.result);
    }
    if(photoType==2){
        $("#shno2url2").val(filePath+d.result);
        $("#shno2url2Img").attr("src", filePath + d.result);
    }
    if(photoType==3){
        $("#threeInOne").val(filePath+d.result);
        $("#threeInOneImg").attr("src", filePath + d.result);
    }
    if(photoType==4){
        $("#fiveInOne").val(filePath+d.result);
        $("#fiveInOneImg").attr("src", filePath + d.result);
    }
    if(photoType==5){
        $("#billingInfo").val(filePath+d.result);
        $("#billingInfoImg").attr("src", filePath + d.result);
    }
    
}

var canSave = false;
var oldMbName = "";
function valiName(obj){
	
	var url = requestPath + "/m/menberManager/bySalesman/isRegister.htm";
	var dataMap = {};
	if (isNull(obj.val())) {
		return false;
	}
	dataMap.mbname = obj.val();
	dataMap.isAdd = 0;
	dataMap.oldName = oldMbName;
	$.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if (!d.isRegister) {
        	showToptip($.i18n.prop('ebs_khmccf'), "mbname");
        } else {
        	canSave = true;
        }          
    }, false, function() {
        
    });
}