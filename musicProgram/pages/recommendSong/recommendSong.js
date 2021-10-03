// pages/recommendSong/recommendSong.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year:"",
        month:"",
        day:"",
        recommendList:[]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            day:new Date().getDate()
        })
        //判断是否登录没有登录则跳转到登录界面
        let userInfo=wx.getStorageSync('userInfo')
        if(!userInfo){
            wx.showToast({
              title: '请先登录',
              icon:"error",
              success:()=>{
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
              }
            })
        }
        //获取推荐数据
        this.getRecommendData();

    },

    async getRecommendData(){
        let result=await request("/recommend/songs")
        this.setData({
            recommendList:result.recommend
        })
    },

    //点击跳转到歌曲播放页
    toSongDetail(event){
        let song=event.currentTarget.dataset.song
        wx.navigateTo({
          url: '/pages/songDetail/songDetail',
          success:(res)=>{
            res.eventChannel.emit('acceptSongDetail', { data: song })
          }
        })
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