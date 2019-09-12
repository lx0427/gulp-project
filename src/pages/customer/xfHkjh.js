$(function() {
 
    initPage();

 });

function initPage() {
    $("#pageIndex").val(0);
    $("#list").html("");
    queryData();
}

var bindZtFlag = true;
var queryFlag = false;
function queryData() {
    if(queryFlag){
        return false;
    }    
    var url = requestPath + "/m/xf/hkjh/list.htm";
    var dataMap = getDataMap();
    queryFlag = true;
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		
      $("#list").html(template('list_page', d));
        
	}, false, function(){
        queryFlag = false;
    });
}





function getDataMap() {
    var dataMap = {};
   
    if (!isNull($("#fphm").val())) {
        dataMap.fphm = $("#fphm").val();
    }

    return dataMap;
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
template.helper("getPrice", function(price) {
	     if(!isNull(price) && price == 0) {
            return "0.00";
        }else{
         return outputmoney(price);
		}
      
});



function outputmoney(number) {
	if (isNaN(number) || number == "") return "";
	number = Math.round(number * 100) / 100;
	if (number < 0)
		return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
	else
		return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}
//格式化金额 
function outputdollars(number) {
	if (number.length <= 3)
		return (number == '' ? '0' : number);
	else {
		var mod = number.length % 3;
		var output = (mod == 0 ? '' : (number.substring(0, mod)));
		for (i = 0; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod + 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
}
function outputcents(amount) {
	amount = Math.round(((amount) - Math.floor(amount)) * 100);
	return (amount < 10 ? '.0' + amount : '.' + amount);
}

