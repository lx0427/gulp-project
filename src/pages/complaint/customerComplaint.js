$(function() {
    var wxOpenid = sessionStorage.getItem("wxOpenid");
    
    if (!isNull(wxOpenid)) {
        $("#openid").val(wxOpenid);
        queryData();
    } else if(!isNull($("#openid").val())){
    	wxOpenid = $("#openid").val();
        sessionStorage.setItem("wxOpenid", wxOpenid);
        queryData();
    }else{
        getOauthOpenid("initOauth");
    }

    // 投诉类型
    var tslx = $("#complaintType em.active").attr("val");
    $("#tslx_" + tslx).show();

    $("#complaintType em").bind("click", function() {
        $(".tslx").removeClass("active");
        $(this).addClass("active");
        $("#tslx_1").hide();
        $("#tslx_2").hide();
        $("#tslx_" + $(this).attr("val")).show();
    });

    // 生产日期
    $("#scrq").calendar({
        toolbarCloseText: "",
    });

    // 图片上传
    $("#addImg").bind("click", function() {
        // 最多上传9张
        var len = $(".img").length;
        startUploadPics("imgCallback", 9 - len);
    });
});

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
function imgCallback(img) {
    var imgHtml = "<li>";
    imgHtml += "<p><img class='img' data-src='" + img + "' src='" + filePathOld + img + "' /></p>";
    imgHtml += "<em><i class='iconfont icon-jian'></i></em>";
    imgHtml += "</li>";

    $("#addImg").before(imgHtml);

    if ($(".img").length == 9) {
        $("#addImg").hide();
    } else {
        $("#addImg").show();
    }

    $("#img_ul em").unbind("click");
    $("#img_ul em").bind("click", function() {
        $(this).parent().remove();
        $("#addImg").show();
    });

}


// 初始化微信授权id
function initOauth() {
    var wxOpenid = $("#openid").val();
    if (!isNull(wxOpenid)) {
        sessionStorage.setItem("wxOpenid", wxOpenid);
    }
    queryData();
}

var optMap = null; // 品名业务员对照
var problemMap = null; // 品名问题对照

// 用户信息
function queryData() {
    var url = requestPath + "/m/complaint/index.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        optMap = d.optMap;
        problemMap = d.problemMap;

        setTimeout(function() {
            bindMenber(d.user);
        }, 10);
        setTimeout(function() {
            bindPm(d.pmList);
        }, 10);
        setTimeout(function() {
            bindComplaintCategory(d.categoryList);
        }, 10);

    });
}

// 绑定会员信息
function bindMenber(data) {
    if (isNull(data)) {
        return;
    }
    var menber = data.menber;
    $("#hydm").val(menber.hydm);
    $("#sapCustomerId").val(menber.sapCustomerId);
    $("#mbname").val(menber.mbname);
    $("#coplxr").val(data.username);
    $("#coptel").val(data.mobile);
    var dq = "";
    if (!isNull(menber.dq1name)) {
        dq += menber.dq1name;
    }
    if (!isNull(menber.dqname)) {
        dq += menber.dqname;
    }
    if (!isNull(menber.xjname)) {
        dq += menber.xjname;
    }
    if (!isNull(menber.copaddr)) {
        dq += menber.copaddr;
    }
    $("#copaddr").val(dq);
}

// 品名下拉选择显示
function bindPm(pmList) {
    if (isNull(pmList) || pmList.length == 0) {
        return;
    }
    var jsons = [];
    for (var i = 0; i < pmList.length; i++) {
        var json = {};
        json.title = pmList[i].pm;
        json.value = pmList[i].pm;
        jsons[jsons.length] = json;
    }
    $("#pm").select({
        title: "选择产品分类",
        items: jsons,
        onChange: function(d) {
            setTimeout(function() {
                pmChange();
            }, 10);
        },
        onClear: function() {
            setTimeout(function() {
                pmChange();
            }, 10);
        }
    });
}

function pmChange() {
    // 重新绑定问题类型
    bindProblem();
    // 业务员处理
    bindOptuser();
}

var initOptuser = false;
// 操作员下拉选择显示
function bindOptuser() {
    var pm = $("#pm").val();
    if (!initOptuser && isNull(pm)) {
        return;
    }
    var optArray = [];
    if (!isNull(pm)) {
        var optList = optMap[pm];
        if (optList != null && optList.length > 0) {
            for (var i = 0; i < optList.length; i++) {
                var json = {};
                json.title = optList[i].username;
                json.value = optList[i].userid;
                optArray[optArray.length] = json;
            }
        }
    }

    if (!initOptuser) {
        if (optArray.length > 0) {
            initOptuser = true;
            $("#username").select({
                title: "请选择所属业务员",
                items: optArray,
                onChange: function(d) {
                    $("#userid").val(d.values);
                },
                onClear: function() {
                    $("#userid").val("");
                }
            });
        }
    } else {
        $("#username").val("");
        $("#userid").val("");
        $("#username").select("clear");
        $("#username").select("update", { items: optArray });
    }
}

