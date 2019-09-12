$(function() {
    var clientRequest = getRequest();
    var activityId = clientRequest["activityId"];
    pm = clientRequest["pm"];
    if (isNull(activityId)) {
        showMessage("本周暂无猜价活动,无法参与讨论!");
        return false;
    }

    queryData();
});

var pm = "";
var firstFlag = true;
var firstPage = false;
var newMessage = 0;

function queryData() {
    var url = requestPath + "/m/guessPriceDiscuss/getDiscussList.htm";
    var dataMap = {};
    dataMap.activityId = $("#activityId").val();
    dataMap.str01 = pm;
    if(firstFlag){
        dataMap.firstFlag=1;
    }
    if(firstPage){
        dataMap.pageNumber=1;
    }
    dataMap.newMessage = newMessage;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);        
        console.info(d);
        if(d.groupList!=null){
            $("#productList").append(template('productList_page', d));
            firstFlag = false;   
        }
        if(d.data!=null && isNull(pm)){
            $("#list").append(template('list_page', d));   
        }
        if(d.data!=null && pm=='POY'){
            $("#list_poy").append(template('list_poy_page', d));   
        }
        if(d.data!=null && pm=='DTY'){
            $("#list_dty").append(template('list_dty_page', d));   
        }

        if(d.data!=null && pm=='FDY'){
            $("#list_fdy").append(template('list_fdy_page', d));   
        }
        if(d.data!=null && pm=='切片'){
            $("#list_qp").append(template('list_qp_page', d));   
        }
        if(d.messageNum!=null && d.messageNum>0){
            $(".tabnew").show();
			$("#messageNum").html(d.messageNum+"条新消息");
        }else{
        	$(".tabnew").hide();
        }

		//上面猜价物料部分
        $(".tabnav li").each(function(){
            $(this).removeClass("on");
            var id = $(this).attr("id");
        	$("#ul_"+id).hide();
        });
        var pmStr = "";
        if(isNull(pm)){
        	pmStr = "all";
        }else if(pm=='切片'){
            pmStr='qp';
        }
        else if(pm=='POY'){
        	pmStr = 'poy';
        }
        else if(pm=='DTY'){
        	pmStr = 'dty';
        }
        else if(pm=='FDY'){
        	pmStr = 'fdy';
        }
        $("#ul_"+pmStr).show();
        $("#"+pmStr).addClass("on");
        
        
        //点赞,取消点赞
		var zanFalg = false;
		$(".zan").bind("click",function(){
			var idstr = $(this).attr("id");
			console.info(idstr);
			if(!isNull(idstr)){
				var ids = idstr.split("_");
				if(!isNull(ids) && ids.length==3){
					var num = ids[0];
					var pkid = ids[1];
					var ifalg = ids[2];
					toCollect(pkid, ifalg);
					if(ifalg==1){
						num = parseInt(num) - 1;
					   	$(this).attr("id", num+"_"+pkid+"_0");
					   	$(this).html("<i class='iconfont icon-aixin-xian'></i>"+num);
				    }else{
				    	num = parseInt(num) + 1;
					   	$(this).attr("id", num+"_"+pkid+"_1");
					   	$(this).html("<i class='iconfont icon-aixin-shi'></i>"+num);
				   }
				}
			}
			
		});
		
    },true);
}


function toActivityIndex(){
    openPage("活动首页", "../customer/guessPriceIndex.html", "1");
}

