// pages/login/login.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:"",
        password:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      

    },

    /**
     * 登录操作
     */
    async login(){
    //    先判断电话号码是否为空
    if(!this.data.phone){
        wx.showToast({
          title: '手机号不能为空',
          icon:"error"
        })
        return;
    }
     // 再判断电话号码格式是否正确
    let phoneRegExp=/^1[3-9][0-9]{9}$/
    let result=phoneRegExp.test(this.data.phone)
    if(!result){
        wx.showToast({
            title: '手机号格式错误',
            icon:"error"
            })
    }
    //判断密码是否为空
    if(!this.data.password){
        wx.showToast({
            title: '密码不能为空',
            icon:"error"
          })
    }
    //向服务器发送数据
      let phone=this.data.phone
      let password=this.data.password
      let loginResult=await request("/login/cellphone",{phone,password})
    //   console.log(loginResult)
      //判读是否登录成功
      if(loginResult.code===200){
        wx.showToast({
            title: '登录成功',
            icon:"success"
          })
      //将数据保存到localStorage
      wx.setStorageSync("userInfo",JSON.stringify(loginResult.profile))
      //跳回到主页面
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
      }else{
        wx.showToast({
            title: '账号或密码错误',
            icon:"error"
          })
      }
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