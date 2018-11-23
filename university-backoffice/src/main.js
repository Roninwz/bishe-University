import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import store from './vuex/store'
import router from './router/index'

//路由
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);


// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

//Dolphin
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
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
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

