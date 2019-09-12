$(function() {
  var url = window.location.href
  scanRecord(17, 0, '', url, '', '出库明细查询')
  var from = $('#from').val()
  if (!isNull(from) && from === 'customer') {
    $('#khname').hide()
    $('#depname').show()
  } else {
    $('#khname').show()
    $('#depname').hide()
  }

  initPage()

  $('#form').bind('submit', function() {
    initPage()
    return false
  })

  $('.weui_icon_clear').bind('click', function() {
    if (isNull($('#querykey').val())) {
      return false
    }
    $('#querykey').val('')
    initPage()
  })

  $('.weui_search_cancel').bind('click', function() {
    if (isNull($('#querykey').val())) {
      return false
    }
    $('#querykey').val('')
    initPage()
  })

  var rqStartChange = false
  var rqStartTxt = ''
  $('#rqStart').calendar({
    onOpen: function() {
      if (rqStartChange) {
        rqStartTxt = ''
        rqStartChange = false
      }
    },
    onChange: function(p, values, displayValues) {
      rqStartChange = true
      rqStartTxt = values
    },
    onClose: function() {
      $('.wx_hyfilter li').removeClass()
      if (rqStartChange) {
        $('#rqStartTxt')
          .html(rqStartTxt)
          .parent()
          .addClass('current')
        initPage()
      } else {
        $('#rqStart').val('')
        $('#rqStartTxt').html('开始日期')
        initPage()
      }
      rqStartChange = false
    }
  })

  var rqEndChange = false
  var rqEndTxt = ''
  $('#rqEnd').calendar({
    onOpen: function() {
      if (rqEndChange) {
        rqEndTxt = ''
        rqEndChange = false
      }
    },
    onChange: function(p, values, displayValues) {
      rqEndChange = true
      rqEndTxt = values
    },
    onClose: function() {
      $('.wx_hyfilter li').removeClass()
      if (rqEndChange) {
        $('#rqEndTxt')
          .html(rqEndTxt)
          .parent()
          .addClass('current')
        initPage()
      } else {
        $('#rqEnd').val('')
        $('#rqEndTxt').html('结束日期')
        initPage()
      }
      rqEndChange = false
    }
  })

  $('#mbname').bind('change', function() {
    $('.wx_hyfilter li').removeClass()
    var mbname = $('#mbname').val()
    if (isNull(mbname)) {
      $('#khname').html('客户<span class="xl"></span>')
    } else {
      $('#khname')
        .html(mbname)
        .addClass('current')
    }
    initPage()
  })

  //状态
  $('#wbsta').select({
    title: '请选择',
    items: [
      {
        title: '默认',
        value: ''
      },
      {
        title: '没有处理',
        value: 'A'
      },
      {
        title: '部分处理',
        value: 'B'
      },
      {
        title: '完全处理',
        value: 'C'
      },
      {
        title: '最后记录',
        value: 'L'
      }
    ],
    onChange: function(d) {
      $('#wbsta').removeClass('current')
      if (isNull(d.values)) {
        $('#wbstate').val(d.values)
        $('#wbsta').html('状态<span class="xl"></span>')
      } else {
        $('#wbstate').val(d.values)
        $('#wbsta')
          .html(d.titles + '<span class="xl"></span>')
          .addClass('current')
      }
    },
    onClose: function() {
      $('#pageIndex').val(0)
      $('#list').html('')
      queryData()
    },
    onClear: function() {
      $('#wbsta').removeClass('current')
      $('#pageIndex').val(0)
      $('#list').html('')

      $('#wbstate').val('')
      queryData()
      $('#wbsta').html('状态<span class="xl"></span>')
    }
  })
})

function initPage() {
  var vgble = $('#vgble').val()
  if (!isNull(vgble)) {
    $('#querykey').val(vgble)
  }
  $('#pageIndex').val(0)
  $('#list').html('')
  queryData()
}

var bindFlag = false
var queryFlag = false

