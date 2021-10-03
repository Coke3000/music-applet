// pages/video/video.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[],
        navId:0,
        video:[],
        videoId:'',
        isTriggered:true //是否开启下拉刷新获取更多

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取视频分类和对应视频
        this.getGroupListData()

    },
   async getGroupListData(){
        let result=await request("/video/group/list")
        let videoGroupList=result.data.splice(0,14)
        // console.log(result.data)
        this.setData({
            videoGroupList,
            navId:videoGroupList[0].id
        })
        //获取对应视频
       this.getVideoData(this.data.navId)

    },

    //获取视频函数
   async getVideoData(navId){
    let videoData=await request("/video/group",{id:navId})
    console.log(videoData)
    this.setData({
        video:videoData.datas,
        isTriggered:false //关闭下拉刷新
    })
    //关闭正在加载提示
    wx.hideLoading();
    },

     //点击切换导航的回调
  changeNav(event){
    let navId = event.currentTarget.id;//通过id向event事件传参，传的数字会转为string
    this.setData({
      navId: navId*1,
      video: []
    })

    //显示正在加载
    wx.showLoading({
      title: '正在加载',
    })
    //动态获取当前导航的动态数据
    this.getVideoData(this.data.navId);
  },

  //点击暂停/播放视频
  handlePlay(event){
/**
 * 在点击播放的事件中需要找到上一个播放的视频
 * 在播放的视频之前关闭上个视频
 * 关键：
 * 如何找到上一个 视频
 * 如何确认点击播放的视频和正在播放的视频不是同一个视频
 */
    let vid=event.currentTarget.id;
    //关闭上一个视频
    // this.vid !==vid &&this.videoContext&&this.videoContext.stop();
    // this.vid=vid;
    this.setData({
      videoId:vid
    })
    // this.videoContext=wx.createVideoContext(vid)
  },

  //下拉刷新获取更多
 async handleRefresher(){
     this.getVideoData(this.data.navId);
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
    onShareAppMessage: function ({from}) {
      return{
        title:"来自Coke的转发"
      }
    }
})