$(function() { 
    getCz2List("");   
     $("#czForm2").bind("submit", function() {
        $("#czKeyword2").val($("#czKeyword2").val().toUpperCase());
        getCz2List("");
        return false;
    });

    $(".cz2").bind("click", function() {
        if (isNull($("#czKeyword2").val())) {
            return false;
        }
        $("#czKeyword2").val("");
            searchFlag = true;
            getCz2List("");
    });

});

var oldPm = null;
var oldGg = null;
var searchFlag = false;
function getCz2List(selectCz2) {
    var url = requestPath + "/m/select/getCzGgMap.htm";
    var dataMap = {};  
	dataMap.language=i18nLanguage;
    var cz = $("#czKeyword2").val();
    if (!isNull(cz)) {
        dataMap.cz = cz;
    }
    var pm = "";
    if(isNull(selectCzId)){
        pm = $("#pm").val();
    }else{
        pm = $("#pm_"+selectCzId).val();
    }
    if (isNull(pm)) {
       showMessage("请选择品名");
       return false;
    }    
    dataMap.pm = pm;
	
    var cd = $("#cd").val();
    if (!isNull(cd)) {
        dataMap.cd = $("#cd").val();
    }
    if($("#pm").val() === "POY"||$("#pm").val() === "FDY"){
        var lx = $("#lx").val();
        if (!isNull(lx)) {
            dataMap.wzlb = lx;
        }
    } 
    if($("#pm").val() === "DTY"){
        var sz = $("#sz").val();
        if (!isNull(sz)) {
            dataMap.sz = $("#sz").val();
        }
        var nx = $("#nx").val();
        if (!isNull(nx)) {
            dataMap.nx = $("#nx").val();
        }
    } 
	var gg = "";
    if(isNull(selectCzId)){
        dataMap.gg = $("#gg").val();
    }else{
        dataMap.gg = $("#gg_"+selectCzId).val();
    }
    // if (!isNull(gg)) {
    //     if(oldGg === gg && oldPm === pm){
    //         if(isNull(cz) && !searchFlag){ //批号为空或搜索状态为false就不查
    //             // 查询条件一样，不查询了
    //             return false;
    //         }
    //     }        
    //     oldGg = gg;
    //     dataMap.gg = gg;
    // }else{
    //     if(oldGg === "" && oldPm === pm){
    //         if(isNull(cz) && !searchFlag){ //批号为空或搜索状态为false就不查
    //             // 查询条件一样，不查询了
    //             return false;
    //         }
    //     }
    //     oldGg = "";
    // }
    oldPm = pm;

    $.ajaxjsonp(url, dataMap, function(data) {
		var d = eval(data);
        $("#czLeft").html(template('cz_left_list_page', d));
        bindCzLeft();
        $("#czRight").html(template('cz_right_list_page', d));
        bindCzRight();

	    if (!isNull(selectCz2)) {
		
		$(".czselect").each(function(i){
		  var cz = $(this).attr("cz");
		 
		  if(cz===selectCz2){
				$(this).find(".icon-duihao").show();
				return false;
			}
		 });
	    }
    },false,function(){
        setTimeout('searchFlag = false;',1000);
    });	
}

function bindCzLeft(){
    $("#czLeft li").on("click", function(){
        $("#czLeft li").removeClass("current");
        $(this).addClass("current");
        var czFirstLetter = $(this).attr("czFirstLetter");
        if(isNull(czFirstLetter)){
            // 不限, 这里是否需要重新查询一次，把所有的都显示出来？
            $("#czRight li").show();
        }else{
            $("#czRight li").hide();
            $("#czRight li").first().show();
            $("#czlist_"+czFirstLetter).show();
        }       
    });
}

function bindCzRight(){
    $(".czselect").on("click", function(){
        var gg = $(this).attr("gg");
        var cz = $(this).attr("cz");
        $(".icon-duihao").hide();
        $(this).find(".icon-duihao").show(); 
        if(!isNull(gg)){
            $("#gg").val(gg); // 选不限的时候，规格不清空
        } 
	if (!isNull(selectCzId)) {
		 $("#cz_" + selectCzId).val(cz);
        $("#cz_" + selectCzId).trigger("change");
    } else {
         $("#cz").val(cz);
        $("#cz").trigger("change");
    }
       
    });


}

function showCzPopup2() {
	getCz2List("");
    $("#czPopup2").popup();
    var docHeight = $(document).height();
    var boxHeight = docHeight - 88;
    $(".boxHeight").css("height", boxHeight+"px");    
}


var selectCzId = "";
var selectCz2="";
function showCzPopup2ById(CzId) {
	selectCzId=CzId;
	
	var selectCz2 =$("#cz_" + selectCzId).val();
	getCz2List(selectCz2);
	
    $("#czPopup2").popup();
    var docHeight = $(document).height();
    var boxHeight = docHeight - 88;
    $(".boxHeight").css("height", boxHeight+"px");    
}


