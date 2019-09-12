$(function() {
  if (!isWeixinBrowse()) {
    showMessage('请使用微信客户端浏览器登陆继续访问!')
    return false
  }

  // 获取上一次登录成功的手机号
  var loginMobile = getLocalData('loginMobile')
  if (!isNull(loginMobile)) {
    $('#mobile').val(loginMobile)
  }

  var wxOpenid = sessionStorage.getItem('wxOpenid')
  if (!isNull(wxOpenid)) {
    $('#openid').val(wxOpenid)
    queryData()
  } else if (!isNull($('#openid').val())) {
    wxOpenid = $('#openid').val()
    sessionStorage.setItem('wxOpenid', wxOpenid)
    queryData()
  } else {
    getOauthOpenid('initOauth')
  }
})

function initOauth() {
  queryData()
}

function queryData() {
  var url = requestPath + '/m/login/getUserInfo.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    if (!isNull(d.user)) {
      // 已登陆
      var backUrl = getLocalData('backUrl')
      console.log('backUrl:' + backUrl)
      if (!isNull(backUrl)) {
        removeLocalData('backUrl')
        var time = new Date().getTime()
        if (backUrl.indexOf('?') === -1) {
          backUrl += '?d=' + time
        } else {
          backUrl += '&d=' + time
        }
        openPage('', backUrl, '1')
      } else {
        // 到我的页面
        if (!isNull(d.user.isSalesman) && d.user.isSalesman === 1) {
          openPage('工作台', '../salesman/workbench.html', '1')
        } else {
          openPage('我的', '../customer/my1.html', '1')
        }
      }
    }
  })
}

var loginFlag = false

function doLogin() {
  /*if(!isWeixinBrowse()){
		showMessage('请使用微信客户端浏览器登陆继续访问!');
		return false;
	}*/
  if (loginFlag) {
    return
  }
  if (!checkValue()) {
    return
  }
  // 先获取随机数
  var url = requestPath + '/m/login/getRandom.htm'
  loginFlag = true
  $.ajaxjsonp(
    url,
    {},
    function(data) {
      var d = eval(data)
      var random = d.random
      var dataMap = {}
      dataMap.uid = $('#mobile').val()
      var pwd = $('#pwd').val()
      // md5加密
      pwd = hex_md5(pwd)
      pwd = hex_md5(pwd + random)
      dataMap.pwd = pwd
      dataMap.appid = $('#appid').val()
      var wxOpenid = $('#openid').val()
      if (!isNull(wxOpenid)) {
        dataMap.openid = wxOpenid
        sessionStorage.setItem('wxOpenid', wxOpenid)
      }
      var loginType = $('#loginType').val()
      if (!isNull(loginType)) {
        dataMap.loginType = loginType
      }
      var loginUrl = requestPath + '/m/login/doLogin.htm'
      $.ajaxjsonpLogin(loginUrl, dataMap, function(data) {
        var d = eval(data)
        sessionStorage.userLevel = null
        setLocalData('sessionId', d.SESSION_ID)
        // 记录下本次登录成功的手机号
        setLocalData('loginMobile', d.user.mobile)
        setLocalData('username', d.user.username)
        //统计数据用
        setLocalData('scanhydm', d.user.hydm)
        setLocalData('scanmbname', d.user.menber.mbname)
        setLocalData('scanuserid', d.user.userid)
        setLocalData('scanmobile', d.user.mobile)
        setLocalData('scanusername', d.user.username)
        showOk('登录成功', function() {
          if (!isNull(loginType)) {
            sessionStorage.setItem('loginType', loginType)
            openPage('工作台', '../salesman/workbench.html', '1')
            return false
          }
          if (appType == 'android') {
            goBack()
          } else {
            var backUrl = getLocalData('backUrl')
            if (!isNull(backUrl)) {
              removeLocalData('backUrl')
              var time = new Date().getTime()
              if (backUrl.indexOf('?') === -1) {
                backUrl += '?d=' + time
              } else {
                backUrl += '&d=' + time
              }
              openPage('', backUrl, '1')
            } else {
              // 到我的页面
              if (!isNull(d.user.isSalesman) && d.user.isSalesman === 1) {
                openPage('工作台', '../salesman/workbench.html', '1')
              } else {
                openPage('我的', '../customer/my1.html', '1')
              }
            }
          }
        })
      })
    },
    false,
    function() {
      loginFlag = false
    }
  )
}

