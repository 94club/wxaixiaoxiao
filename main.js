import Vue from 'vue'
import App from './App'
import store from './store'
import customHeader from './components/uni-nav-bar.vue'
import constant from './util/constant.js'

Vue.config.productionTip = false
Vue.component('custom-header', customHeader)
Vue.prototype.$store = store
Vue.prototype.$constant = constant

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
