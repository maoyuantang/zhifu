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
    isCode:false,
    loginCode:'',
    codeWord:'获取验证码',
    code:'',
    disabled:false,
    yesCode:true
  },
  /**
   * 自定义函数
   */
  codeNum(e){
    if(e.detail.value.length==6){
      this.setData({
        yesCode: false,
        code: e.detail.value
      })
    }else{
      this.setData({
        yesCode: true
      })
    }
    
  },
  getCode(){
    //发请求
    var _this = this
    // if (json.code == 200) {
    if (true) {
      this.setData({
        disabled:true
      })
      var coden = 60    // 定义60秒的倒计时
      var codeV = setInterval(function () {
        _this.setData({    // _this这里的作用域不同了
          codeWord: '重新获取' + (--coden) + 's'
        })
        if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
          clearInterval(codeV)
          _this.setData({
            codeWord: '获取验证码',
            disabled: false
          })
        }
      }, 1000)  //  1000是1秒
    }
  },
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
  isCodeClose(){
    this.setData({
      isCode:false
    })
  },
  login(){
    console.log(this.data.accountValue,this.data.passwordValue)
    //请求
    if(true){
      this.setData({
        isCode: true,
        yesCode: true,
        disabled: false,
        code: ""
      })
    }
  },
  loginYes() {
    console.log(this.data.code)
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