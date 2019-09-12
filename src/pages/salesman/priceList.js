$(function() {
  getUserInfo(function(userLevel) {
    console.log('userLevel: ' + userLevel)
    if (userLevel != 1) {
      document.body.addEventListener(
        'touchmove',
        function(event) {
          if (event.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!event.defaultPrevented) {
              event.preventDefault()
            }
          }
        },
        { passive: false }
      )
      $('#pmtitle').attr('onclick', '')
      $('#ggtitle').attr('onclick', '')
      $('#str03title').attr('onclick', '')
      $('#wzlbtitle').attr('onclick', '')
      $('#cdtitle').attr('onclick', '')
      if (userLevel == 0) {
        $('#wx_vaguebox1').show()
      } else if (userLevel == 2) {
        $('#wx_vaguebox2').show()
      }
    }
  })
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
  show()
  setTimeout(bindSelect, 100)
  queryData()
  setTimeout(scanRecordLoad, 200)
})

function scanRecordLoad() {
  var url = window.location.href
  var pm = $('#pm').val()
  var modelType = 0
  if (!isNull(pm)) {
    if (pm == 'DTY') {
      modelType = 6
    } else if (pm == 'POY') {
      modelType = 7
    } else if (pm == 'FDY') {
      modelType = 26
    } else if (pm == '切片') {
      modelType = 27
    } else if (pm == '锦纶切片') {
      modelType = 28
    } else if (pm == '短纤') {
      modelType = 29
    }
  }
  scanRecord(modelType, 0, '', url, '产品线' + pm)
}

var sapgg = null

function queryData() {
  var url = requestPath + '/m/resource/resourceList.htm'
  var dataMap = getDataMap()

  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      console.info(d)
      if (pullRefresh) {
        $('#list').html(template('list_page', d))
      } else {
        $('#list').append(template('list_page', d))
      }
    },
    true
  )
}

function getDataMap() {
  var dataMap = {}
  var pm = $('#pm').val()
  var diffFlag = $('#diffFlag').val()
  var searchRemark = $('#searchRemark').val()
  if (!isNull(diffFlag)) {
    dataMap.diffFlag = diffFlag //差异化标识查询
  }
  dataMap.language = i18nLanguage //语言
  if (!isNull(searchRemark)) {
    dataMap.searchRemark = searchRemark //关键词
  }

  if (!isNull(pm)) {
    dataMap.pm = pm
    if ($('#pm').val() == '切片') {
      $('#pmtitle').html('涤纶切片' + '<span class="xl"></span>')
    } else {
      $('#pmtitle').html($('#pm').val() + '<span class="xl"></span>')
    }
  }
  if (!isNull($('#querykey').val())) {
    dataMap.flag = $('#querykey').val()
  }
  if (!isNull($('#str03').val())) {
    dataMap.sz = $('#str03').val() //用来过滤筛选条件
    dataMap.str03 = $('#str03').val() //用来查询物资列表
  }
  if (!isNull($('#wzlb').val())) {
    dataMap.wzlb = $('#wzlb').val()
  }
  if (!isNull($('#cd').val())) {
    dataMap.cd = $('#cd').val()
  }
  if (!isNull($('#keyword').val())) {
    dataMap.keyword = $('#keyword').val()
    if ($('#keyword').val() == '切片') {
      $('#pmtitle').text('涤纶切片')
    } else {
      $('#pmtitle').text($('#keyword').val())
    }
  }
  if (!isNull($('#gg').val())) {
    dataMap.gg = $('#gg').val()
  }
  var customerId = $('#customerId').val()
  if (!isNull(customerId)) {
    dataMap.customerId = customerId
  }
  dataMap.ckdm = $('#ckdm').val()
  return dataMap
}

var json

function bindSelect() {
  var url = requestPath + '/m/resource/allSelectList.htm'
  var dataMap = getDataMap()
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      json = d
      $('#ggLeft').html(template('gg_left_page', d))
      bindLeft()
      $('#ggRight').html(template('gg_right_page', d))
      bindRight()
    },
    false
  )
}
function bindGgSelect(str) {
  var url = requestPath + '/m/select/getDenierGgMap.htm'
  var dataMap = getDataMap()
  dataMap.selectType = str
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      json.denierList = d.denierList
      json.ggMap = d.ggMap
      $('#ggLeft').html(template('gg_left_page', d))
      bindLeft()
      $('#ggRight').html(template('gg_right_page', d))
      bindRight()
    },
    false
  )
}
function bindLeft() {
  $('#ggLeft li').on('click', function() {
    $('#ggLeft li').removeClass('current')
    $(this).addClass('current')
    var min = $(this).attr('min')
    var max = $(this).attr('max')
    $('.gglist').hide()
    $('.gglist').each(function(i) {
      var denier = $(this).attr('denier')
      if (
        parseInt(denier) >= parseInt(min) &&
        parseInt(denier) <= parseInt(max)
      ) {
        $(this).show()
      }
    })
  })
}

