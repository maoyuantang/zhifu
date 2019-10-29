const app = getApp();
const req = require('../../utils/request.js')
const fun = require('../../utils/util.js')
// pages/tiXianRecord/tiXianRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        index:0,
        time:2019,
        amount:888.88,
        over:5.00
      },
      {
        index: 0,
        time: 2019,
        amount: 888.88,
        over: 5.00
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    req.requestFun('post', 'shopPresentationRecord', {
      shopId: app.globalData.shopId
    })
      .then(res => {
        console.log(res)
        var list = res.data.data.list
        list.map((v, i) => {
          list[i].operatingTime = fun.getTime(v.operatingTime)
        })
        this.setData({
          list: res.data.data.list
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})