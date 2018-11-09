import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Technology from '@/components/technology'
import Forum from '@/components/forum'

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
