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

function toAppointmentOrderList(){    
    openPage("预约订单", "../customer/appointmentOrder.html", "1");
}

function sapOrder() {
    openPage("订单查询", "../public/sapOrder.html?from=customer", "1");
}