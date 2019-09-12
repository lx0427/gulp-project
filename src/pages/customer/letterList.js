$(function() {
    setRedPoint();
    changeTab(localStorage.lettertab);
});


function queryData() {
    var url = requestPath + "/m/letter/recvList.htm";
    var dataMap = {};
    dataMap.type=localStorage.lettertab;
    $.ajaxjsonp(url, dataMap, function(data) {
    	var d = eval(data);
    	console.log(d);
    	if (pullRefresh) {
            $("#list").html(template('list_page', d));
        } else {
            $("#list").append(template('list_page', d));
        }
    }, true);
}


function changeTab(index){
	$("#pageIndex").val(0);
    pullRefresh = false;
    if(index == 1){
        localStorage.lettertab = 1
        $('#tab1').attr('class','xxzx_tab1 xxzx_tab_checked');
        $('#tab2').attr('class','xxzx_tab2');
    }else{
        localStorage.lettertab = 2
        $('#tab1').attr('class','xxzx_tab1');
        $('#tab2').attr('class','xxzx_tab2 xxzx_tab_checked');
    }
    $("#list").empty();
    queryData(localStorage.lettertab);
}

function showDetail(pkid){
    openPage("站内信详情", "../customer/letterDetail.html?pkid="+pkid, "1");
}

function deleteLetter(pkid){
    var url = requestPath + "/m/letter/deleteLetter.htm";
    var dataMap = {};
    dataMap.pkid=pkid;
    $.ajaxjsonp(url, dataMap, function(data) {
        $('#'+pkid).remove();
    });
}

function setRedPoint(){
    var url = requestPath + "/m/letter/hasLetter.htm";
    var dataMap = {};
    dataMap.type = 1;
    $.ajaxjsonp(url, dataMap, function(data) {
        if(data.count > 0){
            $('#redpoint1').show();
        }else{
            $('#redpoint1').hide();
        }
    });
    dataMap.type = 2;
    $.ajaxjsonp(url, dataMap, function(data) {
        if(data.count > 0){
            $('#redpoint2').show();
        }else{
            $('#redpoint2').hide();
        }
    });
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