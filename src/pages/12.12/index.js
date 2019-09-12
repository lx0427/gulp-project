$(function(){

	var url = window.location.href;
	scanRecord(0,0,"",url);
	
});

/**
* 拼团
*/
function pintuan(){
	openPage("优惠拼团", "../customer/groupPurchase.html", "1");
}

/**
* 竞拍
*/
function jingpai(){
	openPage("限时竞拍", "../customer/auction.html", "1");
}


