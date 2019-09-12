$(function() {   
	fcOrderFlag = $("#fcOrderFlag").val();
    queryData();
    setTimeout(function () {
        execI18n();
    },500);
});
var freightflag=true;
function queryData() {
    var url = requestPath + "/m/orderAudit/getOrderAuditView.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#list").html(template('list_page', d));
        $("#couponType").val(d.data.couponType);
        $("#footer").show();

        bindXbjz();

		if (!isNull(d.portList) && d.portList.length > 1) {
            portCredit(d.portList);

        }
		if (!isNull(d.portList) && d.portList.length == 1) {
           portMap[d.portList[0].pkid] = d.portList[0];
        }
		
		if (!isNull(d.paymentTermsList) && d.paymentTermsList.length > 1) {
            paymentTermsCredit(d.paymentTermsList);
        }

		
        if (!isNull(d.data.tradeTerms != null)) {
           
		if(d.data.tradeTerms =='CIF'){
		  freightflag=true;
		}		
				
        // 贸易条件
        $("#myFlag em").bind("click", function() {
            $("#myFlag em").removeClass("current");
            $(this).addClass("current");
			if($(this).attr("value") == "CIF"){
               freightflag=true;
            }
			if($(this).attr("value") == "FOB"){
               freightflag=false;
            }
			//changePortShop();
        });

        // 贸易条件
        $("#commissionFlag em").bind("click", function() {
            $("#commissionFlag em").removeClass("current");
            $(this).addClass("current");
			if($(this).attr("value") == "1"){
               
            }
			if($(this).attr("value") == "2"){
             
            }
			//changePortShop();
        });

        
        }


		



        var pm = $("#pm").val();
        if(!isNull(pm) && pm === "POY"){
            // 车丝处理
            $(".csselect em").bind("click", function() {
                var id = $(this).parent().attr("id");
                $("#" + id + " em").removeClass("curr");
                $(this).addClass("curr");
            });
        }

        //昨天的时间
        var day1 = new Date();
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);

        // 要货日期
        $("#date10Str").calendar({
            toolbarCloseText: "",
            minDate: day1
        });

        // 规格改变后方法
        $(".gg").each(function() {
            $(this).bind("change", function() {
                var id = $(this).attr("id").substring(3);
                $("#cz_" + id).val("");
                $("#cd_" + id).val("");
                $("#str02_" + id + " em").removeClass("curr");
                $("#str02_" + id).hide();
            });
        });

        // 批号修改
        $(".cz").each(function() {
            $(this).bind("change", function() {
                var id = $(this).attr("id").substring(3);
                $("#cd_" + id).val("");
                $("#str02_" + id + " em").removeClass("curr");
                $("#str02_" + id).hide();
            });
        });

        // 批号修改
        $(".cd").each(function() {
            $(this).bind("change", function() {
                var id = $(this).attr("id").substring(3);
                getHangsource(id);
            });
        });
        
        var cleckLis = $(".isChecked");
				var liBlock = true;
                var qpBlock = true;//判断物资是否都为锦纶切片
				for (var i=0;i<cleckLis.length;i++) {
					var liId = $(cleckLis[i]).attr("checkid");
					var liPm = $("#pm_" + liId).val();
					if (liPm != '短纤' && liPm != '锦纶切片') {
                        liBlock = false;
                        qpBlock = false;
                        break;
                    }else if (liPm != '短纤') {
                        liBlock = false;
                    }else if (liPm != '锦纶切片') {
                        qpBlock = false;
                    }
				}
				
				if (liBlock) {
					$("#dxLump").css("display","block");
					$("#dx").css("display","block");
					$("#jlqp").css("display","none"); 
				}else if(qpBlock ) {
					$("#dxLump").css("display","block");
					$("#dx").css("display","none");
                    $("#jlqp").css("display","block");    
                }else{
                    $("#dxLump").css("display","none");
                    $("#dx").css("display","none");
                    $("#jlqp").css("display","none"); 
                }

    }, false);
}

function bindXbjz(){
    // 箱包净重
    $(".xbjzselect .xbjz").bind("click", function() {
        var id = $(this).parent().attr("id");
        $("#" + id + " em").removeClass("curr");
        $(this).addClass("curr");
        changeSl1(id.substring(8));
    });
}

