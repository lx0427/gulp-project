$(function() {
     
        
    initPage(); 
});
function initPage() {

    $("#ykdTrue").hide();
    $("#ykdFlase").hide();
    queryData();
    setTimeout(initCanlende,2000);
}
    var enrollId;//报名活动主键id
    var list ;  //包含金额,品名,重量的所有集合
    var pieData = [];//饼图数据集合,只有金额和品名
    var lineData = [];//金额集合,用于折线图,从小月份到大月份排序
    var monthData = [];//月份集合,用于折线图
    var pieLabel = {}; //饼图label
    var series = {};// 饼图大小比例
    series.radius = ['30%', '70%'];
    series.center = ['50%', '60%'];
function queryData() {
     enrollId = '';//报名活动主键id
     list = null ;  //包含金额,品名,重量的所有集合
     pieData = [];//饼图数据集合,只有金额和品名
     lineData = [];//金额集合,用于折线图,从小月份到大月份排序
     monthData = [];//月份集合,用于折线图
     pieLabel = {}; //饼图label
     series = {};// 饼图大小比例
    series.radius = ['30%', '70%'];
    series.center = ['50%', '60%'];

    $("#list").html('');
    var url = requestPath + "/m/bill/getBill.htm";
    var dataMap = {};
    var rqStart = $("#rqStart").val();
    if(!isNull(rqStart)){
    dataMap.rqStart = rqStart.replace(' ','').replace('年','-').replace('月','');
    }else{
        dataMap.rqStart = currentDate().replace(' ','').replace('年','-').replace('月','');
    }

    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if(isNull(d)){
            return;
        }
        //报名地址的主键id
         if(!isNull(d.enrollId)){
            enrollId = d.enrollId;
         }

        //产品线对应订单
        if(!isNull(d.list)){
            list = d.list;
            //饼图
            if(list.length>0){
                for(var i=0;i<list.length;i++){
                    var pieObj = {};
                      pieObj.value = list[i].htamt;
                      pieObj.name = list[i].pm;
                      pieData[pieData.length] = pieObj;
                }
                setPieChart(list);
                $("#sumHtamt").text(list[0].sprice+'万元');
            }
            pieLabel = {normal:{
                        // formatter: '{b}\n{c}万\n89吨',
                        formatter: function(params){
                            return getLabel(params);
                        },
                    }};
            
        }else{
            pieData[0] = {value:0,name:'本月未消费'};
            $("#sumHtamt").text('0万元');
        }
        //月份对应订单金额
        if(!isNull(d.monList)){
            monthData = d.monList;
        }
        if(!isNull(d.monHtamtList)){
            lineData = d.monHtamtList;
        }
        //初始化图表
        initEchart();

        //优惠券
        if(!isNull(d.djq)){
            $("#quan").html(template('quan_page', d));
        }
        
        //逸控代
         if (!isNull(d.credit) && d.credit == 0 ) {
            $("#ykdTrue").hide();
            $("#ykdFlase").show();
         }else{
            $("#ykdTrue").show();
            $("#ykdFlase").hide();
            if(!isNull(d.ykdList) && d.ykdList.length>0){
            //逸控代
            $("#list").html(template('list_page', d)); 
            if(d.ykdList.length<3){
                $("#yinying").hide();
                $("#foldShowList").hide();
            }else{
                $("#yinying").show();
                $("#foldShowList").show();
            }
            }else{
                $("#list").html(template('list_page2'));
            }
         }
         
    },false,function(){setTimeout('dateFlag = false',1000);});
    
}

function initEchart(){
        /**
         * 图表切换
         */
        $("#pieChart").show();
        drawpie();
        
        $(".wx_change li").click(function(){
            $(this).addClass("on").siblings().removeClass("on");
            var index = $(this).index();
            if(index == 1) {
                $("#pieChart").hide();
                $("#lineChart").show();
                drawline();
            }else if(index == 0) {
                $("#pieChart").show();
                $("#lineChart").hide();
                drawpie();
            }
        });
}
 /**
     * 折线图
     */
    function drawline() {
        var lineChart = echarts.init(document.getElementById('lineChart'));
        var option = {
        tooltip : {
            trigger: 'axis',
            formatter: "{a} <br/> {b} : {c}万元"
        },
        xAxis: {
            type: 'category',
            data: monthData,
            axisLine:{
                lineStyle:{
                    width:0,
                },
            },
            axisTick:{
                show:false,
            },
        },
        yAxis: {
            type: 'value',
            show:false,
            axisLabel: {
            margin: 2,
            show:false,
            },
            splitLine:{
                show:false,
            },
            axisLine:{
                lineStyle:{
                    width:0,
                },
            },
        },
        grid: {
        left: 50
        },
        series: [{
            name: '消费金额',
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                }
            },
            data: lineData,
        }]
        };
        lineChart.setOption(option);
    }
        
    /**
     * 饼图
     */
    function drawpie() {
        var pieChart = echarts.init(document.getElementById('pieChart'));
        var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万元 <br/>({d}%)"
        },
        // color:['#2899ec', '#edc91f','#e9713d'],
        color:['#2899ec', '#edc91f','#e9713d','#ec81e5','#ff1a2a','#ecfc74'],
        series : [
            {
                name: '消费分类',
                type: 'pie',
                radius: series.radius,
                center: series.center,
                label:pieLabel,
                data:pieData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

            }
        ]
        };
        pieChart.setOption(option);
    }

    /**
    * 表格展开
    */
        var showListStatue = 1;
        function showList(){
        if(showListStatue==1){
            $(".fold").parents(".tbody").find(".hide").show();
            $(".fold").parents(".tbody").find(".linearbg").hide();
            $(".fold").find("i").addClass("on");
            $(".fold").find("label").text("收起");
            showListStatue=0;
        }else{
            $(".fold").parents(".tbody").find(".hide").hide();
            $(".fold").parents(".tbody").find(".linearbg").show();
            $(".fold").find("i").removeClass("on");
            $(".fold").find("label").text("展开");
            showListStatue=1;
         }
        }

