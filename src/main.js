import Vue from 'vue'
import got from 'got'
// import Vuetify from 'vuetify'
import './plugins/vuetify'
import 'font-awesome/css/font-awesome.min.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = got

// Vue.use(Vuetify, {
//   iconfont: 'fa4'
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
