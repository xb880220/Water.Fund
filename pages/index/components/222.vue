<template>
	<view class="pageMain">
		<template v-if="loading">
			<u-loading-page loadingText="Hello" :loading="true" loadingMode="spinner"></u-loading-page>
		</template>
		<template v-else>
			<view class="fixed">
				<cu-custom bgColor="text-white">
					<!-- <block slot="backText">返回</block> -->
					<block slot="content">产品内容</block>
				</cu-custom>
			</view>
			<view class="bgcolor" style="height: 200px;"></view>
			<view class="VerticalBox">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="calc(100% - 80px)">
					<view class="cu-item" :class="index == tabCur ? 'text-green cur' : ''" v-for="(item, index) in list" :key="index" @tap="TabSelect" :data-id="index">
						Tab-{{ item.name }}
					</view>
					<view class="" style="height: 80px;width: 100%;"></view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="calc(100% - 80px)" :scroll-into-view="'main-' + mainCur" @scroll="VerticalMain">
					<view class="padding-top padding-lr" v-for="(item, index) in list" :key="index" :id="'main-' + index">
						<view class="cu-bar solid-bottom bg-white">
							<view class="action">
								<text class="cuIcon-title text-green"></text>
								Tab-{{ item.name }}
							</view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item" v-for="(item, index) in resultList" @tap="clickItem(item)" :key="index">
								<view class="cu-avatar radius xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
								<view class="contentBox">
									<view class="title">这是文字头哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</view>
									<view class="details">容拉啦啦啦啦啦啦容拉啦啦啦啦啦啦容拉啦啦啦啦啦啦容拉啦啦啦啦啦啦容拉啦啦啦啦啦啦容拉啦啦啦啦啦啦</view>
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
export default {
	data() {
		return {
			list: [],
			tabCur: 0,
			mainCur: 0,
			verticalNavTop: 0,
			load: true,
			resultList: [1, 2, 3],
			loading:true
		};
	},
	onLoad() {
		
	},
	onReady() {
		let _this = this
		setTimeout(()=>{
			this.loading = false
		},2000)
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		let list = [{}];
		for (let i = 0; i < 26; i++) {
			list[i] = {};
			list[i].name = String.fromCharCode(65 + i);
			list[i].id = i;
		}
		this.list = list;
		this.listCur = list[0];
		uni.hideLoading();
	},
	methods: {
		TabSelect(e) {
			this.tabCur = e.currentTarget.dataset.id;
			this.mainCur = e.currentTarget.dataset.id;
			this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
			console.log(this.verticalNavTop);
		},
		clickItem() {
			this.$navto.navto('/pages/index/productDetail');
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
						.select('#main-' + this.list[i].id)
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
			let scrollTop = e.detail.scrollTop + 10;
			for (let i = 0; i < this.list.length; i++) {
				if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
					this.verticalNavTop = (this.list[i].id - 1) * 50;
					this.tabCur = this.list[i].id;
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
}

.VerticalNav.nav .cu-item {
	width: 100%;
	text-align: center;
	background-color: #f1f1f1;
	margin: 0;
	border: none;
	height: 50px;
	position: relative;
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
		width: 100%;
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
