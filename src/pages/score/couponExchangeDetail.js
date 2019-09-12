$(function() {
        queryData();
});


function queryData() {
    var url = requestPath + "/m/score/getExchangeDetail.htm";
    var dataMap = {};
	dataMap.ly = 5000; //表示纤币兑换优惠券
    dataMap.pageSize=20;
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
	   console.info(d);
       if(!isNull(d)){
        if(scrollLoading){
            $("#listTbody").append(template('listTbody_page', d));
                if(!flagList){
                    $(".wx_coinlist").find(".hide").show();
                }
          }else{
            $("#list").html(template('list_page', d));
          }
           
        }
    },true,function(){
       if(flagList){
            setTimeout(function(){
            scrollLoading = true;},10);
        }
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