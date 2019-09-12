$(function() {
    queryData();
    $(".rule_close").click(function() {
        $(".rule").hide();
    });

    var url = window.location.href;
    scanRecord(0,0,"",url,'首页');

});

function showzx() {
 $(".phone_cont").toggle();
 }
 

function showrule(remark) {
    $("#rulename").html("优惠规则");
    $("#exDiscountRulesList").html(remark);
    $(".rule").show();
}

var isLogin = false; // 是否登录，false 未登录， true 已登录
function queryData() {
    var url = requestPath + "/m/resource/index.htm";
    var dataMap = {};
    dataMap.diffFlag=1;//差异化标识查询
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (!isNull(d.isLogin)) {
            isLogin = d.isLogin;
        }

        if (!isNull(d.sapBanner) && d.sapBanner.length > 0) {
            $("#wx_banner").html(template('sapBanner_page', d));
            $(".swiper-container").swiper({
                loop: true,
                autoplayDisableOnInteraction: false,
                autoplay: 5000
            });
        } else {
            // 没上传就显示默认的图片吧
            $("#wx_banner").html("<img src='../../images/hy_cyh.jpg' />");
        }
        //活动4张图片
        $("#activityPhotos").html(template('activityPhotos_page', d));
        if (!isNull(d.sapBotton) && d.sapBotton.length > 0) {
            $("#wx_botton").html(template('sapBotton_page', d));
        }
         // $("#diff").css('height','555px');
    });
}

function toLinkUrl(title, linkUrl) {
    if (isNull(linkUrl)) {
        return false;
    }
    setTimeout(function() {
        openPage(title, linkUrl, "1");
    }, 500);

    // 统计
    var url = requestPath + "/m/home/statistics/record.htm";
    var dataMap = {};
    dataMap.hsName = title;
    dataMap.hsUrl = linkUrl;
    dataMap.hsType = 1;
    dataMap.flag00 = 1;//类型,1.首页统计,2横幅统计
    $.ajaxjsonp(url, dataMap, function(data) {

    }, false);
}


function DTYList(){
     openPage("差异化DTY", "../customer/resourceList.html?pm=DTY&diffFlag=1", "1");
}

function DTYListRemark(keyword){
         openPage("差异化DTY", "../customer/resourceList.html?pm=DTY&diffFlag=1&searchRemark="+keyword, "1");
}

function FDYList(){
     openPage("差异化FDY", "../customer/resourceList.html?pm=FDY&diffFlag=1", "1");
}
function FDYListRemark(keyword){
     openPage("差异化FDY", "../customer/resourceList.html?pm=FDY&diffFlag=1&searchRemark="+keyword, "1");
}

function sectionList(){    
     openPage("差异化切片", "../customer/resourceList.html?pm=切片&diffFlag=1", "1");
}

function sectionListRemark(keyword){
    openPage("差异化切片", "../customer/resourceList.html?pm=切片&diffFlag=1&searchRemark="+keyword, "1");
}

function POYList(){    
     openPage("差异化POY", "../customer/resourceList.html?pm=POY&diffFlag=1", "1");
}

function showAll(){
     $("#wx_vaguebox").hide();

     $(".bbb").show();
    // var url = requestPath + "/m/resource/index.htm";
    // var dataMap = {};
    // dataMap.diffFlag=1;//差异化标识查询
    // $.ajaxjsonp(url, dataMap, function(data) {
    //     var d = eval(data);
    //     console.info(d);
    //     if (!isNull(d.isLogin)) {
    //         isLogin = d.isLogin;
    //     }
    //     if (!isNull(d.sapBotton) && d.sapBotton.length > 0) {
    //         $("#wx_botton").html(template('sapBotton_page2', d));
    //     }
    // });
}