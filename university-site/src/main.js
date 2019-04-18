// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/plugin/bootstrap/css/bootstrap.min.css'
Vue.config.productionTip = false;
Vue.use(ElementUI);

import store from './vuex/store'

import './assets/css/global.css'
//import Api from './util/http';
// Vue.prototype.$api = Api;
import axios from 'axios'
import {post,fetch,patch,put} from './util/http'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

//ueditor
import '../static/UEditor/ueditor.config.js'
import '../static/UEditor/ueditor.all.js'
import '../static/UEditor/lang/zh-cn/zh-cn.js'
import '../static/UEditor/ueditor.parse.min.js'

import Roninwz from './components/Roninwz_vue'
Vue.use(Roninwz);

import Common from './components/common'
Vue.use(Common);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
