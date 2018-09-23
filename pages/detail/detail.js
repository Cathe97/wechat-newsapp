// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[],
    nowId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //获取该新闻的id并保存，以便于下拉刷新
    let nowId=option.id
    this.setData({
      nowId:nowId
    })
    this.getDetail(nowId)
  },

  //下拉刷新实现下拉刷新
  onPullDownRefresh(){
    this.getDetail(this.data.nowId,()=>{
      wx.stopPullDownRefresh()
    })
  },

  getDetail(id,callback){
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
      },
      complete:()=>{
        callback&&callback()
      }
    })
  }
})