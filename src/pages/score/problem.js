$(function() {
    queryData();
});
function queryData() {
    var url = requestPath + "/m/score/problem/problemList.htm";
    var dataMap = {};
    if (!isNull($("#reward").val())) {
        dataMap.reward = $("#reward").val();
    }
    if (!isNull($("#cid").val())) {
        dataMap.cid = $("#cid").val();
    }
    if (!isNull($("#answerNum").val())) {
        dataMap.answerNum = $("#answerNum").val();
    }
    if (!isNull($("#focusFlag").val())) {
        dataMap.focusFlag = $("#focusFlag").val();
    }
    if (!isNull($("#mineFlag").val())) {
        dataMap.mineFlag = $("#mineFlag").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
        if (!isNull($("#order").val())) {
            dataMap.order = $("#order").val();
        }
    }
    currentAjax  = $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       if(!isNull(d.data)){
            if(scrollLoading){
                $("#list").append(template('list_page', d));
            }else{
                $("#list").html(template('list_page', d));
            }

            if ($("#pageIndex").val()>=d.pageCount){
                $(".zyz_more").html("没有更多了");
              }
        }else{
            if(!scrollLoading){
                $("#list").html("");
                $(".zyz_more").html('没有更多了');
            }
            
        }
        if (!isNull(d.categoryList)) {
            $("#category").html(template('category_page', d));
            $("#categorySelect").html(template('categorySelect_page', d));
        }else{
            $("#category").html("没有更多分类了");
        }
        if (!isNull(d.rankingList)) {
            $("#rankingList").html(template('rankingList_page', d));
        }else{
            $("#rankingList").html("虚位以待");
        }

    },true,function(){
    });
}
function queryMoreData(flag) {
    var url = requestPath + "/m/score/problem/problemList.htm";
    var dataMap = {};
    if (flag==1&&!isNull($("#problem").val())) {
        dataMap.problem = $("#problem").val();
    }else if(flag==1&&isNull($("#problem").val())){
        showMessage("请输入要查的内容");
        return;
    }
    if (!isNull($("#reward").val())) {
        dataMap.reward = $("#reward").val();
    }
    if (!isNull($("#cid").val())) {
        dataMap.cid = $("#cid").val();
    }
    if (!isNull($("#answerNum").val())) {
        dataMap.answerNum = $("#answerNum").val();
    }
    if (!isNull($("#focusFlag").val())) {
        dataMap.focusFlag = $("#focusFlag").val();
    }
    if (!isNull($("#mineFlag").val())) {
        dataMap.mineFlag = $("#mineFlag").val();
    }
    if (!isNull($("#order").val())) {
        dataMap.order = $("#order").val();
    }
    if (!isNull($("#orderName").val())) {
        dataMap.orderName = $("#orderName").val();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       if(!isNull(d.data)){
            if(scrollLoading){
                $("#list").append(template('list_page', d));
            }else{
                $("#list").html(template('list_page', d));
            }
            if (parseInt($("#pageIndex").val())>=parseInt(d.pageCount)) {
                $(".zyz_more").html("没有更多了");
              }else{
                $(".zyz_more").html("点击查看更多");
              }
        }else{
            if(!scrollLoading){
                $("#list").html("");
               $(".zyz_more").html("没有更多了"); 
            }
            
        }
    },true,function(){
    });
}
var problemFlag = false;
function doProblem(){
    if (problemFlag) {
        showMessage('请勿重复提问！');
        return;
    }
    problemFlag = true;
    var url = requestPath + "/m/score/problem/doProblem.htm";
    var dataMap = {};
    if (!isNull($("#problem").val())) {
        dataMap.problem = $("#problem").val();
    }else{
        showMessage('请输入提问内容！');
        problemFlag = false;
        return;
    }
    if (!isNull($("#problemReward").val())) {
        dataMap.reward = $("#problemReward").val();
    }else{
        showMessage('请选择提问类型！');
        problemFlag = false;
        return;
    }
    if (!isNull($("#problemCid").val())) {
        dataMap.cid = $("#problemCid").val();
    }else{
        showMessage('请选择问题分类！');
        problemFlag = false;
        return;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
         var d = eval(data);
        console.log(d);
        showMessage("提问成功，奖励500纤币");
        setTimeout('location.reload()',800);
    },false,function(){
        setTimeout('problemFlag=false;',1000);
        $("#jf_pop").hide();
    });
}
function queryList(id,value,object){
    if('all'==id){
        $(".problemQuery").val('');
    }else if ('orderName'==id) {
        $(".xz_wt .xz_tab span em").css("color","#333");
        if (value=="cdate") {
            $("#isNew").css("color","#3e7caf");
        }else if (value='answerNum') {
            $("#isHot").css("color","#3e7caf");
        }
        if(value==$("#orderName").val()){
            if("asc"==$("#order").val()){
                $("#order").val('desc')
            }else{
                $("#order").val('asc')
            }
        }else{
            $("#order").val('desc')
        }
        $("#"+id).val(value);
    }else{
        if ('cid'==id) {
            $(".cid_p").css('color','#333');
            $("#cid_p_"+value).css('color','#3e7caf');
        }
        $(".problemQuery").val('');
        $("#"+id).val(value);
    }
    if (object!=null&&object!=undefined) {
        $(object).addClass("xz_tab_current").siblings().removeClass("xz_tab_current");
        $(".cid_p").css('color','#333');
    }
    $("#pageIndex").val(0);
    queryMoreData();
}
function loadData(){
    if($("#pageIndex").val()>=$("#pageCount").val()){
        $(".zyz_more").html('没有更多了');
        return;
    }
    scrollLoading = true;
    // $("#pageIndex").val(parseInt($("#pageIndex").val())+1);
    queryMoreData();
}
function showAnswerWindow(id){
    setTimeout('problemFlag=false;',100);
    $(".jf_pop").show();
}
function giveup(){
    setTimeout('problemFlag=false;',1000);
    $(".jf_pop").hide();
}
function showCategoryList(){
    $(".choose_days").show();
}
function closeCategoryList(){
    $(".choose_days").hide();
}
function chooseThis(value){
    $("#problemReward").val(value);
}
function chooseCategory(value,name){
    $("#problemCid").val(value);
    $(".jf_qxz").html(name);
    $(".choose_days").hide();
}

template.helper("getDate", function(str) {
    var today = new Date();
    var cdate = new Date(str);
    var cha = today.getTime() - cdate.getTime();
    if(cha<=86400000*3){  //如果提问时间小于3天,特别显示
        if (cha<60000) {
            return Math.floor(cha/1000)+"秒前";
        }else if (cha<3600000) {
            return Math.floor(cha/60000)+"分钟前";
        }else if (cha<86400000) {
            return  Math.floor(cha/3600000)+"小时前";
        }else{
            return  Math.floor(cha/86400000)+"天前";
        }

    }else{
        str = str.replace(/-/g, '/');
        if (str.length > 19) {
            str = str.substring(0, 19);
        }
        var date = new Date(str);
        return date.format('yyyy.MM.dd');
    }
    return "很久以前";
});

function toInfo(id){
    openPage('问题详情','../score/problemAnswer.html?problemId='+id,1);
}