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

            <div class="article clearfix" v-for="article in technologyList">
              <section class="visible-md visible-lg">
                <span class="label  art_tag"><router-link to="/view/user/technology">技术教程</router-link></span>
                <!--标题-->
                <h3>{{article.title}}</h3>
                <hr>
                <div class="row">
                  <div class="col-md-5">
                    <figure class="thumbnail art_thum">
                      <img src="https://ws3.sinaimg.cn/large/005BYqpggy1fxgm4df82yj30xm0fx0x3.jpg" alt=""
                           class="attachment-300x180 wp-post-image">
                    </figure>
                  </div>
                  <div class="col-md-7 art_con" v-html="article.content">

                  </div>
                </div>
                <hr/>
                <div class="pull-right post-info"><span><i class="fa fa-calendar"></i> {{article.createTime | formatDate}}</span> <span><i
                  class="fa fa-user"></i> <span class="upp">{{article.creater.name}}</span></span> <span><i
                  class="fa fa-eye"></i> {{article.lookNum}}人</span> <span><i class="fa fa-comment"></i> 暂无</span></div>
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
                    <router-link to="">
                      <li class="clearfix new_art">一键检测自己的邮箱是否被泄露 输入邮箱在线即可查看</li>
                    </router-link>
                    <router-link to="">
                      <li class="clearfix new_art">Cloud Studio 插件评选大赛，免费领取20元话费</li>
                    </router-link>
                    <router-link to="">
                      <li class="clearfix new_art">腾讯云服务器 8元/月，新用户每买4个月送2个月！</li>
                    </router-link>
                    <router-link to="">
                      <li class="clearfix new_art">VS Code书写vue项目配置 eslint+prettier 统一代码风格</li>
                    </router-link>
                    <router-link to="">
                      <li class="clearfix new_art2">VS Code书写vue项目配置 jslint统一代码风格</li>
                    </router-link>
                  </ul>
                </div>
              </div>
            </aside>

            <aside>
              <div class="panel">
                <div class="panel-heading">
                  网络收藏
                </div>
                <div class="panel-body">
                  <ul class="list-group">
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net2">网络日志</li>
                  </ul>
                </div>
              </div>
            </aside>

            <aside>
              <div class="panel">
                <div class="panel-heading">
                  站点统计
                </div>
                <div class="panel-body">
                  <p class="panel_p">文章总数：{{technologyList.length}}篇</p>
                  <p class="panel_p">浏览总数：221条</p>
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
  import {formatDate} from '../../util/date.js';
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
    filters: {
      formatDate: function(time) {
        if(time!=null&&time!="")
        {
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd");
        }else{
          return "";
        }
      }
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
          height: 200px;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
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
        ul li {
          margin: 0;
          padding: 0;
        }
        .new_net {
          width: 100%;
          border-bottom: 1px solid #eee;
          padding: 15px 0 15px 10px;
          list-style: none;
        }
        .new_net2 {
          width: 100%;
          padding: 15px 0 15px 10px;
          list-style: none;
        }
        .new_net:hover {
          background-color: #999999;
        }
        .new_net2:hover {
          background-color: #999999;
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
        .panel_p {
          /*line-height: 20px;*/
          padding: 5px 10px 0px 5px;
          font-size: 14px;
        }

      }

    }

  }

</style>
