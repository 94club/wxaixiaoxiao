<template>
	<view class="content">
		<custom-header right-icon="plusempty" @clickRight="showYuanBox" :title="title" class="header-fixed" :shadow="false"></custom-header>
		<view class="add-yuan mt88" v-show="addShow">
		  <form @submit="submitYuan">
				<view class="form-item">
					<view class="form-item-left">执行人</view>
					<view class="form-item-right">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
								<view><radio :value="item.value" :checked="index === current" /></view>
								<view>{{ item.text }}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="form-item">
					<view class="form-item-left">奖励愿币</view>
					<view class="form-item-right">
						<input class="uni-input" v-model="amount" type="number" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-item-left">心愿描述</view>
					<view class="form-item-right">
						<textarea @blur="bindTextAreaBlur" auto-height />
					</view>
				</view>
				<button type="primary" form-type="submit">添加</button>
			</form>
		</view>
		<view class="task-list mt88">
			<view class="task-list-item" v-for="(item, yuanIndex) in yuanList" :key="yuanIndex">{{ item.id }}--</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '心愿',
			addShow: false,
			yuanList: [],
			pageSize: 20,
			pageNo: 1,
			reason: 3, // 自己搜索
			type: 4,
			current: 0,
			amount: '',
			des: '',
			createdBy: '',
			operationFlag: 1, // 1 刚进来 或者下拉刷新 或者新增   2 上拉加载
			items: [
				{
					text: '对方',
					value: 3
				},
				{
					text: '双方',
					value: 2
				}
			]
		};
	},
	onPullDownRefresh() {
		this.operationFlag = 1
		this.getUserInfo() // 刷新绑定信息
		this.getYuanList()
		setTimeout(function () {
			uni.stopPullDownRefresh()
		}, 1000)
	},
	onReachBottom () {
		this.pageNo++
		this.operationFlag = 2
		uni.showLoading({
			title: '加载'
		})
		setTimeout(() => {
			uni.hideLoading()
		}, 2000)
		this.getYuanList()
	},
	onShow() {
		// 获取自己的心愿
		if (this.userInfo.isBind === 3) {
			this.operationFlag = 1
			this.getYuanList();
		}
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		},
		token() {
			return this.$store.state.token;
		}
	},
	methods: {
		bindTextAreaBlur (e) {
			this.des = e.detail.value
		},
		showYuanBox () {
			if (this.userInfo.isBind !== 3) {
				uni.showModal({
					title: '提示',
					content: '您还未绑定对象，请先去绑定',
					confirmText: '去绑定',
					cancelText: '取消',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/bindName/bindName'
							})
						} else if (res.cancel) {
						}
					}
				});
			} else {
				this.addShow = true
			}
		},
		radioChange (evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		submitYuan () {
			// 表单校验
			if (!this.amount) {}
			uni.request({
				url: this.$constant.addYuan,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + this.token
				},
				data: {
					type: this.items[this.current].value,
					amount: this.amount,
					des: this.des,
					createdBy: this.userInfo.nickName
				},
				success: res => {
					if (res.data.status === 401) {
						uni.redirectTo({
							url: '/login/index/index'
						});
						uni.showToast({
							icon: 'none',
							title: '登录信息失效，请重新登录'
						});
					}
					if (res.data.status === 200) {
						this.yuanList = []
						this.addShow = false
						uni.showToast({
							icon: 'none',
							title: '添加成功'
						})
						this.getYuanList()
					}
					if (res.data.status === 0) {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				}
			})
		},
		onReachBottom() {
			this.pageNo++;
			uni.showLoading({});
			setTimeout(() => {
				uni.hideLoading();
			}, 2000);
			this.getYuanList();
		},
		getYuanList() {
			uni.request({
				url: this.$constant.getYuan,
				header: {
					Authorization: 'Bearer ' + this.token
				},
				data: {
					reason: this.reason,
					pageSize: this.pageSize,
					pageNo: this.pageNo
				},
				success: res => {
					if (res.data.status === 401) {
						uni.redirectTo({
							url: '/login/index/index'
						});
						uni.showToast({
							icon: 'none',
							title: '登录信息失效，请重新登录'
						});
					}
					if (res.data.status === 200) {
						if (this.operationFlag === 1) {
							this.yuanList = res.data.data
						}
						if (this.operationFlag === 2) {
							this.yuanList = this.yuanList.concat(res.data.data)
						}
					}
					if (res.data.status === 0) {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.add-yuan {
		margin-top: 80upx
	}
</style>
