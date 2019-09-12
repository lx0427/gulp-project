
var pxcode = "1";
$(function() {
	getUserInfo(function(userLevel){
		console.log("userLevel: "+ userLevel);
		if(userLevel != 1){
		    document.body.addEventListener('touchmove' , function(event){
			    if (event.cancelable) {
			        // 判断默认行为是否已经被禁用
			        if (!event.defaultPrevented) {
			            event.preventDefault();
			        }
			    }
			},{ passive: false });
			$("#pmtitle").attr("onclick", "");
			$("#ggtitle").attr("onclick", "");
			$("#str03title").attr("onclick", "");
			$("#wzlbtitle").attr("onclick", "");
			$("#cdtitle").attr("onclick", "");
            $("#pxtitle").attr("onclick", "");
            $("#ggOrder").attr("onclick", "");
			$("#priceOrder").attr("onclick", "");
			if(userLevel == 0){
				$('#wx_vaguebox1').show();
			}else if(userLevel == 2){
				$('#wx_vaguebox2').show();
			}
		}
	});
    $("#form").bind("submit", function() {
	   $("#pm").val("");
       pxcode = '';
	   $("#pmtitle").html("品名<span class=\"xl\"></span>");
	   show();
        initPage();
        return false;
    });
    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
       $("#querykey").val("");
	   $("#pm").val("");
       pxcode = '';
	   $("#pmtitle").html("品名<span class=\"xl\"></span>");
	   show();
        initPage();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#querykey").val())) {
            return false;
        }
        toSearchHistoryList();
    });
    show();
    setTimeout(bindSelect, 100);
    queryData();
    setTimeout(scanRecordLoad, 200);
	   
});

function scanRecordLoad() {
    var url = window.location.href;
	var pm = $("#pm").val();
     var modelType=0;
	if (!isNull(pm)) {
        if(pm=='DTY'){
            modelType=6;
        }else if(pm=='POY'){
            modelType=7;
        }else if(pm=='FDY'){
            modelType=26;
        }else if(pm=='切片'){
            modelType=27;
        }else if(pm=='锦纶切片'){
            modelType=28;
        }
    }
    scanRecord(modelType,0,"",url,'产品线'+pm);
}


var sapgg = null;

function queryData() {
    var url = requestPath + "/m/resource/resourceList.htm";
    var dataMap = getDataMap();

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
         console.info(d);
        if (pullRefresh) {
            $("#list").html(template('list_page', d));
        } else {
            $("#list").append(template('list_page', d));
        }
    }, true,function(){
        $("#ggOrder").css('pointer-events','auto');
        $("#priceOrder").css('pointer-events','auto');
    });
}

function getDataMap() {
    var dataMap = {};
    var pm = $("#pm").val();
    var diffFlag = $("#diffFlag").val();
    var searchRemark = $("#searchRemark").val();
    if(!isNull(diffFlag)){
        dataMap.diffFlag = diffFlag; //差异化标识查询
    }
	dataMap.language=i18nLanguage;//语言
    if(!isNull(searchRemark)){
        dataMap.searchRemark = searchRemark; //关键词
    }

    if (!isNull(pm)) {
        dataMap.pm = pm;
        if ($("#pm").val() == "切片") {
            $("#pmtitle").html("涤纶切片" + "<span class=\"xl\"></span>");
        } else {
            $("#pmtitle").html($("#pm").val() + "<span class=\"xl\"></span>");
        }
    }
   
    if (!isNull($("#str03").val())) {
        dataMap.str03 = $("#str03").val();
    }
    if (!isNull($("#wzlb").val())) {
        dataMap.wzlb = $("#wzlb").val();
    }
    if (!isNull($("#cd").val())) {
        dataMap.cd = $("#cd").val();
    }
   
	 if (!isNull($("#querykey").val())) {
    	dataMap.flag = $("#querykey").val();
        dataMap.keyword = $("#querykey").val();
    }
    if (!isNull($("#gg").val())) {
        dataMap.gg = $("#gg").val();
    }
	if (!isNull($("#pxtitle").val())) {
        if(pxcode=="1"){
			dataMap.orderName = "price00";
			dataMap.order = "asc";
		}else if(pxcode=="2"){
			dataMap.orderName = "price00";
		    dataMap.order = "desc";
		}else if(pxcode=="3"){
			dataMap.orderName = "gg";
		    dataMap.order = "asc";
		}else if(pxcode=="4"){
			dataMap.orderName = "gg";
		    dataMap.order = "desc";
		}
		
    }


	
    var customerId = $("#customerId").val();
    if (!isNull(customerId)) {
        dataMap.customerId = customerId;
    }
    return dataMap;
}

