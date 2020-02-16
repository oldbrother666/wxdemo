// pages/cart/index.js
import {
  showModal
} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartlist: '', //本地存储数据
    num: '', //判断是否为多选
    price: '', //合计价格
    allnum: '' //总件数
  },
  // 单选——————————————————————————————————————————————————————————————————————————————————
  check_one(e) {
    // console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    const cartlist = wx.getStorageSync('cart')
    let num = this.data.num
    let allnum = this.data.allnum
    let price = this.data.price
    console.log(allnum)
    cartlist.forEach((item, index) => {
      //判断单选和全选
      if (item.id == id) {
        cartlist[index].check = !cartlist[index].check
        // console.log(cartlist[index].check)
        if (cartlist[index].check == true) {
          num = num + 1
        } else if (!cartlist[index].check == true) {
          num = num - 1
        }
      }
      //判断是否应该加上商品数和价格
      if (item.id == id && item.check === true) {
        allnum += item.num
      } else if (item.id == id && item.check === false) {
        allnum -= item.num
      }
      //计算价格
      if (item.id == id && item.check === true) {
        price += item.num * item.price
      } else if (item.id == id && item.check === false) {
        price -= item.num * item.price
      }
    })
    // console.log(cartlist)
    // console.log(num)
    this.setData({
      cartlist,
      num,
      allnum,
      price
    })
    wx.setStorageSync('cart', cartlist)
  },

  //多选
  check_all() {
    let num = this.data.num
    let price = this.data.price
    let allnum = this.data.allnum
    if (this.data.num !== this.data.cartlist.length) {
      let cartlist = this.data.cartlist
      cartlist.forEach(item => {
        if (item.check != true) {
          item.check = !item.check
          num += 1
          allnum += item.num
          price += item.num * item.price
        }
      })
      // console.log(num)
      // console.log(cartlist)
      this.setData({
        cartlist,
        num,
        price,
        allnum
      })
      wx.setStorageSync('cart', cartlist)
    } else {
      let cartlist = this.data.cartlist
      cartlist.forEach(item => {
        item.check = !item.check
        num -= 1
      })
      price = 0
      this.setData({
        cartlist,
        num,
        price,
        allnum: 0
      })
      wx.setStorageSync('cart', cartlist)
    }
  },
  // 加数量 
  addnum(e) {
    const cartlist = this.data.cartlist
    let allnum = this.data.allnum
    let price = this.data.price
    cartlist.forEach((item, index) => {
      if (item.id == e.currentTarget.dataset.add) {
        cartlist[index].num += 1
        if (item.check == true) {
          allnum += 1
          price += item.price
        }
      }
    })
    this.setData({
      cartlist,
      allnum, price
    })
    wx.setStorageSync('cart', cartlist)
  },
  // 减数量
  delnum(e) {
    let cartlist = this.data.cartlist
    let allnum = this.data.allnum
    let price = this.data.price
    // 根据id循环查找当前商品
    cartlist.forEach(async(item, index) => {
      // 查找出id进入下一个判断
      if (item.id == e.currentTarget.dataset.del) {
        // 如果商品数量为1进入下一个判断
        if (item.num == 1) {
          // 引入小程序的弹出窗口是否删除api
          const res = await showModal({
            content: '您确定要删除商品吗'
          })
          console.log(res)
          if (res.confirm) {
            if (item.check === true) {
              allnum -= item.num
              price -= item.price
            }
            cartlist.splice(index, 1)
            this.setData({
              cartlist,
              allnum,
              price
            })
          }
          wx.setStorageSync('cart', cartlist)
          console.log(this.data.cartlist)
        } else {
          // 如果商品数量不为1
          item.num -= 1
          if (item.check === true) {
            allnum -= 1
            price -= item.price
          }
          this.setData({
            cartlist,
            allnum,
            price
          })
          wx.setStorageSync('cart', cartlist)
        }
      }
    })

    console.log(cartlist)
  },
  // _____________________________________________________________________________
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
    const cartlist = wx.getStorageSync('cart')
    let num = 0 //判定是否多选
    let price = 0 //合计
    let allnum = 0 //商品总件数
    cartlist.forEach((item) => {
      if (item.check === true) {
        num += 1
        price += item.price * item.num
        allnum += item.num
      }
    })
    this.setData({
      cartlist,
      num,
      price,
      allnum
    })
    console.log(this.data.cartlist)
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