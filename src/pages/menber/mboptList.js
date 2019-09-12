
$(function() {

    var hydm = $("#hydm").val();
    if (isNull(hydm)) {
        showMessage("参数错误");
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
    var hydm = $("#hydm").val();
    openPage("新增操作员", "../menber/mboptAdd.html?hydm=" + hydm);
}

function toEdit(userid,username,isadmin,status,mobile){
    var hydm = $("#hydm").val();
    openPage("编辑操作员", "../menber/mboptEdit.html?hydm="+hydm+"&userid="+userid+"&status="+status+"&username="+username+"&mobile="+mobile+"&isadmin="+isadmin);
}





