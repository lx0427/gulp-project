var pageNumber = 1 // 当前页码
var pageSize = 5 // 每页条数

$(function() {
  changeMbname(initPage) // 客户
  calendarInit('.wx_hyfilter', 'rqStart', '开始日期', initPage)
  calendarInit('.wx_hyfilter', 'rqEnd', '结束日期', initPage)
  queryData()
})

function initPage() {
  $('#list').html('')
  pageNumber = 1
  queryData()
}
function queryData() {
  var url = requestPath + '/m/sap/storage/getStorageSo.htm'
  var type = $('#type').val()
  if (type == '2') {
    // 交货调拨单
    url = requestPath + '/m/sap/storage/getStorageDo.htm'
  }
  var dataMap = {
    iKunnr: $('#mbname').val(), // 客户编号
    iStart: $('#rqStart').val(),
    // iStart: '2018-07-04',
    iEnd: $('#rqEnd').val(),
    iEmployeeName: '',
    pageNumber: pageNumber, // 页数
    pageSize: pageSize // 条数
  }
  $.ajaxjsonp(
    url,
    dataMap,
    function(res) {
      var data = res.data.detail
      if (data) {
        for (var i = 0; i < data; i++) {
          data[i].maktx = data[i].maktx.replace('-', ' ')
          data[i].des = data[i].maktx.split(' ')
        }
        $('#list').append(template('list_page_' + type, { detail: data }))
        if (data.length === pageSize) {
          infiniteLoading = false
          pageNumber++
        }
      }
      if (parseInt($('#recordCount').val()) === 0) {
        $('#hyNoData').show()
      } else {
        $('#hyNoData').hide()
      }
    },
    true
  )
  // $.ajax({
  //   url: url,
  //   type: 'POST',
  //   dataType: 'json',
  //   data: dataMap,
  //   xhrFields: {
  //     withCredentials: true
  //   },
  //   crossDomain: true,
  //   success: function(res) {
  //     var data = res.data.detail
  //     if (res.status === 200) {
  //       if (data) {
  //         for (var i = 0; i < data; i++) {
  //           data[i].maktx = data[i].maktx.replace('-', ' ')
  //           data[i].des = data[i].maktx.split(' ')
  //         }
  //         $('#list').append(template('list_page', { detail: data }))
  //         if (data.length === pageSize) {
  //           infiniteLoading = false
  //           pageNumber++
  //         }
  //       } else {
  //         $('.weui-infinite-scroll').hide()
  //         $(document.body).destroyInfinite()
  //       }
  //       cb && cb()
  //     }
  //   }
  // })
}
