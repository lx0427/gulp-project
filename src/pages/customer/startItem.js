$(function() {
  queryData()
})
var rely = new Map()
var josnStr = ''
var list = null
function queryData() {
  var url = requestPath + '/m/question/getItemList.htm'
  var dataMap = {}
  dataMap.queId = $('#queId').val()
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      rely = d.rely
      console.log(d)
      $('#queName').text(sessionStorage.queName)
      if (!isNull(sessionStorage.summary)) {
        $('#summary').text(sessionStorage.summary)
      }
      $('#list').html(template('list_page', d))

      $('.wx_lookinto_info .cont .item .clist li .iconfont').bind(
        'click',
        function() {
          $(this)
            .parent()
            .parents()
            .children('li')
            .each(function() {
              if (
                $(this)
                  .children('i')
                  .hasClass('icon-selectcur')
              ) {
                $(this)
                  .children('i')
                  .removeClass('icon-selectcur')
                $(this)
                  .children('i')
                  .addClass('icon-checkbox')
              }
            })
          $(this).removeClass('icon-checkbox')
          $(this).addClass('icon-selectcur')
        }
      )
    },
    true
  )
}

/**
 * 选择一个选项
 * @param itemId
 * @param optId
 * @param obj
 */
function selectOpt(obj, type, optId) {
  if (type == 0) {
    //如果是单选
    if (
      $(obj)
        .children()
        .attr('class') == 'iconfont icon-checkbox'
    ) {
      //如果未选择
      $(obj)
        .siblings()
        .children()
        .each(function() {
          var siblingId = $(this).attr('id')
          $('div[name=' + siblingId + ']').remove()
        })
      for (var i = 0; i < rely.length; i++) {
        if (optId == rely[i].relyOption) {
          $(obj)
            .parent()
            .after(template('list_page', { list: [rely[i]] }))
        }
      }
      //更改勾选样式
      $(obj)
        .siblings()
        .children()
        .attr('class', 'iconfont icon-checkbox')
      $(obj)
        .children()
        .attr('class', 'iconfont icon-selectcur')
    }
  } else if (type == 1) {
    //如果是多选
    if (
      $(obj)
        .children()
        .attr('class') == 'iconfont icon-checkbox'
    ) {
      for (var i = 0; i < rely.length; i++) {
        if (optId == rely[i].relyOption) {
          $(obj)
            .parent()
            .after(template('list_page', { list: [rely[i]] }))
        }
      }
      $(obj)
        .children()
        .attr('class', 'iconfont icon-selectcur')
    } else if (
      $(obj)
        .children()
        .attr('class') == 'iconfont icon-selectcur'
    ) {
      $('div[name=' + optId + ']').remove()
      $(obj)
        .children()
        .attr('class', 'iconfont icon-checkbox')
    }
  }
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

/**
 * 提交
 */
var flag = true
function submit() {
  if (checkValue()) {
    if (flag) {
      flag = false
      var dataMap = {}
      var cz = $('#cz').val()
      var url = requestPath + '/m/question/submit.htm'
      if (cz) {
        // 客户满意度调查
        url = requestPath + '/m/question/customerSubmit.htm'
        dataMap.cz = cz
        dataMap.hydm = getLocalData('scanhydm')
        dataMap.userName = $('#userName').val()
        dataMap.mobile = $('#mobile').val()
        dataMap.companyName = getLocalData('scanmbname')
      }
      dataMap.queId = $('#queId').val()
      dataMap.openid = localStorage.userTempId
      dataMap.result = getSeleResult()
      dataMap.textResult = getTextResult()
      console.info('dataMap:' + JSON.stringify(dataMap))
      $.ajaxjsonp(
        url,
        dataMap,
        function(data) {
          var d = eval(data)
          console.log(d)
          if (cz) {
            $.modal({
              text: '提交成功!<br>感谢您的参与!',
              buttons: [
                {
                  text: '继续反馈',
                  onClick: function() {
                    var paramStr = tool.stringify({
                      queId: $('#queId').val(),
                      pm: $('#pm').val()
                    })
                    location.replace(
                      '../customer/startNewQuestion.html?' + paramStr
                    )
                  }
                },
                {
                  text: '反馈完成',
                  onClick: function() {
                    setTimeout(function() {
                      openPage('我的', '../customer/my1.html', '1')
                    }, 400)
                  }
                }
              ]
            })
          } else {
            showMessage('提交成功!<br>感谢您的参与!')
            setTimeout(function() {
              openPage('我的', '../customer/my1.html', '1')
            }, 1000)
          }
        },
        true,
        function() {
          flag = true
        }
      )
    } else {
      showMessage('请勿重复提交!')
    }
  }
}

/**
 * 表单验证
 * @returns {Boolean}
 */
function checkValue() {
  var $must = $('.is-must') // 所有非评分必填题
  for (var i = 0; i < $must.length; i++) {
    var $el = $must.eq(i)
    var $children = $el.children()
    var isSelected = false
    for (var j = 0; j < $children.length; j++) {
      if ($children[0].nodeName === 'TEXTAREA' && $children.eq(0).val()) {
        isSelected = true
      } else if (
        $children
          .eq(j)
          .children()
          .eq(0)
          .hasClass('icon-selectcur')
      ) {
        isSelected = true
        break
      }
    }
    if (!isSelected) {
      showMessage('第' + $el.attr('num') + '题' + '为必填项，请先完成！')
      return false
    }
  }
  return true
}

function getSeleResult() {
  var m = new Map()
  $('.icon-selectcur').each(function() {
    var iId = $(this).attr('id')

    //单选,多选问题
    if (!isNull(iId) && typeof iId != 'undefined') {
      m.set(
        iId,
        $(this)
          .parent()
          .parent()
          .attr('id')
      )
    }

    //评分式问题
    else {
      //先得到评论的分数
      var index = $(this)
        .parent()
        .index()
      index = (index + 1) * 2
      iId = $(this)
        .parent()
        .parent()
        .attr('id')
      m.set(
        iId + '-' + index,
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .attr('id')
      )
    }
  })
  return MapTOJson(m)
}

function getTextResult() {
  var t = new Map()
  $('textarea').each(function() {
    t.set($(this).attr('id'), $(this).val())
  })
  return MapTOJson(t)
}
