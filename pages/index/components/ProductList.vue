<template>
	<view class="pageMain">
		<template v-if="loading">
			<u-loading-page loadingText="数据加载中" :loading="true" loadingMode="spinner"></u-loading-page>		</template>
		<template v-else>
			<view class="fixed">
				<cu-custom bgColor="text-white" :isBack="true">
					<block slot="backText">返回</block>
					<block slot="content">展示内容</block>
				</cu-custom>
			</view>
			<view class="bgcolor" style="height: 200px;"></view>
			<view class="VerticalBox">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="calc(100% - 80px)">
					<view
						class="cu-item"
						:class="item.classflyId == tabCur ? 'text-green cur' : ''"
						v-for="(item, index) in list"
						:key="index"
						@tap="TabSelect"
						:data-id="item.classflyId"
					>
						{{ item.classflyName }}
					</view>
					<view class="" style="height: 80px;width: 100%;"></view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="calc(100% - 80px)" :scroll-into-view="'main-' + mainCur" @scroll="VerticalMain">
					<view class="padding-top padding-lr" v-for="(item, index) in list" :key="index" :id="'main-' + item.classflyId">
						<view class="cu-bar solid-bottom bg-white">
							<view class="action">
								<text class="cuIcon-title text-green"></text>
								{{ item.classflyName }}
							</view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item" v-for="(item2, index2) in item.products" @tap="clickItem(item2)" :key="index2">
								<view class="cu-avatar radius xl" :style="'background-image:url('+item2.productImg+');'"></view>
								<view class="contentBox">
									<view class="title">{{item2.name}}</view>
									<view class="details">{{item2.introduction}}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="" style="height: 80px;width: 100%;"></view>
				</scroll-view>
			</view>
		</template>
	</view>
</template>

<script>
import { getClassListApi, getproductsalllistApi } from '@/config/productList.js';
export default {
	data() {
		return {
			list: [],
			tabCur: 0,
			mainCur: 0,
			verticalNavTop: 0,
			load: true,
			resultList: [],
			loading: true
		};
	},
	onLoad() {},
	onReady() {
		this.getClassList();
		let _this = this;
		setTimeout(() => {
			this.loading = false;
		}, 2000);
		uni.showLoading({
			title: '加载中...',
			mask: true
		});

		uni.hideLoading();
	},
	methods: {
		async getClassList() {
			const result = await getClassListApi({ classifyId: 0 });
			this.list = result;
			this.tabCur = this.list[0].classflyId;
			// this.listCur = this.list[0];
			const result2 = await getproductsalllistApi();
			this.resultList = result2;
		},
		TabSelect(e) {
			this.tabCur = e.currentTarget.dataset.id;
			this.mainCur = e.currentTarget.dataset.id;

			let index = this.list.findIndex(item => item.classflyId === e.currentTarget.dataset.id);
			this.verticalNavTop = (index - 1) * 50;
			console.log(this.verticalNavTop);
		},
		clickItem(val) {
			this.$navto.navto('/pages/index/productDetail',{id:val.id});
		},
		VerticalMain(e) {
			// #ifdef MP-ALIPAY
			return false; //支付宝小程序暂时不支持双向联动
			// #endif
			let that = this;
			let tabHeight = 0;
			if (this.load) {
				for (let i = 0; i < this.list.length; i++) {
					let view = uni
						.createSelectorQuery()
						.in(this)
						.select('#main-' + this.list[i].classflyId)
						.boundingClientRect();
					view.exec(res => {
						this.list[i].top = tabHeight;
						tabHeight = tabHeight + res[0].height;
						this.list[i].bottom = tabHeight;
						console.log(res); // 元素高度
					});
				}
				this.load = false;
			}

			// 这个地方有问题
			let scrollTop = e.detail.scrollTop + 10;
			for (let i = 0; i < this.list.length; i++) {
				if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
					let index = this.list.findIndex(item => item.classflyId === e.currentTarget.dataset.id);
					this.verticalNavTop = (index - 1) * 50;
					this.tabCur = this.list[i].classflyId;
					console.log(scrollTop);
					return false;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bgcolor {
	position: relative;
	height: 100vh;
	background-image: linear-gradient(13deg, #4abffd 0%, #0b93fc 100%);
	// color: #ffffff;
}
.fixed {
	position: fixed;
	z-index: 99;
}

.VerticalNav.nav {
	width: 200upx;
	white-space: initial;
	background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item {
	width: 100%;
	text-align: center;
	background-color: #f1f1f1;
	margin: 0;
	border: none;
	height: 55px;
	line-height: 55px;
	position: relative;
	font-size: 16px;
	
}

.VerticalNav.nav .cu-item.cur {
	background-color: #fff;
}

.VerticalNav.nav .cu-item.cur::after {
	content: '';
	width: 8upx;
	height: 30upx;
	border-radius: 10upx 0 0 10upx;
	position: absolute;
	background-color: currentColor;
	top: 0;
	right: 0upx;
	bottom: 0;
	margin: auto;
}

.VerticalBox {
	display: flex;
	position: absolute;
	top: 80px;
	left: 0;
	width: 100vw;
	box-sizing: border-box;
	padding: 0 0 0;
	height: calc(100vh - 80px);
	border-radius: 20px 20px 0 0;
	z-index: 20;
	overflow: hidden;
}

.VerticalMain {
	background-color: #fff;
	flex: 1;
}

.cu-item {
	padding: 10px 0;
	box-sizing: content-box;
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
</style>
