var NULL_DEFAULT_VALUE = '待完善'
$(function() {
  $('#dq_txt').cityPicker({
    title: '选择地区',
    onChange: function(picker, values, displayValues) {
      $('#dq_txt').html(
        displayValues[0] + ' ' + displayValues[1] + ' ' + displayValues[2]
      )
      $('#dq1code').val(values[0])
      $('#dq1name').val(displayValues[0])
      $('#dqcode').val(values[1])
      $('#dqname').val(displayValues[1])
      $('#xjcode').val(values[2])
      $('#xjname').val(displayValues[2])
    },
    onClear: function() {
      $('#dq_txt').html('')
      $('#dq1code').val('')
      $('#dq1name').val('')
      $('#dqcode').val('')
      $('#dqname').val('')
      $('#xjcode').val('')
      $('#xjname').val('')
    }
  })
  var url = window.location.href
  scanRecord(24, 0, '', url, '我的资料')
  queryData()
})

function queryData() {
  sessionStorage.userLevel = null
  var dataMap = {}
  var url = requestPath + '/m/my/myInfo.htm'
  $.ajaxjsonp(url, dataMap, function(data) {
    var user = eval(data)
    console.log(user)
    // 初始化头像
    if (!isNull(user.userPhoto)) {
      $('#userPhotoPath').val(user.userPhoto)
      $('#userPhotoImg').attr('src', filePathOld + user.userPhoto)
    }
    if (!isNull(user.shno2url)) {
      $('#shno2url').val(user.shno2url)
      $('#shno2PhotoImg').attr('src', filePathOld + user.shno2url)
    }
    if (!isNull(user.billingInfo)) {
      $('#billingInfo').val(user.billingInfo)
      $('#billingPhotoImg').attr('src', filePathOld + user.billingInfo)
    }
    // 初始化姓名
    if (isNull(user.userName)) {
      $('#userName').text('姓名: ' + NULL_DEFAULT_VALUE)
    } else {
      $('#userName').text('姓名: ' + user.userName)
    }
    // 初始化姓名
    if (isNull(user.userName)) {
      $('#mobile').text('手机号: ' + NULL_DEFAULT_VALUE)
    } else {
      $('#mobile').text('手机号: ' + user.mobile)
    }
    /*// 初始化Email
        if (isNull(user.email)) {
            $("#email").attr("placeholder", NULL_DEFAULT_VALUE);
        } else {
            $("#email").val(user.email);
        }*/
    // 初始化省份代码
    if (!isNull(user.dq1code)) {
      $('#dq1code').val(user.dq1code)
    }
    // 初始化省名称
    if (!isNull(user.dq1name)) {
      $('#dq1name').val(user.dq1name)
    }
    // 初始化市区代码
    if (!isNull(user.dqcode)) {
      $('#dqcode').val(user.dqcode)
    }
    // 初始化市区名称
    if (!isNull(user.dqname)) {
      $('#dqname').val(user.dqname)
    }
    // 初始化县区代码
    if (!isNull(user.xjcode)) {
      $('#xjcode').val(user.xjcode)
    }
    // 初始化县区名称
    if (!isNull(user.xjname)) {
      $('#xjname').val(user.xjname)
    }
    // 初始化省市区中文拼接
    if (isNull(user.dq1name) && isNull(user.dqname) && isNull(user.xjname)) {
      $('#dq_txt').html(NULL_DEFAULT_VALUE)
    } else {
      $('#dq_txt').html(user.dq1name + ' ' + user.dqname + ' ' + user.xjname)
    }
    // 初始化收货地址
    if (isNull(user.shaddr)) {
      $('#shaddr').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#shaddr').val(user.shaddr)
    }
    // 初始化法人
    if (isNull(user.fr)) {
      $('#fr').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#fr').val(user.fr)
    }
    // 初始联系人
    if (isNull(user.coplxr)) {
      $('#coplxr').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#coplxr').val(user.coplxr)
    }
    // 初始联系电话
    if (isNull(user.coptel)) {
      $('#coptel').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#coptel').val(user.coptel)
    }
    // 初始开票电话
    if (isNull(user.billingTel)) {
      $('#billingTel').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#billingTel').val(user.billingTel)
    }
    // 初始税号
    if (isNull(user.shno1)) {
      $('#shno1').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#shno1').val(user.shno1)
    }
    // 开户行
    if (isNull(user.khbank)) {
      $('#khbank').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#khbank').val(user.khbank)
    }
    // 开户账号
    if (isNull(user.khzh)) {
      $('#khzh').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#khzh').val(user.khzh)
    }
    // 应用领域
    if (isNull(user.applicationArea)) {
      $('#applicationArea').attr('placeholder', NULL_DEFAULT_VALUE)
    } else {
      $('#applicationArea').val(user.applicationArea)
    }
    if (!isNull(user.monplan)) {
      var pm = eval('(' + user.monplan + ')')
      console.log(pm)
      $('#DTY').val(pm.DTY)
      $('#POY').val(pm.POY)
      $('#FDY').val(pm.FDY)
      $('#dlqp').val(pm.dlqp)
      $('#jlqp').val(pm.jlqp)
      $('#dx').val(pm.dx)
    }
    if (!isNull(user.ggList)) {
      $('#gg').val(user.ggList[0].gg)
    }
    for (var i = 1; i < user.ggList.length; i++) {
      add()
      $('#gg' + i).val(user.ggList[i].gg)
    }
    if (user.status == 100) {
      $('.wx_pop').show()
      $('#approval').show()
      $('#footBtn').show()
      $('footer').hide()
    } else if (user.status == 4) {
      $('footer').show()
      if (!isNull(user.jjly)) {
        $('#jjly').text(user.jjly)
      }
      $('.wx_pop').show()
      $('#refuse').show()
      $('#footBtn').hide()
      $('footer').show()
    } else {
      $('.wx_pop').hide()
      $('footer').show()
    }
  })
}

