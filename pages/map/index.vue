<template>
	<view class="pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交通信息</block>
		</cu-custom>
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
			markers: []
		};
	},
	onReady: function(e) {
		//创建 map 上下文 MapContext 对象。
		this.mapCtx = wx.createMapContext('myMap');
	},
	methods: {}
};
</script>

<style></style>
