$(function() {
  var url = window.location.href
  scanRecord(11, 0, '', url, '我的页面')
  queryData()
})

var clickFlag = false // 是否允许点击，
var isLogin = false // 是否登录， false未登录， true 已登录
var userid = ''
var typ = '' // 邀请人类型：0 客户，1 经销商，2 业务员
var XfcreditFlag = 'false'

function queryData() {
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

  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      console.info(d)

      if (isNull(d.user)) {
        // 未登陆
        $('#photo').attr('onclick', 'toLogin()')
        $('#unlogin').show()
        $('#message').hide()
        sessionStorage.userLevel = 0
      } else {
        isLogin = true
        //查询用户是否有未读站内信
        hasLetter()
        //用户资料不完善
        sessionStorage.userLevel = d.userLevel
        $('#photo').attr('onclick', 'toUserInfo()')
        $('#logoutBtn').show()
        $('#unlogin').hide()
        $('#message').show()

        // 已登录
        $('#name').html(d.user.username)
        $('#companyName').html(d.user.menber.mbname)
        // 头像处理
        if (!isNull(d.user.userPhoto)) {
          $('#userPhotoImg').attr('src', filePathOld + d.user.userPhoto)
        }
        if (d.mboptRelationFlag) {
          $('#mboptRelationLabel').show()
          $('.my_box .my_info .my_name').css('line-height', '22px')
          $('.my_box .my_info ').css('padding-top', '13px')
        } else {
          $('.my_info').addClass('my11')
          $('#companyName').addClass('my_company2')
          $('.my_box .my_info .my_name').css('line-height', '40px')
          $('.my_box .my_info ').css('padding-top', '12px')
        }
        if (!isNull(d.menberLevel)) {
          $('#menberLevel').html(d.menberLevel)
          $('#menberLevel').show()
        } else {
          $('#menberLevel').html('普通客户')
          $('#menberLevel').show()
        }
        userid = d.user.userid
        typ = d.typ
        XfcreditFlag = d.XfcreditFlag
        setLocalData('scanhydm', d.user.hydm)
        setLocalData('scanmbname', d.user.menber.mbname)
        setLocalData('scanuserid', d.user.userid)
        setLocalData('scanmobile', d.user.mobile)
        setLocalData('scanusername', d.user.username)

        //待审核订单
        if (!isNull(d.shStatus100)) {
          $('#orderAmount').html(d.shStatus100)
          $('#orderAmount').show()
        }

        //融资订单
        if (!isNull(d.fcUnauditedCount)) {
          $('#fcOrderAmount').show()
          var fcUnauditedCount = 0
          if (!isNull(d.fcUnauditedCount)) {
            fcUnauditedCount = d.fcUnauditedCount
          }
          $('#fcOrderAmount').html(fcUnauditedCount)
        }
      }
      if (!isNull(d.pubmsg)) {
        $('#ccf').attr('onclick', 'toNoticeInfo(' + d.pubmsg[0].pkid + ');')
      }
    },
    false,
    function() {
      clickFlag = true
      //查询用户是否有未参与的问卷
      hasQuestion()
      //小红点显示
      queryRedPoint()
    }
  )
}

function toLogin() {
  eval(loginName)
}

function toBalance() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('余额查询', '../public/balance.html', '1')
    }
  })
}

function toDeliveryList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('出库明细查询', '../public/deliveryList.html?from=customer', '1')
    }
  })
}

function toInvoiceCheck() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('发票对账', '../customer/invoiceCheck.html', '1')
    }
  })
}

function toUserInfo() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('我的资料', '../customer/userInfo.html', '1')
}

function toFeedback() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('意见反馈', '../customer/feedback.html', '1')
}

function goShoppingCart() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  toShoppingCart()
}

// 退出
function doLogout() {
  var url = requestPath + '/m/login/doLogout.htm'
  var dataMap = {}

  $.ajaxjsonp(url, dataMap, function(data) {
    isLogin = false
    sessionStorage.userLevel = 0
    removeLocalData('sessionId')
    $('#name').html('')
    $('#photo').attr('onclick', 'toLogin()')
    $('#companyName').html('')
    $('#userPhotoImg').attr('src', '../../images/headpic.png')
    $('#unlogin').show()
    $('#logoutBtn').hide()
    $('#message').hide()
    $('#mboptRelationLabel').hide()
    $('#orderAmount').html('')
    $('#orderAmount').hide()
    $('.my_box .my_info .my_name').css('line-height', '55px;')
    $('#msgTitle').html('')
  })
}

