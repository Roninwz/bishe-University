import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import store from './vuex/store'
import router from './router/index'

//路由
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

//ueditor
import '../static/UEditor/ueditor.config.js'
import '../static/UEditor/ueditor.all.min.js'
import '../static/UEditor/lang/zh-cn/zh-cn.js'
import '../static/UEditor/ueditor.parse.min.js'
// import Mock from './mock'
// Mock.bootstrap();
// import 'font-awesome/css/font-awesome.min.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
//Dolphind
import Dolphin from './components/Dolphin_vue'
Vue.use(Dolphin);

//common
import Common from './components/common'
Vue.use(Common);

//element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);


Vue.config.productionTip = false;//阻止 vue 在启动时生成生产提示






//1、Vue.beforeEach(function(to,form,next){}) /*在跳转之前执行*/

//2.Vue.afterEach(function(to,form))/*在跳转之后判断*/


router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path === '/view/admin/login') {
    sessionStorage.removeItem('adminInfo');
  }
  let user = JSON.parse(sessionStorage.getItem('adminInfo'));
  if (!user && to.path !== '/view/admin/login') {
    next({ path: '/view/admin/login' })
  } else {
    next()
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

