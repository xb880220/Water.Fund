<template>
	<view>
		<view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]"><slot name="content"></slot></view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar
		};
	},
	name: 'cu-custom',
	computed: {
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var bgImage = this.bgImage;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: false
		},
		bgImage: {
			type: String,
			default: ''
		}
	},
	methods: {
		BackPage() {
			
			 let pages = getCurrentPages();
			        if (pages.length > 1) {
			          wx.navigateBack({//返回
			            delta: 1
			          });
			        }
			        if (pages.length == 1) {
			          wx.reLaunch({
			            url: '/pages/index/index',
			          })
			        }
		
			
			// uni.navigateBack({
			// 	delta: 1
			// });
		}
	}
};
</script>

<style>
.bgcolor {
	background-image: linear-gradient(13deg, #4abffd 0%, #0b93fc 100%);
	color: #ffffff;
}
</style>
