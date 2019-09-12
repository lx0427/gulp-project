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
    var url = requestPath + "/m/jkqd/list.htm";
    var dataMap = getDataMap();
    queryFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        $("#list").append(template('list_page', d));
        
        if(bindZtFlag){
            bindZtFlag = false;
            bindZt(d.ztList);
        }
    }, true, function(){
        queryFlag = false;
    });
}


function bindZt(ztList){
    var array = [];
    if(!isNull(ztList) && ztList.length > 0){
        for(var i = 0; i< ztList.length; i++){
            var json = {};
            json.title = ztList[i].value;
            json.value = ztList[i].code;
            array[array.length] = json;
        }
    }

    // 订单状态
    var statusStr = "";
    var statusVal = "";
    var statusChange = false;
    $("#statusTxt").select({
        title: "请选择状态",
        items: array,
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

    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    if (!isNull($("#rq").val())) {
        dataMap.rqStart = $("#rq").val();
        dataMap.rqEnd = $("#rq").val();
    }
    if (!isNull($("#status").val())) {
        dataMap.status = $("#status").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
        dataMap.remark = "mobile";
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


function jkqdInfo(fphm){
    openPage("借款详情", "../customer/jkqdInfo.html?fphm="+fphm, "1");
}

function hksq(fphm){
    openPage("发货申请", "../customer/hksq.html?hthm="+fphm, "1");
}