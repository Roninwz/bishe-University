<template>
  <!--https://www.iyouhun.com/sort/1-->
  <div class="myContain">
    <section>
      <div class="container">
        <section class="row">
          <section class="col-md-8 myArticle" id="mainstay">
            <!--公告-->
            <div class="notice">
              <div class="notice_title">
                公告
              </div>
              <div class="notice_con">
                <h2>
                  <router-link to="/view/user/technology">
                    欢迎查看技术文章教程
                  </router-link>
                </h2>
              </div>
            </div>

            <div class="article clearfix">
              <section class="visible-md visible-lg">
                <span class="label  art_tag"><router-link to="/view/user/technology">技术教程</router-link></span>
                <!--标题-->
                <h3>一键检测自己的邮箱是否被泄露 输入邮箱在线即可查看</h3>
                <hr>
                <div class="row">
                  <div class="col-md-5">
                    <figure class="thumbnail art_thum">
                      <img src="https://ws3.sinaimg.cn/large/005BYqpggy1fxgm4df82yj30xm0fx0x3.jpg" alt=""
                           class="attachment-300x180 wp-post-image">
                    </figure>
                  </div>
                  <div class="col-md-7 art_con">
                    火狐官方的查询入口如果泄露还会提示你那个平台泄露的，泄露日期及泄露数据。我测试了一下我几个常用的邮箱，谷歌和我自己的企业邮箱安全没有泄露，qq邮箱有一个泄露数据。不多吐槽了，你们懂。查询地址：https://monitor.firefox.com/scan...
                  </div>
                </div>
                <hr/>
                <div class="pull-right post-info"><span><i class="fa fa-calendar"></i> 12月22日,2018</span> <span><i
                  class="fa fa-user"></i> <a href="https://www.iyouhun.com/author/1" class="upp"
                                             title="帅的人不需要介绍 admin@iyouhun.com">admin</a></span> <span><i
                  class="fa fa-eye"></i> 204人</span> <span><i class="fa fa-comment"></i> 暂无</span></div>
              </section>
            </div>

          </section>
          <aside class="col-md-4 myAside" id="sidebar">
            <aside class="search_bj">
              <div class="search">
                <input type="text" class="form-control search_input">
                <div class="search_btn">
                  <span class="search_txt"> <i class="fa fa-search"></i> 查找</span>
                </div>
              </div>
            </aside>
            <aside>
              <div class="panel">
                <div class="panel-heading">
                  最新文章
                </div>
                <div class="panel-body">
                  <ul class="list-group">
                    <li class="clearfix new_art">一键检测自己的邮箱是否被泄露 输入邮箱在线即可查看</li>
                    <li class="clearfix new_art">Cloud Studio 插件评选大赛，免费领取20元话费</li>
                    <li class="clearfix new_art">腾讯云服务器 8元/月，新用户每买4个月送2个月！</li>
                    <li class="clearfix new_art">VS Code书写vue项目配置 eslint+prettier 统一代码风格</li>
                    <li class="clearfix new_art2">VS Code书写vue项目配置 jslint统一代码风格</li>
                  </ul>
                </div>
              </div>
            </aside>


          </aside>
        </section>
      </div>
    </section>

  </div>


</template>

<script>
  export default {

    data: function () {
      return {
        url: {
          list: '/api/admin/technology/list',
          find: '/api/admin/technology/find',
          remove: '/api/admin/technology/remove',
          removeOne: '/api/admin/technology/remove/{id}',
          save: '/api/admin/technology/save/{id}',
          detail: '/api/admin/technology/detail/{id}',
        },
        technologyList: [],

      };
    },
    computed: {},
    methods: {
      //  初始化数据
      initArticleData: function () {
        // this.$api.get(this.url.find, {
        //
        // }, response => {
        //   if (response.status >= 200 && response.status < 300) {
        //     console.log(response.data);
        //   } else {
        //     console.log(response.message);
        //   }
        // });
        this.$fetch(this.url.find).then(reData => {
          console.log("redata:" + JSON.stringify(reData));
          console.log("redata:" + reData);
          if (reData.success) {
            this.technologyList = reData.rows;
          }
        });
      }

    },
    created: function () {
      this.initArticleData();
    }

  }
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

  .myContain {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .myArticle {
      margin: 16px auto;
      .notice {
        position: relative;
        width: 100%;
        height: 40px;
        background-color: #eaeaea;
        overflow: hidden;
        line-height: 1.42857143;
        margin-bottom: 20px;
        .notice_title {
          display: block;
          background-color: #16a085;
          width: 80px;
          height: 40px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          vertical-align: middle;
          float: left;
        }
        .notice_con {
          width: 500px;
          height: 40px;
          display: block;
          float: left;
          h2 {
            line-height: 40px;
            overflow: hidden;
            margin: 0 30px 0 20px;
            font-size: 14px;
            height: 40px;
            float: left;
          }
        }
      }

      .article {
        position: relative;
        padding: 0 20px 20px 20px;
        background-color: #fff;
        margin-bottom: 20px;
        .art_tag {
          border-radius: 0 !important;
          background-color: #16a085;
          color: #fff;
          font-size: 12px;
          padding: 5px;
          font-weight: 700;
          white-space: nowrap;
          vertical-align: baseline;
          a {
            color: #fff;
          }
        }
        .art_thum {
          line-height: 1.42857143;
          img {
            width: 300px;
            height: 180px;
          }
          img:hover {
            animation: myfirst 5s;
            -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
          }
          @keyframes myfirst {
            0% {
              transform: scale(1, 1);
            }
            50% {
              transform: scale(1.05, 1.05);
            }
            100% {
              transform: scale(1, 1);
            }
          }

          @-webkit-keyframes myfirst /*Safari and Chrome*/
          {
            0% {
              transform: scale(1, 1);
            }
            50% {
              transform: scale(1.05, 1.05);
            }
            100% {
              transform: scale(1, 1);
            }
          }
        }

        .art_con {
          font-size: 14px;
          color: #c1c1c1;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .myAside {
      .search_bj {
        width: 100%;
        height: 70px;
        background-color: white;
        margin: 16px auto;
        .search {
          width: 80%;
          height: 36px;
          margin: 12px auto;
          padding-top: 16px;
          padding-bottom: 16px;
          .search_input {
            width: 65%;
            height: 36px;
            font-size: 14px;
            padding: 6px 12px;
            color: #555;
            float: left;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            border: 2px solid #c1c1c1;
            border-radius: 0px;
          }
          .search_btn {
            width: 33%;
            height: 36px;
            float: right;
            background-color: #16a085;
            color: white;
            font-size: 14px;
            font-weight: 400;
            line-height: 36px;
            text-align: center;
          }
        }
      }
      .panel {

        .panel-heading {
          background-color: #16a085;
          color: #fff;
        }
        .new_art {
          border-bottom: 1px solid #eee;
          padding: 15px 0;
          list-style: none;
        }
        .new_art2 {
          padding: 15px 0;
          list-style: none;
        }
      }

    }

  }

</style>
