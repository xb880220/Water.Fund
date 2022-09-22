<template>
	<view class="pageMain">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">新闻详情</block>
			</cu-custom>
		</view>
		<view class="newsDetails">
			<view class="header">
				<image style="width: 100%;height: 100%;" :src="details.photoUrl"></image>
			</view>
			<view class="content">
				<view class="title">{{ details.title }}</view>
				<view class="date">{{ details.time }}</view>
				<u-parse :content="details.context"></u-parse>
				<!-- <view class="content">{{ details.content }}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "@/common/moment/index.js"
import { getDetailsApi } from '@/config/news.js';
export default {
	data() {
		return {
			details: {}
		};
	},
	onLoad(option) {
		this.getDetails(option.id)
	},
	methods: {
		async getDetails(id){
			const result = await getDetailsApi(id);
			this.details = result;
			this.details.time = moment(this.details.createdTime).format('YYYY-MM-DD HH:mm:ss');
			console.log(this.details);
		}
	}
};
</script>

<style lang="scss">
.fixed {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
}
.newsDetails {
	position: relative;
	.header {
		width: 100vw;
		height: calc(100vw / 2);
		background-color: aquamarine;
	}
	.content {
		background: white;
		position: absolute;
		top: calc(100vw / 2 - 20px);
		left: 0;
		width: 100vw;
		border-radius: 20px;
		padding: 20px 5%;
		.title {
			font-size: 18px;
			font-weight: 600;
			color: #000;
			line-height: 40px;
		}
		.date {
			font-size: 14px;
			color: #494949;
			line-height: 30px;
		}
	}
}
</style>
