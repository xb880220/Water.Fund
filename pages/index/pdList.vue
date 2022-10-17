<template>
	<view class="u-page pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ title }}</block>
		</cu-custom>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<scroll-view class="" scroll-y scroll-with-animation :scroll-into-view="'main-' + mainCur" >
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item2, index2) in indexList" @tap="clickItem(item2)" :key="index2">
					<view class="cu-avatar radius xl" :style="'background-image:url(' + item2.productImg + ');'"></view>
					<view class="contentBox">
						<view class="title">{{ item2.name }}</view>
						<view class="details">{{ item2.introduction }}</view>
					</view>
				</view>
			</view>

			<view class="" style="height: 80px;width: 100%;"></view>
		</scroll-view>
	</view>
</template>

<script>

import { getClassListApi} from '@/config/productList.js';
export default {
	components: {},
	data() {
		return {
			classId:null,
			title:"",
			indexList: [],
			scrollTop: 0,
			// config: {
			// 	pageIndex: 1,
			// 	pageSize: 10,
			// 	type: 1
			// }
		};
	},
	onLoad(option) {
		this.id= option.id;
		this.title = option.title
		this.loadmore(this.id);
		this.switchTimer = true;
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	// onReachBottom() {
	// 	this.loadmore();
	// },
	methods: {
		// scrolltolower(e) {
		// 	debugger;
		// 	// this.config.pageIndex++;
		// 	//this.loadmore(this.id);
		// },
		clickItem(val) {
			this.$navto.navto('/pages/index/productDetail',{id:val.id});
		},
		async loadmore(id) {
			const result = await getClassListApi({classifyId:id});
			this.title = result[0].classflyName
			for (let i = 0; i < result[0].products.length; i++) {
				this.indexList.push(result[0].products[i]);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.wrap {
	height: 200vh;
}
.contentBox {
	position: absolute;
	top: 0;
	left: 100px;
	width: calc(100% - 100px);
	padding: 10px 0 10px;
	.title {
		font-size: 16px;
		line-height: 16px;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.details {
		margin-top: 5px;
		width: 100%;
		color: #7d7d7d;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 14px;
		line-height: 14px;
	}
}
.cu-item {
	padding: 10px 0;
	box-sizing: content-box;
}
</style>
