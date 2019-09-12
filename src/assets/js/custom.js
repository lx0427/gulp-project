function toShoppingCart(customerId) {
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel == 0) {
      toLogin()
    } else if (userLevel == 1) {
      toShoppingCart1(customerId)
    } else {
      showMessage('请完善资料!')
      setTimeout(function() {
        toShoppingCart1(customerId)
      }, 1000)
    }
  })
}

/**
 * 进入购物车页面
 * @param customerId		-- 客户代码
 */
function toShoppingCart1(customerId) {
  var url = ''
  var wxOpenid = sessionStorage.getItem('wxOpenid')
  if (!isNull(wxOpenid)) {
    // 已经授权过了
    // url = "../public/shoppingCart.html";
    url = '../public/shoppingCart1.html'
  } else {
    // 还未授权
    if (isWeixinBrowse()) {
      url =
        oauthServerPath +
        '/weixin/jsapi/wxurl.htm?circleId=' +
        circleId +
        '&oauthType=hengyiShoppingCart'
      //url = oauthServerPath + "/weixin/jsapi/wxurl.htm?circleId=" + circleId + "&oauthType=hengyiShoppingCart";
    } else {
      // url = "../public/shoppingCart.html";
      url = '../public/shoppingCart1.html'
    }
  }
  if (!isNull(customerId)) {
    if (url.indexOf('?') != -1) {
      url += '&customerId=' + customerId
    } else {
      url += '?customerId=' + customerId + ''
    }
  }
  var d = Math.random()
  if (url.indexOf('?') != -1) {
    url += '&d=' + d
  } else {
    url += '?d=' + d
  }
  openPage('购物车', url, '1')
}

function toIndex() {
  openPage('首页', '../customer/index.html', '1')
}

function toBuy() {
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      if (userLevel == 0) {
        toLogin()
      } else {
        showMessage('请完善资料!')
        setTimeout(function() {
          openPage('下单', '../customer/orderResourceList1.html', '1')
        }, 1000)
      }
    } else {
      openPage('下单', '../customer/orderResourceList1.html', '1')
    }
  })
}

function toMyPage() {
  openPage('我的', '../customer/my1.html', '1')
}

/**
 *  微信JS-SDK配置
 */
function wxconfig() {
  if (!isWeixinBrowse()) {
    return
  }
  var htmlurl = location.href // 取当前页面地址
  var url = oauthServerPath + '/weixin/jsapi/wxconfig.htm'
  var dataMap = { url: htmlurl }
  dataMap.url = htmlurl
  dataMap.circleId = circleId
  var wxtype = sessionStorage.getItem('wxtype')
  if (!isNull(wxtype)) {
    dataMap.wxtype = wxtype
  }
  //2失败，3成功
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    wx.config({
      debug: false,
      appId: d.appid,
      timestamp: d.timestamp,
      nonceStr: d.nonceStr,
      signature: d.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
    })
  })
}

// 从微信服务器上下载图片，覆盖掉app.js里的方法
function getWxImg(mediaId, callback) {
  var url = oauthServerPath + '/weixin/jsapi/getWxImg.htm'
  var dataMap = {}
  dataMap.mediaId = mediaId
  dataMap.circleId = circleId
  var wxtype = sessionStorage.getItem('wxtype')
  if (!isNull(wxtype)) {
    dataMap.wxtype = wxtype
  }
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    var uploadType = sessionStorage.getItem('uploadType')
    if (!isNull(uploadType) && uploadType === '1') {
      sessionStorage.setItem('uploadType', '0')
      eval(callback + "('" + d.data + "')")
    } else {
      var obj = JSON.parse(d.data)
      eval(callback + "('" + obj.result + "')")
    }
  })
}

var titlewx = ''
var contentwx = ''
var targetUrlwx = ''
var imageUrlwx = ''
var wxUrlwx = ''
var qqUrlwx = ''

function shareWx0(title, content, targetUrl, imageUrl, wxUrl, qqUrl) {
  titlewx = title
  contentwx = content
  targetUrlwx = targetUrl
  imageUrlwx = imageUrl
  wxUrlwx = wxUrl
  qqUrlwx = qqUrl

  setTimeout(shareWx1, 500)
}

