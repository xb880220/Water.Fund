<template>
	<view class="main">
		<!-- 


		<view class="star star1"></view>
		<view class="star star2"></view>
		<view class="star star3"></view>
		<view class="star star4"></view>
		<view class="star star5"></view>
		<view class="star star6"></view>
		<view class="star star7"></view> -->

		<view v-for="(str,index) in starList" :key="index">
			<view class="star" :style="[{position:'absolute'},
			{background:'white'},
			{boxSizing:'content-box'},
			{boxShadow:'0px 0px 20px 20px #ffffff20'},
			{zIndex:'200'},
			{width:`${str.size}px`},
			{height:`${str.size}px`},
			{borderRadius:`${str.size/2}px`},
			{animationDelay:`${str.time}s`},
			{top:`${str.top}px`},
			{left:`${str.left}%`}
			]"></view>

		</view>


		<view class="bgimg" style="">
			<img :src="baseUrl+'wechat/share/homepage.jpg'" style="width: 100%;height: 100%;" alt="">
		</view>
		<view class="scanBtn" @tap="openScanCode">
			<u-icon name="scan" color="#0B78D6" size="40" class="icon"></u-icon>
		</view>
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
				baseUrl: this.$baseUrl,
				starList: []
			};
		},
		onLoad() {
			this.buildStar();
		},
		methods: {


			clickItem(id) {
				this.$navto.navto('/pages/index/productDetail', {
					id: id
				});
			},
			openScanCode() {
				let _this = this;
				// 调起条码扫描
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						let id = res.result.split('cloud/wechat/qrcode?id=')[1];
						if (id) {
							_this.clickItem(id);
						} else {
							uni.showToast({
								title: '请扫描指定二维码',
								icon: 'none',
								duration: 2000
							});
						}



						//TODO handle the exception

					},


				});
			},


			buildStar() {
				let list = [];

				for (var i = 0; i < 150; i++) {
					var star = {};
					star.size = this.RandomNum(1, 9);
					star.top = this.RandomNum(50, 500);
					var left = this.RandomNum(10, 90);
					if (star.top > 100 && star.top < 450) {
						while (left > 25 && left < 65) {
							left = this.RandomNum(10, 90)
						}
					}
					star.left = left;
					star.time = this.RandomNum(1, 10);
					list.push(star);
				}
				this.starList = list;
			},

			RandomNum(Min, Max) {
				var Range = Max - Min;
				var Rand = Math.random();
				if (Math.round(Rand * Range) == 0) {
					return Min + 1;
				} else if (Math.round(Rand * Max) == Max) {
					return Max - 1;
				} else {
					var num = Min + Math.round(Rand * Range) - 1;
					return num;
				}
			}

		}
	};
</script>

<style lang="scss">
	.star {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 400px;
		height: 400px;
		opacity: 0;
		animation: star 2.5s ease-in infinite;
	}

	.star1 {
		position: absolute;
		top: 200px;
		left: 10%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 2px;
		height: 2px;
		background: white;
		box-sizing: content-box;
		border-radius: 1px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		animation-delay: 4.8s;

	}

	.star2 {
		position: absolute;
		top: 100px;
		left: 90%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 8px;
		height: 8px;
		background: white;
		box-sizing: content-box;
		border-radius: 4px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		// background: url(images/bg_star_2.png) no-repeat center center; 
		animation-delay: 4s;
	}

	.star3 {
		position: absolute;
		top: 400px;
		left: 40%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 8px;
		height: 8px;
		background: white;
		box-sizing: content-box;
		border-radius: 4px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		// background: url(images/bg_star_2.png) no-repeat center center; 
		animation-delay: 3.8s;
	}

	.star4 {
		position: absolute;
		top: 100px;
		left: 20%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 4px;
		height: 4px;
		background: white;
		box-sizing: content-box;
		border-radius: 2px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		// background: url(images/bg_star_2.png) no-repeat center center; 
		animation-delay: 7.8s;
	}

	.star5 {
		position: absolute;
		top: 50px;
		left: 70%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 6px;
		height: 6px;
		background: white;
		box-sizing: content-box;
		border-radius: 3px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		// background: url(images/bg_star_2.png) no-repeat center center; 
		animation-delay: 2.8s;
		// background: url(images/bg_star_3.png) no-repeat center center; animation-delay: 1.7s;
	}

	.star6 {
		position: absolute;
		top: 350px;
		left: 12%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 6px;
		height: 6px;
		background: white;
		box-sizing: content-box;
		border-radius: 3px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		// background: url(images/bg_star_2.png) no-repeat center center; 
		animation-delay: 3.8s;
		// background: url(images/bg_star_3.png) no-repeat center center; animation-delay: 1.7s;
	}

	.star7 {
		position: absolute;
		top: 250px;
		left: 5%;
		// background: url(images/bg_star_1.png) no-repeat center center;
		width: 8px;
		height: 8px;
		background: white;
		box-sizing: content-box;
		border-radius: 4px;
		box-shadow: 0px 0px 20px 20px #ffffff20;
		z-index: 200;
		// background: url(images/bg_star_2.png) no-repeat center center; 
		animation-delay: 8.8s;
		// background: url(images/bg_star_3.png) no-repeat center center; animation-delay: 1.7s;
	}

	@keyframes star {
		10% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	//````````````````````````````````````

	.main {
		height: 100vh;
		width: 100vw;
		position: relative;
		// background-color: #d4d4d4;
		// background-image: "../../static/bg.jpg";
	}

	.bgimg {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: 5;
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

	// .btnCls {
	// 	height: 80rpx;
	// 	width: 160rpx;
	// 	background: white;
	// 	border-radius: 40rpx;
	// 	text-align: center;
	// 	line-height: 80rpx;
	// 	box-shadow: 0px 6px 7px 0px rgba(25, 25, 25, 0.38);
	// }
.btnCls {
	background-image: url("@/static/sy.png");
	background-size: 100% 100%;
	height: 6vh;
	width: 25vw;
	font-size: 16px;
	font-weight: 600;
	// background: white;
	// border-radius: 40rpx;
	text-align: center;
	line-height: 6vh;
	// box-shadow: 0px 6px 7px 0px rgba(25, 25, 25, 0.38);
}

</style>
