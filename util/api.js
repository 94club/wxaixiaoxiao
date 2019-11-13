import flyio from 'flyio'
flyio.config.timeout = 200000
flyio.config.baseURL = 'https://xiaoai.jiaxiu.club'

// 添加请求拦截器
flyio.interceptors.request.use(function (config) {
	debugger
	let token = uni.getStorageSync('token')
	uni.showLoading()
  if (token) {
    /*
      此处有坑，在此记录
      config.headers['Authorization']
      必须通过此种形式设置Authorization,否则后端即使收到字段也会出现问题，返回401
      - config.headers.Authorization或 config.headers.authorization可以设置成功，
      浏览器查看也没有任何问题，但是在后端会报401并且后端一律只能拿到小写的，
      也就是res.headers.authorization，后端用大写获取会报undefined
    */
    config.headers['Authorization'] = `Bearer ` + token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 拦截响应，遇到token不合法则报错
flyio.interceptors.response.use(
  response => {
		console.log('自定义响应拦截')
    return response
  },
  error => {
    return Promise.reject(error.message) // 返回接口返回的错误信息
  }
)

const ajaxMethod = ['get', 'post']
const Api = {}
ajaxMethod.forEach((method) => {
  Api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      flyio[method](uri, data, config).then((response) => {
        uni.hideLoading()
        if (response.data.status === 401) {
        	uni.redirectTo({
        		url: '/login/index/index'
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
				resolve(response.data.data)
      }).catch(function (error) {
        console.log(error)
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          // console.log(error.response.data)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        } else {
          // console.log(error)
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
        }
        // console.log(error.config)
      })
    })
  }
})

export default Api