var json;

function bindSelect() {
    var url = requestPath + "/m/resource/allSelectList.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        json = d;
        $("#ggLeft").html(template('gg_left_page', d));
        bindLeft();
        $("#ggRight").html(template('gg_right_page', d));
        bindRight();
    }, false);
}

function bindLeft() {
    $("#ggLeft li").on("click", function() {
        $("#ggLeft li").removeClass("current");
        $(this).addClass("current");
        var min = $(this).attr("min");
        var max = $(this).attr("max");
        $(".gglist").hide();
        $(".gglist").each(function(i) {
            var denier = $(this).attr("denier");
            if (parseInt(denier) >= parseInt(min) && parseInt(denier) <= parseInt(max)) {
                $(this).show();
            }
        });
    });
}

function bindRight() {
    $(".ggselect").on("click", function() {
        var gg = $(this).attr("gg");
        var sapGg = $(this).text();
        $(".icon-duihao").hide();
        $(this).find(".icon-duihao").show();
        $("#gg").val(gg);

        $("#ggtitle").removeClass("current");
        if ((isNull(gg) || gg == "不限")) {
            $("#ggtitle").html($.i18n.prop('rl_guige')+"<span class=\"xl\"></span>");
        } else {
            $("#ggtitle").html(sapGg + "<span class=\"xl\"></span>");
        }

        toHide();

        var pm = $("#pm").val();
        if (pm == "DTY") {
            // 更新下纱种
            setTimeout(function() {
                updateStr03Data();
                updateCdData();
            }, 10);
        }
        if (pm == "POY" || pm == "FDY") {
            // 类型
            setTimeout(function() {
                updateWzlbData();
                updateCdData();
            }, 10);
        }

        $("#list").html("");
        $("#pageIndex").val(0);
        queryData();
    });
}

function showGgSelect() {
    $(".wx_pulldownbox").toggle();
    $(".wx_opacity").toggle();
    $(".wx_pulldownbox2").hide();
    $(".wx_opacity2").hide();
    if ($(".wx_pulldownbox").css("display") == "none") {
        $("#ggtitle").removeClass("current");
    } else {
        $("#ggtitle").addClass("current");
    }
}

function showSelect(str) {
    $("#xlsx3").html(template(str + 'list_page', json));
    $("#" + str + "_" + middle).addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    if ($(".wx_pulldownbox2").css("display") == "none") {
        $("#" + str + "title").removeClass("current");
    } else {
        $("#" + str + "title").addClass("current");
    }
}
var middle = "";

function middleSelect(str1, str2, id) {
    $("#" + str2 + "title").html(str1 + "<span class=\"xl\"></span>");
    $("#" + str2 + "_" + middle).removeClass("current");
    if (str1 == "纱种" || str1 == "类型" || str1 == "等级") {
        $("#" + str2 + "").val("");
        middle = "";
        $("#" + str2 + "title").removeClass("current");
    } else {
        $("#" + str2 + "").val(str1);
        $("#" + str2 + "title").addClass("current");
        $("#" + str2 + "_" + id).addClass("current");
        middle = id;
    }

    toHide();

    if (str2 == "wzlb") {
        var pm = $("#pm").val();
        if (pm == "切片" || pm == "锦纶切片"|| pm == "短纤") {
            // 更新等级
            setTimeout(function() {
                updateCdData();
            }, 10);
        }
    }

    $("#list").html("");
    $("#pageIndex").val(0);
    queryData();

}

