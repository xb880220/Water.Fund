// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		"count": uni.getStorageSync('count') ? uni.getStorageSync('count') : 60,
		"user": uni.getStorageSync('user') ? uni.getStorageSync('user') : "",
		"token": uni.getStorageSync('token') ? uni.getStorageSync('token') : "",
		"isLogin": uni.getStorageSync('token') ? true : false,
		'history':uni.getStorageSync('history') ? uni.getStorageSync('history')  : [],
	},

	getters: {
		getLogin(state) {
			return state.isLogin;
		},
		getCount(state) {
			return state.count;
		},
		getHistory(state) {
			return state.history;
		},
		getUser(state) {
			return state.user;
		},
	},
	mutations: {
		saveCount(state, data){
			state.count = data;
			uni.setStorage({
				key:'count',
				data:state.count
			})
		},
		saveToken(state, data) {
			state.token = data;
			uni.setStorage({
				key:'token',
				data:state.token
			})
			state.isLogin = true;
		},
		saveUser(state, data) {
			state.user = data;
			uni.setStorage({
				key:'user',
				data:state.user
			})
		},
		saveHistory(state, data) {
			if(state.history.length < 10){
				state.history.push(data)
			}else {
				state.history.shift()
				state.history.push(data)
			}
			uni.setStorage({
				key:'history',
				data:state.history
			})
			
		}
	},

	actions: {
		userLogin(context, data) {
			context.commit('saveUser', data);
		},
		
		seachHistory(context, data){
			context.commit('saveHistory', data);
		}
	}
})
export default store
