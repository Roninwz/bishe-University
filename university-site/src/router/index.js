import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Index from '../page/index'

import Technology from '../page/technology/technology2'
import TechnologyArticleDetail from '../page/technology/articleDetail'

import ResourceShare from '../page/resource/resource'
import ResourceShareDetail from '../page/resource/resourceDetail'


import Software from '../page/software/software'

import Forum from '../page/forum'

Vue.use(Router);

export default new Router({
  mode: 'history',// 访问路径不带井号
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/view/user/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/view/user/technology',
      name: 'Technology',
      component: Technology
    },
    {
      path: '/view/user/technologyArticleDetail',
      name: 'TechnologyArticleDetail',
      component: TechnologyArticleDetail
    },
    {
      path: '/view/user/resource',
      name: 'ResourceShare',
      component: ResourceShare
    },
    {
      path: '/view/user/resourceDetail',
      name: 'ResourceShareDetail',
      component: ResourceShareDetail
    },

    {
      path: '/view/user/software',
      name: 'Software',
      component: Software
    },

    {
      path: '/view/user/forum',
      name: 'Forum',
      component: Forum
    }
  ]
})
