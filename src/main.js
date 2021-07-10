import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'https://www.hkgt12d.xyz/shop.php'
Vue.prototype.$http.defaults.headers['content-type'] = 'application/x-www-form-urlencoded'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
