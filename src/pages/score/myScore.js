$(function() {
  queryData()
})
var account
var isLogin = false // 是否登录
function queryData() {
  var url = requestPath + '/m/score/index.htm'
  var dataMap = {}
  // dataMap.pageSize = 100;
  currentAjax = $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      console.log(d)
      account = d.account
      // console.log(d.signMap.today.dataString);
      if (!isNull(d)) {
        if (d.opt != null && d.opt == 1) {
          showMessage('纤知专属账号不能查询纤币')
          setTimeout('window.history.back(-1);', 1000)
        }
        if (scrollLoading) {
          $('#listTbody').append(template('listTbody_page', d))
          if (!flagList) {
            $('.wx_coinlist')
              .find('.hide')
              .show()
          }
        } else {
          $('#main').html(template('main_page', d))
          $('#list').html(template('list_page', d))
        }
      } else {
        showMessage('查询错误，请重试')
        setTimeout('window.history.back(-1);', 1000)
      }
    },
    true,
    function() {
      if (flagList) {
        setTimeout(function() {
          console.log('scrollLoading', 'true')
          scrollLoading = true
        }, 10)
      }
    }
  )
}
var flagList = true
function listToggle() {
  /**
   * 表格展开
   */
  if (flagList) {
    $('.wx_coinlist')
      .find('.hide')
      .show()
    $('.wx_coinlist')
      .find('i')
      .addClass('on')
    $('.list')
      .find('label')
      .text('收起')
    $('.wx_main').attr('id', 'infinitePage')
    scrollLoading = false
    $(function() {
      if ($('#infinitePage').length !== 0) {
        if ($('.weui-infinite-scroll').length === 0) {
          var appendHtml = "<div class='weui-infinite-scroll'>"
          appendHtml += "<div class='infinite-preloader'></div>"
          appendHtml += '正在加载'
          appendHtml += '</div>'
          $('#infinitePage').append(appendHtml)
        }
      }
    })
    $('#infinitePage')
      .infinite()
      .on('infinite', function() {
        if (scrollLoading) {
          return
        }
        var pageIndex = $('#pageIndex').val() // 当前页
        var pageCount = $('#pageCount').val() // 总页数
        if (isNull(pageIndex) && isNull(pageCount)) {
          // 不需要分页
          $('.weui-infinite-scroll').hide()
          return
        }
        if (parseInt(pageIndex) >= parseInt(pageCount)) {
          // 已经是最后一页了
          $('.weui-infinite-scroll').hide()
          return
        }
        scrollLoading = true
        setTimeout(function() {
          queryData()
        }, 10)
      })
    flagList = false
  } else {
    $('.wx_coinlist')
      .find('.hide')
      .hide()
    $('.wx_coinlist')
      .find('i')
      .removeClass('on')
    $('.list')
      .find('label')
      .text('展开')
    $('.wx_main').attr('id', '')
    $('.weui-infinite-scroll').hide()
    scrollLoading = true
    flagList = true
  }
}
function getDataMap() {
  var dataMap = {}
  if (!isNull(account)) {
    dataMap.timemd5 = account.timemd5
  }
  return dataMap
}

function doSign() {
  var url = requestPath + '/m/score/doSign.htm'
  var dataMap = getDataMap()
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    console.log(d)
    // console.log(d.signMap.today.dataString);
    if (!isNull(d) && !isNull(d.result) && d.result == 1) {
      showMessage('签到成功')
      $('#pageIndex').val(0)
      $('#main').html('')
      setTimeout('window.history.go(0);', 600)
    } else {
      showMessage('查询错误，请重试')
      setTimeout('window.history.back(-1);', 1000)
    }
  })
}

