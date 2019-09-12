$(function() {
    var url = window.location.href;
    scanRecord(15,0,'',url,'我的融资');
    initPage();

    $("#form").bind("submit", function() {
        initPage();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
    });

    
    // 第一次是onChange-->onOpen
    // 后面是 onOpen
    
    var rqChange = false;
    var rqStr = "";
    $("#rq").calendar({
        onOpen: function() {
            $("#rqTxt").parent().addClass("current");
            if (rqChange) {
                rqStr = "";
                rqChange = false;
            }
        },
        onChange: function(p, values, displayValues) {  
            rqChange = true;
            rqStr = values;
        },        
        onClose: function() {  
            $("#rqTxt").parent().removeClass("current");
            if(rqChange){
                $("#rqTxt").html(rqStr);
                initPage();
            }else{
                $("#rqTxt").html($.i18n.prop('ml_loandate'));
                $("#rq").val("");
                initPage();
            } 
            rqChange = false;
        }       
    });
   
    //排序
    var orderName = "",
        order = "";
    $("#sort").select({
        title: "请选择",
        items: [{
            title: "默认",
            value: "",
        }, {
            title: "按时间升序",
            value: "asc"
        }, {
            title: "按时间降序",
            value: "desc"
        }],
        onChange: function(d) {
            $("#sort").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
            if(isNull(d.values)){
                $("#orderName").val("");
                $("#order").val("");
            }else{
                $("#orderName").val("cdate");
                $("#order").val(d.values);
            }            
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
            //$("#status").html(statusStr + "<span class=\"xl\"></span>").addClass("current");
        },
        onClear: function() {
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#orderName").val("");
            $("#order").val("");
            queryData();
            $("#sort").html($.i18n.prop('com_sorting')+"<span class=\"xl\"></span>").removeClass("current");
        }
    });

	bindZt();
});
    
function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var bindZtFlag = true;
var queryFlag = false;
function queryData() {
    if(queryFlag){
        return false;
    }    
    var url = requestPath + "/m/order/getCustomerOrderList.htm";
    var dataMap = getDataMap();
    console.info("11111111:"+JSON.stringify(dataMap));
    queryFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        $("#list").append(template('list_page', d));
     
    }, true, function(){
        queryFlag = false;
    });
}


function bindZt(){
    // 订单状态
    var statusStr = "";
    var statusVal = "";
    var statusChange = false;
    
    var jsons = [ {
            title: "待还款",
            value: "0"
        }, {
            title: "已还款",
            value: "1"
        }];
    var couponType = $("#couponType").val();
    if(couponType == 7){
    	jsons = [ {
            title: "审核中",
            value: "0"
        }, {
            title: "审核通过",
            value: "1"
        }];
    }
    
    
    
    $("#statusTxt").select({
    	title: "请选择",
        items: jsons,
        onOpen: function(){
            $("#statusTxt").addClass("current");
        },
        onChange: function(d) {
            statusChange = true;
            statusStr = d.titles;
            statusVal = d.values;
        },
        onClear: function() {
            statusChange = true;
            statusStr = "";
            statusVal = "";
        },
        onClose: function() {
            $("#statusTxt").removeClass("current");
            if(statusChange){
                $("#status").val(statusVal);
                if(isNull(statusStr)){
                    statusStr = $.i18n.prop('com_status');
                }
                $("#statusTxt").html(statusStr+"<span class=\"xl\"></span>");
                initPage();
            }
            statusChange = false;            
        }        
    });
}



function getDataMap() {
    var dataMap = {};
	dataMap.couponType = $("#couponType").val();
	
    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    if (!isNull($("#rq").val())) {
        dataMap.rqStart = $("#rq").val();
        dataMap.rqEnd = $("#rq").val();
    }
    
    var status = $("#status").val();
    if (!isNull(status)) {//已审核待还款
    	if(status==0){
    		dataMap.shStatus = 200;//查询待还款
    	}else if(status==1){
    		dataMap.shStatus = 400;//查询已还款
    	}
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    return dataMap;
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


function hksq(fphm){
    confirmMsg("您是否确认进行提前还款", function(){
        var url = requestPath + "/m/order/prePayRequest.htm";
        var dataMap = {};
        dataMap.fphm = fphm;
        saveFlag = true;
        $.ajaxjsonp(url, dataMap, function(data) {
            showOk("申请成功,请等待审批结果", function(){
                initPage();
            });
        }, false, function() {
            saveFlag = false;
        });
    });    
}

template.helper("getAdd", function(a, b) {
    if (isNull(a)) {
        a=0;
    }
    if (isNull(b)) {
        b=0;
    }
    return accAdd(a,b);
});