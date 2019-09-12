$(function() {
    
	  $("#form").bind("submit", function(){
        initPage();
        return false;
       });
       $(".weui_icon_clear").bind("click", function(){
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
     });

     $(".weui_search_cancel").bind("click", function(){
        if (isNull($("#querykey").val())) {
            return false;
        }
        $("#querykey").val("");
        initPage();
     });

    queryData();


});

function queryData() {
    var url = requestPath + "/m/searchHistory/searchList.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        
        console.log(d);
        
        $("#list1").html(template('list_page1', d));
        $("#list2").html(template('list_page2', d));

    }, false);
}
function initPage() {
   if (!isNull($("#querykey").val())) {
        toResourceList($("#querykey").val());
    }
   
   
}
function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pm").val())) {
        dataMap.pm = $("#pm").val();
    }

    return dataMap;
}

function clearAllSearch() {
    var url = requestPath + "/m/searchHistory/clearAllSearch.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list1").html('');
        $("#list2").html('');
        queryData();
    }, false);
}

function clearOneSearch(keyword) {
    var url = requestPath + "/m/searchHistory/clearOneSearch.htm";
    var dataMap = {};
    dataMap.keyword = keyword;

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
            queryData();
    }, false);
}

function toResourceList(keyword) {
    openPage("资源列表", "../customer/resourceNewList.html?keyword=" + keyword, "1");
}
