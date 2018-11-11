import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Index from '../page/index'
import Technology from '../page/technology'
import Forum from '../page/forum'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/index',
      name: 'Index',
      component: Index
    },{
      path: '/technology',
      name: 'Technology',
      component: Technology
    }
    ,{
      path: '/forum',
      name: 'Forum',
      component: Forum
    }
  ]
})
