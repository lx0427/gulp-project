$(function() {
	queryData();
	//微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法 
	window.addEventListener("resize", function () {
		if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
			window.setTimeout(function () {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	});

	// 图片上传
	$("#addImg").bind("click", function() {
		// 最多上传9张
		var len = $(".img").length;
		startUploadPics("imgCallback", 9 - len);
	});
});

function queryData() {
    var url = requestPath + "/m/sapInformationReports/index.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if(!isNull(d.data)){
        	//选择信息反馈类型为日报
        	$("qnm1").css("display","none");
			$("qnm2").css("display","none");
			$("qnm3").css("display","none");

			$(".xxsb_list").removeClass("current");
			$(".xxsb_list").removeClass("xxsb_list_checked");
			$(".typeSpan").css("background","#3e7baf");
			$(".typeSpan").css("color","#fff");

			$(".xxsb_list").eq(1).addClass("current");
			$(".xxsb_list").eq(1).children("span").css("background","#ffffff");
			$(".xxsb_list").eq(1).children("span").css("color","#3e7baf"); 

			$("qnm2").css("display","block");
			$("qnm2 div textarea").attr("rows",10);
			$("#problemDiv2").css("display","block");
			$("#problemDiv3").css("display","none");
			$("#contentP").html("当日小结");
			$("#list").append(template('list_page', d));
			whType=2;

			$("#pkid").val(d.data[0].parentId);
			$("#customerVistNum").val(d.data.length);
		}

		// 周报开始时间,结束时间设置默认值
        var now = new Date();
        var bdate = getMonday(now);
        var edate = getSunday(now);
        $("#bdate").val(bdate);
        $("#edate").val(edate);

         // 日期默认
        var bdefaultVal = [];
        var edefaultVal = [];
        bdefaultVal.push(bdate);
        edefaultVal.push(edate);

        // 开始日期
        $("#bdate").calendar({
            toolbarCloseText: "",
            value: bdefaultVal
        });
        // 结束日期
        $("#edate").calendar({
            toolbarCloseText: "",
            value: edefaultVal
        });
    }, false, function(){});
    
}

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
var _count = 0;
function imgCallback(img) {
	var imgHtml = "<li>";
	imgHtml += "<p><img classP='img' data-src='" + img + "' src='" + filePath + img + "' index='" + _count + "' class='img_" + _count + "' onclick='imgImClick(this);' /></p>";
	imgHtml += "<em><i class='iconfont icon-jian'></i></em>";
	imgHtml += "</li>";

	$("#addImg").before(imgHtml);

	if ($(".img").length == 9) {
		$("#addImg").hide();
	} else {
		$("#addImg").show();
	}

	$("#img_ul em").unbind("click");
	$("#img_ul em").bind("click", function() {
		$(this).parent().remove();
		$("#addImg").show();
	});
	_count ++ ;

}

function imgImClick(obj){
  var className = $(obj).attr("class");
  var index = $(obj).attr("index");
  showImgs(className, index);
}

function showImgs(className, index){
	// 先把之前的移除掉
	$(".weui-photo-browser-modal").remove();
	if(isNull(index)){
		index = 0;
	}
	// 根据样式获取图片数组
	var imgs = [];
	$("."+className).each(function(){
		imgs.push($(this).attr("src"));
	});
	var pb = $.photoBrowser({
		items:imgs,
		initIndex:index
	});
	pb.open();
}


