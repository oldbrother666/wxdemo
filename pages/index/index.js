Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_list: '',  //轮播图
    classify:[], 
    floor:[]  //楼层总数据
  },
  dian: (e) => {
    console.log(e)
  },
  searchinput(e) {
    wx.navigateTo({
      url: '../search/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //轮播图
    wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
        success: (res) => {
          this.setData({
            swiper_list: res.data.message
          })
        }
      }),
      //分类
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
        success: (res) => {
          console.log(res)
          this.setData({
            classify: res.data.message
          })
        }
      }),
      // 盖楼
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
        success: (res) => {
          console.log(res)
          this.setData({
            floor: res.data.message
          })
        }
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