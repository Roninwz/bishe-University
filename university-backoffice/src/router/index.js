import Vue from 'vue'
import Router from 'vue-router'

import routerConfig from './routeConfig'

import VueCookies from 'vue-cookies';

Vue.use(Router);

let contextPath = '';

//mode 可选的参数有 hash 和  history;
//hash: 默认为hash, 如果使用hash的话，页面的地址就会加上 # 号就会比较不好看，如我们的地址变成如下：http://localhost:8080/#/
//history: 我们使用history的话，那么访问页面的时候就和平常一样，不带井号的；如下地址也可以访问 http://localhost:8080/
let router = new Router({
  base: contextPath || '/',// 配置单页应用的基路径
  mode: 'history',// 访问路径不带井号
  routes: routerConfig.routeConfig
});


/*
* 备注--路由跳转
* */

//1.router-link标签
//2.$router.push  传参方式query和params  query要用path来引入，params要用name来引入，接收参数都是类似的，分别是this.$route.query.name和this.$route.params.name。　query更加类似于我们ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示
//3.router.replace(location) 不能回退 替换掉当前history


export default router;
