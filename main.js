import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import store from './store'

Vue.prototype.$store = store
Vue.prototype.$baseUrl = "http://zspt.pineapple.fund/"
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import * as navTo from '@/common/navto' //全局封装跳转
Vue.prototype.$navto = navTo;

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

require('./config/request')(app)


app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif