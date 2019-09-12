
$(function() {

    var hydm = $("#hydm").val();
    if (isNull(hydm)) {
        showMessage($.i18n.prop('com_errorpar'));
        return false;
    }
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

});


function queryData() {
    var url = requestPath + "/m/menber/getMbOptList.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if(d.data!=null){
            $("#listlength").val(d.data.length);
        }
        $("#list").append(template('list_page', d));

    }, true);
}

function getDataMap() {
    var dataMap = {};
    if (!isNull($("#querykey").val())) {
        dataMap.keyWord = $("#querykey").val();
    }
    dataMap.hydm = $("#hydm").val();
    return dataMap;
}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

function toAdd(){
    var listlength = $("#listlength").val();
    if(listlength!=undefined && listlength !=""){
        if(listlength>3 || listlength==3){
            showMessage("操作员数量已达上限！对不起，您的公司操作员数量已达上限，无法再新增。");
            return;
        }
    }
    var hydm = $("#hydm").val();
    openPage("新增操作员", "../newmenber/mboptAdd.html?hydm=" + hydm);
}

function toEdit(userid,username,isadmin,status,mobile){
    var hydm = $("#hydm").val();
    openPage("编辑操作员", "../newmenber/mboptEdit.html?hydm="+hydm+"&userid="+userid+"&status="+status+"&username="+username+"&mobile="+mobile+"&isadmin="+isadmin);
}





