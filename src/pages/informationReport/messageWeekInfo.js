$(function() {
	queryData();
});


function queryData(){
    var url = requestPath + "/m/informationReports/getInfo.htm";
    var dataMap = {};
    dataMap.pkid = $("#pkid").val();
    dataMap.isReport = $("#isReport").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        d.filePathOld = filePathOld;
        console.info(d);
        if($("#isReport").val()==2){ //接收人查看一条
        	if(!isNull(d.data) && !isNull(d.data.informationReports)){
                if(!isNull(d.data.informationReports.saleTableFilePath)){
                    d.data.informationReports.saleTableFilePath = d.data.informationReports.saleTableFilePath.split(',');
                }
	        	$("#contentDiv1").html(template('contentDiv1_page', d));
			}
			if(!isNull(d.data)){
				$("#main1").html(template('main1_page', d));
               	showStartsNum();
			}	
        }else{//上报人查看多条
        	if(!isNull(d.list)){
	        	$("#main").html(template('main_page', d));
			}
			if(!isNull(d.data)){
                if(!isNull(d.data.saleTableFilePath)){
                    d.data.saleTableFilePath = d.data.saleTableFilePath.split(',');
                }
				$("#contentDiv").html(template('contentDiv_page', d));
                if(isNull(d.data.str01)){
                    $("#revocation").show();
                }
			}			
        }; 

        $(".textareaDiv").each(function(){
            console.log($(this).text());
            if(isNull($(this).text())){
               $(this).removeClass("textareaDiv");
               $(this).addClass("defultheight");
            }
        });

        bindImgClick();
        
        setTimeout (function(){
		    	 execI18n();
		    },500);
    });
    
}

function onPage(obj) {
	if (obj == 2) {
		openPage("客户拜访", "../informationReport/messageVistAddressAdd.html");
	}
	if (obj == 3) {
		openPage("周报", "../informationReport/messageWeekAdd.html");
	}
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
template.helper("getImg", function (value) {
        var mx=value.split(",");
        var html = "";
        for (var i = 0; i < mx.length; i++) {
             html += " <li><p><img class='img' classP='kstp" + i + "' onclick='imgImClick(this);' index='"+i+"' src="+filePathOld+mx[i] + "></p> </li>";
        }
        return html;
 });

template.helper("toTextarea", function (str) {
     if(!isNull(str)){
        var reg=new RegExp("<br>","gm");
        var regSpace=new RegExp("&nbsp;","gm");
        str = str.replace(reg,"\n");
        str = str.replace(regSpace," ");
    }
    return str;
 });
template.helper("getFileName", function (str) {
    var s = "";
    if(!isNull(str)){
       s = str.split('/');
    }
    return s[s.length-1];
 });

var canClick = false;//防止重复提交
function saveReply(pkid, contentDivId, beforeStars, receiveUserId, reportId){
    var area = $("#remark_"+contentDivId).val();
	if (!isNull(area) && area.length>300) {
		showMessage("评论内容字数不能超过300！");
		return false;
	}
	var startNum = $("#startsNum").val();
	if($("#isReport").val()==2 && startNum==0 && isNull(beforeStars)){
		showMessage("请先完成评分！");
		return false;
	}
	if (canClick) {
        return false;
    }
    canClick = true;

	var dataMap = {};
  	dataMap.pkid = pkid;
  	dataMap.remartk = area;
  	dataMap.receiveUserId = receiveUserId;
  	dataMap.reportId = reportId;

  	var url = requestPath + "/m/informationReports/addComment.htm";//之前已评过分
	if(isNull(beforeStars) && $("#isReport").val()==2){//之前未评分
	   url = requestPath + "/m/informationReports/score.htm";
	   dataMap.starts = startNum;
	}
	$.ajaxjsonp(url, dataMap, function(data) {
	    }, false, function() {
            openPage("信息反馈列表", "../informationReport/messageSettingsList.html");
	    });  
}

function cleanContent(contentDivId){
	$("#remark_"+contentDivId).val("");
}



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

 function imgImClick(obj){
  var className = $(obj).attr("classP");
  var index = $(obj).attr("index");
  showImgs(className, index);
}

function toRevocation(){
    var dataMap = {};
    var pkid = $("#pkid").val();
    dataMap.pkid = pkid;
    var url = requestPath + "/m/informationReports/revocation.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
        openPage("周报编辑", "../informationReport/messageWeekAdd.html?pkid="+pkid);        
    }); 
}