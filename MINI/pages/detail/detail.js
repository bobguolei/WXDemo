// pages/detail/detail.js
let datas = require('../../datas/list-data');
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index:null,
    isCollected:false,
    isMusicPlay:false,
  },


  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });

    let title = isCollected ? "收藏成功":"取消收藏";
    wx.showToast({
      title,
      icon: 'success'
    })
    let {index} = this.data;
    
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        let obj =datas.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log("缓存成功")
          }
        })
      },
    })
  },

  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay;
    let { dataUrl, title} = this.data.detailObj.music;
    if (isMusicPlay) { // 音乐播放
      wx.playBackgroundAudio({
        dataUrl,
        title
      });

    } else { // 音乐暂停
      wx.pauseBackgroundAudio()
    }
  },

  handleShare() {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到QQ空间',
        '分享到微博'
      ],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      detailObj: datas.list_data[options.index], 
      index: options.index 
    });

    let detailStorage = wx.getStorageSync("isCollected");

    if (!detailStorage) {
      wx.setStorageSync("isCollected", {})
    }

    if (detailStorage[options.index]) {
      this.setData({
        isCollected: true
      })
    }

    if (appData.data.isPlay && appData.data.pageIndex === options.index) {
      this.setData({
        isMusicPlay: true
      })
    }

    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isMusicPlay: true
      })
      appData.data.isPlay = true;
      appData.data.pageIndex = options.index;
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        isMusicPlay: false
      })
      appData.data.isPlay = false;
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