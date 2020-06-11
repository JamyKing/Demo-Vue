// import Vue from 'vue'

// Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isCollapse: false
	},
	mutations: {
		collapseMenu (state) {
			state.isCollapse = !state.isCollapse
		}
	},
	getters: {}
})

export default store
