$(function() {   
    queryData();
    setTimeout(function () {
        execI18n();
    },500);
});

function queryData() {
    var url = requestPath + "/m/orderAudit/getOrderAuditView.htm";

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        $("#list").html(template('list_page', d));
        $("#couponType").val(d.data.couponType);
        $("#footer").show();

        bindXbjz();

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

        // 等级修改
        $(".cd").each(function() {
            $(this).bind("change", function() {
                var id = $(this).attr("id").substring(3);
                getHangsource(id);
               
            });
        });

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

    var url = requestPath + "/m/resource/getHangsource.htm";
    getHangsourceFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        //处理价格
        $("#price_" + pkid).attr("value",d.data.price00);
        $("#price_a_" + pkid + " em").html($("#price_" + pkid).val());
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
        totalAmt();    
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
    totalAmt();
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
    totalAmt();
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

		//大订单才有这些字段
        if(!isNull($("#jkamt").val())){
            var sunshineDiscount = $("#sunshineDiscount_" + id).val();
                 if (isNull(sunshineDiscount)) {
                    showToptip("阳光折扣为必填项,不能为空!");
                    b = false;
                    return false;
                 }

                var policyPreferences = $("#policyPreferences_" + id).val();
                if (isNull(policyPreferences)) {
                    showToptip("政策优惠为必填项,不能为空!");
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

// 审核通过
var hasClick = true;
function doAgree() {
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
        dataMap.wbno01 = $("#wbno01").val();
        dataMap.wbno02 = $("#wbno02").val();
        dataMap.timemd5 = $("#timemd5").val();
        var status01 = $("#status01").val();
        if(status01==3){
            dataMap.fcFlag=1;//融资审核 借款审核
        }
        if(status01==11){
            dataMap.fcFlag=2;//融资审核 还款审核
        }
        console.info(dataMap);
        dataMap.jsonstring = getJsonString();
        $.ajaxjsonp(url, dataMap, function(data) {
            var d = eval(data);
            hasClick = true;
            showOk("审核成功", function() {
                if(status01==3){
                    openPage("借款列表", "../salesman/financingList.html", "1");//融资审核 借款审核列表
                }
                if(status01==11){
                    openPage("借款列表", "../salesman/financingList1.html", "1");//融资审核 还款审核列表
                }
                
            });
        });
    });
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
        var status01 = $("#status01").val();
        if(status01==3){
            dataMap.fcFlag=1;//融资审核 借款审核
            dataMap.wbno01=$("#wbno01").val(); //借款单 单号
        }

        if(status01==11){
            dataMap.fcFlag=2;//融资审核 还款审核
            dataMap.wbno01=$("#wbno01").val(); //借款单 单号
            dataMap.wbno02=$("#wbno02").val(); //还款单 单号
        }
        dataMap.jsonstring = getJsonString();
        dataMap.timemd5 = $("#timemd5").val();//还款单timemd5
        $.ajaxjsonp(url, dataMap, function(data) {
            var d = eval(data);
            showOk("拒绝成功", function() {
                if(status01==3){
                    openPage("借款列表", "../salesman/financingList.html", "1");//融资审核 借款审核列表
                }
                if(status01==11){
                    openPage("借款列表", "../salesman/financingList1.html", "1");//融资审核 还款审核列表
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
    totalAmt();
}

// 修改重量
function changeSl2(pkid) {
    // 选中这一条
    if (!$("#" + pkid).hasClass("current")) {
        $("#" + pkid).addClass("current");
    }

    // 判断下值

    if ($("sl02_" + pkid).val()<=0) {
        showMessage("重量必须大于0!");
        return false;
    }
    // 统计总重量
    totalAmt();
}

//修改借款金额,总金额
function totalAmt() {
    var totalAmt = 0;
    $(".wx_tasdelist .current").each(function() {
        var pkid = $(this).attr("id");
        var sl02 = $("#sl2_" + pkid).val();
        var price = $("#price_" + pkid).val();
        console.info("price:"+price);
        if (!isNull(sl02)) {
            var mxAmt = accMul(sl02, price);
            totalAmt = accAdd(totalAmt, mxAmt);
        }
    });
    var jkAmt = accMul(totalAmt, 0.8);
    $("#htamt").val(parseFloat(totalAmt).toFixed(2));//总金额
    $("#jkamt").val(parseFloat(jkAmt).toFixed(2));//借款金额

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
