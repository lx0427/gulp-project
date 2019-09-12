

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh";



/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    if(i18nLanguage !="zh"){
	/*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    console.log("optionEle:" + optionEle.attr('content'));
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');
    
		 /* 需要引入 i18n 文件*/
        if ($.i18n == undefined) {
            console.log("请引入i18n js 文件")
            return false;
        };
        

        /*
        这里需要进行i18n的翻译
         */
        jQuery.i18n.properties({
            name : sourceName, //资源文件名称
            path : '../../i18n/', //资源文件路径
            mode : 'map', //用Map的方式使用资源文件中的值
            language : i18nLanguage,
            callback : function() {//加载成功后设置显示内容
				//
                var insertEle = $(".i18n");

                console.log(".i18n 写入中...");
                insertEle.each(function() {
                    // 根据i18n元素的 name 获取内容写入
				    $(this).html($.i18n.prop($(this).attr('name')));
                });
                console.log("写入完毕");

                //input placeholder 提示的值
				console.log(".i18n_ph 写入中...");
                var insertInputphEle = $(".i18n_ph");
                insertInputphEle.each(function() {
                    $(this).attr('placeholder',$.i18n.prop($(this).attr('name')));
                 });
				console.log("写入完毕");

				//input value 部分按钮的值
				console.log(".i18n_va 写入中...");
                var insertInputvaEle = $(".i18n_va");
                insertInputvaEle.each(function() {
                    $(this).val($.i18n.prop($(this).attr('name')));
                 });
				console.log("写入完毕");
				
				//html title 
				console.log(".i18n_title 写入中...");
                var insertHtmlTile = $("title");
                    $("title").html($.i18n.prop($("title").attr('name')));
				console.log("写入完毕");
            }
        });
		} else if (i18nLanguage =="zh") {
				/*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    console.log("optionEle:" + optionEle.attr('content'));
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');
    
		 /* 需要引入 i18n 文件*/
        if ($.i18n == undefined) {
            console.log("请引入i18n js 文件")
            return false;
        };
        

        /*
        这里需要进行i18n的翻译
         */
        jQuery.i18n.properties({
            name : sourceName, //资源文件名称
            path : '../../i18n/', //资源文件路径
            mode : 'map', //用Map的方式使用资源文件中的值
            language : i18nLanguage,
            callback : function() {//加载成功后设置显示内容
            }
        });
		}

}

/*页面执行加载执行*/
$(function(){

    /*执行I18n翻译*/
    execI18n();

   
});