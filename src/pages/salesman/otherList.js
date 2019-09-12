$(function() {
  judgeSearchPrice()
})

var ckdm = '' // 仓库代码
function judgeSearchPrice() {
  var url = requestPath + '/m/resource/factoryList.htm'
  $.ajaxjsonp(
    url,
    {},
    function(res) {
      var data = res.data
      if (data.length) {
        $('#priceList').show()
        var arr = []
        data.forEach(function(v) {
          arr.push(v.factoryId)
        })
        ckdm = arr.join(',')
      }
      console.log(ckdm)
    },
    true
  )
}
// 冻结订单查询
function goFreezeOrderList() {
  openPage('冻结订单查询', '../salesman/freezeOrderList.html', '1')
}
function goStorageCharge() {
  openPage('仓储费管理', '../salesman/storageCharge.html', '1')
}
function goPriceList() {
  openPage(
    '产品价格查询',
    '../salesman/priceList.html?pm=DTY&ckdm=' + ckdm,
    '1'
  )
}
