import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userInfo: {},
		token: ''
	},
	mutations: {
		// 非车保单信息  用于报案
		saveUserInfo(state, data) {
			state.userInfo = data
		},
		saveToken (state, data) {
			state.token = data
		}
	}
})

export default store
