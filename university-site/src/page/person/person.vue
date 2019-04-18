<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <section class="col-md-8 myPerson" id="mainstay">
            <div class="personInfo">
              <img :src="$Roninwz.path.publicPath+userInfo.imgUrl" alt="">
              <div class="nameandphone">
                <span class="username">用户名：{{userInfo.name}}</span>
                <span class="phone">手机号：{{userInfo.phone}}</span>
              </div>
              <a target="_blank" :href="userInfo.github?userInfo.github:'#'" > <img class="github"
                                                                                     src="../../../static/img/github.png"
                                                                                     alt=""></a>
              <a target="_blank" :href="userInfo.blog?userInfo.blog:'#'" ><img class="csdn"
                                                                                     src="../../../static/img/csdn.png"
                                                                                     alt=""></a>
            </div>


            <div class="update_userInfo_div">
              <p class="user_title">个人资料</p>
              <div class="my_hr"></div>

              <div class="update_head_img">
                <div class="update_label">
                  头像
                </div>
                <div class="update_content">
                  <img :src="$Roninwz.path.publicPath+userInfo.imgUrl" alt="">
                  <div class="head">
                    <span>支持 jpg、png 格式大小 5M 以内的图片</span>
                    <div class="updateHeadImg">
                      <dol-upload v-model="userInfo.imgUrl" :on-success="uploadSuccess" type="user"
                                  maxWidth="300px" maxHeight="200px">
                        <div class="upload-img">点击上传</div>
                      </dol-upload>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my_hr"></div>
              <div class="update_head_img">
                <div class="update_label">
                  用户名
                </div>
                <div class="update_content">
                  <input type="text" name="userInfo.name" v-model="userInfo.name" placeholder="请输入用户名" autofocus>
                </div>
              </div>
              <div class="my_hr"></div>
              <div class="update_head_img">
                <div class="update_label">
                  github
                </div>
                <div class="update_content">
                  <input type="text" v-model="userInfo.github"  placeholder="请输入github账户地址" autofocus>
                </div>
              </div>
              <div class="my_hr"></div>
              <div class="update_head_img">
                <div class="update_label">
                  blog
                </div>
                <div class="update_content">
                  <input type="text"  v-model="userInfo.blog"  placeholder="请输入blog地址">
                </div>
              </div>
              <div class="my_hr"></div>
              <div class="update_head_img">
                <div class="update_label">
                  个人介绍
                </div>
                <div class="update_content">
                  <input type="text" v-model="userInfo.introduce"  placeholder="请输入个人介绍">
                </div>
              </div>

              <div class="update_user_btn" @click="saveUserInfoBtn">
                保存更改
              </div>

            </div>

          </section>

          <aside class="col-md-4 myAside" id="sidebar">
            <div class="otherInfo">
              <div class="list_hr"></div>
              <div class="list_info">
                关注话题数：{{topicNum}}
              </div>
              <div class="list_hr"></div>
              <div class="list_info">
                加入于：{{userInfo.createTime}}
              </div>
              <div class="list_hr"></div>
            </div>
          </aside>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
  export default {
    name: "person",
    data: function () {
      return {
        topicNum: 0,
        findUrl: '/api/admin/topicattention/find',
        findUserUrl: '/api/users/find',
        saveUserInfo: '/api/users/save/',
        github:'',
        blog:'',
        introduce:'',
        userInfo: {},
        uniformFile: false,
      };
    },
    methods: {
      initTopicData: function () {
        let _this = this;
        _this.$fetch(this.findUrl, {user: _this.userInfo._id}).then(reData => {
          if (reData.success) {
            _this.topicNum = reData.rows.length;
          }
        });
      },
      initUserInfo: function () {
        let _this = this;
        _this.$fetch(this.findUserUrl, {_id: _this.$store.state.userInfo._id}).then(reData => {
          if (reData.success) {
            if(reData.rows.length>0){
              _this.userInfo = reData.rows[0];
            }else {
              _this.userInfo = _this.$store.state.userInfo;
            }

            _this.initTopicData();
          }
        });
      },
      /*
   * 图片上传成功回调
   * */
      uploadSuccess(response, file, fileList) {

        this.userInfo.imgUrl = response.data.filePath;
        this.$set(this, 'uniformFile', response.data);

      },

      saveUserInfoBtn:function () {
          let _this = this;
          _this.$post(_this.saveUserInfo+_this.userInfo._id, _this.userInfo).then(reData => {
            if (reData.success) {
              _this.$message({
                message: "保存成功",
                type: 'success',
                duration:1000
              });
              _this.initUserInfo();
            }
          });
      }
    },

    created: function () {
      // this.userInfo = this.$store.state.userInfo;
      this.initUserInfo();
    }
  }
