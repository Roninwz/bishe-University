<template>
  <div id="app">
    <div class="nav">
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple">
        <img class="logo" src="./assets/logo.png" alt="">
      </div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" border="0" router>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/technology">技术分享</el-menu-item>
          <el-menu-item index="/forum">论坛</el-menu-item>
          <el-menu-item index="/resource">资源分享</el-menu-item>
          <el-submenu index="/software">
            <template slot="title">软件中心</template>
            <el-menu-item index="5-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选项1</el-menu-item>
            <el-menu-item index="5-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选项2</el-menu-item>
            <el-menu-item index="5-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选项3</el-menu-item>
          </el-submenu>
        </el-menu>

      </div></el-col>
    </el-row>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import $ from "jquery"
export default {
  data() {
    return {
      activeIndex: '1',
    };

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created(){

  }
}
</script>

<style>
  @import "./assets/plugin/font-awesome/css/font-awesome.min.css";
*{
  margin: 0;
  padding: 0;
}
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  .el-menu-item{
    width: 150px;
    text-align: center;
    font-size: 17px;
  }
.el-submenu{
  width: 150px;
  text-align: center;
  font-size: 17px;
}
.el-menu--popup{
  width: 150px;
  font-size: 17px;
}
.el-submenu__title{
  font-size: 17px;
}
.nav{
  /*border-bottom: 1px solid #e6e6e6;*/
}
  .nav .logo{
    width: 100px;
    height: 61px;
    /*margin-left: 200px;*/
    float: right;
    margin-right: 100px;
  }
  .el-menu.el-menu--horizontal{
    border-bottom: 0;
  }
</style>