function shareWx1() {
  wx.ready(function() {
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: titlewx, // 分享标题
      desc: contentwx, // 分享描述
      link: wxUrlwx, // 分享链接
      imgUrl: imageUrlwx, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        // 用户确认分享后执行的回调函数
        shareAppMessage()
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    })

    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: titlewx, // 分享标题
      link: wxUrlwx, // 分享链接
      imgUrl: imageUrlwx, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
        shareTimeline()
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    })

    // 分享到QQ
    wx.onMenuShareQQ({
      title: titlewx, // 分享标题
      desc: contentwx, // 分享描述
      link: qqUrlwx, // 分享链接
      imgUrl: imageUrlwx, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
        shareQQ()
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    })
  })
}

/**
 * 将毫秒数转为 天 时 分 秒的格式
 */
function getTimeStr(time) {
  if (time <= 0) {
    return '00天00时00分00秒'
  }
  var _second = 1000
  var _minute = _second * 60
  var _hour = _minute * 60
  var _day = _hour * 24

  // calculate dates
  var days = Math.floor(time / _day)
  var hours = Math.floor((time % _day) / _hour)
  var minutes = Math.floor((time % _hour) / _minute)
  var seconds = Math.floor((time % _minute) / _second)
  // fix dates so that it will show two digets
  days = String(days).length >= 2 ? days : '0' + days
  hours = String(hours).length >= 2 ? hours : '0' + hours
  minutes = String(minutes).length >= 2 ? minutes : '0' + minutes
  seconds = String(seconds).length >= 2 ? seconds : '0' + seconds

  return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
}

function scanShopping(d) {
  //商品加购物车记录
  var url = window.location.href
  //FDY-GD10503-54D/24F(60dtex/24f)-AA-000000001000311683
  var title = d.pm + '-' + d.cz + '-' + d.gg + '-' + d.cd + '-' + d.wzid
  console.info(title)
  scanRecord('97', '1', '1', url, title + ';加入购物车')
}

function scanRecord(a, b, c, d, infoName) {
  //浏览记录数据

  // var url = scanRecordPath + '/m/model/scanrecord/save.htm'
  var url =
    'http://wxstore.hengyi.com:9099/hengyi-webservice/m/model/scanrecord/save.htm'
  var dataMap = {}
  dataMap.modelType = a //大模块类型

  //首页-0 限时竞拍-1 优惠拼团-2 限时抢购-3 然辅料外卖-4 物资外卖-5
  //资源列表-6 公告页面-8 下单页面-9 购物车页面-10 我的页面-11
  //切换客户-12 待审核订单-13 订单查询-14 我的融资-15 余额查询-16
  //出库明细查询-17 发票对账-18 我的拼团-19 我的竞拍-20 我的优惠券-21
  //燃辅料订单-22 推荐有奖-23 我的资料-24 售后服务-25 物流列表-39 物流详情-40
  //限时购-50 秒杀活动-45  报名活动-92  客户专访-93  帮助中心-94  悬浮图标-95
  //三方竞拍-96 加入购物车 97
  dataMap.modelCtype = b //小模块，列表页
  dataMap.extbill = c //详情页，对应的详情id
  dataMap.pageUrl = d //当前页面url
  if (infoName.indexOf(';') != -1) {
    var str = infoName.split(';')
    dataMap.def1 = str[0] //
    dataMap.def6 = str[1] //详情名称
  } else {
    dataMap.def6 = infoName //详情名称
  }

  dataMap.hydm = getLocalData('scanhydm')
  dataMap.mbname = getLocalData('scanmbname')
  dataMap.userid = getLocalData('scanuserid')

  var wxOpenid = sessionStorage.getItem('wxOpenid')
  if (!isNull(wxOpenid)) {
    dataMap.openid = wxOpenid
  } else {
    dataMap.openid = getLocalData('scanuserid')
  }

  dataMap.mobile = getLocalData('scanmobile')
  dataMap.username = getLocalData('scanusername')

  //  console.info(dataMap);
  //
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
  })
}
/**
 * 查看用户状态
 * 0:未登录
 * 1:登录并已经完善资料
 * 2:登录, 资料未完善
 * @param {Object} callback
 */
