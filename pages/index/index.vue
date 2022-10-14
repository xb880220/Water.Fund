<template>
	<view class="">
		<template v-if="loading">
			<u-loading-page  :loading="true" loadingMode="spinner"></u-loading-page>
		</template>
		<template v-else>
			<Home v-if="checked == 0"></Home>
			<Navigation v-else-if="checked == 1"></Navigation>
			<ProductList v-else-if="checked == 2"></ProductList>
			<Mine v-else-if="checked == 3"></Mine>
			<CustomTabber :checked="checked" @change="changeChecked"></CustomTabber>
		</template>
	</view>
</template>

<script>
import Navigation from './components/Navigation.vue';
import ProductList from './components/ProductList.vue';
import Mine from './components/Mine.vue';
import Home from './components/Home.vue';
// import Location from './components/Location.vue';
import CustomTabber from '@/components/CustomTabber.vue';
export default {
	components: {
		Navigation,
		CustomTabber,
		Home,
		ProductList,
		Mine
	},
	data() {
		return {
			checked: 0,
			loading: true
		};
	},
	onLoad() {
		let _this = this;
		let isLogin = this.judgeLogin();
		uni.$u.http.setConfig((config) => {
		    /* config 为默认全局配置*/
		    config.header ={Authorization:'Bearer '+ uni.getStorageSync('token')}; /* 根域名 */
			console.log("设置token",config);
		    return config
		})
		// _this.$navto.navto('/pages/login/login')
		// console.log(isLogin);
		// setTimeout(() => {
		// 	if(!isLogin){
		// 		_this.$navto.navto('/pages/login/login')
		// 	}
			_this.loading = false;
		// }, 500);
	},
	methods: {
		judgeLogin(){
			return this.$store.getters.getLogin;
		},
		changeChecked(val) {
			console.log(val);
			this.checked = val;
		},
	}
};
</script>

<style scoped></style>
