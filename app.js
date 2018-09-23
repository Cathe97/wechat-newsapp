//获取系统状态栏高度
App({
  globalData:{
    navHeight:0,
    statusBarH:0
  },
  onLaunch(){
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        this.statusBarH=res.statusBarHeight*750/res.windowWidth
        this.globalData.navHeight = this.statusBarH + 90;
        
      },
    })
  }
})

