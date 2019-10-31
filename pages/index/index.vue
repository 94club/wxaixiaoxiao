<template>
	<view class="content">
		<button open-type="getUserInfo" @getuserinfo="wechatLogin">获取用户信息</button>
		<button type="primary"  open-type="getUserInfo" @getuserinfo="wechatRegister1">微信注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
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
														// 微信登录成功
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
														// 微信登录成功
														uni.switchTab({
															url: '/pages/bindName/bindName?from=register'
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
			showSettingToast: function(e) {
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
