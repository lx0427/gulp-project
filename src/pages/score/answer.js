$(function() {
    queryData();


});
function queryData() {
    var url = requestPath + "/m/score/question/questionList.htm";
    var dataMap = {};
    dataMap.pageSize = 20;
    currentAjax  = $.ajaxjsonp(url, dataMap, function(data) {
       var d = eval(data);
       console.log(d);
       account = d.account;
       // console.log(d.signMap.today.dataString);
       if(!isNull(d.data)){
            if(scrollLoading){
                $("#list").append(template('list_page', d));
            }else{
                 $("#list").html(template('list_page', d));
            }
            $("#timemd5").val(account.timemd5);
        }else{
            $("#list").html("<div style='text-align: center; margin-top: 120px;'><img src='../../images/zwt.png' style='width: 109px;'></div>");
        }

    },true,function(){
    });
}

function doAnswer(id){
    $("#mcover").hide();
    var url = requestPath + "/m/score/question/scoreAnswer.htm";
    var dataMap = {};
    if (!isNull(id)) {
        dataMap.questionId = id;
    }else{
        showMessage('未获取到问题信息！');
        return;
    }
    var answer = $("#"+id+"_answer").val();
    if (!isNull(answer)) {
        if (answer.length<10) {
            showMessage('答案不能少于10个字！');
            return;
        }
        if (answer.length>300) {
            showMessage('答案不能多于300字！');
            return;
        }
        dataMap.answer = answer;
    }else{
        showMessage('未填写问题答案！');
        return;
    } 
    if (!isNull($("#timemd5").val())) {
        dataMap.timemd5 = $("#timemd5").val();
    }else{
        showMessage('未获取到个人信息！');
        return;
    }
     confirmMsg("您确认回答此问题?", function() {
            $.ajaxjsonp(url, dataMap, function(data) {
                 var d = eval(data);
                console.log(d);
                $("#timemd5").val(d.account.timemd5);
                showMessage("答题成功，奖励3000纤币");
                setTimeout('location.reload()',800);
            });
        });
}

function showAnswerWindow(id){
    $(".dyd_form").hide();
    $("#"+id+"_window").show();
}
function giveup(){
    $(".dyd_form").hide();
}
