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
                <router-link :to="{path:'/view/user/technologyArticleDetail',query:{id:article.id}}">
                  <h3>{{article.title}}</h3>
                </router-link>
                <div class="article_hr"></div>
                <div class="row">
                  <div class="col-md-4">
                    <figure class="thumbnail art_thum">
                      <img :src="$Roninwz.path.publicPath+article.imgUrl" alt=""
                           class="attachment-300x180 wp-post-image">
                    </figure>
                  </div>
                  <div class="col-md-8 art_con" v-html="article.content">

                  </div>
                </div>
                <div class="article_hr"></div>
                <div class="pull-right post-info"><span><i class="fa fa-calendar"></i> {{article.createTime | formatDate}}</span>
                  <span><i
                    class="fa fa-user"></i> <span class="upp">{{article.creater.name}}</span></span> <span><i
                    class="fa fa-eye"></i> {{article.lookNum}}人</span> <span><i class="fa fa-comment"></i> 暂无</span>
                </div>
              </section>
            </div>
            <!--分页实现-->
            <div class="my_pagination">
              <v-pagination :total="total" :display="display" :current-page='current' @pagechange="pagechange"></v-pagination>
            </div>



          </section>
          <aside class="col-md-4 myAside" id="sidebar">
            <aside class="search_bj">
              <div class="search">
                <input type="text" v-model="searchTxt" class="form-control search_input">
                <div class="search_btn" @click="searchTechnology">
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
                    <template v-for="lastArticle in lastFiveArticles">
                    <router-link :to="{path:'/view/user/technologyArticleDetail',query:{id:lastArticle._id}}">
                      <li class="clearfix new_art">{{lastArticle.title}}</li>
                    </router-link>
                    </template>
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
                    <li class="clearfix new_net"> <a target="_blank" href="https://gitee.com/forezp/SpringCloudLearning">史上最简单spring cloud教程源码</a> </li>
                    <li class="clearfix new_net"> <a target="_blank" href="https://gitee.com/didispace/SpringBoot-Learning">Spring Boot基础教程，Spring Boot 2.x版本连载中！！！</a></li>
                    <li class="clearfix new_net"> <a target="_blank" href="http://www.jenkins.org.cn/">最流行的开源免费持续集成工具jenkins</a></li>
                    <li class="clearfix new_net"> <a target="_blank" href="https://backlog.com/git-tutorial/cn/">猴子都能懂的git入门</a></li>
                    <li class="clearfix new_net2"> <a target="_blank" href="http://dubbo.apache.org/zh-cn/">Apache Dubbo™ (incubating)是一款高性能Java RPC框架。</a></li>
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
                  <p class="panel_p">文章总数：{{total}}篇</p>
                  <p class="panel_p">浏览总数：{{lookSumNum}}</p>
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
  import pagination from '@/components/pagination'
  export default {
    components: {
      'v-pagination': pagination,
    },
    data: function () {
      return {
        url: {
          list: '/api/admin/technology/list',
          find: '/api/admin/technology/find',
          remove: '/api/admin/technology/remove',
          removeOne: '/api/admin/technology/remove/{id}',
          save: '/api/admin/technology/save/{id}',
          detail: '/api/admin/technology/detail/{id}',
          findLastFiveArticles: '/api/admin/technology/findLastFive'
        },
        technologyList: [],
        technologyListAll: [],
        lastFiveArticles: [],
        lookSumNum: 0,
        searchTxt:'',
        total: 10,     // 记录总条数
        display: 5,   // 每页显示条数
        current: 1,   // 当前的页数
      };
    },
    filters: {
      formatDate: function (time) {
        if (time != null && time != "") {
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd");
        } else {
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
        let _this = this;
        _this.$post(this.url.list+'?pageSize='+_this.display+'&pageNumber='+ parseInt(_this.current - 1)).then(reData => {
          if (reData.success) {

            _this.technologyList = reData.rows
            _this.total = reData.total;
            _this.technologyListAll = reData.rows;
          }
        });
        _this.$fetch(this.url.find).then(reData => {
          if (reData.success) {
            _this.lookSumNum = 0;
            reData.rows.forEach(te => {
              _this.lookSumNum += te.lookNum;
            });
          }
        });
      },
      initLastFiveArticlesData: function () {
        let _this = this;
        _this.$fetch(this.url.findLastFiveArticles).then(reData => {
          if (reData.success) {

            _this.lastFiveArticles = reData.rows;
          }
        });
      },
      searchTechnology:function () {
        let oldTechnologyList = this.technologyList;
        let newTechnologyList = [];
        if(this.searchTxt!=''){
          oldTechnologyList.forEach(tech=>{
            if(tech.title.indexOf(this.searchTxt)!=-1){
              newTechnologyList.push(tech);
            }
          });
          this.technologyList = newTechnologyList;
        }else {

          this.technologyList = this.technologyListAll;
        }

      },
      //分页页面点击子组件触发事件
      pagechange:function(currentPage){
        this.current = currentPage;
        this.initArticleData();
      }

    },
    created: function () {
      this.initArticleData();
      this.initLastFiveArticlesData();
    }

  }
</script>

<style lang="scss" scoped>

  .myContain {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .myArticle {
      margin: 12px auto;
      .notice {
        position: relative;
        width: 100%;
        height: 40px;
        background-color: #eaeaea;
        overflow: hidden;
        line-height: 1.42857143;
        margin-bottom: 10px;
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
        padding: 0 30px 15px 30px;
        background-color: #fff;
        margin-bottom: 10px;
        .article_hr{
          width: 100%;
          background-color: #e3e3e3;
          height: 1px;
        }
        .row{
          margin-top: 15px;
        }
        .post-info{
          margin-top: 10px;
          line-height: 25px;
        }
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
          line-height: 1.2;
          img {
            width: 180px;
            height: 110px;
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
          height: 130px;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
        }
      }

      .my_pagination{
        margin: 30px 0 30px 0;
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
