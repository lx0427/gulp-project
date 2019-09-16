// 本地开发配置
// var requestPath = 'http://192.168.0.107/hengyi-mobile' // 測試地址
// var requestPath = 'http://10.21.16.202/hengyi-mobile' // 义超
// var requestPath = 'http://10.21.16.193:8081' // 学岩
// var requestPath = 'http://10.21.16.201:8081/hengyi-mobile' // 刘园
// var requestPath = 'http://10.21.16.150' // 王杰
// var filePath = 'http://center.steel56.com.cn/webresource'
// var oauthServerPath = 'http://center.steel56.com.cn/hengyi-mobile/m' // 微信授权服务地址
// var oauthServerPath = 'http://weisc.hengyi.com/hengyi-mobile/m' // 微信授权服务地址

// 公司测试环境配置
// var requestPath = 'https://weisc.hengyi.com/hengyi-mobile'
// var filePathOld = 'https://weisc.hengyi.com/webresource'
// var filePath = 'https://weisc.hengyi.com/webresource'
// var oauthServerPath = 'https://weisc.hengyi.com/hengyi-mobile/m' // 微信授权服务地址
// var browsePath = 'https://weisc.hengyi.com/hengyi-mobile' // 浏览记录

// 客户生产环境配置
var requestPath = 'http://wxmall.hengyi.com/hengyi-mobile' //请求地址
var filePathOld = 'http://wxmall.hengyi.com/webresource'
var filePath = 'http://wxstore.hengyi.com:9099/webresource'
var oauthServerPath = 'http://wxmall.hengyi.com/hengyi-mobile/m' // 微信授权服务地址
var browsePath = 'http://wxstore.hengyi.com:9099/hengyi-webservice' // 浏览记录

var wxHtmlVersion = 'wx18'
var appPath =
  'http://center.steel56.com.cn/goldenmobile/app/phone/' +
  wxHtmlVersion +
  '/app_transport' //页面路径
var loginName = 'hengyiLogin()' // 登录方法名，不同项目登录方式可能不一样
var isServerPage = true // 是否使用服务器上的页面，安卓使用
var cloudPath = 'http://center.steel56.com.cn/goldenmobile/v1' // 云中心地址，有些使用到云中心地址，比如图片上传，因为公众号绑定的是云中心的域名
var circleId = '8712DE237AA81F64A792AC8863B92B91'

function hengyiLogin() {
  // 记录当前页面的地址,用于登录后回调
  var backUrl = location.href
  setLocalData('backUrl', backUrl)

  if (backUrl.indexOf('salesman') != -1) {
    if (isWeixinBrowse()) {
      var loginType = sessionStorage.getItem('loginType')
      if (!isNull(loginType)) {
        // 经销商登录
        openPage('登录', '../customer/login.html?loginType=' + loginType, '1')
      } else {
        // 业务员单点登录
        openPage(
          '登录',
          requestPath + '/m/login/doSalesmanLogin.htm?backUrl=' + backUrl,
          '1'
        )
      }
    } else {
      alert('请使用微信客户端浏览器登陆继续访问!')
      return false
    }
  } else {
    if (isWeixinBrowse()) {
      // 客户授权登录
      var loginUrl =
        oauthServerPath +
        '/weixin/jsapi/wxurl.htm?circleId=' +
        circleId +
        '&oauthType=hengyiLogin'
      openPage('登录', loginUrl, '1')
    } else {
      alert('请使用微信客户端浏览器登陆继续访问!')
      return false
    }
  }
}
