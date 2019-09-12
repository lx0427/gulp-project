function isNull(e) {
  try {
    if (
      'undefined' == typeof e ||
      '' === $.trim(e) ||
      null === e ||
      'null' === e
    )
      return !0
  } catch (e) {
    console.log(e)
  }
  return !1
}
function getPageParam(e) {
  isNull(e) && (e = {})
  var t = ''
  return (
    0 === $('#pageIndex').length &&
      (t += "<input type='hidden' id='pageIndex' value='0' />"),
    0 === $('#pageCount').length &&
      (t += "<input type='hidden' id='pageCount' value='0' />"),
    0 === $('#recordCount').length &&
      (t += "<input type='hidden' id='recordCount' value='0' />"),
    isNull(t) || $('body').append(t),
    isNull(e.pageNumber) &&
      (e.pageNumber = parseInt($('#pageIndex').val()) + 1),
    isNull(e.pageSize) && (e.pageSize = 10),
    $('#pageIndex').val(e.pageNumber),
    'undefined' == typeof pageNumberName ||
      isNull(pageNumberName) ||
      'pageNumber' === pageNumberName ||
      (e[pageNumberName] = e.pageNumber),
    'undefined' == typeof pageSizeName ||
      isNull(pageSizeName) ||
      'pageSize' === pageSizeName ||
      (e[pageSizeName] = e.pageSize),
    e
  )
}
function lazyImage() {
  $('img.lazy').each(function() {
    var e = $(this).attr('data-src')
    isNull(e) || ($(this).attr('src', e), $(this).removeClass('lazy'))
  })
}
function showMessage(e) {
  $.alert(e),
    clearTimeout(showMessageTimeout),
    (showMessageTimeout = setTimeout(function() {
      $.closeModal()
    }, 2e3))
}
function showToptip(e, t, a) {
  ;(isNull(a) || 'primary,success,danger,error,warning'.indexOf(a) == -1) &&
    (a = 'error'),
    $.toptip(e, a),
    isNull(t) || $('#' + t).focus()
}
function confirmMsg(e, t, a) {
  clearTimeout(showMessageTimeout),
    isNull(e) ||
    (!isNull(t) && 'function' != typeof t) ||
    (!isNull(a) && 'function' != typeof a)
      ? showToptip('确认框参数错误')
      : $.confirm(e, '提示', t, a)
}
function showOk(e, t) {
  'function' == typeof e && ((t = e), (e = '操作成功')),
    isNull(e) && (e = '操作成功'),
    'undefined' == typeof t ? $.toast(e, function() {}) : $.toast(e, t)
}
function getRequest() {
  var e = location.href,
    t = new Object()
  if (isNull(e)) return t
  if (e.indexOf('?') == -1) return t
  var a = e.substring(e.indexOf('?') + 1)
  if (!isNull(a))
    if (a.indexOf('&') != -1) {
      strs = a.split('&')
      for (var n = 0; n < strs.length; n++)
        t[strs[n].split('=')[0]] = decodeURI(strs[n].split('=')[1])
    } else {
      var i = a.substring(0, a.indexOf('=')),
        r = a.substr(a.indexOf('=') + 1)
      t[i] = decodeURI(r)
    }
  return t
}
function handleRequestParams() {
  var e = getRequest(),
    t = ''
  if (!isNull(e))
    for (var a in e)
      0 === $('#' + a).length
        ? (t += "<input type='hidden' id='" + a + "' value='" + e[a] + "' />")
        : ($('#' + a).val(e[a]), $('#' + a).attr('gdval', e[a]))
  isNull(t) || $('body').append(t)
}
function getFilePath(e) {
  return isNull(e)
    ? e
    : ('HTTP' != e.toLocaleUpperCase().substring(0, 4) && (e = filePath + e), e)
}
function getOriginalImage(e) {
  return (e = getFilePath(e)), isNull(e) ? e : e.replace('/small/', '/')
}
function refreshTokenId(e) {
  ;(tokenId = e), setLocalData('tokenId', tokenId)
}
function qiatan(e, t, a) {
  if (
    (isNull(e) && (e = $('#fid').val()),
    isNull(t) && (t = $('#fname').val()),
    isNull(a) && (a = $('#qtno').val()),
    isNull(e))
  )
    return showMessage('参数错误'), !1
  if ((isNull(t) && (t = e), isNull(a) && (a = '-'), 'wx' === appType))
    return showMessage('请在APP端使用该功能'), !1
  var n = getLocalData('user')
  if (isNull(n)) return showMessage('您还未登录，请先登录'), !1
  var i = JSON.parse(n)
  return i.userid === e
    ? (showMessage('自己不能和自己洽谈'), !1)
    : void openChat(i.userid, a, e, t)
}
function doCall(e) {
  isNull(e) ||
    confirmMsg('拨打电话：' + e, function() {
      startTel(e)
    })
}
function isWeixinBrowse() {
  var e = navigator.userAgent
  return e.indexOf('MicroMessenger') > -1
}
function isIosBrowse() {
  var e = navigator.userAgent
  return !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
function isAndroidBrowse() {
  var e = navigator.userAgent
  return e.indexOf('Android') > -1 || e.indexOf('Linux') > -1
}
function checkIsInput(e, t) {
  return (
    '#' !== e.substring(0, 1) && (e = '#' + e),
    !isNull($(e).val()) || (showToptip('请输入“' + t + '”。'), !1)
  )
}
function checkNumber(e, t, a) {
  '#' !== e.substring(0, 1) && (e = '#' + e)
  var n = $(e).val()
  if (!checkIsInput(e, a)) return !1
  if (n.indexOf('e') !== -1 || n.indexOf('E') !== -1)
    return showToptip('“' + a + '”请输入数字。'), !1
  if (isNaN(n)) return showToptip('“' + a + '”请输入数字。'), !1
  if (parseFloat(n) <= 0)
    return showToptip('“' + a + '”请输入大于0的数字。'), !1
  var i = '^[0-9]*[1-9][0-9]*$',
    r = '^[0-9]+(.[0-9]{0,1})?$',
    o = '^[0-9]+(.[0-9]{0,2})?$',
    s = '^[0-9]+(.[0-9]{0,3})?$',
    l = '^[0-9]+(.[0-9]{0,3})?$',
    u = '^[0-9]+(.[0-9]{0,3})?$',
    c = '^[0-9]+(.[0-9]{0,3})?$',
    p = null
  return (
    (p =
      0 === t
        ? n.match(i)
        : 1 === t
        ? n.match(r)
        : 2 === t
        ? n.match(o)
        : 3 === t
        ? n.match(s)
        : 4 === t
        ? n.match(l)
        : 5 === t
        ? n.match(u)
        : n.match(c)),
    null !== p ||
      (showToptip(
        t > 0
          ? '“' + a + '”最多只能保留' + t + '位小数！'
          : '“' + a + '”必须是整数！'
      ),
      !1)
  )
}
function compareToRq(e, t, a) {
  '#' != e.substring(0, 1) && (e = '#' + e),
    '#' != t.substring(0, 1) && (t = '#' + t)
  var n = $(e).val(),
    i = $(t).val()
  return (
    !(!isNull(n) && !isNull(i)) ||
    (!(n > i) || (showToptip(a + '：开始时间不能大于结束时间'), !1))
  )
}
function accAdd(e, t, a) {
  var n, i, r, o
  try {
    n = e.toString().split('.')[1].length
  } catch (e) {
    n = 0
  }
  try {
    i = t.toString().split('.')[1].length
  } catch (e) {
    i = 0
  }
  return (
    (r = Math.pow(10, Math.max(n, i))),
    (o = n >= i ? n : i),
    isNull(a) || (o = a),
    (o = parseInt(o)),
    ((e * r + t * r) / r).toFixed(o)
  )
}
function accSubtr(e, t, a) {
  var n, i, r, o
  try {
    n = e.toString().split('.')[1].length
  } catch (e) {
    n = 0
  }
  try {
    i = t.toString().split('.')[1].length
  } catch (e) {
    i = 0
  }
  return (
    (r = Math.pow(10, Math.max(n, i))),
    (o = n >= i ? n : i),
    isNull(a) || (o = a),
    (o = parseInt(o)),
    ((e * r - t * r) / r).toFixed(o)
  )
}
function accMul(e, t, a) {
  var n = 0,
    i = e.toString(),
    r = t.toString()
  try {
    n += i.split('.')[1].length
  } catch (e) {}
  try {
    n += r.split('.')[1].length
  } catch (e) {}
  return (
    isNull(a) && (a = 2),
    (a = parseInt(a)),
    (
      (Number(i.replace('.', '')) * Number(r.replace('.', ''))) /
      Math.pow(10, n)
    ).toFixed(a)
  )
}
function accDiv(arg1, arg2, arg3) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  with ((isNull(arg3) && (arg3 = 2), (arg3 = parseInt(arg3)), Math))
    return (
      (r1 = Number(arg1.toString().replace('.', ''))),
      (r2 = Number(arg2.toString().replace('.', ''))),
      ((r1 / r2) * pow(10, t2 - t1)).toFixed(arg3)
    )
}
function utf16toEntities(e) {
  var t = /[\ud800-\udbff][\udc00-\udfff]/g
  return (e = e.replace(t, function(e) {
    var t, a, n
    return 2 === e.length
      ? ((t = e.charCodeAt(0)),
        (a = e.charCodeAt(1)),
        (n = 1024 * (t - 55296) + 65536 + a - 56320),
        escape('&#' + n + ';'))
      : e
  }))
}
function entitiestoUtf16(e) {
  for (
    var t,
      a,
      n,
      i = utf16toEntities(e),
      r = /&#\d+;/g,
      o = i.match(r) || [],
      s = 0;
    s < o.length;
    s++
  ) {
    ;(n = o[s]),
      (n = n.replace('&#', '').replace(';', '')),
      (t = Math.floor((n - 65536) / 1024) + 55296),
      (a = ((n - 65536) % 1024) + 56320),
      (n = '&#' + n + ';')
    var l = String.fromCharCode(t, a)
    i.replace(n, l)
  }
  return i
}
function wxconfig() {
  if (isWeixinBrowse()) {
    var htmlurl = location.href,
      url = cloudPath + '/user2/wxconfig.do',
      dataMap = { url: htmlurl }
    $.ajaxjsonp(url, dataMap, function(data) {
      var d = eval(data)
      wx.config({
        debug: !1,
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
}
function getWxgzUrl(e) {
  return (
    isNull(e) && (e = 'MzA5NDc1OTE3MA=='),
    'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=' +
      e +
      '&scene=110#wechat_redirect'
  )
}
function formatNumber(e, a) {
  if (a < 0 || a > 20) return void showMessage('小数点位数不合法')
  e = parseFloat((e + '').replace(/[^\d\.-]/g, '')).toFixed(a) + ''
  var n = e
    .split('.')[0]
    .split('')
    .reverse()
  for (r = e.split('.')[1], t = '', i = 0; i < n.length; i++)
    t += n[i] + ((i + 1) % 3 === 0 && i + 1 != n.length ? ',' : '')
  return 0 === a
    ? t
        .split('')
        .reverse()
        .join('')
    : t
        .split('')
        .reverse()
        .join('') +
        '.' +
        r
}
function formatDate(e, t) {
  ;(e = e.replace(/-/g, '/')), e.length > 19 && (e = e.substring(0, 19))
  var a = new Date(e)
  return a.format(t)
}
function checkMobile(e) {
  var t = /^0{0,1}(13|14|15|17|18)[0-9]{9}$/
  return !!t.test($.trim(e))
}
var loadMode = 0,
  scrollLoading = !1,
  pullRefresh = !1,
  tokenId,
  marketId,
  appType,
  defaultNode,
  defaultNodeNr,
  zwtHtml =
    "<div id='zwt-img' style='position: fixed; left: 50%; margin-left: -55px; top: 200px;display: none;'><img src='../../images/zwt.png' style='width:109px;'/></div>"
$.ajaxjsonp = function(url, dataMap, fnSuccess, isPage, fnComplete) {
  ;(isNull(isPage) || 'boolean' != typeof isPage) && (isPage = !1),
    isPage
      ? ((dataMap = getPageParam(dataMap)), $('.weui-infinite-scroll').show())
      : $('.weui-infinite-scroll').hide()
  var requestSuccess = !1,
    callname = 'g' + parseInt(1e10 * Math.random())
  dataMap.device = isWeixinBrowse() ? 'WEIXIN' : 'APP'
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
          !isNull(d.page) &&
            isPage &&
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
        showMessage(d.msg)
      }
    },
    error: function(e, t, a) {}
  })
}
var showMessageTimeout
;(String.prototype.replaceAll = function(e, t) {
  return this.replace(new RegExp(e, 'gm'), t)
}),
  (Date.prototype.format = function(e) {
    var t = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12,
        'H+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      },
      a = { 0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' }
    ;/(y+)/.test(e) &&
      (e = e.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )),
      /(E+)/.test(e) &&
        (e = e.replace(
          RegExp.$1,
          (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') +
            a[this.getDay() + '']
        ))
    for (var n in t)
      new RegExp('(' + n + ')').test(e) &&
        (e = e.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? t[n]
            : ('00' + t[n]).substr(('' + t[n]).length)
        ))
    return e
  })
