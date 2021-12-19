import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import App from './App.vue'
import router from './router'
import store from './store'

require('@/assets/js/scripts');
require('@/assets/css/styles.css');

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

axios.defaults.showLoader = true;

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + localStorage.getItem('token');

  return config;
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    axios.interceptors.request.use(
        config => {
          if (config.showLoader) {
              if (!store.getters.isLoading) {
                  store.dispatch('loader/pending');
              }
          }
          return config;
        },
        error => {
          if (error.config.showLoader) {
              if (store.getters.isLoading) {
                  store.dispatch('loader/done');
              }
          }
          return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        response => {
          if (response.config.showLoader) {
              if (!store.getters.isLoading) {
                  store.dispatch('loader/done');
              }
          }

          return response;
        },
        error => {
          let response = error.response;

          if (response.config.showLoader) {
              if (!store.getters.isLoading) {
                  store.dispatch('loader/done');
              }
          }

          if (error.response.status === 401) {
            localStorage.clear();
          }

          return Promise.reject(error);
        }
    )
  }
}).$mount('#app')
