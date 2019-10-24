module.exports={
  requestFun(method='post',url,data){
    // const baseUrl =  "https://www.easy-mock.com/mock/5bd1845fd78eb6062635a8f7/yuan";
    const baseUrl = "http://192.168.0.102:8021/shopApp/";
    return new Promise((resolve,reject)=>{
      wx.request({
        method,
        url: baseUrl + url, //仅为示例，并非真实的接口地址
        data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data)
          resolve(res)
        },
        fail(err) {
          // console.log(err)
          reject(err)
        },
      })
    })
  }
}