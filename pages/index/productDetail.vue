<template>
	<view class="pageMain">
		<u-toast ref="uToast"></u-toast>
		<cu-custom bgColor="bgcolor" :isBack="true"><block slot="backText">返回</block></cu-custom>
		<view class="page">
			<view class="title">{{ details.name }}</view>
			<!-- <view class="time">2022-08-16</view> -->
			<view class="sc">
				<view @tap="collect" style="display: flex;position: absolute;right: 0px;top: 0px;">
					<u-icon name="star"></u-icon>
					<text>收藏</text>
				</view>
			</view>
			<u-parse :content="details.content"></u-parse>
		</view>
	</view>
</template>

<script>
	import moment from "@/common/moment/index.js"
	import { getDetailsApi,joincollectionApi } from '@/config/home.js';
export default {
	data() {
		return {
			strings: '',
			details:{
				content:``
			},
			id:null
		};
	},
	onLoad(option) {
		if(option.id){
			this.getDetails(option.id)
			this.id = option.id
			return
		}
		
		
		const q = decodeURIComponent(option.q)
		if(q){
			this.id = q.split('id=')[1]
			this.getDetails(this.id)
			return
		}
		
		
		// console.log();
		// console.log(q,"q");
	},
	methods: {
		async collect(){
			const result = await joincollectionApi(this.id);
			this.$refs.uToast.show(
				{
					type: 'default',
					message: "操作成功",
				}
				)
		},
		async getDetails(id){
			const result = await getDetailsApi(id);
			this.details = result;
			// this.details.time = moment(this.details.createdTime).format('YYYY-MM-DD HH:mm:ss');
			console.log(this.details);
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	font-size: 30px;
	font-weight: 700;
	text-align: center;
}
.time {
	color: #989898;
	line-height: 30px;
	font-size: 14px;
}
.sc {
	position: relative;
	height: 30px;
	text-align: right;
	color: #989898;
	line-height: 30px;
	font-size: 14px;
}
.page {
	padding: 20px;
}
</style>
