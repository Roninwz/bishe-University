<template>
  <div class="loginPage">
    <el-form :model="admin" :rules="rules2" ref="admin" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">IT大学网后台管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="admin.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="admin.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <!--:loading="logining"-->
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2('admin')">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import {requestLogin} from '../api/api';

  export default {
    data() {
      return {
        logining: false,
        admin: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.rules2.resetFields();
      },

      /*登录*/
      handleSubmit2(admin) {
        let _this = this;
        _this.$refs[admin].validate((valid) => {

          if (valid) {

            _this.logining = true;
            let loginParams = {username: _this.admin.username, password: _this.admin.password};
            //发送登录请求
            // this.$ajax({
            //   method: 'post',
            //   url: '/api/admin/login/loginCheck',
            //   data:loginParams
            // }).then(data=>{
            //   console.log("ddd:"+JSON.stringify(data));
            //
            //        if(data.message==="登录成功"){
            //          _this.$message({
            //            message: data.message,
            //            type: 'success'
            //          });
            //          _this.$router.push({ path: '/view/admin' });
            //          // _this.$router.replace('/view/admin');
            //        }else {
            //          _this.$message(data.message);
            //        }
            //
            // }).catch(function (error) {
            //     console.log(error);
            //   });

            //发送请求到store中actions.js的登录方法
            this.$store.dispatch('login', loginParams).then(data => {
              console.log("ddd:" + JSON.stringify(data));
              if (data.message === "登录成功") {
                _this.$message({
                  message: data.message,
                  type: 'success'
                });
                _this.goNext();
                // _this.$router.push('/view/admin/main');
                // _this.$router.replace('/view/admin');
              } else {
                _this.$message(data.message);
              }
            }, errorMsg => {
              _this.$message(errorMsg);
            });
            // requestLogin(loginParams).then(data => {
            //    console.log("data:"+data);
            //    this.logining = false;
            //    //NProgress.done();
            //    let { message, code, user } = data;
            //    if (code !== 200) {
            //      this.$message({
            //        message: message,
            //        type: 'error'
            //      });
            //    } else {
            //      sessionStorage.setItem('user', JSON.stringify(user));
            //      this.$router.push({ path: '/table' });
            //    }
            //  });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      login() {

      },
      goNext: function () {
        this.$router.replace('/view/admin/userList');
        // this.$router.push({ path: '/view/admin/main' });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .loginPage {
    position: relative;
    display: block;
    width: 100%;
    /*height: 1080px;*/
    height: 100%;
    margin: 0;

    background: url("../../static/image/back_white2.png") no-repeat;
    background-size: 100% 100%;
    /*padding: 180px 0 180px 0;*/
    padding-top: 12%;
    /*padding-bottom: 12.5%;*/
    overflow-y: hidden;
    .login-container {
      /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 0px auto;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
</style>
