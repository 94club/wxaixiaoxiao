import uniFly from 'unifly'
import store from '../store'
import constant from './constant.js'
//基础路由
uniFly.baseUrl = 'https://xiaoai.jiaxiu.club/'
//设置请求头
//全局请求超时时间
uniFly.timeOut = 20000
//自定义请求拦截
uniFly.requestInterceptors.success = function(request) {
  console.log('自定义请求拦截')
  //配置基本信息
	let token = uni.getStorageSync('token')
	if(token) {
		uniFly.headers.headers['Authorization'] = 'Bearer ' + token
		request.headers = uniFly.headers
	}
  uni.showLoading()
  return request
}
uniFly.responseInterceptors.success = function(response) {
  console.log('自定义响应拦截')
  uni.hideLoading()
	if (response.data.status === 401) {
		uni.redirectTo({
			url: '/pages/index/index'
		});
		uni.showToast({
			icon: 'none',
			title: '登录信息失效，请重新登录'
		})
		return
	}
	if (response.data.status === 0) {
		uni.showToast({
			icon: 'none',
			title: response.data.message
		})
		return
	}
  return Promise.resolve(response.data)
}

//所有的接口请在此处统一定义
const $api = {
  //post方法测试
  postTest: function(data) {
    return uniFly.post({
      url: 'model',
      params: data
    })
  },
  //get方法测试
  getTest: function(data) {
    return uniFly.get({
      url: 'info/5ca854ca82de0949287feeed',
      params: data
    })
  },
	getUserInfo: function () {
		return uniFly.get({
			url: constant.getUserInfo
		})
	},
	wechatRegister: () => {
		return uniFly.post({
			url: constant.wechatRegister
		})
	}
}

export default $api
