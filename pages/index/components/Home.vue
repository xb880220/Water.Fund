<template>
	<view>
		<!-- <cu-custom bgColor="bg-blue" >
			<block slot="content">导航栏</block>
		</cu-custom> -->
		<!-- 	<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">列表</block>
		</cu-custom> -->
		<u-modal :show="show" :title="title" @confirm="this.show = false">
			<view class="slot-content"><rich-text :nodes="content"></rich-text></view>
		</u-modal>
		<view class="fixed">
			<cu-custom bgColor="bgcolor text-white"><block slot="content"></block></cu-custom>
		</view>
		<view class="page">
			<u-search shape="round" disabled :showAction="false" @click="$navto.navto('/pages/index/searchPage')"></u-search>
			<view class="margin-top" :key="lkey"><u-swiper :list="list" keyName="content" height="200" class="" indicator indicatorMode="line" circular></u-swiper></view>
			<view class="margin-top-sm"><u-notice-bar :text="text" bgColor="#eaeaea" color="#9A9A9A"></u-notice-bar></view>
			<view class="flex justify-between flex-wrap">
				<view class="menuItem" @tap="showCenter(3)">
					<view class="itemIcon">
						<!-- <u-icon name="photo" class="" size="50"></u-icon>
						 -->
						<view><img style="width: 40px;height: 40px;" src="../../../static/home/01.png" alt="" /></view>
					</view>

					<text>基地简介</text>
				</view>

				<view class="menuItem" v-for="item in result.classfly" :key="id" @tap="$navto.navto('/pages/index/pdList', { id: item.id, title: item.name})">
					<view class="itemIcon">
						
						<view><img style="width: 40px;height: 40px;" :src="item.imgSrc" alt="" /></view>
					</view>

					<text>{{item.name}}</text>
				</view>

				<!-- <view class="menuItem" @tap="$navto.navto('/pages/index/pdList', { id: 8, title: '管道实训场' })">
					<view class="itemIcon">
						<view><img style="width: 40px;height: 40px;" src="../../../static/home/03.png" alt="" /></view>
					</view>

					<text>管道实训场</text>
				</view> -->

				<view class="menuItem" @tap="$navto.navto('/pages/news/index', { type: 2, title: '公告' })">
					<view class="itemIcon">
						<!-- <u-icon name="photo" class="" size="50"></u-icon>
						 -->
						<view><img style="width: 40px;height: 40px;" src="../../../static/home/06.png" alt="" /></view>
					</view>

					<text>公告信息</text>
				</view>

				<view class="menuItem" @tap="showCenter(1)">
					<view class="itemIcon">
						<!-- <u-icon name="photo" class="" size="50"></u-icon>
						 -->
						<view><img style="width: 40px;height: 40px;" src="../../../static/home/04.png" alt="" /></view>
					</view>

					<text>安全须知</text>
				</view>

				<view class="menuItem" @tap="openinfo">
					<view class="itemIcon">
						<!-- <u-icon name="photo" class="" size="50"></u-icon>
						 -->
						<view><img style="width: 40px;height: 40px;" src="../../../static/home/05.png" alt="" /></view>
					</view>

					<text>交通信息</text>
				</view>
			</view>

			<view class="cu-card newCard">
				<view class="header flex justify-between">
					<view class="title">新闻</view>
					<view class="moreBtn" @tap="$navto.navto('/pages/news/index', { type: 1, title: '新闻' })">更多</view>
				</view>
				<view class="newsContent">
					<view v-for="(item, index) in news" :key="index" class="newsItem" @tap="$navto.navto('/pages/news/details', { id: item.id })">
						<img :src="item.photoUrl" alt="" style="" />
						<view style="" class="title">{{ item.title }}</view>
					</view>
					<view class="" style="margin: 0 auto;" v-if="elements.length == 0"><u-empty mode="data" :icon="icon"></u-empty></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getHomeDataApi } from '@/config/home.js';
export default {
	data() {
		return {
			icon: require('../../../static/data.png'),
			text: '',
			list: [],
			news: [],
			lkey: 1,
			title: '',
			content: '',
			show: false,
			result: {},
			jidi: {}
		};
	},

	onReady() {
		console.log('reade');
		this.getHomeData();
	},
	methods: {
		openinfo(e) {
			uni.navigateTo({
				url: '/pages/map/index?details=' + encodeURIComponent(JSON.stringify(this.jidi))
			});
		},
		showCenter(val) {
			if (val == 1) {
				this.title = '安全须知';
				this.content = this.result.safe.content ? this.result.safe.content : '暂无内容';
			} else if (val == 2) {
				this.title = this.result.notice.title ? this.result.notice.title : '公告信息';
				this.content = this.result.notice.context ? this.result.notice.context : '暂无内容';
			} else if (val == 3) {
				this.title = this.result.jidi.name ? this.result.jidi.name : '基地简介';
				this.content = this.result.jidi.synopsis ? this.result.jidi.synopsis : '暂无内容';
			}
			this.show = true;
		},
		async getHomeData() {
			const result = await getHomeDataApi();
			console.log(result);
			this.$store.commit('saveCount', parseInt(result.base.content));
			this.result = result;
			this.list = result.banner;
			// this.lkey++
			// this.list = result.banner.map((item)=>item.content)
			this.news = result.news;
			this.text = result.notice.title;
			this.jidi = this.result.jidi;
			console.log(this.result.jidi);
		}
	}
};
</script>

<style lang="scss" scoped>
.fixed {
	left: 0;
}

.page {
	height: 100vh;
	width: 100vw;
	box-sizing: border-box;
	padding: 10px 20px 0;
	// background: white;
	background-image: linear-gradient(#fff, #f4f4f4);
}

.menuItem {
	// margin-top: 20px;
	width: 100px;
	text-align: center;
	margin-top: 15px;
	padding-top: 10px;

	> text {
		font-size: 12px;
	}

	.itemIcon {
		width: 50px;
		height: 50px;
		margin: 0 auto;
	}
}

.newCard {
	box-shadow: 0px 0px 7px 1px rgba(41, 32, 38, 0.07);
	border-radius: 5px;
	box-sizing: content-box;
	padding: 10px 10px;
	margin-top: 20px;
	margin-bottom: 90px;
	background-color: rgba(255, 255, 255, 0);

	.header {
		line-height: 18px;

		.title {
			font-size: 16px;
			color: #000;
		}

		.moreBtn {
			font-size: 14px;
			color: #8d8d8d;
		}
	}

	.newsContent {
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
		background-color: rgba(255, 255, 255, 0);
		height: auto;

		.newsItem {
			overflow: hidden;
			font-size: 16px;
			// line-height: 18px;
			width: 48%;
			border-radius: 5px;
			margin-top: 10px;

			// height: calc(100vw / 3.2);
			// background: #8d8d8d;
			img {
				width: 100%;
				height: calc(100vw / 4);
			}

			.title {
				height: 20px;
				font-size: 16px;
				margin-top: 0;
				line-height: 20px;
				padding-left: 5px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 100%;
			}
		}
	}
}
</style>
