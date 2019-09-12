$(function() {
    loadHidenPage();
    queryData();
});

function queryData() {
    var clientRequest = getRequest();
    var url = requestPath + "/m/sapProductInuse/getProductInuse.htm";
    var dataMap = {};
    dataMap.pkid = clientRequest["pkid"];

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        setTimeout(function() {
            bindpm(d.pmList);
        }, 10);
        initPage(d.data);

    }, false, function() {

    });
}

function initPage(data) {
    $("#pm").val(data.pm);
    $("#pkid").val(data.pkid);
    $("#pm1").val(data.pm);
    $("#username").val(data.username);
    $("#denier").val(data.denier + "D");
    $("#sapGg").val(data.sapGg);
    $("#cz").val(data.cz);
    $("#typ").val(data.typ);
    $("#szcode").val(data.szcode);
    $("#remark").val(data.remark);
    $("#sz").val(data.sz);
    $("#singleWeight").val(data.singleWeight);
    $("#bagWeight").val(data.bagWeight);
    $("#flag10").val(data.flag10);
    loadHidenPage();
}

function loadHidenPage() {
    var pm = $("#pm").val();
    if (pm == 'DTY') {
        $("#denier1").show();
        $("#typ1").hide();
        $("#sz1").show();
        $("#szcode1").show();
        $("#singleWeight1").hide();
        $("#bagWeight1").hide();
    } else if (pm == 'FDY') {


        $("#denier1").show();
        $("#typ1").show();
        $("#sz1").hide();
        $("#szcode1").hide();
        $("#singleWeight1").show();
        $("#bagWeight1").show();
    } else if (pm == 'POY') {


        $("#denier1").show();
        $("#typ1").show();
        $("#sz1").hide();
        $("#szcode1").hide();
        $("#singleWeight1").hide();
        $("#bagWeight1").show();
    } else if (pm == '锦纶切片' || pm == '切片') {


        $("#denier1").hide();
        $("#typ1").hide();
        $("#sz1").hide();
        $("#szcode1").hide();
        $("#singleWeight1").hide();
        $("#bagWeight1").show();
    } else {
        $("#denier1").hide();
        $("#typ1").hide();
        $("#sz1").hide();
        $("#szcode1").hide();
        $("#singleWeight1").hide();
        $("#bagWeight1").hide();
    }

}


// 品名下拉选择显示
function bindpm(pmList) {
    if (isNull(pmList) || pmList.length == 0) {
        return;
    }

    var jsons = [];
    for (var i = 0; i < pmList.length; i++) {
        var json = {};
        json.title = pmList[i].pm;
        json.value = pmList[i].pm;
        jsons[i] = json;
    }

    $("#pm1").select({
        title: "请选择产品",
        items: jsons,
        onChange: function(d) {
            if ($("#pm").val() != d.values) {
                cleanData();
            }
            $("#pm").val(d.values);
            loadHidenPage();
        },
        onClear: function() {
            $("#pm").val("");
        }
    });
}

function cleanData(){
    $("#denier").val("");
    $("#sapGg").val("");
    $("#cz").val("");
    $("#typ").val("");
    $("#szcode").val("");
    $("#remark").val("");
    $("#sz").val("");
    $("#singleWeight").val("");
    $("#bagWeight").val("");
}

var editFlag = false;

function doEdit() {
    if (editFlag) {
        return false;
    }
    var url = requestPath + "/m/sapProductInuse/update.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return false;
    }
    editFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        if (!isNull($("#pkid").val())) {
            showOk("编辑成功", function() {
            openPage("操作员列表", "../salesman/materialRelation.html", "1");
            });
        } else {
            showOk("新增成功", function() {
            openPage("操作员列表", "../salesman/materialRelation.html", "1");
            });
        }
        
    }, false, function() {
        editFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }
    if (!isNull($("#pm").val())) {
        dataMap.pm = $("#pm").val();
    } else {
        showMessage("请选择品名");
        return null;
    }
    if (!isNull($("#sapGg").val())) {
        dataMap.sapGg = $("#sapGg").val();
    } else {
        showMessage("请填写规格");
        return null;
    }
    if (!isNull($("#cz").val())) {
        dataMap.cz = $("#cz").val();
    } else {
        showMessage("请填写批号");
        return null;
    }

    var pm = $("#pm").val();
    if (pm == 'DTY') {
        var sapGg = $("#sapGg").val();
        if (/^[0-9]+dtex\/[0-9]+f{1}$/.test(sapGg) || /^[0-9]+dtex\/\*\*\*f{1}$/.test(sapGg)) {
        } else {
            showMessage("规格输入格式有误");
            return null;
        }
        var denier = $("#denier").val();
        if (/^[0-9]+D{1}$/.test(denier)) {
        }else{
            showMessage("旦数输入格式有误");
            return null;
        }
        dataMap.remark = $("#remark").val();
        dataMap.denier2 = $("#denier").val();
        dataMap.szcode = $("#szcode").val();
        dataMap.sz = $("#sz").val();
    } else if (pm == 'FDY') {
        var sapGg = $("#sapGg").val();
        if (/^[0-9]+dtex\/[0-9]+f{1}$/.test(sapGg) || /^[0-9]+dtex\/\*\*\*f{1}$/.test(sapGg)) {
        } else {
            showMessage("规格输入格式有误");
            return null;
        }
        var denier = $("#denier").val();
        if (/^[0-9]+D{1}$/.test(denier)) {
        }else{
            showMessage("旦数输入格式有误");
            return null;
        }
        dataMap.typ = $("#typ").val();
        dataMap.denier2 = $("#denier").val();
        dataMap.remark = $("#remark").val();
        dataMap.singleWeight = $("#singleWeight").val();
        dataMap.bagWeight = $("#bagWeight").val();
        
    } else if (pm == 'POY') {
        var sapGg = $("#sapGg").val();
        if (/^[0-9]+dtex\/[0-9]+f{1}$/.test(sapGg) || /^[0-9]+dtex\/\*\*\*f{1}$/.test(sapGg) ) {
        }else{
            showMessage("规格输入格式有误");
            return null;
        }
        var denier = $("#denier").val();
        if (/^[0-9]+D{1}$/.test(denier)) {
        }else{
            showMessage("旦数输入格式有误");
            return null;
        }
        dataMap.denier2 = $("#denier").val();
        dataMap.typ = $("#typ").val();
        dataMap.remark = $("#remark").val();
        dataMap.bagWeight = $("#bagWeight").val();
    } else if (pm == '锦纶切片' || pm == '切片') {
        dataMap.bagWeight = $("#bagWeight").val();
    }




    return dataMap;
}
