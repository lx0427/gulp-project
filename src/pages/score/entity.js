$(function() {
        queryData();
});


function queryData() {
    var url = requestPath + "/m/score/gift/giftList.htm";
    var dataMap = {};
    dataMap.pageSize=20;
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
	   console.info(d);
       if(!isNull(d)){
       d.filePathOld = filePathOld;
       $("#totalScore").html(d.account.score);
          if(scrollLoading){
             $("#list").append(template('list_page', d));
          }else{
            $("#list").html(template('list_page', d));
          }
        }
    },true,function(){

    });
}

template.helper("getDate", function(str) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format('yyyy.MM.dd');
});
var flagList = true;
function listToggle(){
    /**
     * 表格展开
     */
     if(flagList){
        $(".wx_coinlist").find(".hide").show();
        $(".wx_coinlist").find("i").addClass("on");
        $(".list").find("label").text("收起");
        $(".wx_main").attr("id","infinitePage");
        scrollLoading = false;
        $(function() {
            if ($("#infinitePage").length !== 0) {      
                if ($(".weui-infinite-scroll").length === 0) {
                    var appendHtml = "<div class='weui-infinite-scroll'>";
                    appendHtml += "<div class='infinite-preloader'></div>";
                    appendHtml += "正在加载";
                    appendHtml += "</div>";
                    $("#infinitePage").append(appendHtml);
                }
            }
        });
        $("#infinitePage").infinite().on("infinite", function() {
        if (scrollLoading) {
            return;
        }
        var pageIndex = $("#pageIndex").val(); // 当前页
        var pageCount = $("#pageCount").val(); // 总页数
        if (isNull(pageIndex) && isNull(pageCount)) {
            // 不需要分页
            $(".weui-infinite-scroll").hide();
            return;
        }
        if (parseInt(pageIndex) >= parseInt(pageCount)) {
            // 已经是最后一页了
            $(".weui-infinite-scroll").hide();
            return;
        }
        scrollLoading = true;
        setTimeout(function() {
            queryData();
        }, 10);
    });
        flagList = false;
     }else{
        $(".wx_coinlist").find(".hide").hide();
        $(".wx_coinlist").find("i").removeClass("on");
        $(".list").find("label").text("展开");
        $(".wx_main").attr("id","");
        $(".weui-infinite-scroll").hide();
        scrollLoading = true;
        flagList = true;
     }

}
function toExchangeDetail(ly){
    if (isNull(ly)||''==ly) {
        showMessage("参数错误");
        return ;
    }
    openPage("礼品兑换明细","../score/exchangeDetail.html?ly="+ly,1);
}
var giftFlag = false;
function scoreGift(id){
    var url = requestPath + "/m/score/gift/scoreGift.htm";
    var dataMap = {};
    if (!isNull(id)) {
        dataMap.lpid = id;
    }else{
        showMessage('请选择要兑换的礼品！');
        giftFlag = false;
        return;
    }
    confirmMsg("您确认兑换此礼品?", function() {
        if (giftFlag) {
            showMessage('请勿重复操作！');
            return;
        }
        giftFlag = true;
        $.ajaxjsonp(url, dataMap, function(data) {
             var d = eval(data);
            console.log(d);
            showMessage(d.msg);
            setTimeout('location.reload()',800);
        },false,function(){
            setTimeout('giftFlag=false;',1000);
        });
    });
}

//兑换
function toExchange(pkid, name){
    $("#confirmDiv").show();
    $("#entity").html(name);
    $("#pkid").val(pkid);
}

//取消兑换
function cancle(){
    $("#confirmDiv").hide();
}

//确定兑换
function confirmExchange(){
    $("#confirmDiv").hide();
    var id = $("#pkid").val();
    var dataMap = {};
    if (!isNull(id)) {
        dataMap.lpid = id;
    }else{
        showMessage('请选择要兑换的礼品！');
        giftFlag = false;
        return;
    }
    var url = requestPath + "/m/score/gift/scoreGift.htm";
     if (giftFlag) {
            showMessage('请勿重复操作！');
            return;
        }
        giftFlag = true;
        $.ajaxjsonp(url, dataMap, function(data) {
             var d = eval(data);
            console.log(d);
            // showMessage(d.msg);
            $("#successDiv").show();
            // setTimeout('location.reload()',800);
        },false,function(){
            setTimeout(function() {
                $("#successDiv").hide();
                $("#list").html("");
                $("#pageIndex").val(0);
                queryData();
                setTimeout('giftFlag=false;',1000);
            }, 1000);
        });
}