</script>
<style>
  .el-upload__input {
    display: none !important;
  }
</style>
<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .myPerson {
      .personInfo {
        margin-top: 20px;
        width: 100%;
        height: 130px;
        padding: 20px;
        background-color: white;
        border-radius: 2px;
        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          float: left;
        }
        .nameandphone {
          width: 300px;
          height: 100%;
          float: left;
          margin-left: 30px;
          .username {
            width: 100%;
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: bold;
            color: black;
          }
          .phone {
            width: 100%;
            display: inline-block;
            line-height: 50px;
            height: 50px;
            font-size: 20px;
            font-weight: bold;
            color: black;
          }
        }
        .github {
          position: relative;
          right: 10px;
          top: 10px;
          width: 20px;
          height: 20px;
          float: right;
        }
        .csdn {
          position: relative;
          right: 20px;
          top: 11px;
          width: 18px;
          height: 18px;
          float: right;
        }

      }

    }

    .myAside {
      .otherInfo {
        margin-top: 20px;
        width: 100%;
        height: 200px;
        background-color: white;
        .list_info {
          padding-left: 30px;
          width: 100%;
          height: 60px;
          line-height: 60px;
          font-size: 16px;
        }
        .list_hr {
          width: 100%;
          background-color: #e3e3e3;
          height: 1px;
        }
      }
    }

    .update_userInfo_div {
      position: relative;
      margin-top: 30px;
      min-height: 600px;
      background-color: white;
      border-radius: 2px;
      padding: 10px 40px 10px 40px;
      .user_title {
        position: relative;
        top: 10px;
        font-weight: bold;
        font-size: 20px;
        color: #333;
        padding-bottom: 10px;
      }
      .my_hr {
        position: relative;
        top: 10px;
        width: 100%;
        background-color: #e3e3e3;
        height: 1px;
      }
      .update_head_img {
        font-size: 16px;
        margin-top: 20px;
        width: 100%;
        height: 90px;
        .update_label {
          line-height: 90px;
          width: 20%;
          color: #333;
          font-size: 14px;
          float: left;
          text-align: center;
        }
        .update_content {
          width: 80%;
          color: #333;
          font-size: 14px;
          float: left;
          img {
            margin-top: 9px;
            width: 72px;
            height: 72px;
            float: left;
          }
          .head {
            position: relative;
            left: 20px;
            width: 300px;
            height: 90px;
            float: left;
            margin-top: 9px;
            span {
              display: inline-block;
              height: 40px;
              line-height: 40px;
            }
            .upload-img {
              width: 70px;
              height: 30px;
              line-height: 30px;
              color: white;
              font-size: 14px;
              background-color: #16a085;
              border: none;
              outline: none;
              border-radius: 2px;
              clear: both;

            }
          }
          input {
            position: relative;
            left: 20px;
            width: 300px;
            height: 40px;
            float: left;
            margin-top: 25px;
            outline: none;
            border: none;
          }

        }

      }
      .update_user_btn{
        margin: 20px auto;
        width: 300px;
        height: 40px;
        line-height: 40px;
        background-color: #16a085;
        text-align: center;
        color: white;
        border-radius: 10px;
      ;
      }
    }
  }
</style>
