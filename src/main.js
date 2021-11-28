import Vue from 'vue';
import App from './App';
import { router } from './router';

// 剪贴板功能
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 全局方法注册
import * as utils from '@/utils/utils'
Object.keys(utils).forEach(key => {
  Vue.prototype[key] = utils[key]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
