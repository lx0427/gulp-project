$(function() {

    var hydm = $("#username").val();
    var userid = $("#userid").val();
    var isadmin = $("#isadmin").val();
    var status = $("#status").val();

    if (isNull(userid)) {
        showMessage($.i18n.prop('com_errorpar'));
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
            openPage("操作员列表", "../newmenber/mboptList.html?hydm=" + $("#hydm").val(), "1");
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
        showMessage($.i18n.prop('com_nametip'));
        return null;
    }

    if (!isNull($("#isadmin").val())) {
        dataMap.isadmin = $("#isadmin").val();
    } else {
        showMessage($.i18n.prop('mb_permissionaAssignmenttip'));
        return null;
    }

    if (!isNull($("#status").val())) {
        dataMap.status = $("#status").val();
    } else {
        showMessage($.i18n.prop('mb_statustip'));
        return null;
    }

    if (!isNull($("#mobile").val())) {
        if (!checkMobile($("#mobile").val())) {
            showMessage($.i18n.prop('mb_errorphone'));
            return null;
        }
        dataMap.mobile = $("#mobile").val();
    } else {
        showMessage($.i18n.prop('com_phonetip'));
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
