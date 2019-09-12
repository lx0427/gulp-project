$(function() {

    var hydm = $("#username").val();
    var userid = $("#userid").val();
    var isadmin = $("#isadmin").val();
    var status = $("#status").val();

    if (isNull(userid)) {
        showMessage("参数错误");
        return false;
    }

    if (isadmin == 1) {
        $("#power").val("管理员");
    } else if (isadmin == 0) {
        $("#power").val("操作员");
    }

    if (status == 1) {
        $("#power1").val("启用");
    } else if (status == 0) {
        $("#power1").val("停用");
    }


    //是否为管理员，操作员
    $("#power").select({
        title: "请选择权限",
        items: [{
            title: "管理员",
            value: "1"
        }, {
            title: "操作员",
            value: "0"
        }],

        onChange: function(d) {

            if (isNull(d.values)) {
                $("#power").html("<span class=\"xl\"></span>");
                $("#isadmin").val("");
            } else {
                $("#power").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#isadmin").val(d.values);
            }
        },
        onClose: function() {

        },
        onClear: function() {
            $("#power").html("<span class=\"xl\"></span>");
            $("#isadmin").val("");
        }
    });

    $("#power1").select({
        title: "请选择状态",
        items: [{
            title: "启用",
            value: "1"
        }, {
            title: "停用",
            value: "0"
        }],
        onChange: function(d) {

            if (isNull(d.values)) {
                $("#power1").html("<span class=\"xl\"></span>");
                $("#status").val("");
            } else {
                $("#power1").html(d.titles + "<span class=\"xl\"></span>").addClass("current");
                $("#status").val(d.values);
            }
        },
        onClose: function() {

        },
        onClear: function() {
            $("#power1").html("<span class=\"xl\"></span>");
            $("#status").val("");
        }
    });

});



var editFlag = false;

function doEdit() {
    if (editFlag) {
        return false;
    }
    var url = requestPath + "/m/menber/editopt.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return false;
    }
    editFlag = true;

    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("编辑成功", function() {
            openPage("操作员列表", "../menber/mboptList.html?hydm=" + $("#hydm").val(), "1");
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

    if (!isNull($("#isadmin").val())) {
        dataMap.isadmin = $("#isadmin").val();
    } else {
        showMessage("请分配权限");
        return null;
    }

    if (!isNull($("#status").val())) {
        dataMap.status = $("#status").val();
    } else {
        showMessage("请选择状态");
        return null;
    }

    if (!isNull($("#mobile").val())) {
        if (!checkMobile($("#mobile").val())) {
            showMessage("手机号格式不正确");
            return null;
        }
        dataMap.mobile = $("#mobile").val();
    } else {
        showMessage("请填写手机号码");
        return null;
    }

    /*
     if (!isNull($("#pwd").val())) {
         dataMap.pwd = hex_md5($("#pwd").val());
     } else {
         showMessage("请填写密码");
         return null;
     }
     */

    if (!isNull($("#userid").val())) {
        dataMap.userid = $("#userid").val();
    }
    dataMap.hydm = $("#hydm").val();

    return dataMap;
}
