$(function() {
    $(".kindbtn li").bind("click", function() {
        // 当前选中的
        var currentText = $(".kindbtn .current").text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText) {
            // 不处理
            return;
        }


        if (thisText === "我收到的") {
            //触发查询
            $("#pageIndex").val("0");
            $("#list").html("");
            $("#isReport").val(2);
            $("title").html("我收到的");
             $("title").attr("name","xxfk_wsdd");
            queryData();
            
        } 
        if (thisText === "我上报的") {
            //触发查询
            $("#pageIndex").val("0");
            $("#list").html("");
            $("#isReport").val(1);
            $("title").html("我上报的");
            $("title").attr("name","xxfk_wsbd");
            queryData();
        } 

        $(".kindbtn li").removeClass("current");
        $(this).addClass("current");

    });
    
    $("#form").bind("submit", function() {
    		$("#pageIndex").val(0);
        $("#list").html("");
        queryData();
        return false;
    });
    
    
    $("#whois").select({
        title: "请选择",
        items: [ {
            title: "我收到的",
            value: "2"
        }, {
            title: "我上报的",
            value: "1"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#whois").html("我收到的<span class=\"xl\"></span>");
                $("#isReport").val(2);
            } else {
                $("#whois").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#isReport").val(d.values);
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

            $("#whois").html("我收到的<span class=\"xl\"></span>").addClass("current");
            $("#isReport").val(2);
        }
    });
    
    $("#xxlx").select({
        title: "请选择",
        items: [ {
            title: "随手记",
            value: "1"
        }, {
            title: "日报",
            value: "2"
        }, {
            title: "周报",
            value: "3"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxlx").html("类型<span class=\"xl\"></span>");
                $("#whType").val(d.values);
            } else {
                $("#xxlx").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#whType").val(d.values);
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

            $("#xxlx").html("类型<span class=\"xl\"></span>").addClass("current");
            $("#whType").val("");
        }
    });
    
    $("#xxzt").select({
        title: "请选择",
        items: [ {
            title: "未读",
            value: "0"
        }, {
            title: "已读",
            value: "1"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#xxzt").html("状态<span class=\"xl\"></span>");
                $("#isRead").val("");
            } else {
                $("#xxzt").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#isRead").val(d.values);
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

            $("#xxzt").html("状态<span class=\"xl\"></span>").addClass("current");
            $("#isRead").val("");
        }
    });
    queryData();
    setTimeout (function(){
    	 execI18n();
    },500);
});


function queryData() {
    var url = requestPath + "/m/sapInformationReports/getSapReports.htm";
    var dataMap = {};
    dataMap = getDataMap();
console.info(dataMap);
    //return false;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (!isNull($("#isReport").val()) && $("#isReport").val()==2) {
            $("#list").append(template('list_page1', d));
        }else{
            $("#list").append(template('list_page2', d));
        }    
    }, true, function () {
    	if ($("#isReport").val() == "1") {//上报
	    	var redMsg = $(".redMsg");
	    	redMsg.each(function(){
	    		if ($(this).attr("isRead") == "1") {
	    			$(this).html("");
	    		} else {
	    			$(this).html("未被查看");
	    		}
	    	});
	    	var fromWhere = $(".fromWhere");
	    	fromWhere.each(function(){
	    		$(this).html($(this).attr("receiveUserName"));
	    	});
	    	$("title").html("我上报的");
	    	$("title").attr("name","xxfk_wsbd");
	    } else {//我收到的
	    	var redMsg = $(".redMsg");
	    	redMsg.each(function(){
	    		if ($(this).attr("isRead") == "1") {
	    			$(this).html("");
	    		} else {
	    			$(this).html("未读");
	    		}
	    	});
	    	var fromWhere = $(".fromWhere");
	    	fromWhere.each(function(){
	    		$(this).html($(this).attr("reportUserName"));
	    	});
	    	$("title").html("我收到的");
	    	$("title").attr("name","xxfk_wsdd");
	    }
	    $(".weui-infinite-scroll").hide();
    });
    
}

function getDataMap(){
	
		var dataMap = {};
		
		console.log($("#isReport").val());
		if (!isNull($("#isReport").val())) {
			dataMap.isReport = $("#isReport").val();
		}
		
		if (!isNull($("#whType").val())) {
			dataMap.whType = $("#whType").val();
		}
		
		if (!isNull($("#isRead").val())) {
			dataMap.isRead = $("#isRead").val();
		}
		
		if (!isNull($("#querykey").val())) {
			dataMap.querykey = $("#querykey").val();
		}
		
		return dataMap;
}

function goReportInformation () {
    openPage("我要上报", "../salesman/messageReport.html", "1");
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

function toInfo (pkid) {
    var isReport = $("#isReport").val();
    openPage("我要上报", "../salesman/messageReportInfo.html?pkid="+pkid+"&isReport="+isReport, "1");
}

