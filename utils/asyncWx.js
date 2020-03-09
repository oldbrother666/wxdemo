export const showModal = (params) => {
  return new Promise(function (resolve, reject) {
    wx.showModal({
      content: params.content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
//看一下有没有地址
export const getSetting = (params) =>{
  return new Promise(function (resolve, reject){
    wx.getSetting({
      success:(res)=>{
        resolve(res);
      },
      fail:(err) =>{
        reject(err)
      }
    })
  })
}

//更改微信获取地址权限
export const openSetting = (params) => {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
//打开微信收货地址
export const chooseAddress = (params) => {
  return new Promise(function (resolve, reject) {
    wx.chooseAddress({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
// 获取code
export const login = (params) => {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
// 订单
export const payment = (params) => {
  return new Promise(function (resolve, reject) {
    wx.requestPayment({
      ...params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
// 支付成功与否的提示
export const paySuccess = (params) => {
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title:params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}