<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="这一刻的想法..." v-model="input_content" />
			</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<button type="default" class="feedback-submit" @tap="submit">提交</button>
			</view>
		</form>
		<canvas canvas-id="canvas" :style="{width: width + 'px', height: height + 'px'}" class="canvas"></canvas>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				// title: 'choose/previewImage',
				input_content:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				//侧滑返回start
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				//end
				width: 200,
				height: 300,
				uploadCount: 0,
				imageStrList: []
			}
		},
		onUnload() {
			this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 2,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 8;
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
			compressionImage(path) {
				uni.getImageInfo({
					src: path,
					success: (res)=> {
						var ctx = uni.createCanvasContext('canvas');
						//设置canvas尺寸
						// a，图片宽或者高均小于或等于1280时图片尺寸保持不变，但仍然经过图片压缩处理，得到小文件的同尺寸图片
						// b，宽或者高大于1280，但是图片宽度高度比小于或等于2，则将图片宽或者高取大的等比压缩至1280
						// c，宽或者高大于1280，但是图片宽高比大于2时，并且宽以及高均大于1280，则宽或者高取小的等比压缩至1280
						// d，宽或者高大于1280，但是图片宽高比大于2时，并且宽或者高其中一个小于1280，则压缩至同尺寸的小文件图片 
						var maxWidth = 1200,
								maxHeight = 600;
						var originWidth, originHeight;
						originHeight = res.height;
						originWidth = res.width;
						// 目标尺寸
						var targetWidth = originWidth, targetHeight = originHeight;
						// 等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
						if (originWidth > maxWidth || originHeight > maxHeight) {
							if (originWidth / originHeight > maxWidth / maxHeight) {
								// 要求宽度*(原生图片比例)=新图片尺寸
								targetWidth = maxWidth;
								targetHeight = Math.round (maxWidth * (originHeight / originWidth));
							} else {
								targetHeight = maxHeight;
								targetWidth = Math.round (maxHeight * (originWidth / originHeight));
							}
						}
						this.width = targetWidth
						this.height = targetHeight
						ctx.drawImage(path, 0, 0, targetWidth, targetHeight)//描述图片到画布上
							ctx.draw(false, setTimeout(() => {
								uni.canvasToTempFilePath({
									canvasId: 'canvas',
									success: res => {
										uni.uploadFile({
											url: this.$constant.getImagePath,
											filePath: res.tempFilePath,
											name: 'file',
											header: {
												'Authorization': 'Bearer ' + this.token
											},
											success: (res) => {
												let data = JSON.parse(res.data)
												if (data.status === 401) {
													uni.redirectTo({
														url: '/login/index/index'
													})
													uni.showToast({
														icon: 'none',
														title: '登录信息失效，请重新登录'
													})
												}
												if (data.status === 200) {
													this.uploadCount++
													this.imageStrList.push(data.data)
													if (this.uploadCount === this.imageList.length) {
														// addmood
														this.addMood()
													}
												}
												if (data.status === 0) {
													uni.showToast({
														icon: 'none',
														title: '图片上传失败，请重新提交'
													})
												}
											},
										})

									},
									fail: res => {
											console.log(res.errMsg)
									}
								})
							}, 100))
					}, //留一定的时间绘制canvas
					fail: res => {
						console.log(res.errMsg)
					}
				})
			},
			submit () {
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				uni.showLoading({
					title: '上传中，请稍后'
				})
				for (let i = 0; i < this.imageList.length; i++) {
					this.compressionImage(this.imageList[i])
				}
			},
			addMood () {
				this.imageStrList.map((item, index) => {
					item = 'https://xiaoai.jiaxiu.club' + item
				})
				uni.request({
					url: this.$constant.addMood,
					header: {
						'Authorization': 'Bearer ' + this.token
					},
					method: 'POST',
					data: {
						userId: this.userInfo.id,
						nickName: this.userInfo.nickName,
						des: this.input_content,
						imageStrList: this.imageStrList
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
								icon: 'none',
								title: res.data.message
							})
							uni.navigateBack({
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
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '网络错误，请检查网络'
						})
					}
				})
			},
			async publish(){
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				uni.showLoading({title:'发布中'});
				var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
				var images = [];
				for(var i = 0,len = this.imageList.length; i < len; i++){
					var image_obj = {name:'image-'+i,uri:this.imageList[i]};
					images.push(image_obj);
				}
				
				uni.uploadFile({//该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
					url: 'moment/moments', //仅为示例，非真实的接口地址
					files: images,//有files时,会忽略filePath和name
					filePath: '',
					name: '',
					formData: {//后台以post方式接收
						'user_id':'1',//自己系统中的用户id
						'text': this.input_content,//moment文字部分
						'longitude':location.longitude,//经度
						'latitude':location.latitude//纬度
					},
					success: (uploadFileRes) => {
						uni.hideLoading();
						uni.showToast({
							icon:'success',
							title:"发布成功"
						})
						uni.navigateBack({//可根据实际情况使用其他路由方式
							delta:1
						});
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:"发布失败,请检查网络"
						})
					}
				});
			},
			getLocation(){//h5中可能不支持,自己选择
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'wgs84',
						success: function (res) {
							resolve(res);
						},
						fail: (e) => {  
							reject(e);
						}
					});
				} )
			},
			
			close(e){
			    this.imageList.splice(e,1);
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths)
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			touchStart: function(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},
			
			touchEnd: function(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style scoped>
	
	.footer {
		margin-top: 80upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
	}
	.uni-list::before {
		height: 0;
	}
	.uni-list:after {
		height: 0;
	}
	.list-pd {
		margin-top: 0;
	}
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	.page {
		width: 750upx;
		height: 100%;
	}
	.canvas {
		position: fixed;
		top: -10000upx;
		left: 0;
	}
</style>