// 上传头像
function uploadImg(callback) {
  startUpload(callback)
}
// 头像上传回调
function userPhotoCallback(data) {
  var d = JSON.parse(data)
  $('#userPhotoPath').val(d.result)
  $('#userPhotoImg').attr('src', filePathOld + d.result)
}

function shno2PhotoCallback(data) {
  var d = JSON.parse(data)
  $('#shno2url').val(d.result)
  $('#shno2PhotoImg').attr('src', filePathOld + d.result)
}

function billingPhotoCallback(data) {
  var d = JSON.parse(data)
  $('#billingInfo').val(d.result)
  $('#billingPhotoImg').attr('src', filePathOld + d.result)
}

function updateUserInfo() {
  // 检查必填项
  if (!checkValue()) {
    return false
  }
  // 获取参数
  var dataMap = getDataMap()
  var url = requestPath + '/m/my/updateMyInfo.htm'
  $.ajaxjsonp(url, dataMap, function(data) {
    showMessage($.i18n.prop('ui_xgsuccess'))
    setTimeout(function() {
      toMyPage()
    }, 1000)
  })
}

function checkValue() {
  var userName = $('#userName').val()
  if (isNull(userName)) {
    showMessage($.i18n.prop('ui_qsrndmc'))
    $('#userName').focus()
    return false
  }
  if (isNull(userName)) {
    showMessage($.i18n.prop('ui_qsrndmc'))
    $('#mobile').focus()
    return false
  }
  var shno2url = $('#shno2url').val()
  if (isNull(shno2url)) {
    showMessage('请上传营业执照')
    return false
  }
  return true
}

