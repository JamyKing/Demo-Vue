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
      path: '/test',
      name: 'test',
      component: resolve => require(['@/view/test/test'], resolve),
    },
    {
      path: '/editor',
      name: 'editor',
      component: resolve => require(['@/view/component/editor'], resolve),
    },
    {
      path: '/loadIcon',
      name: 'loadIcon',
      component: resolve => require(['@/view/component/loadIcon'], resolve),
    }

  ]
})
