// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',  //双向绑定搜索内容
    searchList:[]  //搜索内容

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


// ————————————————————————————————————————————————————————————————————
  // 双向绑定搜索内容
  handletext(e){
    // console.log(e.detail.value)
    this.setData({
      searchText: e.detail.value
    })
    // console.log(this.data.searchText)
  },

  // 点击搜索
  search(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/goods/qsearch',
      data:{
        query:this.data.searchText
      },
      success: (res) => {
        console.log(res)
        this.setData({
          searchList: res.data.message
        })
        console.log(this.data.searchList)
      }
    })
  },
// ————————————————————————————————————————————————————————————————————————



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