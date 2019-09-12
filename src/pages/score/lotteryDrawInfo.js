$(function() {
    queryData();

});


var isLogin = false; // 是否登录

 var  title="";
 var  content="";
 var  wxUrl=""; // 取当前页面地址    
 var  imageUrl="";
function queryData() {
    var url = requestPath + "/m/score/lotteryDraw/lotteryDrawInfo.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
		var rules=d.ld.ldRules.split(";");
		if(rules.length<2){
			 rules=d.ld.ldRules.split("；");
		}
		  d.ruleslist=rules;
		  title=d.ld.ldName;
          content=d.ld.ldRules;
          wxUrl = location.href; // 取当前页面地址    
          imageUrl=filePath+d.ld.ldImgurl;

		$(".hb_rule").css("background",d.ld.str04);
        $(".hb_dzp").css("background",d.ld.str03);
		$(".wojp").css("background",d.ld.str03);
        

        $("#rules").html(template('rules_info', d));
		$("#record").html(template('record_info', d));
		$("#recordList").html(template('record_list', d));
		$("#hdimg").html(template('hd_img', d));

     

        canvasinfo(d);//绘制转盘
        //toFx();   
		shareWx0(title, content, "", imageUrl, wxUrl, wxUrl);    
		    
    });
}

function getDataMap() {
    var dataMap = {};

    if (!isNull($("#pkid").val())) {
        dataMap.pkid = $("#pkid").val();
    }

	if (!isNull($("#auctionId").val())) {
        dataMap.auctionId = $("#auctionId").val();
    }

	if (!isNull($("#auctionmxId").val())) {
        dataMap.auctionmxId = $("#auctionmxId").val();
    }

	if (!isNull($("#flag01").val())) {
        dataMap.flag01 = $("#flag01").val();
    }

    return dataMap;
}


var turnplate={
		restaraunts:[],				//大转盘奖品名称
		colors:[],					//大转盘奖品区块对应背景颜色
		outsideRadius:192,			//大转盘外圆的半径
		textRadius:155,				//大转盘奖品位置距离圆心的距离
		insideRadius:68,			//大转盘内圆的半径
		startAngle:0,				//开始角度
		
		bRotate:false				//false:停止;ture:旋转
};

function canvasinfo(d) {
      	
		turnplate.restaraunts = [d.list[0].prizesName, d.list[1].prizesName, d.list[2].prizesName, d.list[3].prizesName, d.list[4].prizesName, d.list[5].prizesName, d.list[6].prizesName, d.list[7].prizesName, d.list[8].prizesName, d.list[9].prizesName];
	    turnplate.colors = ["#fe7576", "#fe6869", "#fe7576", "#fe6869","#fe7576", "#fe6869", "#fe7576", "#fe6869","#fe7576", "#fe6869"];

		var rotateTimeOut = function (){
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:2250,
			duration:8000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	    };


	



	
	$('.pointer').click(function (){
		if(turnplate.bRotate)return;
		turnplate.bRotate = !turnplate.bRotate;
		//获取随机数(奖品个数范围内)
		var item = rnd(1,turnplate.restaraunts.length);
		
	});

	drawRouletteWheel();

}

	//旋转转盘 item:奖品位置; txt：提示语;
	var rotateFn = function (item, txt ,typ){
		var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		$('#wheelcanvas').stopRotate();
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:8000,
			callback:function (){
				 // console.log(txt);

        // console.log('转盘结果');
        // console.log(turnplate.restaraunts);
				if("谢谢参与"==txt){
				showMessage("很遗憾，再接再厉哦");
				}else if("3"==typ){
				showMessage("恭喜你，获得"+txt+"，微商城会联系您领取哦!");
				}else if("4"==typ){
				showMessage("恭喜你，获得"+txt+"，纤币已经发放至你账户，请查收!");
				}else{
				showMessage("恭喜你，获得"+txt+"，券已经发放至你账户，请查收");
				}
				
				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};

function rnd(n, m){

	var url = requestPath + "/m/score/lotteryDraw/lotteryDraw.htm";
    var dataMap = getDataMap();
    $.ajaxjsonp(url, dataMap, function(data) {
        var d = eval(data);
        // console.log(d);
        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 225, 180, 144, 108, 72, 36, 360, 324, 288]
		rotateFn(d.index+1, turnplate.restaraunts[d.index] ,d.prize.prizesTyp);
	
	
        
       });
	

	
}




