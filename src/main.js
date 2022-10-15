import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入http请求
import axios from 'axios';
// 引入rsa加密模块
import JSEncrypt from "jsencrypt";

Vue.config.productionTip = false;
Vue.use(ElementUI);
// 配置全局变量
Vue.prototype.$http = axios;
// 配置全局变量
Vue.prototype.$jsEncrypt = JSEncrypt;
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
