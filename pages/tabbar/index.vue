<template>
	<view>
		<view class="task-top">
			<uni-search-bar class="search-bar" :radius="100" @submit="submit" placeholder="搜索痕迹"/>
			<uniSlidingMenu />
		</view>
		<view class="task-content">
			<view class="task-statistic">
				<view class="task-statistic-left">88条心愿在进行中</view>
				<view class="task-statistic-right">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
				</view>
			</view>
			<view class="task-list">
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
				<image src="https://placehold.it/375x80" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar.vue'
	import uniSlidingMenu from '../../components/haverster-slidingMenu/haversterSlidingMenu.vue'
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		data() {
			return {
				searchVal: '',
				items: ['进行中','审核中','已完成'],
				current: 0,
				yuanList: [],
				moodList: []
			}
		},
		computed: {
			userInfo () {
				return this.$store.state.userInfo
			},
			token () {
				return this.$store.state.token
			}
		},
		components: {
			uniSearchBar,
			uniSlidingMenu,
			uniSegmentedControl
		},
		 onPullDownRefresh() {
			this.getUserInfo()
			setTimeout(function () {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onShow() {
			if (this.userInfo.isBind === 1) {
				uni.showModal({
					title: '提示',
					content: '绑定对象获取更多体验;如已绑定，下拉刷新状态',
					confirmText: '去绑定',
					cancelText: '取消',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							uni.navigateTo({
								url: '/pages/bindName/bindName'
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			}
			if (this.userInfo.isBind === 2 && this.userInfo.cpName) {
				uni.showModal({
					title: '提示',
					content:  this.userInfo.cpName + '(微信号' + this.userInfo.cpWechat + ')' + '请求与你绑定',
					confirmText: '同意',
					cancelText: '不同意',
					success: (res) => {
						if (res.confirm) {
							// 绑定
							uni.request({
								url: this.$constant.finishBind,
								method: 'POST',
								header: {
									'Authorization': 'Bearer ' + this.token
								},
								data: {
									cpId: this.userInfo.cpId,
									userId: this.userInfo.id,
									nickName: this.userInfo.nickName
								},
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
										uni.showToast({
											icon: 'none',
											title: res.data.message
										})
										this.getUserInfo()
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
						} else if (res.cancel) {
							uni.showToast({
								icon: 'none',
								title: '双方将重置为空闲状态'
							})
							// 重置状态
							uni.request({
								url: this.$constant.resetBind,
								method: 'POST',
								header: {
									'Authorization': 'Bearer ' + this.token
								},
								data: {
									cpId: this.userInfo.cpId,
									userId: this.userInfo.id
								},
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
										uni.showToast({
											icon: 'none',
											title: res.data.message
										})
										this.getUserInfo()
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
				});
			}
			if (this.userInfo.isBind === 2 && !this.userInfo.cpName) {
				uni.showModal({
					title: '提示',
					content:  '快去分享小程序通知他/她吧;如已绑定，下拉刷新状态',
					confirmText: '分享',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							// 绑定
							uni.showToast({
								icon: 'none',
								title: '正在开发中...'
							})
						}
					}
				})
			}
		},
		onLoad () {
			// 获取正在进行中的心愿任务
		},
		methods: {
			getUserInfo () {
				uni.request({
					url: this.$constant.getUserInfo,
					header: {
							'Authorization': 'Bearer ' + this.token
					},
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
							this.$store.commit('saveUserInfo', res.data.data)
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
			},
			submit(res) {
        this.searchVal = res.value
				if (this.searchVal) {
					// 发送网络请求 置空数据
					
				} else {
					// 没有值先不管
				}
      },
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style lang="scss">
	.task-top {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		background: #fff;
	}
	.task-content {
		margin-top: 176rpx;
	}
	.task-statistic  {
		display: flex;
		align-items: center;
		height: 80rpx;
		&-left {
			width: 300rpx;
			font-size: 28rpx;
			text-align: center;
		}
		&-right {
			flex:1;
		}
	}
	image {
		width: 750rpx;
		height: 160rpx;
	}
</style>
