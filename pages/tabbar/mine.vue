<template>
	<view class="mine-info">
		<custom-header
			:title="title"
			class="header-fixed"
			:shadow="false"
			></custom-header>
		<view class="info-top mt88">
			<view class="info-top-left">
				<!-- <image :src="userInfo.avatarUrl"></image> -->
				<image src="https://placehold.it/375x80" mode=""></image>
			</view>
			<view class="info-top-right">
				<view class="info-top-right-top">
					<view class="info-top-right-top-left">{{userInfo.nickName|| 'rere'}}</view>
					<view class="info-top-right-top-right" :class="userInfo.isTodaySign ? '':'active'">{{userInfo.isTodaySign ? '已签到' : '签到'}}</view>
				</view>
				<view class="info-top-right-bottom">
					<view class="info-top-right-bottom-left">{{userInfo.cpMoney|| 55}}</view>
					<view class="info-top-right-bottom-middle">{{userInfo.activeNumber|| 123}}</view>
					<view class="info-top-right-bottom-right iconfont icon-rightarrow"></view>
				</view>
			</view>
		</view>
			<view class="info-bottom" v-for="(item, index) in otherArr" :key="index">
				<view class="info-bottom-left">{{item}}</view>
				<view class="info-bottom-right">
					<uni-icon type="arrowright" size="24"></uni-icon>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import uniIcon from '../../components/uni-icons.vue'
	export default {
		data() {
			return {
				title: '我的',
				otherArr: ['心愿币记录', '注意事项', '系统通知']
			}
		},
		components: {
			uniIcon
		},
		computed: {
			userInfo () {
				return this.$store.state.userInfo
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.mine-info {
	.info-top {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 144upx;
		width: 100%;
		&-left {
			width: 288upx;
			height: 100%;
			text-align: center;
			image {
				width: 144upx;
				height: 144upx;
				border-radius: 10upx;
			}
		}
		&-right {
			flex: 1;
			display: flex;
			height: 100%;
			flex-direction: column;
			&-top {
				position: relative;
				flex:1;
				&-left {
					position: absolute;
					left: 0;
					bottom: 0;
				}
				&-right {
					position: absolute;
					right: 20upx;
					bottom: 0;
				}
			}
			&-bottom {
				flex:1;
				position: relative;
				&-left {
					position: absolute;
					left: 0;
				}
				&-middle {
					position: absolute;
					left: 200upx;
				}
				&-right {
					position: absolute;
					right: 20upx;
					font-size: 50upx;
				}
			}
		}
	}
	.info-bottom {
		position: relative;
		height: 88rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		&-left {
			position: absolute;
			left: 20rpx;
			top: 14rpx
		}
		&-right {
			position: absolute;
			right: 20rpx;
			top: 14rpx;
		}
	}
}

</style>
