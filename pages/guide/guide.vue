<template>
	<view>
		这是引导界面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.$api.getUserInfo().then((res) => {}).catch((err) => {})
		}
	}
</script>

<style lang="scss">

</style>
