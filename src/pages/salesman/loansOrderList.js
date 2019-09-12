$(function() {
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
       
    var rqChange_start = false;
    var rqStr_start = "";
    $("#date10Str_start").calendar({
        onOpen: function() {
            if (rqChange_start) {
                rqStr_start = "";
                rqChange_start = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_start = true;
            rqStr_start = values;
        },
        onClose: function() {
            $(".wx_hyfilter li").removeClass();
            if (rqChange_start) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#start_date").val(rqStr_start);
                queryData();
                $("#dateli_start").html(rqStr_start).parent().addClass("current");
            } else {
                var emrq = $("#dateli_start").html();
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#start_date").val("");
                queryData();
                $("#dateli_start").html("开始日期");
            }
            rqChange = false;
        }
    });
    
    var rqChange_end = false;
    var rqStr_end = "";
    $("#date10Str_end").calendar({
        onOpen: function() {
            if (rqChange_end) {
                rqStr_end = "";
                rqChange_end = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_end = true;
            rqStr_end = values;
        },
        onClose: function() {
            $(".wx_hyfilter li").removeClass();
            if (rqChange_end) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#end_date").val(rqStr_end);
                queryData();
                $("#dateli_end").html(rqStr_end).parent().addClass("current");
            } else {
                var emrq = $("#dateli_end").html();
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#end_date").val("");
                queryData();
                $("#dateli_end").html("结束日期");
            }
            rqChange_end = false;
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
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#sort").html("排序<span class=\"xl\"></span>");
                $("#orderName").val("");
                $("#order").val("");
            } else {
                $("#sort").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#orderName").val("cdate");
                $("#order").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#orderName").val("");
            $("#order").val("");
            queryData();
            $("#sort").html("排序<span class=\"xl\"></span>");
        }
    });

	var jsons = [ {
            title: "待还款",
            value: "0"
        }, {
            title: "已还款",
            value: "1"
        }];
        
	if($("#couponType").val()==7){
		jsons = [ {
            title: "待审核",
            value: "0"
        }, {
            title: "审核通过",
            value: "1"
        }];
	}
	
    //状态
    $("#shStatus").select({
        title: "请选择",
        items: jsons,
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#shStatus").html("状态<span class=\"xl\"></span>");
                $("#status").val("");

            } else {
                $("#shStatus").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#status").val(d.values);
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#status").val("");

            queryData();
            $("#shStatus").html("状态<span class=\"xl\"></span>");
        }
    });

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
    
    
}

function queryData() {
    var url = requestPath + "/m/orderAudit/getOrderAuditList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        $("#list").append(template('list_page', d));
        setTimeout(function(){
		    	execI18n();
		    },500);
    }, true);
    
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    if (!isNull($("#start_date").val())) {
        dataMap.rqStart = $("#start_date").val(); 
    }
    if (!isNull($("#end_date").val())) {
        dataMap.rqEnd = $("#end_date").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }

	var status = $("#status").val();
    if (!isNull(status)) {//已审核待还款
    	if(status==0){
    		dataMap.shStatus = 200;//查询待还款
    	}else if(status==1){
    		dataMap.shStatus = 400;//查询已还款
    	}
    }
    
    dataMap.couponType = $("#couponType").val();
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


function qxOrder(fphm) {
    confirmMsg("是否确定取消订单[" + fphm + "]？", function() {
        var url = requestPath + "/m/orderAudit/qxOrder.htm";
        var dataMap = {};
        dataMap.fphm = fphm;
        $.ajaxjsonp(url, dataMap, function(data) {
            showOk("订单取消成功", function() {
                $("#" + fphm).remove();
            });
        });
    });
}

function orderAuditView(fphm, pm) {
    openPage("订单审核", "../salesman/orderAuditView.html?fphm=" + fphm + "&pm=" + pm + "&fcOrderFlag=2", "1");
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
