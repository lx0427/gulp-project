$(function() {
	var pkid = $("#pkid").val();
	if (!isNull(pkid)) {
		$("#parentid").val(pkid);
	}

	queryData();
	//正式打开注释
	$(".rule22").show();
   //正式打开注释
  	var bz = false;
	//ready权限验证 --正确就得到微信经纬度  
	wx.ready(function() {
		wx.getLocation({  
			success : function(res) {  
				var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90  
				var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				times = Date.parse(new Date());
				bz = true; 
				console.log("i am first!");
				submitOrderInfoClick(latitude,longitude); 
				
			},  
			cancel : function(res) {  
				alert('用户拒绝授权获取地理位置');  
			}  
		}); 
	});  
	wx.error(function(res) {  
		alert("验证出错"+res.errMsg);  
	}); 
		
		//5s后执行countHs方法
		setTimeout(function(){
			if (!bz) {
				countHs();
			}
		},5000);
	
	//微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法 
	window.addEventListener("resize", function () {
		if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
			window.setTimeout(function () {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	});

	//times = Date.parse(new Date());
 	//submitOrderInfoClick("30.2931688190","120.0446569920");
});

var pmId = "informationSources";
var ggId = "materialGg";

var times;
var stopExec = false;//停止获取地址（超时了）
function countHs() {
	console.log("countHs is running!");
	var t = Date.parse(new Date());
	var errormsg = " <div class='i_spinner'><span>未获取到当前地理位置，请打开GPS定位服务和微信定位权限，重新获取</span></div>";
	while (true) {
		var placeInfo = $("#placeInfo").val();
		if (!isNull(placeInfo)) {
			return false;
		}
		
		if ((Date.parse(new Date()) - t) > 5000) {//超过10s
			$(".rule22").show();
	  $(".pop-up-main").html(errormsg);
	  stopExec = true;
			return false;
		}
	}
}

function queryData() {
        // 首次合作
        $("#firstCooperationTime").calendar({
            toolbarCloseText: ""
        });

        //客户类型
		$("#customerType span").bind("click", function() {
			$("#customerType .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
			var customerTypeStr = $(this).text();

			if(customerTypeStr=="老客户"){
				$("#oldCustomer").css("display","block");
				$("#newCustomer").css("display","none");
				$("#informationSourcesDiv").css("display","block");
				customerType=1;
			}
			if(customerTypeStr=="新客户"){
				$("#newCustomer").css("display","block");
				$("#oldCustomer").css("display","none");
				$("#informationSourcesDiv").css("display","none");
				customerType=0;
			}

			if(customerTypeStr=="老客户"){
				var productline = $("#informationSources span.cpx_label_checked").text();
				if(productline=="POY"){
					$("#machineType1").removeClass("hideStyle");
					$("#machineType1").addClass("showStyle");
					$("#machineType2").removeClass("showStyle");
					$("#machineType2").addClass("hideStyle");
					$("#machineType3").removeClass("showStyle");
					$("#machineType3").addClass("hideStyle");
					$("#machineType4").removeClass("showStyle");
					$("#machineType4").addClass("hideStyle");

					$("#competitor1").removeClass("hideStyle");
					$("#competitor1").addClass("showStyle");
					$("#competitor2").removeClass("showStyle");
					$("#competitor2").addClass("hideStyle");
					$("#competitor3").removeClass("showStyle");
					$("#competitor3").addClass("hideStyle");
					$("#competitor4").removeClass("showStyle");
					$("#competitor4").addClass("hideStyle");

					$("#downstreamMarket1").removeClass("hideStyle");
					$("#downstreamMarket1").addClass("showStyle");
					$("#downstreamMarket2").removeClass("showStyle");
					$("#downstreamMarket2").addClass("hideStyle");
					$("#downstreamMarket3").removeClass("showStyle");
					$("#downstreamMarket3").addClass("hideStyle");
					$("#downstreamMarket4").removeClass("showStyle");
					$("#downstreamMarket4").addClass("hideStyle");
					$("#downstreamMarket5").removeClass("showStyle");
					$("#downstreamMarket5").addClass("hideStyle");
				}
				if(productline=="DTY" || productline=="FDY"){
					$("#machineType1").removeClass("showStyle");
					$("#machineType1").addClass("hideStyle");
					$("#machineType2").removeClass("hideStyle");
					$("#machineType2").addClass("showStyle");
					$("#machineType3").removeClass("showStyle");
					$("#machineType3").addClass("hideStyle");
					$("#machineType4").removeClass("showStyle");
					$("#machineType4").addClass("hideStyle");

					$("#competitor1").removeClass("hideStyle");
					$("#competitor1").addClass("showStyle");
					$("#competitor2").removeClass("showStyle");
					$("#competitor2").addClass("hideStyle");
					$("#competitor3").removeClass("showStyle");
					$("#competitor3").addClass("hideStyle");
					$("#competitor4").removeClass("showStyle");
					$("#competitor4").addClass("hideStyle");

					$("#downstreamMarket1").removeClass("showStyle");
					$("#downstreamMarket1").addClass("hideStyle");
					$("#downstreamMarket2").removeClass("hideStyle");
					$("#downstreamMarket2").addClass("showStyle");
					$("#downstreamMarket3").removeClass("showStyle");
					$("#downstreamMarket3").addClass("hideStyle");
					$("#downstreamMarket4").removeClass("showStyle");
					$("#downstreamMarket4").addClass("hideStyle");
					$("#downstreamMarket5").removeClass("showStyle");
					$("#downstreamMarket5").addClass("hideStyle");
				}
				if(productline=="涤纶切片"){
					$("#machineType1").removeClass("showStyle");
					$("#machineType1").addClass("hideStyle");
					$("#machineType2").removeClass("hideStyle");
					$("#machineType2").addClass("showStyle");
					$("#machineType3").removeClass("hideStyle");
					$("#machineType3").addClass("showStyle");
					$("#machineType4").removeClass("showStyle");
					$("#machineType4").addClass("hideStyle");

					$("#competitor1").removeClass("showStyle");
					$("#competitor1").addClass("hideStyle");
					$("#competitor2").removeClass("hideStyle");
					$("#competitor2").addClass("showStyle");
					$("#competitor3").removeClass("showStyle");
					$("#competitor3").addClass("hideStyle");
					$("#competitor4").removeClass("showStyle");
					$("#competitor4").addClass("hideStyle");

					$("#downstreamMarket1").removeClass("showStyle");
					$("#downstreamMarket1").addClass("hideStyle");
					$("#downstreamMarket2").removeClass("showStyle");
					$("#downstreamMarket2").addClass("hideStyle");
					$("#downstreamMarket3").removeClass("hideStyle");
					$("#downstreamMarket3").addClass("showStyle");
					$("#downstreamMarket4").removeClass("showStyle");
					$("#downstreamMarket4").addClass("hideStyle");
					$("#downstreamMarket5").removeClass("showStyle");
					$("#downstreamMarket5").addClass("hideStyle");
				}
				if(productline=="锦纶切片"){
					$("#machineType1").removeClass("showStyle");
					$("#machineType1").addClass("hideStyle");
					$("#machineType2").removeClass("hideStyle");
					$("#machineType2").addClass("showStyle");
					$("#machineType3").removeClass("hideStyle");
					$("#machineType3").addClass("showStyle");
					$("#machineType4").removeClass("showStyle");
					$("#machineType4").addClass("hideStyle");

					$("#competitor1").removeClass("showStyle");
					$("#competitor1").addClass("hideStyle");
					$("#competitor2").removeClass("showStyle");
					$("#competitor2").addClass("hideStyle");
					$("#competitor3").removeClass("hideStyle");
					$("#competitor3").addClass("showStyle");
					$("#competitor4").removeClass("showStyle");
					$("#competitor4").addClass("hideStyle");

					$("#downstreamMarket1").removeClass("showStyle");
					$("#downstreamMarket1").addClass("hideStyle");
					$("#downstreamMarket2").removeClass("showStyle");
					$("#downstreamMarket2").addClass("hideStyle");
					$("#downstreamMarket3").removeClass("showStyle");
					$("#downstreamMarket3").addClass("hideStyle");
					$("#downstreamMarket4").removeClass("hideStyle");
					$("#downstreamMarket4").addClass("showStyle");
					$("#downstreamMarket5").removeClass("showStyle");
					$("#downstreamMarket5").addClass("hideStyle");
				}
				if(productline=="短纤"){
					$("#machineType1").removeClass("showStyle");
					$("#machineType1").addClass("hideStyle");
					$("#machineType2").removeClass("hideStyle");
					$("#machineType2").addClass("showStyle");
					$("#machineType3").removeClass("showStyle");
					$("#machineType3").addClass("hideStyle");
					$("#machineType4").removeClass("hideStyle");
					$("#machineType4").addClass("showStyle");

					$("#competitor1").removeClass("showStyle");
					$("#competitor1").addClass("hideStyle");
					$("#competitor2").removeClass("showStyle");
					$("#competitor2").addClass("hideStyle");
					$("#competitor3").removeClass("showStyle");
					$("#competitor3").addClass("hideStyle");
					$("#competitor4").removeClass("hideStyle");
					$("#competitor4").addClass("showStyle");

					$("#downstreamMarket1").removeClass("showStyle");
					$("#downstreamMarket1").addClass("hideStyle");
					$("#downstreamMarket2").removeClass("showStyle");
					$("#downstreamMarket2").addClass("hideStyle");
					$("#downstreamMarket3").removeClass("showStyle");
					$("#downstreamMarket3").addClass("hideStyle");
					$("#downstreamMarket4").removeClass("showStyle");
					$("#downstreamMarket4").addClass("hideStyle");
					$("#downstreamMarket5").removeClass("hideStyle");
					$("#downstreamMarket5").addClass("showStyle");
				}
			}

//新客户
			if(customerTypeStr=="新客户"){
				var productline = $("#informationSourcesN_0 span.cpx_label_checked").text();
				if(productline=="POY"){
					$("#machineType1N_0").removeClass("hideStyle");
					$("#machineType1N_0").addClass("showStyle");
					$("#machineType2N_0").removeClass("showStyle");
					$("#machineType2N_0").addClass("hideStyle");
					$("#machineType3N_0").removeClass("showStyle");
					$("#machineType3N_0").addClass("hideStyle");
					$("#machineType4N_0").removeClass("showStyle");
					$("#machineType4N_0").addClass("hideStyle");

					$("#competitor1N_0").removeClass("hideStyle");
					$("#competitor1N_0").addClass("showStyle");
					$("#competitor2N_0").removeClass("showStyle");
					$("#competitor2N_0").addClass("hideStyle");
					$("#competitor3N_0").removeClass("showStyle");
					$("#competitor3N_0").addClass("hideStyle");
					$("#competitor4N_0").removeClass("showStyle");
					$("#competitor4N_0").addClass("hideStyle");

					$("#downstreamMarket1N_0").removeClass("hideStyle");
					$("#downstreamMarket1N_0").addClass("showStyle");
					$("#downstreamMarket2N_0").removeClass("showStyle");
					$("#downstreamMarket2N_0").addClass("hideStyle");
					$("#downstreamMarket3N_0").removeClass("showStyle");
					$("#downstreamMarket3N_0").addClass("hideStyle");
					$("#downstreamMarket4N_0").removeClass("showStyle");
					$("#downstreamMarket4N_0").addClass("hideStyle");
					$("#downstreamMarket5N_0").removeClass("showStyle");
					$("#downstreamMarket5N_0").addClass("hideStyle");
				}
				if(productline=="DTY" || productline=="FDY"){
					$("#machineType1N_0").removeClass("showStyle");
					$("#machineType1N_0").addClass("hideStyle");
					$("#machineType2N_0").removeClass("hideStyle");
					$("#machineType2N_0").addClass("showStyle");
					$("#machineType3N_0").removeClass("showStyle");
					$("#machineType3N_0").addClass("hideStyle");
					$("#machineType4N_0").removeClass("showStyle");
					$("#machineType4N_0").addClass("hideStyle");

					$("#competitor1N_0").removeClass("hideStyle");
					$("#competitor1N_0").addClass("showStyle");
					$("#competitor2N_0").removeClass("showStyle");
					$("#competitor2N_0").addClass("hideStyle");
					$("#competitor3N_0").removeClass("showStyle");
					$("#competitor3N_0").addClass("hideStyle");
					$("#competitor4N_0").removeClass("showStyle");
					$("#competitor4N_0").addClass("hideStyle");

					$("#downstreamMarket1N_0").removeClass("showStyle");
					$("#downstreamMarket1N_0").addClass("hideStyle");
					$("#downstreamMarket2N_0").removeClass("hideStyle");
					$("#downstreamMarket2N_0").addClass("showStyle");
					$("#downstreamMarket3N_0").removeClass("showStyle");
					$("#downstreamMarket3N_0").addClass("hideStyle");
					$("#downstreamMarket4N_0").removeClass("showStyle");
					$("#downstreamMarket4N_0").addClass("hideStyle");
					$("#downstreamMarket5N_0").removeClass("showStyle");
					$("#downstreamMarket5N_0").addClass("hideStyle");
				}
				if(productline=="涤纶切片"){
					$("#machineType1N_0").removeClass("showStyle");
					$("#machineType1N_0").addClass("hideStyle");
					$("#machineType2N_0").removeClass("showStyle");
					$("#machineType2N_0").addClass("hideStyle");
					$("#machineType3N_0").removeClass("hideStyle");
					$("#machineType3N_0").addClass("showStyle");
					$("#machineType4N_0").removeClass("showStyle");
					$("#machineType4N_0").addClass("hideStyle");

					$("#competitor1N_0").removeClass("showStyle");
					$("#competitor1N_0").addClass("hideStyle");
					$("#competitor2N_0").removeClass("hideStyle");
					$("#competitor2N_0").addClass("showStyle");
					$("#competitor3N_0").removeClass("showStyle");
					$("#competitor3N_0").addClass("hideStyle");
					$("#competitor4N_0").removeClass("showStyle");
					$("#competitor4N_0").addClass("hideStyle");

					$("#downstreamMarket1N_0").removeClass("showStyle");
					$("#downstreamMarket1N_0").addClass("hideStyle");
					$("#downstreamMarket2N_0").removeClass("showStyle");
					$("#downstreamMarket2N_0").addClass("hideStyle");
					$("#downstreamMarket3N_0").removeClass("hideStyle");
					$("#downstreamMarket3N_0").addClass("showStyle");
					$("#downstreamMarket4N_0").removeClass("showStyle");
					$("#downstreamMarket4N_0").addClass("hideStyle");
					$("#downstreamMarket5N_0").removeClass("showStyle");
					$("#downstreamMarket5N_0").addClass("hideStyle");
				}
				if(productline=="锦纶切片"){
					$("#machineType1N_0").removeClass("showStyle");
					$("#machineType1N_0").addClass("hideStyle");
					$("#machineType2N_0").removeClass("showStyle");
					$("#machineType2N_0").addClass("hideStyle");
					$("#machineType3N_0").removeClass("hideStyle");
					$("#machineType3N_0").addClass("showStyle");
					$("#machineType4N_0").removeClass("showStyle");
					$("#machineType4N_0").addClass("hideStyle");

					$("#competitor1N_0").removeClass("showStyle");
					$("#competitor1N_0").addClass("hideStyle");
					$("#competitor2N_0").removeClass("showStyle");
					$("#competitor2N_0").addClass("hideStyle");
					$("#competitor3N_0").removeClass("hideStyle");
					$("#competitor3N_0").addClass("showStyle");
					$("#competitor4N_0").removeClass("showStyle");
					$("#competitor4N_0").addClass("hideStyle");

					$("#downstreamMarket1N_0").removeClass("showStyle");
					$("#downstreamMarket1N_0").addClass("hideStyle");
					$("#downstreamMarket2N_0").removeClass("showStyle");
					$("#downstreamMarket2N_0").addClass("hideStyle");
					$("#downstreamMarket3N_0").removeClass("showStyle");
					$("#downstreamMarket3N_0").addClass("hideStyle");
					$("#downstreamMarket4N_0").removeClass("hideStyle");
					$("#downstreamMarket4N_0").addClass("showStyle");
					$("#downstreamMarket5N_0").removeClass("showStyle");
					$("#downstreamMarket5N_0").addClass("hideStyle");
				}
				if(productline=="短纤"){
					$("#machineType1N_0").removeClass("showStyle");
					$("#machineType1N_0").addClass("hideStyle");
					$("#machineType2N_0").removeClass("showStyle");
					$("#machineType2N_0").addClass("hideStyle");
					$("#machineType3N_0").removeClass("showStyle");
					$("#machineType3N_0").addClass("hideStyle");
					$("#machineType4N_0").removeClass("hideStyle");
					$("#machineType4N_0").addClass("showStyle");

					$("#competitor1N_0").removeClass("showStyle");
					$("#competitor1N_0").addClass("hideStyle");
					$("#competitor2N_0").removeClass("showStyle");
					$("#competitor2N_0").addClass("hideStyle");
					$("#competitor3N_0").removeClass("showStyle");
					$("#competitor3N_0").addClass("hideStyle");
					$("#competitor4N_0").removeClass("hideStyle");
					$("#competitor4N_0").addClass("showStyle");

					$("#downstreamMarket1N_0").removeClass("showStyle");
					$("#downstreamMarket1N_0").addClass("hideStyle");
					$("#downstreamMarket2N_0").removeClass("showStyle");
					$("#downstreamMarket2N_0").addClass("hideStyle");
					$("#downstreamMarket3N_0").removeClass("showStyle");
					$("#downstreamMarket3N_0").addClass("hideStyle");
					$("#downstreamMarket4N_0").removeClass("showStyle");
					$("#downstreamMarket4N_0").addClass("hideStyle");
					$("#downstreamMarket5N_0").removeClass("hideStyle");
					$("#downstreamMarket5N_0").addClass("showStyle");
				}
			}
		});

		//产品线选择事件, 老客户才有产品线
		$("#informationSources span").bind("click", function() {
			$("#informationSources .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
			var productline = $(this).text();
			if(productline=="POY"){
				$("#machineType1").removeClass("hideStyle");
				$("#machineType1").addClass("showStyle");
				$("#machineType2").removeClass("showStyle");
				$("#machineType2").addClass("hideStyle");
				$("#machineType3").removeClass("showStyle");
				$("#machineType3").addClass("hideStyle");
				$("#machineType4").removeClass("showStyle");
				$("#machineType4").addClass("hideStyle");

				$("#competitor1").removeClass("hideStyle");
				$("#competitor1").addClass("showStyle");
				$("#competitor2").removeClass("showStyle");
				$("#competitor2").addClass("hideStyle");
				$("#competitor3").removeClass("showStyle");
				$("#competitor3").addClass("hideStyle");
				$("#competitor4").removeClass("showStyle");
				$("#competitor4").addClass("hideStyle");

				$("#downstreamMarket1").removeClass("hideStyle");
				$("#downstreamMarket1").addClass("showStyle");
				$("#downstreamMarket2").removeClass("showStyle");
				$("#downstreamMarket2").addClass("hideStyle");
				$("#downstreamMarket3").removeClass("showStyle");
				$("#downstreamMarket3").addClass("hideStyle");
				$("#downstreamMarket4").removeClass("showStyle");
				$("#downstreamMarket4").addClass("hideStyle");
				$("#downstreamMarket5").removeClass("showStyle");
				$("#downstreamMarket5").addClass("hideStyle");
			}
			if(productline=="DTY" || productline=="FDY"){
				$("#machineType1").removeClass("showStyle");
				$("#machineType1").addClass("hideStyle");
				$("#machineType2").removeClass("hideStyle");
				$("#machineType2").addClass("showStyle");
				$("#machineType3").removeClass("showStyle");
				$("#machineType3").addClass("hideStyle");
				$("#machineType4").removeClass("showStyle");
				$("#machineType4").addClass("hideStyle");

				$("#competitor1").removeClass("hideStyle");
				$("#competitor1").addClass("showStyle");
				$("#competitor2").removeClass("showStyle");
				$("#competitor2").addClass("hideStyle");
				$("#competitor3").removeClass("showStyle");
				$("#competitor3").addClass("hideStyle");
				$("#competitor4").removeClass("showStyle");
				$("#competitor4").addClass("hideStyle");

				$("#downstreamMarket1").removeClass("showStyle");
				$("#downstreamMarket1").addClass("hideStyle");
				$("#downstreamMarket2").removeClass("hideStyle");
				$("#downstreamMarket2").addClass("showStyle");
				$("#downstreamMarket3").removeClass("showStyle");
				$("#downstreamMarket3").addClass("hideStyle");
				$("#downstreamMarket4").removeClass("showStyle");
				$("#downstreamMarket4").addClass("hideStyle");
				$("#downstreamMarket5").removeClass("showStyle");
				$("#downstreamMarket5").addClass("hideStyle");
			}
			if(productline=="涤纶切片"){
				$("#machineType1").removeClass("showStyle");
				$("#machineType1").addClass("hideStyle");
				$("#machineType2").removeClass("showStyle");
				$("#machineType2").addClass("hideStyle");
				$("#machineType3").removeClass("hideStyle");
				$("#machineType3").addClass("showStyle");
				$("#machineType4").removeClass("showStyle");
				$("#machineType4").addClass("hideStyle");

				$("#competitor1").removeClass("showStyle");
				$("#competitor1").addClass("hideStyle");
				$("#competitor2").removeClass("hideStyle");
				$("#competitor2").addClass("showStyle");
				$("#competitor3").removeClass("showStyle");
				$("#competitor3").addClass("hideStyle");
				$("#competitor4").removeClass("showStyle");
				$("#competitor4").addClass("hideStyle");

				$("#downstreamMarket1").removeClass("showStyle");
				$("#downstreamMarket1").addClass("hideStyle");
				$("#downstreamMarket2").removeClass("showStyle");
				$("#downstreamMarket2").addClass("hideStyle");
				$("#downstreamMarket3").removeClass("hideStyle");
				$("#downstreamMarket3").addClass("showStyle");
				$("#downstreamMarket4").removeClass("showStyle");
				$("#downstreamMarket4").addClass("hideStyle");
				$("#downstreamMarket5").removeClass("showStyle");
				$("#downstreamMarket5").addClass("hideStyle");
			}
			if(productline=="锦纶切片"){
				$("#machineType1").removeClass("showStyle");
				$("#machineType1").addClass("hideStyle");
				$("#machineType2").removeClass("showStyle");
				$("#machineType2").addClass("hideStyle");
				$("#machineType3").removeClass("hideStyle");
				$("#machineType3").addClass("showStyle");
				$("#machineType4").removeClass("showStyle");
				$("#machineType4").addClass("hideStyle");

				$("#competitor1").removeClass("showStyle");
				$("#competitor1").addClass("hideStyle");
				$("#competitor2").removeClass("showStyle");
				$("#competitor2").addClass("hideStyle");
				$("#competitor3").removeClass("hideStyle");
				$("#competitor3").addClass("showStyle");
				$("#competitor4").removeClass("showStyle");
				$("#competitor4").addClass("hideStyle");

				$("#downstreamMarket1").removeClass("showStyle");
				$("#downstreamMarket1").addClass("hideStyle");
				$("#downstreamMarket2").removeClass("showStyle");
				$("#downstreamMarket2").addClass("hideStyle");
				$("#downstreamMarket3").removeClass("showStyle");
				$("#downstreamMarket3").addClass("hideStyle");
				$("#downstreamMarket4").removeClass("hideStyle");
				$("#downstreamMarket4").addClass("showStyle");
				$("#downstreamMarket5").removeClass("showStyle");
				$("#downstreamMarket5").addClass("hideStyle");
			}
			if(productline=="短纤"){
				$("#machineType1").removeClass("showStyle");
				$("#machineType1").addClass("hideStyle");
				$("#machineType2").removeClass("showStyle");
				$("#machineType2").addClass("hideStyle");
				$("#machineType3").removeClass("showStyle");
				$("#machineType3").addClass("hideStyle");
				$("#machineType4").removeClass("hideStyle");
				$("#machineType4").addClass("showStyle");

				$("#competitor1").removeClass("showStyle");
				$("#competitor1").addClass("hideStyle");
				$("#competitor2").removeClass("showStyle");
				$("#competitor2").addClass("hideStyle");
				$("#competitor3").removeClass("showStyle");
				$("#competitor3").addClass("hideStyle");
				$("#competitor4").removeClass("hideStyle");
				$("#competitor4").addClass("showStyle");

				$("#downstreamMarket1").removeClass("showStyle");
				$("#downstreamMarket1").addClass("hideStyle");
				$("#downstreamMarket2").removeClass("showStyle");
				$("#downstreamMarket2").addClass("hideStyle");
				$("#downstreamMarket3").removeClass("showStyle");
				$("#downstreamMarket3").addClass("hideStyle");
				$("#downstreamMarket4").removeClass("showStyle");
				$("#downstreamMarket4").addClass("hideStyle");
				$("#downstreamMarket5").removeClass("hideStyle");
				$("#downstreamMarket5").addClass("showStyle");
			}
		});

		//产品线事件, 新客户产品线
		$("#informationSourcesN_0 span").bind("click", function() {
			$("#informationSourcesN_0 .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
			var productline = $(this).text();
			if(productline=="POY"){
				$("#machineType1N_0").removeClass("hideStyle");
				$("#machineType1N_0").addClass("showStyle");
				$("#machineType2N_0").removeClass("showStyle");
				$("#machineType2N_0").addClass("hideStyle");
				$("#machineType3N_0").removeClass("showStyle");
				$("#machineType3N_0").addClass("hideStyle");
				$("#machineType4N_0").removeClass("showStyle");
				$("#machineType4N_0").addClass("hideStyle");

				$("#competitor1N_0").removeClass("hideStyle");
				$("#competitor1N_0").addClass("showStyle");
				$("#competitor2N_0").removeClass("showStyle");
				$("#competitor2N_0").addClass("hideStyle");
				$("#competitor3N_0").removeClass("showStyle");
				$("#competitor3N_0").addClass("hideStyle");
				$("#competitor4N_0").removeClass("showStyle");
				$("#competitor4N_0").addClass("hideStyle");

				$("#downstreamMarket1N_0").removeClass("hideStyle");
				$("#downstreamMarket1N_0").addClass("showStyle");
				$("#downstreamMarket2N_0").removeClass("showStyle");
				$("#downstreamMarket2N_0").addClass("hideStyle");
				$("#downstreamMarket3N_0").removeClass("showStyle");
				$("#downstreamMarket3N_0").addClass("hideStyle");
				$("#downstreamMarket4N_0").removeClass("showStyle");
				$("#downstreamMarket4N_0").addClass("hideStyle");
				$("#downstreamMarket5N_0").removeClass("showStyle");
				$("#downstreamMarket5N_0").addClass("hideStyle");
			}
			if(productline=="DTY" || productline=="FDY"){
				$("#machineType1N_0").removeClass("showStyle");
				$("#machineType1N_0").addClass("hideStyle");
				$("#machineType2N_0").removeClass("hideStyle");
				$("#machineType2N_0").addClass("showStyle");
				$("#machineType3N_0").removeClass("showStyle");
				$("#machineType3N_0").addClass("hideStyle");
				$("#machineType4N_0").removeClass("showStyle");
				$("#machineType4N_0").addClass("hideStyle");

				$("#competitor1N_0").removeClass("hideStyle");
				$("#competitor1N_0").addClass("showStyle");
				$("#competitor2N_0").removeClass("showStyle");
				$("#competitor2N_0").addClass("hideStyle");
				$("#competitor3N_0").removeClass("showStyle");
				$("#competitor3N_0").addClass("hideStyle");
				$("#competitor4N_0").removeClass("showStyle");
				$("#competitor4N_0").addClass("hideStyle");

				$("#downstreamMarket1N_0").removeClass("showStyle");
				$("#downstreamMarket1N_0").addClass("hideStyle");
				$("#downstreamMarket2N_0").removeClass("hideStyle");
				$("#downstreamMarket2N_0").addClass("showStyle");
				$("#downstreamMarket3N_0").removeClass("showStyle");
				$("#downstreamMarket3N_0").addClass("hideStyle");
				$("#downstreamMarket4N_0").removeClass("showStyle");
				$("#downstreamMarket4N_0").addClass("hideStyle");
				$("#downstreamMarket5N_0").removeClass("showStyle");
				$("#downstreamMarket5N_0").addClass("hideStyle");
			}
			if(productline=="涤纶切片"){
				$("#machineType1N_0").removeClass("showStyle");
				$("#machineType1N_0").addClass("hideStyle");
				$("#machineType2N_0").removeClass("showStyle");
				$("#machineType2N_0").addClass("hideStyle");
				$("#machineType3N_0").removeClass("hideStyle");
				$("#machineType3N_0").addClass("showStyle");
				$("#machineType4N_0").removeClass("showStyle");
				$("#machineType4N_0").addClass("hideStyle");

				$("#competitor1N_0").removeClass("showStyle");
				$("#competitor1N_0").addClass("hideStyle");
				$("#competitor2N_0").removeClass("hideStyle");
				$("#competitor2N_0").addClass("showStyle");
				$("#competitor3N_0").removeClass("showStyle");
				$("#competitor3N_0").addClass("hideStyle");
				$("#competitor4N_0").removeClass("showStyle");
				$("#competitor4N_0").addClass("hideStyle");

				$("#downstreamMarket1N_0").removeClass("showStyle");
				$("#downstreamMarket1N_0").addClass("hideStyle");
				$("#downstreamMarket2N_0").removeClass("showStyle");
				$("#downstreamMarket2N_0").addClass("hideStyle");
				$("#downstreamMarket3N_0").removeClass("hideStyle");
				$("#downstreamMarket3N_0").addClass("showStyle");
				$("#downstreamMarket4N_0").removeClass("showStyle");
				$("#downstreamMarket4N_0").addClass("hideStyle");
				$("#downstreamMarket5N_0").removeClass("showStyle");
				$("#downstreamMarket5N_0").addClass("hideStyle");
			}
			if(productline=="锦纶切片"){
				$("#machineType1N_0").removeClass("showStyle");
				$("#machineType1N_0").addClass("hideStyle");
				$("#machineType2N_0").removeClass("showStyle");
				$("#machineType2N_0").addClass("hideStyle");
				$("#machineType3N_0").removeClass("hideStyle");
				$("#machineType3N_0").addClass("showStyle");
				$("#machineType4N_0").removeClass("showStyle");
				$("#machineType4N_0").addClass("hideStyle");

				$("#competitor1N_0").removeClass("showStyle");
				$("#competitor1N_0").addClass("hideStyle");
				$("#competitor2N_0").removeClass("showStyle");
				$("#competitor2N_0").addClass("hideStyle");
				$("#competitor3N_0").removeClass("hideStyle");
				$("#competitor3N_0").addClass("showStyle");
				$("#competitor4N_0").removeClass("showStyle");
				$("#competitor4N_0").addClass("hideStyle");

				$("#downstreamMarket1N_0").removeClass("showStyle");
				$("#downstreamMarket1N_0").addClass("hideStyle");
				$("#downstreamMarket2N_0").removeClass("showStyle");
				$("#downstreamMarket2N_0").addClass("hideStyle");
				$("#downstreamMarket3N_0").removeClass("showStyle");
				$("#downstreamMarket3N_0").addClass("hideStyle");
				$("#downstreamMarket4N_0").removeClass("hideStyle");
				$("#downstreamMarket4N_0").addClass("showStyle");
				$("#downstreamMarket5N_0").removeClass("showStyle");
				$("#downstreamMarket5N_0").addClass("hideStyle");
			}
			if(productline=="短纤"){
				$("#machineType1N_0").removeClass("showStyle");
				$("#machineType1N_0").addClass("hideStyle");
				$("#machineType2N_0").removeClass("showStyle");
				$("#machineType2N_0").addClass("hideStyle");
				$("#machineType3N_0").removeClass("showStyle");
				$("#machineType3N_0").addClass("hideStyle");
				$("#machineType4N_0").removeClass("hideStyle");
				$("#machineType4N_0").addClass("showStyle");

				$("#competitor1N_0").removeClass("showStyle");
				$("#competitor1N_0").addClass("hideStyle");
				$("#competitor2N_0").removeClass("showStyle");
				$("#competitor2N_0").addClass("hideStyle");
				$("#competitor3N_0").removeClass("showStyle");
				$("#competitor3N_0").addClass("hideStyle");
				$("#competitor4N_0").removeClass("hideStyle");
				$("#competitor4N_0").addClass("showStyle");

				$("#downstreamMarket1N_0").removeClass("showStyle");
				$("#downstreamMarket1N_0").addClass("hideStyle");
				$("#downstreamMarket2N_0").removeClass("showStyle");
				$("#downstreamMarket2N_0").addClass("hideStyle");
				$("#downstreamMarket3N_0").removeClass("showStyle");
				$("#downstreamMarket3N_0").addClass("hideStyle");
				$("#downstreamMarket4N_0").removeClass("showStyle");
				$("#downstreamMarket4N_0").addClass("hideStyle");
				$("#downstreamMarket5N_0").removeClass("hideStyle");
				$("#downstreamMarket5N_0").addClass("showStyle");
			}
		});

    	//老客户设备类型
		$("#machineTypeDiv span span").bind("click", function() {
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			}else{
				$(this).addClass("cpx_label_checked");
			}
		});
		//老客户原料档次
		$("#materialGrade span").bind("click", function() {
			$("#materialGrade .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});
		//价值评估
		$("#priceEvaluate span").bind("click", function() {
			$("#priceEvaluate .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});
		//老客户竞争对手
		$("#competitorDiv span span").bind("click", function() {
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			}else{
				$(this).addClass("cpx_label_checked");
			}
		});
		//老客户下游市场
		$("#downstreamMarketDiv span span").bind("click", function() {
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			}else{
				$(this).addClass("cpx_label_checked");
			}
		});
		//市场预判
		$("#marketPrediction span").bind("click", function() {
			$("#marketPrediction .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});

		//老客户差异化标识
		$("#diffFlag span").bind("click", function() {
			$("#diffFlag .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});


		//新客户设备类型
		$("#machineTypeDivN_0 span span").bind("click", function() {
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			}else{
				$(this).addClass("cpx_label_checked");
			}
		});
		//新客户竞争对手
		$("#competitorDivN_0 span span").bind("click", function() {
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			}else{
				$(this).addClass("cpx_label_checked");
			}
		});
		//新客户下游市场
		$("#downstreamMarketDivN_0 span span").bind("click", function() {
			if($(this).hasClass("cpx_label_checked")){
				$(this).removeClass("cpx_label_checked");
			}else{
				$(this).addClass("cpx_label_checked");
			}
		});
		//新客户差异化标识
		$("#diffFlagN_0 span").bind("click", function() {
			$("#diffFlagN_0 .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});
		//新客户原料档次
		$("#materialGradeN_0 span").bind("click", function() {
			$("#materialGradeN_0 .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});
		//客户规模
		$("#customerScale span").bind("click", function() {
			$("#customerScale .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});
		//营业额
		$("#customerTurnover span").bind("click", function() {
			$("#customerTurnover .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});
		//新客户 需求产品
		$("#informationSourcesN_0 span").bind("click", function() {
			$("#informationSourcesN_0 .tslx").removeClass("cpx_label_checked");
			$(this).addClass("cpx_label_checked");
		});

		//老客户 采购规格
		$("#materialGgBottom").bind("click", function() {
			pmId = "informationSources";
			ggId = "materialGg";
		    var pm = $("#"+pmId+" span.cpx_label_checked").text();
		    if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
		        showGgPopup2();
		    } else {
		        showGgPopup();
		    }
		});

		//新客户 采购规格
		$("#materialGgBottomN_0").bind("click", function() {
			pmId = "informationSourcesN_0";
			ggId = "materialGgN_0";
		    var pm = $("#"+pmId+" span.cpx_label_checked").text();
		    if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
		        showGgPopup2();
		    } else {
		        showGgPopup();
		    }
		});
		
	//老客户市场区域
	$("#marketAreaBottom").select({
		title: "请选择",
		multi: true,
		items: ["萧绍","外贸","太仓","吴江","秀洲","湖州","海宁","桐乡","常熟","诸暨","义乌","慈溪",
		"张家港","常州","苏北","福建","广东","江西","湖北","安徽","其他(手动输入)"],
		onChange: function(d) {
			//console.info(d.values);
			if (isNull(d.values)) {
				$("#marketArea").val("");
			} else {
				$("#marketArea").val(d.values);
			}
		},
		onClose: function() {
		   
		},
		onClear: function() {
			 $("#marketArea").val("");
		}
	});
	//新客户市场区域
	$("#marketAreaBottomN_0").select({
		title: "请选择",
		multi: true,
		items: ["萧绍","外贸","太仓","吴江","秀洲","湖州","海宁","桐乡","常熟","诸暨","义乌","慈溪",
		"张家港","常州","苏北","福建","广东","江西","湖北","安徽","其他(手动输入)"],
		onChange: function(d) {
			//console.info(d.values);
			if (isNull(d.values)) {
				$("#marketAreaN_0").val("");
			} else {
				$("#marketAreaN_0").val(d.values);
			}
		},
		onClose: function() {
		   
		},
		onClear: function() {
			 $("#marketAreaN_0").val("");
		}
	});
}

function submitOrderInfoClick(a,b) {
	var url = requestPath + "/m/sapInformationReports/toGoogleStr.htm";
	$.ajaxjsonp(url, {  
			latitude : a,  
			longitude : b  
		}, function(data) {
			var d = eval(data);
			$("#placeInfo").val("");
			$("#displayPlaceInfo").html("");
			if (d.msg != "err") {
				if (d.msg != "") {
				$("#placeInfo").val(d.msg+"");
				$("#displayPlaceInfo").html(d.msg+"");
				$("#problem").removeAttr("readonly");
				$(".rule22").hide();
				// 图片上传
				$("#addImg").bind("click", function() {
					// 最多上传9张
					var len = $(".img").length;
					startUploadPics("imgCallback", 9 - len);
				});

				
			} else {
				if ((Date.parse(new Date()) - times) > 10000) {
					$(".rule22").show();
					var errormsg = " <div class='i_spinner'><span>未获取到当前地理位置，请打开GPS定位服务和微信定位权限，重新获取</span></div>";
					$(".pop-up-main").html(errormsg);
					return false;
				}
				if (stopExec) {
					return false;
				}
						wx.getLocation({  
					success : function(res) {  
						var latitude = res.latitude;
						var longitude = res.longitude;  
						submitOrderInfoClick(latitude,longitude);  
					},  
					cancel : function(res) {  
						alert('用户拒绝授权获取地理位置');  
					}  
				});
			} 
		} else {
				$(".rule22").show();
				var errormsg = " <div class='i_spinner'><span>未获取到当前地理位置，请打开GPS定位服务和微信定位权限，重新获取</span></div>";
				$(".pop-up-main").html(errormsg);
		}
	}, false, function() {
	});
}

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
var _count = 0;
function imgCallback(img) {
	var imgHtml = "<li>";
	imgHtml += "<p><img classP='img' data-src='" + img + "' src='" + filePath + img + "' index='" + _count + "' class='img_" + _count + "' onclick='imgImClick(this);' /></p>";
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
	_count ++ ;

}

function imgImClick(obj){
  var className = $(obj).attr("class");
  var index = $(obj).attr("index");
  showImgs(className, index);
}

function showImgs(className, index){
	// 先把之前的移除掉
	$(".weui-photo-browser-modal").remove();
	if(isNull(index)){
		index = 0;
	}
	// 根据样式获取图片数组
	var imgs = [];
	$("."+className).each(function(){
		imgs.push($(this).attr("src"));
	});
	var pb = $.photoBrowser({
		items:imgs,
		initIndex:index
	});
	pb.open();
}


// 初始化微信授权id
function initOauth() {
	var wxOpenid = $("#openid").val();
	if (!isNull(wxOpenid)) {
		sessionStorage.setItem("wxOpenid", wxOpenid);
	}
}
function checkValue(){
	var placeInfo = $("#placeInfo").val();
    if(isNull(placeInfo)){
        showMessage("请获取地理位置信息");
        return false;
    }
    var customerName = $("#customerName").val();
    if(isNull(customerName)){
		showMessage("请输入客户全称!");
		return false;
	}
	if(isNull(customerType)){
		showMessage("请选择客户类型!");
		return false;
	}

	if(!isNull($("#problem").val()) && $("#problem").val().length >= 500){
		showMessage("内容不超过500字符!");
		return false;
	}
	if(customerType==0){//新客户
		for(var i=0;i<=productDiv; i++){
			if(isNull($("#materialGgN_"+i).val())){
				showMessage("请输入采购规格!");
				return false;
			}
			if(isNull($("#monthlyDemandN_"+i).val())){
				showMessage("请输入月需求数量!");
				return false;
			}

			var machineTypeStr = "";
			$("#machineTypeDivN_"+i+" span.showStyle span.cpx_label_checked").each(function(){
				machineTypeStr = machineTypeStr + $(this).text();
			 });
			if(isNull(machineTypeStr)){
				showMessage("请选择至少一种设备类型!");
				return false;
			}
		}
	}
	if(customerType==1){//老客户
		if(isNull($("#materialGg").val())){
			showMessage("请输入采购规格!");
			return false;
		}
		if(isNull($("#monthlyDemand").val())){
			showMessage("请输入月需求量!");
			return false;
		}

		var machineTypeStr = "";
		$("#machineTypeDiv span.showStyle span.cpx_label_checked").each(function(){
			machineTypeStr = machineTypeStr + $(this).text();
		 });
		if(isNull(machineTypeStr)){
			showMessage("请选择至少一种设备类型!");
			return false;
		}
	}
	return true;
}

var customerType =1; //客户类型 0:新客户 1:老客户

function getDataMap() {
	var dataMap = {};    
	dataMap.wxOpenid = $("#openid").val();
	if (!isNull($("#parentid").val())) {
		dataMap.parentId = $("#parentid").val();
	}
	dataMap.placeInfo = $("#placeInfo").val();
	dataMap.customerName = $("#customerName").val();
	dataMap.customerType=customerType;
	dataMap.problem=$("#problem").val();//备注
	if(customerType==0){//新客户
		dataMap.linkman = $("#linkman").val();
		dataMap.positionInfo = $("#positionInfo").val();
		dataMap.telphoneNumble = $("#telphoneNumble").val();
		dataMap.customerScale = $("#customerScale span.cpx_label_checked").text();
		dataMap.customerTurnover = $("#customerTurnover span.cpx_label_checked").text();
		dataMap.jsonstring = getJsonString();
	}else{//老客户
		dataMap.informationSources = $("#informationSources span.cpx_label_checked").text();

		var machineTypeStr = "";
		$("#machineTypeDiv span.showStyle span.cpx_label_checked").each(function(){
			machineTypeStr = machineTypeStr + $(this).text() + ", ";
		 });
		dataMap.machineType = machineTypeStr.substring(0, machineTypeStr.length-2);//设备类型
		dataMap.materialGg = $("#materialGg").val();
		dataMap.monthlyDemand = $("#monthlyDemand").val();
		dataMap.materialGrade = $("#materialGrade span.cpx_label_checked").text();
		dataMap.priceEvaluate = $("#priceEvaluateDiv span span.cpx_label_checked").text();

		var competitorStr = "";
		$("#competitorDiv span.showStyle span.cpx_label_checked").each(function(){
			competitorStr = competitorStr + $(this).text() + ", ";
		 });
		dataMap.competitor = competitorStr.substring(0, competitorStr.length-2);

		var downstreamMarketStr = "";
		$("#downstreamMarketDiv span.showStyle span.cpx_label_checked").each(function(){
			downstreamMarketStr = downstreamMarketStr + $(this).text() + ", ";
		 });
		dataMap.downstreamMarket = downstreamMarketStr.substring(0, downstreamMarketStr.length-2);

		dataMap.marketPrediction = $("#marketPrediction span.cpx_label_checked").text();//市场预判
		dataMap.diffFlag = $("#diffFlag span.cpx_label_checked").text();//差异化属性
		dataMap.machineNum = $("#machineNum").val();
		dataMap.marketArea = $("#marketArea").val();
		dataMap.productInventory = $("#productInventory").val();
	}

	// 上传图片
	var complaintImages = "";
	$("img[classP='img']").each(function() {
		complaintImages += "," + $(this).attr("data-src");
	});
	if (!isNull(complaintImages)) {
		complaintImages = complaintImages.substring(1);
	}
	dataMap.uploadAppendageAddress = complaintImages;
	return dataMap;
}

function removeInputBlur() {
	$('input,textarea').each(function() {
		$(this).blur();
	});
}

var editFlag = false;
function saveVistAddress() {
	if (!checkValue()) {
		return false;
	}
	if (editFlag) {
		return false;
	}
	editFlag = true;
	
	var dataMap = getDataMap ();
	if (isNull(dataMap)) {
		editFlag = false;
		return false;
	}
	console.info(dataMap);
	//return false;
	var url = requestPath + "/m/sapInformationReports/saveVistAddress.htm";
	$.ajaxjsonp(url, dataMap, function(data) {
	   openPage("日报", "../salesman/messageReport.html");
	}, false, function() {
		editFlag = false;
	});
}

function unFocus(){
	$("input").blur();
}

var qtStr = "";
function editElse (obj) {
	qtStr = obj.html();
	console.log(qtStr);
	var divId = obj.parent().attr("id");
	$("#" + divId + " .tslx").removeClass("active");
	obj.parent().addClass("active");
	var elseWidth = obj.width();
	obj.removeAttr("onclick");
	obj.html("<input type='text' id='xxfk_qtsrk' style='width:" + elseWidth + "px;' maxlength='3' onblur='goEm($(this));' onmouseout='goEm($(this));' />");
	$("#xxfk_qtsrk").focus();
}
function goEm(obj) {
	var objClone = obj.parent();
	console.log(obj.val());
	obj.parent().attr("onclick","editElse($(this))");
	if (isNull(obj.val())) {
		obj.parent().html(qtStr);
	} else {
		obj.parent().html(obj.val());
		objClone.attr("val",obj.val());
	}
	var divId = objClone.parent().attr("id");
	$("#" + divId + " .tslx").removeClass("active");
	console.log(objClone.attr("class"));
	objClone.addClass("active");
}

function getMonday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth(); //获取月份
    var d = dd.getDate();
    var date = new Date(y,m,d);
    var monday = date.format("yyyy-MM-dd");
    return monday;
}

function getSunday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? 7 - week : 0;
    dd.setDate(dd.getDate() + minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth(); //获取月份
    var d = dd.getDate();
    var date = new Date(y,m,d);
    var sunday = date.format("yyyy-MM-dd");
    return sunday;
}

function getJsonString() {
    var jsons = [];
    for(var i=0;i<=productDiv; i++){
    	if($("#div_"+i)[0]){
    		var json = {};
			json.needProduct = $("#informationSourcesN_"+i+" span.cpx_label_checked").text();//需求产品
			
			var machineTypeStr = "";
			$("#machineTypeDivN_"+i+" span.showStyle span.cpx_label_checked").each(function(){
				machineTypeStr = machineTypeStr + $(this).text() + ", ";
			 });
			json.machineType = machineTypeStr.substring(0, machineTypeStr.length-2);

			var competitorStr = "";
			$("#competitorDivN_"+i+" span.showStyle span.cpx_label_checked").each(function(){
				competitorStr = competitorStr + $(this).text() + ", ";
			 });
			json.competitor = competitorStr.substring(0, competitorStr.length-2);

			var downstreamMarketStr = "";
			$("#downstreamMarketDivN_"+i+" span.showStyle span.cpx_label_checked").each(function(){
				downstreamMarketStr = downstreamMarketStr + $(this).text() + ", ";
			 });
			json.downstreamMarket = downstreamMarketStr.substring(0, downstreamMarketStr.length-2);
			
			json.materialGrade = $("#materialGradeN_"+i+" span.cpx_label_checked").text();//原料档次
			json.diffFlag = $("#diffFlagN_"+i+" span.cpx_label_checked").text();//差异化
			json.needAmount	= $("#monthlyDemandN_"+i).val();//月需求量
			json.materialGg = $("#materialGgN_"+i).val();//采购规格
			json.machineNum = $("#machineNumN_"+i).val();
			json.marketArea = $("#marketAreaN_"+i).val();
	        jsons[jsons.length] = json;
    	}
    }
    return JSON.stringify(jsons);
}

var productDiv=0;
function addDiv(){
	var d={};
	productDiv=productDiv+1;
	d.data=productDiv;
	$("#list").append(template('list_page', d));

	//产品线事件, 新客户产品线
	$("#informationSourcesN_"+productDiv+" span").bind("click", function() {
		$("#informationSourcesN_"+productDiv+" .tslx").removeClass("cpx_label_checked");
		$(this).addClass("cpx_label_checked");
		var productline = $(this).text();
		if(productline=="POY"){
			$("#machineType1N_"+productDiv).removeClass("hideStyle");
			$("#machineType1N_"+productDiv).addClass("showStyle");
			$("#machineType2N_"+productDiv).removeClass("showStyle");
			$("#machineType2N_"+productDiv).addClass("hideStyle");
			$("#machineType3N_"+productDiv).removeClass("showStyle");
			$("#machineType3N_"+productDiv).addClass("hideStyle");
			$("#machineType4N_"+productDiv).removeClass("showStyle");
			$("#machineType4N_"+productDiv).addClass("hideStyle");

			$("#competitor1N_"+productDiv).removeClass("hideStyle");
			$("#competitor1N_"+productDiv).addClass("showStyle");
			$("#competitor2N_"+productDiv).removeClass("showStyle");
			$("#competitor2N_"+productDiv).addClass("hideStyle");
			$("#competitor3N_"+productDiv).removeClass("showStyle");
			$("#competitor3N_"+productDiv).addClass("hideStyle");
			$("#competitor4N_"+productDiv).removeClass("showStyle");
			$("#competitor4N_"+productDiv).addClass("hideStyle");

			$("#downstreamMarket1N_"+productDiv).removeClass("hideStyle");
			$("#downstreamMarket1N_"+productDiv).addClass("showStyle");
			$("#downstreamMarket2N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket2N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket3N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket3N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket4N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket4N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket5N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket5N_"+productDiv).addClass("hideStyle");
		}
		if(productline=="DTY" || productline=="FDY"){
			$("#machineType1N_"+productDiv).removeClass("showStyle");
			$("#machineType1N_"+productDiv).addClass("hideStyle");
			$("#machineType2N_"+productDiv).removeClass("hideStyle");
			$("#machineType2N_"+productDiv).addClass("showStyle");
			$("#machineType3N_"+productDiv).removeClass("showStyle");
			$("#machineType3N_"+productDiv).addClass("hideStyle");
			$("#machineType4N_"+productDiv).removeClass("showStyle");
			$("#machineType4N_"+productDiv).addClass("hideStyle");

			$("#competitor1N_"+productDiv).removeClass("hideStyle");
			$("#competitor1N_"+productDiv).addClass("showStyle");
			$("#competitor2N_"+productDiv).removeClass("showStyle");
			$("#competitor2N_"+productDiv).addClass("hideStyle");
			$("#competitor3N_"+productDiv).removeClass("showStyle");
			$("#competitor3N_"+productDiv).addClass("hideStyle");
			$("#competitor4N_"+productDiv).removeClass("showStyle");
			$("#competitor4N_"+productDiv).addClass("hideStyle");

			$("#downstreamMarket1N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket1N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket2N_"+productDiv).removeClass("hideStyle");
			$("#downstreamMarket2N_"+productDiv).addClass("showStyle");
			$("#downstreamMarket3N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket3N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket4N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket4N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket5N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket5N_"+productDiv).addClass("hideStyle");
		}
		if(productline=="涤纶切片"){
			$("#machineType1N_"+productDiv).removeClass("showStyle");
			$("#machineType1N_"+productDiv).addClass("hideStyle");
			$("#machineType2N_"+productDiv).removeClass("showStyle");
			$("#machineType2N_"+productDiv).addClass("hideStyle");
			$("#machineType3N_"+productDiv).removeClass("hideStyle");
			$("#machineType3N_"+productDiv).addClass("showStyle");
			$("#machineType4N_"+productDiv).removeClass("showStyle");
			$("#machineType4N_"+productDiv).addClass("hideStyle");

			$("#competitor1N_"+productDiv).removeClass("showStyle");
			$("#competitor1N_"+productDiv).addClass("hideStyle");
			$("#competitor2N_"+productDiv).removeClass("hideStyle");
			$("#competitor2N_"+productDiv).addClass("showStyle");
			$("#competitor3N_"+productDiv).removeClass("showStyle");
			$("#competitor3N_"+productDiv).addClass("hideStyle");
			$("#competitor4N_"+productDiv).removeClass("showStyle");
			$("#competitor4N_"+productDiv).addClass("hideStyle");

			$("#downstreamMarket1N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket1N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket2N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket2N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket3N_"+productDiv).removeClass("hideStyle");
			$("#downstreamMarket3N_"+productDiv).addClass("showStyle");
			$("#downstreamMarket4N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket4N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket5N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket5N_"+productDiv).addClass("hideStyle");
		}
		if(productline=="锦纶切片"){
			$("#machineType1N_"+productDiv).removeClass("showStyle");
			$("#machineType1N_"+productDiv).addClass("hideStyle");
			$("#machineType2N_"+productDiv).removeClass("showStyle");
			$("#machineType2N_"+productDiv).addClass("hideStyle");
			$("#machineType3N_"+productDiv).removeClass("hideStyle");
			$("#machineType3N_"+productDiv).addClass("showStyle");
			$("#machineType4N_"+productDiv).removeClass("showStyle");
			$("#machineType4N_"+productDiv).addClass("hideStyle");

			$("#competitor1N_"+productDiv).removeClass("showStyle");
			$("#competitor1N_"+productDiv).addClass("hideStyle");
			$("#competitor2N_"+productDiv).removeClass("showStyle");
			$("#competitor2N_"+productDiv).addClass("hideStyle");
			$("#competitor3N_"+productDiv).removeClass("hideStyle");
			$("#competitor3N_"+productDiv).addClass("showStyle");
			$("#competitor4N_"+productDiv).removeClass("showStyle");
			$("#competitor4N_"+productDiv).addClass("hideStyle");

			$("#downstreamMarket1N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket1N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket2N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket2N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket3N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket3N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket4N_"+productDiv).removeClass("hideStyle");
			$("#downstreamMarket4N_"+productDiv).addClass("showStyle");
			$("#downstreamMarket5N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket5N_"+productDiv).addClass("hideStyle");
		}
		if(productline=="短纤"){
			$("#machineType1N_"+productDiv).removeClass("showStyle");
			$("#machineType1N_"+productDiv).addClass("hideStyle");
			$("#machineType2N_"+productDiv).removeClass("showStyle");
			$("#machineType2N_"+productDiv).addClass("hideStyle");
			$("#machineType3N_"+productDiv).removeClass("showStyle");
			$("#machineType3N_"+productDiv).addClass("hideStyle");
			$("#machineType4N_"+productDiv).removeClass("hideStyle");
			$("#machineType4N_"+productDiv).addClass("showStyle");

			$("#competitor1N_"+productDiv).removeClass("showStyle");
			$("#competitor1N_"+productDiv).addClass("hideStyle");
			$("#competitor2N_"+productDiv).removeClass("showStyle");
			$("#competitor2N_"+productDiv).addClass("hideStyle");
			$("#competitor3N_"+productDiv).removeClass("showStyle");
			$("#competitor3N_"+productDiv).addClass("hideStyle");
			$("#competitor4N_"+productDiv).removeClass("hideStyle");
			$("#competitor4N_"+productDiv).addClass("showStyle");

			$("#downstreamMarket1N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket1N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket2N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket2N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket3N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket3N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket4N_"+productDiv).removeClass("showStyle");
			$("#downstreamMarket4N_"+productDiv).addClass("hideStyle");
			$("#downstreamMarket5N_"+productDiv).removeClass("hideStyle");
			$("#downstreamMarket5N_"+productDiv).addClass("showStyle");
		}
	});
	
	//新客户设备类型
	$("#machineTypeDivN_"+productDiv+" span span").bind("click", function() {
		if($(this).hasClass("cpx_label_checked")){
			$(this).removeClass("cpx_label_checked");
		}else{
			$(this).addClass("cpx_label_checked");
		}
	});
	//新客户竞争对手
	$("#competitorDivN_"+productDiv+" span span").bind("click", function() {
		if($(this).hasClass("cpx_label_checked")){
			$(this).removeClass("cpx_label_checked");
		}else{
			$(this).addClass("cpx_label_checked");
		}
	});
	//新客户下游市场
	$("#downstreamMarketDivN_"+productDiv+" span span").bind("click", function() {
		if($(this).hasClass("cpx_label_checked")){
			$(this).removeClass("cpx_label_checked");
		}else{
			$(this).addClass("cpx_label_checked");
		}
	});
	//新客户差异化标识
	$("#diffFlagN_"+productDiv+" span").bind("click", function() {
		$("#diffFlagN_"+productDiv+" .tslx").removeClass("cpx_label_checked");
		$(this).addClass("cpx_label_checked");
	});
	//新客户原料档次
	$("#materialGradeN_"+productDiv+" span").bind("click", function() {
		$("#materialGradeN_"+productDiv+" .tslx").removeClass("cpx_label_checked");
		$(this).addClass("cpx_label_checked");
	});
	//客户规模
	$("#customerScale span").bind("click", function() {
		$("#customerScale .tslx").removeClass("cpx_label_checked");
		$(this).addClass("cpx_label_checked");
	});
	//营业额
	$("#customerTurnover span").bind("click", function() {
		$("#customerTurnover .tslx").removeClass("cpx_label_checked");
		$(this).addClass("cpx_label_checked");
	});
	//新客户 需求产品
	$("#informationSourcesN_"+productDiv+" span").bind("click", function() {
		$("#informationSourcesN_"+productDiv+" .tslx").removeClass("cpx_label_checked");
		$(this).addClass("cpx_label_checked");
	});	

	//新客户 采购规格
	$("#materialGgBottomN_"+productDiv).bind("click", function() {
		pmId = "informationSourcesN_"+productDiv;
		ggId = "materialGgN_"+productDiv;
	    var pm = $("#"+pmId+" span.cpx_label_checked").text();
	    if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
	        showGgPopup2();
	    } else {
	        showGgPopup();
	    }
	});

	//新客户市场区域
	$("#marketAreaBottomN_"+productDiv).select({
		title: "请选择",
		multi: true,
		items: ["萧绍","外贸","太仓","吴江","秀洲","湖州","海宁","桐乡","常熟","诸暨","义乌","慈溪",
		"张家港","常州","苏北","福建","广东","江西","湖北","安徽","其他(手动输入)"],
		onChange: function(d) {
			//console.info(d.values);
			if (isNull(d.values)) {
				$("#marketAreaN_"+productDiv).val("");
			} else {
				$("#marketAreaN_"+productDiv).val(d.values);
			}
		},
		onClose: function() {
		   
		},
		onClear: function() {
			 $("#marketAreaN_"+productDiv).val("");
		}
	});
}

function decreaseDiv(id){
	$("#"+id).remove(); 
	productDiv = productDiv-1;
}
