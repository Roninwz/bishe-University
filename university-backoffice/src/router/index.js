import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminLogin from '../views/adminLogin.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import Table from '../views/userManage/Table.vue'
import AddUser from '../views/userManage/addUser.vue'
import UserList from '../views/userManage/userList.vue'
import Page4 from '../views/nav2/Page4.vue'
import Page5 from '../views/nav2/Page5.vue'
import Page6 from '../views/nav3/Page6.vue'
import echarts from '../views/charts/echarts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/view/admin/login',
      hidden: true
    },
    {
      path: '/view/admin/login',
      component: AdminLogin,
      name: '',
      hidden: true
    },
    {
      path: '/view/admin/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/view/admin',
      component: Home,
      name: '用户管理',
      iconCls: 'fa fa-user-circle',//图标样式class
      children: [
        { path: '/main', component: Home, name: '主页',hidden:true},
        // { path: '/table', component: Table, name: 'Table' },
        { path: '/addUser', component: AddUser, name: '添加用户' },
        { path: '/userList', component: UserList, name: '用户列表' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '文章管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/page4', component: Page4, name: '页面4' },
        { path: '/page5', component: Page5, name: '页面5' }
      ]
    },
    // {
    //   path: '/view/admin',
    //   component: Home,
    //   name: '',
    //   iconCls: 'fa fa-address-card',
    //   leaf: true,//只有一个节点
    //   children: [
    //     { path: '/page6', component: Page6, name: '导航三' }
    //   ]
    // },
    // {
    //   path: '/view/admin',
    //   component: Home,
    //   name: 'Charts',
    //   iconCls: 'fa fa-bar-chart',
    //   children: [
    //     { path: '/echarts', component: echarts, name: 'echarts' }
    //   ]
    // },
    // {
    //   path: '*',
    //   hidden: true,
    //   redirect: { path: '/404' }
    // }
  ]
})