function queryData() {
  if (queryFlag) {
    return false
  }
  queryFlag = true
  var url = requestPath + '/m/order/getSapDeliveryOrder.htm'

  var dataMap = getDataMap()
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)

      $('#e_circleId').val(d.e_circleId)
      $('#e_isSalesman').val(d.e_isSalesman)
      $('#e_userId').val(d.e_userId)
      $('#e_sapCustomerId').val(d.e_sapCustomerId)

      $('#list').append(template('list_page', d))

      if (!bindFlag) {
        bindFlag = true
        if (!isNull(d.isSalesman) && d.isSalesman === 1) {
          // 业务员查询，显示客户下拉
          $('#khname').show()
          $('#depname').hide()
        } else {
          // 客户查询，显示销售组织
          $('#khname').hide()
          $('#depname').show()
          bindDepname(d.depList)
        }
      }
      //顶部横幅
      if (!isNull(d.otherBanner) && d.otherBanner.length > 0) {
        $('#wx_banner').html(template('otherBanner_page', d))
        $('.swiper-container').swiper({
          loop: true,
          autoplayDisableOnInteraction: false,
          autoplay: 5000
        })
        $('#obanner')
          .attr('src', $('#obanner').attr('src'))
          .load(function() {
            var realHeight = this.height
            var hy = parseInt(realHeight) + 44 + 'px'
            var ma = parseInt(realHeight) + 89 + 'px'
            $('.wx_hyfilter').css('top', hy)
            $('.wx_main').css('top', ma)
          })
      } else {
        // 没上传就显示默认的图片吧
        // $("#wx_banner").html("<img src='../../images/hybanner.jpg' />");
      }
      //处理语言
      execI18n()
    },
    true,
    function() {
      queryFlag = false
      $('.weui-infinite-scroll').hide()
    }
  )
}

// 绑定销售组织
function bindDepname(data) {
  $('#depname').select({
    title: '请选择销售组织',
    items: data,
    onChange: function(d) {
      $('.wx_hyfilter li').removeClass()
      if (isNull(d.values)) {
        $('#depname').html('销售组织<span class="xl"></span>')
        $('#vkorg').val('')
      } else {
        $('#depname')
          .html(d.titles + '<span class="xl"></span>')
          .addClass('current')
        $('#vkorg').val(d.values)
      }
    },
    onClose: function() {
      initPage()
    },
    onClear: function() {
      $('.wx_hyfilter li').removeClass()
      $('#depname').html('销售组织<span class="xl"></span>')
      $('#vkorg').val('')
      initPage()
    }
  })
}

function getDataMap() {
  var dataMap = {}

  if (!isNull($('#querykey').val())) {
    dataMap.querykey = $('#querykey').val()
  }
  if (!isNull($('#rqStart').val())) {
    dataMap.rqStart = $('#rqStart').val()
  }
  if (!isNull($('#rqEnd').val())) {
    dataMap.rqEnd = $('#rqEnd').val()
  }
  if (!isNull($('#sapCustomerId').val())) {
    dataMap.kunnr = $('#sapCustomerId').val()
  }
  if (!isNull($('#vkorg').val())) {
    dataMap.vkorg = $('#vkorg').val()
  }
  if (!isNull($('#wbstate').val())) {
    dataMap.wbsta = $('#wbstate').val()
  }

  return dataMap
}

template.helper('getDate', function(str, pattern) {
  if (isNull(str)) {
    return
  }
  str = str.replace(/-/g, '/')
  if (str.length > 19) {
    str = str.substring(0, 19)
  }
  var date = new Date(str)
  return date.format(pattern)
})

//导出出库明细数据
function toExportDelivery() {
  var url = requestPath + '/m/order/exportDelivery.htm'
  url =
    url +
    '?callback=xxxxx&&querykey=' +
    $('#querykey').val() +
    '&&rqStart=' +
    $('#rqStart').val() +
    '&&rqEnd=' +
    $('#rqEnd').val() +
    '&&kunnr=' +
    $('#sapCustomerId').val() +
    '&&vkorg=' +
    $('#vkorg').val() +
    '&&wbsta=' +
    $('#wbstate').val() +
    '&&e_circleId=' +
    $('#e_circleId').val() +
    '&&e_isSalesman=' +
    $('#e_isSalesman').val() +
    '&&e_userId=' +
    $('#e_userId').val() +
    '&&e_sapCustomerId=' +
    $('#e_sapCustomerId').val()
  openPage('导出出库明细数据', url, '1')
}
function toLinkUrl(title, linkUrl) {
  if (isNull(linkUrl)) {
    return false
  }
  setTimeout(function() {
    openPage(title, linkUrl, '1')
  }, 500)

  // 统计
  var url = requestPath + '/m/home/statistics/record.htm'
  var dataMap = {}
  dataMap.hsName = title
  dataMap.hsUrl = linkUrl
  dataMap.hsType = 1
  dataMap.flag00 = 2 //类型,1.首页统计,2横幅统计
  $.ajaxjsonp(url, dataMap, function(data) {}, false)
}
