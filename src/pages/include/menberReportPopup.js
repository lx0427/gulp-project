$(function() {
    // 滚动加载,需要分页的地方id必须是infinitePage
    $("#menberInfinitePage").infinite().on("infinite", function() {
        if (scrollLoading) {
            return;
        }
        var pageIndex = $("#pageIndex").val(); // 当前页
        var pageCount = $("#pageCount").val(); // 总页数
        if (isNull(pageIndex) && isNull(pageCount)) {
            // 不需要分页
            $(".weui-infinite-scroll").hide();
            return;
        }
        if (parseInt(pageIndex) >= parseInt(pageCount)) {
            // 已经是最后一页了
            $(".weui-infinite-scroll").hide();
            return;
        }

        scrollLoading = true;
        setTimeout(function() {
            getMenberList();
        }, 10);
    });

    getMenberList();

    $("#menberForm").bind("submit", function() {
        $("#pageIndex").val("0");
        $("#menberList").html("");
        getMenberList();
        return false;
    });

    $(".weui_icon_clear").bind("click", function() {
        if (isNull($("#menberKeyword").val())) {
            return false;
        }
        $("#menberKeyword").val("");
        $("#pageIndex").val("0");
        $("#menberList").html("");
        getMenberList();
    });

    $(".weui_search_cancel").bind("click", function() {
        if (isNull($("#menberKeyword").val())) {
            return false;
        }
        $("#menberKeyword").val("");
        $("#pageIndex").val("0");
        $("#menberList").html("");
        getMenberList();
    });

    $("#confirmbuttom").bind("click", function() {
        var mbname = $("#menberKeyword").val();
        chooseMenber(mbname);   
    });


});

function getMenberList() {
    var url = requestPath + "/m/informationReports/selectMenberList.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
    var menberKeyword = $("#menberKeyword").val();
    if (!isNull(menberKeyword)) {
        dataMap.mbname = menberKeyword;
    }
    dataMap.pageSize = 20;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if(!isNull(d.data)){
            $("#menberList").append(template('menberList_page', d));
        }
        
    },true);
}

function showMenberPopup() {
        $("#menberReportPopup").popup();
        $("#menberKeyword").val($("#customerName").val());
}

function chooseMenber(mbname) {
    var menberKeyword = $("#menberKeyword").val();
    if(isNull(mbname)){
        mbname = menberKeyword;
    }
    $("#customerName").val(mbname);
    $("#mbname").trigger("change");

    if(customerType!=1){
        return false;
    }
    initTemplate(mbname); //初始化页面模板
}

