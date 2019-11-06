import Vue from 'vue'
import App from './App'
import store from './store'
import customHeader from './components/uni-nav-bar.vue'
import constant from './util/constant.js'
// import Api from './util/api.js'

Vue.config.productionTip = false
Vue.component('custom-header', customHeader)
Vue.prototype.$store = store
Vue.prototype.$constant = constant
// Vue.prototype.$axios = Api

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