function bindProblem() {
    $("#problemList").html("");
    var pm = $("#pm").val();
    if (isNull(pm)) {
        return;
    }
    var json = {};
    json.list = problemMap[pm];
    $("#problemList").html(template('problemList_page', json));
    $("#problemList i").unbind("click");
    $("#problemList i").bind("click", function() {
        // icon-check 选中, icon-checkk 未选中
        var className = $(this).attr("class");
        if (className.indexOf("icon-checkk") != -1) {
            $(this).removeClass("icon-checkk").addClass("icon-check");
        } else {
            $(this).removeClass("icon-check").addClass("icon-checkk");
        }
    });
}


function bindComplaintCategory(categoryList) {
    if (isNull(categoryList) || categoryList.length == 0) {
        return;
    }
    var jsons = [];
    for (var i = 0; i < categoryList.length; i++) {
        var json = {};
        json.title = categoryList[i].value;
        json.value = categoryList[i].code;
        jsons[jsons.length] = json;
    }
    $("#complaintCategoryStr").select({
        title: "选择投诉要求",
        items: jsons,
        onChange: function(d) {
            $("#complaintCategory").val(d.values);
        },
        onClear: function() {
            $("#complaintCategory").val("");
        }
    });
}

var saveFlag = false;
// 提交
function doSave() {
    if(saveFlag){
        return;
    }
    if(!checkValue()){
        return false;
    }
    saveFlag = true;
    var url = requestPath + "/m/complaint/save.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        showOk("投诉提交成功",function(){
            openPage("我的","../customer/my1.html","1");
        });
    }, false, function(){
        saveFlag = false;
    });

}

function checkValue(){
    var coplxr = $("#coplxr").val();
    if(isNull(coplxr)){
        showToptip($.i18n.prop('cu_contactpersontip'), "coplxr");
        return false;
    }
    var coptel = $("#coptel").val();
    if(isNull(coptel)){
        showToptip($.i18n.prop('cu_phonenumbertip'), "coptel");
        return false;
    }
    var pm = $("#pm").val();
    if(isNull(pm)){
        showToptip($.i18n.prop('cu_producttypetip'), "pm");
        return false;
    }
    var username = $("#username").val();
    if(isNull(username)){
        showToptip($.i18n.prop('cu_salesmantip'), "username");
        return false;
    }

    var complaintType = $("#complaintType em.active").attr("val");
    if(isNull(complaintType)){
        showToptip($.i18n.prop('cu_complainttype'), "complaintType");
        return false;
    }

    var complaintDetail = $("#complaintDetail").val();
    var imgLen = $(".img").length;
    if(isNull(complaintDetail) && imgLen == 0){
         showToptip($.i18n.prop('cu_uploading'), "complaintDetail");
        return false;
    }

    return true;
}


function getDataMap() {
    var dataMap = {};    
    dataMap.wxOpenid = $("#openid").val();
    dataMap.hydm = $("#hydm").val();
    dataMap.sapCustomerId = $("#sapCustomerId").val();
    dataMap.mbname = $("#mbname").val();
    dataMap.copLxr = $("#coplxr").val();
    dataMap.copMobile = $("#coptel").val();
    dataMap.copAddr = $("#copaddr").val();
    dataMap.pm = $("#pm").val();
    dataMap.optuserId = $("#userid").val();
    var complaintType = $("#complaintType em.active").attr("val");
    dataMap.complaintType = complaintType; //投诉类型：1.服务态度投诉 2.产品质量投诉
    if (complaintType == "1") { // 1.服务态度投诉
        // 业务员
        dataMap.rated1 = $("#ywyStar").val();
        dataMap.rated1Detail = $("#ywy").val();
        // 仓库员
        dataMap.rated2 = $("#ckyStar").val();
        dataMap.rated2Detail = $("#cky").val();
        // 财务员
        dataMap.rated3 = $("#cwyStar").val();
        dataMap.rated3Detail = $("#cwy").val();
        // 业务员
        dataMap.rated4 = $("#fwyStar").val();
        dataMap.rated4Detail = $("#fwy").val();
    } else if (complaintType == "2") { // 2.产品质量投诉
        // 生产日期
        dataMap.scrq = $("#scrq").val();
        // 产品批号
        dataMap.cz = $("#cz").val();
        // 规格
        dataMap.gg = $("#gg").val();
        // 等级
        dataMap.cd = $("#cd").val();
        // 问题类型，多选，逗号分隔
        var problemStr = "";
        $("#problemList i").each(function(){
            if($(this).hasClass("icon-check")){
                problemStr += "," + $(this).attr("val");
            }
        });
        if(!isNull(problemStr)){
            problemStr = problemStr.substring(1);
        }        
        dataMap.problemType = problemStr;
    }
    
    // 投诉详情
    dataMap.complaintDetail = $("#complaintDetail").val();
    // 投诉图片路径。先写死
    // dataMap.complaintImages = "xxx.jpg";
    var complaintImages = "";
    $(".img").each(function() {
        complaintImages += "," + $(this).attr("data-src");
    });
    if (!isNull(complaintImages)) {
        complaintImages = complaintImages.substring(1);
    }
    dataMap.complaintImages = complaintImages;
    // 投诉要求，投诉类别？？ex_codes.code？？，，，先写死。。。不是ex_value的？
    dataMap.complaintCategory = $("#complaintCategory").val();

    return dataMap;
}


function removeInputBlur() {
    $('input,textarea').each(function() {
        $(this).blur();
    });
}