// 初始化微信授权id
function initOauth() {
	var wxOpenid = $("#openid").val();
	if (!isNull(wxOpenid)) {
		sessionStorage.setItem("wxOpenid", wxOpenid);
	}
}
function checkValue(){
	if(whType==1){
		if(isNull($("#problem1").val())){
			showMessage("请输入随手记!");
			return false;
		}
		if($("#problem1").val().length >= 500){
			showMessage("内容不超过500字符!");
			return false;
		}
	}
	else if(whType==2){
		if(!isNull($("#problem2").val()) && $("#problem2").val().length >= 500){
			showMessage("内容不超过500字符!");
			return false;
		}
	}
	else if(whType==3){
			if(isNull($("#customerTelNum3").val())){
				showMessage("请输入电话拜访数!");
				return false;
			}
			if(isNull($("#customerVistNum3").val())){
				showMessage("请输入实地拜访数!");
				return false;
			}
			if(isNull($("#addCustomerNum3").val())){
				showMessage("请输入新增客户数!");
				return false;
			}
			if(isNull($("#inportantCustomer3").val())){
				showMessage("请输入重点客户!");
				return false;
			}
			if(isNull($("#orderNum3").val())){
				showMessage("请输入订单数!");
				return false;
			}
			if(isNull($("#deliveryNum3").val())){
				showMessage("请输入出库数!");
				return false;
			}
			if(isNull($("#reportGg3").val())){
				showMessage("请输入规格!");
				return false;
			}
			if(isNull($("#weight3").val())){
				showMessage("请输入重量!");
				return false;
			}

			if(isNull($("#weekCustomerTelNum").val())){
				showMessage("请输入下周电话拜访数!");
				return false;
			}
			if(isNull($("#weekCustomerVistNum").val())){
				showMessage("请输入下周实地拜访数!");
				return false;
			}
			if(isNull($("#weekAddCustomerNum").val())){
				showMessage("请输入下周新增客户数!");
				return false;
			}
			if(isNull($("#weekInportantCustomer").val())){
				showMessage("请输入下周重点客户!");
				return false;
			}
			if(isNull($("#weekEvaluateSales").val())){
				showMessage("请输入预估出售总量!");
				return false;
			}
			if(isNull($("#bdate").val())){
				showMessage("请输入周计划开始时间!");
				return false;
			}
			if(isNull($("#edate").val())){
				showMessage("请输入周计划结束时间!");
				return false;
			}
			if(!compareDate($("#bdate").val(), $("#edate").val())){
				showMessage("结束时间不能小于开始时间!");
				return false;
			};
			if($("#problem3").val().length >= 500){
				showMessage("内容不超过500字符!");
				return false;
			}
			if($("#weekPlanIntroduce").val().length >= 500){
				showMessage("内容不超过500字符!");
				return false;
			}
			
	}
	return true;
}

var whType = 1;//全局变量 类型   1 信息反馈  2 日报  3周报

function getDataMap() {
	var dataMap = {};    
	dataMap.wxOpenid = $("#openid").val();
	dataMap.whType = whType;
	if(whType==1){//随手记
		dataMap.problem = $("#problem1").val();
		// 上传图片
		var complaintImages = "";
		$("img[classP='img']").each(function() {
			complaintImages += "," + $(this).attr("data-src");
		});
		if (!isNull(complaintImages)) {
			complaintImages = complaintImages.substring(1);
		}
		dataMap.uploadAppendageAddress = complaintImages;

	}
	if(whType==2){//日报
		dataMap.customerTelNum = $("#customerTelNum").val();
		dataMap.customerVistNum = $("#customerVistNum").val();
		dataMap.addCustomerNum = $("#addCustomerNum").val();
		dataMap.inportantCustomer = $("#inportantCustomer").val();
		dataMap.orderNum = $("#orderNum").val();
		dataMap.deliveryNum = $("#deliveryNum").val();
		dataMap.reportGg = $("#reportGg").val();
		dataMap.weight = $("#weight").val();
		dataMap.problem = $("#problem2").val();
		dataMap.pkid=$("#pkid").val();
	}
	if(whType==3){//周报
		dataMap.customerTelNum = $("#customerTelNum3").val();
		dataMap.customerVistNum = $("#customerVistNum3").val();
		dataMap.addCustomerNum = $("#addCustomerNum3").val();
		dataMap.inportantCustomer = $("#inportantCustomer3").val();
		dataMap.orderNum = $("#orderNum3").val();
		dataMap.deliveryNum = $("#deliveryNum3").val();
		dataMap.reportGg = $("#reportGg3").val();
		dataMap.weight = $("#weight3").val();
		dataMap.problem = $("#problem3").val();
		dataMap.weekCustomerTelNum = $("#weekCustomerTelNum").val();
		dataMap.weekCustomerVistNum = $("#weekCustomerVistNum").val();
		dataMap.weekAddCustomerNum = $("#weekAddCustomerNum").val();
		dataMap.weekInportantCustomer = $("#weekInportantCustomer").val();
		dataMap.weekEvaluateSales = $("#weekEvaluateSales").val();
		dataMap.weekPlanIntroduce = $("#weekPlanIntroduce").val();
		dataMap.bdateStr = $("#bdate").val();
		dataMap.edateStr = $("#edate").val();
	} 
	return dataMap;
}

function removeInputBlur() {
	$('input,textarea').each(function() {
		$(this).blur();
	});
}