function toResourceInfo(gpls,wzid, depid, salesType) {
    getInfoData(gpls, wzid, depid, salesType);
    $("#infoPopup").popup();

    //openPage("资源详情", "../customer/resourceInfo.html?gpls=" + gpls, "1");
}
var saveFlag = false;


function saveShopping(gpls, wzid, depid, salesType, pm, str02) {
    if ($("#" + gpls).hasClass("current")) {
            deleteShopping(gpls, wzid, depid, salesType);
            return;
        }

    if(pm=='POY' && str02 == '车丝'){
        confirmMsg("该物资属于车丝，确定加入购物车吗?", function() {
                if (saveFlag) {
                    return false;
                }
                saveFlag = true;
                var url = requestPath + "/m/shopping/saveShopping.htm";
                var dataMap = {};
                dataMap.wzid = wzid;
                dataMap.depid = depid;
                dataMap.salesType = salesType;
                dataMap.orderType = "0";
                
                $.ajaxjsonp(url, dataMap, function(data) {
                    $("#" + gpls).addClass("current");
        scanShopping(d.data);//记录商品添加到购物车操作
                }, false, function() {
                    saveFlag = false;
                });                                    
        });
    }else{

        if (saveFlag) {
            return false;
        }
        saveFlag = true;
        var url = requestPath + "/m/shopping/saveShopping.htm";
        var dataMap = {};
        dataMap.wzid = wzid;
        dataMap.depid = depid;
        dataMap.salesType = salesType;
        dataMap.orderType = "0";
        
        $.ajaxjsonp(url, dataMap, function(data) {
            $("#" + gpls).addClass("current");
        scanShopping(d.data);//记录商品添加到购物车操作
        }, false, function() {
            saveFlag = false;
        });
    }

    
}


function toHide() {
    $(".wx_pulldownbox2").hide();
    $(".wx_opacity2").hide();
    $(".wx_opacity").hide();
    $(".wx_pulldownbox").hide();

    $(".wx_ziyfilter li").removeClass("current");
}

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");

    queryData();
}

function deleteShopping(gpls, wzid, depid, salesType) {
    var dataMap = {};
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;

    var url = requestPath + "/m/shopping/deleteShopping.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
        $("#" + gpls).removeClass("current");
    });
}

var pmcode = "1"

function showPmSelect() {
    $("#xlsx3").html(template('pmlist_page', 1));
    $("#pm" + pmcode).addClass("current");
    $("#pmtitle").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
}

function pmSelect(pm, code) {
    pmcode = code;
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    $("#pmtitle").removeClass("current");
    $("#pmtitle").html(pm+"<span class=\"xl\"></span>");
    if(pm ==='不限'){
        $("#pm").val('');
    }else{
        $("#pm").val(pm);
    }
    $("#pageIndex").val(0);
    $("#list").html("");
	console.info(pm);
    show();
    queryData();
    bindSelect();
}


var keyflag=true;

function show() {
    $("#str03title").hide();
    $("#cdtitle").hide();
    $("#wzlbtitle").hide();
    $("#ggtitle").hide();
	$("#pxtitle").hide();

    $("#str03").val("");
    $("#cd").val("");
    $("#wzlb").val("");
    $("#gg").val("");

    $("#str03title").html($.i18n.prop('rl_shazhong')+"<span class=\"xl\"></span>");
    $("#cdtitle").html($.i18n.prop('rl_dengji')+"<span class=\"xl\"></span>");
    $("#wzlbtitle").html($.i18n.prop('rl_leixing')+"<span class=\"xl\"></span>");
    $("#ggtitle").html($.i18n.prop('rl_guige')+"<span class=\"xl\"></span>");

    $("#str03title").removeClass("current");
    $("#cdtitle").removeClass("current");
    $("#wzlbtitle").removeClass("current");
    $("#ggtitle").removeClass("current");

    if (!isNull($("#keyword").val())&&keyflag) {
		keyflag=false;
        var keyword = $("#keyword").val();
		if (isNull($("#querykey").val())) {
		  $("#querykey").val(keyword);
		  $(".weui_search_bar").addClass("weui_search_focusing");
		  
        }
        if (keyword == "DTY") {
           $("#pm").val(keyword);
        }
        if (keyword == "POY" || keyword == "FDY") {
           $("#pm").val(keyword);

        }
        if (keyword == "切片" || keyword == "锦纶切片") {
            $("#pm").val(keyword);

        }
		if (keyword == "短纤") {
            $("#pm").val(keyword);

        }


        
		
	

    }

    // if (!isNull($("#pm").val())) {
        var pm = $("#pm").val();

        if (pm == "DTY" || pm=='' || isNull(pm)) {
            $("#ggtitle").show();
            $("#str03title").show();
            $("#cdtitle").show();
          
			
        }
        if (pm == "POY" || pm == "FDY") {
            $("#ggtitle").show();
            $("#wzlbtitle").show();
            $("#cdtitle").show();
        }
        if (pm == "切片" || pm == "锦纶切片") {
            $("#wzlbtitle").show();
            $("#cdtitle").show();
        }
		 if (pm == "短纤") {
            $("#ggtitle").show();
            $("#cdtitle").show();
        }
        //$("#pxtitle").show();

    // }

   
}


