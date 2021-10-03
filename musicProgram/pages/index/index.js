// pages/index/index.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner:[],
        recommendMusic:[],
        hotArtists:[]
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
        let i=1;
        let toplist=[
            {title:"华语",hotArt:[]},
            {title:"欧美",hotArt:[]},
            {title:"韩国",hotArt:[]},
            {title:"日本",hotArt:[]},
        ]
        while(i<5){
            let artists=await request("/toplist/artist",{type:i});
            toplist[i-1].hotArt=artists.list.artists.slice(0,3);
            i++;
            // console.log(artists.list.artists.slice(0,3))
        }
        this.setData({
            hotArtists:toplist
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