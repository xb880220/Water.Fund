<template>
	<view class="page">
		<view class="bgimg">
			<image src="../../../static/980.jpg" style="width: 100%;height: 100%;" mode=""></image>
		</view>
		<view class="cenBtn">
			<!-- <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"> -->
			<image class="avatar" :src="user.avatarUrl?user.avatarUrl:avatarUrl "></image>
			<!-- </button> -->
		</view>
		<view v-if="user.nickName" class="name">{{ user.nickName }}</view>
		<view v-else class="name" @tap="getUserProfile">获取头像昵称</view>
		<view class="box">
			<view class="boxTab">
				<view class="left">我的收藏</view>
				<view class="right"></view>
			</view>
			<view class="boxConter">
				
				<CollectItem v-for="(item,index) in dataList" :details="item" :key="index"></CollectItem>
				<div style="width: 100px;height: 0;"></div>
				<div style="width: 100px;height: 0;"></div>
				<div style="width: 100px;height: 0;"></div>
				<div style="width: 100px;height: 0;"></div>
				<div style="width: 100px;height: 0;"></div>
				
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import { getcollectionlistApi } from '@/config/home.js';
	import CollectItem from "@/components/CollectItem.vue"
export default {
	data() {
		return {
			user: {},
			dataList:[],
			avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
		};
	},
	components:{
		CollectItem
	},
	onReady() {
		this.user = this.$store.getters.getUser;
		
		let islogin = this.$store.getters.getLogin;
		if(islogin){
			this.getCollection();
		}else {
			this.$navto.navto('/pages/login/login')
			// this.$store.commit('saveCount', -1);
		}
		
		
	},
	methods: {
		async getCollection(){
			const result=await getcollectionlistApi()
			console.log(result);
			this.dataList = result
		},
		onChooseAvatar(e) {
			this.avatarUrl = e.detail;
		},
		getUserProfile() {
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					this.user = res.userInfo;
					this.$store.commit('saveUser', this.user);
					console.log(this.user);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.avatar {
	width: 100%;
	height: 100%;
}
.page {
	width: 100vw;
	height: 100vh;
}
.cenBtn {
	border: 1px solid #ffffff40;
	position: absolute;
	top: 130px;
	left: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #6fa7fb;
	transform: translate(-50%, 0);
	background-color: #fff;
	width: 80px;
	height: 80px;
	box-shadow: 0 0 0 5px #ffffff8c;
	border-radius: 50px;
	overflow: hidden;
}
.bgimg {
	width: 100%;
	height: 170px;
	background-color: aqua;
	// background-image: url("@/static/980.jpg");
}

.name {
	margin-top: 50px;
	text-align: center;
	font-weight: 600;
	font-size: 22px;
	color: #1c1c1c;
	line-height: 30px;
}

.box {
	width: 90%;
	margin: 0 auto;
	.boxTab {
		display: flex;
		.left {
			// width: 60px;
			padding: 0 5px;
			line-height: 30px;
			height: 30px;
			font-weight: 400;
			color: #9a9a9a;
			border-radius: 5px 0 0 0;
			background-color: rgba(213, 213, 213, 0.5);
		}
		.right {
			width: 0;
			height: 0;
			border-bottom: 30px solid rgba(213, 213, 213, 0.5);
			border-right: 10px solid transparent;
		}
	}

	.boxConter {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background-color: rgba(213, 213, 213, 0.5);
		width: 100%;
		min-height: 250px;
		padding: 10px;
		// height: 30vh;
		border-radius: 0 5px 5px 5px;
		margin-bottom: 90px;
	}
}
</style>
