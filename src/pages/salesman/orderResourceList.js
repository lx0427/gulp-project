$(function() {

    $(".kindbtn li").bind("click", function() {
        // 当前选中的
        var currentText = $(".kindbtn .current").text();
        // 这次选中的
        var thisText = $(this).text();
        if (currentText === thisText) {
            // 不处理
            return;
        }
        if (thisText === "涤纶切片") {
            $("#pm").val("切片");
        } else {
            $("#pm").val(thisText);
        }
        if (thisText === "涤纶切片" || thisText === "锦纶切片") {
            $("#czxl1").hide();
            $("#czxl2").show();

        } else {
            $("#czxl1").show();
            $("#czxl2").hide();

        }

        $(".kindbtn li").removeClass("current");
        $(this).addClass("current");
        // 清空客户、规格、批号、等级
        $("#hydm").val("");
        $("#mbname").val("");
        $("#gg").val("");
        $("#cz").val("");
        $("#cz2").val("");
        $("#cd").val("");
        $("#nx").val("");
        $("#sz").val("");
        var tab = $(this).attr("tab");
        if(tab == "d"){
            $("#title").hide();
            $("#title_c").show();
            $("#listr02").show();
            $("#listr03").show();
            $("#wx_main").css("top","365px");
        }else{
            $("#title_c").hide();
            $("#title").removeClass("formtil_a").removeClass("formtil_b").removeClass("tab_d").addClass("formtil_" + tab).show();
            $("#listr02").hide();
            $("#listr03").hide();
            $("#wx_main").css("top","281px");
        }        
        $("#list").html("");
        $("#list").removeClass("tab_a").removeClass("tab_b").removeClass("tab_d").addClass("tab_" + tab);

        setTimeout(function() {
            $("#pageIndex").val("0");
            $("#menberList").html("");
            getMenberList();
        }, 10);

        setTimeout(function() {
            getGgData();
        }, 10);

        getCdList();
        if("DTY" == $("#pm").val()){
            getNxList();
            getSzList();
        }
    });

    $("#mbname").bind("change", function() {
        queryData();
    });

    $("#gg").bind("change", function() {
        $("#cz").val("");
        $("#cd").val("");
        $("#nx").val("");
        $("#sz").val("");
        setTimeout(function() {
            getCdList();
            if("DTY" == $("#pm").val()){
                getNxList();
                getSzList();
            }
        }, 10);
        queryData();
    });

    $("#cz").bind("change", function() {
        $("#cd").val("");
        $("#nx").val("");
        $("#sz").val("");
        setTimeout(function() {
            getCdList();
            if("DTY" == $("#pm").val()){
                getNxList();
                getSzList();
            }
        }, 10);
        queryData();
    });

    $("#nx").bind("change", function() {
        setTimeout(function() {
            getNxList();
        }, 10);
        queryData();
    });

    $("#sz").bind("change", function() {
        setTimeout(function() {
            getSzList();
        }, 10);
        queryData();
    });
    $("#cd").bind("change", function() {
        queryData();
    });

});

function czChange() {
    $("#cd").val("");
    setTimeout(function() {
        getCdList();
    }, 10);
    queryData();
}

function showGg() {
    var pm = $("#pm").val();
    if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
        showGgPopup2();
    } else {
        showGgPopup();
    }
}

function showCz() {
    showCzPopup2();
}

function getGgData() {
    var pm = $("#pm").val();
    if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
        getGg2List();
        getCz2List();
    } else {
        getGgList();
    }
}

var queryFlag = false;

function queryData() {
    if (queryFlag) {
        return false;
    }
    queryFlag = true;
    var pm = $("#pm").val();
    var customerId = $("#hydm").val();
    var gg = $("#gg").val();
    var cz = $("#cz").val();
    var cd = $("#cd").val();

    var sz = $("#sz").val();
    var nx = $("#nx").val();
    if (isNull(pm) || isNull(customerId) || isNull(gg)) {
        // 品名、客户、规格必须选择
        $("#list").html("");
        queryFlag = false;
        return;
    }

    var url = requestPath + "/m/createOrder/orderResourceList.htm";
    var dataMap = {};
    dataMap.pm = pm;
    dataMap.customerId = customerId;
    dataMap.gg = gg;
    if (!isNull(cz)) {
        dataMap.cz = cz;
    }
    if (!isNull(cd)) {
        dataMap.cd = cd;
    }
    if (!isNull(nx)) {
        dataMap.str02 = nx;
    }
    if (!isNull(sz)) {
        dataMap.str03 = sz;
    }
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if (isNull(d.data) || d.data.length === 0) {
            $("#list").html(template('nodata'));
        } else {
            $("#list").html(template('list_page', d));
        }
    }, false, function() {
        queryFlag = false;
    });
}


function goShoppingCart() {
    var customerId = $("#hydm").val();
    if (isNull(customerId)) {
        showMessage("请选择客户");
        return false;
    }
    toShoppingCart(customerId);    
}

var saveFlag = false;

function saveShopping(gpls, wzid, depid, salesType) {
    if ($("#" + gpls).hasClass("current")) {
        deleteShopping(gpls, wzid, depid, salesType);
        return;
    }

    if (saveFlag) {
        return false;
    }
    saveFlag = true;
    var url = requestPath + "/m/shopping/saveShopping.htm";
    var dataMap = {};
    dataMap.gpls = gpls;
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.customerId = $("#hydm").val();
    dataMap.customerName = $("#mbname").val();
    dataMap.orderType = "1";

    $.ajaxjsonp(url, dataMap, function(data) {
        $("#" + gpls).addClass("current");
    }, false, function() {
        saveFlag = false;
    });
}

function deleteShopping(gpls, wzid, depid, salesType) {
    var dataMap = {};
    dataMap.gpls = gpls;
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;

    var url = requestPath + "/m/shopping/deleteShopping.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
        $("#" + gpls).removeClass("current");
    });
}
