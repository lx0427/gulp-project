$(function() {
    queryData();
});

function queryData() {
    var url = requestPath + "/m/guessPrice/guessPricePassed.htm";
    var dataMap = {};

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        console.info(d);
        if(d.data!=null){
            $("#list").append(template('list_page', d));     
        }else{
            $("#noneData").show();
        }
    },true);
}


function toActivityIndex(){
    openPage("活动首页", "../customer/guessPriceIndex.html", "1");
}

function toResult(activityId, flag2){
    openPage("猜价结果", "../customer/guessPriceResult.html?activityId="+activityId+"&flag2="+flag2, "1");
}


template.helper("getDate", function(str, pattern) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(pattern);
});

template.helper("getTime", function(str, pattern) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(pattern);
});