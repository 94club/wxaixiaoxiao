<template>
	<view>
		这是引导界面
		<view class="dount"></view>
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
							this.$store.commit('saveToken', token)
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
.dount {
  width: 30px;
  height: 30px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-left-color: red;
  animation: dount-ani 1.2s linear infinite;
}

@keyframes dount-ani {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

</style>
