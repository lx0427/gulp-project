$(function() {
     initPage();
});

function initPage() {
    queryData();
}

function queryData() {
    var url = requestPath + "/m/orderAudit/getOrderList.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
 		$("#list").append(template('list_page', d));

        // 箱包净重
        $(".xbjz").each(function() {
            var pkid = $(this).attr("pkid");
            var pm = $(this).attr("pm");
            $(this).select({
                title: "请选择箱包净重",
                items: d[pm],
                onChange:function(d){
                    $("#packstr_"+pkid).val(d.values);
                    getSl2(pkid);
                }
            });
        });
    }, false);
}

// 根据箱包数、箱包净重，计算重量
function getSl2(pkid){
    var sl1 = $("#sl1_"+pkid).val();
    var packstr = $("#packstr_"+pkid).val();
    if(!isNull(sl1) && !isNull(packstr) && packstr != "不定重"){
        var sl2 = accMul(sl1, packstr, 3);
        $("#sl2_"+pkid).val(sl2);
    }
}


function getDataMap() {
    var dataMap = {};
    
    if (!isNull($("#fphm").val())) {
        dataMap.fphm = $("#fphm").val();
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

function delOrder(fphm, htxh) {
    confirmMsg("确定要删除吗", function() {
        var url = requestPath + "/m/orderAudit/delOrder.htm";

        var dataMap = {};
        dataMap.fphm = fphm;
        dataMap.htxh = htxh;

        $.ajaxjsonp(url, dataMap, function(data) {
            var d = eval(data);
            showMessage(d.msg);
        }, false);
    });
}

function getJsonString() {
    var jsons = [];
    $(".wx_tasdelist li").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.fphm = $("#fphm").val();
        json.htxh = $("#htxh_" + id).val();
        json.gg = $("#gg_" + id).val();
        json.cz = $("#cz_" + id).val();
        json.cd = $("#cd_" + id).val();
        json.sl2 = $("#sl2_" + id).val();
        json.sl1 = $("#sl1_" + id).val();
        json.remark = $("#remark_" + id).val();
        json.price = $("#price_" + id).val();
        json.packstr = $("#packstr_" + id).val();
        
        jsons[jsons.length] = json;
    });
    return JSON.stringify(jsons);
}

function checkValue() {
    var b = true;
    $(".wx_tasdelist li").each(function() {
        var id = $(this).attr("id");
        if (!checkNumber("sl2_" + id, 3, "重量")) {
            b = false;
            return false;
        }
        if (!checkNumber("sl1_" + id, 0, "箱包数")) {
            b = false;
            return false;
        }
        // if (isNull($("#packstr_" + id).val())) {
        //     showMessage("请选择箱包净重");
        //     b = false;
        //     return false;
        // }
    });
    if (!b) {
        return false;
    }

    return true;
}

function doSave() {
    if (!checkValue()) {
        return false;
    }

    var url = requestPath + "/m/orderAudit/updateOrder.htm";
    var dataMap = {};
    dataMap.jsonstring = getJsonString();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showMessage("订单修改成功");
        goBack();
    });
}

function showGg(pm,ggId){
    if(pm === "POY" || pm === "DTY" || pm === "FDY"){
        showGgPopup2(ggId);
    }else{
        showGgPopup01(ggId);
    }
}


function showCz(pm,czId){
	if(pm === "POY" || pm === "DTY" || pm === "FDY"){
        showCzPopup2(czId);
    }else{
        showCzPopup01(czId);
    }
}