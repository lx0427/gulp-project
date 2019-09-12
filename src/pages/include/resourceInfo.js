var isLogin = false
function getInfoData(gpls, wzid, depid, salesType) {
  var url = requestPath + '/m/resource/resourceInfo.htm'
  var dataMap = {}
  dataMap.gpls = gpls
  dataMap.wzid = wzid
  dataMap.depid = depid
  dataMap.salesType = salesType
  dataMap.language = i18nLanguage
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    if (!isNull(d.isLogin)) {
      isLogin = d.isLogin
    }
    if (!isNull(d.shoppingNum)) {
      $('#gwcsl').html('(' + d.shoppingNum + ')')
      $('#gwcsl').show()
    }
    console.info(d)
    $('#info_main').html(template('info_main_page', d))

    if (
      !isNull(d.data) &&
      !isNull(d.data.price00Str) &&
      d.data.price00Str == '价格调整中'
    ) {
      $('.wx_btntwo .btntwo li.gm').hide()
      $('.wx_btntwo .btntwo li').css('width', '100%')
    } else {
      $('.wx_btntwo .btntwo li.gm').show()
      $('.wx_btntwo .btntwo li').css('width', '50%')
    }

    // 切片的箱包净重
    if (!isNull(d.packstrList)) {
      $('#packstr em').bind('click', function() {
        $('#packstr em').removeClass('current')
        $(this).addClass('current')
        var packNum = $('#packstr .current').attr('val')
        $('#packNum').val(packNum)
        changeSl1()
      })
    }

    $('#footer').show()
    scanRL(d)
  })
}

function scanRL(d) {
  var url = window.location.href
  //FDY-GD10503-54D/24F(60dtex/24f)-AA-000000001000311683
  var title =
    d.data.pm +
    '-' +
    d.data.cz +
    '-' +
    d.data.gg +
    '-' +
    d.data.cd +
    '-' +
    d.data.wzid
  console.info(title)
  scanRecord('6', '1', '1', url, title + ';商品详情')
}

var saveFlag = false
function saveShoppingInfo() {
  if (!isLogin) {
    eval(loginName)
    return false
  }
  if (saveFlag) {
    return false
  }
  saveFlag = true
  var url = requestPath + '/m/shopping/saveShopping.htm'
  var dataMap = {}
  dataMap.gpls = $('#gpls').val()
  dataMap.wzid = $('#wzid').val()
  dataMap.depid = $('#depid').val()
  dataMap.salesType = $('#salesType').val()
  dataMap.orderType = '0'
  dataMap.sl02 = $('#sl02').val()
  dataMap.sl01 = $('#sl01').val()
  dataMap.packstr = $('#packstr .current').attr('val')
  dataMap.remark = $('#remark').val()
  dataMap.lsxs = $('#lsxs').val()
  dataMap.language = i18nLanguage
  var pm = $('#pm').val()
  var str02 = $('#str02').val()

  if (pm == 'POY' && str02 == '车丝') {
    confirmMsg('该物资属于车丝，确定加入购物车吗?', function() {
      $.ajaxjsonp(
        url,
        dataMap,
        function(data) {
          showOk('已加入购物车')
        },
        false,
        function() {
          saveFlag = false
          refreshShopCar()
        }
      )
    })
  } else {
    $.ajaxjsonp(
      url,
      dataMap,
      function(data) {
        showOk('已加入购物车')
      },
      false,
      function() {
        saveFlag = false
        refreshShopCar()
      }
    )
  }
}

function refreshShopCar() {
  url = requestPath + '/m/resource/resourceInfo.htm'
  dataMap = {}
  dataMap.gpls = $('#gpls').val()
  dataMap.wzid = $('#wzid').val()
  dataMap.depid = $('#depid').val()
  dataMap.salesType = $('#salesType').val()
  dataMap.language = i18nLanguage
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    if (!isNull(d.isLogin)) {
      isLogin = d.isLogin
    }
    if (!isNull(d.shoppingNum)) {
      $('#gwcsl').html('(' + d.shoppingNum + ')')
      $('#gwcsl').show()
    }
    console.info(d)
  })
}

function saveShoppingAndtoShoppingCart() {
  if (!isLogin) {
    eval(loginName)
    return false
  }
  if (saveFlag) {
    return false
  }
  saveFlag = true
  if (!checkNumber('sl02', 3, '重量')) {
    saveFlag = false
    return false
  }

  var url = requestPath + '/m/shopping/saveShopping.htm'
  var dataMap = {}
  dataMap.gpls = $('#gpls').val()
  dataMap.wzid = $('#wzid').val()
  dataMap.depid = $('#depid').val()
  dataMap.salesType = $('#salesType').val()
  dataMap.orderType = '0'
  dataMap.sl02 = $('#sl02').val()
  dataMap.sl01 = $('#sl01').val()
  dataMap.packstr = $('#packstr .current').attr('val')
  dataMap.remark = $('#remark').val()
  dataMap.lsxs = $('#lsxs').val()
  dataMap.language = i18nLanguage
  var pm = $('#pm').val()
  var str02 = $('#str02').val()

  if (pm == 'POY' && str02 == '车丝') {
    confirmMsg('该物资属于车丝，确定加入购物车吗?', function() {
      $.ajaxjsonp(
        url,
        dataMap,
        function(data) {
          toShoppingCart()
        },
        false,
        function() {
          saveFlag = false
        }
      )
    })
  } else {
    $.ajaxjsonp(
      url,
      dataMap,
      function(data) {
        toShoppingCart()
      },
      false,
      function() {
        saveFlag = false
      }
    )
  }
}

