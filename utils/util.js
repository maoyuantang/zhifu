module.exports = {
  getTime: getTime,
  returnFloat:returnFloat,
  // reloadFun: reloadFun
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