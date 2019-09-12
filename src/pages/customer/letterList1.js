$(function() {
    var topid = '';
    setRedPoint();
    changeTab(localStorage.lettertab);
    if ($("#infinitePag").length !== 0) {
        // 加入下拉刷新内容
        if ($(".weui-pull-to-refresh-layer").length === 0) {
            var prependHtml = "<div class='weui-pull-to-refresh-layer'>";
            prependHtml += "<div class='pull-to-refresh-arrow'></div>";
            prependHtml += "<div class='pull-to-refresh-preloader'></div>";
            prependHtml += "<div class='down'>下拉加载</div>";
            prependHtml += "<div class='up'>释放加载</div>";
            prependHtml += "<div class='refresh'>正在加载</div>";
            prependHtml += "</div>";
            $("#infinitePag").prepend(prependHtml);
        }       
    }
});

window.count = {
    pageSize: '',
    pageNo: '',
    pageNumber:'',
}

function queryData(type) {
    var url = requestPath + "/m/letter/recvList.htm";
    var dataMap = {};
    if($("#pageIndex").val() == null || $("#pageIndex").val() == ''){
        $("#pageIndex").val(1)
    }
    dataMap.pageNumber=$("#pageIndex").val();
    dataMap.pageSize=3;
    dataMap.type=type;
    $.ajaxjsonp(url, dataMap, function(data) {
        if(data.pageNumber == dataMap.pageNumber){
            var d = eval(data);
            console.log(d)
            if (!pullRefresh) {
                $("#list").empty();
            }
            if(d.list == null || d.list == ''){
                var Htmlstr = '<div id="zwt-img" style="position: fixed; left: 50%; margin-left: -55px; top: 200px;">';
                Htmlstr += '<img src="../../images/zwt.png" style="width:109px;"></div>';
                $("#list").append(Htmlstr);
                return;
            }
            for(var i = 0; i < d.list.length; i++){
                var htmlStr = '';
                htmlStr += '<li id="'+d.list[i].letterid+'" class="xxzx_list"><div class="xxzx_list_time">';
                htmlStr += '<span>'+d.list[i].createdate.substring(0,19)+'</span>';
                htmlStr += '</div><div class="xxzx_list_info"><i onclick="deleteLetter(\''+d.list[i].letterid+'\')" class="iconfont icon-cha"></i>';
                htmlStr += '<p class="xxzx_list_title">'+d.list[i].title;
                if(d.list[i].readstatus == 0){
                    htmlStr += '<span></span>';
                }
                if(d.list[i].summary != null && d.list[i].summary != ''){
                    htmlStr += '</p><p onclick="showDetail(\''+d.list[i].letterid+'\')" class="xxzx_list_detail">'+d.list[i].summary+'</p></div></li>';
                }else{
                    htmlStr += '</p><p onclick="showDetail(\''+d.list[i].letterid+'\')" class="xxzx_list_detail">'+d.list[i].content+'</p></div></li>';
                }
                $("#list").prepend(htmlStr);
            }
            if (!pullRefresh) {
                document.getElementById("lastLine").scrollIntoView();
            }else{
                document.getElementById(topid).scrollIntoView();
            }
            topid = d.list[d.list.length - 1].letterid;
        }
    }, false, function(){
        pullRefresh = false;
    });
}

$("#infinitePag").pullToRefresh().on("pull-to-refresh", function() {
	if(pullRefresh){
		return;
	}
	pullRefresh = true;
    setTimeout(function() { 
        var pageIndex = $("#pageIndex").val();
        pageIndex++;
        $("#pageIndex").val(pageIndex);
        queryData(localStorage.lettertab);
        $("#infinitePag").pullToRefreshDone();
    }, 10); 
});

function changeTab(index){
    pullRefresh = false;
    $("#pageIndex").val(1)
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