```bash
# es6转es5 添加.babelrc
npm i babel-core babel-preset-es2015 gulp-babel@7 -D
```

## 图片使用
```less
background-image: url(@/assets/images/2.jpg);
```
```html
<img src="@/assets/images/3.png" alt="">
```

## ES6使用
* 只能在`.js`文件中使用

## art-template
* 注意页面加载顺序，确保使用template,模板dom已经加载完成

```html
<div id="content"></div>
<script id="list" type="text/html">
  <ul>
    {{each list value i}}
    <li>{{value}} -- {{i}}</li>
    {{/each}}
  </ul>
</script>
<script src="@/assets/lib/template-web.js"></script>
<script>
  $('#content').append(template('list', {
    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
  }));
</script>
```
