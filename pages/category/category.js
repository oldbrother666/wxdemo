// pages/category/category.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listItem:[],  //总数据
    active:0     //点击更换active
  },
  ceshi:666,
  // 搜索框________________________________________________________________________
  searchinput(){
    wx.navigateTo({
      url: '../search/index'
    })
  },
  // 获取页面数据
  listitem: async function(){
    const listItem = await request({
      url:"/categories"
    })
    console.log(listItem)
    this.setData({
      listItem
    })
    wx.setStorageSync('listItem', {
      data:listItem,
      times:+new Date()
    })
    // console.log(this.data.listItem)
  },

  // 点击更换左边active
  handleActive(e){
    this.setData({
      active: e.currentTarget.dataset.id
    })
  },
  //______________________________________________________________________________
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
  // 加载数据函数
   
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const listItem = wx.getStorageSync("listItem")
    console.log(listItem)
    if (!listItem){
      this.listitem()
    } else if (+new Date() - +listItem.times > 1000*5){
      this.listitem()
    }else{
      this.setData({
        listItem: listItem.data
      })
    }
    // this.listitem()
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