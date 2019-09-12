
  $(function() {
    initPage();

    $("#form").bind("submit", function() {
        initPage();
        return false;
    });



});
function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();  
}

function queryData() {
     var url = requestPath + "/m/menberManager/list.htm";
    var userid = $("#userid").val();
    var dataMap = getDataMap();
    dataMap.repid = userid;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if((!isNull(dataMap.action) && dataMap.action == 0) || isNull(dataMap.action)){
         $("#list").append(template('list_page', d)); 
        }else{    
        $("#list").append(template('fenpei', d));
        }
        setTimeout(function(){
		    	execI18n();
		    },500);
    }, true);
    
}

function getDataMap() {
    var dataMap = {};
	var repid = $("#userid").val(); //接受的话，接收人是业务员自己
    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
 if(!isNull($("#action").val())){
      dataMap.action = $("#action").val();
    }
    return dataMap;
}

function jieshou(sendid){	
var url = requestPath + "/m/menberManager/action.htm";
	var repid = $("#userid").val();
    var dataMap = {"repid":repid,"sendid":sendid,"action":3};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showMessage("接收成功");
        initPage();
        setTimeout(function(){
		    	execI18n();
		    },500);
    }, true);
}

function jujue(sendid){

var url = requestPath + "/m/menberManager/action.htm";
	var jjly = $("#jjly"+sendid).val();
	if(isNull(jjly)){
      showMessage("拒绝理由不能为空");
      return;
    }
    var dataMap = {"jjly":jjly,"sendid":sendid,"action":4};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
         showMessage("操作成功");
        initPage()
        setTimeout(function(){
		    	execI18n();
		    },500);
    }, true);

}

function setaction(action,id){
   $("#action").val(action);
   initPage();
   $("#a").removeClass("current");
   $("#b").removeClass("current");
   $("#c").removeClass("current");
   $("#"+id).addClass("current");

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

function dakaifp(sendid){
  $("#"+sendid).toggle();
  $("#allot"+sendid).hide();
}

function quxiao(sendid){
  $("#allot"+sendid).toggle();
  $("#"+sendid).hide();
}




















$(".wx_allot .allotbtn").click(function(){
      $(this).parent().parent().parent().parent().parent().find(".box").hide();
      $(this).parent().parent().parent().parent().parent().find(".allot").show();
  });
  $(".wx_allot .noallotbtn").click(function(){
      $(this).parent().parent().parent().parent().parent().find(".box").hide();
      $(this).parent().parent().parent().parent().parent().find(".noallot").show();
  });