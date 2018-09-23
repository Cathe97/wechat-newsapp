// pages/index/index.js
const sortMap=['gn','gj','cj','yl','js','ty','other']

const sortChMap=["国内","国际","财经","娱乐","军事","体育","其他"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList:[],
    typeList:[],
    nowType:'gn'
  },

  onLoad: function(options) {
    this.setTypeList()
    this.getTopnews(sortMap[0])
  },

  //下拉刷新
  onPullDownRefresh(){
    this.getTopnews(this.data.nowType,()=>{
      wx.stopPullDownRefresh()
    })
  },

//设置新闻类名列表
  setTypeList() {
    let typeList = []
    for (let i = 0; i < 7; i++) {
      typeList.push({
        key: sortMap[i],
        value: sortChMap[i],
      })
    }
    this.setData({
      typeList: typeList
    })
  },

//请求并设置头条新闻以及新闻列表的数据
  getTopnews(sth,callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: sth
      },
      success: res => {
        let result = res.data.result
        let topnewsTitle = result[0].title
        let topnewsImg = result[0].firstImage
        this.setData({
          topnewsImg: topnewsImg,
          topnewsTitle: topnewsTitle,
          topnewsInfo: `${result[0].source} 
          ${result[0].date.slice(11, 16)}`,
          topnewsId:result[0].id
        })
        this.setNewsList(result)
      },
      complete:()=>{
        callback&&callback()
      },
    })
  },

//设置新闻列表数据
  setNewsList(result){
    //渲染新闻列表
    let newsList=[]
    for(let i=1;i<result.length;i++){
      newsList.push({
        title:result[i].title,
        imagePath:result[i].firstImage,
        info: `${result[i].source} 
          ${result[i].date.slice(11, 16)}`,
        id:result[i].id
      })
    }
    this.setData({
      newsList:newsList
    })
  },

//点击其他类目的时候重新请求相应的头条以及新闻列表数据同时改变样式
  onTapType(event){
    let newsType=event.currentTarget.id
    this.getTopnews(newsType)
    this.setData({
      nowType:newsType
    })
  },

//点击具体新闻进入详情页
  onTapDetail(event){
    let deatilId=event.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+deatilId,
    })
  }
})