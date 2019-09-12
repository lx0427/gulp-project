$(function() {
    var hydm = $("#hydm").val();
    if (isNull(hydm)) {
        showMessage("参数错误");
        return false;
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




});



var saveFlag = false;

function doSave() {
    if (saveFlag) {
        return false;
    }

    var url = requestPath + "/m/menber/saveOpt.htm";

    var dataMap = getDataMap();
    if (dataMap == null) {
        return null;
    }
    saveFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("新增成功", function() {
            openPage("操作员列表", "../menber/mboptList.html?hydm=" + $("#hydm").val(), "1");
        });
    }, false, function() {
        saveFlag = false;
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
    if (!isNull($("#mobile").val())) {
        if(!checkMobile($("#mobile").val())){
            showMessage("手机号格式不正确");
            return null;
        }
        dataMap.mobile = $("#mobile").val();
    } else {
        showMessage("请填写手机号码");
        return null;
    }
    if (!isNull($("#pwd").val())) {
        dataMap.pwd = hex_md5($("#pwd").val());
    } else {
        showMessage("请填写密码");
        return null;
    }

    dataMap.hydm = $("#hydm").val();

    return dataMap;
}
