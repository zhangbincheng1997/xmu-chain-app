import Vue from 'vue';
import App from './App';
import { router } from './router';

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
