<template>
  <div id="app">
    <div class="nav">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img class="logo" src="../static/img/logo1.png" alt="">
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" border="0" router>
              <el-menu-item index="/view/user/index">首页</el-menu-item>
              <el-menu-item index="/view/user/technology">技术分享</el-menu-item>
              <el-menu-item index="/view/user/topic">话题</el-menu-item>
              <el-menu-item index="/view/user/resource">资源分享</el-menu-item>
              <el-menu-item index="/view/user/software">软件中心</el-menu-item>
              <!--<el-menu-item index="/view/user/person">我的</el-menu-item>-->
              <template v-if="userInfo!=null&&userInfo">
                <el-submenu index="/view/user">
                  <template slot="title">个人中心</template>
                  <el-menu-item index="/view/user/person">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的主页</el-menu-item>
                  <el-menu-item index="/view/user/index" @click="logout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登出</el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </div>
        </el-col>
      </el-row>
      <div v-if="userInfo==null||!userInfo" class="login_and_register">
        <span style="padding:0 5px 0 5px;color:#16a085;" @click="isLogin=true">登陆</span>|
        <span style="padding: 0 5px 0 5px;color:#16a085;" @click="isRegister=true">注册</span>
      </div>
    </div>

    <div class="login_div" v-if="isLogin">
      <div class="login_info">
        <div class="login_title">
          <span class="login_txt">登陆</span>
          <img class="login_close" src="../static/img/close.png" alt="" @click="isLogin=false">
        </div>
        <div class="login_input">
          <input type="text" v-model="loginUser.name" placeholder="请输入用户名">
          <input type="password" v-model="loginUser.password" placeholder="请输入密码">
        </div>
        <div class="login_btn" @click="login">
          登陆
        </div>
        <div class="no_account">
          <span class="no_account_txt">没有账号？</span>
          <span class="no_register" @click="isLogin=false,isRegister=true">注册</span>
          <span class="no_forget">忘记密码?</span>
        </div>
      </div>
    </div>

    <div class="register_div" v-if="isRegister">
      <div class="login_info">
        <div class="login_title">
          <span class="login_txt">注册</span>
          <img class="login_close" src="../static/img/close.png" alt="" @click="isRegister=false">
        </div>
        <div class="login_input">
          <input type="text" v-model="user.name" onblur="findUserName" placeholder="请输入用户名">
          <input type="text" v-model="user.phone" placeholder="请输入手机号">
          <input type="text" v-model="user.code" placeholder="请输入验证码">
          <span class="code" v-if="!isGetCode" @click="getCode">获取验证码</span>
          <span class="code" v-if="isGetCode">{{identifyingTime}}秒后重新发送验证码</span>
          <input type="password" v-model="user.password" placeholder="请输入密码">
        </div>
        <div class="login_btn" @click="register">
          注册
        </div>
        <div class="no_account">
          <span class="no_account_txt">已账号？</span>
          <span class="no_register" @click="isRegister=false,isLogin=true">登录</span>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import $ from "jquery"

  export default {
    data() {
      return {
        url: {
          getCode: '/api/users/getCode',
          register: '/api/users/register',
          login: '/api/users/login',
          findUserName: '/api/users/find'
        },
        activeIndex: '1',
        userInfo: null,
        user: {
          name: '', phone: '', password: '', code: ''
        },
        loginUser: {
          name: '', phone: '', password: '', code: ''
        },
        isLogin: false,
        isRegister: false,
        isGetCode: false,
        identifyingTime: 0,
      };

    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getCode: function () {
        let _this = this;
        _this.isGetCode = true;
        if (_this.identifyingTime === 0) {
          _this.$fetch(this.url.getCode, {phone: _this.user.phone}).then(reData => {
            if (reData.success) {
              _this.$message({
                message: reData.message,
                type: 'success'
              });
              _this.identifyingTime = 60;
              let time = setInterval(() => {
                if (_this.identifyingTime !== 0) {
                  _this.identifyingTime--;
                } else {
                  clearInterval(time);
                  _this.isGetCode = false;
                }
              }, 1000);
            }
          });
        }
      },
      register: function () {
        let _this = this;
        if (_this.user.name == null || _this.user.name == '') {
          _this.$message({
            message: '用户名不能为空',
            type: 'warning'
          });
        } else if (_this.user.phone == null || _this.user.phone == '') {
          _this.$message({
            message: '手机号不能为空',
            type: 'warning'
          });
        } else if (_this.user.code == null || _this.user.code == '') {
          _this.$message({
            message: '验证码不能为空',
            type: 'warning'
          });
        } else if (_this.user.password == null || _this.user.password == '') {
          _this.$message({
            message: '密码不能为空',
            type: 'warning'
          });
        } else {
          _this.$post(_this.url.register, _this.user).then(reData => {
            if (reData.success) {
              _this.$message({
                message: "注册成功",
                type: 'success'
              });
              _this.isRegister = false;
            } else {
              _this.$message({
                message: reData.message,
                type: 'error'
              });
            }
          });
        }
      },
      findUserName:function () {
        this.$fetch(this.url.findUserName, {name: this.user.name}).then(reData => {
          if (reData.success) {
            this.$message({
              message: '用户名已存在',
              type: 'warning'
            });
          }
        });
      },
      /**
       * 登录
       */
      login: function () {
        let _this = this;
        if (_this.loginUser.name == null || _this.loginUser.name == '') {
          _this.$message({
            message: '用户名不能为空',
            type: 'warning'
          });
        }else if (_this.loginUser.password == null || _this.loginUser.password == '') {
          _this.$message({
            message: '密码不能为空',
            type: 'warning'
          });
        }else {
          _this.$post(_this.url.login, {name: _this.loginUser.name,password:_this.loginUser.password}).then(reData => {
            if (reData.success) {
              _this.$message({
                message: reData.message,
                type: 'warning'
              });
               localStorage.setItem("userInfo",JSON.stringify(reData.data));
               _this.userInfo = reData.data;
              _this.isLogin = false;
              _this.$store.dispatch('saveUserInfo',_this.userInfo);
            }else {
              _this.$message({
                message: reData.message,
                type: 'error'
              });
            }
          });
        }
      },
      logout:function () {
        this.userInfo = null;
        this.loginUser={};
        localStorage.setItem("userInfo",'');
        this.$store.dispatch('saveUserInfo',null);
      }
    },
    created() {
      if(localStorage.getItem("userInfo")){
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.$store.dispatch('saveUserInfo',this.userInfo);
      }

    }
  }