function toUserInfo() {
  openPage('基本信息', '../customer/userInfo.html', '1')
}
function toOrderResourceList1() {
  openPage('生产订单', '../customer/orderResourceList1.html', '1')
}
function toSapOrder() {
  openPage('订单查询', '../public/sapOrder.html?from=customer', '1')
}
function toTjyj() {
  var url = requestPath + '/m/login/getUserInfo.htm'
  var dataMap = {}
  var language = i18nLanguage
  if (!isNull(language)) {
    if (language == 'zh') {
      dataMap.flag05 = 0
    } else if (language == 'en') {
      dataMap.flag05 = 2
    } else if (language == 'ko') {
      dataMap.flag05 = 1
    }
  }
  dataMap.language = language
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    if (isNull(d.user)) {
      toLogin()
    } else {
      isLogin = true
      userid = d.user.userid
      typ = d.typ
      openPage(
        '推荐有奖',
        '../recommend/tjyj.html?userid=' + userid + '&typ=' + typ,
        '1'
      )
    }
  })
}
template.helper('getDate', function(str) {
  if (isNull(str)) {
    return
  }
  str = str.replace(/-/g, '/')
  if (str.length > 19) {
    str = str.substring(0, 19)
  }
  var date = new Date(str)
  return date.format('yyyy.MM.dd')
})

function toList() {
  openPage('纤币流水', '../score/scoreList.html')
}
function toEntity() {
  showMessage('活动筹备中')
  // openPage("实物兑换", "../score/entity.html");
}
function toAnswer() {
  openPage('答一答', '../score/answer.html')
}
function toCoupon() {
  openPage('代金券兑换', '../score/couponList.html')
}
function toFcCoupon() {
  openPage('免息券兑换', '../score/fcCoupon.html')
}
function toForward() {
  openPage('转一转', '../score/forward.html')
}

function toExchange(type) {
  // console.log(account);
  if (type == 1) {
    //物流费兑换
    $('.jf_pop').html(template('logistics_page', account))
  } else if (type == 2) {
    //广告推广兑换
    $('.jf_pop').html(template('advertisement_page', account))
  } else if (type == 3) {
    //仓储费兑换
  } else if (type == 4) {
    //承兑利息兑换
  } else if (type == 5) {
    //竞拍保证金兑换
  }
  $('.jf_pop').show()
}
function showSelect() {
  $('.choose_days').addClass('choose_days_moved')
}
function closeExchange() {
  $('#score').val('')
  $('.jf_pop').hide()
  $('.choose_days').removeClass('choose_days_moved')
}
function closeThis(obj) {
  $('.choose_days').removeClass('choose_days_moved')
}
function chooseThisAd(money) {
  var score = money * 200
  if (score > account.score) {
    $('.doChange').hide()
    $('.noChange').show()
  } else {
    $('.doChange').show()
    $('.noChange').hide()
    $('#score').val(score)
  }
  $('.jf_qxz').text(money + '元')
  $('.choose_days').removeClass('choose_days_moved')
}
function chooseThisLogistics(day) {
  var score = day * 60000
  if (score > account.score) {
    $('.doChange').hide()
    $('.noChange').show()
  } else {
    $('.doChange').show()
    $('.noChange').hide()
    $('#score').val(score)
  }
  $('.jf_qxz').text(day + '天')
  $('.choose_days').removeClass('choose_days_moved')
}
var changeFlag = false
var changeFlag = false
function doChange(type) {
  if (changeFlag) {
    return
  }
  changeFlag = true
  var url = requestPath
  if (type == 1) {
    //物流费兑换
    url += '/m/score/doLogisticsChange.htm'
  } else if (type == 2) {
    //广告推广兑换
    url += '/m/score/doAdPosition.htm'
  } else if (type == 3) {
    //仓储费兑换
  } else if (type == 4) {
    //承兑利息兑换
  } else if (type == 5) {
    //竞拍保证金兑换
  }
  var dataMap = getDataMap()
  if (isNull($('#score').val())) {
    showMessage('请选择兑换金额')
    setTimeout('changeFlag=false;', 300)
    return
  }
  dataMap.score = $('#score').val()
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      console.log(d)
      if (!isNull(d) && !isNull(d.result) && d.result == 1) {
        showMessage('兑换成功')
        $('#pageIndex').val(0)
        $('#main').html('')
        setTimeout('window.history.go(0);', 600)
      } else {
        showMessage('兑换错误，请重试')
        setTimeout('window.history.back(-1);', 1000)
      }
    },
    false,
    function() {
      setTimeout('changeFlag=false;', 100)
    }
  )
}
function toGuessPrice() {
  showMessage('活动筹备中')
}
function toExchangeDetail(ly) {
  if (isNull(ly) || '' == ly) {
    showMessage('参数错误')
    return
  }
  openPage('广告推广兑换明细', '../score/exchangeDetail.html?ly=' + ly, 1)
}