function bindRight() {
  $('.ggselect').on('click', function() {
    var gg = $(this).attr('gg')
    var sapGg = $(this).text()
    $('.icon-duihao').hide()
    $(this)
      .find('.icon-duihao')
      .show()
    $('#gg').val(gg)

    $('#ggtitle').removeClass('current')
    if (isNull(gg) || gg == '不限') {
      $('#ggtitle').html($.i18n.prop('rl_guige') + '<span class="xl"></span>')
    } else {
      $('#ggtitle').html(sapGg + '<span class="xl"></span>')
    }

    toHide()

    var pm = $('#pm').val()
    if (pm == 'DTY') {
      // 更新下纱种
      setTimeout(function() {
        updateStr03Data()
      }, 10)
    }
    if (pm == 'POY' || pm == 'FDY') {
      // 类型
      setTimeout(function() {
        updateWzlbData()
      }, 10)
    }

    $('#list').html('')
    $('#pageIndex').val(0)
    queryData()
  })
}

function showGgSelect() {
  $('.wx_pulldownbox').toggle()
  $('.wx_opacity').toggle()
  $('.wx_pulldownbox2').hide()
  $('.wx_opacity2').hide()
  if ($('.wx_pulldownbox').css('display') == 'none') {
    $('#ggtitle').removeClass('current')
  } else {
    $('#ggtitle').addClass('current')
  }
}

function showSelect(str) {
  $('#xlsx3').html(template(str + 'list_page', json))
  $('#' + str + '_' + middle).addClass('current')
  $('.wx_pulldownbox2').toggle()
  $('.wx_opacity2').toggle()
  $('.wx_pulldownbox').hide()
  $('.wx_opacity').hide()
  if ($('.wx_pulldownbox2').css('display') == 'none') {
    $('#' + str + 'title').removeClass('current')
  } else {
    $('#' + str + 'title').addClass('current')
  }
}
var middle = ''

function middleSelect(str1, str2, id) {
  $('#' + str2 + 'title').html(str1 + '<span class="xl"></span>')
  $('#' + str2 + '_' + middle).removeClass('current')
  if (str1 == '纱种' || str1 == '类型' || str1 == '等级') {
    $('#' + str2 + '').val('')
    middle = ''
    $('#' + str2 + 'title').removeClass('current')
  } else {
    $('#' + str2 + '').val(str1)
    $('#' + str2 + 'title').addClass('current')
    $('#' + str2 + '_' + id).addClass('current')
    middle = id
  }

  toHide()

  if (str2 == 'wzlb') {
    //类型
    var pm = $('#pm').val()
    if (pm == '切片' || pm == '锦纶切片' || pm == '短纤') {
      // 更新等级
      setTimeout(function() {
        updateCdData()
      }, 10)
    }
    if (pm == 'POY' || pm == 'FDY') {
      // 更新规格
      setTimeout(function() {
        bindGgSelect('wzlb')
      }, 10)
    }
  }
  if (str2 == 'cd') {
    //等级
    var pm = $('#pm').val()
    if (pm == '切片' || pm == '锦纶切片') {
      // 更新物资类型
      setTimeout(function() {
        updateWzlbData()
      }, 10)
    }
    if (pm == '短纤') {
      // 更新规格
      setTimeout(function() {
        bindGgSelect('cd')
      }, 10)
    }
  }
  if (str2 == 'str03') {
    //纱种
    var pm = $('#pm').val()
    if (pm == 'DTY') {
      // 更新规格
      setTimeout(function() {
        bindGgSelect('str03')
      }, 10)
    }
  }
  $('#list').html('')
  $('#pageIndex').val(0)
  queryData()
}

function toHide() {
  $('.wx_pulldownbox2').hide()
  $('.wx_opacity2').hide()
  $('.wx_opacity').hide()
  $('.wx_pulldownbox').hide()

  $('.wx_ziyfilter li').removeClass('current')
}

function initPage() {
  $('#pageIndex').val(0)
  $('#list').html('')

  queryData()
}

