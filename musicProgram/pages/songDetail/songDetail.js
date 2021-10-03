// pages/songDetail/songDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay:false,
        songInfo:{}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取由推荐页传来的歌曲信息
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptSongDetail', (data)=> {
            this.setData({
                songInfo:data
            })
          })
          //设置navtitle
          let title=this.data.songInfo.data.name
          wx.setNavigationBarTitle({
            title
          })


    },
//控制开始暂停音乐
    handleMusicPlay(){
        let isPlay=! this.data.isPlay
        this.setData({
            isPlay
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