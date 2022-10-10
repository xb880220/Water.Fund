<style lang="scss">
@import 'colorui/main.css';
@import 'colorui/icon.css';
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
</style>
<script>
import { mapMutations, mapActions } from 'vuex';
import Vue from 'vue';
export default {
	data() {
		return {
			timer: null
		};
	},
	onLaunch: function() {
		let _this = this;
		uni.addInterceptor('navigateTo', {//监听跳转
						invoke(e) {
							console.log(e.url,3333);
						   if(e.url == '/pages/login/login?' ||e.url == 'userLogin?' || e.url == 'staffLogin?' || e.url == 'userRegister?'){
							   // 结束计时
							   
								clearInterval(_this.timer);
								_this.timer = null
						   }else {
							   // 开始计时
							   let isLogin = _this.judgeLogin();
							   
							   if (!isLogin) {
							   	_this.openTimer(_this.$store.getters.getCount);
							   }
						   }
						    return true;
						  },
						
					}),
		
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
	},
	onShow: function() {
		let _this = this;
		let isLogin = this.judgeLogin();
		
		let pages = getCurrentPages();
		
		let currentRoute = pages[pages.length-1]?.route;
		
		
		if (!isLogin) {
			this.openTimer(this.$store.getters.getCount);
		}
		this.$store.watch(
			(state, getters) => {
				return state.count;
			},
			data => {
				if(data < 0){
					if(currentRoute !== "pages/login/login"){
						_this.$navto.navto('/pages/login/login');
					}
					clearInterval(_this.timer);
					_this.timer = null
					return
				}
				
				if (!isLogin) {
					_this.openTimer(data);
				}
			}
		);
		// console.log('App Show');
		// this.getHomeData();
	},
	onHide: function() {
		// console.log('App Hide')
	},
	methods: {
		judgeLogin() {
			return this.$store.getters.getLogin;
		},
		openTimer(val = 60) {
			console.log('开始倒计时',val);
			let count = val;
			// let timer;
			let _this = this;
			if (this.timer) {
				clearInterval(_this.timer);
			}
			this.timer = setInterval(function fun() {
				if (count < 0) {
					
					let pages = getCurrentPages();
					
					let currentRoute = pages[pages.length-1]?.route;
					
					clearInterval(_this.timer); //倒计时为0之后停止倒计时
					console.log('倒计时结束1');
					_this.timer = null
					
					if(currentRoute !== "pages/login/login"){
						_this.$navto.navto('/pages/login/login');
					}
					
				}

				if (_this.$store.getters.getLogin) {
					clearInterval(_this.timer); //倒计时为0之后停止倒计时
					console.log('倒计时结束2');
					_this.timer = null
				}
				console.log(count);
				count--;
			}, 1000);
		}
	}
};
</script>

<style>
.pageMain {
	min-height: 100vh;
	width: 100vw;
	background: white;
}

.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0px 40upx 0px;
	justify-content: space-between;
}

.nav-li {
	padding: 30upx;
	border-radius: 12upx;
	width: 45%;
	margin: 0 2.5% 40upx;
	background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: '';
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10upx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-title {
	font-size: 32upx;
	font-weight: 300;
}

.nav-title::first-letter {
	font-size: 40upx;
	margin-right: 4upx;
}

.nav-name {
	font-size: 28upx;
	text-transform: Capitalize;
	margin-top: 20upx;
	position: relative;
}

.nav-name::before {
	content: '';
	position: absolute;
	display: block;
	width: 40upx;
	height: 6upx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: '';
	position: absolute;
	display: block;
	width: 100upx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40upx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36upx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30upx;
	top: 30upx;
	font-size: 52upx;
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
}

.text-light {
	font-weight: 300;
}

@keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

@-webkit-keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}
</style>
