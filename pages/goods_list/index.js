// pages/goods_list/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist:[
      {
        id:0,
        value:'综合',
        select:true   //是否选中状态
      },
      {
        id: 1,
        value: '销量',
        select: false
      },
      {
        id: 2,
        value: '价格',
        select: false
      }
    ],
    goods:[],   //商品列表
    pagenum:1,  //第几页
    pagesize:8,  // 一页多少个
    cid:'',       //页面传进来的参数
    total:''      //总页数
  },
  //点击tab栏事件__________________________________________________________________
  handleActive(e){
    // console.log(e.detail)
    const id = e.detail
    let list = this.data.tablist
    list.forEach((v,i) =>{
      if(v.id===id){
        v.select = true
      }else{
        v.select = false
      }
    })
    this.setData({
      tablist:list
    })
  },

  //点击跳转搜索页面
  searchinput(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  // _______________________________________________________________________________________
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    console.log(options)
    this.setData({
      cid:options.cid
    })
    const goodslist = await request({
      url:"/goods/search",
      data:{
        cid: options.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    })
    this.setData({
      goods: goodslist.goods,
      total: goodslist.total
    })
    console.log(goodslist)
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
  onPullDownRefresh: async function (options) {
    const goods = await request({
      url: "/goods/search",
      data: {
        cid:this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    })
    this.setData({
      total:goods.total,
      goods:goods.goods
    })
    console.log(goods)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function (options) {
    let pagenum = this.data.pagenum
    if (this.data.total <= pagenum++ * this.data.pagesize - this.data.pagesize){
      wx.showLoading({
        title: '没有了，亲'
      })
      setTimeout(()=>{
        wx.hideLoading({})
      },1000)
      return
    }
    const goods = await request({
      url: "/goods/search",
      data: {
        cid: this.data.cid,
        pagenum: pagenum,
        pagesize: this.data.pagesize
      }
    })
    console.log(goods.goods)
    let all = this.data.goods
    goods.goods.forEach((item,index)=>{
      all.push(item)
    })
    this.setData({
      goods:all
    })
    console.log(this.data.goods)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})