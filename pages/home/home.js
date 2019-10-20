// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accoutP: 666, //可兑换金额
    accoutS: 999.00, //可提现金额
    isSurplus: false, //兑换层
    isProp: false, //提现层
    xpur: "", //提现placeholder
    xpro: "", //兑换placeholder
  },
  /**
   * 自定义函数
   */
  txWacth(e) {
    this.setData({
      xpur: e.detail.value
    })
  },
  dhWacth(e) {
    this.setData({
      xpro: e.detail.value
    })
  },
  tiXianAll() {
    this.setData({
      xpur: this.data.accoutS
    })
  },
  duiHuanAll() {
    this.setData({
      xpro: this.data.accoutP
    })
  },
  txFun() {
    wx.navigateTo({
      url: '../tiXianRecord/tiXianRecord',
    })
  },
  dhFun() {
    wx.navigateTo({
      url: '../duiHuanRecord/duiHuanRecord',
    })
  },
  propFun() { //提现开启
    this.setData({
      isProp: true,
      xpur: ""
    })
  },
  propFunClose() { //提现关闭
    this.setData({
      isProp: false
    })
  },
  proratedFun() { //兑换开启
    this.setData({
      isSurplus: true,
      xpro: ""
    })
  },
  proratedFunClose() { //兑换关闭
    this.setData({
      isSurplus: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})