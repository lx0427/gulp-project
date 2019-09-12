$(function() {
    queryData();
});

function queryData() {
    var clientRequest = getRequest();
    $("#dpname").val(clientRequest["dpname"]);

    var url = requestPath + "/m/optUser/getOptUser.htm";
    var dataMap = {};
    dataMap.userid = clientRequest["userid"];

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        setTimeout(function() {
            binddep(d.depList);
        }, 10);
        setTimeout(function() {
            bindpm(d.pmList);
        }, 10);
        initPage(d.data);

    }, false, function() {

    });
}

function initPage(data) {
    $("#userid").val(data.userid);
    $("#username").val(data.username);
    $("#mobile1").val(data.mobile1);
    $("#dpid").val(data.dpid);
    $("#wxOpenid").val(data.wxOpenid);
    $("#str01_txt").val(data.str01);
    $("#str01").val(data.str01);
    $("#flag00").val(data.flag00);
    $("#flag07").val(data.flag07);
    $("#flag08").val(data.flag08);
    $("#flag09").val(data.flag09);
    $("#flag10").val(data.flag10);

    if (data.flag07 == 1) {
        $("#flag07_txt").val("是");
    }else{
        $("#flag07_txt").val("否");
    } 

    if (data.flag08 == 1) {
        $("#flag08_txt").val("是");
    } else{
        $("#flag08_txt").val("否");
    }
    if (data.flag09 == 1) {
        $("#flag09_txt").val("是");
    } else{
        $("#flag09_txt").val("否");
    }
    if (data.flag10 == 1) {
        $("#flag10_txt").val("老工厂");
    } else if (data.flag10 == 2){
        $("#flag10_txt").val("新工厂");
    }
        if (data.flag00 == 1) {
        $("#flag00_txt").val("启用");
    } else{
        $("#flag00_txt").val("停用");
    } 

    //是否为管理员，操作员
    $("#flag07_txt").select({
        title: "请选择是否是内勤",
        items: [{
            title: "是",
            value: "1"
        }, {
            title: "否",
            value: "0"
        }],

        onChange: function(d) {
            $("#flag07").val(d.values);            
        },        
        onClear: function() {
            $("#flag07").val("");
        }
    });

    $("#flag08_txt").select({
        title: "是否是经销商",
        items: [{
            title: "是",
            value: "1"
        },{
            title: "否",
            value: "0"
        }],
        onChange: function(d) {
            $("#flag08").val(d.values);
        },        
        onClear: function() {
            $("#flag08").val("");
        }
    });

    $("#flag00_txt").select({
        title: "请选择状态",
        items: [{
            title: "启用",
            value: "1"
        }, {
            title: "停用",
            value: "0"
        }],
        onChange: function(d) {
                $("#flag00").val(d.values);
        },
        
        onClear: function() {
            $("#flag00").val("");
        }
    });

    $("#flag09_txt").select({
        title: "请选择手机端管理权限",
        items: [{
            title: "是",
            value: "1"
        }, {
            title: "否",
            value: "0"
        }],
        onChange: function(d) {
           $("#flag09").val(d.values);           
        },       
        onClear: function() {           
            $("#flag09").val("");
        }
    });

    $("#flag10_txt").select({
        title: "请选择所属工厂",
        items: [{
            title: "老工厂",
            value: "1"
        }, {
            title: "新工厂",
            value: "2"
        }],
        onChange: function(d) {
           $("#flag10").val(d.values);           
        },       
        onClear: function() {           
            $("#flag10").val("");
        }
    });

}


// 部门下拉选择显示
function binddep(depList) {
    if (isNull(depList) || depList.length == 0) {
        return;
    }
    var jsons = [];
    for (var i = 0; i < depList.length; i++) {
        var json = {};
        json.title = depList[i].dpname;
        json.value = depList[i].dpid;
        jsons[i] = json;
    }

    $("#dpname").select({
        title: "请选择部门",
        items: jsons,
        onChange: function(d) {
            if (isNull(d.values)) {
                $("#dpname").val("");
                $("#dpid").val("");
            } else {
                $("#dpid").val(d.values);
            }
        },
        onClear: function() {
            $("#dpname").val("");
            $("#dpid").val("");
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
        json.title = pmList[i].pm;
        json.value = pmList[i].pm;
        jsons[i] = json;
    }

    $("#str01_txt").select({
        title: "请选择产品",
        items: jsons,
        onChange: function(d) {
            $("#str01").val(d.values);            
        },
        onClear: function() {
            $("#str01").val("");
        }
    });
}

var editFlag = false;
function doEdit() {
    if (editFlag) {
        return false;
    }
    var url = requestPath + "/m/optUser/update.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return false;
    }
    editFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("编辑成功", function() {
            openPage("操作员列表", "../salesman/employeeSet.html", "1");
        });
    }, false, function() {
        editFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#username").val())) {
        dataMap.username = $("#username").val();
    } else {
        showMessage("请填写姓名");
        return null;
    }

    if (!isNull($("#mobile1").val())) {
        if (!checkMobile($("#mobile1").val())) {
            showMessage("手机号格式不正确");
            return null;
        }
        dataMap.mobile1 = $("#mobile1").val();
    } else {
        // showMessage("请填写手机号码");
        // return null;
    }

    if (!isNull($("#dpid").val())) {

        dataMap.dpname = $("#dpname").val();
        dataMap.dpid = $("#dpid").val();
    } else {
        showMessage("请选择部门名称");
        return null;
    }
    dataMap.wxOpenid = $("#wxOpenid").val();
    dataMap.flag07 = $("#flag07").val();
    dataMap.flag08 = $("#flag08").val();
    dataMap.flag09 = $("#flag09").val();
    dataMap.flag10 = $("#flag10").val();
    dataMap.str01 = $("#str01").val();
    dataMap.flag00 = $("#flag00").val();
    dataMap.userid = $("#userid").val();
    
    return dataMap;
}