function drawRouletteWheel() {    
  var canvas = document.getElementById("wheelcanvas");    
  if (canvas.getContext) {
	  //根据奖品个数计算圆周角度
	  var arc = Math.PI / (turnplate.restaraunts.length/2);
	  var ctx = canvas.getContext("2d");
	  //在给定矩形内清空一个矩形
	  ctx.clearRect(0,0,450,450);
	  //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
	  ctx.strokeStyle = "#FFBE04";
	  //font 属性设置或返回画布上文本内容的当前字体属性
	  ctx.font = '30px Microsoft YaHei';      
	  for(var i = 0; i < turnplate.restaraunts.length; i++) {       
		  var angle = turnplate.startAngle + i * arc;
		  ctx.fillStyle = turnplate.colors[i];
		  ctx.beginPath();
		  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
		  ctx.arc(225, 225, turnplate.outsideRadius, angle, angle + arc, false);    
		  ctx.arc(225, 225, turnplate.insideRadius, angle + arc, angle, true);
		  ctx.stroke();  
		  ctx.fill();
		  //锁画布(为了保存之前的画布状态)
		  ctx.save();   
		  
		  //----绘制奖品开始----
		  ctx.fillStyle = "#FFFFFF";
		  var text = turnplate.restaraunts[i];
		  var line_height = 30;
		  //translate方法重新映射画布上的 (0,0) 位置
		  ctx.translate(225 + Math.cos(angle + arc / 2) * turnplate.textRadius, 225 + Math.sin(angle + arc / 2) * turnplate.textRadius);
		  
		  //rotate方法旋转当前的绘图
		  ctx.rotate(angle + arc / 2 + Math.PI / 2);
		  
		  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
		  if(text.indexOf("M")>0){//流量包
			  var texts = text.split("M");
			  for(var j = 0; j<texts.length; j++){
				  ctx.font = j == 0?'bold 20px Microsoft YaHei':'30px Microsoft YaHei';
				  if(j == 0){
					  ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
				  }else{
					  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				  }
			  }
		  }else if(text.indexOf("谢谢") != -1 && text.length>2){//奖品名称长度超过一定范围 
			  text = text.substring(0,2)+"||"+text.substring(2);
			  var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else if(text.indexOf("优惠券") != -1 && text.length>4){//奖品名称长度超过一定范围 
             if(text.indexOf("000") != -1){
			 text = text.substring(0,5)+"||"+text.substring(5);
			 }else{
             if(text.indexOf("00") != -1){
			 text = text.substring(0,4)+"||"+text.substring(4);
			 }else{
			 if(text.indexOf("0") != -1){
			 text = text.substring(0,3)+"||"+text.substring(3);
			 }else{
			  text = text.substring(0,2)+"||"+text.substring(2);
			 }
			 }
			 }

			  
			  var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  if(j==0){
					  ctx.font="30px Microsoft YaHei";
				  }else{
				      ctx.font="20px Microsoft YaHei";
				  }
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else if(text.indexOf("代金券") != -1 && text.length>4){//奖品名称长度超过一定范围 
             if(text.indexOf("000") != -1){
			 text = text.substring(0,4)+"||"+text.substring(4);
			 }else{
             if(text.indexOf("00") != -1){
			 text = text.substring(0,3)+"||"+text.substring(3);
			 }else{
			 if(text.indexOf("0") != -1){
			 text = text.substring(0,2)+"||"+text.substring(2);
			 }else{
			  text = text.substring(0,1)+"||"+text.substring(1);
			 }
			 }
			 }

			  
			  var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  if(j==0){
					  ctx.font="30px Microsoft YaHei";
				  }else{
				      ctx.font="20px Microsoft YaHei";
				  }
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else if(text.length>3){
		  	if(text.length==4 || text.length==5){
		  		text = text.substring(0,2)+"||"+text.substring(2);
			}else if(text.length>5 && text.length<7){
		  		text = text.substring(0,3)+"||"+text.substring(3);
			}else if(text.length>7 && text.length<10){
		  		text = text.substring(0,3)+"||"+text.substring(3,6)+"||"+text.substring(6);
			}else{
				text = text.substring(0,3)+"||"+text.substring(3,6)+"||"+text.substring(6,9);
			}
			var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  if(j==0){
					  ctx.font="30px Microsoft YaHei";
				  }else if(j==1){
				      ctx.font="23px Microsoft YaHei";
				  }else{
				  	  ctx.font="16px Microsoft YaHei";
				  }
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else{
			  //在画布上绘制填色的文本。文本的默认颜色是黑色
			  //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
			  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		  }
		  
		 
		  //把当前画布返回（调整）到上一个save()状态之前 
		  ctx.restore();
		  //----绘制奖品结束----
	  }     
  } 
}




function shareAppMessage () {
	 var url = window.location.href;
    scanRecord(7,2,'',url,'抽奖分享');
}
function shareTimeline () {
  
}

function shareQQ () {
  
}
	