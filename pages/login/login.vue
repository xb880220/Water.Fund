<template>
	<view class="main">
		<view class="bgimg" style="">
			<img :src="baseUrl+'wechat/share/homepage.jpg'" style="width: 100%;height: 100%;" alt="">
		</view>
		<view class="scanBtn" @tap="openScanCode"><u-icon name="scan" color="#0B78D6" size="40" class="icon"></u-icon></view>
		<view class="loginBtn">
			<view class="btnCls" @tap="$navto.navto('userRegister')">	
				访客注册
			</view>
				<!-- <u-button shape="circle" hairline  text="访客注册" @tap="$navto.navto('userRegister')"></u-button> -->
				<view class="btnCls" @tap="$navto.navto('userLogin')">
					访客登录
				</view>
				
				<view class="btnCls" @tap="$navto.navto('staffLogin')">
					员工登录
				</view>

			<!-- <view class=""><u-button shape="circle" hairline  text="访客登录" @tap="$navto.navto('userLogin')"></u-button></view> -->

			<!-- <view class=""><u-button shape="circle" hairline text="员工登录" @tap="$navto.navto('staffLogin')"></u-button></view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			baseUrl:this.$baseUrl
		};
	},
	methods:{
		openScanCode(){
			// 调起条码扫描
			uni.scanCode({
				scanType: ['barCode'],
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.main {
	height: 100vh;
	width: 100vw;
	position: relative;
	// background-color: #d4d4d4;
	// background-image: "../../static/bg.jpg";
}
.bgimg{
	position: absolute;width: 100vw;height: 100vh;z-index: 5;
}
.scanBtn {
	width: 50px;
	height: 50px;
	border-radius: 50px;
	padding: 5px;
	z-index: 10;
	box-sizing: border-box;
	background: white;
	position: fixed;
	left: calc(50% - 25px);
	bottom: 250rpx;
	box-sizing: border-box;
	// border: 10px solid #77747432;
	animation: animated-border ease-in-out 1.3s infinite;
	// .icon {
	// 	position: absolute;
	// 	left: 50%;
	// 	top: 50%;
	// 	transform: translate(-50%, -50%);
	// }
}
@keyframes animated-border {
	0% {
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
	}
	100% {
		box-shadow: 0 0 0 20rpx rgba(255, 255, 255, 0);
	}
}

.loginBtn {
	height: 100px;
	margin: 0 10%;
	width: 80%;
	position: fixed;
	bottom: 0;
	display: flex;
	z-index: 20;
	justify-content: space-around;
}

.btnCls {
	height: 80rpx;
	width: 160rpx;
	background: white;
	border-radius: 40rpx;
	text-align: center;
	line-height: 80rpx;
	box-shadow: 5rpx 5rpx 4rpx 2rpx #4d4d4d;
}
</style>
