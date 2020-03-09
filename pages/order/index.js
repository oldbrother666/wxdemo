// pages/order/index.js
import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id:0,
        select:true,
        value:'全部'
      },
      {
        id: 1,
        select: false,
        value: '待付款'
      },
      {
        id: 2,
        select: false,
        value: '待发货'
      }
    ], //tab栏
    allList:'',  //全部的列表
    allList2:'',  //待付款
    allList3:''   //待发货
  },
  // 点击tab事件————————————————————————————————————————————————————————————————————————————
  async tabActive(e){
      // console.log(e)
    const id = e.detail
    let tab = this.data.tab
    tab.forEach((item,index)=>{
      if(item.id == id){
        tab[index].select = true
      }else{
        tab[index].select = false
      }
    })
    this.setData({
      tab
    })
    //判断如果id是代付款还是待发货
    const allList2 = this.data.allList2
    const allList3 = this.data.allList3
    if (!allList2){
      const token = wx.getStorageSync('token') || ''
      let { orders } = await request({
        url: '/my/orders/all',
        data: {
          type: 2
        },
        header: {
          Authorization: token
        }
      })
      let times
      let nian
      let yue
      let ri
      let shi
      let fen
      let miao
      orders.forEach((item, index) => {
        times = new Date(item.create_time * 1000)
        nian = times.getFullYear() + '/'
        yue = times.getMonth() + 1 + '/'
        ri = times.getDate() + ' '
        shi = times.getHours() + 1 + ':'
        fen = times.getMinutes() + ':'
        miao = times.getSeconds()
        orders[index].newtime = nian + yue + ri + shi + fen + miao
      })
      console.log(orders)
      this.setData({
        allList2: orders
      })
    }
    //待发货
    if (!allList3){
      const token = wx.getStorageSync('token') || ''
      let { orders } = await request({
        url: '/my/orders/all',
        data: {
          type: 3
        },
        header: {
          Authorization: token
        }
      })
      let times
      let nian
      let yue
      let ri
      let shi
      let fen
      let miao
      orders.forEach((item, index) => {
        times = new Date(item.create_time * 1000)
        nian = times.getFullYear() + '/'
        yue = times.getMonth() + 1 + '/'
        ri = times.getDate() + ' '
        shi = times.getHours() + 1 + ':'
        fen = times.getMinutes() + ':'
        miao = times.getSeconds()
        orders[index].newtime = nian + yue + ri + shi + fen + miao
      })
      console.log(orders)
      this.setData({
        allList3: orders
      })
    }
  },
  // 封装请求函数
  // -----------------------------------------------------------------------------------
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
  onShow:async function () {
    const token = wx.getStorageSync('token') || ''
    
    let {orders} = await request({
      url:'/my/orders/all',
      header:{
        Authorization:token
      }
    })
    let times
    let nian
    let yue
    let ri 
    let shi
    let fen
    let miao
    orders.forEach((item,index)=>{
      times = new Date(item.create_time * 1000)
      nian = times.getFullYear() + '/'
      yue = times.getMonth() + 1 + '/'
      ri = times.getDate() + ' '
      shi = times.getHours() + 1 + ':'
      fen = times.getMinutes() + ':'
      miao = times.getSeconds()
      console.log(nian + yue + ri + shi + fen + miao)
      orders[index].newtime = nian + yue + ri + shi + fen + miao
    })
    console.log(orders)
    this.setData({
      allList: orders
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