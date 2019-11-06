<template>
	<view>
		<button type="primary" open-type="getUserInfo" @getuserinfo="wechatLogin">微信登录</button>
		<button type="primary" open-type="getUserInfo" @getuserinfo="wechatRegister">微信注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad: function() {
		},
		methods: {
			wechatLogin () {
				let that = this
				wx.getSetting({
					success (res){
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							// avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL56SiaYrgqicgoOpFQjtLhKb7BicCFP8W8prdPsJFuvKRkUWCwSzy3AnnRlFib72ic1Jyiapg3LmRxJLUA/132"
							// city: "Wuhan"
							// country: "China"
							// gender: 1
							// language: "zh_CN"
							// nickName: "alistar"
							// province: "Hubei"
							wx.getUserInfo({
								success: function(res) {
									console.log(res.userInfo)
								}
							})
							uni.login({
								success: (code) => {
									if (code.code) {
										uni.request({
												url: that.$constant.wechatLogin,
												method: "post",
												data: {
													code: code.code
												},
												success: (res) => {
													if (res.data && res.data.status === 200) {
														// 微信注册成功
														uni.switchTab({
															url: '/pages/tabbar/index'
														})
														that.$store.commit('saveUserInfo', res.data.data.userInfo)
														that.$store.commit('saveToken', res.data.data.token)
														uni.setStorage({
															key: 'token',
															data: res.data.data.token
														})
														uni.showToast({
															icon:'none',
															title: res.data.message
														})
													}
												},
												fail: () => {
													uni.showToast({
														title: '网络错误',
														icon: 'none'
													})
												}
											})
									} else {
										uni.hideLoading();
										uni.showToast({
											title: "网络异常，请重新请求",
											icon: "none"
										})
									}
								}
							});
						} else {
							// 点击了拒绝
							that.showSettingToast("授权信息才可以登录~")
						}
					}
				})
			},
			wechatRegister () {
				wx.getSetting({
					success: (res) => {
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							// avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL56SiaYrgqicgoOpFQjtLhKb7BicCFP8W8prdPsJFuvKRkUWCwSzy3AnnRlFib72ic1Jyiapg3LmRxJLUA/132"
							// city: "Wuhan"
							// country: "China"
							// gender: 1
							// language: "zh_CN"
							// nickName: "alistar"
							// province: "Hubei"
							let weInfo
							wx.getUserInfo({
								success: (res) => {
									weInfo = res.userInfo
									console.log(weInfo)
								}
							})
							uni.login({
								success: (code) => {
									if (code.code) {
										let token = uni.getStorageSync('token')
										uni.request({
											url: this.$constant.wechatRegister,
											method: 'POST',
											data: {code: code.code, nickName: weInfo.nickName, avatarUrl: weInfo.avatarUrl},
											success: (res) => {
												if (res.data.status === 401) {
													uni.redirectTo({
														url: '/pages/index/index'
													})
													uni.showToast({
														icon: 'none',
														title: '登录信息失效，请重新登录'
													})
												}
												if (res.data.status === 200) {
													uni.switchTab({
														url: '/pages/bindName/bindName?from=register'
													})
												}
												if (res.data.status === 0) {
													uni.showToast({
														icon: 'none',
														title: res.data.message
													})
												}
											}
										})
									} else {
										uni.hideLoading();
										uni.showToast({
											title: "网络异常，请重新请求",
											icon: "none"
										})
									}
								}
							});
						} else {
							// 点击了拒绝
							this.showSettingToast("授权信息才可以登录~")
						}
					}
				})
			},
			showSettingToast (e) {
				wx.showModal({
					title: '提示！',
					confirmText: '去设置',
					showCancel: false,
					content: e,
					success: function(res) {
						if (res.confirm) {
							wx.navigateTo({
								url: '../authSetting/authSetting',
							})
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
