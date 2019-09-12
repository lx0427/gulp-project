$(function() {
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


    var rqStartChange = false;
    var rqStartTxt = "";
    $("#rqStart").calendar({
        onOpen: function() {
            if (rqStartChange) {
                rqStartTxt = "";
                rqStartChange = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqStartChange = true;
            rqStartTxt = values;
        },
        onClose: function() {
            $(".wx_hyfilter li").removeClass();
            if (rqStartChange) {
                $("#rqStartTxt").html(rqStartTxt).parent().addClass("current");
                initPage();
            } else {
                $("#rqStart").val("");
                $("#rqStartTxt").html("开始日期");
                initPage();
            }
            rqStartChange = false;
        }
    });

    var rqEndChange = false;
    var rqEndTxt = "";
    $("#rqEnd").calendar({
        onOpen: function() {
            if (rqEndChange) {
                rqEndTxt = "";
                rqEndChange = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqEndChange = true;
            rqEndTxt = values;
        },
        onClose: function() {
            $(".wx_hyfilter li").removeClass();
            if (rqEndChange) {
                $("#rqEndTxt").html(rqEndTxt).parent().addClass("current");
                initPage();
            } else {
                $("#rqEnd").val("");
                $("#rqEndTxt").html("结束日期");
                initPage();
            }
            rqEndChange = false;
        }
    });

    //主营
    $("#wbsta").select({
        title: "请选择",
        items: [{
            title: "默认",
            value: "",
        }, {
            title: "POY",
            value: "POY"
        }, {
            title: "DTY",
            value: "DTY"
        }, {
            title: "FDY",
            value: "FDY"
        }, {
            title: "切片",
            value: "切片"
        }, {
            title: "锦纶切片",
            value: "锦纶切片"
        }],
        onChange: function(d) {
            $("#wbsta").removeClass("current");
            if (isNull(d.values)) {
                $("#scopes").val(d.values);
                $("#wbsta").html("主营<span class=\"xl\"></span>");
            } else {
                $("#scopes").val(d.values);
                $("#wbsta").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
            }
        },
        onClose: function() {
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClear: function() {
            $("#wbsta").removeClass("current");
            $("#pageIndex").val(0);
            $("#list").html("");

            $("#scopes").val("");
            queryData();
            $("#wbsta").html("主营<span class=\"xl\"></span>");
        }
    });
    
    $("#dq_txt").cityPicker({
        title: "选择地区",
        onChange: function(picker, values, displayValues) {
        	
            $("#proName").val(displayValues[0]);
	          $("#cityName").val(displayValues[1]);
	          $("#xjName").val(displayValues[2]);
        },
        onClear: function() {
            $("#proName").val("");
            $("#cityName").val("");
            $("#xjName").val("");
            
            $("#pageIndex").val(0);
            $("#list").html("");
            queryData();
        },
        onClose: function(picker, values, displayValues){
          $("#list").html("");
          queryData();
        }
    });
    
    setTimeout(function () {
		execI18n();
	},500);
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
    var url = requestPath + "/m/merchant/getMerchantDisplay.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true, function() {
        queryFlag = false;
        $(".weui-infinite-scroll").hide();
    });
}


function getDataMap() {
    var dataMap = {};

    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    if (!isNull($("#proName").val())) {
        dataMap.proName = $("#proName").val();
    }
    if (!isNull($("#cityName").val())) {
        dataMap.cityName = $("#cityName").val();
    }
    if (!isNull($("#xjName").val())) {
        dataMap.xjName = $("#xjName").val();
    }
    if (!isNull($("#scopes").val())) {
        dataMap.scopes = $("#scopes").val();
    }

    return dataMap;
}

//商家展示详情界面
function toInfo(pkid){
	    
    openPage("商家展示详情", "MerchantDisplayInfo.html?pkid="+pkid, "1");

}