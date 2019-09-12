$(function(){
    queryData();
})

function queryData() {
    var url = requestPath + "/m/login/getUnFinishNum.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);

        var jkshStatus100=0;
        if(!isNull(d.jkshStatus100)){
            jkshStatus100=d.jkshStatus100;
        };
        var hkshStatus100=0;
        if(!isNull(d.hkshStatus100)){
            hkshStatus100=d.hkshStatus100;
        };
        var loansunauditedCount=0;
        if(!isNull(d.loansunauditedCount)){
            loansunauditedCount=d.loansunauditedCount;
        };
        $("#jkShNum").html(jkshStatus100);
		$("#hkShNum").html(hkshStatus100);
		$("#loansShNum").html(loansunauditedCount);
    });
}

function financingList(){    
    openPage("借款清单", "../salesman/financingList.html", "1");
}

function menberLevelList(){    
    openPage("还款清单", "../salesman/financingList1.html", "1");
}

// 还款进度
function financeManager(){    
    openPage("还款进度", "../salesman/financeOrderList.html", "1");
}

//融资订单列表
function loansOrderList(couponType){    
    openPage("融资订单", "../salesman/loansOrderList.html?couponType="+couponType, "1");
}