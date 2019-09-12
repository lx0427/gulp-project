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
    var url = requestPath + "/m/menberManager/bySalesman/toAdd.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);   
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

function save() {
    if (registerFlag) {
        return false
    }
    if (!checkValue()) {
        return false;
    }

		if (!canSave) {
			showToptip("客户名称重复！", "mbname");
			return false;
		}

    var url = requestPath + "/m/menberManager/bySalesman/save.htm";
    var dataMap = getDataMap();  
    console.info(dataMap);  
    console.info(JSON.stringify(dataMap));

    registerFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showOk("新增成功",function() {
            openPage("返回列表", "../newmenber/menberList.html", "1");
        });        
    }, false, function() {
        registerFlag = false;
    });
}

function checkValue() {
    var mbname = $("#mbname").val();
    if (isNull(mbname)) {
        showToptip("请输入您的客户名称", "mbname");
        return false;
    }
    var fr = $("#fr").val();
    if (isNull(fr)) {
        showToptip("请输入法人代表", "fr");
        return false;
    }
    var frtel = $("#frtel").val();
    if (isNull(frtel)) {
        showToptip("请输入开票电话", "frtel");
        return false;
    }
    if (!checkMobile(frtel)&&checkTel(frtel)) {
        showToptip("开票电话格式不正确", "frtel");
        return false;
    }
    var copaddr = $("#copaddr").val();
    if (isNull(copaddr)) {
        showToptip("请输入公司地址", "copaddr");
        return false;
    }
    var shno1 = $("#shno1").val();
    if (isNull(shno1)) {
        showToptip("请输入税号", "shno1");
        return false;
    }
    var khbank = $("#khbank").val();
    if (isNull(khbank)) {
        showToptip("请输入开户行", "khbank");
        return false;
    }
    var khzh = $("#khzh").val();
    if (isNull(khzh)) {
        showToptip("请输入银行账号", "khzh");
        return false;
    }
    if(khzh.length < 9 || khzh.length > 30) {
    　　showToptip("银行卡号长度必须在9到30之间");
    　　return false;
    }  

    var dq1name = $("#dq1name").val();
    if (isNull(dq1name)) {
        showToptip("请输入省份", "dq1name");
        return false;
    }
    var dqname = $("#dqname").val();
    if (isNull(dqname)) {
        showToptip("请输入城市", "dqname");
        return false;
    }
    var mobile = $("#mobile").val();
    if (isNull(mobile)) {
        showToptip("请输入联系人电话", "mobile");
        return false;
    }
    if (!checkMobile(mobile)&&checkTel(mobile)) {
        showToptip("手机号格式不正确", "mobile");
        return false;
    }
    var coplxr = $("#coplxr").val();
    if (isNull(coplxr)) {
        showToptip("请输入联系人", "coplxr");
        return false;
    } else {
    	var forbiddenStr = ["先生","先生","女士","老板","老板娘","厂长","经理","*总","会计","财务","出纳","采购","小姐","主任","老*","小*","*哥","*姐"];
    	var canSubmit = true;
			for (var i=0,j=forbiddenStr.length;i<j;i++) {
				if (forbiddenStr[i].indexOf("*") >= 0) {
					
					var lastStr = coplxr.substr(coplxr.length-1,1);
					var startStr = coplxr.substr(0,1);
					
					if (lastStr == "总" || lastStr == "哥" || lastStr == "姐") {
						showToptip("不允许输入" + lastStr, "coplxr");
						canSubmit = false;
						break;
					}
					if (startStr == "老" || startStr == "小") {
						showToptip("不允许输入" + startStr, "coplxr");
						canSubmit = false;
						break;
					}
					
				} else {
					if (coplxr.indexOf (forbiddenStr[i]) >= 0) {
						showToptip("不允许输入" + forbiddenStr[i], "coplxr");
						canSubmit = false;
						break;
					}
				}
			}  
			if (!canSubmit) {
				return false;
			}  	
    	
    	
    }
 
    return true;
}

function getDataMap() {
    var dataMap = {};
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
// 图片上传回调
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
function valiName(obj){
	
	var url = requestPath + "/m/menberManager/bySalesman/isRegister.htm";
	var dataMap = {};
	if (isNull(obj.val())) {
		return false;
	}
	dataMap.mbname = obj.val();
	dataMap.isAdd = 1;
	dataMap.oldName = "";
	$.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if (!d.isRegister) {
        	showToptip("该客户已存在！", "mbname");
        } else {
        	canSave = true;
        }          
    }, false, function() {
        
    });
}

function valiCoplxr(obj) {

	var coplxr = obj.val();
	var forbiddenStr = ["先生","先生","女士","老板","老板娘","厂长","经理","*总","会计","财务","出纳","采购","小姐","主任","老*","小*","*哥","*姐"];
	var canSubmit = true;
	for (var i=0,j=forbiddenStr.length;i<j;i++) {
		if (forbiddenStr[i].indexOf("*") >= 0) {

		var lastStr = coplxr.substr(coplxr.length-1,1);
		var startStr = coplxr.substr(0,1);

		if (lastStr == "总" || lastStr == "哥" || lastStr == "姐") {
			showToptip("不允许输入" + lastStr, "coplxr");
			canSubmit = false;
			break;
		}
		if (startStr == "老" || startStr == "小") {
			showToptip("不允许输入" + startStr, "coplxr");
			canSubmit = false;
			break;
		}

		} else {
		if (coplxr.indexOf (forbiddenStr[i]) >= 0) {
				showToptip("不允许输入" + forbiddenStr[i], "coplxr");
				canSubmit = false;
				break;
			}
		}
	}  
	if (!canSubmit) {
		return false;
	}

}