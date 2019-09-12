$(function() {
    queryData();


});
var problem;
function queryData() {
    var url = requestPath + "/m/score/problem/problemInfo.htm";
    var dataMap = {};
    if(isNull($("#problemId").val())){
        showMessage("参数错误");
        location.history.go(-1);
        return;
    }
    dataMap.problemId = $("#problemId").val();
    $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       d.filePathOld = filePathOld;
       console.log(d);
       if(!isNull(d.data)){
            if(scrollLoading){
                $("#list").append(template('list_page', d));
            }else{
                 $("#list").html(template('list_page', d));
                 if ($("#pageIndex")<=d.pageCount) {
                    $("#list").after("<p class='zyz_more' onclick='queryMoreData()'>点击加载更多</p>");
                  }
            }
            if (d.data[0].proper!=1) {
                    $(".kaopu").click(function(){
                       var id = $(this).attr("value");
                       if(!isNull(id)){
                            doProper(id);
                       }
                    });
            }

        }else{
            if(!scrollLoading)
            // $("#list").html("<div style='text-align: center; margin-top: 120px;margin-bottom: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
            $(".dyd_form").show();
        }

        problem = d.problem;
         $("#main").html(template('main_page', d));
        if (d.problem.reward==1) {
            $(".wtxq_sc").before("<em class='wtxq_shang'>赏</em>");
        }
        if (d.myProblem==1) {
            $(".wt_kp").show();
        }
    },true,function(){
    });
}
var answerFlag = false;
function doAnswer(){
    if (answerFlag) {
        showMessage('请勿重复操作');
        return;
    }
    answerFlag = true;
    var url = requestPath + "/m/score/problem/doAnswer.htm";
    var dataMap = {};
    if (!isNull(problem.pkid)) {
        dataMap.problemId = problem.pkid;
    }else{
        showMessage('未获取到问题信息！');
        setTimeout('answerFlag = false;',500);
        return;
    }
    var answer = $("#answer").val();
    if (!isNull(answer)) {
        if (answer.length<10) {
            showMessage('答案不能少于10个字！');
        setTimeout('answerFlag = false;',500);
            return;
        }
        if (answer.length>300) {
            showMessage('答案不能多于300字！');
        setTimeout('answerFlag = false;',500);
            return;
        }
        dataMap.answer = answer;
    }else{
        showMessage('未填写问题答案！');
        setTimeout('answerFlag = false;',500);
        return;
    } 
    $.ajaxjsonp(url, dataMap, function(data) {
         var d = eval(data);
        console.log(d);
        if (d.result==3 && d.isSalesman==0) {
            showMessage("答题成功，奖励300纤币");
        }else{
            showMessage("答题成功");
        }
        setTimeout('location.reload()',800);
    },false,function(){
        setTimeout('answerFlag = false;',800);
    });
}
var properFlag = false;
function doProper(id){
    confirmMsg("您确认设置此回答为靠谱回答?", function() {
    if (properFlag) {
        showMessage("请勿重复操作");
        return;
    }
    properFlag = true;
    var url = requestPath + "/m/score/problem/doProperAnswer.htm";
    var dataMap = {};
    dataMap.pkid = id; 
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if (d.result==3) {
            showMessage("设置成功，奖励回答者300纤币");
        }else{
            showMessage("设置成功");
        }
        setTimeout('location.reload()',800);
    },false,function(){
         setTimeout('properFlag=false;',800);
    });
});
}
var focusFlag
function doFocus(){
    if (problem.focusFlag==1) {
        return;
    }
    if (focusFlag) {
        showMessage("请勿重复操作");
        return;
    }
    focusFlag = true;
    var url = requestPath + "/m/score/problem/doFocus.htm";
    var dataMap = {};
    dataMap.problemId = problem.pkid; 
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        showMessage("收藏成功");
        setTimeout('location.reload()',800);
    },false,function(){
         setTimeout('focusFlag=false;',800);
    });
}
template.helper("getDate", function(str,parrent) {
    if (isNull(str)) {
        return str;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format(parrent);
});

function showAnswer(){
    $(".dyd_form").show();
}
function closeAnswer(){
    setTimeout('answerFlag = false;',500);
    $(".dyd_form").hide();
}