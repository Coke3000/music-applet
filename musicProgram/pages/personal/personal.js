import request from "../../utils/request"

// pages/personal/personal.js
let moveStart=0 //手指起始坐标
let moveEnd=0 //手指结束坐标
let moveDistance=0 //手指滑动距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform:"translateY(0)",
        coverTransition:"",
        userInfo:[],
        recentPlayList:[]

    },
   /**
    * 手指触碰处理事件
    */
   handleTouchStart(event){
    //每次开始时候都要将translation清空
    this.setData({
        coverTransition:""
    })
    moveStart=event.touches[0].clientY
    // console.log(moveStart)
   },
   handleTouchMove(event){
    moveEnd=event.touches[0].clientY;
    moveDistance=moveEnd-moveStart;
    if(moveDistance<=0){
        return
    }
    if(moveDistance>=80){
        moveDistance=80;
    }
    //当手指滑动的时候页面也滑动
    this.setData({
        coverTransform:`translateY(${moveDistance}rpx)`
    })
   },
   handleTouchEnd(){
       //当手指松开的时候自动弹回去
       this.setData({
           coverTransform:"translateY(0)",
           coverTransition:"transform 0.5s linear"
       })
   },

   //去登陆界面
   toLogin(){
       wx.navigateTo({
         url: '/pages/login/login',
       })
   },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //从localStorage中获取用户信息
        let userInfo=JSON.parse(wx.getStorageSync("userInfo")) 
        this.setData({
            userInfo
        })
        //获取最近播放记录
        this.getRecentData(userInfo.userId)
    },

    async getRecentData(userId){
        let result=await request("/user/record",{uid:userId,type:1})
        let recentPlayList=result.weekData.splice(0,10)
        console.log(result)
        this.setData({
            recentPlayList
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