<template>
	<view>
		<uni-search-bar class="search-bar" :radius="100" @submit="submit" placeholder="搜索痕迹"/>
		<view v-for="(item, index) in bindUserList" :key="index" class="bind-item">
			{{item.nickName}}
			<view @tap="openBind(item)">去绑定</view>
		</view>
		<view v-if="bindShow" class="bind-nick">
			<uni-icon class="bind-nick-close" type="closeempty" size="24" @tap="closeBind"></uni-icon>
			<view class="bind-nick-form">
				<input class="uni-input" v-model="cpWechat" placeholder="请输入你的微信"/>
			</view>
			<view>
				PS: 1、微信只作为通知对方使用 2、绑定成功后，24小时对方未同意将重置双方状态
			</view>
			<view class="bind-nick-button">
				<button type="primary" @tap="bind">绑定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icons.vue'
	// 搜索出所有未绑定对象的帐号
	export default {
		data() {
			return {
				searchVal: '',
				cpWechat: '',
				bindShow: false,
				userId: '',
				bindUserList: []
			};
		},
		components:{
			uniIcon
		},
		onLoad () { // option为object类型，会序列化上个页面传递的参数
			this.getAllUser()
    },
		computed: {
			userInfo () {
				return this.$store.state.userInfo
			},
			token () {
				return this.$store.state.token
			}
		},
		methods: {
			closeBind () {
				this.cpWechat = ''
				this.bindShow = false
			},
			submit(res) {
			  this.searchVal = res.value
				if (this.searchVal) {
					// 模糊搜索  发送网络请求 置空数据
					
				} else {
					// 没有值先不管
				}
			},
			getAllUser () {
				uni.request({
					url: this.$constant.getAllUser,
					header: {
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						id: this.userInfo.id
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
							this.bindUserList = res.data.data
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
			},
			openBind (item) {
				this.userId = item.id
				this.bindShow = true
			},
			bind () {
				if (!this.cpWechat && !this.$constant.wxUserReg.test(this.cpWechat)) {
					uni.showToast({
						icon: 'none',
						title: '微信不能为空或输入错误'
					})
					return
				}
				uni.showLoading({
					title: '绑定中，请稍后'
				})
				uni.request({
					url: this.$constant.wechatRegisterName,
					method: 'POST',
					data: {
						cpName: this.userInfo.nickName,
						cpWechat: this.cpWechat,
						cpId: this.userInfo.id,
					  userId: this.userId
					},
					header: {
						'Authorization': 'Bearer ' + this.token
					},
					success: (res) => {
						uni.hideLoading()
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
								title: '请求成功',
								icon: 'none'
							})
							// 绑定成功
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
						uni.hideLoading()
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
	.bind-nick {
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: 300rpx;
		padding: 80rpx;
		border: 2rpx solid #000;
		&-close {
			position: absolute;
			right: 20rpx;
			top:20rpx;
		}
		&-form {
			border: 2rpx solid red;
			border-radius: 10rpx;
			padding: 4rpx;
			font-size: 24rpx;
		}
		&-button {
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;
			button {
				width: 220rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 24rpx;
			}
		}
	}
	.bind-item {
		border: 2upx solid red;
		padding: 4upx
	}
</style>
