const gulp = require('gulp')
const less = require('gulp-less') // 合并文件
const autoprefixer = require('gulp-autoprefixer') // 自动添加css前缀
const concat = require('gulp-concat') // 合并文件
const uglify = require('gulp-uglify') // js 压缩
const rename = require('gulp-rename')
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
var rev = require('xfx-gulp-rev') // 文件生成MD5
var revCollector = require('xfx-gulp-rev-collector') // 版本控制

let knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
}
let pkg = require('./package.json')
let appType = pkg.appType

// 配置
let config = {
  filePath: {
    commonLess: ['./src/css/common/*.less'],
    appJs: ['./config/*.js', './config/' + appType + '/app.min.js'],
    less: ['./src/**/*.{less,css}', '!./src/css/common/*.less'],
    art: ['./src/**/*.art'],
    libJs: ['./src/lib/*.js'],
    commonJs: ['./src/js/**/*.js'],
    pageJs: ['./src/pages/**/*.js'],
    html: ['./rev/**/*.json', './src/**/*.html'],
    image: ['./src/**/*.{jpg,png,gif,jpeg,svg}'],
    fonts: ['./src/fonts/*.*'],
    i18n: ['./src/i18n/*.*']
  },
  command: minimist(process.argv.slice(2), knownOptions)
}
console.log(JSON.stringify(config))

gulp.task('fonts', function () {
  return gulp.src(config.filePath.fonts).pipe(gulp.dest('dist/fonts/'))
})
gulp.task('i18n', function () {
  return gulp.src(config.filePath.i18n).pipe(gulp.dest('dist/i18n/'))
})
gulp.task('libJs', function () {
  // 老版本的art-template使用babel转义出错
  return gulp
    .src(config.filePath.libJs)
    .pipe(gulpif(config.command.env === 'production', uglify()))
    .pipe(gulp.dest('dist/lib/'))
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/libJs/'))
})
gulp.task('appJs', function () {
  return gulp
    .src(config.filePath.appJs)
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(gulpif(config.command.env === 'production', uglify()))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/appJs/'))
})
gulp.task('commonJs', function () {
  return gulp
    .src(config.filePath.commonJs)
    .pipe(babel())
    .pipe(gulpif(config.command.env === 'production', uglify()))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/commonJs/'))
})
gulp.task('pageJs', function () {
  return gulp
    .src(config.filePath.pageJs)
    .pipe(babel())
    .pipe(gulpif(config.command.env === 'production', uglify()))
    .pipe(gulp.dest('dist/pages/'))
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/js/'))
})
gulp.task('commonLess', function () {
  return gulp
    .src(config.filePath.commonLess)
    .pipe(replace('@/', '../../'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat('common.css'))
    .pipe(gulpif(config.command.env === 'production', csso()))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/commonLess/'))
})
gulp.task('less', function () {
  return gulp
    .src(config.filePath.less)
    .pipe(replace('@/', '../../'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(config.command.env === 'production', csso()))
    .pipe(gulp.dest('dist'))
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/less/'))
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
  return (
    gulp
    .src(config.filePath.html)
    .pipe(ejs({}))
    // .pipe(template())
    .pipe(replace('.less', '.css')) // 替换less文件名
    .pipe(replace('@/', '../../'))
    .pipe(revCollector())
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
  )
})
// 删除dist
gulp.task('del', function () {
  return gulp
    .src(['./dist/'], {
      read: false,
      allowEmpty: true
    })
    .pipe(clean())
})
// 清理上个版本rev-manifest.json
gulp.task('delRev', function () {
  return gulp
    .src(['./rev/'], {
      read: false,
      allowEmpty: true
    })
    .pipe(clean())
})
gulp.task('cache-clean', function () {
  cache.clearAll()
})
gulp.task('watch', function () {
  gulp.watch(config.filePath.appJs, ['appJs'])
  gulp.watch(config.filePath.commonJs, ['commonJs'])
  gulp.watch(config.filePath.pageJs, ['pageJs'])
  gulp.watch(config.filePath.commonLess, ['commonLess'])
  gulp.watch(config.filePath.less, ['less'])
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
  gulp.start('libJs', 'appJs', 'commonJs', 'pageJs', 'commonLess', 'less', 'fonts', 'i18n', 'images', 'html')
})

// dev
gulp.task('start', ['server', 'watch'])

// build
gulp.task(
  'build',
  ['libJs', 'appJs', 'commonJs', 'pageJs', 'commonLess', 'less', 'fonts', 'i18n', 'images'],
  function () {
    gulp.start('html') // 确保上述css,js对应的rev-manifest.json生成完毕后执行
  }
)