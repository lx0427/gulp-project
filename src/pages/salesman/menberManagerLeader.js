    
  

  $(function() {
    initPage();
    $("#form").bind("submit", function() {
        initPage();
        return false;
    });
  // $(".cont").click(function(){
  //         alert(1);
  //     });
  // $(".allotbtn").click(function(){
  //     $(this).parent().parent().parent().parent().parent().find(".box").hide();
  //     $(this).parent().parent().parent().parent().parent().find(".allot").show();
  //     });
  //     $(".noallotbtn").click(function(){
  //         $(this).parent().parent().parent().parent().parent().find(".box").hide();
  //         $(this).parent().parent().parent().parent().parent().find(".noallot").show();
  //     });
  //     $(".cancel").click(function(){
  //     $(this).parent().parent().parent().find(".box").hide();
  //     });

});
function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();  
 
}
// function onclicka(){
//   alert(1);
// }
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

    if (!isNull($("#querykey").val())) {
        dataMap.querykey = $("#querykey").val();
    }
    if(!isNull($("#action").val())){
      dataMap.action = $("#action").val();
    }
    return dataMap;
}

function fenpei(sendid){

var url = requestPath + "/m/menberManager/action.htm";
	var repid = $("#repid").val();

    if(isNull(repid)){
      showMessage("接收人不能为空");
      return;
    }
    var dataMap = {"repid":repid,"sendid":sendid,"action":1};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showMessage("分配成功");
        initPage()
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
    var dataMap = {"jjly":jjly,"sendid":sendid,"action":2};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        showMessage("操作成功");
        initPage()
        setTimeout(function(){
		    	execI18n();
		    },500);
    }, true);

}
function chooseRep(){
	$("#repid").val($("#rep").val());
}
function setaction(action,id){
   $("#action").val(action);
   initPage();
   $("#1").removeClass("current");
   $("#2").removeClass("current");
   $("#3").removeClass("current");
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
  $("#"+sendid+"2").show();
  $("#"+sendid+"3").hide();
}

function dakaibfp(sendid){
 $("#"+sendid+"2").hide();
  $("#"+sendid+"3").show();
}
function guanbi(sendid){
 $("#"+sendid+"2").hide();
  $("#"+sendid+"3").hide();
}


