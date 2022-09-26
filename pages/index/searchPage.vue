<template>
	<view class="pageMain">
		<cu-custom bgColor="bgcolor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">搜索</block>
		</cu-custom>
		<view class="page">
			<u-search placeholder="全局搜索" :clearabled="true" animation showAction @custom="startSearch" v-model="searchVal"></u-search>
			<view class="history" v-if="historyList.length != 0">
				<view class="title">历史记录</view>
				<view class="content">
					<view class="item" v-for="(item, index) in historyList" @tap="clickHistory(item)" :key="index">{{ item }}</view>
				</view>
			</view>
			<view class="listItem">
				<view class="title" >搜索结果</view>

				<u-tabs :list="list1" @click="click" v-if="resultList.length != 0"></u-tabs>

				<view class="classItem" v-if="resultList.length != 0 && searchIndex!=2">
					<view class="title">设备</view>

					<view class="content cu-list menu-avatar">
						<view class="cu-item" v-for="(item, index) in deviceList" @tap="clickItem(item)" :key="index">
							<view class="cu-avatar radius xl" :style="'background-image:url(' + item.img + ');'"></view>
							<view class="contentBox">
								<view class="title">{{ item.name }}</view>
								<view class="details">{{ item.introduction }}</view>
							</view>
						</view>
						<!-- <view class="item" v-for="(item,index) in resultList" @tap="clickItem(item)" :key="index">
								
							</view> -->
					</view>
				</view>

				<view class="news classItem" v-if="resultList.length != 0&& searchIndex!=1">
					<view class="title">新闻</view>
					<ListItem v-for="(item, index) in newsList":details="item" :key="index"></ListItem>
				</view>
				
				<view class="" style="margin: 0 auto;" v-if="resultList.length == 0"><u-empty mode="search" :icon="icon"></u-empty></view>
				
			</view>
		</view>
	</view>
</template>

<script>
import ListItem from '@/pages/news/components/ListItem.vue';
import { searchallwebsitelistApi } from '@/config/seach.js';
export default {
	components: {
		ListItem
	},
	data() {
		return {
			icon: require('../../static/search.png'),
			searchVal: '',
			searchIndex:0,
			deviceList: [],
			newsList: [],
			historyList: [],
			resultList: [],
			list1: [
				{
					name: '全部'
				},
				{
					name: '设备'
				},
				{
					name: '新闻'
				}
			]
		};
	},
	onLoad() {
		this.historyList = this.$store.getters.getHistory;
	},
	methods: {
		async startSearch() {
			console.log('开始搜索');
			if (this.$store.getters.getHistory.indexOf(this.searchVal) < 0) {
				this.$store.commit('saveHistory', this.searchVal);
			}
			const result = await searchallwebsitelistApi({ name: this.searchVal });
			result.forEach(item => {
				if (item.resultType == 1) {
					this.deviceList = item.resiltList;
				} else if (item.resultType == 2) {
					this.newsList = item.resiltList;
				}
			});
			this.resultList = result;
			// this.historyList.push(this.searchVal)
		},
		async clickHistory(val) {
			this.searchVal = val;
			this.startSearch();
		},
		clickItem(val) {},
		click(item){
			this.searchIndex = item.index;
			// console.log(item,index);
		}
	}
};
</script>

<style lang="scss" scoped>
	.pageMain {}
.cu-item {
	padding: 10px 0;
	box-sizing: content-box;
}
.classItem {
	margin-bottom: 20px;
	background: white;
	.title {
		font-size: 14px !important;
		color: #a2a2a2;
	}
	
}
.contentBox {
	position: absolute;
	top: 0;
	left: 100px;
	width: calc(100% - 120px);
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
		color: #a2a2a2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 14px;
		line-height: 14px;
	}
}

.page {
	padding: 10px 20px 0;
	.history {
		padding: 10px 0;
		.title {
			font-size: 16px;
			color: #585757;
			line-height: 31px;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.item {
				margin: 10px;
				font-size: 14px;
				color: #8e8e8e;
			}
		}
	}
	.listItem {
		padding: 10px 0;
		.title {
			font-size: 16px;
			color: #585757;
			line-height: 31px;
		}
		.content {
			min-height: 200px;
		}
	}
}
</style>
