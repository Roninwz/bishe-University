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

export default {
  routeConfig:[
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
        // { path: '/addUser', component: AddUser, name: '添加用户' },
        { path: '/userList', component: UserList, name: '用户列表' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '技术文章管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/page4', component: Page4, name: '文章列表' },
        { path: '/page5', component: Page5, name: '评论列表' }
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '权限管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/page4', component: Page4, name: '管理员管理' },
        { path: '/page5', component: Page5, name: '角色管理' }
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '系统管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/page4', component: Page4, name: '文章列表' },
        { path: '/page5', component: Page5, name: '评论列表' }
      ]
    },
  ],

  authType: 'white',  //白名单 white 可以跳过登录 | 黑名单 black 不可以跳过登录
  whiteList: [
    /^\/login/
  ],
  blackList: [

  ],

}
