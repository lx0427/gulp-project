$(function() {
    var url = window.location.href;
    scanRecord(14,0,'',url,'','订单查询');
    var from = $("#from").val();
    if (!isNull(from) && from === "customer") {
        $("#khname").hide();
        $("#depname").show();
    } else {
        $("#khname").show();
        $("#depname").hide();
    }

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


    $("#mbname").bind("change", function() {
        $(".wx_hyfilter li").removeClass();
        var mbname = $("#mbname").val();
        if (isNull(mbname)) {
            $("#khname").html("客户<span class=\"xl\"></span>");
        } else {
            $("#khname").html(mbname).addClass("current");
        }
        $("#pageIndex").val(0);
        $("#list").html("");
        queryData();
    });

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var bindFlag = false;
var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/order/getSapSalesmanOrder.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        
        $("#e_circleId").val(d.e_circleId);
        $("#e_isSalesman").val(d.e_isSalesman);
        $("#e_userId").val(d.e_userId);
        $("#e_sapCustomerId").val(d.e_sapCustomerId);
        
        
        $("#list").append(template('list_page', d));
        
       // sleep(5000);

        if (!bindFlag) {
            bindFlag = true;
            if (!isNull(d.isSalesman) && d.isSalesman === 1) {
                // 业务员查询，显示客户下拉
                $("#khname").show();
                $("#depname").hide();
            } else {
                // 客户查询，显示销售组织
                $("#khname").hide();
                $("#depname").show();
                bindDepname(d.depList);
            }
        }
        //处理语言
		execI18n();
    }, true, function() {
        queryFlag = false;
        $(".weui-infinite-scroll").hide();
    });
}

function sleep(n) { //n表示的毫秒数
	
    var start = new Date().getTime();
    
    while (true) if(new Date().getTime() - start > n){
    	
    	break;
    	
    } else {}
}

// 绑定销售组织
function bindDepname(data) {
    $("#depname").select({
        title: "请选择销售组织",
        items: data,
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#depname").html("销售组织<span class=\"xl\"></span>");
                $("#vkorg").val("");
            } else {
                $("#depname").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#vkorg").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#depname").html("销售组织<span class=\"xl\"></span>");
            $("#vkorg").val("");
            initPage();
        }
    });
}

function getDataMap() {
    var dataMap = {};
    dataMap.contractTypes="3";//查询合约订单
    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    if (!isNull($("#start_date").val())) {
        dataMap.rqStart = $("#start_date").val(); 
    }
    if (!isNull($("#end_date").val())) {
        dataMap.rqEnd = $("#end_date").val();
    }
    if (!isNull($("#wbsta").val())) {
        dataMap.wbsta = $("#wbsta").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    if (!isNull($("#sapCustomerId").val())) {
        dataMap.kunnr = $("#sapCustomerId").val();
    }
    if (!isNull($("#vkorg").val())) {
        dataMap.vkorg = $("#vkorg").val();
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

// 再来一单
var buyAgainFlag = false;
function buyAgain(hydm, hyname, wzid, depid, salesType, isSalesman) {
    if (buyAgainFlag) {
        return false;
    }
    buyAgainFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    if (!isNull(isSalesman) && isSalesman == "1") {
        // 业务员代客下单
        dataMap.customerId = hydm;
        dataMap.customerName = hyname;
        dataMap.orderType = "1";
    } else {
        // 客户下单
        dataMap.orderType = "0";
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("已加入购物车", function() {
            if (!isNull(isSalesman) && isSalesman == "1") {
                toShoppingCart(hydm);               
            } else {
                toShoppingCart();                
            }
        });
    }, false, function() {
        buyAgainFlag = false;
    });
}

//导出订单数据
function toExport(){
	var url = requestPath + "/m/order/export.htm";
	var e_circleId = $("#e_circleId").val();
  var e_isSalesman = $("#e_isSalesman").val();
  var e_userId = $("#e_userId").val();
  var e_sapCustomerId = $("#e_sapCustomerId").val();
	url=url+"?callback=xxxxx&&contractTypes=3&&querykey="+$("#querykey").val()+"&&rqStart="+$("#start_date").val()+"&&rqEnd="+$("#end_date").val()+"&&wbsta="+$("#wbsta").val()+"&&orderName="+$("#orderName").val()+"&&order="+$("#order").val()+"&&kunnr="+$("#sapCustomerId").val()+"&&vkorg="+$("#vkorg").val()+"&&e_circleId="+e_circleId+"&&e_isSalesman="+e_isSalesman+"&&e_userId="+e_userId+"&&e_sapCustomerId="+e_sapCustomerId;
	
	openPage("导出订单数据", url, "1");
}

//物流界面
function toHtmsList (vbeln,pm,cz,nx,sz,gg,cd,wzlb,lbsm) {
	
	openPage("物流信息界面", "../public/htmsList.html?vbeln=" + vbeln +"&&pm=" + pm + "&&cz=" + cz + "&&nx=" + nx + "&&sz=" + sz + "&&gg=" + gg + "&&cd=" + cd +"&&wzlb=" + wzlb + "&&lbsm=" + lbsm, "1");

}

function upPho (vbeln) {
	
	openPage("上传图片", "../salesman/uploadPhoto.html?vbeln=" + vbeln, "1");

}