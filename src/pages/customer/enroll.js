$(function() {
  queryData()
})

function showRemark() {
  $('#remarkPopup').popup()
}
function toLink(eid) {
  openPage('报名', '../customer/enroll.html?eid=' + eid, '1')
}
function bindPm() {
  var array = []
  var pmlist = [
    'DTY',
    'FDY',
    'POY',
    '短纤',
    '涤纶切片',
    '锦纶切片',
    '差异化产品'
  ]
  pmlist.forEach(function(v) {
    array.push({
      title: v,
      value: v
    })
  })
  $('#cpx').select({
    title: '请选择(可多选)',
    multi: true,
    items: array,
    onChange: function(d) {},
    onClose: function() {},
    onClear: function() {}
  })
}
// 获取当前活动表单数据
function queryData() {
  var eid = $('#eid').val() // 当前活动id
  var url = requestPath + '/m/enroll/getEnrollInfo.htm'
  scanRecord(92, 1, eid, window.location.href, '报名活动') // 统计活动浏览次数
  $.ajaxjsonp(
    url,
    { eid: eid },
    function(data) {
      data.keys = ['defined1', 'defined2', 'defined3', 'defined4', 'defined5'] // 可自定义字段key
      $('body').append(template('form', data))
      // 规则渲染+字符串格式化
      $('body').append(
        template('popupTemplate', {
          id: 'remarkPopup',
          title: data.temp.enrollName + '说明',
          lists: data.temp.remark.split('>>')
        })
      )
      bindPm() // 需要dom先渲染完成
    },
    true
  )
}
// 提交报名
var registerFlag = false
function enroll() {
  if (registerFlag) {
    return false
  }
  if (!checkValue()) {
    return false
  }
  var url = requestPath + '/m/enroll/doEnroll.htm'
  var dataMap = Object.assign(
    {},
    tool.parse(decodeURIComponent($('form').serialize()))
  )
  dataMap.eid = $('#eid').val()
  registerFlag = true

  console.log(dataMap, 'dataMap')
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      showOk('报名成功', function() {
        openPage('首页', '../customer/index.html', '1')
      })
    },
    false,
    function() {
      registerFlag = false
    }
  )
}

function checkValue() {
  var $inputs = $('.formItem')
  for (var len = $inputs.length, i = 0; i < len; i++) {
    var inputVal = $inputs
        .eq(i) // 返回的是jquery对象，get返回DOM对象
        .children('input')
        .val(),
      label = $inputs
        .eq(i)
        .children('label')
        .text()
    if (!inputVal) {
      showToptip('请输入' + label)
      return false
    }
  }
  return true
}