var clickFlag = true; // 是否允许点击，
var isLogin = false; // 是否登录， false未登录， true 已登录
function openCoupon(){
    if(!clickFlag){
        return false;
    }
    // if (!isLogin) {
    //     toLogin();
    //     return false;
    // }
    openPage("我的优惠券", "../customer/couponList.html","1");
}

function openOrder(){
    if(!clickFlag){
        return false;
    }
    // if (!isLogin) {
    //     toLogin();
    //     return false;
    // }
    openPage("订单查询", "../public/sapOrder.html","1");

}

function toYkd(){
    if(!clickFlag){
        return false;
    }
    // if (!isLogin) {
    //     toLogin();
    //     return false;
    // }
    if(enrollId == '-1'){
        showMessage('报名通道已关闭,后续请关注微商城首页活动');
    }else{
        openPage("逸控代报名", "../customer/enroll.html?eid="+enrollId,"1");
    }
}
function getLabel(params){
    for(var i =0;i<list.length;i++){
        if(params.name == list[i].pm){
           return params.name+'\n'+params.value+'万元\n'+list[i].sl2+'吨';
        }
    }

}
function setPieChart(d){
    var radius = ['30%', '70%'];
    var center = ['50%', '60%'];
    //percent金额占总金额的百分比,乘以10000后的值
    if(!isNull(d)){
        if(d.length>=2){
            if(d[0].percent > 4137 && d[0].percent<5863){
                radius = ['27%','66%'];
            }
        }
        if(d.length>=3){
            if(d[0].percent > 8213){
                center = ['50%','63%'];
            }
            if(d[0].percent >8661){
                radius = ['20%','50%'];
            }
        }
        if(d.length>4){
            if(d[0].percent >8065){
                radius = ['10%','45%'];
            }
        }
        if(d.length>5){
            if(d[0].percent >8000){
                radius = ['10%','45%'];
                center = ['50%','75%'];
            }
        }
    }   
    series.radius = radius;
    series.center = center;
}

template.helper("getDate", function(str) {
    if (isNull(str)) {
        return;
    }
    str = str.replace(/-/g, '/');
    if (str.length > 19) {
        str = str.substring(0, 19);
    }
    var date = new Date(str);
    return date.format('yyyy.MM.dd');
});
//给时间选择器填充内容
var dateFlag = false;
function initCanlende(){
        var date = new Date();
        var seperator1 = "年";
        var seperator2 = "月";
        var currentYear = date.getFullYear();
        var year = currentYear;
        var month = 12;
        var month2 = date.getMonth();
        var months = [];
        var months2 = [];
        var years = [];
        while(month>0){
            months[months.length] = month+seperator2;
            month--;
        }
        while(month2>0){
            months2[months2.length] = month2+seperator2;
            month2--;
        }
        while(year>=2000){
            years[years.length] = year+seperator1;
            year--;
        }
        $("#rqStart").val(currentDate());
        $("#rqStart").picker({
            title: "请选择",
            cols: [
            {
              textAlign: 'center',
              values: years,
              width:'50%',
              textAlign:'right',
            },
            {
              textAlign: 'center',
              values: months,
              width:'50%',
              textAlign:'left',
          },


          ],
          onClose: function(result){
            if(dateFlag){
            $("#pieChart").html('');
            $("#lineChart").html('');
            $("#pieChart").show();
            $("#lineChart").hide();
            $(".wx_change li:first").addClass("on").siblings().removeClass("on");
            queryData();
            }
          },
          onChange:function(result){
            dateFlag = true;
            // console.log(result);
          }
        });
        // $("#rqStart").data().picker.value=['2018年','9月'];

}  
//获取当前时间上一个月的年月值
function currentDate(){
        var date = new Date();
        var seperator1 = "年 ";
        var seperator2 = "月";
        var year = date.getFullYear();
        var month = date.getMonth();
        if(month==0){
            month=12;
        }
        var months = [];
        var years = [];
        var currentdate = year + seperator1 + month + seperator2;
        return currentdate;
}    
function openPicker(){
    $("#rqStart").picker("open");
}