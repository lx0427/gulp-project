$(function() {
    initPage();
});

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var url = requestPath + "/m/sapProductSale/list.htm";

    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").append(template('list_page', d));

        console.info(d);
    }, true, function() {
        queryFlag = false;
    });
}

function toPage(userid,pm){
    openPage("双兔销售组织业务员控量详情", "../salesman/stSaleInfo.html?userid=" + userid + "&pm=" + pm);
}
