$(function() {
  var userTempId = localStorage.userTempId
  if (isNull(userTempId)) {
    getUserTempId()
    setTimeout(function() {
      queryData()
    }, 500)
  } else {
    queryData()
  }
})

function queryData() {
  var url = requestPath + '/m/question/customerlist.htm'
  $.ajaxjsonp(
    url,
    {
      hydm: getLocalData('scanhydm')
    },
    function(data) {
      var dataList = data.list
      var url = requestPath + '/m/question/list.htm'
      $.ajaxjsonp(
        url,
        {
          openid: localStorage.userTempId
        },
        function(res) {
          dataList = dataList.concat(res.list)
          if (dataList.length == 0) {
            showMessage('没有可以参加的问卷!')
            setTimeout(function() {
              openPage('调查问卷', '../customer/my1.html', '1')
            }, 1000)
          }
          $('#list').append(template('list_page', { list: dataList }))
          console.log(dataList, '问题列表')
        },
        true
      )
    },
    false
  )
}

//获取临时用户id
function getUserTempId() {
  var url = requestPath + '/m/question/getUserTempId.htm'
  var dataMap = {}
  $.ajaxjsonp(
    url,
    dataMap,
    function(data) {
      var d = eval(data)
      localStorage.userTempId = d.userid
    },
    true
  )
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

function openQuestion(queId, queName, summary) {
  sessionStorage.queName = queName
  sessionStorage.summary = summary
  openPage('调查问卷', '../customer/startQuestion.html?queId=' + queId, '1')
}

// 客户满意度调查
function openNewQuestion(queId, pm) {
  openPage(
    '客户满意度调查',
    '../customer/startNewQuestion.html?queId=' + queId + '&pm=' + pm,
    '1'
  )
}
