$(function() {
    var url = window.location.href;
    scanRecord(20,0,'',url,'我的秒杀');
    queryData();
});

function queryData() {
    var url = requestPath + "/m/seckill/seckillList.htm";
    var dataMap = getDataMap();
	$.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
		if(type==1){
	        if (pullRefresh) {
	            $("#list").html(template('list_page1', d));
	        } else {
	            $("#list").append(template('list_page1', d));
	        }
	    }
        if(type==2){
	        if (pullRefresh) {
	            $("#list").html(template('list_page2', d));
	        } else {
	            $("#list").append(template('list_page2', d));
	        }
	    }

        }, true, function() {
		  
     });
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

function loadData(t) {
	 type = t;
	 $("#pageIndex").val(0);
	 $("#list").html("");
	 if(t=="1"){
	 $("#input2").removeClass("input_class_current");
	 $("#input1").addClass("input_class_current");
	
	 $("#input1").removeClass("input_class_nocurrent");
	 $("#input2").addClass("input_class_nocurrent");
	  }
	 if(t=="2"){
	 $("#input1").removeClass("input_class_current");
	 $("#input2").addClass("input_class_current");
	
	 $("#input2").removeClass("input_class_nocurrent");
	 $("#input1").addClass("input_class_nocurrent");
  }


    var url = requestPath + "/m/seckill/seckillList.htm";
    var dataMap = getDataMap();
	
	 $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		console.info(d);
        if(type==1){
         if (pullRefresh) {
            $("#list").html(template('list_page1', d));
        } else {
            $("#list").append(template('list_page1', d));
        }
	    }
        if(type==2){
         if (pullRefresh) {
            $("#list").html(template('list_page2', d));
        } else {
            $("#list").append(template('list_page2', d));
        }
	    }
        
        }, true, function() {
		  
     });
}

var type = 1;

function getDataMap() {
    var dataMap = {};
	dataMap.type=type;
	dataMap.circleId=circleId;
    return dataMap;
}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");

    queryData();
}

function toDetailInfo(pkid){
	openPage("秒杀详情","../customer/seckillInfo.html?pkid="+pkid,"1");
}
