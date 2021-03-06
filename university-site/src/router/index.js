import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Index from '../page/index'
import Notice from '../page/notice'

import Technology from '../page/technology/technology2'
import TechnologyArticleDetail from '../page/technology/articleDetail'

import ResourceShare from '../page/resource/resource'
import ResourceShareDetail from '../page/resource/resourceDetail'


import Software from '../page/software/software'
import SoftwareDetail from '../page/software/softwareDetail'

import Topic from '../page/topic/topic'
import TopicDetail from '../page/topic/topicDetal'
import Person from '../page/person/person'
import Updatepass from '../page/person/updatepass'

Vue.use(Router);

export default new Router({
  mode: 'history',// 访问路径不带井号
  routes: [
    {
      path: '/',
      redirect:'/view/user/index'
    },
    {
      path: '/view/user/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/view/user/notice',
      name: 'Notice',
      component: Notice
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
      path: '/view/user/softwareDetail',
      name: 'SoftwareDetail',
      component: SoftwareDetail
    },

    {
      path: '/view/user/topic',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/view/user/topicDetail',
      name: 'TopicDetail',
      component: TopicDetail
    },
    {
      path: '/view/user/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/view/user/updatepass',
      name: 'Updatepass',
      component: Updatepass
    },
  ]
})
