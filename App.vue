<script>
export default {
  onLaunch: function () {
		// #ifdef MP
		if (wx.canIUse('getUpdateManager')) {
		   const updateManager = wx.getUpdateManager()
		
		   updateManager.onCheckForUpdate(function (res) {
		     // 请求完新版本信息的回调 ，是否检测到新版本
		     console.log("是否请求到新版本:" + res.hasUpdate)
		   })
		
		   updateManager.onUpdateReady(function () {
		     wx.showModal({
		       title: '更新提示',
		       content: '新版本已经准备好，是否重启更新？',
		       success: function (res) {
		         if (res.confirm) {
		           // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		           updateManager.applyUpdate()
		         }
		       }
		     })
		   })
		
		   updateManager.onUpdateFailed(function () {
		     // 新的版本下载失败
		     wx.showModal({
		       title: '更新提示',
		       content: '新版本下载失败，请重试',
		       showCancel: false
		     })
		   })
		 } else {
		
		   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
		   wx.showModal({
		     title: '提示',
		     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
		   })
		
		 }
		// #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
	/*每个页面公共css */
.header-fixed {
  position: fixed;
  width: 750rpx;
  top: 0;
  left: 0;
  z-index: 99
}
.mt88 {
	margin-top: 90rpx;
}


/*通用 */
view{
	font-size:28upx; 
	line-height:1.8;
}
progress, checkbox-group{
	width: 100%;
}
form {
	width: 100%;
}
.uni-flex {
	display: flex;
	flex-direction: row;
}
.uni-flex-item {
	flex: 1;
}
.uni-row {
	flex-direction: row;
}
.uni-column {
	flex-direction: column;
}
.uni-link{
	color:#576B95;
	font-size:26upx;
}
.uni-center{
	text-align:center;
}
.uni-inline-item{
	display: flex;
	flex-direction: row;
	align-items:center;
}
.uni-inline-item text{
	margin-right: 20upx;
}
.uni-inline-item text:last-child{
	margin-right: 0upx;
	margin-left: 20upx;
}

/* page */
.uni-page-head{
	padding:35upx; 
	text-align: center;
}
.uni-page-head-title {
	display: inline-block;
	padding: 0 40upx;
	font-size: 30upx;
	height: 88upx;
	line-height: 88upx;
	color: #BEBEBE;
	box-sizing: border-box;
	border-bottom: 2upx solid #D8D8D8;
}
.uni-page-body {
	width: 100%;
	flex-grow: 1;
	overflow-x: hidden;
}
.uni-padding-wrap{
	width:690upx;
	padding:0 30upx;
}
.uni-word {
	text-align: center;
	padding:200upx 100upx;
}
.uni-title {
	font-size:30upx;
	font-weight:500;
	padding:20upx 0;
	line-height:1.5;
}
.uni-text{
	font-size:28upx;
}
.uni-title text{
	font-size:24upx; 
	color:#888;
}

.uni-text-gray{
	color: #ccc;
}
.uni-text-small {
	font-size:24upx;
}
.uni-common-mb{
	margin-bottom:30upx;
}
.uni-common-pb{
	padding-bottom:30upx;
}
.uni-common-pl{
	padding-left:30upx;
}
.uni-common-mt{
	margin-top:30upx;
}
/* 背景色 */
.uni-bg-red{
	background:#F76260; color:#FFF;
}
.uni-bg-green{
	background:#09BB07; color:#FFF;
}
.uni-bg-blue{
	background:#007AFF; color:#FFF;
}
/* 标题 */
.uni-h1 {font-size: 80upx; font-weight:700;}
.uni-h2 {font-size: 60upx; font-weight:700;}
.uni-h3 {font-size: 48upx; font-weight:700;}
.uni-h4 {font-size: 36upx; font-weight:700;}
.uni-h5 {font-size: 28upx; color: #8f8f94;}
.uni-h6 {font-size: 24upx; color: #8f8f94;}
.uni-bold{font-weight:bold;}

/* 文本溢出隐藏 */
.uni-ellipsis {overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

/* 竖向百分百按钮 */
.uni-btn-v{
	padding:10upx 0;
}
.uni-btn-v button{margin:20upx 0;}

/* 表单 */
.uni-form-item{
	display:flex;
	width:100%;
	padding:10upx 0;
}
.uni-form-item .title{
	padding:10upx 25upx;
}
.uni-label {
	width: 210upx;
	word-wrap: break-word;
	word-break: break-all;
	text-indent:20upx;
}
.uni-input {
	height: 50upx;
	padding: 15upx 25upx;
	line-height:50upx;
	font-size:28upx;
	background:#FFF;
	flex: 1;
}
radio-group, checkbox-group{
	width:100%;
}
radio-group label, checkbox-group label{
	padding-right:20upx;
}
.uni-form-item .with-fun{
	display:flex; 
	flex-wrap:nowrap; 
	background:#FFFFFF;
}
.uni-form-item .with-fun .uni-icon{
	width:40px; 
	height:80upx; 
	line-height:80upx; 
	flex-shrink:0;
}

/* loadmore */
.uni-loadmore{
	height:80upx;
	line-height:80upx;
	text-align:center;
	padding-bottom:30upx;
}
/*数字角标*/
.uni-badge,
.uni-badge-default {
	font-family: 'Helvetica Neue', Helvetica, sans-serif;
	font-size: 12px;
	line-height: 1;
	display: inline-block;
	padding: 3px 6px;
	color: #333;
	border-radius: 100px;
	background-color: rgba(0, 0, 0, .15);
}
.uni-badge.uni-badge-inverted {
	padding: 0 5px 0 0;
	color: #929292;
	background-color: transparent
}
.uni-badge-primary {
	color: #fff;
	background-color: #007aff
}
.uni-badge-blue.uni-badge-inverted,
.uni-badge-primary.uni-badge-inverted {
	color: #007aff;
	background-color: transparent
}
.uni-badge-green,
.uni-badge-success {
	color: #fff;
	background-color: #4cd964;
}
.uni-badge-green.uni-badge-inverted,
.uni-badge-success.uni-badge-inverted {
	color: #4cd964;
	background-color: transparent
}
.uni-badge-warning,
.uni-badge-yellow {
	color: #fff;
	background-color: #f0ad4e
}
.uni-badge-warning.uni-badge-inverted,
.uni-badge-yellow.uni-badge-inverted {
	color: #f0ad4e;
	background-color: transparent
}
.uni-badge-danger,
.uni-badge-red {
	color: #fff;
	background-color: #dd524d
}
.uni-badge-danger.uni-badge-inverted,
.uni-badge-red.uni-badge-inverted {
	color: #dd524d;
	background-color: transparent
}
.uni-badge-purple,
.uni-badge-royal {
	color: #fff;
	background-color: #8a6de9
}
.uni-badge-purple.uni-badge-inverted,
.uni-badge-royal.uni-badge-inverted {
	color: #8a6de9;
	background-color: transparent
}

/*折叠面板 */
.uni-collapse-content {
	height: 0;
	width: 100%;
	overflow: hidden;
}
.uni-collapse-content.uni-active {
	height: auto;
}

/*卡片视图 */
.uni-card {
	background: #fff;
	border-radius: 8upx;
	margin:20upx 0;
	position: relative;
	box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);
}
.uni-card-content {
	font-size: 30upx;
}
.uni-card-content.image-view{
    width: 100%;
    margin: 0;
}
.uni-card-content-inner {
	position: relative;
	padding: 30upx;
}
.uni-card-footer,
.uni-card-header {
	position: relative;
	display: flex;
	min-height: 50upx;
	padding: 20upx 30upx;
	justify-content: space-between;
	align-items: center;
}
.uni-card-header {
	font-size: 36upx;
}
.uni-card-footer {
	color: #6d6d72;
}
.uni-card-footer:before,
.uni-card-header:after {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	height: 2upx;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-card-header:after {
	top: auto;
	bottom: 0;
}
.uni-card-media {
	justify-content: flex-start;
}
.uni-card-media-logo {
	height: 84upx;
	width: 84upx;
	margin-right: 20upx;
}
.uni-card-media-body {
	height: 84upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.uni-card-media-text-top {
	line-height: 36upx;
	font-size: 34upx;
}
.uni-card-media-text-bottom {
	line-height: 30upx;
	font-size: 28upx;
	color: #8f8f94;
}
.uni-card-link {
	color: #007AFF;
}

/* 列表 */
.uni-list {
	background-color: #FFFFFF;
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
}
.uni-list:after {
	position: absolute;
	z-index: 10;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list::before {
	position: absolute;
	z-index: 10;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list-cell {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.uni-list-cell-hover {
	background-color: #eee;
}
.uni-list-cell-pd {
	padding: 22upx 30upx;
}
.uni-list-cell-left {
	font-size:28upx;
	padding: 0 30upx;
}
.uni-list-cell-db,
.uni-list-cell-right {
	flex: 1;
}
.uni-list-cell::after {
	position: absolute;
  z-index: 3;
	right: 0;
	bottom: 0;
	left: 30upx;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list .uni-list-cell:last-child::after {
	height: 0upx;
}
.uni-list-cell-last.uni-list-cell::after {
	height: 0upx;
}
.uni-list-cell-divider {
	position: relative;
	display: flex;
	color: #999;
	background-color: #f7f7f7;
	padding:15upx 20upx;
}
.uni-list-cell-divider::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list-cell-divider::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0upx;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list-cell-navigate {
	font-size:30upx;
	padding: 22upx 30upx;
	line-height: 48upx;
	position: relative;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	flex: 1;
	justify-content: space-between;
	align-items: center;
}
.uni-list-cell-navigate {
	padding-right: 36upx;
}
.uni-navigate-badge {
	padding-right: 50upx;
}
.uni-list-cell-navigate.uni-navigate-right:after {
	font-family: uniicons;
	content: '\e583';
	position: absolute;
	right: 24upx;
	top: 50%;
	color: #bbb;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
.uni-list-cell-navigate.uni-navigate-bottom:after {
	font-family: uniicons;
	content: '\e581';
	position: absolute;
	right: 24upx;
	top: 50%;
	color: #bbb;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
.uni-list-cell-navigate.uni-navigate-bottom.uni-active::after {
	font-family: uniicons;
	content: '\e580';
	position: absolute;
	right: 24upx;
	top: 50%;
	color: #bbb;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
.uni-collapse.uni-list-cell {
	flex-direction: column;
}
.uni-list-cell-navigate.uni-active {
	background: #eee;
}
.uni-list.uni-collapse {
	box-sizing: border-box;
	height: 0;
	overflow: hidden;
}
.uni-collapse .uni-list-cell {
	padding-left: 20upx;
}
.uni-collapse .uni-list-cell::after {
	left: 52upx;
}
.uni-list.uni-active {
	height: auto;
}

/* 三行列表 */
.uni-triplex-row {
	display: flex;
	flex: 1;
	width: 100%;
	box-sizing: border-box;
	flex-direction: row;
	padding: 22upx 30upx;
}
.uni-triplex-right,
.uni-triplex-left {
	display: flex;
	flex-direction: column;
}
.uni-triplex-left {
	width: 84%;
}
.uni-triplex-left .uni-title{
	padding:8upx 0;
}
.uni-triplex-left .uni-text, .uni-triplex-left .uni-text-small{color:#999999;}
.uni-triplex-right {
	width: 16%;
	text-align: right;
}

/* 图文列表 */
.uni-media-list {
	padding: 22upx 30upx;
	box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
}
.uni-navigate-right.uni-media-list {
	padding-right: 74upx;
}
.uni-pull-right {
	flex-direction: row-reverse;
}
.uni-pull-right>.uni-media-list-logo {
	margin-right: 0upx;
	margin-left: 20upx;
}
.uni-media-list-logo {
	height: 84upx;
	width: 84upx;
	margin-right: 20upx;
}
.uni-media-list-logo image {
	height: 100%;
	width: 100%;
}
.uni-media-list-body {
	height: 84upx;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	overflow: hidden;
}
.uni-media-list-text-top {
	width: 100%;
	line-height: 36upx;
	font-size: 30upx;
}
.uni-media-list-text-bottom {
	width: 100%;
	line-height: 30upx;
	font-size: 26upx;
	color: #8f8f94;
}

/* 九宫格 */
.uni-grid-9 {
	background: #f2f2f2;
	width: 750upx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	border-top: 2upx solid #eee;
}
.uni-grid-9-item {
	width: 250upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-bottom: 2upx solid;
	border-right: 2upx solid;
	border-color: #eee;
	box-sizing: border-box;
}
.no-border-right {
	border-right: none;
}
.uni-grid-9-image {
	width: 100upx;
	height: 100upx;
}
.uni-grid-9-text {
	width: 250upx;
	line-height: 4upx;
	height: 40upx;
	text-align: center;
	font-size: 30upx;
}
.uni-grid-9-item-hover {
	background: rgba(0, 0, 0, 0.1);
}

/* 上传 */
.uni-uploader {
	flex: 1;
	flex-direction: column;
}
.uni-uploader-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.uni-uploader-info {
	color: #B2B2B2;
}
.uni-uploader-body {
	margin-top: 16upx;
}
.uni-uploader__files {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.uni-uploader__file {
	margin: 10upx;
	width: 210upx;
	height: 210upx;
}
.uni-uploader__img {
	display: block;
	width: 210upx;
	height: 210upx;
}
.uni-uploader__input-box {
	position: relative;
	margin:10upx;
	width: 208upx;
	height: 208upx;
	border: 2upx solid #D9D9D9;
}
.uni-uploader__input-box:before,
.uni-uploader__input-box:after {
	content: " ";
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #D9D9D9;
}
.uni-uploader__input-box:before {
	width: 4upx;
	height: 79upx;
}
.uni-uploader__input-box:after {
	width: 79upx;
	height: 4upx;
}
.uni-uploader__input-box:active {
	border-color: #999999;
}
.uni-uploader__input-box:active:before,
.uni-uploader__input-box:active:after {
	background-color: #999999;
}
.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}

/*问题反馈*/
.feedback-title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20upx;
	color: #8f8f94;
	font-size: 28upx;
}
.feedback-star-view.feedback-title {
	justify-content: flex-start;
	margin: 0;
}
.feedback-quick {
	position: relative;
	padding-right: 40upx;
}
.feedback-quick:after {
	font-family: uniicons;
	font-size: 40upx;
	content: '\e581';
	position: absolute;
	right: 0;
	top: 50%;
	color: #bbb;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
.feedback-body {
	background: #fff;
}
.feedback-textare {
	height: 200upx;
	font-size: 34upx;
	line-height: 50upx;
	width: 100%;
	box-sizing: border-box;
	padding: 20upx 30upx 0;
}
.feedback-input {
	font-size: 34upx;
	height: 50upx;
	min-height: 50upx;
	padding: 15upx 20upx;
	line-height: 50upx;
}
.feedback-uploader {
	padding: 22upx 20upx;
}
.feedback-star {
	font-family: uniicons;
	font-size: 40upx;
	margin-left: 6upx;
}
.feedback-star-view {
	margin-left: 20upx;
}
.feedback-star:after {
	content: '\e408';
}
.feedback-star.active {
	color: #FFB400;
}
.feedback-star.active:after {
	content: '\e438';
}
.feedback-submit {
	background: #007AFF;
	color: #FFFFFF;
	margin: 20upx;
}

/* input group */
.uni-input-group {
	position: relative;
	padding: 0;
	border: 0;
	background-color: #fff;
}

.uni-input-group:before {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	height: 2upx;
	content: '';
	transform: scaleY(.5);
	background-color: #c8c7cc;
}

.uni-input-group:after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 2upx;
	content: '';
	transform: scaleY(.5);
	background-color: #c8c7cc;
}

.uni-input-row {
	position: relative;
	display: flex;
	flex-direction: row;
	font-size:28upx;
	padding: 22upx 30upx;
	justify-content: space-between;
}

.uni-input-group .uni-input-row:after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 30upx;
	height: 2upx;
	content: '';
	transform: scaleY(.5);
	background-color: #c8c7cc;
}

.uni-input-row label {
	line-height: 70upx;
}

/* textarea */
.uni-textarea{
	width:100%;
	background:#FFF;
}
.uni-textarea textarea{
	width:96%;
	padding:18upx 2%;
	line-height:1.6;
	font-size:28upx;
	height:150upx;
}

/* tab bar */
.uni-tab-bar {
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
}

.uni-tab-bar .list {
	width: 750upx;
	height: 100%;
}

.uni-swiper-tab {
	width: 100%;
	white-space: nowrap;
	line-height: 100upx;
	height: 100upx;
	border-bottom: 1px solid #c8c7cc;
}

.swiper-tab-list {
	font-size: 30upx;
	width: 150upx;
	display: inline-block;
	text-align: center;
	color: #555;
}

.uni-tab-bar .active {
	color: #007AFF;
}

.uni-tab-bar .swiper-box {
	flex: 1;
	width: 100%;
	height: calc(100% - 100upx);
}

.uni-tab-bar-loading{
	padding:20upx 0;
}

/* steps */
.uni-steps{padding:20upx 30upx; flex-grow: 1; display:flex; flex-wrap:wrap;}
.uni-steps view{display:flex; flex-wrap:wrap; float:none;}
.uni-steps .step{width:31.3%; margin:0 1%; flex-wrap:nowrap;}
.uni-steps .step-circle{width:50upx; height:50upx; border-radius:50upx; background:#F1F1F3; justify-content:center; line-height:50upx; flex-shrink:0; margin-right:15upx; color:#666; font-size:28upx;}
.uni-steps .step-content{width:100%; height:22upx; border-bottom:1px solid #F1F2F3;}
.uni-steps .step-title{line-height:50upx; height:50upx; background:#FFFFFF; width:auto; overflow:hidden; padding-right:8upx;}
.uni-steps .current .step-circle{background:#00B26A; color:#FFFFFF;}
.uni-steps .current .step-content{border-color:#00B26A;}
.uni-steps .current .step-title{color:#00B26A;}

/* comment */
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0; width:100%; display: flex;}
.uni-comment-face{width:70upx; height:70upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%; border-radius:100%;}
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between;}
.uni-comment-top text{color:#0A98D5; font-size:24upx;}
.uni-comment-date{line-height:38upx; flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1;}
.uni-comment-date view{color:#666666; font-size:24upx; line-height:38upx;}
.uni-comment-content{line-height:1.6em; font-size:28upx; padding:8rpx 0;}
.uni-comment-replay-btn{background:#FFF; font-size:24upx; line-height:28upx; padding:5rpx 20upx; border-radius:30upx; color:#333 !important; margin:0 10upx;}

/* swiper msg */
.uni-swiper-msg{width:100%; padding:12rpx 0; flex-wrap:nowrap; display:flex;}
.uni-swiper-msg-icon{width:50upx; margin-right:20upx;}
.uni-swiper-msg-icon image{width:100%; flex-shrink:0;}
.uni-swiper-msg swiper{width:100%; height:50upx;}
.uni-swiper-msg swiper-item{line-height:50upx;}

/* product */
.uni-product-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
}

.uni-product {
    padding: 20upx;
    display: flex;
    flex-direction: column;
}

.image-view {
    height: 330upx;
    width: 330upx;
	margin:12upx 0;
}

.uni-product-image {
    height: 330upx;
    width: 330upx;
}

.uni-product-title {
    width: 300upx;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
	line-height:1.5;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.uni-product-price {
	margin-top:10upx;
    font-size: 28upx;
	line-height:1.5;
    position: relative;
}

.uni-product-price-original {
    color: #e80080;
}

.uni-product-price-favour {
    color: #888888;
    text-decoration: line-through;
    margin-left: 10upx;
}

.uni-product-tip {
    position: absolute;
    right: 10upx;
    background-color: #ff3333;
    color: #ffffff;
    padding: 0 10upx;
    border-radius: 5upx;
}

/* timeline */
.uni-timeline {
		margin: 35upx 0;
		display: flex;
		flex-direction: column;
		position: relative;
	}


	.uni-timeline-item {
		display: flex;
		flex-direction: row;
		position: relative;
		padding-bottom: 20upx;
		box-sizing: border-box;
		overflow: hidden;

	}

	.uni-timeline-item .uni-timeline-item-keynode {
		width: 160upx;
		flex-shrink: 0;
		box-sizing: border-box;
		padding-right: 20upx;
		text-align: right;
		line-height: 65upx;
	}

	.uni-timeline-item .uni-timeline-item-divider {
		flex-shrink: 0;
		position: relative;
		width: 30upx;
		height: 30upx;
		top: 15upx;
		border-radius: 50%;
		background-color: #bbb;
	}



	.uni-timeline-item-divider::before,
	.uni-timeline-item-divider::after {
		position: absolute;
		left: 15upx;
		width: 1upx;
		height: 100vh;
		content: '';
		background: inherit;
	}

	.uni-timeline-item-divider::before {
		bottom: 100%;
	}

	.uni-timeline-item-divider::after {
		top: 100%;
	}


	.uni-timeline-last-item .uni-timeline-item-divider:after {
		display: none;
	}

	.uni-timeline-first-item .uni-timeline-item-divider:before {
		display: none;
	}

	.uni-timeline-item .uni-timeline-item-content {
		padding-left: 20upx;
	}
	
	.uni-timeline-last-item .bottom-border::after{
		display: none;
	}
	
	.uni-timeline-item-content .datetime{
		color: #CCCCCC;
	}
	
	/* 自定义节点颜色 */
	.uni-timeline-last-item .uni-timeline-item-divider{
		background-color: #1AAD19;
	}
</style>
