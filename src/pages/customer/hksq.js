$(function() {
    var hthm = $("#hthm").val();
    if (isNull(hthm)) {
        showMessage("参数错误，订单号为空");
        return false;
    }
    queryData();
});

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

function queryData() {
    var url = requestPath + "/m/hkqd/index.htm";
    var dataMap = {};
    dataMap.hthm = $("#hthm").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
console.info(d);
        $("#main").html(template('main_page', d));
        var amt = d.jkqd.amt;
        if(!isNull(d.jkqd.amt1)){
            amt = accSubtr(amt, d.jkqd.amt1, 2)
        }
        $("#totalAmt").html("￥"+parseFloat(amt).toFixed(2));  
        $("#realAmt").html("￥"+parseFloat(amt).toFixed(2));

        if(!checkTime("08:00", "17:00")){//判断是否是在工作时间内发货
            $("#doSave").css("background","#a2a0a0");
        }  
        //还有内勤那边未审核完成的发货单时, 不允许重新发货
        if(d.unFinishFlag==1){
            showMessage("你的上次发货申请单还在审核中, 请勿再发货!");
            $("#doSave").css("background","#a2a0a0");
        }   
    });
}



var saveFlag = false;

function doSave() {
    if (saveFlag) {
        return false;
    }
    if(!checkValue()){
        return false;
    }
    if(!checkTime("08:00", "17:00")){//判断是否是在工作时间内发货
        //return false;
    }  
    confirmMsg("您是否确认进行发货申请", function(){
        var url = requestPath + "/m/hkqd/save.htm";
        var dataMap = getDataMap();
        saveFlag = true;
        $.ajaxjsonp(url, dataMap, function(data) {
            showOk("发货申请成功", function(){
                openPage("订单预审", "../customer/myJkqdList.html", "1");
            });
        }, false, function() {
            saveFlag = false;
        });
    });    
}

function checkValue() {
    if ($(".wx_tasdelist .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    
    /*var realAmt = $("#realAmt").val(); //本次实际付款金额
    var totalAmt = $("#totalAmt").html();//本次最低付款金额
    totalAmt = totalAmt.replace(/￥/, "");
    if(isNull(realAmt)){
        showMessage("实际付款金额不能为空");
        $("#realAmt").val(0);
        return false;
    }else if(parseFloat(realAmt)<parseFloat(totalAmt)){
        showMessage("实际付款金额不能小于本次需付金额");
        return false;
    }*/

    var num = $(".wx_tasdelist .current").size();
    if (num > 1) {
        showMessage("对不起, 目前只支持选择单个资源!");
        return false;
    }
    return true;
}

function checkTime(beginTime, endTime){
  var strb = beginTime.split (":");
  if (strb.length != 2) {
    return false;
  }
 
  var stre = endTime.split (":");
  if (stre.length != 2) {
    return false;
  }
 
  var b = new Date ();
  var e = new Date ();
  var n = new Date ();
 
  b.setHours (strb[0]);
  b.setMinutes (strb[1]);
  e.setHours (stre[0]);
  e.setMinutes (stre[1]);

  if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
    return true;
  } else {
    showMessage("当前不在发货时间段.发货时间是8:00-17:00");
  }
}

function getDataMap() {
    var dataMap = {};
    dataMap.hthm = $("#hthm").val();
    dataMap.jkhm = $("#jkhm").val();
    var realAmt = $("#realAmt").html(); //本次实际付款金额
    realAmt = realAmt.replace(/￥/, "");
    dataMap.amt = realAmt; //本次实际付款金额
    dataMap.jsonstring = getJsonString();
    return dataMap;
}
function getJsonString() {
    var jsons = [];
    $(".wx_tasdelist .current").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.htxh = id;
        json.sl01 = $("#sl01_" + id).val();
        json.sl02 = $("#sl02_" + id).val();
        json.price = $("#rzprice_" + id).val();
        jsons[jsons.length] = json;
    });
    return JSON.stringify(jsons);
}

function doCheck(pkid) {
    if ($("#" + pkid).hasClass("current")) {
        $("#" + pkid).removeClass("current");
    } else {
        $("#" + pkid).addClass("current");
    }

    // 计算合计数
    totalAmt();


}



