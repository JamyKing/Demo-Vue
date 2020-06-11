// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/view/home/home'], resolve)
    },
    {
      path: '/hello',
      name: 'hello',
      component: resolve => require(['@/components/HelloWorld'], resolve),
    }
  ]
})
