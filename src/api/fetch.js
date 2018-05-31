import axios from 'axios'

const service = axios.create({
  //demo 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // baseURL: 'https://some-domain.com/api/', 
  // baseURL: 'process.env.BASE_API',  //api的base_url
  timeout: 90000,
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      //encodeURIComponent():函数可把字符串作为 URI 组件进行编码
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    // console.log("ret");
    // console.log(ret);
    return ret
  }]
})

//request拦截器,在请求之前需要处理的
service.interceptors.request.use(config => {

})

//request拦截器,在数据传输到then()/catch之前需要处理的
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      //可以设置弹窗
    }

    if (res.code === 5001 || res.code === 5002) {
      //和后台约定,状态码是做什么的,比如会话失效,window.location.href重定向到新的页面


     
    }
    return response.data
  },
  error => {
    let message = error.message;
    if (error.response.status == 500) {
      message = "请求异常";
    }
    if (error.response.status == 504) {
      message = "服务器异常";
    }
    if (error.response.status == 404) {
      message = "找不到服务内容";
    }

    //可以设置弹出message

    return Promise.reject(error);
  }
)

export default service;