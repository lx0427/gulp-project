$(function() {
    checkLogin();
     //页面显示判断
    if("zh"==i18nLanguage){
		     $("#kindbtn1").show();
	         $("#kindbtn2").hide();
	}else{
		     $("#kindbtn1").hide();
		     $("#kindbtn2").show();
	}
    $("#cd").bind("change", function() {
        queryData();
		     if($("#pm").val() === "DTY"){
			 getSzList();}
			 if($("#pm").val() === "POY"||$("#pm").val() === "FDY"){
			 getLxList();
			 }
            var pm = $("#pm").val();
            if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
                getGg2List();
                getCz2List();
            } else {
                getGgList();
            }
    });

	$("#sz").bind("change", function() {
        getGg2List();
        getCz2List();
        getCdList();
        queryData();
	 });
   $("#lx").bind("change", function() {
        getGg2List();
        getCz2List();
        getCdList();
        queryData();
	 });
    $(".xdlx em").bind("click", function(){
        $(".xdlx em").css('pointer-events','none');
        $(".xdlx em").removeClass("current");
        $(this).addClass("current");
        queryData();
    });
    //获取storage的参数
    var storage = sessionStorage.getItem("resembleParam");
    if(!isNull(storage)){
        var resembleParam = JSON.parse(storage);
        if(isNull(resembleParam)){
            showMessage("物品参数错误");
            setTimeout(goBack,1000);
            return;
        }
        var pm = resembleParam.pm;
        var gg = resembleParam.gg;
        var cz = resembleParam.cz;
        if(!isNull(pm) && !isNull(gg) && !isNull(cz) ){
            $("#pm").val(pm);
            $("#gg").val(gg);
            $("#cz").val(cz);
            $("#cz2").val(cz);
            bindParam(pm);
            // queryData();
        }else{
            showMessage("物品参数错误");
            setTimeout(goBack,1000);
        }
    }else{
        showMessage("物品参数错误");
        setTimeout(goBack,1000);
    }
});
function goBack(){
    window.history.back(-1);
}
function checkLogin() {
    var url = requestPath + "/m/login/getUserInfo.htm";
    $.ajaxjsonp(url, {}, function(data) {
        var d = eval(data);
        if(!isNull(d.xdlxFlag) && d.xdlxFlag != "0"){
            //$(".xdlx").show();  现在是 在品名设置表中设置str01字段为1 时，显示模式选择框，会员设置协议类型，用来计算订单价格
            $("#xdlx").val(true);//模式 显示的条件： 当前操作者被设置协议类型  当前选中品名设置str01为1
            //获取展示订单类型的数据集合
    		getDisplayTreatyList(); 
    	   
			 
			
           
            $("#xdlxFlag").val(d.xdlxFlag);
        }        
    });
}

function getDisplayTreatyList(){
	var url = requestPath + "/m/resource/getDisplayTreatyList.htm";
    $.ajaxjsonp(url, {}, function(data) {
        var d = eval(data);
        $("#pms").val(d.pms);
        displayTreaty();
    });
}

