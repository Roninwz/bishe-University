import AdminLogin from '../views/adminLogin.vue'
import NotFound from '../views/404.vue'
import Index from '../views/Index.vue'
import  Home from '../views/Home.vue'
import Table from '../views/userManage/Table.vue'
import AddUser from '../views/userManage/addUser.vue'
import UserList from '../views/userManage/userList.vue'
import TechnologyList from '../views/technologyManage/technologyList.vue'
import TechnologyEdit from '../views/technologyManage/technologyEdit.vue'
import TechnologyDetail from '../views/technologyManage/technologyDetail.vue'

import ResourceList from '../views/resourceManage/resourceList.vue'
import ResourceEdit from '../views/resourceManage/resourceEdit.vue'
import ResourceDetail from '../views/resourceManage/resourceDetail.vue'
import SoftwareList from '../views/softwareManage/softwareList.vue'
import SoftwareEdit from '../views/softwareManage/softwareEdit.vue'
import SoftwareDetail from '../views/softwareManage/softwareDetail.vue'
import Topic from '../views/topic/topicManage.vue'
import TopicPost from '../views/topic/topicPostManage.vue'

import AdminManage from '../views/auth/admin.vue'
import RoleManage from '../views/auth/role.vue'
import MenuManage from '../views/auth/menu.vue'
import FileManage from '../views/system/file.vue'
import NoticeManage from '../views/system/noticeList.vue'
import LoginLogList from '../views/logManage/loginLogList.vue'
import OperateLogList from '../views/logManage/operateLogList.vue'


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
        { path: '/view/admin/index', component: Index, name: '主页',hidden:true},
        // { path: '/table', component: Table, name: 'Table' },
        // { path: '/addUser', component: AddUser, name: '添加用户' },
        { path: '/view/admin/userList', component: UserList, name: '用户列表' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '技术文章管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/technologyManage', component: TechnologyList, name: '技术文章列表' },
        { path: '/view/admin/technologyEdit', component: TechnologyEdit, name: '技术文章维护' },
        { path: '/view/admin/technologyDetail', component: TechnologyDetail, name: '技术文章详情' },
        // { path: '/page5', component: Home, name: '评论列表' }
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '资源分享管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/resourceManage', component: ResourceList, name: '资源分享列表' },
        { path: '/view/admin/resourceEdit', component: ResourceEdit, name: '资源分享维护' },
        { path: '/view/admin/resourceDetail', component: ResourceDetail, name: '资源分享详情' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '软件中心',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/softwareManage', component: SoftwareList, name: '软件管理' },
        { path: '/view/admin/softwareEdit', component: SoftwareEdit, name: '软件维护' },
        { path: '/view/admin/softwareDetail', component: SoftwareDetail, name: '软件详情' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '话题',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/topicManage', component: Topic, name: '话题管理' },
        { path: '/view/admin/topicPostManage', component: TopicPost, name: '话题帖子管理' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '权限管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/adminManage', component: AdminManage, name: '管理员管理' },
        { path: '/view/admin/roleManage', component: RoleManage, name: '角色管理' },
        { path: '/view/admin/menuManage', component: MenuManage, name: '菜单管理' }
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '系统管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/fileManage', component: FileManage, name: '文件管理' },
        { path: '/view/admin/noticeManage', component: NoticeManage, name: '公告管理' },
      ]
    },
    {
      path: '/view/admin',
      component: Home,
      name: '日志管理',
      iconCls: 'fa fa-list-alt',
      children: [
        { path: '/view/admin/loginLogManage', component: LoginLogList, name: '登录日志' },
        { path: '/view/admin/operaLogManage', component: OperateLogList, name: '操作日志' },
      ]
    },
  ],

  authType: 'white',  //白名单 white 可以跳过登录 | 黑名单 black 不可以跳过登录
  whiteList: [
    /^\/login/,
    /^\/404/
  ],
  blackList: [

  ],

}