var pmcode = '1'

function showPmSelect() {
  $('#xlsx3').html(template('pmlist_page', 1))
  $('#pm' + pmcode).addClass('current')
  $('#pmtitle').addClass('current')
  $('.wx_pulldownbox2').toggle()
  $('.wx_opacity2').toggle()
  $('.wx_pulldownbox').hide()
  $('.wx_opacity').hide()
}

function pmSelect(pm, code) {
  pmcode = code
  $('.wx_pulldownbox2').toggle()
  $('.wx_opacity2').toggle()
  $('.wx_pulldownbox').hide()
  $('.wx_opacity').hide()
  $('#pmtitle').removeClass('current')
  $('#pm').val(pm)
  $('#pageIndex').val(0)
  $('#list').html('')
  show()
  queryData()
  bindSelect()
}

function show() {
  $('#str03title').hide()
  $('#cdtitle').hide()
  $('#wzlbtitle').hide()
  $('#ggtitle').hide()

  $('#str03').val('')
  $('#cd').val('')
  $('#wzlb').val('')
  $('#gg').val('')

  $('#str03title').html($.i18n.prop('rl_shazhong') + '<span class="xl"></span>')
  $('#cdtitle').html($.i18n.prop('rl_dengji') + '<span class="xl"></span>')
  $('#wzlbtitle').html($.i18n.prop('rl_leixing') + '<span class="xl"></span>')
  $('#ggtitle').html($.i18n.prop('rl_guige') + '<span class="xl"></span>')

  $('#str03title').removeClass('current')
  $('#cdtitle').removeClass('current')
  $('#wzlbtitle').removeClass('current')
  $('#ggtitle').removeClass('current')

  if (!isNull($('#pm').val())) {
    var pm = $('#pm').val()

    if (pm == 'DTY') {
      $('#ggtitle').show()
      $('#str03title').show()
    }
    if (pm == 'POY' || pm == 'FDY') {
      $('#ggtitle').show()
      $('#wzlbtitle').show()
    }
    if (pm == '切片' || pm == '锦纶切片') {
      $('#wzlbtitle').show()
      $('#cdtitle').show()
    }
    if (pm == '短纤') {
      $('#ggtitle').show()
      $('#cdtitle').show()
    }
  }

  if (!isNull($('#keyword').val())) {
    var keyword = $('#keyword').val()
    if (keyword == 'DTY') {
      $('#ggtitle').show()
      $('#str03title').show()
    }
    if (keyword == 'POY' || keyword == 'FDY') {
      $('#ggtitle').show()
      $('#wzlbtitle').show()
    }
    if (keyword == '切片' || keyword == '锦纶切片') {
      $('#wzlbtitle').show()
      $('#cdtitle').show()
    }
    if (keyword == '短纤') {
      $('#ggtitle').show()
      $('#cdtitle').show()
    }
  }
}

// 更新纱种数据
function updateStr03Data() {
  var url = requestPath + '/m/select/str03List.htm'
  var dataMap = {}
  dataMap.pm = $('#pm').val()
  dataMap.gg = $('#gg').val()

  var dataMap = getDataMap()
  dataMap.str03 = ''
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    json.str03list = d.data
  })
}

// 更新类型数据
function updateWzlbData() {
  var url = requestPath + '/m/select/wzlbList.htm'
  var dataMap = {}
  dataMap.pm = $('#pm').val()
  dataMap.gg = $('#gg').val()
  if (
    dataMap.pm != null &&
    (dataMap.pm == '切片' || dataMap.pm == '锦纶切片')
  ) {
    dataMap.cd = $('#cd').val()
  }
  var dataMap = getDataMap()
  dataMap.wzlb = ''
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    json.wzlblist = d.data
  })
}

// 更新等级数据
function updateCdData() {
  var url = requestPath + '/m/select/cdList.htm'
  var dataMap = {}
  dataMap.pm = $('#pm').val()
  dataMap.wzlb = $('#wzlb').val()

  var dataMap = getDataMap()
  dataMap.cd = ''
  $.ajaxjsonp(url, dataMap, function(data) {
    var d = eval(data)
    json.cdlist = d.data
  })
}

template.helper('listgetDenier', function(denier) {
  if (isNull(denier)) {
    return ''
  } else {
    var arr = denier.split('.')
    if (arr.length > 1) {
      if (parseFloat(arr[1]) > 0) {
        return denier
      } else {
        return arr[0]
      }
    } else {
      return arr[0]
    }
  }
})