function displayTreaty(){
	var pms = $("#pms").val();//显示合约模式的品名集合
	var xdlx = $("#xdlx").val();
  if(pms.length > 0){
  	
  	var canDisplay = false;
  	var pms_list = pms.split(",");
  	
  	for(var i=0,j=pms_list.length;i<j;i++){	
  		if($("#pm").val() == pms_list[i] && xdlx == 'true' ){
				canDisplay = true;
  			break;
  		}
  	}
  	
  	if(canDisplay){
  		$(".xdlx").show();
		 if($("#pm").val() === "DTY"||$("#pm").val() === "POY"||$("#pm").val() === "FDY"){
         $("#wx_main").css("top", "330px");
		 }else{
		 $("#wx_main").css("top", "283px");
		 }
  	}else{
  		$(".xdlx").hide();
		if($("#pm").val() === "DTY"||$("#pm").val() === "POY"||$("#pm").val() === "FDY"){
		 $("#wx_main").css("top", "283px");
         }else{
		 $("#wx_main").css("top", "236px");
		 }
  	} 	
  }else{
  	//隐藏模式
  	$(".xdlx").hide();
  }
}

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
    var gg = $("#gg").val();
    var cz = $("#cz").val();
    var cd = $("#cd").val();
	var str03 = $("#sz").val();
	var wzlb = $("#lx").val();
    if (isNull(pm) || isNull(gg)) {
        // 品名、规格、必须选择
        $("#list").html("");
        queryFlag = false;
        return;
    }

    var tab = $(".kindbtn .current").attr("tab");

    var url = requestPath + "/m/createOrder/orderResourceList.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
    dataMap.pm = pm;
    dataMap.gg = gg;
	if (pm === "DTY") {
     dataMap.str03 = str03;
    }else{
	 dataMap.wzlb = wzlb;
	}
    if (!isNull(cd)) {
        dataMap.cd = cd;
    }
    dataMap.cd = cd;
    if (!isNull(cz)) {
        dataMap.cz = cz;
    } else {
        var cz2 = $("#cz2").val();
        if (!isNull(cz2)) {
            dataMap.cz = cz2;
        }
    }

    // 是否合约下单
    if($(".xdlx").css("display") != "none"){
        var xdlx = $(".xdlx .current").attr("val");
        if(!isNull(xdlx) && xdlx == "1"){
            dataMap.flag11 = $("#xdlxFlag").val();//xdlx
        }
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (isNull(d.data) || d.data.length === 0) {
            $("#list").html(template('nodata'));
        } else {
            $("#list").html(template('list_page_' + tab, d));
        }
        if(!isNull(d.amount)){
            $("#amount").html(d.amount);
        }               
    }, false, function() {
        setTimeout("$('.xdlx em').css('pointer-events','auto');",1000);
        
        queryFlag = false;
    });
}

var saveFlag = false;

