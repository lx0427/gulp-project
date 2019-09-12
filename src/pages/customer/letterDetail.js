$(function() {
    queryData();
});

function queryData(){
    var url = requestPath + "/m/letter/showLetterDetail.htm";
    var dataMap = {};
    dataMap.pkid=$("#pkid").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        $('#content').html(d.exLetter.content);
        $('#title').text(d.exLetter.title);
        $('#createdate').text(d.exLetter.createdate.substring(0,19));
    });
}