<template>
	<view class="content">
		<custom-header right-icon="plusempty" @clickRight="showMoodBox" :title="title" class="header-fixed" :shadow="false"></custom-header>
		<canvas canvas-id="canvas" class="canvas"></canvas>
		<view class="add-yuan mt88" v-show="addShow">
			<form @submit="submitMood">
				<view class="form-item"><textarea @blur="bindTextAreaBlur" auto-height />{{ voicePath }}</view>
				<image :src="item" mode="" v-for="(item, index) in imageList" :key="index"></image>
				<button type="primary" @tap="uploadImg">上传图片</button>
				<!-- <image :src="item" mode="" v-for="(item, index) in imageStrList" :key="index"></image> -->
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
			imageStrList: [],
			imageList: [],
			videoSrc: '',
			voicePath: '',
			imgCount: 9,
			uploadCount: 0
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
					this.imgCount -= res.tempFilePaths.length;
					console.log(JSON.stringify(res.tempFilePaths));
					this.imageList = this.imageList.concat(res.tempFilePaths)
					// 拿到相片的临时路径  使用canvas改变尺寸
					// for (let i = 0; i < res.tempFilePaths.length; i++) {
					// 	this.imageList.push(res.tempFilePaths[i])
					// 	this.rePix(res.tempFilePaths[i])
					// }
				}
			});
		},
		rePix (path) {
			let that = this
			uni.getImageInfo({
				src: path,
				success: function (image) {
					console.log(image.width);
					console.log(image.height);
					let width = image.width
					let height = image.height
					let reWidth
					let reHeight
					// 1重新改造  2 使用canvas改造
					// 图片宽或者高均小于1280 保持不变  只是要压缩
				  // 宽或者高大于1280，但是宽高比大于1280  只是压缩
					// 宽或者高大于1280，但是宽高比小于等于2，图片宽或者高取大的等比缩放至1280
			  	// 宽高均大于1280，但是宽高比大于2，图片狂傲取小等比压缩至1280
					if (width > 1280 && width / height <= 2 || width > 1280 && height > width && height / width > 2) {
						reWidth = 1280
						reHeight = height * reWidth / width
					}
					if (height > 1280 && height / width <= 2 || height > 1280 && width > height && width / height > 2) {
						reHeight = 1280
						reWidth = width * reHeight / height
					}
					// if (width > 1280 && height > width && height / width >2) {
					// 	reWidth = 1280
					// 	reHeight = height * reWidth / width
					// } 
					let ctx = uni.createCanvasContext('canvas');
					ctx.drawImage(path, 0, 0, reWidth, reHeight);
					ctx.draw(false, () => {
					  uni.canvasToTempFilePath({
					    x: 0,
					    y: 0,
					    destWidth: reWidth,
					    destHeight: reHeight,
					    canvasId: "canvas",
					    quality: 0.8,
					    fileType: 'jpg',
					    success: res => {
					      ctx.clearRect(0, 0, reWidth, reHeight);
					      ctx.draw();
					      console.log(res.tempFilePath);
								that.imageStrList.push(res.tempFilePath)
					    }
					  });
					});
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
			let uploadLength = this.imageList.length
			if (this.voicePath) {
				uploadLength++
			}
			if (this.videoSrc) {
				uploadLength++
			}
			uni.uploadFile({
				
			})
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
							url: '/login/index/index'
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
							url: '/login/index/index'
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
.canvas {
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  visibility: false;
}
</style>
