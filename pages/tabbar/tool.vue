<template>
	<view class="content">
			<view class="tool-content">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
			</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		data() {
			return {
				items: ['我的','系统'],
				current: 0
			}
		},
		components: {
			uniSegmentedControl
		},
		onLoad() {

		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style lang="scss">
 .tool-content {
	 width: 100%;
	 height: 88rpx;
 }
</style>
