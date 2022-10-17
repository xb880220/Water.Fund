<template>
	<view class="page">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">导览地图</block>
		</cu-custom>
		<movable-area class="movable-area" >
			<movable-view class="movable-view"   style="width: 600px;height: 400px;" @scale="changeZoom" direction="all" scale scale-max="2" x="2400" y="3100" :out-of-bounds="true" >
				<img src="https://zspt2.5iprint.cloud/images/map/map.jpg?v=1" style="width: 100%;height: 100%;"  alt="">
				<view class="mark"   v-for="(item,index) in list" :key="index"	:style="'transform: scale(' + sc + ');top:'+item.yaxis+'px;left:'+item.xaxis+'px'">
					
					
					<view class="" style="background-color: #fff;padding: 2px 5px;border-radius: 5px;max-width:200px" @click="toDes(item.id)">{{item.name}}</view>
					<u-icon name="https://zspt2.5iprint.cloud/images/map/location.png"  ></u-icon>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	import { getproductsalllistApi } from '@/config/home.js';
export default {
	data() {
		return {
			src:"",
			list:[],
			sc: 1
		};
	},
	onReady() {
			console.log("????");
			this.getData()
	},
	methods: {
		async getData() {
			const result = await getproductsalllistApi();
			console.log(result);
			this.list = result
		},
		toDes(id){
			this.$navto.navto('/pages/index/productDetail',{id:id});
		},
		changeZoom(e) {
			// this.zoom++;
			console.log(e);
			this.sc = 1 / e.detail.scale;
			if(this.sc > 1){
				this.sc = 1
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	background-color: antiquewhite;
}
.movable-area {
	width: calc(100vw + 5000px);
	height:calc(100vh + 6000px);
	position: fixed;
	
	left:  -2500px;
	top: -3000px;
}

.movable-view {
	width:calc(100% - 350px);
	height:calc(100% - 550px);
	// position: absolute;
	// top: 0;
	// left: 0;
	background-color: lightskyblue;
}
.mark {
	height: 40px;position: absolute;top: 20px;left: 20px;
}
</style>
