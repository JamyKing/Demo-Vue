// import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
