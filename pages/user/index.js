// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  // 打电话——————————————————————————————————————————————————————————————————————————
  getUser(e){
    // console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo
    })
    wx.setStorageSync('userInfo',e.detail.userInfo)
  },
  tel(){
    wx.makePhoneCall({
      phoneNumber: '00-00-00-00' //仅为示例，并非真实的电话号码
    })
  },
  // ___________________________________________________________________________________
  data: {
    userInfo:''
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
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
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