function checkValue() {
  var mobile = $('#mobile').val()
  if (isNull(mobile)) {
    showToptip($.i18n.prop('lg_mobilenametip'), 'mobile')
    return false
  }
  var pwd = $('#pwd').val()
  if (isNull(pwd)) {
    showToptip($.i18n.prop('lg_pwdnametip'), 'pwd')
    return false
  }
  return true
}

function findPwd() {
  openPage('找回密码', '../customer/findPwd.html', '1')
}

$.ajaxjsonpLogin = function(url, dataMap, fnSuccess, isPage, fnComplete) {
  ;(isNull(isPage) || 'boolean' != typeof isPage) && (isPage = !1),
    isPage
      ? ((dataMap = getPageParam(dataMap)), $('.weui-infinite-scroll').show())
      : $('.weui-infinite-scroll').hide()
  var requestSuccess = !1,
    callname = 'g' + parseInt(1e10 * Math.random())
  $.ajax({
    type: 'POST',
    url: url,
    async: !0,
    data: dataMap,
    dataType: 'jsonp',
    jsonpCallback: callname,
    beforeSend: function() {
      dataMap.showLoading && $.showLoading()
    },
    complete: function() {
      if (
        (dataMap.showLoading && $.hideLoading(),
        setTimeout(function() {
          lazyImage()
        }, 10),
        isPage)
      ) {
        ;(scrollLoading = !1),
          (pullRefresh = !1),
          $('#infinitePage').pullToRefreshDone()
        var e = $('#pageIndex').val(),
          t = $('#pageCount').val()
        isNull(e) && isNull(t)
          ? $('.weui-infinite-scroll').hide()
          : parseInt(e) >= parseInt(t) && $('.weui-infinite-scroll').hide()
        var a = $('#recordCount').val()
        0 === parseInt(a)
          ? 0 === $('#zwt-img').length && $('body').append(zwtHtml)
          : $('#zwt-img').remove()
      } else if (requestSuccess && 1 === $('#main').length) {
        var n = $('#main').html()
        isNull(n)
          ? 0 === $('#zwt-img').length && $('body').append(zwtHtml)
          : $('#zwt-img').remove()
      }
      void 0 !== fnComplete && fnComplete()
    },
    success: function(data) {
      var d = eval(data)
      if (3 === parseInt(d.result))
        if (((requestSuccess = !0), isNull(d.content)))
          (d.filePath = filePath),
            isNull(d.data) || (d.data.filePath = filePath),
            fnSuccess(d)
        else {
          var cont = d.content
          isNull(d.page) ||
            ((cont.pageCount = d.page.pageCount),
            (cont.recordCount = d.page.recordCount),
            $('#pageCount').val(d.page.pageCount),
            $('#recordCount').val(d.page.recordCount)),
            (cont.filePath = filePath),
            isNull(cont.data) || (cont.data.filePath = filePath),
            fnSuccess(cont)
        }
      else {
        if (0 === parseInt(d.result)) {
          setLocalData('user', null)
          try {
            isNull(loginName) || eval(loginName)
          } catch (e) {
            console.log(e)
          }
        }
        var mobile = $('#mobile').val()
        if (d.msg == '手机号或密码错误') {
          console.log('手机号或密码错误')
          $('#confirmDiv1').show()
          sessionStorage.setItem('loginMobile', mobile)
        } else if (d.msg == '您还没有注册，请先注册') {
          console.log('您还没有注册，请先注册')
          $('#confirmDiv2').show()
          sessionStorage.setItem('loginMobile', mobile)
        }

        // showMessage(d.msg)
      }
    },
    error: function(e, t, a) {}
  })
}
function cancle(id) {
  $('#confirmDiv' + id).hide()
  if (id == 1) {
    $('#pwd').val('')
  }
  sessionStorage.removeItem(loginMobile)
}
