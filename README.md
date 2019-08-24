## 图片使用
```less
background-image: url(@/assets/images/2.jpg);
```
```html
<img src="@/assets/images/3.png" alt="">
```


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


## CSS

### 公用css
* `common/*.less` => `assets/css/common.css`


## JS

### 公用js
* `common/*.js` => `assets/js/common.js`

### ES6使用
* 只能在`.js`文件中使用


## gulp插件

### ES6转ES5
```bash
# es6转es5 添加.babelrc
npm i babel-core babel-preset-es2015 gulp-babel@7 -D
```