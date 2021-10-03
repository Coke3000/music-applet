import config from "./config"
export default (url,data={},method="GET")=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url:config.host+url,
            data,
            method,
            header:{
                cookie:wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
            },
            success:(res)=>{
                //如果是登录请求则将cookies存入到本地
                if(data.isLogin){
                    wx.setStorageSync('cookies',res.cookies)
                }
                resolve(res.data)
            },
            fail:()=>{
                reject(error)
            }
          })
    })
}