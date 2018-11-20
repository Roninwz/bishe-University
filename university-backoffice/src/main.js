import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import Dolphin from './components/Dolphin_vue'
Vue.use(Dolphin);
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$ajax = axios;
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
}).$mount('#app')

