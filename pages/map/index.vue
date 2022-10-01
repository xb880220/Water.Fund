<template>
	<view class="pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交通信息</block>
		</cu-custom>
		<view class="info" style="">
			<view class="" v-cloak>
				<text class="title">地址:</text>{{details.address}}
			</view>
			<view class="" v-cloak>
				<text class="title">交通方式:</text>{{details.buses}}
			</view>
			
		</view>
		<map id="myMap" style="width: 100vw; height: calc(100vh - 44px);" :latitude="latitude" :longitude="longitude" :markers="markers" show-location></map>
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
	onLoad(option) {
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
}
.info {
	font-weight: 600;
	background-color: white;
	position: absolute;
	bottom: 20px;
	width: 96%;
	padding: 10px 30px;
	border-radius: 20px;
	left: 2%;
	z-index: 2000;
	box-shadow: 4px 4px 7px #c3c3c3;
}
.title {
	width: calc(4em + 3px);
	text-align: right;
	line-height: 20px;
	font-weight: 500;
}
</style>
