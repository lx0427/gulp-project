const gulp = require('gulp')
const less = require('gulp-less') // 合并文件
const concat = require('gulp-concat') // 合并文件
const uglify = require('gulp-uglify') // js 压缩
const csso = require('gulp-csso') // css压缩
const htmlmin = require('gulp-htmlmin') // html压缩
const imagemin = require('gulp-imagemin') // 图片压缩
const pngquant = require('imagemin-pngquant')
const clean = require('gulp-clean') // 清空文件夹
const replace = require('gulp-replace') // 替换
const gulpif = require('gulp-if') // 判断
const minimist = require('minimist') // 获取命令行传递参数
const babel = require('gulp-babel') // ES6转ES5
const webserver = require('gulp-webserver') // 启服务
const cache = require('gulp-cache') // 缓存，只处理修改过的文件

const ejs = require('gulp-ejs') // 处理模板引入
// const template  = require('gulp-art-include') // 处理文件引入解析

let knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
}
// 配置
let config = {
  filePath: {
    less: ['./src/**/*.less'],
    art: ['./src/**/*.art'],
    js: ['./src/**/*.js'],
    html: ['./src/**/*.html'],
    image: ['./src/**/*.{jpg,png,gif,jpeg,svg}'],
  },
  command: minimist(process.argv.slice(2), knownOptions)
}
console.log(JSON.stringify(config))

gulp.task('del', function () {
  return gulp.src(['./dist/'], {
    read: false,
    allowEmpty: true
  }).pipe(clean())
})
gulp.task('js', function () {
  return gulp
    .src(config.filePath.js)
    .pipe(babel())
    .pipe(gulpif(config.command.env === 'production', uglify()))
    .pipe(gulp.dest('dist'))
})
gulp.task('css', function () {
  return gulp
    .src(config.filePath.less)
    .pipe(replace('@/', '../../'))
    .pipe(less())
    .pipe(gulpif(config.command.env === 'production', csso()))
    .pipe(gulp.dest('dist'))
})
gulp.task('images', function () {
  return gulp
    .src(config.filePath.image)
    .pipe(
      gulpif(
        config.command.env === 'production',
        cache(
          imagemin({
            optimizationLevel: 5, // 默认：3  取值范围：0-7（优化等级）
            progressive: true, // 默认：false 无损压缩jpg图片
            multipass: true, // 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{
              removeViewBox: false
            }], // 不要移除svg的viewbox属性
            use: [pngquant()]
          })
        )
      )
    )
    .pipe(gulp.dest('dist'))
})
gulp.task('html', function () {
  return gulp
    .src(config.filePath.html)
    .pipe(ejs())
    // .pipe(template())
    .pipe(replace('.less', '.css'))
    .pipe(replace('@/', '../../'))
    .pipe(
      gulpif(
        config.command.env === 'production',
        htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        })
      )
    )
    .pipe(gulp.dest('dist'))
})
gulp.task('cache-clean', function () {
  cache.clearAll()
})
gulp.task('watch', function () {
  gulp.watch(config.filePath.js, ['js'])
  gulp.watch(config.filePath.less, ['css'])
  gulp.watch(config.filePath.image, ['images'])
  gulp.watch([...config.filePath.html, ...config.filePath.art], ['html'])
})
gulp.task('server', function () {
  gulp.src('./').pipe(
    webserver({
      host: '0.0.0.0',
      port: '8787',
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8787/dist/pages/customer/index.html'
    })
  )
})
gulp.task('default', ['del'], function () {
  gulp.start('js', 'css', 'images', 'html')
})
gulp.task('start', ['server', 'watch'])