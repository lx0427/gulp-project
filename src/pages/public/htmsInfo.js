$(function() {
    var url = window.location.href;
    scanRecord(40,0,'',url,'','物流信息详情');
    queryData();

});

function queryData() {
    var dataMap = {};
    var url = requestPath + "/m/order/toHtmsInfo.htm?vbeln="+$("#vbeln").val() + "&&sapCode=" + $("#sapCode").val();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        //40.2795256688
        //93.9111328125
				//latitude: d.latitude, // 纬度，浮点数，范围为90 ~ -90
				//longitude: d.longitude, // 经度，浮点数，范围为180 ~ -180。
				var thisLatitude = 30.1630700000;
				var thisLongitude = 120.4029600000;
				if (!isNull( d.latitude) && !isNull(d.longitude)) {
					thisLatitude = d.latitude;
					thisLongitude = d.longitude;
				}
				//初始化地图对象，加载地图
		    var map = new AMap.Map("container", {
		        resizeEnable: true,
		        center: [thisLatitude, thisLongitude],//地图中心点
		        zoom: 13 //地图显示的缩放级别
		    });
		    //添加点标记，并使用自己的icon
		    new AMap.Marker({
		        map: map,
				position: [thisLatitude, thisLongitude],
		        icon: new AMap.Icon({
		            size: new AMap.Size(400, 500),  //图标大小
		            image: "http://wxmall.hengyi.com/hengyi-mobile/wx/images/car_03.png",
		        })
		    });

				$("#container").css("top","43%");
				$("#container").css("height","57%");
        $("#sec").append(template('sec_page', d));
    });
}

// 获取参数
function getDataMap() {
    var dataMap = {};

    var orderCode = $("#orderCode").val();
    if (!isNull(orderCode)) {
        dataMap.orderCode = orderCode;
    }
    var sapCode = $("#sapCode").val();
    if (!isNull(sapCode)) {
        dataMap.sapCode = sapCode;
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