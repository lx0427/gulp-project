$(function() {
    var url = window.location.href;
    scanRecord(11,0,'',url,'我的页面');
	queryData();
});

var clickFlag = false; // 是否允许点击，
var isLogin = false; // 是否登录， false未登录， true 已登录
var userid = "";
var typ = ""; // 邀请人类型：0 客户，1 经销商，2 业务员

function queryData() {
    var url = requestPath + "/m/login/getUserInfo.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if (isNull(d.user)) {
            // 未登陆
            $("#name").html($.i18n.prop('lg_loginname')+"/"+$.i18n.prop('re_registered'));
            $("#photo").attr("onclick", "toLogin()");
            $("#name").attr("onclick", "toLogin()");
        } else {
            isLogin = true;
            $("#logoutBtn").show();           
            // 已登录
            $("#name").html(d.user.menber.mbname+"("+d.user.username+")");
            // 头像处理
            if(!isNull(d.user.userPhoto)){
                $("#userPhotoImg").attr("src", filePath + d.user.userPhoto);
            }
            if(d.mboptRelationFlag){
                $("#mboptRelationLabel").show();
            }
			userid = d.user.userid; 
            typ = d.typ;

            setLocalData("scanhydm", d.user.hydm);
			setLocalData("scanmbname", d.user.menber.mbname);
			setLocalData("scanuserid", d.user.userid);
			setLocalData("scanmobile", d.user.mobile);
			setLocalData("scanusername",d.user.username);
			
        }
    }, false, function(){
        clickFlag = true;
    });
}

function toLogin() {    
    eval(loginName);
}


function toBalance() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("余额查询", "../public/balance.html", "1");
}

function toDeliveryList() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("出库明细查询", "../public/deliveryList.html?from=customer", "1");
}

function toInvoiceCheck() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("发票对账", "../customer/invoiceCheck.html", "1");
}

function toUserInfo() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("我的资料", "../customer/userInfo.html", "1");
}

function toFeedback() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("意见反馈", "../customer/feedback.html", "1");
}

function toIndex() {
    openPage("首页", "../customer/index.html", "1");
}

function toBuy() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("下单", "../customer/orderResourceList.html", "1");
}

function goShoppingCart() {
    if(!clickFlag){
        return false;
    }
	if (!isLogin) {
        toLogin();
        return false;
    }
    toShoppingCart();
}

function toMyPage() {
    openPage("我的", "../customer/my.html", "1");
}

// 退出
function doLogout() {
    var url = requestPath + "/m/login/doLogout.htm";
    var dataMap = {};

    $.ajaxjsonp(url, dataMap, function(data) {
        isLogin = false;
        $("#name").html("登录/注册");
        $("#photo").attr("onclick", "toLogin()");
        $("#name").attr("onclick", "toLogin()");
        $("#userPhotoImg").attr("src", "../../images/headpic.png");
        $("#logoutBtn").hide();
        $("#mboptRelationLabel").hide();
    });
}

function unconfirmedOrder() {
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("待审核订单", "../customer/unconfirmedOrder.html", "1");
}

function sapOrder() {
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("订单查询", "../public/sapOrder.html?from=customer", "1");
}

function changeUser(){
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("切换用户", "../customer/changeUser.html", "1");
}
function toCoupon(){
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("我的优惠券", "../customer/couponList.html", "1");
}
function toAuction(){
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("我的竞拍", "../customer/auctionList.html", "1");
}
function toRecommend(){
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("推荐有奖", "../recommend/tjyj.html?userid="+userid + "&typ=" + typ, "1");
}

// 售后服务，客户投诉
function toComplaintList(){
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
   
    openPage("售后服务", "../complaint/complaintList.html", "1");
}

function toMyGroupBuy(){
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("我的拼团", "../customer/myGroupBuyList.html", "1");
}

function toExcipient() {
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("燃辅料订单", "../purchasing/excipientOrder.html", "1");
}

function toJkqdList() {
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("我的融资", "../customer/myJkqdList.html", "1");
}

function toMyLetter() {
    if(!clickFlag){
        return false;
    }
    if (!isLogin) {
        toLogin();
        return false;
    }
    openPage("站内信", "../customer/letterList.html", "1");
}