function initTemplate(mbname){//记忆功能
    var url = requestPath + "/m/informationReports/getLastRecord.htm";
    var dataMap = {};
    /*if (isNull(mbname)) {
        $("#oldCustomer").css("display","block");
        $("#newCustomer").css("display","none");
        $("#informationSourcesDiv").css("display","block");
        customerType=1;

        $("#informationSources .tslx").each(function(){
            $(this).removeClass("cpx_label_checked");
        });
        $("#informationSources .tslx").eq(0).addClass("cpx_label_checked");
        
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
    

        $("#machineTypeDiv span span").each(function(){
            $(this).removeClass("cpx_label_checked");
         });
        $("#machineTypeDiv span").children().eq(0).addClass("cpx_label_checked");

        $("#materialGg").val("");
        $("#monthlyDemand").val("");

        $("#materialGrade span").each(function(){
            $(this).removeClass("cpx_label_checked");
        });
        $("#materialGrade").children().eq(0).addClass("cpx_label_checked");

        $("#priceEvaluate span").each(function(){
            $(this).removeClass("cpx_label_checked");
        });
        $("#priceEvaluate").children().eq(0).addClass("cpx_label_checked");

        $("#competitorDiv span").each(function(){
            $(this).removeClass("cpx_label_checked");
         });
        $("#competitorDiv span").children().eq(0).addClass("cpx_label_checked");

        $("#downstreamMarketDiv span").each(function(){
            $(this).removeClass("cpx_label_checked");
         });
        $("#downstreamMarketDiv span").children().eq(0).addClass("cpx_label_checked");

        $("#marketPrediction span").each(function(){
            $(this).removeClass("cpx_label_checked");
        });
        $("#marketPrediction").children().eq(0).addClass("cpx_label_checked");

        $("#diffFlag span").each(function(){
            $(this).removeClass("cpx_label_checked");
        });
        $("#diffFlag").children().eq(0).addClass("cpx_label_checked");

        $("#machineNum").val("");
        $("#marketArea").val("");
        $("#productInventory").val("");
        return;
    }*/
    dataMap.mbname = mbname;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        if(!isNull(d.informationReports)){
            var productline = d.informationReports.informationSources;//产品线
            $("#informationSources .tslx").each(function(){
                if($(this).text()==productline){
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
            var machineTypes = d.informationReports.machineType;
            if(!isNull(machineTypes)){
                var machineTypeArr = machineTypes.split(", ");
                $("#machineTypeDiv span.showStyle span").each(function(){
                    $(this).removeClass("cpx_label_checked");
                    for(var i=0; i<machineTypeArr.length; i++){
                        if(machineTypeArr[i]==$(this).text()){
                            $(this).addClass("cpx_label_checked");
                        }
                    }
                 });
            }

            $("#materialGg").val(d.informationReports.materialGg);
            $("#monthlyDemand").val(d.informationReports.monthlyDemand);

            var materialGrade = d.informationReports.materialGrade;
            $("#materialGrade span").each(function(){
                if($(this).text() == materialGrade){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

            var priceEvaluate = d.informationReports.priceEvaluate;
            $("#priceEvaluate span").each(function(){
                if($(this).text() == priceEvaluate){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

            var competitors = d.informationReports.competitor;
            if(!isNull(competitors)){
                var competitorArr = competitors.split(", ");
                $("#competitorDiv span.showStyle span").each(function(){
                    $(this).removeClass("cpx_label_checked");
                    for(var i=0; i<competitorArr.length; i++){
                        if(competitorArr[i]==$(this).text()){
                            $(this).addClass("cpx_label_checked");
                        }
                     }
                 });
            }

            var downstreamMarkets = d.informationReports.downstreamMarket;
            if(!isNull(downstreamMarkets)){
                var downstreamMarketAttr = downstreamMarkets.split(", ");
                $("#downstreamMarketDiv span.showStyle span").each(function(){
                    $(this).removeClass("cpx_label_checked");
                    for(var i=0; i<downstreamMarketAttr.length; i++){
                        if(downstreamMarketAttr[i]==$(this).text()){
                            $(this).addClass("cpx_label_checked");
                        }
                     }
                 });
            }

            var marketPrediction = d.informationReports.marketPrediction;
            $("#marketPrediction span").each(function(){
                if($(this).text() == marketPrediction){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

            var diffFlag = d.informationReports.diffFlag;
            $("#diffFlag span").each(function(){
                if($(this).text() == diffFlag){
                    $(this).addClass("cpx_label_checked");
                }else{
                    $(this).removeClass("cpx_label_checked");
                }
            });

            $("#machineNum").val(d.informationReports.machineNum);
            $("#marketArea").val(d.informationReports.marketArea);
            $("#productInventory").val(d.informationReports.productInventory);
        }
        /*else{
            $("#oldCustomer").css("display","block");
            $("#newCustomer").css("display","none");
            $("#informationSourcesDiv").css("display","block");
            customerType=1;

            $("#informationSources .tslx").each(function(){
                $(this).removeClass("cpx_label_checked");
            });
            $("#informationSources .tslx").eq(0).addClass("cpx_label_checked");
            
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
        

            $("#machineTypeDiv span span").each(function(){
                $(this).removeClass("cpx_label_checked");
             });
            $("#machineTypeDiv span").children().eq(0).addClass("cpx_label_checked");

            $("#materialGg").val("");
            $("#monthlyDemand").val("");

            $("#materialGrade span").each(function(){
                $(this).removeClass("cpx_label_checked");
            });
            $("#materialGrade").children().eq(0).addClass("cpx_label_checked");

            $("#priceEvaluate span").each(function(){
                $(this).removeClass("cpx_label_checked");
            });
            $("#priceEvaluate").children().eq(0).addClass("cpx_label_checked");

            $("#competitorDiv span").each(function(){
                $(this).removeClass("cpx_label_checked");
             });
            $("#competitorDiv span").children().eq(0).addClass("cpx_label_checked");

            $("#downstreamMarketDiv span").each(function(){
                $(this).removeClass("cpx_label_checked");
             });
            $("#downstreamMarketDiv span").children().eq(0).addClass("cpx_label_checked");

            $("#marketPrediction span").each(function(){
                $(this).removeClass("cpx_label_checked");
            });
            $("#marketPrediction").children().eq(0).addClass("cpx_label_checked");

            $("#diffFlag span").each(function(){
                $(this).removeClass("cpx_label_checked");
            });
            $("#diffFlag").children().eq(0).addClass("cpx_label_checked");

            $("#machineNum").val("");
            $("#marketArea").val("");
            $("#productInventory").val("");
        }*/

    },false);
}