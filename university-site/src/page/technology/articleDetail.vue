<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <section class="col-md-8 myArticle" id="mainstay">
            <div class="article clearfix" v-html="article">

            </div>

          </section>
          <aside class="col-md-4 myAside" id="sidebar">
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
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net">网络日志</li>
                    <li class="clearfix new_net2">网络日志</li>
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
    name: "articleDetail",
    data: function () {
      return {
        url: {
          findArticleById: '/api/admin/technology/find',
          findLastFiveArticles: '/api/admin/technology/findLastFive',
          updateLookNum: '/api/admin/technology/updateLookNum/'
        },
        articleId: '',
        article: {},
        lastFiveArticles:[],
      };

    },
    methods: {
      initArticleData: function () {
        let _this = this;
        _this.$fetch(this.url.findArticleById, {_id: _this.articleId}).then(reData => {
          if (reData.success) {
            if(reData.rows.length>0){
              _this.article = reData.rows[0].content;
            }
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
      updateLookNum:function () {
        console.log("lllllllllllllllllllllllll")
        console.log("ll:"+this.articleId)
        let _this = this;
        _this.$post(this.url.updateLookNum+_this.articleId,{id:_this.articleId}).then(reData => {
          if (reData.success) {
            _this.$set(_this.article, "lookNum", reData.data.lookNum);
          }
        });
      },
      getArticleId:function () {
        this.articleId = this.$route.query.id;
      }
    },

    watch: {
      $route(){
        this.articleId = this.$route.query.id
      },
      articleId() {
        this.getArticleId();
        this.initArticleData();
        this.updateLookNum();
      },
    },
    created: function () {
      this.initArticleData();
      this.initLastFiveArticlesData();
      this.getArticleId();
    },
    mounted:function () {

    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .myArticle{
      padding-top: 20px;
    }

    .myAside{
      padding-top: 20px;
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