function totalAmt() {
    //本次还款金额
    var totalAmt = 0;
    //本次提的货物总金额
    var goodsAmt = 0;

    // 计算保证金
    var jkamt3 = $("#jkamt3").val(); // 订单总金额
    var jkamt = $("#jkamt").val(); // 借款金额
    var zdbzj = $("#brateAmt").val(); // 最低保证金金额
    var yhamt = $("#yhamt").val(); // 已还金额(不含保证金)
    var amt4 = $("#amt4").val(); // 已还金额(含保证金)
    var ythamt = $("#ythamt").val(); //已提货金额
    var hkamt1 = $("#hkamt1").val(); //利息
    if(isNull(yhamt)){
        yhamt = "0";
    }

    var bzj = 0; //本次交易使用的保证金

    // 本次还款前 计算剩余未还金额
    var whamt = accSubtr(parseFloat(jkamt), parseFloat(yhamt));
    whamt = accAdd(parseFloat(whamt), parseFloat(hkamt1));

    $(".wx_tasdelist .current").each(function() {

        var pkid = $(this).attr("id");

        var sl02 = $("#sl02_" + pkid).val();
        var price = $("#price_" + pkid).html();

        if (!isNull(sl02)) {
            goodsAmt = accAdd(parseFloat(goodsAmt), parseFloat(sl02) * parseFloat(price)); 
        }
    });
        console.info("未还金额: "+whamt+"  提货金额: "+goodsAmt);
    if(parseFloat(whamt)<=parseFloat(goodsAmt)){
        console.info("本次提货金额大于或等于未还金额时,还款金额=未还金额");
        totalAmt = whamt;

        console.info("本次使用保证金=提货金额-未还金额");
        var weih = accSubtr(parseFloat(whamt), parseFloat(hkamt1));
        bzj = accSubtr(parseFloat(goodsAmt), parseFloat(weih), 2);
    }else{
        console.info("本次提货金额小于未还金额时:");
        console.info("本次实际还款金额=提货金额-(已付金额-最低保证金-实际已提货金额)");
        totalAmt = accSubtr(parseFloat(amt4) , parseFloat(zdbzj)); 
        totalAmt = accSubtr(parseFloat(totalAmt), parseFloat(ythamt));

        bzj = totalAmt;//本次使用保证金
        totalAmt = accSubtr(parseFloat(goodsAmt), parseFloat(totalAmt));
        totalAmt = accAdd(parseFloat(totalAmt), parseFloat(hkamt1));
    }  

    $("#goodsAmt").html("￥"+parseFloat(goodsAmt).toFixed(2));
    if(parseFloat(totalAmt)<0){
        $("#totalAmt").html("￥0");//需付金额为负数时,让其等于0
        $("#realAmt").html("￥0");//默认实付金额=需付金额
    }else{
        console.info("totalAmt:"+totalAmt);   
        $("#totalAmt").html("￥"+parseFloat(totalAmt).toFixed(2));
        $("#realAmt").html("￥"+parseFloat(totalAmt).toFixed(2));//默认实付金额=需付金额
    }
    
    $("#bzj").html("￥"+bzj);
    $("#bzjAmt").val(parseFloat(bzj).toFixed(2));
}

// 修改重量
function changeSl2(pkid) {
    
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        $("#" + pkid).addClass("current");
    }
    // 判断下值
    if (!checkNumber("sl02_" + pkid, 3, "重量")) {
        $("#sl02_" + pkid).val(0);
        return false;
    }
      var rzsl2 = $("#rzsl2_" + pkid).val();
      var sl02 = $("#sl02_" + pkid).val();
     
     if(sl02-rzsl2>0){
         $("#sl02_" + pkid).val(rzsl2);
     }
    
    //
    totalAmt();
   
}

// 修改数量
function changeSl1(pkid) {
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        $("#" + pkid).addClass("current");            
    }
    // 根据数量计算出重量
    var sl01 = $("#sl01_"+pkid).val();
    if(sl01.length > 0){
        if (!checkNumber("sl01_" + pkid, 0, "箱包数")) {
             $("#sl01_"+pkid).val(0);
            return false;
        }
      var rzsl1 = $("#rzsl1_" + pkid).val();
      var rzsl2 = $("#rzsl2_" + pkid).val();
      var sl01 = $("#sl01_" + pkid).val();
      var packet_ = $("#packstr_"+ pkid).html();

     if(sl01-rzsl1>0){
         $("#sl01_" + pkid).val(rzsl1);
     }
     if (!isNull(packet_)) {
            var sl02 = accMul(sl01, packet_);
            if(sl02-rzsl2>0){
                $("#sl02_" + pkid).val(rzsl2);
            }else{
                $("#sl02_" + pkid).val(sl02);
            }  
        } 
              
    }  
        
    // 统计总重量
   totalAmt();
         
    
}
