// pages/search/search.js
import request from "../../utils/request"
let timer1=null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent:"",
        hotList:[],
        searchContent:"",
        searchList:[],
        historyList:[]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //默认搜索关键字接口
        this.getPlaceHolder()
        //获取热搜板数据
        this.getHotList()
        //获取搜索记录
        this.getSearchHistoryList()
    },
    //搜索框叉号
    handleClear(){
        this.setData({
            searchContent:"",
            searchList:[],
        })
    },
    //获取本地历史记录功能
    getSearchHistoryList(){
        let searchHistoryList=wx.getStorageSync('historyList')
        if(searchHistoryList){
            this.setData({
                historyList:searchHistoryList
            })
        }
    },
     //默认搜索关键字接口函数
    async getPlaceHolder(){
        let result =await request("/search/default")
        let placeholderContent=result.data.showKeyword
        this.setData({
            placeholderContent
        })
    },
    //获取热搜版数据函数
    async getHotList(){
        let result =await request("/search/hot/detail")
        console.log(result)
        this.setData({
            hotList:result.data
        })
    },
    //搜索框
    handleInputChange(event){
        let searchContent=event.detail.value;
        this.setData({
            searchContent
        })
        //开启防抖函数来获取搜索接口数据
        this.debounce(this.getSearchList,500)
        
    },
    //删除搜索记录
    handleDelete(){
        wx.showModal({
           content:"确定删除历史搜索记录吗？",
         success:(res)=>{
             if(res.confirm){
                 wx.removeStorageSync('historyList')
                 this.setData({
                     historyList:[]
                 })
             }
         }
           
        })
    },

    //防抖函数
    debounce(fn,delay){
        if(timer1){
          clearTimeout(timer1)
        } 
        timer1=setTimeout(() => {
           fn()
        }, delay);
    },
    //获取搜索接口数据
    async getSearchList(){
        if(!this.data.searchContent){
            this.setData({
                searchList:[]
            })
            return
        }
        let searchResult=await request("/search",{keywords:this.data.searchContent,limit:10})
        // console.log(searchResult)
            this.setData({
                searchList:searchResult.result.songs
            })
        //将历史搜索记录保存到localStorage
        this.data.historyList.unshift(this.data.searchContent)
        let historyArr=[...new Set(this.data.historyList)]
        this.setData({
            historyList:historyArr
        })
        wx.setStorageSync('historyList',historyArr)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})