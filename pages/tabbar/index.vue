<template>
	<view>
		<view class="task-top">
			<uni-search-bar class="search-bar" :radius="100" @submit="submit" placeholder="搜索痕迹"/>
			<uniSlidingMenu />
		</view>
		<view class="task-content">
			<view class="task-statistic">
				<view class="task-statistic-left">已产生88条痕迹</view>
				<view class="task-statistic-right">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
				</view>
			</view>
			<view class="task-list"></view>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
			<image src="https://placehold.it/375x80" mode=""></image>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar.vue'
	import uniSlidingMenu from '../../components/haverster-slidingMenu/haversterSlidingMenu.vue'
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		data() {
			return {
				searchVal: '',
				items: ['进行中','审核中','已完成'],
				current: 0
			}
		},
		computed: {
			userInfo () {
				return this.$store.state.userInfo
			}
		},
		components: {
			uniSearchBar,
			uniSlidingMenu,
			uniSegmentedControl
		},
		onShow() {
			if (this.userInfo.cpName) {
				uni.showModal({
					title: '提示',
					content: '绑定对象获取更多体验',
					confirmText: '去绑定',
					cancelText: '取消',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							uni.navigateTo({
								url: '../bindName/bindName'
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			}
		},
		methods: {
			submit(res) {
        this.searchVal = res.value
				if (this.searchVal) {
					// 发送网络请求 置空数据
					
				} else {
					// 没有值先不管
				}
      },
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style lang="scss">
	.task-top {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		background: #fff;
	}
	.task-content {
		margin-top: 176rpx;
	}
	.task-statistic  {
		display: flex;
		align-items: center;
		height: 80rpx;
		&-left {
			width: 300rpx;
			font-size: 28rpx;
			text-align: center;
		}
		&-right {
			flex:1;
		}
	}
	image {
		width: 750rpx;
		height: 160rpx;
	}
</style>