function getUserInfo(callback) {
  if (
    sessionStorage.userLevel != null &&
    sessionStorage.userLevel != undefined &&
    sessionStorage.userLevel != 'null'
  ) {
    callback(sessionStorage.userLevel)
  } else {
    var url = requestPath + '/m/login/getUserInfo.htm'
    var dataMap = {}
    $.ajaxjsonp(url, dataMap, function(data) {
      var d = eval(data)
      console.info(d)
      if (isNull(d.user)) {
        // 未登陆
        sessionStorage.userLevel = 0
      } else {
        sessionStorage.userLevel = d.userLevel
      }
      callback(sessionStorage.userLevel)
    })
  }
}

function toMakeUpUserInfo() {
  openPage('基本信息 ', '../customer/userInfo.html', '1')
}

function toLogin() {
  eval(loginName)
}

function toRegister() {
  var url = ''
  var wxOpenid = sessionStorage.getItem('wxOpenid')
  if (!isNull(wxOpenid)) {
    // 已经授权过了
    url = '../customer/register1.html'
  } else {
    // 还未授权
    if (isWeixinBrowse()) {
      url =
        oauthServerPath +
        '/weixin/jsapi/wxurl.htm?circleId=' +
        circleId +
        '&oauthType=hengyiRegister'
    } else {
      url = '../customer/register1.html'
    }
  }
  openPage('注册', '../customer/register1.html', '1')
}

/**
 * @funciton 转换textarea存入数据库的回车换行和空格  textarea ---  数据库,用val取数据，置换'\n'
 */
function textareaTo(str) {
  if (!isNull(str)) {
    var reg = new RegExp('\n', 'gm')
    var regSpace = new RegExp(' ', 'gm')
    str = str.replace(reg, '<br>')
    str = str.replace(regSpace, '&nbsp;')
    return str
  }
}

/**
 * @funciton  数据库 ---  编辑页面  .val(str)
 */
function toTextarea(str) {
  if (!isNull(str)) {
    var reg = new RegExp('<br>', 'gm')
    var regSpace = new RegExp('&nbsp;', 'gm')
    str = str.replace(reg, '\n')
    str = str.replace(regSpace, ' ')
    return str
  }
}

/**
 * @funciton  获取悬浮图标
 */
var suspendData
function initSuspendIcon() {
  var url = requestPath + '/m/suspend/info.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    console.log(d)
    if (!isNull(d) && !isNull(d.info)) {
      suspendData = d
      var imgUrl = d.info.imgUrl
      if (d.info.isRead != null && d.info.isRead == '1') imgUrl = d.info.imgUrl2

      var html =
        "<div class='wx_zxzxz' id='xftb'><div style='text-align:center;' onclick='toHideParent()'><img style='width:22px;' src='../../images/wx_delicon.png'></div>"
      html +=
        "<div class='zxzx_box' onclick='toActivityPage()'><img style='height: 65px;'  src='" +
        d.filePath +
        imgUrl +
        "'></div></div>"
      $('body').append(html)
    }
  })
}

/**
 * @funciton   隐藏父类元素
 */
function toHideParent() {
  $('#xftb').hide()
}

/**
 * @funciton   跳到悬浮图标的指定活动链接
 */
function toActivityPage() {
  scanRecord(95, 0, '', suspendData.info.linkUrl, '悬浮图标')
  $('.wx_zxzxz img').attr(
    'src',
    suspendData.filePath + suspendData.info.imgUrl2
  )
  if (suspendData.info.activityType == 1) {
    openPage('活动', suspendData.info.linkUrl, '1')
  } else if (suspendData.info.isRead == '1') {
    //活动不是站内信或者活动是未读才保存点击记录
    openPage('活动', suspendData.info.linkUrl, '1')
  } else {
    var url = requestPath + '/m/suspend/saveBrowser.htm'
    var dataMap = {}
    console.log('开始保存点击记录')
    dataMap.suspendId = suspendData.info.pkid
    $.ajaxjsonp(url, dataMap, function(data) {}, false, function() {
      console.log('结束保存点击记录')
      openPage('活动', suspendData.info.linkUrl, '1')
    })
  }
}