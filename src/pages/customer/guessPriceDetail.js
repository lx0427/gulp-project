$(function() {
    var clientRequest = getRequest();
    pm = clientRequest["pm"];
    var activityId = clientRequest["activityId"];
    if (isNull(activityId)) {
        showMessage("参数错误");
        return false;
    }
    queryData();
});

var pm = "";

function queryData() {
    var url = requestPath + "/m/guessPrice/guessDetail.htm";
    var dataMap = {};
    dataMap.activityId = $("#activityId").val(); 
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        console.info(d);
        if(d.groupList != null && d.groupList.length>0){
            $("#list").html(template('list_page', d));   
        }

        if(!isNull(d.data)){
            flag2 = d.data.flag2;
            $("#flag2").html(flag2);
           
            $("#effectProud").html(d.data.startDate.substring(0,10)+" "+d.data.startTime.substring(11,19)+"-"+d.data.endTime.substring(11,19));
        }
        
    },true);
}

function toPmArea(pm1){
	pm = pm1;
    $(".tabnav li").each(function(){
        $(this).removeClass("on");
        var id = $(this).attr("id");
        console.info("id:"+id);
        $("#ul_"+id).hide();
    });
    var pmStr = "";
    if(pm1=='POY'){
    	pmStr='poy';
    }
    if(pm1=='DTY'){
    	pmStr='dty';
    }
    if(pm1=='FDY'){
    	pmStr='fdy';
    }
    if(pm1=='切片'){
    	pmStr='qp';
    }
    $("#ul_"+pmStr).show();
    $("#"+pmStr).addClass("on");
}

template.helper("getDirectVal", function(str) {
    if (isNull(str)) {
        return;
    }
    var fa = parseFloat(str);

    return (-1)*fa;
});

function toActivityIndex(){
    openPage("活动首页", "../customer/guessPriceIndex.html", "1");
}

//讨论区
function toDiscuss(){
    var activityId = $("#activityId").val();
    openPage("讨论区", "../customer/guessPriceDiscuss.html?pm="+pm+"&activityId="+activityId+"&flag2="+flag2, "1");
}
