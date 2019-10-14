// pages/login/login.js
const app = getApp()
const req = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logo: '',
    show: false,
    accountValue: "",
    passwordValue: "",
  },
  /**
   * 自定义函数
   */
  onClose() {
    this.setData({
      show: false
    })
  },
  accountFun(e) {
    this.setData({
      accountValue: e.detail.value
    })
  },
  passwordFun(e) {
    this.setData({
      passwordValue: e.detail.value
    })
  },
  login() {
    wx.reLaunch({
      url: '../home/home',
    })
    // req.requestFun('post', '/api/post', { a: 1, b: 2 })
    // .then(res=>{
    //   console.log(res)
    //   wx.reLaunch({
    //     url: '../home/home',
    //   })
    // })
    // .catch(err=>{
    //   console.log(err)
    //   wx.reLaunch({
    //     url: '../home/home',
    //   })
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        logo: app.globalData.userInfo.avatarUrl,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          logo: app.globalData.userInfo.avatarUrl,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            logo: app.globalData.userInfo.avatarUrl,
            hasUserInfo: true
          })
        }
      })
    }
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

  },
  showPop() {
    this.setData({
      show: true
    })
  }
})