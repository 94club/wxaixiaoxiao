<template>
	<view class="content">
		<custom-header right-icon="plusempty" @clickRight="showMoodBox" :title="title" class="header-fixed" :shadow="false"></custom-header>
		<view class="add-yuan mt88" v-show="addShow">
		  <form @submit="submitMood">
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
			<view class="task-list-item" v-for="(item, moodIndex) in moodList" :key="moodIndex">{{ item.id }}--</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '心情',
			addShow: false,
			moodList: [],
			pageSize: 20,
			pageNo: 1,
			current: 0,
			des: '',
			operationFlag: 1 // 1 刚进来 或者下拉刷新 或者新增   2 上拉加载
		};
	},
	onPullDownRefresh() {
		this.operationFlag = 1
		this.getMoodList()
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
		this.getMoodList()
	},
	onShow() {
		this.getMoodList();
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo
		},
		token() {
			return this.$store.state.token
		}
	},
	methods: {
		bindTextAreaBlur (e) {
			this.des = e.detail.value
		},
		showMoodBox () {
			this.addShow = true
		},
		submitMood () {
			// 表单校验
			uni.request({
				url: this.$constant.addMood,
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
							url: '/pages/index/index'
						});
						uni.showToast({
							icon: 'none',
							title: '登录信息失效，请重新登录'
						});
					}
					if (res.data.status === 200) {
						this.moodList = []
						this.addShow = false
						uni.showToast({
							icon: 'none',
							title: '添加成功'
						})
						this.getMoodList()
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
			this.getMoodList();
		},
		getMoodList() {
			uni.request({
				url: this.$constant.getMood,
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
							url: '/pages/index/index'
						});
						uni.showToast({
							icon: 'none',
							title: '登录信息失效，请重新登录'
						});
					}
					if (res.data.status === 200) {
						if (this.operationFlag === 1) {
							this.moodList = res.data.data
						}
						if (this.operationFlag === 2) {
							this.moodList = this.moodList.concat(res.data.data)
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
