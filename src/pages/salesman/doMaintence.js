$(function() {
    queryData();
});

//1  查询业务员对应的产品线集合
//2  默认第一个产品线为客户的检索条件
//3  该产品线下必须有客户存在 ，否则 这个位置必填项验证不能通过
//4  此页面，做保存信息 和 修改信息用
function queryData() {
    var clientRequest = getRequest();
    var url = requestPath + "/m/menberMaintenance/getPmsForCrmUserId.htm";
    var dataMap = {};
    dataMap.userid = clientRequest["userid"];
    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        setTimeout(function() {
            bindpm(d.pmList);
        }, 10);
        initPage(d.exCustomerMaintenance);

    }, false, function() {

    });
}

function initPage(data) {

        if (!isNull(data)) {
        if (!isNull(data.pkid)) {
            $("#pkid").val(data.pkid);
        }
        if (!isNull(data.deviceNum)) {
            $("#deviceNum").val(data.deviceNum);
        }
        if (!isNull(data.crmCustomerName)) {
            $("#mbname").val(data.crmCustomerName);
        }
        if (!isNull(data.sapCustomerId)) {
            $("#hydm").val(data.sapCustomerId);
        }
        if (!isNull(data.bootRate)) {
            $("#bootRate").val(data.bootRate);
        }
        if (!isNull(data.bootRate)) {
            $("#bootRate_txt").val(data.bootRate);
        }
        if (!isNull(data.pm)) {
            $("#pm_txt").val(data.pm);
        }
        if (!isNull(data.productInventory)) {
            $("#productInventory").val(data.productInventory);
        }
        if (!isNull(data.pm)) {
            $("#pm_txt").val(data.pm);
        }
        if (!isNull(data.rawMaterialInventory)) {
            $("#rawMaterialInventory").val(data.rawMaterialInventory);
        }
        if (!isNull(data.pm)) {
            $("#pm").val(data.pm);
        }
        if (!isNull(data.deviceType)) {
            $("#deviceType").val(data.deviceType);
        }
        if (!isNull(data.dailyDosage)) {
            $("#dailyDosage").val(data.dailyDosage);
        }
    }

    $("#bootRate_txt").select({
        title: "请选择开机率",
        items: [{
            title: "1",
            value: "1"
        }, {
            title: "0",
            value: "0"
        }],
        onChange: function(d) {
           $("#bootRate").val(d.values);           
        },       
        onClear: function() {           
            $("#bootRate").val("");
        }
    });

}

// 品名下拉选择显示
function bindpm(pmList) {
    if (isNull(pmList) || pmList.length == 0) {
        return;
    }

    var jsons = [];
    for (var i = 0; i < pmList.length; i++) {
        var json = {};
        json.title = pmList[i];
        json.value = pmList[i];
        jsons[i] = json;
    }

    //默认数组中第一个选中
    $("#pm").val(pmList[0]); 
    $("#pm_txt").val(pmList[0]); 

    $("#pm_txt").select({
        title: "请选择产品",
        items: jsons,
        onChange: function(d) {
            $("#pm").val(d.values); 
            $("#mbname").val("");
            $("#hydm").val("");           
        },
        onClear: function() {
            $("#pm").val("");
            $("#mbname").val("");
            $("#hydm").val("");
        }
    });
}

function showMenberPopup2 () {
    //重新获取客户集合（条件：产品线 业务员id）
    if (!isNull($("#pm").val())) {
        setTimeout(function() {
                $("#pageIndex").val("0");
                $("#menberList").html("");
                getMenberList();
            }, 10);
        showMenberPopup();
    } else {
        showMessage("请选择产品线");
    }
    
}

var editFlag = false;
function doEdit() {
    if (editFlag) {
        return false;
    }
    var url = requestPath + "/m/menberMaintenance/update.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return false;
    }
    editFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("编辑成功", function() {
            var userid = $("#userid").val();
            var sapCustomerId = $("#sapCustomerId").val();
            if (isNull(sapCustomerId)) {
                sapCustomerId = $("#hydm").val();
            }
            openPage("客户维护列表", "../salesman/menberMaintenanceHistoryList.html?sapCustomerId=" + sapCustomerId + "&userid=" + userid);
        });
    }, false, function() {
        editFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pm").val())) {
        dataMap.pm = $("#pm").val();
    } else {
        showMessage("请选择产品线");
        return null;
    }

    if (!isNull($("#hydm").val())) {
        dataMap.sapCustomerId = $("#hydm").val();//这个对照着sap_customer_relation表，多了‘sap-’
        dataMap.crmCustomerName = $("#mbname").val();
    } else {
        showMessage("请填写客户名称");
        return null;
    }

    if (!isNull($("#deviceType").val())) {
        dataMap.deviceType = $("#deviceType").val();
    } else {
        showMessage("请输入设备类型");
        return null;
    }

    if (!isNull($("#deviceNum").val())) {
        if (!checkNumber("deviceNum", 0, "箱包数")) {
            return null;
        }
        dataMap.deviceNum = $("#deviceNum").val();
    } else {
        showMessage("请输入设备数量");
        return null;
    }

    if (!isNull($("#bootRate").val())) {
        dataMap.bootRate = $("#bootRate").val();
    } else {
        showMessage("请选择开机率");
        return null;
    }

    if (!isNull($("#dailyDosage").val())) {
        if (!checkNumber("dailyDosage", 3, "日用量")) {
            return null;
        }
        dataMap.dailyDosage = $("#dailyDosage").val();
    } else {
        showMessage("请输入日用量");
        return null;
    }

    if (!isNull($("#rawMaterialInventory").val())) {
        if (!checkNumber("rawMaterialInventory", 3, "原料库存")) {
            return null;
        }
        dataMap.rawMaterialInventory = $("#rawMaterialInventory").val();
    } else {
        showMessage("请输入原料库存");
        return null;
    }

    if (!isNull($("#productInventory").val())) {
        if (!checkNumber("productInventory", 3, "产品库存")) {
            return null;
        }
        dataMap.productInventory = $("#productInventory").val();
    } else {
        showMessage("请输入产品库存");
        return null;
    }

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    } 
    
    return dataMap;
}
