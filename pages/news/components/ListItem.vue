<template>
	<view class="listItem">
		<view class="listItem-title">{{details.title?details.title:details.name}}</view>
		<view class="listItem-centent">{{details.subheading?details.subheading:details.introduction}}</view>
		<view class="listItem-bottom flex justify-between">
			<view class="time">{{time}}</view>
			<view class="btn" v-if="type==1" @tap="$navto.navto('/pages/news/details', { id: details.id })">阅读全文</view>
			<view class="btn" v-if="type==2" @tap="$navto.navto('/pages/news/notice', { id: details.id })">阅读全文</view>
		</view>
		<u-line></u-line>
	</view>
</template>

<script>
	import moment from "@/common/moment/index.js"
export default {
	props:{
		details:{
			type:Object
		},
		type: null
	},
	onReady() {
		console.log(this.details.createdTime);
		this.time = moment(this.details.createdTime).format('YYYY-MM-DD HH:mm:ss')
	},
	data() {
		return{
			getdetails:this.details,
			time:null
		}
	}
};
</script>

<style lang="scss" scoped>
.listItem {
	width: 90%;
	margin: 15px auto 0;
	&-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		font-size: 16px;
		font-weight: 600;
		color: #1c1c1c;
		line-height: 35px;
	}
	&-centent {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		font-size: 16px;
		// font-weight: 400;
		color: #747474;
		line-height: 35px;
	}
	&-bottom {
		margin-bottom: 10px;
		.time {
			font-size: 12px;
			color: #747474;
			line-height: 20px;
		}
		.btn {
			font-size: 12px;
			height: 20px;
			padding: 2px 5px;
			border-radius: 15px;
			background: linear-gradient(0deg, #4abffd 0%, #0b93fc 100%);
			color: #fff;
		}
	}
}
</style>
