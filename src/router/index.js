import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/lg/detail/:itemId',
      component: require('@/views/detail/index'),
      name: 'itemDetail'
    },
    {
      path: '/lg/search',
      component: require('@/views/search/index'),
      name: 'search'
    },
    {
      path: '/lg/:key',
      component: require('@/components/router/home'),
      name: 'lg'
    }
  ]
})

export default router;
