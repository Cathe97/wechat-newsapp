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

  },

  onLoad: function(options) {
    this.setTypeList()
    this.getTopnews(sortMap[0])
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

//请求并设置头条新闻的数据
  getTopnews(sth) {
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
          ${result[0].date.slice(11, 16)}`
        })
        this.setNewsList(result)
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
          ${result[i].date.slice(11, 16)}`
      })
    }
    this.setData({
      newsList:newsList
    })
  },

//点击其他类目的时候重新请求相应的头条以及新闻列表数据
  onTapType(event){
    let newsType=event.currentTarget.id
    this.getTopnews(newsType)
  }

//点击具体新闻进入详情页

})