// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		clientHeight: 0
	},
	mutations: {
		setClientHeight (state, height) {
			state.clientHeight = height
		}
	},
	getters: {}
})

export default store
