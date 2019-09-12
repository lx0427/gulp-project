$(function() {
    queryData();
});

function queryData() {
    var url = requestPath + "/m/sapProductSale/list.htm";
    var dataMap = {};
    dataMap.userid = $("#userid").val();
    dataMap.pm = $("#pm").val();

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        initPage(d.data[0]);
    }, false, function() {

    });
}

function initPage(data) {
    $("#pm").val(data.pm);
    $("#userName").val(data.userName);
    $("#userid").val(data.userid);
    $("#percent").val(data.percent+" %");
    $("#amount").val(data.amount+" kg");
    $("#usedAmount").val(data.usedAmount+" kg");
    $("#availableAmount").val(data.availableAmount+" kg");
    $("#cdate").val(data.cdate);
}