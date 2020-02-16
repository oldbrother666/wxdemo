// comments/searchinput/searchinput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    search:'搜索'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      this.triggerEvent('myevent', e)
    }
  }
})
