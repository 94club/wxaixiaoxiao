<template>
	<view class="content">
		<custom-header
			right-icon="plusempty"
			@clickRight="addMood"
			:title="title"
			class="header-fixed"
			:shadow="false"
			></custom-header>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '心情'
			}
		},
		onLoad() {

		},
		methods: {
			addMood () {
				
			}
		}
	}
</script>

<style>

</style>
