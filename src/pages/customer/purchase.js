$(function() {
  var url = window.location.href
  wxconfig()
  judgeLogin()
  getTabsAndImage()
})
var isLogin = false
function judgeLogin() {
  var url = requestPath + '/m/resource/index.htm'
  $.ajaxjsonp(url, {}, function(res) {
    isLogin = res.isLogin
  })
}
var started = null
var time = 0
var interval = null
var currentPM = '' // 当前pm分类
// 获取banner+tabs
function getTabsAndImage() {
  var url = requestPath + '/m/purchase/getTabsAndImage.htm'
  $.ajaxjsonp(
    url,
    {
      circleId: circleId
    },
    function(res) {
      console.log(res, 'getTabsAndImage')
      started = res.started
      time = res.time
      clearInterval(interval)
      interval = setInterval(updateTime, 1000)
      $('#purchaseBanner').attr('src', res.filePath + res.imageUrl)
      $('#purchaseTabsWrap').append(template('purchaseTabs', res))
      // 规则
      $('body').append(
        template('popupTemplate', {
          id: 'purchaseRule',
          title: '限时购规则',
          lists: res.rule.split('&gt;&gt;')
        })
      )
      if (res.tabs.length) {
        currentPM = res.tabs[0]
        getListByTab()
      }
      if (isWeixinBrowse()) {
        shareWx0(
          '恒逸微商城化纤特惠专场',
          '超多优惠，数量有限，售完即止',
          '',
          res.filePath + res.imageUrl,
          window.location.href,
          window.location.href
        )
      }
    }
  )
}
var lists = []
// 根据tabs获取商品列表
function getListByTab() {
  lists = []
  var url = requestPath + '/m/purchase/getListByTab.htm'
  $.ajaxjsonp(
    url,
    {
      tab: currentPM
    },
    function(res) {
      var obj = {}
      res.list.forEach(function(v) {
        if (!v.groupId) {
          lists.push([v])
        } else {
          if (obj.hasOwnProperty(v.groupId)) {
            obj[v.groupId].push(v)
          } else {
            obj[v.groupId] = [v]
          }
        }
      })
      for (var key in obj) {
        lists.push(obj[key])
      }
      console.log(lists, res, 'res.list')
      res.list = lists // 页面渲染
      res.started = started
      $('#purchaseList').html('')
      $('#purchaseList').append(template('purchaseGroup', res))
    }
  )
}

// 改变产品品名
function changePm(dom) {
  $('.purchase__tabs-item').removeClass('active')
  $(dom).addClass('active')
  currentPM = $(dom).attr('val')
  getListByTab()
}
// 倒计时
function updateTime() {
  if (time < 0) {
    return
  }
  time -= 1000
  var days = Math.floor(time / 1000 / 60 / 60 / 24)
  var hours = Math.floor(time / 1000 / 60 / 60) % 24
  var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((time % (1000 * 60)) / 1000)
  if (hours > 99) {
    hours = 99
    minutes = 60
    seconds = 60
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  $('#days').text(days)
  $('#hour').text(hours)
  $('#min').text(minutes)
  // $('#sec').text(seconds) // 隐藏秒
}

// 抢购下单
function purchase(i, buyInBatchesFlag) {
  if (!isLogin&&isWeixinBrowse()) {
    toLogin()
    return false
  }
  var goods = lists[i]
  if (goods.length === 1 && buyInBatchesFlag === '1') {
    var good = goods[0]
    var total = good.packstr ? good.remainder / good.packstr : good.remainder
    console.log(good, 'good')
    $.prompt({
      title: good.packstr ? '输入箱包数' : '输入重量',
      text: '数量不得超过' + total + (good.packstr ? '箱' : 'kg'),
      input: good.packstr ? '请输入箱数' : '请输入重量(kg)',
      empty: false, // 是否允许为空
      onOK: function(num) {
        if (!isNaN(+num)) {
          if (num > total) {
            $.toptip('数量超过总额', 'error')
          } else {
            toBuy(goods, num)
          }
        } else {
          $.toptip('请输入重量', 'error')
        }
      }
    })
  } else {
    toBuy(goods)
  }
}
function toBuy(goods, num) {
  var tips = []
  var list = []
  goods.forEach(function(v) {
    v.packstr = v.packstr || ''
    if (num) {
      if (v.packstr) {
        // 箱数
        v.orderWeight = num * v.packstr
      } else {
        // 重量
        v.orderWeight = num
      }
      tips.push(v.pm + '-' + v.cz + ' 重量：' + v.orderWeight + 'kg<br/>')
    } else {
      tips.push(v.pm + '-' + v.cz + ' 重量：' + v.remainder + 'kg<br/>')
    }
    list.push(v)
  })
  $.confirm(tips.join('') + '确定抢购？', function() {
    if (time < 1000) {
      showMessage('抢购已结束')
      return
    }
    var url = requestPath + '/m/createOrder/createbillPurchase.htm'
    var dataMap = {
      list: JSON.stringify(list),
      wxOpenid: '',
      purid: goods[0].purid,
      couponType: '10',
      circleId: circleId,
      pm: $('.purchase__tabs-item.active').text()
    }
    $.showLoading('订单提交中...')
    $.ajax({
      url: url + '?SESSION_ID=' + localStorage.getItem('sessionId'),
      type: 'post',
      async: true,
      dataType: 'json',
      data: dataMap,
      success: function(res) {
        $.hideLoading()
        if (res.code === '1') {
          openPage('待审核订单', '../customer/unconfirmedOrder.html', 1)
        } else {
          getListByTab()
          showMessage(res.errmsg)
        }
      }
    })
  })
}

function toRule() {
  $('#purchaseRule').popup()
}
