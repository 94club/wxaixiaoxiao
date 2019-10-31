<template>
	<view>
		<view v-if="registerShow" class="bind-nick">
			<uni-icon class="bind-nick-close" type="closeempty" size="24"></uni-icon>
			<view class="bind-nick-form">
				<input class="uni-input"  placeholder="请输入你的昵称"/>
			</view>
			<view class="bind-nick-button">
				<button type="primary">跳过</button>
				<button type="primary">搜索对方昵称</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icons.vue'
	// 搜索出所有未绑定对象的帐号
	export default {
		data() {
			return {
				registerShow: true
			};
		},
		components:{
			uniIcon
		},
		onLoad (option) { // option为object类型，会序列化上个页面传递的参数
			console.log(option.from); // 打印出上个页面传递的参数。
			if (option.from = 'register'){
				this.registerShow = true
			}
    }
	}
</script>

<style lang="scss">
	.bind-nick {
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: 300rpx;
		padding: 80rpx;
		border: 2rpx solid #000;
		&-close {
			position: absolute;
			right: 20rpx;
			top:20rpx;
		}
		&-form {
			border: 2rpx solid red;
			border-radius: 10rpx;
			padding: 4rpx;
			font-size: 24rpx;
		}
		&-button {
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;
			button {
				width: 220rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
