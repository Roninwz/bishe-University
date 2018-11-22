<template>
  <el-header height="60px" id="header" v-if="$store.state.userInfo">
    <span class="bland">协和校服置换后台</span>

    <template v-for="item in $store.state.userInfo['menu']['rows']">
      <span class="topMenu" @click="changeTopMenu(item)">
        <router-link :to="item.link"><i class="fa" :class="item.icon"></i> {{item.name}}</router-link>
      </span>
    </template>

    <el-dropdown class="account" @command="accountMenu">
      <el-button type="primary">
        <img :src="`${$Dolphin.path.contextPath}/static/icon/icon.png`" alt="Avatar">
        {{$store.state.userInfo.name}}
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
  export default {
    name: 'dol-header',
    data () {
      return {}
    },
    methods: {
      accountMenu(command){
        switch (command){
          case 'logout':
            this.$store.dispatch('logout').then(() => {
              this.$router.replace('/login');
            });
            break;
        }
      },
      changeTopMenu(menu){
        this.$emit('change-top-menu', menu);
      },
    },
    created(){
    }
  }
</script>

