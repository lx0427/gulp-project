$(function() {
    getGg2List();

    $("#ggForm2").bind("submit", function() {
        $("#ggKeyword2").val($("#ggKeyword2").val().toLowerCase());
        getGg2List();
        return false;
    });

    $(".gg2").bind("click", function() {
        if (isNull($("#ggKeyword2").val())) {
            return false;
        }
        $("#ggKeyword2").val("");
        getGg2List();
    });
});

function getGg2List() {
    var url = requestPath + "/m/select/getDenierGgMap.htm";
    var dataMap = {};
	dataMap.language=i18nLanguage;
     var ggKeyword2 = $("#ggKeyword2").val();
    if (!isNull(ggKeyword2)) {
        dataMap.gg = ggKeyword2;
    }
    var pm = $("#pm").val();
    if (!isNull(pm)) {
        dataMap.pm = $("#pm").val();
    }
    var cd = $("#cd").val();
    if (!isNull(cd)) {
        dataMap.cd = $("#cd").val();
    } 
    var nx = $("#nx").val();
    if (!isNull(nx)) {
        dataMap.nx = $("#nx").val();
    }
    var sz = $("#sz").val();
    if (!isNull(sz)) {
        dataMap.sz = $("#sz").val();
    }
    var lx = $("#lx").val();
    if (!isNull(lx)) {
        dataMap.wzlb = lx;
    }
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        $("#ggLeft").html(template('gg_left_list_page', d));
        bindGgLeft();

        $("#ggRight").html(template('gg_right_list_page', d));
        bindGgRight();
    });
}

function showGgPopup2() {
    $("#ggPopup2").popup();
    var docHeight = $(document).height();
    var boxHeight = docHeight - 60 - 44; //再减去搜索框的高度
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
    $("#ggPopup2").popup();
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
        var gg = $(this).attr("gg");
        $(".icon-duihao").hide();
        $(this).find(".icon-duihao").show();
        if (!isNull(selectGgId2)) {
            $("#gg_" + selectGgId2).val(gg);
            $("#gg_" + selectGgId2).trigger("change");
        } else {
            $("#gg").val(gg);
            $("#gg").trigger("change");
        }
    });
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
