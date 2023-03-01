<template>
	<view class="pageMain">
		<view class="fixed">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交通信息</block>
		</cu-custom>
		</view>
		<view class="info" style="">
			<view class="" style="border-bottom: 1px solid #e3e3de;" v-cloak>
				<img  class="img" src="../../static/home/dingwei.png" alt="" /><text class="title">基地地址：</text><text style="font-weight: 500;">{{details.address}}</text>
			</view>
			<view class="" v-cloak>
				<img  class="img" src="../../static/home/gongjiao.png" alt="" /><text class="title">交通信息：</text><text style="font-weight: 500;">{{details.buses}}</text>
			</view>
			
		</view>
		<map id="myMap" style="width: 100vw; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="markers" show-location></map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mapCtx: null,
			latitude: 39.916706,
			longitude: 116.404269,
			markers: [],
			details: {}
		};
	},
	onLoad(option) {debugger;
		this.details = JSON.parse(decodeURIComponent(option.details)) ;
		this.latitude = this.details.latitude;
		this.longitude = this.details.longitude;
		this.markers = [{ id: 1, latitude: this.latitude, longitude: this.longitude }];
		this.mapCtx = wx.createMapContext('myMap');

		// var that = this;
		// 		this.mapCtx.moveToLocation({
		// 					latitude: that.latitude,
		// 					longitude: that.longitude
		// 				});

		// wx.getLocation({
		// 	type: 'wgs84',
		// 	success: function(res) {
		// 		that.setData({
		// 			latitude: that.latitude,
		// 			longitude: that.longitude
		// 		});
		// 	}
		// });
	},
	onReady: function(e) {
		//创建 map 上下文 MapContext 对象。
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.pageMain {
	position: relative;
	height: 100vh;
}
.info {
	font-weight: 600;
	height: 100px;
	background-color: white;
	position: absolute;
		left: 2%;
	bottom: 20px;
	width: 96%;
	padding: 10px 30px;
	border-radius: 10px;

	z-index: 2000;
	box-shadow: 4px 4px 7px #c3c3c3;
}
.fixed {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
}
.title {
	width: calc(4rem + 15px);
	text-align: justify;
	line-height: 30px;
	//font-weight: 500;
	display: inline-block;
	font-size: 15px;
}
.img{
	width:16px;
	height: 16px;
	vertical-align: middle;
	margin-right: 10px;
}
</style>
