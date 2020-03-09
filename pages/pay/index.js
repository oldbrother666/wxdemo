// pages/pay/index.js
import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/asyncWx.js'
import {request} from '../../request/request.js'
import { payment, paySuccess} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: '', //总数据
    num: '', //总数量
    price: '', //总价格
    address:''  // 地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const goods_list = wx.getStorageSync('cart') || []
    const address = wx.getStorageSync('address') || ''
    let num = 0
    let price = 0
    goods_list.forEach(item => {
      num += item.num
      price += item.num * item.price
    })
    this.setData({
      goods_list,
      num,
      price,
      address
    })
    console.log(this.data.address)
  },

  //获取地址_____________________________________________________________________
  async address() {
    try {
      // 看一下有没有获取了位置
      let goods_list = await getSetting()
      // 判断如果没有权限就调用打开权限方法
      if (!goods_list.authSetting['scope.address']) {
       await openSetting()
      }
      console.log(1)
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      console.log(address)
      wx.setStorageSync('address', address)
      this.setData({
        address
      })
    } catch(e){
      console.log(e)
    }
  },
  // 点击更改地址
  changeAddress(){
    wx.chooseAddress({
      success:(res) =>{
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        }
    })
  },
  async pay(){
      const token = wx.getStorageSync('token') || ''  //token
      const goodsList = wx.getStorageSync('cart') || []   // 购物车数据
      let goods = []//最终的订单数据
      let obj2 = {}  //循环中不断更改的对象
      const consignee_addr = wx.getStorageSync('address').all || ''
      let order_price = 0 //订单总价格
      //遍历计算总价格
      goodsList.forEach(item => {
        if (item.check === true) {
          order_price += item.price * item.num
        }
      })
      // 如果没有token
      
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        })
      }
      console.log(consignee_addr)
    try {

      // 设置goods数组
      goodsList.forEach(item => {
        if (item.check === true) {
          obj2.goods_id = item.id
          obj2.goods_number = item.num
          obj2.goods_price = item.price
          goods.push(obj2)
        }
      })
      console.log(goods)
      // 创建订单
      const { order_number } = await request({
        url: '/my/orders/create',
        method: 'POST',
        data: {
          order_price, consignee_addr, goods
        },
        header: {
          Authorization: token
        }
      })
      // 获取支付参数
      const { pay } = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        data: {
          order_number
        },
        header: {
          Authorization: token
        }
      })
      // 调用小程序方法支付
      await payment(pay)
      // 查看是否支付成功
      const res = await request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        data: {
          order_number
        },
        header: {
          Authorization: token
        }
      })
      console.log(res)
      await paySuccess(res)
      let newCart = wx.getStorageSync('cart')
      newCart= newCart.filter(item=>{
        return item == !true
      })
      wx.setStorageSync('cart', newCart)
      wx.navigateTo({
        url: '/pages/order/index',
      })
    }catch(e){
      console.log(e)
      await paySuccess('支付失败')
    }
  },
  // -----------------------------------------------------------------------------------
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