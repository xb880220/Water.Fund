<template>
	<view>
		<view class="box" @tap="clickItem()">
			<view class="boxTab">
				<view class="left"></view>
				<view class="right"></view>
			</view>
			<view class="boxConter">
				<div class="coImg">
						<img :src="details.productImg" style="" alt="">
				</div>
				
				<view class="cotext" style="">{{details.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CollectItem',
	props:{
		details:{
			type:Object
		}
	},
	data() {
		return {
			
		};
	},
	onReady() {
		console.log(this.details);
	},
	methods:{
		clickItem() {
			this.$navto.navto('/pages/index/productDetail',{id:this.details.id});
		},
	}
};
</script>

<style lang="scss" scoped>
.box {
	width: 100px;
	// margin: 0 auto;
	.boxTab {
		display: flex;
		.left {
			// width: 60px;
			padding: 0 15px;
			line-height: 20px;
			height: 8px;
			font-weight: 400;
			color: #9a9a9a;
			border-radius: 5px 0 0 0;
			background-color: rgba(187, 187, 187, 0.5);
		}
		.right {
			width: 0;
			height: 0;
			border-bottom: 8px solid rgba(187, 187, 187, 0.5);
			border-right: 2px solid transparent;
		}
	}

	.boxConter {
		background-color: #fff;
		width: 100%;
		// min-height: 250px;
		height: 80px;
		border-radius: 0 5px 5px 5px;
		margin-bottom: 10px;
		padding: 5px 5px 0;
		.coImg {
			width: 90px;height: 60px;
			background-color: white;
			>img {
				width: 100%;
				height: 100%;
			}
		}
		.cotext {
			font-size: 10px;
			// line-height: 14px;
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
