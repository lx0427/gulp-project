$(function() {
    queryData(); 
});

function queryData() {

    var url = requestPath + "/m/guessPrice/getDrawline.htm";
    var dataMap = {};
    
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        console.log(d);
        if(isNull(d)){
            return;
        }
       	

		$(".chart").show();
		drawline1();
		drawline2();
		drawline3();
		
    },false,function(){setTimeout('dateFlag = false',1000);});
    
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
 * 折线图1
 */
function drawline1() {
	var lineChart = echarts.init(document.getElementById('lineChart1'));
	var option = {
		grid: {
	        left: '0',
	        right: '20',
	        top: '30%',
	        bottom: '0',
	        containLabel: true
	    },
		legend: {
	        data:[
	        {
	        	name: 'POY预测',
	        	textStyle: {
		        	color: '#c23531',
		        }
	        },{
	        	name: 'POY均价',
	        	textStyle: {
		        	color: '#2f4554',
		        }
	        }],
	        itemHeight: 5,
	        itemWidth: 15,
	        padding: [25,0,0,0],
	    },
	    tooltip: {
	    	triggerOn: 'click'
	    },
		xAxis: {
			type: 'category',
			data: ['第1期', '第2期', '第3期', '第4期', '第5期']
		},
		yAxis: {
			type: 'value',
			min: 8.6
		},
		series: [{
			name: 'POY预测',
			data: [9.25, 9.51, 9.66, 9.11, 9.51],
			type: 'line',
			label: {
				normal: {
					show: true
				}
			}
		},{
			name: 'POY均价',
			data: [9.25, 9.21, 9.41, 9, 9.5],
			type: 'line',
			label: {
				normal: {
					show: true
				}
			}
		}]
	};
	lineChart.setOption(option);
}

/**
 * 折线图2
 */
function drawline2() {
	var lineChart = echarts.init(document.getElementById('lineChart2'));
	var option = {
		grid: {
	        left: '0',
	        right: '20',
	        top: '30%',
	        bottom: '0',
	        containLabel: true
	    },
		legend: {
	        data:[
	        {
	        	name: 'FDY预测',
	        	textStyle: {
		        	color: '#c23531',
		        }
	        },{
	        	name: 'FDY均价',
	        	textStyle: {
		        	color: '#2f4554',
		        }
	        }],
	        itemHeight: 5,
	        itemWidth: 15,
	        padding: [25,0,0,0],
	        textStyle: {
	        	color: '#3e7caf',
	        }
	    },
	    tooltip: {
	    	triggerOn: 'click'
	    },
		xAxis: {
			type: 'category',
			data: ['第1期', '第2期', '第3期', '第4期', '第5期']
		},
		yAxis: {
			type: 'value',
			min: 8.6
		},
		series: [{
			name: 'FDY预测',
			data: [10.36, 9.8, 9.5, 10.21, 9.61],
			type: 'line',
			label: {
				normal: {
					show: true
				}
			}
		},{
			name: 'FDY均价',
			data: [10.14, 9.8, 9.5, 9.6, 9.31],
			type: 'line',
			label: {
				normal: {
					show: true
				}
			}
		}]
	};
	lineChart.setOption(option);
}

/**
 * 折线图3
 */
function drawline3() {
	var lineChart = echarts.init(document.getElementById('lineChart3'));
	var option = {
		grid: {
	        left: '0',
	        right: '20',
	        top: '30%',
	        bottom: '0',
	        containLabel: true
	    },
		legend: {
	        data:[
	        {
	        	name: 'DTY预测',
	        	textStyle: {
		        	color: '#c23531',
		        }
	        },{
	        	name: 'DTY均价',
	        	textStyle: {
		        	color: '#2f4554',
		        }
	        }],
	        itemHeight: 5,
	        itemWidth: 15,
	        padding: [25,0,0,0],
	        textStyle: {
	        	color: '#3e7caf',
	        }
	    },
	    tooltip: {
	    	triggerOn: 'click'
	    },
		xAxis: {
			type: 'category',
			data: ['第1期', '第2期', '第3期', '第4期', '第5期']
		},
		yAxis: {
			type: 'value',
			min: 11
		},
		series: [{
			name: 'DTY预测',
			data: [11.91, 11.36, 14.11, 13.21, 14.96],
			type: 'line',
			label: {
				normal: {
					show: true
				}
			}
		},{
			name: 'DTY均价',
			data: [11.51, 11.36, 11.5, 12.21, 14.51],
			type: 'line',
			label: {
				normal: {
					show: true
				}
			}
		}]
	};
	lineChart.setOption(option);
}

