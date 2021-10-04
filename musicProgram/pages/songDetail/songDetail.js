// pages/songDetail/songDetail.js
import request from "../../utils/request"
import PubSub from "pubsub-js"
import moment from "moment"
let appInstance = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay:false,
        songInfo:{},
        musicLink:"",
        currentTime:"00:00",
        durationTime:"00:00",
        currentWidth:0//进度条
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //获取由推荐页传来的歌曲信息
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptSongDetail', (data)=> {
            //格式话时间
            let durationTime=moment(data.data.duration).format("mm:ss")
            // console.log(data)
            this.setData({
                songInfo:data.data,
                durationTime
            })
          })
          //设置navtitle
          let title=this.data.songInfo.name
          wx.setNavigationBarTitle({
            title
          })
          //判断当前页面是否在播放.如果是则修改isplay状态为true
          if(appInstance.globalData.isMusicPlay&&appInstance.globalData.musicId==this.data.songInfo.id){
              this.setData({
                  isPlay:true
              })
          }

           //创建背景音乐播放对象
        this.getBackgroundAudioManager=wx.getBackgroundAudioManager()
        //监听手机系统后台背景音乐的播放/暂停/停止
        this.getBackgroundAudioManager.onPlay(()=>{
          this.changePlayState(true)
          appInstance.globalData.musicId=this.data.songInfo.id
        })
        this.getBackgroundAudioManager.onPause(()=>{
            this.changePlayState(false)
        })
        this.getBackgroundAudioManager.onStop(()=>{
           this.changePlayState(false)
        })
        //监听播放时间实时变化
        this.getBackgroundAudioManager.onTimeUpdate(()=>{
            let currentTime=moment(this.getBackgroundAudioManager.currentTime*1000).format("mm:ss")
            let currentWidth=this.getBackgroundAudioManager.currentTime/this.getBackgroundAudioManager.duration*450
            this.setData({
                currentTime,
                currentWidth
            })
        })
       // 监听播放结束自动跳到下一首歌曲
        this.getBackgroundAudioManager.onEnded(()=>{
            PubSub.publish("switchMusic","next")
            //将播放时间和进度条清零
            this.setData({
                currentTime:"00:00",
                currentWidth:0,//进度条
            })
        })
       
    },
    changePlayState(isPlay) {
        this.setData({
            isPlay
        })
        appInstance.globalData.isMusicPlay=isPlay
    },
//控制开始暂停音乐
    handleMusicPlay(){
        let isPlay=! this.data.isPlay
        this.musicControll(isPlay,this.data.songInfo.id,this.data.musicLink)
    },
    //播放和暂停音乐的操作
    async musicControll(isPlay,musicId,musicLink){
        if(isPlay){  //如果是播放则去获取相应音频
            if(!musicLink){
                let musicRes=await request("/song/url",{id:musicId})
                console.log(musicRes)
                musicLink=musicRes.data[0].url;
                this.setData({
                    musicLink
                })
            }
            this.getBackgroundAudioManager.src=musicLink;
            this.getBackgroundAudioManager.title=this.data.songInfo.name
        }else{
            //关闭 音乐
            this.getBackgroundAudioManager.pause();
        }
    },

    //上一首和下一首
    handleSwitch(event){
        // 将当前音乐先关闭
        this.getBackgroundAudioManager.pause();
        let type=event.currentTarget.id;
        PubSub.subscribe("musicInfo",(msg,musicInfo)=>{
            //获取歌曲信息
            this.setData({
                songInfo:musicInfo
            })
            //自动播放
            this.musicControll(true,this.data.songInfo.id)
             //设置navtitle
            let title=this.data.songInfo.name
            wx.setNavigationBarTitle({
                  title
              })
            //设置歌曲总长度
            let durationTime=moment(this.data.songInfo.duration).format("mm:ss")
            this.setData({
                durationTime
            })
             //取消订阅
            PubSub.unsubscribe('musicInfo');
        })
        //将type传给推荐歌曲页面
        PubSub.publish("switchMusic",type)

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