function unconfirmedOrder() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('待审核订单', '../customer/unconfirmedOrder.html', '1')
    }
  })
}

function appointmentOrder() {
  openPage('预约订单', '../customer/appointmentOrder.html', '1')
}

function sapOrder() {
  openPage('订单查询', '../public/sapOrder.html?from=customer', '1')
}

function toProblem() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('纤知', '../score/problem.html', '1')
}

//function orderSelect() {
// 	openPage("订单查询", "../customer/orderQuery.html", "1");
//}

function changeUser() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('切换用户', '../customer/changeUser.html', '1')
}
function toCoupon() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('我的优惠券', '../customer/couponMenu.html', '1')
}
function toAuction() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('我的竞拍', '../customer/auctionList.html', '1')
    }
  })
}
function toRecommend() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage(
    '推荐有奖',
    '../recommend/tjyj.html?userid=' + userid + '&typ=' + typ,
    '1'
  )
}

// 售后服务，客户投诉
function toComplaintList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('售后服务', '../complaint/complaintList.html', '1')
    }
  })
}

function toMyGroupBuy() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('我的拼团', '../customer/myGroupBuyList.html', '1')
    }
  })
}

function toExcipient() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('燃辅料订单', '../purchasing/excipientOrder.html', '1')
    }
  })
}

function toJkqdList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      if (XfcreditFlag) {
        openPage('我的融资', '../customer/xfbt.html', '1')
      } else {
        openPage('我的融资', '../customer/financing.html', '1')
      }
    }
  })
}

//跳转至公告详情
function toNoticeInfo(pkid) {
  if (!isLogin) {
    toLogin()
    return false
  }
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      showMessage('请完善资料!')
      setTimeout(function() {
        toMakeUpUserInfo()
      }, 1000)
    } else {
      openPage('公告详情', '../notice/noticeDetail.html?pkid=' + pkid)
    }
  })
}
function showDetail(pkid) {
  openPage('站内信详情', '../customer/letterDetail.html?pkid=' + pkid, '1')
}

function hasLetter() {
  var url = requestPath + '/m/letter/getRecentData.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    console.info('msg:' + d)
    $('#msgTitle').html(template('msgTitle_page', d))
  })
}
function queryMenberLevel() {
  var url = requestPath + '/m/menberLevel/getRecentData.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    console.info('msg:' + d)
    $('#msgTitle').html(template('msgTitle_page', d))
  })
}
function hasQuestion() {
  var url = requestPath + '/m/question/hasQuestion.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    if (data.count > 0) {
      $('#question').text(data.count)
      $('#question').show()
    } else {
      $('#question').hide()
    }
  })
}
function queryRedPoint() {
  var url = requestPath + '/m/login/isRedPoint.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    if (data.count > 0) {
      $('#mypoint').show()
    } else {
      $('#mypoint').hide()
    }
    if (data.amount > 0) {
      $('#shopAmount').html(data.amount)
      $('#shopAmount').show()
    } else {
      $('#shopAmount').hide()
    }
  })
}

function toQuestion() {
  openPage('调查问卷', '../customer/question.html', '1')
}

function toTray() {
  openPage('托盘查询', '../public/tray.html', '1')
}

function toHelp() {
  openPage('用户手册', '../helpcenter/helpcenter.html', '1')
}

// function toAdviceList() {
//     if(!clickFlag){
//         return false;
//     }
// 	if (!isLogin) {
//         toLogin();
//         return false;
//     }
//     openPage("意见箱", "../public/adviceSend.html", "1");
// }

function toBill() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('账单查询', '../customer/bill.html', '1')
}

function toFavorites() {
  openPage('收藏夹', '../customer/favorites.html', '1')
}

function toMyScekill() {
  openPage('我的秒杀', '../customer/seckillList.html', '1')
}

function toMyScore() {
  openPage('我的纤币', '../score/myScore.html', '1')
}

function removeCach() {
  showMessage("选中页面最下方4个选项,然后点击'清除'")
  setTimeout("javascript:location.href='http://debugx5.qq.com'", 2000)
}
