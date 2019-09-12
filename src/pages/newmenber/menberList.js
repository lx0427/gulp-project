$(function() {
    setTimeout(function () {
        execI18n();
    },500);
    
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
    $("#rq").calendar({
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
            $(".wx_hyfilter li").removeClass();
            if (rqChange) {
                $("#rq_txt").html(rqStr).parent().addClass("current");
                initPage();               
            } else {
                $("#rq_txt").html("日期");
                $("#rq").val("");
                initPage();                
            }
            rqChange = false;
        }
    });

    //状态： 0 - 停用 100 - 待审核 2 - 生效 3 - 冻结 4-审核未通过
    $("#statusStr").select({
        title: "请选择状态",
        items: [{
            title: "默认",
            value: "",
        }, {
            title: "停用",
            value: "0"
        }, {
            title: "待审",
            value: "100"
        }, {
            title: "生效",
            value: "2"
        }, {
            title: "审核未通过",
            value: "4"
        }],
        onChange: function(d) {
            $(".wx_hyfilter li").removeClass();
            if (isNull(d.values)) {
                $("#statusStr").html("状态<span class=\"xl\"></span>");
                $("#status").val("");
            } else {
                $("#statusStr").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#status").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();
            $("#statusStr").html("状态<span class=\"xl\"></span>");
            $("#status").val("");
            initPage();
        }
    });


    //排序
    var orderName = "";
    var order = "";
    $("#sort").select({
        title: "请选择",
        items: [{
            title: "默认",
            value: "",
        }, {
            title: "编码升序",
            value: "asc"
        }, {
            title: "编码降序",
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
                $("#orderName").val("sapCustomerId");
                $("#order").val(d.values);
            }
        },
        onClose: function() {
            initPage();
        },
        onClear: function() {
            $(".wx_hyfilter li").removeClass();       
            $("#orderName").val("");
            $("#order").val("");
            $("#sort").html("排序<span class=\"xl\"></span>");
            initPage();
        }
    });

    initPage();
});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/menber/menberList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));
    }, true, function() {
        queryFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};
   
    if (!isNull($("#rq").val())) {
        dataMap.rqStart = $("#rq").val();
        dataMap.rqEnd = $("#rq").val();
    }
    if (!isNull($("#status").val())) {
        dataMap.status = $("#status").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    if (!isNull($("#querykey").val())) {
        dataMap.keyword = $("#querykey").val();
    }
    var clientRequest = getRequest();
    dataMap.userid = clientRequest["userid"];
    return dataMap;
}

var tongbuFlag = false;
function tongBu(){
     if (tongbuFlag) {
        return false;
    }

    var url = requestPath + "/m/menber/doImport.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return null;
    }
    tongbuFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("同步销售数据成功");
    }, false, function() {
        tongbuFlag = false;
    });



}

function toPage(hydm){
    openPage("操作员列表", "../newmenber/mboptList.html?hydm=" + hydm);
}

function toAdd(){
    openPage("客户新增", "../customer/addBySalesman.html");
}

function toEdit(hydm){
    openPage("客户修改", "../customer/editBySalesman.html?hydm="+hydm);
}
function toBack(hydm){
    $("#"+hydm+"jujue").toggle();
}
function jujue(hydm){

var url = requestPath + "/m/menberManager/sendBack.htm";
    var jjly = $("#jjly"+hydm).val();
    if(isNull(jjly)){
      showMessage("拒绝理由不能为空");
      return;
    }
    var dataMap = {"jjly":jjly,"hydm":hydm,"action":4};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
         showMessage("操作成功");
        initPage()
        setTimeout(function(){
                execI18n();
            },500);
    }, true);

}
