// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// Vue.use(Router)

export default new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      component: resolve => require(['@/view/layout/main'], resolve),
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/view/home/home'], resolve)
        },
        {
          path: '/hello',
          name: 'HelloWorld',
          component: resolve => require(['@/components/HelloWorld'], resolve),
        }
      ]
    }
  ]
})
