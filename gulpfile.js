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
var gulpif = require('gulp-if') // 判断
var minimist = require('minimist') // 获取命令行传递参数
var babel = require('gulp-babel') // ES6转ES5
var webserver = require('gulp-webserver') // 启服务
const cache = require('gulp-cache') // 缓存，只处理修改过的文件

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
}
var options = minimist(process.argv.slice(2), knownOptions)
console.log(JSON.stringify(options))

gulp.task('del', function() {
  return gulp.src(['./dist/'], { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task('js', function() {
  return gulp
    .src(['./src/**/*.js'])
    .pipe(babel())
    .pipe(gulpif(options.env === 'production', uglify()))
    .pipe(gulp.dest('dist'))
})
gulp.task('css', function() {
  return gulp
    .src(['./src/**/*.less'])
    .pipe(replace('@/', '../../../'))
    .pipe(less())
    .pipe(gulpif(options.env === 'production', csso()))
    .pipe(gulp.dest('dist'))
})
gulp.task('images', function() {
  return gulp
    .src(['./src/**/*.{jpg,png,gif,jpeg,svg}'])
    .pipe(
      gulpif(
        options.env === 'production',
        cache(
          imagemin({
            optimizationLevel: 5, // 默认：3  取值范围：0-7（优化等级）
            progressive: true, // 默认：false 无损压缩jpg图片
            multipass: true, // 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{ removeViewBox: false }], // 不要移除svg的viewbox属性
            use: [pngquant()]
          })
        )
      )
    )
    .pipe(gulp.dest('dist'))
})
gulp.task('html', function() {
  return gulp
    .src(['./src/**/*.html'])
    .pipe(replace('.less', '.css'))
    .pipe(replace('@/', '../../../'))
    .pipe(
      gulpif(
        options.env === 'production',
        htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        })
      )
    )
    .pipe(gulp.dest('dist'))
})
// 清理缓存
gulp.task('cache-clean', function() {
  cache.clearAll()
})
// 监听
gulp.task('watch', function() {
  gulp.watch(['./src/**/*.js'], ['js'])
  gulp.watch(['./src/**/*.less'], ['css'])
  gulp.watch(['./src/**/*.{jpg,png,gif,jpeg,svg}'], ['images'])
  gulp.watch(['./src/**/*.html'], ['html'])
})
// 服务
gulp.task('server', function() {
  gulp.src('./').pipe(
    webserver({
      host: '0.0.0.0',
      port: '8787',
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8787/dist/pages/customer/customer/customer.html'
    })
  )
})
gulp.task('default', ['del'], function() {
  gulp.start('js', 'css', 'images', 'html')
})
gulp.task('start', ['server', 'watch'])
