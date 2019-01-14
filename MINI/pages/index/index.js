// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "Bob",
    userInfo:{},
    isShow: true
  },

  handleClick(){
    wx.switchTab({
      url: '/pages/list/list'
    })
  },

  handleGetUserInfo(data) {
    console.log(data)
    if (data.detail.rawData) {
      this.getUserInfo();
    }
  },

  getUserInfo() {
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            isShow: false
          })
          console.log("已授权")
        } else {
          this.setData({
            isShow: true
          })
          console.log("未授权")
        }
      }
    })
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log("用户未授权")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getUserInfo();
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