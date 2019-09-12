$(function() {
	queryData();
	
	//微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法 
	window.addEventListener("resize", function () {
		if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
			window.setTimeout(function () {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	});

	// 图片上传
	$("#addImg").bind("click", function() {
		// 最多上传9张
		var len = $(".img").length;
		startUploadPics("imgCallback", 9 - len);
	});

	setTimeout(function(){
		$("textarea").each(function(){
	        autoTextarea(this); // 调用
	    });
	},500);
	
	var materialGgN = $("#materialGgN_0")[0];
	var marketAreaN = $("#marketAreaN_0")[0];
    autoTextarea(materialGgN); // 调用
    autoTextarea(marketAreaN);

});

var pmId = "informationSources";
var ggId = "materialGg";

var interval;
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

			//产品线更换时, 对应的规格选项也更换
			setTimeout(function() {
	            getGgData(productline);
	        }, 10);
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


	/*begin 判断是否是撤销回来编辑的*/
    if(!isNull($("#pkid").val())){
    	removeStorage();//清空缓存
    	var url = requestPath + "/m/informationReports/getInfo.htm";
	    var dataMap = {};
	    dataMap.pkid = $("#pkid").val();
	    dataMap.isReport = 1;
	    dataMap.revocationFlag = 1;
	    $.ajaxjsonp(url, dataMap, function(data) {
	        var d = eval(data);
	        console.info(d);
        	if(!isNull(d.data)){
        	var oreportAddress = d.data;
			//客户全称
			$("#customerName").val(oreportAddress.customerName);	
			customerType = oreportAddress.customerType;

			var problem = oreportAddress.problem;
			$("#problem").val(toTextarea(problem));//备注

			if(customerType==0){//新客户
				$("#newCustomer").css("display","block");
				$("#oldCustomer").css("display","none");
				$("#informationSourcesDiv").css("display","none");

				$("#customerType .tslx").each(function(){
	                if($(this).text()=="新客户"){
	                    $(this).addClass("cpx_label_checked");
	                }else{
	                    $(this).removeClass("cpx_label_checked");
	                }
	            });

				$("#linkman").val(oreportAddress.linkman);
				$("#positionInfo").val(oreportAddress.positionInfo);
				$("#telphoneNumble").val(oreportAddress.telphoneNumble);
				$("#customerScale span").each(function(){
	                if($(this).text()==oreportAddress.customerScale){
	                    $(this).addClass("cpx_label_checked");
	                }else{
	                    $(this).removeClass("cpx_label_checked");
	                }
	            });
				$("#customerTurnover span").each(function(){
	                if($(this).text()==oreportAddress.customerTurnover){
	                    $(this).addClass("cpx_label_checked");
	                }else{
	                    $(this).removeClass("cpx_label_checked");
	                }
	            });
				
				var arrs = oreportAddress.informationReportsMx;
				if(!isNull(arrs)){
					 for(var j=0; j<arrs.length; j++){
					 	if(j != 0){
					 		addDiv();
					 	}
					 	$("#informationSourcesN_"+j+" span").each(function(){
			                if($(this).text()==arrs[j].needProduct){
			                    $(this).addClass("cpx_label_checked");
			                }else{
			                    $(this).removeClass("cpx_label_checked");
			                }
			            });
					 	if(j==0){
					 		var productline = arrs[0].needProduct;
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
					 	if(!isNull(arrs[j].machineType)){
							var machineTypeStrs = arrs[j].machineType.split(", ");
							$("#machineTypeDivN_"+j+" span.showStyle :first-child").removeClass("cpx_label_checked");
							for(var i=0; i<machineTypeStrs.length; i++){
								$("#machineTypeDivN_"+j+" span.showStyle span").each(function(){
									if($(this).text()==machineTypeStrs[i]){
										$(this).addClass("cpx_label_checked");
									};
								});
							}
						}

						if(!isNull(arrs[j].competitor)){
							$("#competitorDivN_"+j+" span.showStyle :first-child").removeClass("cpx_label_checked");
							var competitorStrs = arrs[j].competitor.split(", ");
							for(var i=0; i<competitorStrs.length; i++){
								$("#competitorDivN_"+j+" span.showStyle span").each(function(){
									if($(this).text()==competitorStrs[i]){
										$(this).addClass("cpx_label_checked");
									};
								});
							}
						}

						if(!isNull(arrs[j].downstreamMarket)){
							$("#downstreamMarketDivN_"+j+" span.showStyle :first-child").removeClass("cpx_label_checked");
							var downstreamMarketStrs = arrs[j].downstreamMarket.split(", ");
							for(var i=0; i<downstreamMarketStrs.length; i++){
								$("#downstreamMarketDivN_"+j+" span.showStyle span").each(function(){
									if($(this).text()==downstreamMarketStrs[i]){
										$(this).addClass("cpx_label_checked");
									};
								});
							}
						}

						$("#materialGradeN_"+j+" span").each(function(){
			                if($(this).text()==arrs[j].materialGrade){
			                    $(this).addClass("cpx_label_checked");
			                }else{
			                    $(this).removeClass("cpx_label_checked");
			                }
			            });

						$("#diffFlagN_"+j+" span").each(function(){
			                if($(this).text()==arrs[j].diffFlag){
			                    $(this).addClass("cpx_label_checked");
			                }else{
			                    $(this).removeClass("cpx_label_checked");
			                }
			            });

						$("#monthlyDemandN_"+j).val(arrs[j].needAmount);//月需求量
						$("#materialGgN_"+j).val(arrs[j].materialGg);//采购规格
						$("#machineNumN_"+j).val(arrs[j].machineNum);
						$("#marketAreaN_"+j).val(arrs[j].marketArea);
					 }
					}
				}else{//老客户
					var productline = oreportAddress.informationSources;
					$("#informationSources span").each(function(){
		                if($(this).text() == productline){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });

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
					if(!isNull(oreportAddress.machineType)){
						$("#machineTypeDiv span.showStyle :first-child").removeClass("cpx_label_checked");
						var machineTypeStrs = oreportAddress.machineType.split(", ");
						for(var i=0; i<machineTypeStrs.length; i++){
							$("#machineTypeDiv span.showStyle span").each(function(){
								if($(this).text()==machineTypeStrs[i]){
									$(this).addClass("cpx_label_checked");
								};
							});
						}
					}
					$("#materialGg").val(oreportAddress.materialGg);
					$("#monthlyDemand").val(oreportAddress.monthlyDemand);
					$("#materialGrade span").each(function(){
		                if($(this).text()==oreportAddress.materialGrade){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });
					$("#priceEvaluateDiv span span").each(function(){
		                if($(this).text()==oreportAddress.priceEvaluate){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });

					if(!isNull(oreportAddress.competitor)){
						$("#competitorDiv span.showStyle :first-child").removeClass("cpx_label_checked");
						var competitorStrs = oreportAddress.competitor.split(", ");
						for(var i=0; i<competitorStrs.length; i++){
							$("#competitorDiv span.showStyle span").each(function(){
								if($(this).text()==competitorStrs[i]){
									$(this).addClass("cpx_label_checked");
								};
							});
						}
					}
					
					if(!isNull(oreportAddress.downstreamMarket)){
						$("#downstreamMarketDiv span.showStyle :first-child").removeClass("cpx_label_checked");
						var downstreamMarketStrs = oreportAddress.downstreamMarket.split(", ");
						for(var i=0; i<downstreamMarketStrs.length; i++){
							$("#downstreamMarketDiv span.showStyle span").each(function(){
								if($(this).text()==downstreamMarketStrs[i]){
									$(this).addClass("cpx_label_checked");
								};
							});
						}
					}
					//市场预判
					$("#marketPrediction span").each(function(){
		                if($(this).text()==oreportAddress.marketPrediction){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });
					//差异化属性
					$("#diffFlag span").each(function(){
		                if($(this).text()==oreportAddress.diffFlag){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });
					
					$("#machineNum").val(oreportAddress.machineNum);
					$("#marketArea").val(oreportAddress.marketArea);
					$("#productInventory").val(oreportAddress.productInventory);
				}
			}			
	    });
    }	
    /*end 判断是否是撤销回来编辑的*/

	//每隔10s执行备份方法
	clearInterval(interval); 
	interval = setInterval(tempSaveStorage, 10000);

	/*begin 从本地取出备份内容*/
	var reportAddressJson = sessionStorage.getItem("reportAddress");	
	if(!isNull(reportAddressJson)){
		var oreportAddress = JSON.parse(reportAddressJson);
		console.info("同步备份"+oreportAddress);
		//客户全称
		$("#customerName").val(oreportAddress.customerName);	
		customerType = oreportAddress.customerType;

		var problem = oreportAddress.problem;
		$("#problem").val(toTextarea(problem));//备注

		if(customerType==0){//新客户
			$("#newCustomer").css("display","block");
			$("#oldCustomer").css("display","none");
			$("#informationSourcesDiv").css("display","none");

			$("#customerType .tslx").each(function(){
                if($(this).text()=="新客户"){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

			$("#linkman").val(oreportAddress.linkman);
			$("#positionInfo").val(oreportAddress.positionInfo);
			$("#telphoneNumble").val(oreportAddress.telphoneNumble);
			$("#customerScale span").each(function(){
                if($(this).text()==oreportAddress.customerScale){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });
			$("#customerTurnover span").each(function(){
                if($(this).text()==oreportAddress.customerTurnover){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });
			
			var mxJsons = oreportAddress.jsonstring;
			if(!isNull(mxJsons)){
				 var arrs = JSON.parse(mxJsons);
				 for(var j=0; j<arrs.length; j++){
				 	if(j != 0){
				 		addDiv();
				 	}
				 	$("#informationSourcesN_"+j+" span").each(function(){
		                if($(this).text()==arrs[j].needProduct){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });
				 	if(j==0){
				 		var productline = arrs[0].needProduct;
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
				 	if(!isNull(arrs[j].machineType)){
						var machineTypeStrs = arrs[j].machineType.split(", ");
						$("#machineTypeDivN_"+j+" span.showStyle :first-child").removeClass("cpx_label_checked");
						for(var i=0; i<machineTypeStrs.length; i++){
							$("#machineTypeDivN_"+j+" span.showStyle span").each(function(){
								if($(this).text()==machineTypeStrs[i]){
									$(this).addClass("cpx_label_checked");
								};
							});
						}
					}

					if(!isNull(arrs[j].competitor)){
						$("#competitorDivN_"+j+" span.showStyle :first-child").removeClass("cpx_label_checked");
						var competitorStrs = arrs[j].competitor.split(", ");
						for(var i=0; i<competitorStrs.length; i++){
							$("#competitorDivN_"+j+" span.showStyle span").each(function(){
								if($(this).text()==competitorStrs[i]){
									$(this).addClass("cpx_label_checked");
								};
							});
						}
					}

					if(!isNull(arrs[j].downstreamMarket)){
						$("#downstreamMarketDivN_"+j+" span.showStyle :first-child").removeClass("cpx_label_checked");
						var downstreamMarketStrs = arrs[j].downstreamMarket.split(", ");
						for(var i=0; i<downstreamMarketStrs.length; i++){
							$("#downstreamMarketDivN_"+j+" span.showStyle span").each(function(){
								if($(this).text()==downstreamMarketStrs[i]){
									$(this).addClass("cpx_label_checked");
								};
							});
						}
					}

					$("#materialGradeN_"+j+" span").each(function(){
		                if($(this).text()==arrs[j].materialGrade){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });

					$("#diffFlagN_"+j+" span").each(function(){
		                if($(this).text()==arrs[j].diffFlag){
		                    $(this).addClass("cpx_label_checked");
		                }else{
		                    $(this).removeClass("cpx_label_checked");
		                }
		            });

					$("#monthlyDemandN_"+j).val(arrs[j].needAmount);//月需求量
					$("#materialGgN_"+j).val(arrs[j].materialGg);//采购规格
					$("#machineNumN_"+j).val(arrs[j].machineNum);
					$("#marketAreaN_"+j).val(arrs[j].marketArea);
				 }
			}
		}else{//老客户
			var productline = oreportAddress.informationSources;
			$("#informationSources span").each(function(){
                if($(this).text() == productline){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

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
			if(!isNull(oreportAddress.machineType)){
				$("#machineTypeDiv span.showStyle :first-child").removeClass("cpx_label_checked");
				var machineTypeStrs = oreportAddress.machineType.split(", ");
				for(var i=0; i<machineTypeStrs.length; i++){
					$("#machineTypeDiv span.showStyle span").each(function(){
						if($(this).text()==machineTypeStrs[i]){
							$(this).addClass("cpx_label_checked");
						};
					});
				}
			}
			$("#materialGg").val(oreportAddress.materialGg);
			$("#monthlyDemand").val(oreportAddress.monthlyDemand);
			$("#materialGrade span").each(function(){
                if($(this).text()==oreportAddress.materialGrade){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });
			$("#priceEvaluateDiv span span").each(function(){
                if($(this).text()==oreportAddress.priceEvaluate){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

			if(!isNull(oreportAddress.competitor)){
				$("#competitorDiv span.showStyle :first-child").removeClass("cpx_label_checked");
				var competitorStrs = oreportAddress.competitor.split(", ");
				for(var i=0; i<competitorStrs.length; i++){
					$("#competitorDiv span.showStyle span").each(function(){
						if($(this).text()==competitorStrs[i]){
							$(this).addClass("cpx_label_checked");
						};
					});
				}
			}
			
			if(!isNull(oreportAddress.downstreamMarket)){
				$("#downstreamMarketDiv span.showStyle :first-child").removeClass("cpx_label_checked");
				var downstreamMarketStrs = oreportAddress.downstreamMarket.split(", ");
				for(var i=0; i<downstreamMarketStrs.length; i++){
					$("#downstreamMarketDiv span.showStyle span").each(function(){
						if($(this).text()==downstreamMarketStrs[i]){
							$(this).addClass("cpx_label_checked");
						};
					});
				}
			}
			//市场预判
			$("#marketPrediction span").each(function(){
                if($(this).text()==oreportAddress.marketPrediction){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });
			//差异化属性
			$("#diffFlag span").each(function(){
                if($(this).text()==oreportAddress.diffFlag){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });
			
			$("#machineNum").val(oreportAddress.machineNum);
			$("#marketArea").val(oreportAddress.marketArea);
			$("#productInventory").val(oreportAddress.productInventory);
		}
	}
	/*end 从本地取出备份内容*/

	//初始化 今日提交的列表
	var url = requestPath + "/m/informationReports/index.htm";
    var dataMap = {};
    dataMap.whType = 2;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info(d);
        if(!isNull(d.data)){
        	$("#listHistory").html(template('listHistory_page', d));
		}
    }, false, function(){});

}

// 图片上传回调,多张图片上传的时候返回的是图片地址，不需要解析
var _count = 0;
function imgCallback(img) {
	var imgHtml = "<li>";
	imgHtml += "<p><img classP='img' data-src='" + img + "' src='" + filePathOld + img + "' index='" + _count + "' class='img_" + _count + "' onclick='imgImClick(this);' /></p>";
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
        showAddressPopup();//自动跳到定位
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
	if(!isNull(problemText)){
		var problemText = textareaTo($("#problem").val())
		if(problemText.length >= 2000){
			showMessage("备注内容超过最大值!");
			return false;
		}
	}
	
	if(customerType==0){//新客户
		for(var i=0;i<=productDiv; i++){
			var materialGgN = $("#materialGgN_"+i).val();
			if(isNull(materialGgN)){
				showMessage("请输入采购规格!");
				return false;
			}
			var limit_materialGgN = materialGgN.length-500;
			if(!isNull(materialGgN) && limit_materialGgN>0){
				showMessage("规格内容过长, 超出了"+limit_materialGgN+"个字!");
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
		var materialGg = $("#materialGg").val();
		if(isNull(materialGg)){
			showMessage("请输入采购规格!");
			return false;
		}
		var limit_materialGg = materialGg.length-500;
		if(!isNull(materialGg) && limit_materialGg>0){
			showMessage("规格内容过长, 超出了"+limit_materialGg+"个字!");
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
	dataMap.placeInfo = $("#placeInfo").val();//位置名称
	dataMap.customerPlaceInfo = $("#customerPlaceInfo").val();//坐标
	dataMap.customerName = $("#customerName").val();
	dataMap.customerType=customerType;
	dataMap.problem=textareaTo($("#problem").val());//备注
	dataMap.reportStatus = 1;
	dataMap.whType = 2;

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
	var url = requestPath + "/m/informationReports/saveVistAddress.htm";
	$.ajaxjsonp(url, dataMap, function(data) {
		removeStorage();
		openPage("信息反馈列表", "../informationReport/messageSettingsList.html");
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

	var materialGgN = $("#materialGgN_"+productDiv)[0];
	var marketAreaN = $("#marketAreaN_"+productDiv)[0];
    autoTextarea(materialGgN); // 调用
    autoTextarea(marketAreaN);

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


function toWeekReport() {
	openPage("周报", "../informationReport/messageWeekAdd.html");
}

function toRecordAnyway(){
	openPage("随手记", "../informationReport/messageNoteAdd.html");
}

function toInfo(pkid){
	openPage("拜访地详情", "../informationReport/messageVistAddressInfo.html?pkid="+pkid+"&isReport=1");
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
template.helper("getImg", function (value) {
        var mx=value.split(",");
        var html = "";
        for (var i = 0; i < mx.length; i++) {
             html += " <li><p><img class='img' classP='kstp" + i + "' onclick='imgImClick(this);' index='"+i+"' src="+filePathOld+mx[i] + "></p> </li>";
        }
        return html;
 });

function toHistoryList(){
	openPage("历史记录", "../informationReport/messageHistoryList.html?whType=2");
}

function getGgData(pm) {
    if (pm === "POY" || pm === "DTY" || pm === "FDY"|| pm === "短纤") {
        getGg2List();
    } else {
        getGgList();
    }
}

//备份填写内容
function tempSaveStorage(){
	var reportAddress = getDataMap();
	sessionStorage.setItem("reportAddress", JSON.stringify(reportAddress));
	console.info("完成备份:"+JSON.stringify(reportAddress));
}

//带有换行标签的字符串转义为textarea内容
function htoTextarea(str){
	if(!isNull(str)){
		str = str.replace(new RegExp("<br>","gm"), "\n");
	}
	return str;
}
//textarea内容换行转义带有标签的字符串
function textareaToh(str){
	if(!isNull(str)){
		str = str.replace(new RegExp("\n", "gm"), "<br>");
	}
	return str;
}

//清空 本地缓存
function removeStorage(){
	sessionStorage.setItem("reportAddress", "");
}