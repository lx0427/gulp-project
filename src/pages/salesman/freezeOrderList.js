$(function() {
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
})

function initPage() {
  $('#pageIndex').val(0)
  $('#list').html('')
  queryData()
}

function queryData() {
  var url = requestPath + '/m/sapOrder/list.htm'

  var dataMap = getDataMap()
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      console.log(d)
      $('#list').append(template('list_page', d))
      setTimeout(function() {
        execI18n()
      }, 500)
    },
    true
  )
}

function getDataMap() {
  var dataMap = {}

  if (!isNull($('#querykey').val())) {
    dataMap.querykey = $('#querykey').val()
  }
  dataMap.shStatus = 600
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
