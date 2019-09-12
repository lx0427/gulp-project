$(function() {

    // getAddressList();

});

function getAddressList() {
    //正式打开注释
    $(".rule22").show();
   //正式打开注释
    var bz = false;
    //ready权限验证 --正确就得到微信经纬度  
    wx.ready(function() {
        wx.getLocation({  
            success : function(res) {  
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90  
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                times = Date.parse(new Date());
                bz = true; 
                console.log("i am first!");
                submitOrderInfoClick(latitude,longitude); 
            },  
            cancel : function(res) {  
                alert('用户拒绝授权获取地理位置');  
            }  
        }); 
    });  
    wx.error(function(res) {  
        alert("验证出错"+res.errMsg);  
    });
        
    //5s后执行countHs方法
    setTimeout(function(){
        if (!bz) {
            countHs();
        }
    },5000);
     
    /*times = Date.parse(new Date());
    submitOrderInfoClick("30.2931688190","120.0446569920");*/
}

function showAddressPopup() {
    $("#addressPopup").popup();
    getAddressList();
}

function chooseAddress(address) {
    $("#place").val(address);
    $("#placeInfo").val(address);
    $("#place").trigger("change");
}

function submitOrderInfoClick(a,b) {
    var url = requestPath + "/m/informationReports/toGoogleStr.htm";
    $("#customerPlaceInfo").val(a+","+b);
    $.ajaxjsonp(url, {  
            latitude : a,  
            longitude : b  
        }, function(data) {
            var d = eval(data);
            $("#placeInfo").val("");
            $("#addressList").html("");
            console.info("位置:"+JSON.stringify(d));
            if (d.msg != null) {
                if (d.msg.length > 0) {
                   $(".rule22").hide();
                   $("#addressList").html(template('addressList_page', d));
                    // $("#addressCount").html(d.recordCount);
                } else {
                    if ((Date.parse(new Date()) - times) > 10000) {
                        // $(".rule22").show();
                        var errormsg = "未获取到当前地理位置，请打开GPS定位服务和微信定位权限，重新获取";
                        showMessage(errormsg);
                        return false;
                    }
                    if (stopExec) {
                        return false;
                    }
                            wx.getLocation({  
                        success : function(res) {  
                            var latitude = res.latitude;
                            var longitude = res.longitude;  
                            submitOrderInfoClick(latitude,longitude);  
                        },  
                        cancel : function(res) {  
                            showMessage('用户拒绝授权获取地理位置');  
                        }  
                    });
                } 
        } else {
                var errormsg = "未获取到当前地理位置，请打开GPS定位服务和微信定位权限，重新获取";
                showMessage(errormsg);
        }
    }, false, function() {
         $("#zwt-img").css('display','none');
    });
}


var times;
var stopExec = false;//停止获取地址（超时了）
function countHs() {
    console.log("countHs is running!");
    var t = Date.parse(new Date());
    var errormsg = " <div class='i_spinner'><span>未获取到当前地理位置，请打开GPS定位服务和微信定位权限，重新获取</span></div>";
    while (true) {
        var placeInfo = $("#placeInfo").val();
        if (!isNull(placeInfo)) {
            return false;
        }
        
        if ((Date.parse(new Date()) - t) > 5000) {//超过10s
            $(".rule22").show();
        $(".pop-up-main").html(errormsg);
            stopExec = true;
            return false;
        }
    }
}