var editFlag = false;
function saveReportInformation () {
	console.info("上报类型:"+whType);
	if (!checkValue()) {
		return false;
	}
	if (editFlag) {
		return false;
	}
	
	var dataMap = getDataMap ();
	if (isNull(dataMap)) {
		editFlag = false;
		return false;
	}
	// console.info(dataMap);
	// alert(JSON.stringify(dataMap));
	// return false;
	var url = requestPath + "/m/sapInformationReports/doSave.htm";

	if(whType==2){
		confirmMsg("日报提交后不能修改，确定提交日报？", function() {
			editFlag = true;
			$.ajaxjsonp(url, dataMap, function(data) {
			   openPage("客户维护列表", "../salesman/messageSettingsList.html");
			}, false, function() {
				editFlag = false;
			});
		});
	}else{
		editFlag = true;
		$.ajaxjsonp(url, dataMap, function(data) {
		   openPage("客户维护列表", "../salesman/messageSettingsList.html");
		}, false, function() {
			editFlag = false;
		});
	}
}

function initPage() {
	var url = requestPath + "/m/sapInformationReports/getInfo.htm";
	var dataMap = {};
	dataMap.pkid = $("#pkid").val();
	$.ajaxjsonp(url, dataMap, function(data) {
	   var d = eval(data);
	   console.log(d);
   
	   $(".wx_btnnew").css("display","none");
	   if (!isNull(d)) {
			
	   }
	}, false);
}

function unFocus(){
	$("input").blur();
}

var qtStr = "";
function editElse (obj) {
	qtStr = obj.html();
	console.log(qtStr);
	var divId = obj.parent().attr("id");
	$("#" + divId + " .tslx").removeClass("active");
	obj.parent().addClass("active");
	var elseWidth = obj.width();
	obj.removeAttr("onclick");
	obj.html("<input type='text' id='xxfk_qtsrk' style='width:" + elseWidth + "px;' maxlength='3' onblur='goEm($(this));' onmouseout='goEm($(this));' />");
	$("#xxfk_qtsrk").focus();
}
function goEm(obj) {
	var objClone = obj.parent();
	console.log(obj.val());
	obj.parent().attr("onclick","editElse($(this))");
	if (isNull(obj.val())) {
		obj.parent().html(qtStr);
	} else {
		obj.parent().html(obj.val());
		objClone.attr("val",obj.val());
	}
	var divId = objClone.parent().attr("id");
	$("#" + divId + " .tslx").removeClass("active");
	console.log(objClone.attr("class"));
	objClone.addClass("active");
}

function c(obj) {
	var emVal = $(obj).attr("val");
	$(".xxsb_list").removeClass("current");
	$(obj).addClass("current");
	
	$(".typeSpan").css("background","#3e7baf");
	$(".typeSpan").css("color","#fff");
	$(obj).children("span").css("background","#ffffff");
	$(obj).children("span").css("color","#3e7baf");
	
	$("qnm1").css("display","none");
	$("qnm2").css("display","none");
	$("qnm3").css("display","none");
	if (emVal == 1) {
		$("qnm1").css("display","block");
		whType=1;
	}
	if (emVal == 2) {
		$("qnm2").css("display","block");
		$("qnm2 div textarea").attr("rows",10);
		whType=2;
	}
	if (emVal == 3) {
		$("qnm3").css("display","block");
		$("qnm3 div textarea").attr("rows",10);
		whType=3;
	}
}

function getMonday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth(); //获取月份
    var d = dd.getDate();
    var date = new Date(y,m,d);
    var monday = date.format("yyyy-MM-dd");
    return monday;
}

function getSunday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? 7 - week : 0;
    dd.setDate(dd.getDate() + minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth(); //获取月份
    var d = dd.getDate();
    var date = new Date(y,m,d);
    var sunday = date.format("yyyy-MM-dd");
    return sunday;
}

//时间比较（yyyy-MM-dd）
function compareDate(startDate, endDate) {
  var arrStart = startDate.split("-");
  var startTime = new Date(arrStart[0], arrStart[1], arrStart[2]);
  var startTimes = startTime.getTime();
  var arrEnd = endDate.split("-");
  var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2]);
  var endTimes = endTime.getTime();
  if (endTimes<startTimes) {
    return false;
  }
  return true;
}

function addVistAddress(){
	var pkid = $("#pkid").val();
	openPage("添加实地拜访地", "../salesman/messageReportVistAddressAdd.html?pkid="+pkid);
}

function toInfo(pkid){
	openPage("查看实地拜访地", "../salesman/messageReportVistAddressInfo.html?pkid=" + pkid);
}

