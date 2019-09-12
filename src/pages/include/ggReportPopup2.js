$(function() {
    getGg2List();
});

function getGg2List() {
    var url = requestPath + "/m/select/getDenierGgMap.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
    var pm = $("#"+pmId+" span.cpx_label_checked").text();
    if (!isNull(pm)) {
        dataMap.pm = $("#"+pmId+" span.cpx_label_checked").text();
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.info("切片:"+d);
        $("#ggLeft").html(template('gg_left_list_page', d));
        bindGgLeft();

        $("#ggRight").html(template('gg_right_list_page', d));
        bindGgRight();
    });
}

function showGgPopup2() {
    $("#ggReportPopup2").popup();
    var docHeight = $(document).height();
    var boxHeight = docHeight - 60;
    $(".boxHeight").css("height", boxHeight + "px");
}
var selectGgId2 = "";

function showGgPopup2ById(ggId) {
    selectGgId2 = ggId;
    var selectGg2 = $("#gg_" + selectGgId2).val();
    if (!isNull(selectGg2)) {
        $(".ggselect").each(function(i) {
            var gg = $(this).attr("gg");
            if (gg === selectGg2) {
                $(this).find(".icon-duihao").show();
                return false;
            }
        });
    }
    $("#ggReportPopup2").popup();
    var docHeight = $(document).height();
    var boxHeight = docHeight - 60;
    $(".boxHeight").css("height", boxHeight + "px");
}


function bindGgLeft() {
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

function bindGgRight() {
    $(".ggselect").on("click", function() {
        if($(this).find(".icon-duihao").css("display") == "none"){
            $(this).find(".icon-duihao").show();
        }else{
            $(this).find(".icon-duihao").hide();
        }
    });
}

function submitGg(){
    var gg = "";
    $(".ggselect").each(function(){
        if($(this).find(".icon-duihao").css("display")!= "none"){
            gg = gg + $(this).attr("gg") + ", ";
        }
    });
    gg = gg.substring(0, gg.length-2);
    $("#"+ggId).val(gg);
}
template.helper("getDenier", function(denier) {
	    if(isNull(denier)) {
            return "";
        }else{
         var  arr=denier.split(".");
         if(arr.length>1){
			 if(parseFloat(arr[1])>0){
			  return denier;
			 }else{
			  return arr[0];
			 }
		 }else{
		   return arr[0];
		 }
	    }
      
});
