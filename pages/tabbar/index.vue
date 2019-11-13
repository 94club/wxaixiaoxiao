<template>
	<view>
		<view class="task-top">
			<uni-search-bar class="search-bar" :radius="100" @submit="submit" placeholder="搜索痕迹"/>
			<uniSlidingMenu :activeIndex="activeIndex" @change="changeActiveIndex" />
		</view>
		<view v-if="shareBoxShow" class="share-box">
			<view class="content">快去分享小程序通知他/她吧;如已绑定，下拉刷新状态</view>
			<view class="btns">
				<button type="default" @tap="shareBoxShow = false">取消</button>
				<button open-type="share">去分享</button>
			</view>
		</view>
		<view class="task-content">
			<view class="task-statistic">
				<view class="task-statistic-left">{{activeIndex === 0 ? yuanList.length + '条心愿痕迹' : moodList.length + '条心情痕迹'}}</view>
				<view class="task-statistic-right" v-if="activeIndex === 0">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
				</view>
			</view>
			<view class="task-list" v-if="activeIndex === 0">
				<view class="task-list-item" v-for="(item, yuanIndex) in yuanList" :key="yuanIndex">
					{{item.id}}--
				</view>
			</view>
			<view class="task-list" v-if="activeIndex === 1">
				<view class="task-list-item"  v-for="(item, moodIndex) in moodList" :key="moodIndex">
					{{mood.id}}--
				</view>
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
				keyword: '',
				items: ['进行中','审核中','已完成'],
				current: 0,
				status: 0,
				activeIndex: 0,
				reason: 2, // 默认首页搜索  
				yuanList: [],
				moodList: [],
				shareBoxShow: false,
				pageSize: 20,
				pageNo: 1
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
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: '艾小小和风早早',
				// 要转发至路径
				path: '/pages/guide/guide'
			}
		},
	  onPullDownRefresh() {
			this.getUserInfo() // 刷新绑定信息
			this.getYuanList()
			setTimeout(function () {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onShow() {
			if (this.userInfo.isBind === 1) {
				uni.showModal({
					title: '提示',
					content: '去绑定对象获取更多体验;如已绑定，下拉刷新状态',
					confirmText: '去绑定',
					cancelText: '取消',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							uni.navigateTo({
								url: '/left/bindName/bindName'
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
											url: '/login/index/index'
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
											url: '/login/index/index'
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
				this.shareBoxShow = true
			}
			this.getYuanList()
		},
		onLoad () {
			// 获取正在进行中的心愿任务
		},
		onReachBottom () {
			this.pageNo++
			uni.showLoading({
				title: '加载'
			})
			setTimeout(() => {
				uni.hideLoading()
			}, 2000)
			this.getYuanList()
		},
		methods: {
			changeActiveIndex (activeIndex) {
				console.log(activeIndex )
				this.activeIndex = activeIndex
			},
			getYuanList () {
				if (this.current === 0) {
					this.status = 1
				}
				if (this.current === 1) {
					this.status = 2
				}
				if (this.current === 2) {
					this.status = 3
				}
				uni.request({
					url: this.$constant.getYuan,
					header: {
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						status: this.status,
						reason: this.reason,
						keyword: this.keyword,
						pageSize: this.pageSize,
						pageNo: this.pageNo
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
							if (this.pageNo > 1) {
								this.yuanList = this.yuanList.concat(res.data.data)
							} else {
								this.yuanList = res.data.data
							}
						}
						if (res.data.status === 0) {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							})
						}
					}
				})
			},
			getUserInfo () {
				uni.request({
					url: this.$constant.getUserInfo,
					header: {
						'Authorization': 'Bearer ' + this.token
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
							if (this.userInfo.isBind === 3) {
								this.shareBoxShow = false
							}
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
        this.keyword = res.value
				if (this.keyword) {
					// 发送网络请求 置空数据
					this.getYuanList()
				} else {
					// 没有值先不管
				}
      },
			onClickItem(index) {
				if (this.status !== index) {
					this.status = index
					this.getYuanList()
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
	.share-box {
		height: 400upx;
		width: 600upx;
		padding: 20upx;
		position: fixed;
		top: 200upx;
		left: 50%;
		transform: translateX(-50%);
		border: 2upx solid red;
		.content {
			text-align: center;
		}
		.btns {
			display: flex;
			button {
				font-size: 24upx;
				width: 200upx;
			}
		}
	}
</style>
