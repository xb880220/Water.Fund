<template>
	<view class="u-page pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" v-cloak>{{title}}</block>
		</cu-custom>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<!-- <u-list @scrolltolower="scrolltolower"> -->
		<ListItem v-for="(item, index) in indexList" :details="item" :key="index"></ListItem>
		<!-- </u-list> -->
	</view>
</template>

<script>
	import { getarticlepagedlistApi } from '@/config/news.js';
import PageTimerMixins from '@/mixins/pageTimerMixins.js';
import ListItem from './components/ListItem.vue';
export default {
	mixins: [PageTimerMixins],
	components: {
		ListItem
	},
	data() {
		return {
			title:null,
			indexList: [],
			scrollTop: 0,
			config:{
				pageIndex:1,
				pageSize:10,
				type:null
			},
			urls: [
				'https://cdn.uviewui.com/uview/album/1.jpg',
				'https://cdn.uviewui.com/uview/album/2.jpg',
				'https://cdn.uviewui.com/uview/album/3.jpg',
				'https://cdn.uviewui.com/uview/album/4.jpg',
				'https://cdn.uviewui.com/uview/album/5.jpg',
				'https://cdn.uviewui.com/uview/album/6.jpg',
				'https://cdn.uviewui.com/uview/album/7.jpg',
				'https://cdn.uviewui.com/uview/album/8.jpg',
				'https://cdn.uviewui.com/uview/album/9.jpg',
				'https://cdn.uviewui.com/uview/album/10.jpg'
			]
		};
	},
	onLoad(option) {
		this.config.type = option.type;
		this.title = option.type==1?'新闻':'公告'
		console.log(option);
		this.loadmore();
		this.switchTimer = true;
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onReachBottom() {
		this.loadmore();
	},
	methods: {
		scrolltolower(e) {
			this.config.pageIndex++;
			this.loadmore();
		},
		async loadmore() {
			
			const result = await getarticlepagedlistApi(this.config)
			
			for (let i = 0; i < result.items.length; i++) {
				this.indexList.push(result.items[i]);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.wrap {
	height: 200vh;
}
</style>