function toPmArea(pm1){
	pm = pm1;
    $(".tabnav li").each(function(){
        $(this).removeClass("on");
        var id = $(this).attr("id");
        $("#ul_"+id).hide();
    });
	var pmStr = "";
    if(isNull(pm1)){
    	all="all";
       $("#list").show();
       $("#list_poy").hide();
       $("#list_poy").html("");
       $("#list_dty").hide();
       $("#list_dty").html("");
       $("#list_fdy").hide();
       $("#list_fdy").html("");
       $("#list_qp").hide();
       $("#list_qp").html("");
    }else if(pm1=='切片'){
    	pmStr="qp";
       $("#list").hide();
       $("#list_poy").hide();
       $("#list_dty").hide();
       $("#list_fdy").hide();
       $("#list_qp").show();
       $("#list").html("");
       $("#list_poy").html("");
       $("#list_dty").html("");
       $("#list_fdy").html("");
    }
    else if(pm1=="POY"){
      pmStr="poy";
      $("#list").hide();
      $("#list_dty").hide();
      $("#list_fdy").hide();
      $("#list_qp").hide();
      $("#list").html("");
      $("#list_fdy").html("");
      $("#list_dty").html("");
      $("#list_qp").html("");
      $("#list_poy").show();
    }else if(pm1=="DTY"){
      pmStr="dty";
      $("#list").hide();
      $("#list_poy").hide();
      $("#list_fdy").hide();
      $("#list_qp").hide();
      $("#list").html("");
      $("#list_poy").html("");
      $("#list_fdy").html("");
      $("#list_qp").html("");
      $("#list_dty").show();
    }else if(pm1=="FDY"){
      pmStr="fdy";
      $("#list").hide();
      $("#list_poy").hide();
      $("#list_dty").hide();
      $("#list_qp").hide();
      $("#list").html("");
      $("#list_poy").html("");
      $("#list_dty").html("");
      $("#list_qp").html("");
      $("#list_fdy").show();
    }

    $("#ul_"+pmStr).show();
    $("#"+pmStr).addClass("on");
    
    firstPage = true;
    queryData();
}

//取消回复
function replyCancel(discussid){
    if(isNull(discussid)){
        $("#content").val("");
    }else{
        $("#content_"+discussid).val("");
        $("#id_"+discussid).hide();
    }
}

//评论回复
var editFlag = false;
function doReply(discussid){
    if (!checkValue(discussid)) {
        return false;
    }
    if (editFlag) {
        return false;
    }

   var url = requestPath + "/m/guessPriceDiscuss/save.htm";
   var dataMap = {};
   dataMap.activityId = $("#activityId").val();
   dataMap.str01 = pm;
   dataMap.flag02 = $("#flag2").val();
   if(!isNull(discussid)){
    dataMap.content = $("#content_"+discussid).val();
    dataMap.parentid = discussid;//回复
    dataMap.discussType = 2;
   }else{
    dataMap.content = $("#content").val();
    dataMap.discussType = 1;//发表
   }

   editFlag = true;
   $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);  
       firstPage = true;
       editFlag = false;

       if(isNull(pm)){
        $("#list").html("");
       }else if(pm == '切片'){
        $("#list_qp").html("");
       }else{
        $("#list_"+pm).html("");
       }
       console.info("回复pm: "+pm);
       queryData();
   });
}

function checkValue(discussid){
    var content = "";
    if(!isNull(discussid)){
        content = $("#content_"+discussid).val();
    }else{
        content = $("#content").val();
    }
    if(isNull(content)){
        showMessage("回复内容不能为空!");
        return false;
    }
    if(content.length>300){
        var len=content.length-300;
        showMessage("回复内容超长,超出了"+len+"个字!");
        return false;
    }

    return true;
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

function toShowReply(id){
    $("#id_"+id).show();
}

function toHideReply(id){
    $("#id_"+id).hide();
}

zanFalg = false;
function toCollect(pkid,flag){
		   var url = requestPath + "/m/guessPriceDiscuss/priseOrCancle.htm";
		   var dataMap = {};
		   dataMap.flag = flag;
		   dataMap.pkid = pkid;
		   if(zanFalg){
		      return false;
		   }
		   zanFalg = true;		   
		   $.ajaxjsonp(url, dataMap, function(data) {
		       var d = eval(data);
		       zanFalg = false;
		   });    
		
		}

function showMyMessage(){
	newMessage = 1;
	firstPage = true;
	$("#list").html(""); 
	queryData();
}
