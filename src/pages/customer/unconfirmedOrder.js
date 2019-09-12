$(function() {
    var url = window.location.href;
    scanRecord(13,0,'',url,'待审核订单');
    var statusTitle = $("#shStatusStr").val();
    $("#statusTitle").html(statusTitle)

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

    var rqChange = false;
    var rqStr = "";
    $("#date10Str").calendar({
        onOpen: function() {
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
            if (rqChange) {
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#cdate").val(rqStr);
                queryData();
                $("#dateli").html(rqStr).parent().addClass("current");
            } else {
                var emrq = $("#dateli").html();

                // if (!isNull(rqStr) && emrq != "日期") {
                //    $("#pageIndex").val(0);
                //    $("#list").html("");
                //    $("#cdate").val(rqStr);
                //    queryData();

                //    $("#dateli").html(rqStr).parent().addClass("current");
                // }
                $("#pageIndex").val(0);
                $("#list").html("");
                $("#cdate").val("");
                queryData();

                $("#dateli").html($.i18n.prop('com_date')).parent().removeClass("current");
            }

            rqChange = false;
        }
    });

    // 订单状态
    var statusStr = "";
    var statusChange = false;
    $("#status").select({
        title: $.i18n.prop('uo_qingxuanze'),
        items: [{
            title: "全部",
            value: "000"
        }, {
            title: "待审核",
            value: "100"
        }, {
            title: "审核中",
            value: "200"
        }, {
            title: "已拒绝",
            value: "300"
        }],
        onChange: function(d) {
            statusChange = true;
            $("#shStatus").val(d.values);
            statusStr = d.titles;
            $("#status").html(statusStr + "<span class=\"xl\"></span>").addClass("current");
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            $("#shStatus").val("");
            queryData();
            $("#status").html("状态<span class=\"xl\"></span>").removeClass("current");
        }
    });

    //排序
    var orderName = "",
        order = "";
    $("#sort").select({
        title: $.i18n.prop('uo_qingxuanze'),
        items: [{
            title:$.i18n.prop('uo_moren'),
            value: "",
        }, {
            title:$.i18n.prop('uo_shengtime'),
            value: "asc"
        }, {
            title: $.i18n.prop('uo_jiangtime'),
            value: "desc"
        }],
        onChange: function(d) {
            $("#sort").html(d.titles + "<span class=\"xl\"></span>").addClass("current");

            $("#orderName").val("cdate");
            $("#order").val(d.values);
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

});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var isSaleman = "";
var queryFlag = false;
function queryData() {
    if(queryFlag){
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/order/getCustomerOrderList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if (!isNull(d.isSaleman) && d.isSaleman === 1) {
            $("#status").show();
            $(".wx_hyfilter li").css("width", "33.3%");
        }
        $("#list").append(template('list_page', d));
        //顶部横幅
        if(!isNull(d.otherBanner) && d.otherBanner.length>0){   
        $("#wx_banner").html(template('otherBanner_page', d));
         $(".swiper-container").swiper({
                loop: true,
                autoplayDisableOnInteraction: false,
                autoplay: 5000
            });
         $("#obanner").attr("src", $('#obanner').attr("src")).load(function() {
               var realHeight = this.height;
               var hy =  (parseInt(realHeight)+44)+'px';
             var ma =  (parseInt(realHeight)+89)+'px';
            $(".wx_hyfilter").css("top",hy);  
             $(".wx_main").css("top",ma);  
            });  
        }else {
            // 没上传就显示默认的图片吧
            // $("#wx_banner").html("<img src='../../images/hybanner.jpg' />");
        }
        isSaleman = d.isSaleman;
       //处理语言
		execI18n();
    }, true, function(){
        queryFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    if (!isNull($("#cdate").val())) {
        dataMap.rqStart = $("#cdate").val();
        dataMap.rqEnd = $("#cdate").val();
    }
    if (!isNull($("#shStatus").val())) {
        dataMap.shStatus = $("#shStatus").val();
        if(dataMap.shStatus != "000"){
        	dataMap.status00 = 1;
        }else{
        	dataMap.status00 = 2;
        }
    }else{
    	dataMap.shStatus = "100";
    	dataMap.status00 = 1;
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }

    console.log(dataMap);
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


var buyAgainFlag = false;
// 再来一单
function buyAgain(wzid, depid, salesType, htflag11) {
    if (buyAgainFlag) {
        return false;
    }
    buyAgainFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.orderType = "0";
	if (htflag11 != null && htflag11 != "0"&& htflag11 != "") {
        dataMap.flag11 = "1";//明确是合约下单的，后台会根据客户处理价格
    } else {
        dataMap.flag11 = "0";
    }
    

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("已加入购物车", function() {
        scanShopping(d.data);//记录商品添加到购物车操作    
            toShoppingCart();        
        });
    }, false, function() {
        buyAgainFlag = false;
    });
}


function jksq(fphm){
    openPage("融资申请", "../customer/jksq.html?extbill="+fphm, "1");
}

function hksq(fphm){
    openPage("融资还款申请", "../customer/hksq.html?hthm="+fphm, "1");
}
function upPho (vbeln) {
	openPage("上传图片", "../customer/uploadPhoto.html?vbeln=" + vbeln, "1");

}
function toLinkUrl(title, linkUrl) {
    if (isNull(linkUrl)) {
        return false;
    }
    setTimeout(function() {
        openPage(title, linkUrl, "1");
    }, 500);

    // 统计
    var url = requestPath + "/m/home/statistics/record.htm";
    var dataMap = {};
    dataMap.hsName = title;
    dataMap.hsUrl = linkUrl;
    dataMap.hsType = 1;
    dataMap.flag00 = 2;//类型,1.首页统计,2横幅统计
    $.ajaxjsonp(url, dataMap, function(data) {

    }, false);
}