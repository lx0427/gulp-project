$(function(){
    queryData();
})

function queryData() {
    /*var url = requestPath + "/m/login/getUnFinishNum.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);

        var fcUnauditedCount=0;
        if(!isNull(d.fcUnauditedCount)){
            fcUnauditedCount=d.fcUnauditedCount;
        };
        var loansUnauditedCount=0;
        if(!isNull(d.loansUnauditedCount)){
            loansUnauditedCount=d.loansUnauditedCount;
        };
        $("#fcUnauditedCount").html(fcUnauditedCount);
		$("#loansUnauditedCount").html(loansUnauditedCount);

    });*/
}

function toCounponList(){    
    openPage("代金券列表", "../customer/couponList.html", "1");
}

function toFcCouponList() {
    openPage("免息券列表", "../customer/couponFcList.html", "1");
}