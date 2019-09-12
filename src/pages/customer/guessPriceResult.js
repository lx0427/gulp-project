$(function() {
    var clientRequest = getRequest();
    var activityId = clientRequest["activityId"];
    
    if (isNull(activityId)) {
        showMessage("参数错误");
        return false;
    }
    queryData(activityId);
});

function queryData(activityId) {
    var url = requestPath + "/m/guessPrice/myGuessDetail.htm";
    var dataMap = {};
    dataMap.pkid = Number(activityId); 
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        console.info(d);
        if(d.groupList != null && d.groupList.length>0){
            $("#list").html(template('list_page', d));   
        }

        if(!isNull(d.data)){
            flag2 = d.data.flag2;
            $("#flag2").html(flag2);   
            $("#effectProud").html(d.data.startDate.substring(0,10)+" "+d.data.startTime.substring(11,19)+"-"+d.data.endTime.substring(11,19));
            if(d.data.status==3 && d.data.guessSuccessNum!=null && d.data.guessSuccessNum>0){
                $("#guessResult").html("恭喜你！预测成功<b class='fs18 cda0404'>"+d.data.guessSuccessNum+"</b>个");
            }
            if(d.data.status==3 && d.data.guessSuccessNum!=null && d.data.guessSuccessNum==0){
                $("#guessResult").html("很遗憾！预测成功<b class='fs18 cda0404'>0</b>个");
            }
            if(d.data.status==2){
                $("#guessResult").html("活动进行中, 请耐心等待!");
            }
        }
        

    },true);
}

var pm = 'POY';
var flag2=0;

//讨论区
function toDiscuss(){
    var activityId = $("#activityId").val();
    openPage("讨论区", "../customer/guessPriceDiscuss.html?pm="+pm+"&activityId="+activityId+"&flag2="+flag2, "1");
}


function toPmArea(pm1){
	pm = pm1;
    $(".tabnav li").each(function(){
        $(this).removeClass("on");
        var id = $(this).attr("id");
        $("#ul_"+id).hide();
    });
    
    var pmStr = "";
    if(pm1=='POY'){
    	pmStr='poy';
    }
    if(pm1=='DTY'){
    	pmStr='dty';
    }
    if(pm1=='FDY'){
    	pmStr='fdy';
    }
    if(pm1=='切片'){
    	pmStr='qp';
    }
    $("#ul_"+pmStr).show();
    $("#"+pmStr).addClass("on");
}

//我要出价
function toGuess(parentId, activityId){
    $("#parentId").val(parentId);
    $("#activityId").val(activityId);
    $(".rule22").show();
}

//取消保存
function doCancel() {
    $("#parentId").val("");
    $("#activityId").val("");
    $(".rule22").hide();
}

//保存出价
var recordFlag = false;
function doOk() {
   $(".rule22").hide();
   var price = $("#price").val();  
   if(!checkNumber("price", 2 , "预测价格")){
        return false;
    }
    if(recordFlag){
        return false;
    }
    recordFlag=true;
   var url = requestPath + "/m/guessPrice/saveRecord.htm";
   var dataMap = {};
   dataMap.parentId =  $("#parentId").val();
   
   var activityId = $("#activityId").val();
   dataMap.activityId =  $("#activityId").val();
   dataMap.price = price;
   $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);        
       console.info(d);
       recordFlag = false;
       queryData(activityId);
   });
}

function toActivityIndex(){
    openPage("活动首页", "../customer/guessPriceIndex.html", "1");
}