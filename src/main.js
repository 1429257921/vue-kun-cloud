import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入http请求
import axios from 'axios';
// 引入rsa加密模块
import JSEncrypt from "jsencrypt";
// 引入vue-cookie
import VueCookies from 'vue-cookies';


Vue.config.productionTip = false;
// 配置全局变量
Vue.use(ElementUI);
// 配置全局变量
Vue.prototype.$http = axios;
// 配置全局变量
Vue.prototype.$jsEncrypt = JSEncrypt;
// 配置全局变量
Vue.use(VueCookies)
// 移动端页面适配
Vue.prototype.$getComponentSize = function () {
  return window.innerWidth < 480 ? 'mini' : null
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// new Vue({
//   el: '#app',
//   render: h => h(App)
// });
