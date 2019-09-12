$(function() {
  // 滚动加载,需要分页的地方id必须是infinitePage
  $('#menberInfinitePage')
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
        getMenberList()
      }, 10)
    })

  getMenberList()

  $('#menberForm').bind('submit', function() {
    $('#pageIndex').val('0')
    $('#menberList').html('')
    getMenberList()
    return false
  })

  $('.weui_icon_clear').bind('click', function() {
    if (isNull($('#menberKeyword').val())) {
      return false
    }
    $('#menberKeyword').val('')
    $('#pageIndex').val('0')
    $('#menberList').html('')
    getMenberList()
  })

  $('.weui_search_cancel').bind('click', function() {
    if (isNull($('#menberKeyword').val())) {
      return false
    }
    $('#menberKeyword').val('')
    $('#pageIndex').val('0')
    $('#menberList').html('')
    getMenberList()
  })
})

function getMenberList() {
  var url = requestPath + '/m/select/menberList.htm'
  var dataMap = {}
  dataMap.language = i18nLanguage
  var menberKeyword = $('#menberKeyword').val()
  if (!isNull(menberKeyword)) {
    dataMap.mbname = menberKeyword
  }
  var pm = $('#pm').val()
  if (!isNull(pm)) {
    dataMap.pm = $('#pm').val()
    $('#pmname').html(pm)
  }
  dataMap.pageSize = 200
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      $('#menberList').append(template('menberList_page', d))
      $('#menberCount').html(d.data.length)
    },
    false,
    function() {
      $('#zwt-img').css('display', 'none')
    }
  )
}

function showMenberPopup() {
  $('#menberPopup').popup()
}

function chooseMenber(hydm, mbname, sapCustomerId) {
  $('#hydm').val(hydm)
  $('#mbname').val(mbname)
  $('#sapCustomerId').val(sapCustomerId)
  $('#mbname').trigger('change')
}
function changeMbname(cb) {
  $('#mbname').bind('change', function() {
    $('#khname')
      .siblings()
      .removeClass('current')
    var mbname = $('#mbname').val()
    if (isNull(mbname)) {
      $('#khname').html('客户<span class="xl"></span>')
    } else {
      $('#khname')
        .html(mbname)
        .addClass('current')
    }
    cb && cb()
  })
}
