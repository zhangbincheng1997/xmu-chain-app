import Vue from 'vue';
import App from './App';
import { router } from './router';

// 全局变量注册
import global from './utils/global'
Vue.use(global)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
