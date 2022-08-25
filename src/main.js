import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import "@/assets/css/messenger.scss";
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'

window.Pusher = Pusher;
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;



// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuetify);
Vue.config.productionTip = false
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
