// pages/home/home.js
const app = getApp()
const req = require('../../utils/request.js')
const fun = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据 
   */
  data: {
    accoutP: 0, //可兑换金额
    accoutS: 0, //可提现金额
    isSurplus: false, //兑换层
    isProp: false, //提现层
    xpur: 0, //提现value
    xpro: 0, //兑换value
    disabled: false,
    codeWord: '获取验证码',
    code: '',
    shopLogo: '',
    reClick: false
  },
  /**
   * 自定义函数
   */
  codeWatch(e) {
    this.setData({
      code: e.detail.value
    })
  },
  btnGetCode() {
    //请求
    req.requestFun('post', 'sendPhoneCode', {
      shopId: app.globalData.shopId
    })
      .then(res => {
        console.log(res)
        if (res.data.code == '0000') {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          var _this = this
          this.setData({
            disabled: true
          })
          var coden = 60 // 定义60秒的倒计时
          var codeV = setInterval(function () {
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
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  dhFunYes() {
    if (fun.onlyNum(this.data.xpro)) {
      //请求
      req.requestFun('post', 'pointExchange', {
        shopId: app.globalData.shopId,
        point: this.data.xpro
      })
        .then(res => {
          console.log(res)
          if (res.data.code == "0000") {
            wx.showToast({
              title: res.data.data,
              icon: 'none',
              duration: 2000
            })
            this.setData({
              accoutP: this.data.accoutP - this.data.xpro
            })
            this.proratedFunClose()
            // fun.reloadFun();
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      wx.showToast({
        title: '输入内容不正确',
        icon: 'none',
        duration: 2000
      })
    }

  },
  txFunYes() {
    if (fun.onlyNum(this.data.xpur) && fun.onlyNum(this.data.code) && this.data.code.length == 4) {
      // console.log(this.data.xpur, this.data.code)
      req.requestFun('post', 'shopAccountPresentation', {
        shopId: app.globalData.shopId,
        amount: (this.data.xpur) * 100,
        phoneCode: this.data.code
      })
        .then(res => {
          console.log(res)
          if (res.data.code == '0000') {
            this.setData({
              accoutS: this.data.accoutS - this.data.xpur
            })
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            this.propFunClose()
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      wx.showToast({
        title: '输入内容不正确',
        icon: 'none',
        duration: 2000
      })
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
    var that = this;
    // fun.noReClick(this)
    that.setData({
      reClick: true
    })
    setTimeout(function () {
      that.setData({
        reClick: false
      })
    }, 1000)
    wx.navigateTo({
      url: '../tiXianRecord/tiXianRecord',
    })
  },
  dhFun() {
    var that = this;
    fun.noReClick(this)
    // fun.showLoading('加载中...');
    wx.navigateTo({
      url: '../duiHuanRecord/duiHuanRecord',
      complete: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        this.setData({
          reClick:true
        })
      }
    })

  },
  propFun() { //提现开启
    this.setData({
      isProp: true,
      xpur: '',
      code: ''
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
      xpro: ''
    })
  },
  proratedFunClose() { //兑换关闭
    this.setData({
      isSurplus: false
    })
  },

  callBackApp() {
    var that = this;
    req.requestFun('post', 'selectShopAppHome', {
      shopId: app.globalData.shopId
    })
      .then(res => {
        console.log(res)
        app.globalData.shopLogo = res.data.data.shopLogo
        var money = res.data.data.tblShopAccountInfo.accountAvailableBalance
        money = fun.returnFloat(money)
        that.setData({
          accoutP: res.data.data.tblShopAccountInfo.leftIntegral,
          accoutS: money,
          shopLogo: app.globalData.shopLogo
        })

      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(1)
    var that = this;
    that.callBackApp();
    app.delayedCallback = res => {
      if (res) {
        that.onLoad();
        // console.log(11)
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('监听页面初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('监听页面显示')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('监听页面隐藏')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('监听页面卸载')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('监听用户下拉动作')

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