// 获取参数
function getDataMap() {
  var dataMap = {}
  // 获取头像
  var userPhoto = $('#userPhotoPath').val()
  if (!isNull(userPhoto)) {
    dataMap.userPhoto = userPhoto
  }
  // 获取姓名
  var userName = $('#userName').val()
  dataMap.userName = userName
  var shno2url = $('#shno2url').val()
  if (!isNull(shno2url)) {
    dataMap.shno2url = shno2url
  }
  var billingInfo = $('#billingInfo').val()
  if (!isNull(billingInfo)) {
    dataMap.billingInfo = billingInfo
  }
  var fr = $('#fr').val()
  if (!isNull(fr)) {
    dataMap.fr = fr
  }
  var coplxr = $('#coplxr').val()
  if (!isNull(coplxr)) {
    dataMap.coplxr = coplxr
  }
  var coptel = $('#coptel').val()
  if (!isNull(coptel)) {
    dataMap.coptel = coptel
  }
  var billingTel = $('#billingTel').val()
  if (!isNull(billingTel)) {
    dataMap.billingTel = billingTel
  }
  // 获取收货地区-省份代码
  var dq1code = $('#dq1code').val()
  if (!isNull(dq1code)) {
    dataMap.dq1code = dq1code
  }
  // 获取收货地区-省份名称
  var dq1name = $('#dq1name').val()
  if (!isNull(dq1name)) {
    dataMap.dq1name = dq1name
  }
  // 获取收货地区-市区代码
  var dqcode = $('#dqcode').val()
  if (!isNull(dqcode)) {
    dataMap.dqcode = dqcode
  }
  // 获取收货地区-市区名称
  var dqname = $('#dqname').val()
  if (!isNull(dqname)) {
    dataMap.dqname = dqname
  }
  // 获取收货地区-县级代码
  var xjcode = $('#xjcode').val()
  if (!isNull(xjcode)) {
    dataMap.xjcode = xjcode
  }
  // 获取收货地区-县级名称
  var xjname = $('#xjname').val()
  if (!isNull(xjname)) {
    dataMap.xjname = xjname
  }
  // 获取收货地址
  var shaddr = $('#shaddr').val()
  if (!isNull(shaddr)) {
    dataMap.copaddr = shaddr
  }
  var shno1 = $('#shno1').val()
  if (!isNull(shno1)) {
    dataMap.shno1 = shno1
  }
  var khbank = $('#khbank').val()
  if (!isNull(khbank)) {
    dataMap.khbank = khbank
  }

  var khzh = $('#khzh').val()
  if (!isNull(khzh)) {
    dataMap.khzh = khzh
  }
  var applicationArea = $('#applicationArea').val()
  if (!isNull(applicationArea)) {
    dataMap.applicationArea = applicationArea
  }
  var m = new Map()
  m.set('DTY', $('#DTY').val())
  m.set('POY', $('#POY').val())
  m.set('FDY', $('#FDY').val())
  m.set('dlqp', $('#dlqp').val())
  m.set('jlqp', $('#jlqp').val())
  m.set('dx', $('#dx').val())
  dataMap.monplan = MapTOJson(m)
  var t = new Map()
  var i = 0
  $('#ggList')
    .children()
    .each(function() {
      if (
        $(this)
          .children()
          .val() != '' &&
        $(this)
          .children()
          .val() != null
      ) {
        t.set(
          i,
          $(this)
            .children()
            .val()
        )
        i++
      }
    })
  console.log(MapTOJson(t))
  dataMap.ggList = MapTOJson(t)
  return dataMap
}

function toMyInfo(obj) {
  $(obj)
    .siblings()
    .removeAttr('class')
  $(obj).attr('class', 'on')
  $('#baseInfo').hide()
  $('#detailInfo').show()
}

function toDetailInfo(obj) {
  $(obj)
    .siblings()
    .removeAttr('class')
  $(obj).attr('class', 'on')
  $('#baseInfo').show()
  $('#detailInfo').hide()
}

/**
 * Map转json
 * @author 许杰
 * @param m
 * @returns String
 */
function MapTOJson(m) {
  var str = '{'
  var i = 1
  m.forEach(function(item, key, mapObj) {
    if (mapObj.size == i) {
      str += '"' + key + '":"' + item + '"'
    } else {
      str += '"' + key + '":"' + item + '",'
    }
    i++
  })
  str += '}'
  //console.log(str);
  return str
}

function add() {
  var i = $('#ggList').children().length
  var htmlStr =
    '<li><input type="text" id="gg' + i + '" placeholder="请输入规格"/>'
  htmlStr += '<i class="iconfont icon-cha" onclick="del(this)"></i></li>'
  $('#ggList').append(htmlStr)
}

function del(obj) {
  $(obj)
    .parent()
    .remove()
}
