import '@/assets/js/rem'
import 'normalize.css'
import '@/assets/css/reset'

import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/components/App'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/js/bcsdk'

Vue.use(VueResource)
Vue.use(VueLazyLoad)
Vue.use(infiniteScroll)
Vue.use(VueAwesomeSwiper)

Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
// Vue.http.options.headers = {'x-request-type': 'subscriptions'}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
