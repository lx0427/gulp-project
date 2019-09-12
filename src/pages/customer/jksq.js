$(function() {
    var extbill = $("#extbill").val();
    if (isNull(extbill)) {
        showMessage("参数错误，订单号为空");
        return false;
    }
    queryData();
});

template.helper("getDate", function(str, pattern) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(pattern);
});

function queryData() {
    var url = requestPath + "/m/jkqd/index.htm";
    var dataMap = {};
    dataMap.extbill = $("#extbill").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);

        // 借款日期是当天，期限90天，
        var now = new Date();
        var jkqx = d.creditList[0].flag2;
        if(isNull(jkqx) || parseInt(jkqx) == 0){
            jkqx = "90";       
        }
        d.jkqx = jkqx;
        d.jkrq = now.format("yyyy-MM-dd");
        now.setDate(now.getDate() + parseInt(d.jkqx));
        d.hkrq = now.format("yyyy-MM-dd");

        $("#main").html(template('main_page', d));

        if (d.creditList.length > 1) {
            bindCredit(d.creditList);
        }
    });
}

var creditMap = {};
function bindCredit(creditList) {
	var array = [];
	for(var i = 0; i< creditList.length; i++){
		creditMap[creditList[i].shopno] = creditList[i];
		var json = {};
		json.title = creditList[i].shopname;
		json.value = creditList[i].shopno;
		array[array.length] = json;
	}
	// 融资机构  
    $("#shopname").select({
        title: "请选择融资机构",
        items: array,           
        onChange: function(d) {
            $("#shopno").val(d.values);
        },
        onClose: function() {
            changeShop();
        },
        onClear: function() {
            $("#shopno").val("");
        }        
    });	
}

function changeShop(){
	var shopno = $("#shopno").val();
	if(isNull(shopno)){
		$("#freeamt").val("0");
		$("#freeamtTxt").text("0");
		$("#dqrq").text("");
		$("#tcmxList").html("");
		return false;
	}
	var credit = creditMap[shopno];
	$("#freeamt").val(credit.freeamt);
	$("#freeamtTxt").text(credit.freeamt);
	$("#dqrq").text(formatDate(credit.endDate,"yyyy-MM-dd"));
    
    var jkqx = credit.flag2;
    if(isNull(jkqx) || parseInt(jkqx) == 0){
        jkqx = "90";
    }
    $("#jkqx").text(jkqx);
    var now = new Date();     
    now.setDate(now.getDate() + parseInt(jkqx));
    $("#hkrq").text(now.format("yyyy-MM-dd"));

	$("#brate").text(credit.brate+"%");
	$("#tcmxList").html(template('tcmxList_page', credit));	
}


var saveFlag = false;

function doSave() {
    if (saveFlag) {
        return false;
    }
    if(!checkValue()){
    	return false;
    }

    confirmMsg("您是否确认进行融资申请", function(){
    	var url = requestPath + "/m/jkqd/save.htm";
	    var dataMap = getDataMap();
	    saveFlag = true;
	    $.ajaxjsonp(url, dataMap, function(data) {
	    	showOk("融资申请成功", function(){
	    		goBack();
	    	});
	    }, false, function() {
	        saveFlag = false;
	    });
    });    
}

function checkValue() {
    var shopno = $("#shopno").val();
    if (isNull(shopno)) {
        showMessage("请选择融资机构");
        return false;
    }
    var freeamt = $("#freeamt").val();
    var htamt = $("#htamt").val();
    if (parseFloat(freeamt) < parseFloat(htamt)) {
        showMessage("可用额度小于订单金额");
        return false;
    }

    return true;
}

function getDataMap() {
    var dataMap = {};
    dataMap.shopno = $("#shopno").val();
    dataMap.extbill = $("#extbill").val();
    dataMap.jklx = "1"; // 1 逸控代，2 信用
    dataMap.rqStart = $("#jkrq").text();
	dataMap.rqEnd = $("#hkrq").text();
	dataMap.amt = $("#htamt").val(); // 融资金额就是订单金额吧

    return dataMap;
}