var focusList = [];
function saveShopping(gpls, wzid, depid, salesType, pm, str02) {
	var focusObject = {"gpls":gpls,"wzid":wzid,"depid":depid,"salesType":salesType};
    if ($("#" + gpls).hasClass("current")) {
        if(!isNull(focusList)){
            var same = false;
            for(var i=0;i<focusList.length;i++){
                if(!isNull(focusList[i])){
                    if(focusList[i].gpls == gpls){
                        focusList.splice(i,1);
                        same = true;
                        break;
                    }
                }
            }
        }else{
            focusList = [];
        }
        deleteShopping(gpls, wzid, depid, salesType);
        return;
    }
    if(!isNull(focusList)){
        var same = false;
        for(var i=0;i<focusList.length;i++){
            if(!isNull(focusList[i])){
                if(focusList[i].gpls == gpls){
                    focusList.splice(i,1);
                    same = true;
                    break;
                }
            }
        }
        if(!same){
            focusList[focusList.length] = focusObject;
        }
    }else{
        focusList = [];
        focusList[0] = focusObject;
    }
    if(pm=='POY' && str02 == '车丝'){
        confirmMsg("该物资属于车丝，确定加入购物车吗?", function() {
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
            dataMap.orderType = "0";
			dataMap.language=i18nLanguage;
            var customerId = $("#customerId").val();
            if (!isNull(customerId)) {
                dataMap.customerId = customerId;
            }
            // 是否合约下单
            if($(".xdlx").css("display") != "none"){
                var xdlx = $(".xdlx .current").attr("val");
                if(!isNull(xdlx) && xdlx == "1"){
                    dataMap.flag11 = xdlx;//$("#xdlxFlag").val()
                }
            }
            
            $.ajaxjsonp(url, dataMap, function(data) {
                $("#" + gpls).addClass("current");
                var d = eval(data);
                if(!isNull(d.amount)){
                    $("#amount").html(d.amount);
                }  
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
        dataMap.gpls = gpls;
        dataMap.wzid = wzid;
        dataMap.depid = depid;
        dataMap.salesType = salesType;
        dataMap.orderType = "0";
		dataMap.language=i18nLanguage;
        var customerId = $("#customerId").val();
        if (!isNull(customerId)) {
            dataMap.customerId = customerId;
        }
        // 是否合约下单
        if($(".xdlx").css("display") != "none"){
            var xdlx = $(".xdlx .current").attr("val");
            if(!isNull(xdlx) && xdlx == "1"){
                dataMap.flag11 = $("#xdlxFlag").val();//xdlx
            }
        }
        
        $.ajaxjsonp(url, dataMap, function(data) {
            $("#" + gpls).addClass("current");
            var d = eval(data);
            if(!isNull(d.amount)){
                $("#amount").html(d.amount);
            }  
        scanShopping(d.data);//记录商品添加到购物车操作
        }, false, function() {
            saveFlag = false;
        });
    }
    
}

function deleteShopping(gpls, wzid, depid, salesType) {
    var dataMap = {};
    dataMap.gpls = gpls;
    dataMap.wzid = wzid;
    dataMap.depid = depid;
    dataMap.salesType = salesType;
    dataMap.language=i18nLanguage;
    var customerId = $("#customerId").val();
    if (!isNull(customerId)) {
        dataMap.customerId = customerId;
    }
    var url = requestPath + "/m/shopping/deleteShopping.htm";
    $.ajaxjsonp(url, dataMap, function(data) {
        $("#" + gpls).removeClass("current");
        var d = eval(data);
        if(!isNull(d.amount)){
            $("#amount").html(d.amount);
        }  
    });
}

function bindParam(pm){
    var pmStr = '';
    if(pm == '切片'){
        pmStr = "qiepian";
    }
    else if(pm == '锦纶切片'){
        pmStr = "jinlunqiepian";
    }
    else if(pm == '短纤'){
        pmStr = "duanxian";
    }else{
        pmStr = pm;
    }
        // 当前选中的
        var currentText = "12";
        // 这次选中的
        var thisText = pm;
        if (currentText === thisText) {
            // 不处理
            return;
        }
        if (thisText === "切片") {
            $("#pm").val("切片");

        } else {
            $("#pm").val(thisText);
            console.log("这里设置品名"+thisText);
        }
        if (thisText === "切片" || thisText === "锦纶切片") {
            $("#czxl1").hide();
            $("#czxl2").show();

        } else {
            $("#czxl1").show();
            $("#czxl2").hide();

        }
      
        $(".kindbtn li").removeClass("current");

        $("#"+pmStr).addClass("current");
        // 清空规格、批号、等级
        //$("#cz2").val("");
        $("#cd").val("");
        $("#sz").val("");
        $("#lx").val("");
        var tab = $("#"+pmStr).attr("tab");
        $(".formtil").hide();
        $(".formtil_" + tab).show();
        $("#list").html("");
        $("#list").removeClass("tab_a").removeClass("tab_b").removeClass("tab_c").addClass("tab_" + tab);
        setTimeout(function(){
            getGgData();
            getCdList();
        },1000);
        if (thisText === "DTY") {
            console.log($("#pm").val()+".....55555");
             setTimeout(function(){
                getSzList();
        },1000);
             $("#szxl").show();
             $("#lxxl").hide();
            var  xdlxFlag= $("#xdlxFlag").val();
            if(xdlxFlag=="1"||xdlxFlag=="2"){
             $("#wx_main").css("top", "330px");
             }else{
             $("#wx_main").css("top", "283px");
             }
            
        }else if(thisText === "POY"||thisText === "FDY"){
             setTimeout(function(){
             getLxList();
            },1000);
             var  xdlxFlag= $("#xdlxFlag").val();
            if(xdlxFlag=="1"||xdlxFlag=="2"){
             $("#wx_main").css("top", "330px");
             }else{
             $("#wx_main").css("top", "283px");
             }
             $("#lxxl").show();
             $("#szxl").hide();
        }else{
            var  xdlxFlag= $("#xdlxFlag").val();
            if(xdlxFlag=="1"||xdlxFlag=="2"){
             $("#wx_main").css("top", "283px");
             }else{
             $("#wx_main").css("top", "236px");
             }
             $("#lxxl").hide();
             $("#szxl").hide();
        }

        displayTreaty();

        // setTimeout(function() {
        //     var pm = $("#pm").val();
        //     if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
        //         getCz2List();
        //     }
        //         getCdList();
        //     if($("#pm").val() === "DTY"){
        //         getSzList();}
        //     if($("#pm").val() === "POY"||$("#pm").val() === "FDY"){
        //         getLxList();
        //      }
        // }, 10);
        queryData();
    }
//批量关注
    function doFocus(){
        $("#dofocus").css("pointer-events","none");
        if(focusList!=null && focusList.length>0){
            var dataMap = {};
            dataMap.focusList = JSON.stringify(focusList);
            var url = requestPath + "/m/resource/doFocus.htm";
            $.ajaxjsonp(url, dataMap, function(data) {
                var d = eval(data);
                showMessage("添加收藏成功"); 
            },false,function(){
                setTimeout("$('#dofocus').css('pointer-events','auto');",1000);
                
            });
        }else{
            showMessage("请选择至少一个商品!");
                setTimeout("$('#dofocus').css('pointer-events','auto');",500);
        }
    }