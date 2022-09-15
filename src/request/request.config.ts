import axios from 'axios'

axios.defaults.timeout = 30000
axios.defaults.baseURL = '/api'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = {
    'content-type': 'application/json',
  }

  return config;
}, function (error) {
  // 请求错误
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 请求对象中删除requestKey
  return response.data;
}, function (error) {
  // 响应错误
  return Promise.reject(error);
});

export default axios;
