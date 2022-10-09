<template>
	<view class="tabbar">
		<div class="bottom"></div>
		<view class="btnbox">
			<view class="btn" :class="checked !== 0 ? 'activite' : ''" @tap="clickTabber(0)">
				<img src="../static/tabber/home.png" alt="" />
				<view class="">首页</view>
			</view>
			<view class="btn" :class="checked !== 1 ? 'activite' : ''" @tap="clickTabber(1)">
				<img src="../static/tabber/browse.png" alt="" />
				<view class="">导览</view>
			</view>
		</view>

		<view class="btnbox">
			<view class="btn" :class="checked !== 2 ? 'activite' : ''" @tap="clickTabber(2)">
				<img src="../static/tabber/catalog.png" alt="" />
				<view class="">目录</view>
			</view>
			<view class="btn" :class="checked !== 3 ? 'activite' : ''" @tap="clickTabber(3)">
				<img src="../static/tabber/mine.png" alt="" />
				<view class="">我的</view>
			</view>
		</view>

		<view class="cenBtn" @tap="openScanCode">
			
				<u-icon name="scan"  color="#6fa7fb" size="40"></u-icon>
			
			
		</view>
		<view class="bgl"></view>
		<view class="bgr"></view>
		<img src="../static/tabber.png" alt="" />
	</view>
</template>

<script>
export default {
	name: 'Tabber',
	props: {
		checked: {
			default: 0,
			type: Number,
			browse: require('../static/tabber/browse.png')
		}
	},
	data() {
		return {};
	},
	methods: {
		clickTabber(val) {
			this.$emit('change', val);
		},
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
<style lang="scss" scoped>
.activite {
	filter:grayscale(80%);
	
}
.tabbar {
	z-index: 999;
	// background: linear-gradient(90deg, #fff, #bbb);
	// position: relative;
	width: 100vw;
	height: 70px;
	position: fixed;
	display: flex;
	justify-content: space-between;
	bottom: 0;
	left: 0;
	.bottom {
		height: 10px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: white;
	}
	// background: #000;
	> img {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translate(-50%, 0);
		// background-image: url("@/static/tabber.png");
		width: 312px;
		height: 60px;
		margin: 0 auto;
	}
	.bgl {
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 60px;
		background-color: #fff;
	}
	.bgr {
		position: absolute;
		top: 0;
		right: 0;
		width: 100px;
		height: 60px;
		background-color: #fff;
	}

	.cenBtn {
		border: 1px solid #ffffff40;
		position: absolute;
		top: -16px;
		left: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		color: #6fa7fb;
		transform: translate(-50%, 0);
		background-color: #fff;
		width: 50px;
		height: 50px;
		box-shadow: 0 0 0 5px #ffffff8c;
		border-radius: 50px;
	}
	.btnbox {
		z-index: 1000;
		width: 40%;
		display: flex;
		justify-content: space-around;
		.btn {
			width: 100%;
			text-align: center;
			font-size: 12px;
			font-weight: 400;
			color: #6fa7fb;
			> img {
				margin-top: 12px;
				width: 20px;
				height: 20px;
			}
		}
	}
	// background: #333;
}
</style>