// 关注
function doFocus() {
  var url = requestPath + '/m/resource/doFocus.htm'
  var dataMap = {}
  dataMap.gpls = $('#gpls').val()
  dataMap.wzid = $('#wzid').val()
  dataMap.depid = $('#depid').val()
  dataMap.salesType = $('#salesType').val()
  dataMap.language = i18nLanguage
  $.ajaxjsonp(url, dataMap, function(data) {
    $('#focus').html('已收藏')
    $('#focus').attr('onclick', 'javascript:cancelFocus();')
    $('#focus')
      .removeClass('focus')
      .addClass('yfocus')
  })
}
function cancelFocus() {
  confirmMsg('确定取消收藏此物品吗?', function() {
    var url = requestPath + '/m/resource/cancelFocus.htm'
    var dataMap = {}
    dataMap.gpls = $('#gpls').val()
    dataMap.wzid = $('#wzid').val()
    dataMap.depid = $('#depid').val()
    dataMap.salesType = $('#salesType').val()
    dataMap.language = i18nLanguage
    $.ajaxjsonp(url, dataMap, function(data) {
      $('#focus').html('收藏')
      $('#focus').attr('onclick', 'javascript:doFocus();')
      $('#focus')
        .removeClass('yfocus')
        .addClass('focus')
    })
  })
}

// 修改数量
function changeSl1() {
  //双兔cd=AA的产品加入限定条件
  var cd = $('#cd_').val()
  var depid = $('#depid').val()

  // 根据数量计算出重量
  var sl01 = $('#sl01').val()
  if (sl01.length > 0) {
    if (!checkNumber('sl01', 0, '箱包数')) {
      return false
    }
    if (cd == 'AA' && parseFloat(sl01) > 100 && depid == '9700') {
      //测试AA产品
      sl01 = 100
      $('#sl01').val('100')
      $('#sl01').blur()
      showMessage('该产品每单最多可下100包')
    }
    var packNum = $('#packNum').val()
    if (!isNull(packNum)) {
      var sl02 = accMul(sl01, packNum)
      $('#sl02').val(sl02)
    }
  }
  updateShopping()
}

function updateShopping() {
  if (!isLogin) {
    eval(loginName)
    return false
  }
  if (saveFlag) {
    return false
  }

  saveFlag = true
  var url = requestPath + '/m/shopping/saveOrUpdateShopping.htm'
  var dataMap = getDataMaps()
  dataMap.orderType = '0'
  dataMap.sl02 = $('#sl02').val()
  dataMap.sl01 = $('#sl01').val()

  dataMap.packstr = $('#packstr .current').attr('val')
  dataMap.remark = $('#remark').val()
  dataMap.lsxs = $('#lsxs').val()

  var id = $('#pkid').val()
  var gpls = $('#gpls').val()
  var wzid = $('#wzid').val()
  var depid = $('#depid').val()
  var salesType = $('#salesType').val()
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      if (isNull(id)) {
        getInfoData(gpls, wzid, depid, salesType)
      }
    },
    false,
    function() {
      saveFlag = false
    }
  )
}

function getDataMaps() {
  var dataMap = {}

  if (!isNull($('#wzid').val())) {
    dataMap.wzid = $('#wzid').val()
  }
  if (!isNull($('#depid').val())) {
    dataMap.depid = $('#depid').val()
  }
  if (!isNull($('#salesType').val())) {
    dataMap.salesType = $('#salesType').val()
  }

  return dataMap
}
function timeRefresh() {
  flag = false
}
var fcOrderFlag = 0 //是否选择融资
var flag = false
function createbill() {
  if (!checkValue()) {
    return false
  }
  var url = requestPath + '/m/createOrder/createbill.htm'
  var dataMap = getOrderDataMap()
  flag = true
  setTimeout(timeRefresh, 15000)
  dataMap.showLoading = true
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      flag = false
      $.toast('订单提交成功')
      setTimeout(function() {
        if (!isNull(d.isSalesman) && d.isSalesman === 1) {
          openPage('工作台', '../salesman/workbench.html', '1')
        } else {
          openPage(
            '我的',
            '../public/orderSucceed.html?fcOrderFlag=' + fcOrderFlag,
            '1'
          )
        }
      }, 2000)
    },
    false,
    function() {
      flag = false
    }
  )
}

function getOrderDataMap() {
  var dataMap = {}
  dataMap.htflag06 = '3'
  dataMap.kpdm = $('#kpdm').val()
  dataMap.kpname = $('#kpname').val()

  var now = new Date()
  dataMap.date10Str = now.format('yyyy-MM-dd')
  dataMap.remark = $('#remark').val()
  dataMap.wxOpenid = $('#openid').val()

  var jsons = new Array()
  var id = $('#pkid').val()
  var json = {}
  json.pkid = id
  json.cfxx = $('#cfxx').val()
  jsons[jsons.length] = json

  dataMap.jsonstring = JSON.stringify(jsons)

  return dataMap
}

function checkValue() {
  var b = true
  if (!checkNumber('sl01', 0, ' 箱包数')) {
    b = false
    return false
  }
  if (!checkNumber('sl02', 3, '重量')) {
    b = false
    return false
  }

  if (!b) {
    return false
  }

  return true
}
