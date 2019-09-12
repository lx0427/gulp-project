$(function() {
  sessionStorage.setItem('wxtype', 'enterprise')
  queryData()
})

var clickFlag = false // 是否允许点击， false 不允许， true 允许
var isLogin = false // 是否登录， false未登录， true 已登录
var isAuth = false // 是否有权限操作， false 无权限， true有权限，只有业务员有权限操作
var userid = ''
var typ = '' // 邀请人类型：0 客户，1 经销商，2 业务员

function queryData() {
  var url = requestPath + '/m/login/getUserInfo.htm'
  var dataMap = {}
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      console.info(d)
      if (isNull(d.user)) {
        // 未登陆
        /*
            $("#name").html("登录/注册");
            $("#photo").attr("onclick", "toLogin()");
            $("#name").attr("onclick", "toLogin()");
            */
        //直接到登录页面
        toLogin()
        return false
      } else {
        isLogin = true
        if (
          !isWeixinBrowse() ||
          (!isNull(d.user.flag08) && d.user.flag08 === 1)
        ) {
          $('#logoutBtn').show()
        }
        if (!isNull(d.user.isSalesman) && d.user.isSalesman === 1) {
          isAuth = true
        }
        // 双兔后台设置了管理权限的才显示
        if (!isNull(d.user.flag06) && d.user.flag06 != 0) {
          $('#saleList').show()
        }
        //将麦肯锡管理权限存放在storage，在客户管理界面调用
        //sessionStorage.setItem("flag03", d.user.flag03);
        // 后台设置了管理权限的才显示
        if (!isNull(d.user.flag09) && d.user.flag09 === 1) {
          $('#menberList').show()
        }
        // 已登录
        $('#name').html(d.user.username)
        // 非融资订单
        $('#shStatus100').html(d.shStatus100)

        var fcshStatus100 = 0
        if (!isNull(d.fcshStatus100)) {
          fcshStatus100 = d.fcshStatus100
        }

        $('#rzshStatus100').html(fcshStatus100)
        //未阅读数量
        $('#notReadEm').html(d.notReadCount)
        position = d.position //操作员职位
        //待分配客户数量
        if (position == 0 || position == 1) {
          if (d.registerCount + d.mboptApplyCount > 0)
            $('#registerEm').html(d.registerCount + d.mboptApplyCount)
        } else {
          if (d.registerCount > 0) $('#registerEm').html(d.registerCount)
        }
        //操作员申请数量
        mboptApplyCount = d.mboptApplyCount
        registerCount = d.registerCount
        userid = d.user.userid
        typ = d.typ
      }
    },
    false,
    function() {
      clickFlag = true

      //弹窗提示业务员未发货量
      getUnsentPop()
    }
  )
}

function toLogin() {
  eval(loginName)
}

// 代客下单
function orderResourceList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('生成订单', '../salesman/orderResourceList.html', '1')
}

// 退出
function doLogout() {
  var url = requestPath + '/m/login/doLogout.htm'
  var dataMap = {}

  $.ajaxjsonp(url, dataMap, function(data) {
    isLogin = false
    $('#name').html('登录/注册')
    $('#photo').attr('onclick', 'toLogin()')
    $('#name').attr('onclick', 'toLogin()')
    $('#logoutBtn').hide()
  })
}

//订单预审
function orderAuditList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('订单预审', '../salesman/orderAuditList.html', '1')
}

//客户余额
function balanceList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('客户余额', '../salesman/balanceList.html', '1')
}

function deliveryList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('出库明细查询', '../public/deliveryList.html', '1')
}

//订单查询
function selectOrder() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('订单查询', '../public/sapOrder.html', '1')
}

function menberList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('微商城后台', '../salesman/mallBackstage.html', '1')
}

function goewm() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('二维码', '../salesman/ewm.html?userid=' + userid, '1')
}
// 其他查询
function goOtherList() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('其他查询', '../salesman/otherList.html', '1')
}
// 客户管理列表
function gohygl() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage(
    '会员管理',
    '../salesman/menberManager.html?userid=' +
      userid +
      '&position=' +
      position +
      '&registerCount=' +
      registerCount +
      '&mboptApplyCount=' +
      mboptApplyCount,
    '1'
  )
}
function gohykh() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage('合约客户', '../public/sapHyOrder.html?userid=' + userid, '1')
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

function toMessageSettings() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  openPage(
    '信息管理',
    '../informationReport/messageSettingsList.html?userid=' + userid,
    '1'
  )
}

function goFinancing() {
  if (!clickFlag) {
    return false
  }
  if (!isLogin) {
    toLogin()
    return false
  }
  if (!isAuth) {
    showMessage('您无权限操作')
    return false
  }
  openPage('融资管理', '../salesman/financing.html?userid=' + userid, '1')
}

// 双兔销售信息
function saleList() {
  openPage('双兔销售信息', '../salesman/stSaleList.html', '1')
}

// 手机版 调用
function refresh() {
  if (appType == 'android') {
    queryData()
  }
}

function getUnsentPop() {
  var url = requestPath + '/m/login/getUnsentPop.htm'
  var dataMap = {}
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    console.log(d)
    if (!isNull(d.list) && d.list.length > 0) {
      var htmlStr = ''
      for (var i = 0; i < d.list.length; i++) {
        htmlStr += '<tr>'
        htmlStr +=
          '<td align="center">' + d.list[i].erdate.substring(5, 10) + '</td>'
        htmlStr +=
          '<td align="center"><a onclick="toDeleverList(\'' +
          d.list[i].vgble +
          '\');">' +
          d.list[i].vgble +
          '</a></td>'
        htmlStr += '<td align="center">' + d.list[i].pm + '</td>'
        htmlStr += '<td align="center">' + d.list[i].total + '</td>'
        htmlStr += '<td align="center">' + d.list[i].send + '</td>'
        //          	htmlStr += '<td align="center">'+ d.list[i].unSend +'</td>';
        htmlStr += '</tr>'
      }
      $('#undeliver').append(htmlStr)
      $('#marketingPolicy').show()
    }
  })
}

function toDeleverList(vgble) {
  openPage('出库明细查询', '../public/deliveryList.html?vgble=' + vgble, '1')
}

function doCancelPolicy() {
  $('#marketingPolicy').hide()
}
