$(function() {
	var position = $("#position").val();
	if(isNull(position) || position == "4"){
		$("#zizhu").hide();
	}else{
		$("#zizhu").show();
	}
      if((position==0||position==1)&&$("#mboptApplyCount").val()>0){ //操作员申请数量
       
            $("#mboptApplyEm").html($("#mboptApplyCount").val());
        
      }else{
        $("#mboptApplyEm").hide();
      }
      
        if($("#registerCount").val()>0){
          //待分配客户数量
          $("#registerEm").html($("#registerCount").val());
        }

	  queryData();
});

var clickFlag = false; // 是否允许点击， false 不允许， true 允许
var isLogin = false; // 是否登录， false未登录， true 已登录
function queryData() {
    var url = requestPath + "/m/login/getUserInfo.htm";
    var dataMap = {};
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if (isNull(d.user)) {
            // 未登陆
            /*
            $("#name").html("登录/注册");
            $("#photo").attr("onclick", "toLogin()");
            $("#name").attr("onclick", "toLogin()");
            */
            //直接到登录页面
            toLogin();
            return false;
        } else {
            isLogin = true;
           	var flag03 =  d.user.flag03;
            if (!isNull(flag03) && flag03 != 0) {
                $("#mkt").show();
            } 	
            
        }
    }, false, function(){
        clickFlag = true;
    });
}


// 会员档案
function menberList(){    
    var userid = $("#userid").val();
    openPage("会员档案", "../newmenber/menberList.html?userid="+userid, "1");
}

// 会员等级
function menberLevelList(){    
    openPage("会员等级", "../salesman/menberLevelList.html", "1");
}

//客户维护
function menberMaintenance(){
	var userid = $("#userid").val();
	openPage("客户维护", "../salesman/menberMaintenanceList.html?userid="+userid, "1");
}
//MKX客户信息
function menberMKT(){
	var userid = $("#userid").val();
	openPage("MKX客户信息", "../salesman/menberMKTList.html?userid="+userid, "1");
}
//自主注册客户
function menberZizhuzhuce(){
    var userid = $("#userid").val();
    var position = $("#position").val();
    if(!isNull(position)){
        if(position == "1" || position == "0"){
                openPage("自主注册客户", "../salesman/menberManagerLeader.html?userid="+userid, "1");
        }
        if(position == "2"){
                openPage("自主注册客户", "../salesman/menberManagerSalesman.html?userid="+userid, "1");
        }
        if(position == "4"){
            showMessage("您无权限操作");
        }
    }else{
        showMessage("您无权限操作");
    }
}
//操作员申请
function mboptApply(){
	var userid = $("#userid").val();
	var position = $("#position").val();
	if(!isNull(position)){
		if(position == "1" || position == "0" || position == "2"){
				openPage("操作员申请", "../salesman/mboptApply.html?userid="+userid+"&position="+position, "1");
		}
		if(position == "4"){
			showMessage("您无权限操作");
		}
	}else{
		showMessage("您无权限操作");
	}
}
function reportServer(){
    openPage("客户贴息查询", "http://bi.hengyi.com:8080/WebReport8/ReportServer?reportlet=zj_tiexijisuan_single4.cpt&op=write", "1");
}