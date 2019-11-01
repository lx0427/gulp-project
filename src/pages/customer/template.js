$(() => {
  var data = {
    title: '基本例子',
    olist: [{
        name: '张三',
        age: 12
      },
      {
        name: '李四',
        age: 13
      }
    ],
    list: ['<p>标签</p>', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
  };

  // 循环: 索引、值、data、原文输出
  // $('#eachWrap').html(template('eachTpl', data))
  // 直接传入数组
  $('#eachWrap').html(template('arrTpl', data.olist))
})