$(function() {
  $('#companyName').val(getLocalData('scanmbname'))
  $('#userName').val(getLocalData('username'))
  $('#mobile').val(getLocalData('scanmobile'))
  getSpecification()
})

/* 规格定制化多选 start */
// 连接字符串
function connectStr(a, b, connector) {
  connector = connector || ','
  if (a && b) {
    return a + connector + b
  } else {
    return a || b
  }
}
// 处理选中+禁用
function specDealDisabled(selectGroupId) {
  $('#specificationPopup input').each(function(i, v) {
    if (selectGroupId) {
      if ($(this).attr('group-id') !== selectGroupId) {
        $(this).prop('disabled', true)
        $(this)
          .closest('.weui_check_label')
          .addClass('is-disabled')
      }
    } else {
      // 清空所有选项
      $(this).prop('checked', false)
      $(this).prop('disabled', false)
      $(this)
        .closest('.weui_check_label')
        .removeClass('is-disabled')
    }
  })
}
// 记录选中值
function selectedRecord() {
  var $checkDom = $('#specificationPopup input:checked')
  var values = []
  var labels = []
  $checkDom.each(function() {
    values.push($(this).val())
    labels.push($(this).attr('label'))
  })
  $('#selectPm').val(labels.join(','))
  $('#selectPm').attr('data-values', values.join(','))
}
// 点击显示弹框
$('body').on('click', '#specificationSelect', function() {
  $('#specificationPopup').popup()
})
// 点击选项
$('body').on('click', '#specificationPopup input', function(e) {
  var selectGroupId = $(this).attr('group-id')
  var isChecked = $(this).prop('checked')
  var $checkDom = $('#specificationPopup input:checked')
  if (isChecked) {
    specDealDisabled(selectGroupId)
  } else {
    if (!$checkDom.length) {
      specDealDisabled()
    }
  }
  selectedRecord()
})
// 清空
$('body').on('click', '#specClearAll', function() {
  specDealDisabled()
  selectedRecord()
})
/* 规格定制化多选 end */

// 开始回答问卷
function start() {
  if (!checkValue()) return
  var queId = $('#queId').val()
  var cz = $('#selectPm').attr('data-values') || ''
  var paramStr = tool.stringify({
    queId: queId,
    pm: $('#pm').val(),
    cz: JSON.stringify(cz.split(',')),
    userName: $('#userName').val(),
    mobile: $('#mobile').val()
  })
  location.replace('../customer/startItem.html?' + paramStr)
}

// 获取历史购买规格
function getSpecification() {
  var url = requestPath + '/m/question/getItemCZList.htm'
  var dataMap = {
    showLoading: true,
    pm: $('#pm').val(),
    hydm: getLocalData('scanhydm'),
    userName: getLocalData('scanhydm'),
    item: $('#queId').val()
  }
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var specificationList = data.beforelist
      if (specificationList.length) {
        bindPm(data.beforelist)
      } else {
        $.modal({
          text: '您已完成当前问卷调查反馈！',
          buttons: [
            {
              text: '返回',
              onClick: function() {
                setTimeout(function() {
                  history.go(-1)
                }, 400)
              }
            }
          ]
        })
      }
    },
    false
  )
}

function bindPm(pmlist) {
  var array = []
  pmlist = pmlist || []
  pmlist.forEach(function(v) {
    array.push({
      label: v.gg + '-' + v.cz,
      groupId: v.depname2,
      value: v.cz
    })
  })
  $('body').append(
    template('specTemplate', {
      list: array
    })
  )
  selectedRecord()
  // $('#selectPm').select({
  //   title: '请选择规格',
  //   input: '请选择规格',
  //   multi: true,
  //   items: array
  // })
}

function checkValue() {
  if ($('#userName').val() == null || $('#userName').val() == '') {
    showMessage('请输入填写人!')
    return false
  }
  if ($('#mobile').val() == null || $('#mobile').val() == '') {
    showMessage('请输入联系方式!')
    return false
  }
  if (!/^[1][0-9]{10}$/.test($('#mobile').val())) {
    showMessage('请输入正确的联系方式!')
    return false
  }
  if (!$('#selectPm').attr('data-values')) {
    showMessage('请选择产品线!')
    return false
  }
  return true
}
