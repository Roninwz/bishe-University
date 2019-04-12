<template>
  <div class="dolMenu" v-if="$store.state.userInfo">
    <div class="menu-title" :class="menuCollapseFlag?'menu-title-collapse':''" >
      <span>导航菜单</span>
      <i class="fa fa-outdent collapse-icon" @click="menuCollapse = !menuCollapse"></i>
    </div>

    <el-menu
      :default-active="curSubMenuCode"
      :collapse="menuCollapseFlag"
      @select="select"
      :router="true">
      <div v-for="item in $store.state.userInfo['menu']['rows']"
                v-if="new RegExp('^'+item.link).test($route.fullPath)" :key="item._id">
        <div v-for="menu in item.children" :key="menu._id">
          <el-submenu v-if="menu.__type==='folder'" :index="menu._id">
            <template slot="title">
              <i class="fa" :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item v-for="sub in menu.children" :index="sub.link" :key="sub._id">
              <i class="fa" :class="sub.icon"></i>
              <span>{{sub.name}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="menu.link">
            <i class="fa" :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'dol-menu',
    data () {
      return {
        menuCollapse: false,
        curSubMenuCode: '',
      }
    },
    computed:{
      menuCollapseFlag(){
          if(this.$route.path === '/view/index'){
              return true;
          }else{
              return this.menuCollapse;
          }
      }
    },
    methods: {
      select(index, indexPath){
        this.curSubMenuCode = index;
      },
      clearSelect(){
        this.curSubMenuCode = null;
      }
    },
    created(){
      this.curSubMenuCode = window.location.pathname;
    }
  }
</script>

