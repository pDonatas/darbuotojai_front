const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env")
});

import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

require('@/assets/js/scripts');
require('@/assets/css/styles.css');

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + localStorage.getItem('token');

  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
