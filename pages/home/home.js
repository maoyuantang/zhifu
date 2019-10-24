// pages/home/home.js
const app = getApp()
const req = require('../../utils/request.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    accoutP: 666, //可兑换金额
    accoutS: 999.00, //可提现金额
    isSurplus: false, //兑换层
    isProp: false, //提现层
    xpur: "", //提现value
    xpro: "", //兑换value
    disabled: false,
    codeWord: '获取验证码',
    code:''
  },
  /**
   * 自定义函数
   */
  codeWatch(e){
    this.setData({
      code:e.detail.value
    })
  },
  btnGetCode() {
    //请求
    //如果成功
    var _this = this
    this.setData({
      disabled: true
    })
    var coden = 60 // 定义60秒的倒计时
    var codeV = setInterval(function() {
      _this.setData({ // _this这里的作用域不同了
        codeWord: '重新获取' + (--coden) + 's'
      })
      if (coden == -1) { // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
        clearInterval(codeV)
        _this.setData({
          codeWord: '获取验证码',
          disabled: false
        })
      }
    }, 1000) //  1000是1秒
  },
  dhFunYes() {
    //请求
    //如果成功
    var nums = this.data.accoutP - this.data.xpro
    if (nums >= 0) {
      this.setData({
        accoutP: this.data.accoutP - this.data.xpro
      })
      this.proratedFunClose()
    } else {
      console.log('积分不足')
    }
  },
  txFunYes() {
    console.log(this.data.xpur,this.data.code)
    //请求
    //如果成功
    var nums = this.data.accoutS - this.data.xpur
    if (nums >= 0) {
      this.setData({
        accoutS: this.data.accoutS - this.data.xpur
      })
      this.propFunClose()
    } else {
      console.log('余额不足')
    }
  },
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
      xpur: "",
      code:""
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
    // console.log(app.globalData)
    req.requestFun('post', 'selectShopAppHome', {
      shopId: app.globalData.shopId
    })
      .then(res => {
        console.log(res)
        // wx.reLaunch({
        //   url: '../home/home',
        // })
      })
      .catch(err => {
        console.log(err)
      })
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