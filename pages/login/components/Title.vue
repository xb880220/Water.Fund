<template>
	<view class="titleBox">
			<view class="titleContent">
				<slot></slot>
			</view>
			<view class="titleBg"></view>
	</view>
</template>

<script>
	export default {
		props:{
				title:{
					default:"文字",
					type:String,
				}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.titleBox{
		position: relative;
		margin: 20px 40px;
		height: 50px;
		.titleContent {
			position: absolute;
			z-index: 20;
			top: 0;
			left: 0;
			font-size: 25px;
			line-height: 50px;
			font-weight: 400;
			color: #1C1C1C;
		}
		.titleBg {
			position: absolute;
			z-index: 1;
			// width: 120%;
			top: 50%;
			left: -.2em;
			width: 4em;
			height: 8px;
			background: #4ABFFD;
		}
	}
</style>