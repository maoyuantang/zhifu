const fun = require('./util.js')
module.exports = {
  requestFun(method = 'post', url, data) {
    // const baseUrl =  "https://www.easy-mock.com/mock/5bd1845fd78eb6062635a8f7/yuan";
    const baseUrl = "http://shopapp.ysyo2o.com/shopApp/";
    return new Promise((resolve, reject) => {
      fun.showLoading('加载中...');
      wx.request({
        method,
        url: baseUrl + url, //仅为示例，并非真实的接口地址
        data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data)
          resolve(res)
          fun.hideLoading();
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        },
        fail(err) {
          // console.log(err)
          fun.hideLoading();
          reject(err)
        },
      })
    })
  }
}