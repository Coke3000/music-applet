// pages/index/index.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner:[],
        recommendMusic:[],
        toplist:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //获取轮播图数据
        let result=await request("/banner",{type:2})
        // console.log(result)
        this.setData({
            banner:result.banners
        })
        //获取推荐歌曲数据
        let recommendResult=await request("/personalized",{limit:10})
        // console.log(recommendResult)
        this.setData({
            recommendMusic:recommendResult.result
        })
        //获取歌手榜单
        let i=0;
        let resultArr=[]
        while(i<5){
            let topListResult=await request("/top/list",{idx:i++});
            let topListItem={name:topListResult.playlist.name,track:topListResult.playlist.tracks.splice(0,3)}
            resultArr.push(topListItem)
        }
        this.setData({
            toplist:resultArr
        })
        

    },


    //跳转到每日推荐跳转
    goToRecommend(){
        wx.navigateTo({
          url: '/pages/recommendSong/recommendSong',
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