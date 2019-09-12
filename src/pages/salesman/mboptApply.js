    
  
var json={};
  $(function() {
    $("#form").bind("submit", function() {
        initPage();
        return false;
    });
    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#keyWord").val())) {
            return false;
        }
       $("#keyWord").val("");
      initPage();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#keyWord").val())) {
            return false;
        }
       $("#keyWord").val("");
      initPage();
    });
    json.position = $("#position").val();
    initDatePage();
    initPage();

});
function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();  
 
}
function queryData() {
    var url = requestPath + "/m/mboptApply/list.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        d.position = $("#position").val();
        if(scrollLoading){
          $("#list").html(template('list_page', d));
        }else{
          $("#list").append(template('list_page', d));
        }
    },true,function(){
        setTimeout("$('#dateQueryTrue').css('pointer-events','auto');",1000);
});
   
}
function getDataMap() {
    var dataMap = {};

    if (!isNull($("#keyWord").val())) {
        dataMap.keyWord = $("#keyWord").val();
    }
    if(!isNull($("#rqStart").val())){
      dataMap.rqStart = $("#rqStart").val();
    }
    if(!isNull($("#rqEnd").val())){
      dataMap.rqEnd = $("#rqEnd").val();
    }
    if(!isNull($("#status").val())){
      dataMap.status = $("#status").val();
    }
    if(!isNull($("#order").val())){
      dataMap.order = $("#order").val();
    }
    if(!isNull($("#orderName").val())){
      dataMap.orderName = $("#orderName").val();
    }
    if(!isNull($("#position").val())){
      dataMap.position = $("#position").val();
    }
    return dataMap;
}


template.helper("getDate", function(str, pattern) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(pattern);
});

function showSelect(str) {
    $("#xlsx3").html(template(str + 'list_page', json));
    var middle = $("#"+str+'middle').val();
    $("#" + str + "_" + middle).addClass("current");
    $(".wx_pulldownbox").toggle();
    $(".wx_opacity").toggle();
    // $(".wx_pulldownbox").hide();
    // $(".wx_opacity").hide();
    if ($(".wx_pulldownbox").css("display") == "none") {
        $("#" + str + "title").removeClass("current");
    } else {
        $("#wx_hyfilter li").removeClass("current");
        $("#" + str + "title").addClass("current");
    }
}


