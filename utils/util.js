module.exports = {
  getTime: getTime,
  returnFloat: returnFloat,
  showLoading: showLoading,
  hideLoading: hideLoading,
  checkC: checkC,
  onlyNum: onlyNum,
  // reloadFun: reloadFun
}

// 禁止中文 
function checkC(a) {
  if (!a || a == null || a == NaN || a == '') {
    return false
  } else {
    var noC = /[\u4E00-\u9FA5]/i.test(a)
    if (noC) {
      return false
    } else {
      return true
    }
  }
}

//只允许数字
function onlyNum(num) {
  if (!num || num == null || a == NaN) {
    return false
  } else {
    var a = /^[0-9]*$/i.test(num)
    if (a) {
      return true
    } else {
      return false
    }
  }

}

//获取时间方法
function getTime(timestamp) {
  if (timestamp) {
    var date = new Date(timestamp);
  } else {
    var date = new Date();
  }
  var Y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var H = date.getHours()
  var i = date.getMinutes()
  var s = date.getSeconds()
  var t = addZero(Y) + '-' + addZero(m) + '-' + addZero(d) + ' ' + addZero(H) + ':' + addZero(i) + ':' + addZero(s);
  return t;
}
const addZero = v => {
  v < 10 ? v = '0' + v : v = v
  return v;
}




// 重载
const reloadFun = () => {
  if (getCurrentPages().length != 0) {
    //刷新当前页面的数据
    getCurrentPages()[getCurrentPages().length - 1].onLoad()
  }
}

// 两位小数格式化
function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var s = value.toString().split(".");
  if (s.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}


//防止重复点击
function showLoading(message) {
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}

function hideLoading() {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}


// 发送 res.code 到后台换取 openId, sessionKey, unionId
// console.log(res.code);
// wx.request({
//   url: 'http://192.168.0.102:8021/shopApp/selectShopInfo',
//   data:{
//     jsCode: res.code
//   },
//   success:function(res){
//     console.log(res);
//   },
//   fail:function(err){
//     console.log(err);
//   }
// })