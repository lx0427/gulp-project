$(function() {
	queryData();
});

function queryData() {
    var url = requestPath + "/m/supplyDemand/getInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#main").html(template('main_page', d));
        execI18n();

    });
}

//保存信息
function updateInfo(){
			
			//整理表单数据
			//验证  价格为不超过两位小数的数字 数量为数字  其它都不为空
			var resultParams = {};	
			
			var resultCheck = checkParams(resultParams);
			
			if(resultCheck.canUpdate){//验证通过
				resultParams = resultCheck.params;
				var url = requestPath + "/m/supplyDemand/saveInfo.htm";
	    	$.ajaxjsonp(url, resultParams, function(data) {});
			}			
}

//长度验证根据数据库字段长度走 
//  字段过长显示  有问题   必须规定显示长度		暂时规定以下长度
function checkParams(resultParams){
	
	var resultCheck = {};
	
	//当编辑前台添加的数据的时候 需要验证  str02字段  忽略  品名 批号 等级 规格  验证
	//当编辑后台添加的数据的时候  与上相反
	var pkid = $("#pkid").val();
	var isFront = $("#isFront").val();
	
	if(!isNull($("#str01").val())){
		resultParams.str01 = $("#str01").val();
	}else{
		showToptip("请输入您的供求类型", "str01");
		resultCheck.canUpdate = false;
		resultCheck.params = resultParams;
    return resultCheck;
	}	
	
	if(!isNull(pkid) && pkid != 'undefined'){//详情界面
		
		if(isFront == 'true'){//前台添加
		
			if (!isNull($("#str02").val())) {
					if(document.getElementById("str02").value.length > 80){
						showToptip("需求不可超过80个字符", "str02");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
					}
					resultParams.str02 = $("#str02").val();
				}else{
					showToptip("请输入您的需求", "str02");
					resultCheck.canUpdate = false;
					resultCheck.params = resultParams;
	        return resultCheck;
				}	
		
		}else{//后台添加
		if (!isNull($("#pm").val())) {
				resultParams.pm = $("#pm").val();
			}else{
				showToptip("请输入您的品名", "pm");
				resultCheck.canUpdate = false;
				resultCheck.params = resultParams;
        return resultCheck;
			}
			if (!isNull($("#ph").val())) {
				resultParams.ph = $("#ph").val();
			}else{
				showToptip("请输入您的批号", "ph");
				resultCheck.canUpdate = false;
				resultCheck.params = resultParams;
        return resultCheck;
			}
			if (!isNull($("#cd").val())) {
				if(document.getElementById("cd").value.length > 8){
						showToptip("等级不可超过8个字符", "cd");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
					}
				resultParams.cd = $("#cd").val();
			}else{
				showToptip("请输入您的等级", "cd");
				resultCheck.canUpdate = false;
				resultCheck.params = resultParams;
        return resultCheck;
			}
			if (!isNull($("#gg").val())) {
				if(document.getElementById("gg").value.length > 20){
						showToptip("规格不可超过20个字符", "gg");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
					}
				resultParams.gg = $("#gg").val();
			}else{
				showToptip("请输入您的规格", "gg");
				resultCheck.canUpdate = false;
				resultCheck.params = resultParams;
        return resultCheck;
			}
		}
				
		}else{//前台新增数据
			
			if (!isNull($("#str02").val())) {
					if(document.getElementById("str02").value.length > 80){
						showToptip("需求不可超过80个字符", "str02");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
					}
					resultParams.str02 = $("#str02").val();
				}else{
					showToptip("请输入您的需求", "str02");
					resultCheck.canUpdate = false;
					resultCheck.params = resultParams;
	        return resultCheck;
				}	
	
		}
			if (!isNull($("#price").val())) {

					validationNumber(document.getElementById("price"), 2);
					
					if(document.getElementById("price").value.length > 20){
						showToptip("价格不可超过20个字符", "price");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck
					}
					
					resultParams.price = $("#price").val();
			}else{
				showToptip("请输入您的价格", "price");
				resultCheck.canUpdate = false;
				resultCheck.params = resultParams;
        return resultCheck;
			}
			if(!isNull($("#zl").val())) {
				
				validationNumber(document.getElementById("zl"), 0);		
						
				if(document.getElementById("zl").value.length > 8){
						showToptip("数量不可超过8个字符", "zl");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
				}
				resultParams.zl = $("#zl").val();
			}else{
				showToptip("请输入您的数量", "zl");
				resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
        return resultCheck;
			}
			if (!isNull($("#lxr").val())) {
				if(document.getElementById("lxr").value.length > 8){
						showToptip("联系人不可超过8个字符", "lxr");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
					}
				resultParams.lxr = $("#lxr").val();
			}else{
				showToptip("请输入您的联系人", "lxr");
				resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
        return resultCheck;
			}
			if (!isNull($("#mobile").val())) {
				if(document.getElementById("mobile").value.length > 11){
						showToptip("手机号不可超过11个字符", "mobile");
						resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
	        	return resultCheck;
					}
				resultParams.mobile = $("#mobile").val();
			}else{
				showToptip("请输入您的手机号", "mobile");
				resultCheck.canUpdate = false;
						resultCheck.params = resultParams;
        return resultCheck;
			}
			
			if (!isNull($("#pkid").val())) {
				resultParams.pkid = $("#_pkid").val();
			}
			resultCheck.canUpdate = true;
						resultCheck.params = resultParams;
			return resultCheck;
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }
    if (!isNull($("#isMy").val())) {
        dataMap.isMy = $("#isMy").val();
    }
   
    return dataMap;
}

var pmcode = "1"
function showPmSelect() {
    $("#xlsx3").html(template('pmlist_page', 1));
    $("#pm" + pmcode).addClass("current");
    $("#pm").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
}

function toHide() {
    $(".wx_pulldownbox2").hide();
    $(".wx_opacity2").hide();
    $(".wx_opacity").hide();
    $(".wx_pulldownbox").hide();

    $(".wx_ziyfilter li").removeClass("current");
}

function pmSelect(pm, code) {
    pmcode = code;
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    $("#pm").val(pm);
}

//e : 验证对象  dom
//num : 保存小数点后几位
 function validationNumber(e, num) {
    var regu = /^[0-9]+\.?[0-9]*$/;
    if (e.value != "") {
        if (!regu.test(e.value)) {
            e.value = "";
            e.focus();
            return false;
        } else {
            if (num == 0) {
                if (e.value.indexOf('.') > -1) {
                    e.value = e.value.substring(0, e.value.indexOf('.'));
                    e.focus();
                }
            }
            if (e.value.indexOf('.') > -1) {
                if (e.value.split('.')[1].length > num) {
                    e.value = e.value.substring(0, e.value.indexOf('.') + 2);
                    e.focus();
            				return false;
                }
            }

        }
    }
}
var pmcode_str01 = "1"
function showGgSelect() {
    $("#xlsx3_str01").html(template('str01list_page', 1));
    $("#str01" + pmcode_str01).addClass("current");
    $("#str01").addClass("current");
    $(".wx_pulldownbox2_str01").toggle();
    $(".wx_opacity2_str01").toggle();
}

function str01toHide() {
    $(".wx_pulldownbox2_str01").hide();
    $(".wx_opacity2_str01").hide();
    
    $(".wx_opacity").hide();
    $(".wx_pulldownbox").hide();

    $(".wx_ziyfilter li").removeClass("current");
}

function str01Select(str01, code) {
    pmcode_str01 = code;
    $(".wx_pulldownbox2_str01").toggle();
    $(".wx_opacity2_str01").toggle();
    $("#str01").val(str01);
    
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
}