function middleSelect(str1, str2, id) {
  var middle = $("#"+str2+'middle').val();
    if(str1=="cdate" && id=="asc"){
      console.log(1);
      $("#" + str2 + "title").html("时间升序<span class='xl'></span>");
    }else if(str1=='cdate' && id=="desc"){
      console.log(2);
      $("#" + str2 + "title").html("时间降序<span class='xl'></span>");
    }else if(str1=='status' && id=="asc"){
      console.log(3);
      $("#" + str2 + "title").html("状态升序<span class='xl'></span>");
    }else if(str1=='status' && id=="desc"){
      console.log(4);
      $("#" + str2 + "title").html("状态降序<span class='xl'></span>");
    }else{
      console.log(5);
      $("#" + str2 + "title").html(str1 + "<span class='xl'></span>");
    }
    $("#" + str2 + "title").addClass("current");
    if(str2=='order'){
      $("#" + str2 + "_" + middle).removeClass("current");
      $("#" + str2 + "_" + id).addClass("current");
      $("#"+str2+'middle').val(str1+id);
    }else{
      $("#" + str2 + "_" + middle).removeClass("current");
      $("#" + str2 + "_" + id).addClass("current");
     $("#"+str2+'middle').val(id);
    }
    

    toHide();

    if (str2 == "time") {
        $("#rqStart").val("");
        $("#rqEnd").val("");
      if(id=='0'){

      }else if(id=='4'){
        showDatePage();
        return;
      }else{
        setDate(id);
      }
    }
    if (str2 == "status") {
      $("#"+str2).val(id);
    }
    if (str2 == "order") {
      $("#"+str2).val(id);
      $("#"+str2+'Name').val(str1);
    }

    initPage();

}
function toHide() {
    $(".wx_pulldownbox2").hide();
    $(".wx_opacity2").hide();
    $(".wx_opacity").hide();
    $(".wx_pulldownbox").hide();

    $(".wx_ziyfilter li").removeClass("current");
}
//设置查询时间
function setDate(flag){
 var date=new Date();
    if(flag==1){  //近一周
        $("#rqStart").val(getCurrentWeekFirst().toLocaleDateString().replaceAll('/','-'));
    }
    if(flag==2){  //近一个月
        $("#rqStart").val(getCurrentWeekLast().toLocaleDateString().replaceAll('/','-'));
    }
    if(flag==3){   //近三个月
        $("#rqStart").val(getCurrentWeekLast3().toLocaleDateString().replaceAll('/','-'));
    }
    console.log($("#rqStart").val(),'rqStart');
}
//获取当月第一天日期
function getCurrentMonthFirst(){
 var date=new Date();
 date.setDate(1);
 return date;
}
//获取当月最后一天日期
function getCurrentMonthLast(){
 var date=new Date();
 var currentMonth=date.getMonth();
 var nextMonth=++currentMonth;
 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
 var oneDay=1000*60*60*24;
 return new Date(nextMonthFirstDay-oneDay);
}
//获得一周前的日期
function getCurrentWeekFirst(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()-7);
}
//获得一个月前的日期
function getCurrentWeekLast(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth()-1,date.getDate());
}
//获得三个月前的日期
function getCurrentWeekLast3(){
    var date=new Date();
    return new Date(date.getFullYear(),date.getMonth()-3,date.getDate());
}
//确定按时间查询
function doDateQuery(){
    $('#dateQueryTrue').css('pointer-events','none');
    $("#rqStart").val($("#rqStart1").val());
    $("#rqEnd").val($("#rqEnd1").val());
    initPage();
    $("#datePage").hide();
    odlxxdate = '';
}
function showDatePage(){
    $("#datePage").show();
}
//取消按自定义时间查询
function doCancleDatePage(){
    $("#datePage").hide();
    $("#datetitle").html(oldDateHtml);
}
function initDatePage(){
    var rqChange_start1 = false;
    var rqStr_start1 = "";
    $("#rqStart1").calendar({
        onOpen: function() {
            if (rqChange_start1) {
                rqStr_start1 = "";
                rqChange_start1 = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_start1 = true;
            rqStr_start1 = values;
        },
        onClose: function() {
            if (rqChange_start1) {
                $("#rqStart1").val(rqStr_start1);
            } else {
                $("#rqStart1").val("");
                rqStr_start1 = "";
            }
            rqChange_start1 = false;
        }
    });

    var rqChange_end1 = false;
    var rqStr_end1 = "";
    $("#rqEnd1").calendar({
        onOpen: function() {
            if (rqChange_end1) {
                rqStr_end1 = "";
                rqChange_end1 = false;
            }
        },
        onChange: function(p, values, displayValues) {
            rqChange_end1 = true;
            rqStr_end1 = values;
        },
        onClose: function() {
            if (rqChange_end1) {
                $("#rqEnd1").val(rqStr_end1);
            } else {
                $("#rqEnd1").val("");
                rqStr_end1 = "";
            }
            rqChange_end1 = false;
        }
    });


}

function doUpdateStauts(id,status){
   var url = requestPath + "/m/mboptApply/update.htm";
    var dataMap = {};
    var msg="确定通过此申请吗？";
    if(status==4){
      dataMap.status = 4;
      msg="确定驳回此申请吗？"

    }
    dataMap.pkid=id;

  confirmMsg(msg, function() {
    $.ajaxjsonp(url, dataMap, function(data) {

        },false,function(){
          initPage();
    });
  });
   
}