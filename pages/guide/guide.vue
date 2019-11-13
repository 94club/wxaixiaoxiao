<template>
	<view>
		这是引导界面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.getuserInfo()
		},
		methods: {
			getuserInfo () {
				let token = uni.getStorageSync('token')
				uni.request({
					url: this.$constant.getUserInfo,
					header: {
							'Authorization': 'Bearer ' + token
					},
					success: (res) => {
						if (res.data.status === 401) {
							uni.redirectTo({
								url: '/login/index/index'
							})
							uni.showToast({
								icon: 'none',
								title: '登录信息失效，请重新登录'
							})
						}
						if (res.data.status === 200) {
							this.$store.commit('saveUserInfo', res.data.data)
							uni.switchTab({
								url: '/pages/tabbar/index'
							})
						}
						if (res.data.status === 0) {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							})
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络错误，请检查网络'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
