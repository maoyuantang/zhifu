// pages/home/home.js
const app = getApp()
Page({





  /**
   * 页面的初始数据
   */
  data: {
    accoutP:666,
    accoutS:999.00,
    isSurplus: false,
    isProp: false,
    xpur:555,
    xpro:888,
  },
/**
   * 自定义函数
   */
  propFun(){//提现开启
    this.setData({
      isProp: true
    })
  }, 
  propFunClose() {//提现关闭
    this.setData({
      isProp: false
    })
  },
  proratedFun(){//兑换开启
    this.setData({
      isSurplus: true
    })
  },
  proratedFunClose() {//兑换关闭
    this.setData({
      isSurplus: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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