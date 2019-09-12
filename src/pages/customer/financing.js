$(function(){
    queryData();
})

function queryData() {
    var url = requestPath + "/m/login/getUnFinishNum.htm";
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

    });
}

function financingList(){    
    openPage("逸控代订单", "../customer/myJkqdList.html", "1");
}

function loanCreditList(couponType){    
    openPage("融资订单", "../customer/loansOrderList.html?couponType="+couponType, "1");
}