// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.getDetail(option.id)
  },

  getDetail(id){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id: id
      },
      success:res=>{
        let result=res.data.result.content
        let info=res.data.result
        let detailList=[]
        for(let i=0;i<result.length;i++){
          detailList.push({
            type:result[i].type,
            content:(result[i].type=='image')?result[i].src:result[i].text,
          })
        }
        this.setData({
          detailList:detailList,
          title:info.title,
          info: `${info.source} 
          ${info.date.slice(11, 16)}`,
          readCount:info.readCount
        })
      }
    })
  }
})