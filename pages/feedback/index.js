// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [], //图片的数组
    imgNum: '', //有多少张图片
    num: 0 //上传时候动态更新加载到第几张图片
  },
  // 上传-------------------------------------------------------------------------
  handleUpload(e) {
    wx.chooseImage({
      count: 7,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        this.setData({
          imgList: [...res.tempFilePaths, ...this.data.imgList],
          imgNum: [...res.tempFilePaths, ...this.data.imgList].length
        })
      }
    })
  },
  // 点击清除当前图片
  clearImg(e) {
    // console.log(e.target.dataset.index)
    let imgList = this.data.imgList
    this.data.imgList.splice(e.target.dataset.index, 1)
    this.setData({
      imgList,
      imgNum:this.data.imgNum -1
    })
  },
  // 提交
  submit() {
    // 判断没有图片的话弹出提示
    if (!this.data.imgNum) {
      wx.showToast({
        title: '请添加图片',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    // 设置加载遮罩
    wx.showLoading({
      title: '图片上传中',
      mask: true
    })
    if (this.data.imgNum) {
      this.data.imgList.forEach((item, index) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/', //仅为示例，非真实的接口地址
          filePath: item,
          name: 'file',
          formData: {},
          success: (res) => {
            // const data = res.data
            console.log(index)
            if (index < this.data.imgList.length-1) {
              this.setData({
                num: index + 1
              })
            }else{
              wx.hideLoading()
              this.setData({
                num: index + 1
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      })
    }
  },
  // _______________________________________________________________________
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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