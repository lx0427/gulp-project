$(function() {   
   var timehwnd=setInterval("Countdown()",1000);
   queryData();
});

function toOrderList(){
    var fcOrderFlag = $("#fcOrderFlag").val();
    var appointmentFlag = $("#appointmentFlag").val();
    if(appointmentFlag==1){
    	openPage('预约单', '../customer/appointmentOrder.html', '1');
    }else{
    	if(fcOrderFlag==1){
			openPage('逸控代', '../customer/myJkqdList.html', '1');
		}else if(fcOrderFlag==2){
			openPage('逸信代', '../customer/loansOrderList.html', '1');
		}else{
			openPage('待审核订单', '../customer/unconfirmedOrder.html', '1');
		}
    }
	
}

var i=6;
function Countdown(){
    i--;
    if(i == 0){
        openPage("我的", "../customer/my1.html", "1");
        clearInterval(timehwnd);
    }else{
        $("#checkButtom").html("点击查看订单("+i+")");
    }
}
function queryData() {
    var dataMap = {};
    dataMap.circleId=circleId;
    var url = requestPath + "/m/poster/getOrderSuccess.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").html(template('list_page', d));
    })
}
