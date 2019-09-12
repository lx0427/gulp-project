$(function() {
    initPage();
    $(".rule_close").click(function() {
        $(".rule").hide();
    });

    var url = window.location.href;
    scanRecord(96,0,'',url,'限时竞拍');
});


function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var interval;
var bond="";

var  title="";
var  content="";
var  wxUrl=""; // 取当前页面地址    
var  imageUrl="";
function queryData() {
    var url = requestPath + "/m/auction/auctionThirdList.htm";
    var dataMap = {};

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);    
        // console.log(d);  
        if(null!=d.data && d.data.length>0){
            $("#list").append(template('auction_page', d)); 
        		if(d.flag03==1){
        		showRule11();
            }

    		if(null!=data.bond&&data.bond.status == 120){
            showRule15();
            }
            

    		bond=d.bond;
            clearInterval(interval);             
            interval = setInterval(countdown, 1000);
      

        //配置分享链接

	
		  title=d.data[0].auctionName;
          content=d.data[0].shareContent;
          wxUrl = location.href; // 取当前页面地址    
          imageUrl=filePath+d.data[0].shareImg;
          shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);
		}else{
       $("#list").html("<div style='text-align: center; margin-top: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
        
    }

    }, true);
}

function showrule2(remark) {
    $("#rulename").html("竞价规则");
    $("#exDiscountRulesList").html(remark);
    $(".rule").show();
}


function countdown() {

    $(".time").each(function(){
        var id = $(this).attr("id");
        var time = $(this).val();
        time = time - 1000;
        if(time < 0 ){
          initPage();
            // 获取下结束时间
          /**   var endMs = $("#endMs_"+id).val();
            if(!isNull(endMs) && endMs > 0){
              initPage();
                // 未开始转为开始
                time = endMs;
                $("#endMs_"+id).remove();
                $("#title_"+id).text("结束倒计时");
                $("#btn_"+id).text("出价");
                $("#btn_"+id).css("background","#f91033");
                var pid = $(this).attr("pid");
                $("#btn_"+id).attr("onclick","doAuction('"+pid+"','"+id+"')");
            }else{
              initPage();
                // 已结束
                $("#title_"+id).html("&nbsp;");
                $("#btn_"+id).text("已结束");
                $("#btn_"+id).css("background","#a2a0a0");
                $("#btn_"+id).attr("onclick","javascript:;");
                $("#time_"+id).remove();
                $(this).remove();
                console.log('执行了按钮变为结束的方法');
                return;
            }    */         
        }
        $(this).val(time);
        $("#time_"+id).text(getTimeStr(time));
    });
  
   
}


var auctionFlag = false;

function doAuction(auctionId, auctionmxId,flag01,flag03) { 
    if (auctionFlag) {
        return false;
    }
    

    var url = requestPath + "/m/auction/participate.htm";
    var dataMap = {};
    dataMap.auctionId = auctionId;
    dataMap.auctionmxId = auctionmxId;
    dataMap.supplier = 2; //供货商是第三方企业
    auctionFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {  
	  if(flag03=="1"){
	   if(""==bond || null==bond){
	   showRule11();
        return false;
	   }else{
	
	   if(bond.status==10){
	   showMessage("您的竞拍资格未生效，请及时将5000元汇入恒逸石化销售公司账户");
	   return false;
	   }
       if(bond.status==120){
       showMessage("很抱歉，您的申请未通过；原因：没有缴纳保证金");
       return false;
       }
	}
		}
 

    // 到竞拍详情页面
        openPage("竞拍详情", "../customer/auctionInfo.html?auctionId=" + auctionId + "&auctionmxId=" + auctionmxId + "&flag01=" + flag01, "1");


    }, false, function() {
        auctionFlag = false;        
    });

}

function showRule11() {
	 $(".rule11").show();
	 $(".rule22").hide();
     $(".rule15").hide();
}
function showRule22() {
	 $(".rule11").hide();
	 $(".rule22").show();
      $(".rule15").hide();
}
function showRule15(){
     $(".rule15").show();
     $(".rule11").hide();
    $(".rule22").hide();
}



function doCancel() {
	$(".rule11").hide();
    $(".rule22").hide();
    $(".rule15").hide();
}


function doOk() {
       var dataMap = {};
       var url = requestPath + "/m/auction/bonding.htm";
        $.ajaxjsonp(url, dataMap, function(data) {
           showMessage("申请成功");
		   initPage();
         });

      $(".rule22").hide();
      $(".rule15").hide();
      $(".rule11").hide();
}


function shareAppMessage () {
	var url = window.location.href;
    scanRecord(96,2,'',url,'竞拍分享');
}

function shareTimeline () {
  
}
function shareQQ () {
  
}

function toEnroll(link){
  if (isNull(link)) {
    showMessage('报名未开始');
    return;
  }
  openPage('竞拍报名',link,1);
} 
