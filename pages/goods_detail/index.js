// pages/goods_detail/index.js
import { request } from '../../request/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_data:'',   //页面总数据
    urls: []
  },

  // __点击图片放大____________________________________________________________________
  bigImage(e){
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: this.data.urls // 需要预览的图片http链接列表
    })
    // console.log(e.currentTarget.dataset.img)
  },
  // 拨打客服
  tel(){
    wx.makePhoneCall({
      phoneNumber: '111' //仅为示例，并非真实的电话号码
    })
  },
  // 加入购物车
  addBuy(){
    let cart = wx.getStorageSync('cart') || []
    // console.log(cart.length)
    let num = 0
    if (cart.length !== 0){
      // debugger
      cart.forEach((item, index) => {
        if (item.id == this.data.goods_data.cat_id) {
          console.log(index)
          item.num += 1
          num +=1
        }
      })
      console.log(num)
      if (num == 0) {
        cart.push({
          id: this.data.goods_data.cat_id,
          check: true,
          num: 1,
          price: this.data.goods_data.goods_price,
          image: this.data.goods_data.goods_big_logo,
          goods_name: this.data.goods_data.goods_name
        })
      }
      wx.setStorageSync('cart', cart)
      // console.log('上面')
    }else{
      cart.push({
        id: this.data.goods_data.cat_id,
        check: true,
        num: 1,
        price: this.data.goods_data.goods_price,
        image: this.data.goods_data.goods_big_logo,
        goods_name: this.data.goods_data.goods_name
      })
      console.log("下面")
      wx.setStorageSync('cart', cart)
    }
  },

  // _____________________________________________________________________________
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const goods_data = await request({
      url: '/goods/detail',
      data: {
        goods_id: options.goods_id
      }
    })
    // 设置发大的图片的数组
    const urls = goods_data.pics.map(item=>{
      return item.pics_big_url
    })
    console.log(goods_data)
    this.setData({
      goods_data, urls
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