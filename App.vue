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
</style>
