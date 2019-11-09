<template>
	<view class="content">
		<custom-header right-icon="plusempty" @clickRight="showMoodBox" :title="title" class="header-fixed" :shadow="false"></custom-header>
		<view class="add-yuan mt88" v-show="addShow">
			<form @submit="submitMood">
				<view class="form-item"><textarea @blur="bindTextAreaBlur" auto-height />{{ voicePath }}</view>
				<button type="primary" @tap="uploadImg">上传图片</button>
				<button type="primary" @tap="startRecord">开始录音</button>
				<button type="primary" @tap="stopRecord">停止录音</button>
				<button type="primary" @tap="playVoice">播放录音</button>
				<button type="primary" @tap="uploadVideo">上传视频</button>
				<video :src="videoSrc"></video>
				<button type="primary" form-type="submit">添加</button>
			</form>
		</view>
		<view class="task-list mt88">
			<view class="task-list-item" v-for="(item, moodIndex) in moodList" :key="moodIndex">{{ item.id }}--</view>
		</view>
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
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
			operationFlag: 1, // 1 刚进来 或者下拉刷新 或者新增   2 上拉加载
			imageStrList: '',
			videoSrc: '',
			voicePath: '',
			imgCount: 9
		};
	},
	onPullDownRefresh() {
		this.operationFlag = 1;
		this.getMoodList();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onReachBottom() {
		this.pageNo++;
		this.operationFlag = 2;
		uni.showLoading({
			title: '加载'
		});
		setTimeout(() => {
			uni.hideLoading();
		}, 2000);
		this.getMoodList();
	},
	onShow() {
		this.getMoodList();
	},
	onLoad() {
		let self = this;
		recorderManager.onStop(function(res) {
			console.log('recorder stop' + JSON.stringify(res));
			self.voicePath = res.tempFilePath;
		});
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
		uploadImg() {
			uni.chooseImage({
				count: this.imgCount,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log(JSON.stringify(res.tempFilePaths));
					this.imgCount -= res.tempFilePaths.length;
				}
			});
		},
		startRecord() {
			console.log('开始录音');
			wx.getSetting({
				success: (res) =>{
					if (res.authSetting['scope.record']) {
						console.log('录音开始')
						recorderManager.start({ format: 'mp3' });
					}
					else {
						this.showSettingToast("授权信息才可以登录~")
					}
				}
			})
		},
		stopRecord() {
			console.log('录音结束');
			recorderManager.stop();
		},
		playVoice() {
			console.log('播放录音');
			if (this.voicePath) {
				innerAudioContext.src = this.voicePath;
				innerAudioContext.play();
			}
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
							url: '/pages/authSetting/authSetting',
						})
					}
				}
			})
		},
		uploadVideo() {
		  let self = this;
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				success: function (res) {
					self.videoSrc = res.tempFilePath
				}
			})
		},
		bindTextAreaBlur(e) {
			this.des = e.detail.value;
		},
		showMoodBox() {
			this.addShow = true;
		},
		submitMood() {
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
						this.moodList = [];
						this.addShow = false;
						uni.showToast({
							icon: 'none',
							title: '添加成功'
						});
						this.getMoodList();
					}
					if (res.data.status === 0) {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				}
			});
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
							this.moodList = res.data.data;
						}
						if (this.operationFlag === 2) {
							this.moodList = this.moodList.concat(res.data.data);
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
	margin-top: 80upx;
}
</style>
