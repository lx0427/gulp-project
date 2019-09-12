$(function() {
    queryData();
});

function queryData() {
    var url = requestPath + "/m/score/couponList.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       if(!isNull(d)){
            $("#main").html(template('main_page', d));
            $("#myCount").html(d.account.score);
            $("#timemd5").val(d.account.timemd5);
       }
    },true,function() {
		  
    });
}

function getDataMap() {
    var dataMap = {};

    return dataMap;
}

function toExchangeDetail(){
	openPage("兑换明细", "../score/couponExchangeDetail.html");
}

//兑换
function toExchange(pkid, price){
	$("#confirmDiv").show();
	$("#couponPrice").html(price);
	$("#pkid").val(pkid);
}

//取消兑换
function cancle(){
	$("#confirmDiv").hide();
}

//确定兑换
function confirmExchange(){
	$("#confirmDiv").hide();
	var pkid = $("#pkid").val();
	var url = requestPath + "/m/score/exChangeCoupon.htm";
    var dataMap = {};
    dataMap.pkid = pkid;
    if (isNull($("#timemd5").val())) {
      showMessage("参数错误，请刷新重试");
      return;
    }
    dataMap.timemd5 = $("#timemd5").val();
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       $("#successDiv").show();
    },false,function(){
    	setTimeout(function() {
            $("#successDiv").hide();
            queryData();
        }, 1000);
    });
}
