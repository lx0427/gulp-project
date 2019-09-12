$(function() {
    queryData();    
});

function queryData() {
    var url = requestPath + "/m/sapInformationReports/getInfo.htm";
    var dataMap = getDataMap();
	 dataMap.pkid = $("#pkid").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);     

        console.log(d);

        $("#main").html(template('main_page', d));
        
        var emVal = d.data.whType;
				
        $("qnm1").css("display","none");
        $("qnm2").css("display","none");
        $("qnm3").css("display","none");
		if (emVal == 1) {
            $("qnm1").css("display","block");
            $("#title_text").html("随手记");    
		}
		if (emVal == 2) {
            $("qnm2").css("display","block");
            $("qnm2 div textarea").attr("rows",10);
            $("#problemDiv2").css("display","block");
            $("#problemDiv3").css("display","none");
            $("#contentP").html("<span></span>今日工作内容");
            $("#title_text").html("日报"); 
		}
		if (emVal == 3) {
			$("qnm2").css("display","block");
            //$("qnm2 div textarea").attr("rows",10);
            $("qnm3").css("display","block");
            $("qnm3 div textarea").attr("rows",10);
            $("#problemDiv2").css("display","none");
            $("#problemDiv3").css("display","block");
            $("#contentP").html("<span></span>本周工作内容");
            $("#title_text").html("周报"); 
		}
        
        //我上报的，不显示评分按钮，显示评分结果
        if (dataMap.isReport == 1) {
        	$(".wx_btnnext").hide();
            $(".wx_main").css("bottom","0px");
        	$("title").html("我上报的信息");
        	$("title").attr("name","xxfk_wsbdxx");
        }
        
        //我收到的，显示评分按钮，不显示评分结果
		if (dataMap.isReport == 2 && d.data.starts == null) {
        	$(".info_assess").hide();
        	$("title").html("我收到的信息");
        	$("title").attr("name","xxfk_wsddxx");
        } else if (dataMap.isReport == 2 && d.data.starts != null) {
        	$(".wx_btnnext").hide();
            $(".wx_main").css("bottom","0px");
        	$(".info_assess").show();
        	$("title").html("我收到的信息");
        	$("title").attr("name","xxfk_wsddxx");
        }

        bindImgClick();
        
        setTimeout (function(){
		    	 execI18n();
		    },500);
    });
}
function getDataMap() {

    var dataMap = {};

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }
    if (!isNull($("#isReport").val())) {
		dataMap.isReport = $("#isReport").val();
    }
   
    return dataMap;
}

 
 function imgImClick(obj){
  var className = $(obj).attr("classP");
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

function markScore() {    
    $(".rule22").show();
    $("#area").focus();
    $("#area1").hide();
}
function markAdd() {    
    $(".rule22").show();
    $("#area").hide();
    $("#t_startsNum").hide();
    $("#area1").show();
    $("#area1").focus();
    $("#addComment").attr("onclick","addComment()");
}
function doCancel() {
    $(".rule22").hide();
}
var canClick = false;
function doOk() {
	
	if (canClick) {
		return false;
	}
	canClick = true;
	
    var area = $("#area").val();
	if (!isNull(area) && area.length>100) {
		showMessage("评论内容字数不能超过100！");
		return false;
	}
	
  var url = requestPath + "/m/sapInformationReports/score.htm";
  var dataMap = {};
  dataMap.pkid = $("#pkid").val();
  dataMap.starts = $("#startsNum").val();
  dataMap.remartk = $("#area").val();
  $.ajaxjsonp(url, dataMap, function(data) {
    }, false, function() {
        canClick = false;
        // 刷新下
        $(".rule22").hide();
        $(".wx_btnnext").hide();
        $(".wx_main").css("bottom","0px");
        queryData();
    });
	
}

 template.helper("getDescribeEvents", function (value) {
		var mx=value.split(",");
		var html = "";
		var f1=false;
		var f2=false;
		var f3=false;
		var f4=false;
		var f5=false;
	    for (var i = 0; i < mx.length; i++) {
              if(mx[i]=="其它"){
			    f1=true;
			  }
			  if(mx[i]=="生产情况"){
			    f2=true;
			  }
			  if(mx[i]=="订单"){
			    f3=true;
			  }
			  if(mx[i]=="库存"){
			    f4=true;
			  }
			  if(mx[i]=="价格"){
			    f5=true;
			  }
		}
		if(f1){
			 html += "<em  class='tslx  active'>其它</em>";
		}else{
		     html += "<em  class='tslx  '>其它</em>";
		}
		if(f3){
			 html += "<em  class='tslx  active'>订单</em>";
		}else{
		     html += "<em  class='tslx  '>订单</em>";
		}
		if(f4){
			 html += "<em  class='tslx  active'>库存</em>";
		}else{
		     html += "<em  class='tslx  '>库存</em>";
		}
		if(f5){
			 html += "<em  class='tslx  active'>价格</em>";
		}else{
		     html += "<em  class='tslx  '>价格</em>";
		}
		if(f2){
			 html += "<em  class='tslx  active' style='margin-top: 10px;'>生产情况</em>";
		}else{
		     html += "<em  class='tslx  ' style='margin-top: 10px;'>生产情况</em>";
		}
        return html;
 });


// 图片点击事件
function bindImgClick(){
    $("img").unbind("click");
    $("img").bind("click",function(){
        var className = $(this).attr("class");
        var index = $(this).attr("index");
        showImgs(className, index);
    });
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

template.helper("getImg", function (path,value) {
        var mx=value.split(",");
        var html = "";
        for (var i = 0; i < mx.length; i++) {
             html += " <li><p><img class='img' classP='kstp" + i + "' onclick='imgImClick(this);' index='"+i+"' src="+path+mx[i] + "></p> </li>";
        }
        return html;
 });

function toInfo(pkid){
    openPage("查看实地拜访地", "../salesman/messageReportVistAddressInfo.html?pkid=" + pkid);
}

//追加评论
function addComment(){
  var url = requestPath + "/m/sapInformationReports/addComment.htm";
  var dataMap = {};
  dataMap.remartk = $("#area1").val();
  dataMap.pkid = $("#pkid").val();
  $.ajaxjsonp(url, dataMap, function(data) {
    }, false, function() {
        canClick = false;
        // 刷新下
        $(".rule22").hide();
        $(".wx_btnnext").hide();
        $(".wx_main").css("bottom","0px");
        queryData();
    });
    
}