</script>
<style>
  @import "./assets/plugin/font-awesome/css/font-awesome.min.css";

  .login_and_register {
    position: absolute;
    top: 18px;
    right: 400px;
    float: right;
    font-size: 15px;
    border: none;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #16a085;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  img {
    max-width: 100%; /*图片自适应宽度*/
  }

  body {
    color: #333;
  }

  a {
    text-decoration: none !important;
  }

  .el-menu-item {
    width: 150px;
    text-align: center;
    font-size: 17px;
  }

  .el-submenu {
    width: 150px;
    text-align: center;
    font-size: 17px;
  }

  .el-menu--popup {
    width: 150px;
    font-size: 17px;
  }

  .el-submenu__title {
    font-size: 17px;
  }

  .nav {
    /*border-bottom: 1px solid #e6e6e6;*/
  }

  .nav .logo {
    width: 180px;
    /*height: 81px;*/
    /*margin-left: 200px;*/
    float: right;
    margin-right: 100px;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: 0;
  }


</style>

<style lang="scss" scoped>
  .login_div {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .3);

    .login_info {
      width: 300px;
      height: 300px;
      margin: 250px auto;
      background-color: #fff;
      box-shadow: 0 0 2px #fff;
      border-radius: 2px;
      box-sizing: border-box;
      .login_title {
        position: relative;
        width: 100%;
        top: 20px;
        .login_txt {
          position: relative;
          left: 5px;
          padding: 25px 5px 5px 15px;
          font-size: 18px;
          color: black;
          font-weight: bold;
        }
        .login_close {
          position: relative;
          float: right;
          right: 15px;
          width: 22px;
          height: 22px;
        }
      }
      .login_input {
        position: relative;
        top: 10px;
        width: 100%;
        padding: 20px 20px 20px 20px;
        input {
          position: relative;
          margin-top: 15px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 10px;
          border: 1px solid #e9e9e9;
          border-radius: 2px;
          outline: none;
          font-size: 14px;
        }
        input:focus {
          border: 1px solid #16a085;
        }
      }
      .login_btn {
        position: relative;
        top: 20px;
        left: 20px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        width: 87%;
        background-color: #16a085;
        color: white;
        border-radius: 2px;
      }
      .no_account {
        position: relative;
        top: 20px;
        width: 100%;
        padding: 20px 20px 20px 20px;
        .no_account_txt {
          color: #8b9196;
          font-size: 14px;
        }
        .no_register {
          color: #16a085;
          font-size: 14px;
        }
        .no_forget {
          color: #16a085;
          font-size: 14px;
          float: right;
        }
      }

    }
  }

  .register_div {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .3);

    .login_info {
      width: 300px;
      height: 400px;
      margin: 250px auto;
      background-color: #fff;
      box-shadow: 0 0 2px #fff;
      border-radius: 2px;
      box-sizing: border-box;
      .login_title {
        position: relative;
        width: 100%;
        top: 20px;
        .login_txt {
          position: relative;
          left: 5px;
          padding: 25px 5px 5px 15px;
          font-size: 18px;
          color: black;
          font-weight: bold;
        }
        .login_close {
          position: relative;
          float: right;
          right: 15px;
          width: 22px;
          height: 22px;
        }
      }
      .login_input {
        position: relative;
        top: 10px;
        width: 100%;
        padding: 20px 20px 20px 20px;
        input {
          position: relative;
          margin-top: 15px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 10px;
          border: 1px solid #e9e9e9;
          border-radius: 2px;
          outline: none;
          font-size: 14px;
        }
        input:focus {
          border: 1px solid #16a085;
        }
        .code {
          position: absolute;
          top: 156px;
          right: 38px;
          float: right;
          color: #16a085;
          font-size: 13px;
        }
      }
      .login_btn {
        position: relative;
        top: 20px;
        left: 20px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        width: 87%;
        background-color: #16a085;
        color: white;
        border-radius: 2px;
      }
      .no_account {
        position: relative;
        top: 20px;
        width: 100%;
        padding: 20px 20px 20px 20px;
        .no_account_txt {
          color: #8b9196;
          font-size: 14px;
        }
        .no_register {
          color: #16a085;
          font-size: 14px;
        }
        .no_forget {
          color: #16a085;
          font-size: 14px;
          float: right;
        }
      }

    }
  }

</style>
