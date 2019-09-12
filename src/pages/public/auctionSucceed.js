$(function() {   
    
});

function toGetRedPacket(){
    var auctionId = $("#auctionId").val();
    var auctionmxId = $("#auctionmxId").val();
	var flag01 = $("#flag01").val();
	openPage('抽奖', '../customer/lotteryDrawInfo.html?auctionId='+auctionId+'&auctionmxId='+auctionmxId+'&flag01='+flag01, '1');
}