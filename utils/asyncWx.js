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