// 更新纱种数据
function updateStr03Data() {
    var url = requestPath + "/m/select/str03List.htm";
    var dataMap = {};
    dataMap.pm = $("#pm").val();
    dataMap.gg = $("#gg").val();

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        json.str03list = d.data;
    });
}

// 更新类型数据
function updateWzlbData() {
    var url = requestPath + "/m/select/wzlbList.htm";
    var dataMap = {};
    dataMap.pm = $("#pm").val();
    dataMap.gg = $("#gg").val();

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        json.wzlblist = d.data;
    });
}

// 更新等级数据
function updateCdData() {
    var url = requestPath + "/m/select/cdList.htm";
    var dataMap = {};
    dataMap.pm = $("#pm").val();
    dataMap.wzlb = $("#wzlb").val();

    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        json.cdlist = d.data;
    });
}




function showPxSelect() {
    $("#xlsx3").html(template('pxlist_page', 1));
    $("#desc" + pxcode).addClass("current");
    $("#pxtitle").addClass("current");
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
}
var ggAsc = false;
var priceAsc = false;
function doOrder(orderName){
    if(orderName=="price00" && priceAsc){
        $("#priceOrder").css("pointer-events",'none');
        $("#priceOrder i").css("color",'#a7a7a7');
        $("#priceOrder .down").css("color",'#3e7baf');
       pxcode = "1";
       priceAsc = false;
    }else if(orderName=="price00" && !priceAsc){
        $("#priceOrder").css("pointer-events",'none');
        $("#priceOrder i").css("color",'#a7a7a7');
        $("#priceOrder .on").css("color",'#3e7baf');
       pxcode = "2";
       priceAsc = true;
    }else if(orderName=="gg" && ggAsc){
        $("#ggOrder").css("pointer-events",'none');
        $("#ggOrder i").css("color",'#a7a7a7');
        $("#ggOrder .down").css("color",'#3e7baf');
       pxcode = "3";
       ggAsc = false;
    }else if(orderName=="gg" && !ggAsc){
        $("#ggOrder").css("pointer-events",'none');
        $("#ggOrder i").css("color",'#a7a7a7');
        $("#ggOrder .on").css("color",'#3e7baf');
       pxcode = "4";
       ggAsc = true;
    }

    $("#pageIndex").val(0);
    $("#list").html("");
    //  $(".wx_pulldownbox2").toggle();
    // $(".wx_opacity2").toggle();
    // $(".wx_pulldownbox").hide();
    // $(".wx_opacity").hide();
    queryData();
}

function pxSelect(px, code) {
    pxcode = code;
    $(".wx_pulldownbox2").toggle();
    $(".wx_opacity2").toggle();
    $(".wx_pulldownbox").hide();
    $(".wx_opacity").hide();
    $("#pxtitle").removeClass("current");
    $("#pxtitle").html(px+"<span class=\"xl\"></span>");
	
   
    $("#pageIndex").val(0);
    $("#list").html("");
	
    queryData();
   
}
function toSearchHistoryList() {
    openPage("搜索历史", "../customer/searchHistoryList.html", "1");
}