var getHangsourceFlag = false;
function getHangsource(pkid) {
    if(getHangsourceFlag){
        return;
    }
    var dataMap = {};
    var pm = $("#pm_" + pkid).val();
    if (isNull(pm)) {
        showMessage($.i18n.prop('com_pmtip'), "pm");
        return false;
    }
    dataMap.pm = pm;

    var gg = $("#gg_" + pkid).val();
    if (isNull(gg)) {
        showMessage($.i18n.prop('com_ggtip'), "gg");
        return false;
    }
    dataMap.gg = gg;

    var cz = $("#cz_" + pkid).val();
    if (isNull(cz)) {
        showMessage($.i18n.prop('com_phtip'), "cz");
        return false;
    }
    dataMap.cz = cz;

    var cd = $("#cd_" + pkid).val();
    if (isNull(cd)) {
        showMessage($.i18n.prop('com_cdtip'), "cz");
        return false;
    }
    dataMap.cd = cd;

	var depid = $("#depid_" + pkid).val();
    if (!isNull(depid)) {
         dataMap.depid = depid;
    }
  
    var url = requestPath + "/m/resource/getHangsource.htm";
    getHangsourceFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        var tradeTerms = $("#myFlag .current").attr("value");
	    if (isNull(tradeTerms)){
		//处理价格
        $("#price_" + pkid).attr("value",d.data.price00);
        $("#price_a_" + pkid + " em").html($("#price_" + pkid).val());
		}
		else{
        var portCode = $("#portCode").val();
        var port = portMap[portCode];
	    $("#freightAmt").val(port.carriage);
         console.log(freightflag);
        if(freightflag){
		    var price=accAdd(d.data.price00,parseFloat(port.carriage) * parseFloat(1.03));
		    $("#price_" + pkid).attr("value",price);
		}else{
			$("#price_" + pkid).attr("value",d.data.price00);
		}
	     $("#price_a_" + pkid + " em").html($("#price_" + pkid).val());
		}
         

        
        // 处理车丝
        if(d.str02Flag){
            $("#str02_" + pkid).show();
        }else{
            $("#str02_" + pkid).hide();
            $("#str02_" + pkid + " em").removeClass("curr");
        }

        // 处理箱包净重
        var html = "";
        if(!isNull(d.packstrList)){
            for(var i = 0; i<d.packstrList.length; i++){
                if(i == 0){
                    html += "<em class='xbjz curr' val='"+d.packstrList[i]+"'>"+d.packstrList[i]+d.data.sldw2+"</em>";
                }else{
                    html += "<em class='xbjz' val='"+d.packstrList[i]+"'>"+d.packstrList[i]+d.data.sldw2+"</em>";
                }                    
            }
        }else{
            if(isNull(d.data.packstr)){
                html += "<em class='xbjz curr' val=''>不定重</em>";
            }else{
                html += "<em class='xbjz curr' val='"+d.data.packstr+"'>"+d.data.packstr+d.data.sldw2+"</em>";
            }
        }
        // 先移除掉原来的em
        $("#packstr_"+pkid).find("em").remove(); 
        $("#packstr_"+pkid).append(html);  
        bindXbjz(); 
        changeSl1(pkid);
    }, false, function(){
        getHangsourceFlag = false;
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#fphm").val())) {
        dataMap.fphm = $("#fphm").val();
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

function doCheck(pkid) {
    if ($("#" + pkid).hasClass("current")) {
        $("#" + pkid).removeClass("current");
    } else {
        $("#" + pkid).addClass("current");
    }
    if ($(this).hasClass("current")) {
        $(this).removeClass("current");
    } else {
        $(this).addClass("current");
    }
    
    var cleckLis = $("li[class='current']>div>i");
    
		var liBlock = true;
		for (var i=0;i<cleckLis.length;i++) {
			var liId = $(cleckLis[i]).attr("checkid");
			var liPm = $("#pm_" + liId).val();
			if (liPm != '短纤'  && liPm != '锦纶切片') {
				liBlock = false;
				break;
			}
		}
		
		if (liBlock) {
			$("#dxLump").css("display","block");
		} else {
			$("#dxLump").css("display","none");
		}
}

function doCheckAll(obj) {
    if ($(obj).hasClass("current")) {
        $(obj).removeClass("current");

        $(".wx_tasdelist li").each(function() {
            $(this).removeClass("current");
        });
    } else {
        $(obj).addClass("current");

        $(".wx_tasdelist li").each(function() {
            $(this).addClass("current");
        });
    }
}

function getJsonString() {
    var jsons = [];
    $(".wx_tasdelist .current").each(function() {
        var id = $(this).attr("id");
        var json = {};
        json.fphm = $("#fphm_"+id).val();
        json.htxh = $("#htxh_"+id).val();
        json.gg = $("#gg_" + id).val();
        json.cz = $("#cz_" + id).val();
        json.cd = $("#cd_" + id).val();
        var pm = $("#pm_"+id).val();
        if(pm === "POY"){
            var str02 = $("#str02_" + id + " .curr").attr("val");
            if(!isNull(str02)){
                json.str02 = str02;
            }
        }        
        json.sl2 = $("#sl2_" + id).val();
        json.sl1 = $("#sl1_" + id).val();
        json.remark = $("#remark_" + id).val();
		json.sunshineDiscount = $("#sunshineDiscount_" + id).val();
		json.sunshineRemark = $("#sunshineRemark_" + id).val();
		json.policyPreferences = $("#policyPreferences_" + id).val();
        json.packstr = $("#packstr_" + id + " .curr").attr("val");
        json.date10Str = $("#date10Str").val();
        json.price00 = $("#price_" + id).val();//当前物资的价格
        console.log(json.price00);
        jsons[jsons.length] = json;
    });
    return JSON.stringify(jsons);
}

function checkValue() {
    if ($(".wx_tasdelist .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    
    
    var cleckLis = $("li[class='current']>div>i");
		var liBlock = true;
		for (var i=0;i<cleckLis.length;i++) {
			var liId = $(cleckLis[i]).attr("checkid");
			var liPm = $("#pm_" + liId).val();
			if (liPm != '短纤' && liPm != '锦纶切片') {
				liBlock = false;
				break;
			}
		}
		
		if (liBlock) {
			//判断工厂是否选中
			var gcs = $(".gcs.current");
			if (isNull(gcs) || gcs.length == 0) {
				showToptip("请选择工厂名称");
				return false;
			}
			
			//先判断下级是否隐藏，未隐藏，则必填
			var shengDisplay = $("#sheng_id").css("display");
			if (!isNull(shengDisplay) && shengDisplay == 'block') {
		 			 var provinceVal = $("#provinceVal").val();
		 			 if (isNull(provinceVal)) {
		 			 		showToptip("请选择省");
		 			 		return false;
		 			 }
		  }
		  
		  var shiDisplay = $("#shi_id").css("display");
			if (!isNull(shiDisplay) && shiDisplay == 'block') {
		 			 var cityVal = $("#cityVal").val();
		 			 if (isNull(cityVal)) {
		 			 		showToptip("请选择市");
		 			 		return false;
		 			 }
		  }
		  
		  var townDisplay = $("#town_id").css("display");
			if (!isNull(townDisplay) && townDisplay == 'block') {
		 			 var townVal = $("#townVal").val();
		 			 if (isNull(townVal)) {
		 			 		showToptip("请选择区");
		 			 		return false;
		 			 }
		  }
		  
		  var streetDisplay = $("#street_id").css("display");
			if (!isNull(streetDisplay) && streetDisplay == 'block') {
		 			 var streetVal = $("#streetVal").val();
		 			 if (isNull(streetVal)) {
		 			 		showToptip("请选择镇");
		 			 		return false;
		 			 }
		  } 			
		}

    // couponType=2,3,4时不判断
    var couponType = $("#couponType").val();
    if(!isNull(couponType) && (couponType == 2 || couponType == 3 || couponType == 4)){
        return true;
    }    

    var b = true;
    $(".wx_tasdelist .current").each(function() {
        var id = $(this).attr("id");
        if (!checkNumber("sl2_" + id, 3, "重量")) {
            b = false;
            return false;
        }
        // FDY 和 POY、DTY的A B C等级箱包数 不必选
        var pm = $("#pm_" + id).val();
        var cd = $("#cd_" + id).val();   
        var xbs = $("#packstr_"+id).find("em").html(); 

        if (pm != "FDY" && cd != "A" && cd != "B" && cd != "C" && xbs!="不定重") {
            if (!checkNumber("sl1_" + id, 0, "箱包数")) {
                b = false;
                return false;
            }
        } else {
            // 控制下不能为负数吧
            var sl1 = $("#sl1_" + id).val();
            if (isNull(sl1)) {
                $("#sl1_" + id).val("0");
            }
            if (!isNull(sl1) && parseFloat(sl1) < 0) {
                showToptip("箱包数请输入大于0的数字");
                b = false;
                return false;
            }
        }
         
         var sunshineDiscount = $("#sunshineDiscount_" + id).val();
		 if (!isNull(sunshineDiscount)) {
		 if (!checkNumber("sunshineDiscount_" + id, 2, "阳光折扣")) {
            b = false;
            return false;
         }

		 var sunshineRemark = $("#sunshineRemark_" + id).val();
         if(isNull(sunshineRemark)){
		    showToptip("有阳光折扣时折扣原因必填");
                b = false;
                return false;
		 }

		 }
       

		var policyPreferences = $("#policyPreferences_" + id).val();
		 if (!isNull(policyPreferences)) {
		if (!checkNumber("policyPreferences_" + id, 2, "政策优惠")) {
            b = false;
            return false;
        }
		}
        /*
        var psfs = $("#psfs").val();
        if (psfs == "3") {
            var remark = $("#remark_" + id).val();
            if (isNull(remark)) {
                showToptip("请输入运费金额");
                b = false;
                return false;
            }
        }
        */

    });

    

    if (!b) {
        return false;
    }

    return true;
}

//判断是否是融资订单
var fcOrderFlag = 0;
// 审核通过
var hasClick = true;
function doAgree() {
	    console.log(hasClick);
    if (!checkValue()) {
        return false;
    }
	
    if (!hasClick) {
    	return false;
    }
    
    confirmMsg("您是否确认审核通过？", function() {
        hasClick = false;
        var url = requestPath + "/m/orderAudit/orderAudit.htm";
        var dataMap = {};
        dataMap.fphm = $("#fphm").val();
        dataMap.jsonstring = getJsonString();
         
		 //外贸的字段
         var tradeTerms = $("#myFlag .current").attr("value");
		 if (!isNull(tradeTerms)){
		 dataMap.tradeTerms=tradeTerms;

         var commissionType = $("#commissionFlag .current").attr("value");
		 dataMap.commissionType=commissionType;
		 dataMap.commission= $("#commission").val();


         var paymentTerms = $("#paymentTerms").val();
         dataMap.paymentTerms = paymentTerms;
 
	     var paymentCode = $("#paymentCode").val();
         dataMap.paymentCode = paymentCode;

         var port = $("#port").val();
         dataMap.port = port;
    
	     var freightAmt = $("#freightAmt").val();
         dataMap.freightAmt = freightAmt;
    
	     var portCode = $("#portCode").val();
         dataMap.portCode = portCode;
  
         }
		
        //add by zx start   
        var cleckLis = $("li[class='current']>div>i");
				var liBlock = true;
				for (var i=0;i<cleckLis.length;i++) {
					var liId = $(cleckLis[i]).attr("checkid");
					var liPm = $("#pm_" + liId).val();
					if (liPm != '短纤' && liPm!='锦纶切片') {
						liBlock = false;
						break;
					}
				}
				
				if (liBlock) {
					//判断工厂是否选中
					var gcs = $(".gcs.current");
					dataMap.wbno08 =  gcs.attr("val");
					
					//先判断下级是否隐藏，未隐藏，则必填
					var wbno09 = "";
					var shengDisplay = $(".gcs.current").parent().parent().find("#sheng_id").css("display");
					if (!isNull(shengDisplay) && shengDisplay == 'block') {
				 			 var provinceVal = $(".gcs.current").parent().parent().find("#provinceVal").val();
				 			 wbno09 = wbno09 + provinceVal + ",";
				  }
				  
				  var shiDisplay = $(".gcs.current").parent().parent().find("#shi_id").css("display");
					if (!isNull(shiDisplay) && shiDisplay == 'block') {
				 			 var cityVal = $(".gcs.current").parent().parent().find("#cityVal").val();
				 			 wbno09 = wbno09 + cityVal + ",";
				  }
				  
				  var townDisplay = $(".gcs.current").parent().parent().find("#town_id").css("display");
					if (!isNull(townDisplay) && townDisplay == 'block') {
				 			 var townVal = $(".gcs.current").parent().parent().find("#townVal").val();
				 			 wbno09 = wbno09 + townVal + ",";
				  }
				  
				  var streetDisplay = $(".gcs.current").parent().parent().find("#street_id").css("display");
					if (!isNull(streetDisplay) && streetDisplay == 'block') {
				 			 var streetVal = $(".gcs.current").parent().parent().find("#streetVal").val();
				 			 wbno09 = wbno09 + streetVal + ",";
				  }			  
				  dataMap.wbno09 = wbno09.substring(0,wbno09.length-1);
				  
				  dataMap.wbno10 = $(".gcs.current").parent().parent().find("#fare_price_text").val();
				}	
        //add by zx end 
        $.ajaxjsonp(url, dataMap, function(data) {
            var d = eval(data);
            hasClick = true;
            showOk("审核成功", function() {
            	if(!isNull(fcOrderFlag) && fcOrderFlag==2){
            		openPage("逸信代订单预审", "../salesman/loansOrderList.html", "1");
            	}else{
            		openPage("订单预审", "../salesman/orderAuditList.html", "1");
            	}
            });
		}, false, function() {
			 hasClick = true;
        });
    });
    
    hasClick = true;//请恢复可点击状态啊
}

// 审核拒绝
function doReject() {
    if ($(".wx_tasdelist .current").length === 0) {
        showMessage("请选择资源");
        return false;
    }
    confirmMsg("您是否确认审核拒绝？", function() {
        var url = requestPath + "/m/orderAudit/orderReject.htm";
        var dataMap = {};
        dataMap.fphm = $("#fphm").val();
        dataMap.jsonstring = getJsonString();
        $.ajaxjsonp(url, dataMap, function(data) {
            var d = eval(data);
            showOk("拒绝成功", function() {
                if(!isNull(fcOrderFlag) && fcOrderFlag==2){
            		openPage("逸信代订单预审", "../salesman/loansOrderList.html", "1");
            	}else{
            		openPage("订单预审", "../salesman/orderAuditList.html", "1");
            	}
            });
        });
    });

}

// 修改数量
function changeSl1(pkid) {
    $("#" + pkid).addClass("current");
    var dz = $("#packstr_" + pkid).val();
    if (isNull(dz)) {
        // 切片，锦纶切片
        dz = $("#packstr_" + pkid + " .curr").attr("val");
    }
    var sl1 = $("#sl1_" + pkid).val();
    if (!isNull(dz)) {
        var sl2 = accMul(sl1, dz);
        $("#sl2_" + pkid).val(sl2);
    }
    
    //totalAmt();
}

function showGg(pm, ggId) {
    if (pm === "POY" || pm === "DTY" || pm === "FDY") {
        showGgPopup2ById(ggId);
    } else {
        showGgPopupById(ggId);
    }
}

function showCz(pm, czId) {
    if (pm === "POY" || pm === "DTY" || pm === "FDY") {
        showCzPopup2ById(czId);
    } else {
        showCzPopupById(czId);
    }
}

//点击工厂名称获取与其有关的地区信息，一级级获取，因为可能会出现只选择省的情况
//这个位置后期需要优化，不要每次点击都请求，要缓存到页面里，如果缓存到页面，需要压力测试的，因为nodejs目前是单线程回掉方式请求数据，可能会出现资源共享的情况，这就出问题了！
function lightThis (obj,level) {
	
	var dataMap = {};
	
	if (level == 0) {//根据工厂代码获取省
		$(".gcs").removeClass("current");
		obj.addClass("current");
		var factoryCode = obj.attr("val");
  	dataMap.factoryCode = factoryCode;
  	
  	emptyVal(0);
	}
	
	if (level == 1) {//根据工厂代码省代码获取市
		var factoryCode = $(".gcs.current").attr("val");
		var provinceCode = obj.attr("data-values");
  	dataMap.factoryCode = factoryCode;
  	dataMap.provinceCode = provinceCode;
  	
  	emptyVal(1);
	}
	
	if (level == 2) {//根据工厂代码省代码市代码获取区
		var factoryCode = $(".gcs.current").attr("val");
		dataMap.factoryCode = factoryCode;
        var cityCode = $(".gcs.current").parent().parent().find("#city_text").attr("data-values");
        dataMap.cityCode = cityCode;
        var provinceCode = $(".gcs.current").parent().parent().find("#province_text").attr("data-values");
        dataMap.provinceCode = provinceCode;
		
		emptyVal(2);
	}
	
	if (level == 3) {//根据工厂代码省代码市代码区代码获取镇
		var factoryCode = $(".gcs.current").attr("val");
		dataMap.factoryCode = factoryCode;
        var cityCode = $(".gcs.current").parent().parent().find("#city_text").attr("data-values");
        dataMap.cityCode = cityCode;
        var provinceCode = $(".gcs.current").parent().parent().find("#province_text").attr("data-values");
        dataMap.provinceCode = provinceCode;
        var townCode = $(".gcs.current").parent().parent().find("#town_text").attr("data-values");
        dataMap.townCode = townCode;
		
		emptyVal(3);
	}
	
	if (level == 4) {
		console.log("结束节点");
		return false;
	}
	
	var url = requestPath + "/m/sapFreight/list.htm";
    var cleckLis = $("li[class='current']>div>i");
    
    for (var i=0;i<cleckLis.length;i++) {
        var liId = $(cleckLis[i]).attr("checkid");
        var liPm = $("#pm_" + liId).val();
        if (liPm == '锦纶切片') {
            url = requestPath + "/m/sapFreightChinlon/list.htm";
            break;
        }
    }

  $.ajaxjsonp(url, dataMap, function(data) {
      var d = eval(data);
            
      if (d.data.length != 0) {
      	if (level == 0) {
      		$(".gcs.current").parent().parent().find("#sheng_id").css("display","block");
            
            $(".gcs.current").parent().parent().find("#province_text").select({
			        title: "请选择省份",
			        items: [],
			        onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#provinceVal").val(d.values + "-" + d.titles); 
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("#provinceVal").val("");
                        
			        }
			    });
			    
				    var provinces = [];
			     	for (var i = 0;i < d.data.length; i++ ) {
			     		if (isNull(d.data[i].provinceName) || isNull(d.data[i].provinceCode)) {
			     			continue;
			     		}
			     		var proMap = {};
			     		proMap.title = d.data[i].provinceName;
			     		proMap.value = d.data[i].provinceCode;
			     		provinces.push(proMap);
			     	}
			     	
			     	if (provinces.length == 0) {
			     		$(".gcs.current").parent().parent().find("#sheng_id").css("display","none");
                    }
			     	
			     	$(".gcs.current").parent().parent().find("#shi_id").css("display","none");
                    $(".gcs.current").parent().parent().find("#town_id").css("display","none");
                    $(".gcs.current").parent().parent().find("#street_id").css("display","none");
                    $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
                    
                    $(".gcs.current").parent().parent().find("#province_text").select("update",{
			     		title: "请选择省份",
			     		items:unique(provinces),
			     		onChange: function(d) {
			           $(".gcs.current").parent().parent().find("#provinceVal").val(d.values + "-" + d.titles); 
                       
			           var thisDisplay = $(".gcs.current").parent().parent().find("#sheng_id").css("display");
                                 if (!isNull(thisDisplay) && thisDisplay == 'none') {
								 		getFarePrice();		 
								 } 
								 
								$(".gcs.current").parent().parent().find("#shi_id").css("display","none");
                                $(".gcs.current").parent().parent().find("#town_id").css("display","none");
                                $(".gcs.current").parent().parent().find("#street_id").css("display","none");
                                $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
                    },       
			        onClear: function() {           
			            $(".gcs.current").parent().parent().find("#provinceVal").val("");
                        emptyVal(0);
			        }
			     	});	     	
			     	
      	}
      	if (level == 1) {
      		$(".gcs.current").parent().parent().find("#shi_id").css("display","block");
            
            $(".gcs.current").parent().parent().find("#city_text").select({
                    title: "请选择市",
                    items: [],
                    onChange: function(d) {
                       $(".gcs.current").parent().parent().find("#cityVal").val(d.values + "-" + d.titles);     
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("cityVal").val("");
                        emptyVal(1);
                    }
                });
			    
				    var citys = [];
			     	for (var i = 0;i < d.data.length; i++ ) {
			     		var cityMap = {};
			     		if (isNull(d.data[i].cityName) || isNull(d.data[i].cityCode)) {
			     			continue;
			     		}
			     		cityMap.title = d.data[i].cityName;
			     		cityMap.value = d.data[i].cityCode;
			     		citys.push(cityMap);
			     	}
			     	 
			     	if (citys.length == 0) {
			     		$(".gcs.current").parent().parent().find("#shi_id").css("display","none");
                        getFarePrice();      
                    }
                    
                    $(".gcs.current").parent().parent().find("#town_id").css("display","none");
                    $(".gcs.current").parent().parent().find("#street_id").css("display","none");
                    $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none");
                    
                    $(".gcs.current").parent().parent().find("#city_text").select("update",{
                        title: "请选择市",
                        items:unique(citys),
                    onChange: function(d) {
                       $(".gcs.current").parent().parent().find("#cityVal").val(d.values + "-" + d.titles);     
                       
                       var thisDisplay = $(".gcs.current").parent().parent().find("#shi_id").css("display");
                                 if (!isNull(thisDisplay) && thisDisplay == 'none') {
                                        getFarePrice();      
                                 } 
                                 
                            $(".gcs.current").parent().parent().find("#town_id").css("display","none");
                            $(".gcs.current").parent().parent().find("#street_id").css("display","none");
                            $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("cityVal").val("");
			            emptyVal(1);
			        } 	
			     	});      
		     
      	}
      	
      	if (level == 2) {
      		$(".gcs.current").parent().parent().find("#town_id").css("display","block");
            
            $(".gcs.current").parent().parent().find("#town_text").select({
                    title: "请选择区",
                    items: [],
                    onChange: function(d) {
                       $(".gcs.current").parent().parent().find("#townVal").val(d.values + "-" + d.titles);                            
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("townVal").val("");
                        emptyVal(2);
                    }
                });
			    
				    var towns = [];
		      	for (var i = 0;i < d.data.length; i++ ) {
		      		if (isNull(d.data[i].townName) || isNull(d.data[i].townCode)) {
			     			continue;
			     		}
			     		var townMap = {};
			     		townMap.title = d.data[i].townName;
			     		townMap.value = d.data[i].townCode;
			     		towns.push(townMap);
			     	} 
			     	
			     	if (towns.length == 0) {
			     		$(".gcs.current").parent().parent().find("#town_id").css("display","none");
                        getFarePrice(); 
                    }
                    
                    $(".gcs.current").parent().parent().find("#street_id").css("display","none");
                    $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none"); 
                     
                    $(".gcs.current").parent().parent().find("#town_text").select("update",{
                        title: "请选择区",
                        items:unique(towns),
                    onChange: function(d) {
                        console.log("d: " + JSON.stringify(d));
                       $(".gcs.current").parent().parent().find("#townVal").val(d.values + "-" + d.titles);     
                                 
                                 var thisDisplay = $(".gcs.current").parent().parent().find("#town_id").css("display");
                                 if (!isNull(thisDisplay) && thisDisplay == 'none') {
                                        getFarePrice();      
                                 }
                                 
                                 $(".gcs.current").parent().parent().find("#street_id").css("display","none");   
                                 $(".gcs.current").parent().parent().find("#fare_price_id").css("display","none");     
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("townVal").val("");
			            emptyVal(2);
			        }   	
			     	});      
		      	
      	}
      	
      	if (level == 3) {
      		$(".gcs.current").parent().parent().find("#street_id").css("display","block");
            
            $(".gcs.current").parent().parent().find("#street_text").select({
                    title: "请选择镇",
                    items: [],
                    onChange: function(d) {
                       $(".gcs.current").parent().parent().find("#streetVal").val(d.values);                           
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("streetVal").val("");
                        emptyVal(3);
                    }
                });
			    
				    var streets = [];
		      	for (var i = 0;i < d.data.length; i++ ) {
		      		if (isNull(d.data[i].street) || isNull(d.data[i].street)) {
			     			continue;
			     		}
			     		var streetMap = {};
			     		streetMap.title = d.data[i].street;
			     		streetMap.value = d.data[i].street;
			     		streets.push(streetMap);
			     	} 
			     	
			     	if (streets.length == 0) {
			     		$(".gcs.current").parent().parent().find("#street_id").css("display","none");
                        getFarePrice();
                    }
                    
                    $(".gcs.current").parent().parent().find("#street_text").select("update",{
                        title: "请选择镇",
                        items:unique(streets),
                    onChange: function(d) {
                       $(".gcs.current").parent().parent().find("#streetVal").val(d.values);     
                       
                       //选到镇，目前就结束了！显示运费
                       $(".gcs.current").parent().parent().find("#fare_price_id").css("display","block");
                       getFarePrice();
                       
                        
                    },       
                    onClear: function() {           
                        $(".gcs.current").parent().parent().find("streetVal").val("");
			            emptyVal(3);
			        }	
			     	});      
			     	
      	}

      }  	
  });
}

function unique(arrs){
     var result = {};
     var finalResult=[];
     for(var i=0;i<arrs.length;i++){
				 var keyName = arrs[i].title;
         result[keyName] = arrs[i];//简易处理
     }
     for(item in result){
         finalResult.push(result[item]);
     }
     
     return finalResult;
}

function emptyVal(level) {
	
	/*var clearButtons = $(".clear-button");
	for (var i=0;i<clearButtons.length;i++) {
		$(clearButtons[i]).click();
	}*/
	
	if (level == 0) {//清空掉省及以下的设置值
		$(".gcs.current").parent().parent().find("#province_text").attr("value","");
        $(".gcs.current").parent().parent().find("#province_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#provinceVal").attr("value","");
        
        $(".gcs.current").parent().parent().find("#sheng_id").html("<span class='i18n' name='or_sheng'>省</span><input type='text' readonly='readonly' id='province_text' placeholder='省' class='hynewlytext' onchange='lightThis($(this),1)' /><input type='hidden' id='provinceVal' value='' />");
        $(".gcs.current").parent().parent().find("#province_text").select("close");
        
        $(".gcs.current").parent().parent().find("#city_text").attr("value","");
        $(".gcs.current").parent().parent().find("#city_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#cityVal").attr("value","");
        
        $(".gcs.current").parent().parent().find("#shi_id").html("<span class='i18n' name='or_shi'>市</span><input type='text' readonly='readonly' id='city_text' placeholder='市' class='hynewlytext' onchange='lightThis($(this),2)' /><input type='hidden' id='cityVal' value='' />");
        $(".gcs.current").parent().parent().find("#city_text").select("close");
        
        $(".gcs.current").parent().parent().find("#town_text").attr("value","");
        $(".gcs.current").parent().parent().find("#town_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#townVal").attr("value","");
        
        $(".gcs.current").parent().parent().find("#town_id").html("<span class='i18n' name='or_town'>区</span><input type='text' readonly='readonly' id='town_text' placeholder='区' class='hynewlytext' onchange='lightThis($(this),3)' /><input type='hidden' id='townVal' value='' />");
        $(".gcs.current").parent().parent().find("#town_text").select("close");
        
        $(".gcs.current").parent().parent().find("#street_text").attr("value","");
        $(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#streetVal").attr("value","");
        $(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
        $(".gcs.current").parent().parent().find("#street_text").select("close");
        
	}
	
	
	if (level == 1) {//清空掉市及以下的设置值
		$(".gcs.current").parent().parent().find("#city_text").attr("value","");
        $(".gcs.current").parent().parent().find("#city_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#cityVal").attr("value","");
        $(".gcs.current").parent().parent().find("#shi_id").html("<span class='i18n' name='or_shi'>市</span><input type='text' readonly='readonly' id='city_text' placeholder='市' class='hynewlytext' onchange='lightThis($(this),2)' /><input type='hidden' id='cityVal' value='' />");
        $(".gcs.current").parent().parent().find("#city_text").select("close");
        
        
        $(".gcs.current").parent().parent().find("#town_text").attr("value","");
        $(".gcs.current").parent().parent().find("#town_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#townVal").attr("value","");
        $(".gcs.current").parent().parent().find("#town_id").html("<span class='i18n' name='or_town'>区</span><input type='text' readonly='readonly' id='town_text' placeholder='区' class='hynewlytext' onchange='lightThis($(this),3)' /><input type='hidden' id='townVal' value='' />");
        $(".gcs.current").parent().parent().find("#town_text").select("close");
        
        $(".gcs.current").parent().parent().find("#street_text").attr("value","");
        $(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#streetVal").attr("value","");
        $(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
        $(".gcs.current").parent().parent().find("#street_text").select("close");

	}
	
	if (level == 2) {//清空掉区及以下的设置值
		$(".gcs.current").parent().parent().find("#town_text").attr("value","");
        $(".gcs.current").parent().parent().find("#town_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#townVal").attr("value","");
        $(".gcs.current").parent().parent().find("#town_id").html("<span class='i18n' name='or_town'>区</span><input type='text' readonly='readonly' id='town_text' placeholder='区' class='hynewlytext' onchange='lightThis($(this),3)' /><input type='hidden' id='townVal' value='' />");
        $(".gcs.current").parent().parent().find("#town_text").select("close");
        
        $(".gcs.current").parent().parent().find("#street_text").attr("value","");
        $(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#streetVal").attr("value","");
        $(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
        $(".gcs.current").parent().parent().find("#street_text").select("close");

	}
	
	if (level == 3) {//清空掉镇及以下的设置值
		$(".gcs.current").parent().parent().find("#street_text").attr("value","");
        $(".gcs.current").parent().parent().find("#street_text").attr("data-values","");
        $(".gcs.current").parent().parent().find("#streetVal").attr("value","");
        $(".gcs.current").parent().parent().find("#street_id").html("<span class='i18n' name='or_street'>镇</span><input type='text' readonly='readonly' id='street_text' placeholder='镇' class='hynewlytext' onchange='lightThis($(this),4)' /><input type='hidden' id='streetVal' value='' />");
        $(".gcs.current").parent().parent().find("#street_text").select("close");

	}
}

function getFarePrice(){
	
	var dataMap = {};
	
	var factoryCode = $(".gcs.current").attr("val");
	if (!isNull(factoryCode)) {
		dataMap.factoryCode = factoryCode;
	}
	
	var cityCode = $(".gcs.current").parent().parent().find("#city_text").attr("data-values");
    dataMap.cityCode = cityCode;
	if (!isNull(cityCode)) {
		dataMap.cityCode = cityCode
	}
	
	var provinceCode = $(".gcs.current").parent().parent().find("#province_text").attr("data-values");
    dataMap.provinceCode = provinceCode;
	if (!isNull(provinceCode)) {
		dataMap.provinceCode = provinceCode
	}
	
	var street = $(".gcs.current").parent().parent().find("#street_text").attr("value");
    dataMap.street = street;
	if (!isNull(street)) {
		dataMap.street = street
	}
	
	var townCode = $(".gcs.current").parent().parent().find("#town_text").attr("data-values");
    dataMap.townCode = townCode;
	if (!isNull(townCode)) {
		dataMap.townCode = townCode
	}
		
	var url = requestPath + "/m/sapFreight/list.htm";
    
    var cleckLis = $("li[class='current']>div>i");
    
    for (var i=0;i<cleckLis.length;i++) {
        var liId = $(cleckLis[i]).attr("checkid");
        var liPm = $("#pm_" + liId).val();
        if (liPm == '锦纶切片') {
            url = requestPath + "/m/sapFreightChinlon/list.htm";
            break;
        }
    }
  
  $.ajaxjsonp(url, dataMap, function(data) {
      var d = eval(data);  
      var farePriceResult = d.data[0].farePrice;
      
      $(".gcs.current").parent().parent().find("#fare_price_id").css("display","block");
      $(".gcs.current").parent().parent().find("#fare_price_text").val(farePriceResult);
  });
}

var  portMap = {};
function portCredit(portList) {
    var array = [];
     for(var i = 0; i< portList.length; i++){
        portMap[portList[i].pkid] = portList[i];
        var json = {};
        json.title = portList[i].str02+"-"+ portList[i].str01;
        json.value = portList[i].pkid;
        array[array.length] = json;
    }
    // 港口
    $("#port").select({
        title: "请选择",
        items: array,           
        onChange: function(d) {
            $("#portCode").val(d.values);
        },
        onClose: function() {
            //选中后处理数据
			changePortShop();
        },
        onClear: function() {
            $("#portCode").val("");
        }        
    }); 
}
var paymentTermsMap = {};
function paymentTermsCredit(paymentTermsList) {
    var array = [];
     for(var i = 0; i< paymentTermsList.length; i++){
        paymentTermsMap[paymentTermsList[i].paymentTermsCode] = paymentTermsList[i];
        var json = {};
        json.title = paymentTermsList[i].paymentTermsName;
        json.value = paymentTermsList[i].paymentTermsCode;
        array[array.length] = json;
    }
    
    $("#paymentTerms").select({
        title: "请选择",
        items: array,           
        onChange: function(d) {
            $("#paymentCode").val(d.values);
        },
        onClose: function() {
            //选中后处理数据
			
        },
        onClear: function() {
            $("#paymentCode").val("");
        }        
    }); 
}

function changePortShop(){

    
}

template.helper("getAdd", function(a, b) {
    if (isNull(a)) {
        a=0;
    }
    if (isNull(b)) {
        b=0;
    }
    return accAdd(a,b);
});