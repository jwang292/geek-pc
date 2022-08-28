import { message } from 'antd'
import axios from 'axios'
import { getToken, removeToken } from './storage'
import history from './history'
export const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    //网络超时
    if (!error.response) {
      message.error('The Internet busy, please waiting')
      return Promise.reject('The Internet busy, please waiting')
    }
    // 对响应错误做点什么
    //token过期的统一处理
    // console.log(error.response)
    if (error.request.status === 401) {
      removeToken()
      message.warn('token is expired')
      //非组件中无法使用Redirect or history
      //用window 跳转所有数据要重新加载一遍
      // window.location.href = '/login'
      history.push('/login')
    }
    return Promise.reject(error)
  }
)
export default instance
