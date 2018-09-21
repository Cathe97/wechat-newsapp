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

  getTopnews(sth) {
    //请求头条新闻的数据
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

  setTypeList(){
    let typeList=[]
    for(let i=0;i<7;i++){
      typeList.push({
        key:sortMap[i],
        value:sortChMap[i],
      })
    }
    this.setData({
      typeList:typeList
    })
  },

  setNewsList(result){
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
  }




})