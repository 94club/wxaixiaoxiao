<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
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
