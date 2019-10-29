const app = getApp();
const req = require('../../utils/request.js')
const fun = require('../../utils/util.js')
// pages/duiHuanRecord/duiHuanRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    pageSize: '10',
    pageNum: 1,
    total: 0
  },
  // 自定义函数
  nextPage() {
    console.log(this.data.pageNum, Math.ceil((this.data.total) / 10))
    if (this.data.pageNum < Math.ceil((this.data.total) / 10)) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      req.requestFun('post', 'shopPointExchangeRecord', {
        shopId: app.globalData.shopId,
        pageSize: this.data.pageSize,
        pageNum: this.data.pageNum.toString()
      })
        .then(res => {
          console.log(res)
          if (res.data.code == '0000') {
            var list = res.data.data.list
            list.map((v, i) => {
              list[i].operatingTime = fun.getTime(v.operatingTime)
            })
            var abc = this.data.lists.concat(list)
            this.setData({
              lists: abc
            })
          } else {
            wx.showToast({
              title: '加载失败',
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
        title: '没有更多的内容了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lists: [],
      pageSize: '10',
      pageNum: 1,
      total: 0
    })
    req.requestFun('post', 'shopPointExchangeRecord', {
      shopId: app.globalData.shopId,
      pageSize: this.data.pageSize.toString(),
      pageNum: this.data.pageNum.toString(),
    })
      .then(res => {
        console.log(res)
        if (res.data.code == '0000') {
          var list = res.data.data.list
          list.map((v, i) => {
            list[i].operatingTime = fun.getTime(v.operatingTime)
            list[i].index = i + 1
          })
          this.setData({
            lists: list,
            total: res.data.data.total
          })
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          })
        }
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
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.nextPage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})