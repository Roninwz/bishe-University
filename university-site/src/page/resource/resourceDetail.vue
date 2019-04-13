<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <section class="col-md-8 myResource" id="mainstay">
            <h2 class="resource_title">{{resource.title}}</h2>
            <p class="resource_info"><span>{{resource.createTime}}</span><span>作者：{{resource.creater.name}}</span><span>阅读：{{resource.lookNum}}</span>
            </p>
            <div class="resource clearfix" v-html="resource.content">

            </div>

          </section>
          <aside class="col-md-4 myAside" id="sidebar">
            <aside>
              <div class="panel">
                <div class="panel-heading">
                  热门资源
                </div>
                <div class="panel-body">
                  <div class="hot_resource_div" v-for="hotResource in resourceMoreSix">
                    <router-link :to="{path:'/view/user/resourceDetail',query:{id:hotResource._id}}">
                      <div class="hot_resource_img">
                        <img :src="$Roninwz.path.publicPath+hotResource.imgUrl" alt="">
                      </div>
                      <p class="hot_resource_title">{{hotResource.title}}</p>
                    </router-link>
                  </div>
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
          findResourceById: '/api/admin/resource/find',
          findMoreSix: '/api/admin/resource/findMoreSix',
          updateLookNum: '/api/admin/resource/updateLookNum/'
        },
        resourceId: '',
        resource: {
          creater: {}
        },
        resourceMoreSix: [],
      };

    },
    methods: {
      initResourceData: function () {
        let _this = this;
        _this.$fetch(this.url.findResourceById, {_id: _this.resourceId}).then(reData => {
          if (reData.success) {
            if (reData.rows.length > 0) {
              _this.resource = reData.rows[0];
            }
          }
        });
      },
      initResourceMoreSixData: function () {
        let _this = this;
        _this.$fetch(this.url.findMoreSix).then(reData => {
          if (reData.success) {
            _this.resourceMoreSix = reData.rows;
            console.log(JSON.stringify(_this.resourceMoreSix))
          }
        });
      },
      updateLookNum: function () {
        let _this = this;
        _this.$post(this.url.updateLookNum + _this.resourceId, {id: _this.resourceId}).then(reData => {
          if (reData.success) {
            _this.$set(_this.resource, "lookNum", reData.data.lookNum);
          }
        });
      },
      getResourceId: function () {
        this.resourceId = this.$route.query.id;
      }
    },

    watch: {
      $route() {
        this.resourceId = this.$route.query.id
      },
      resourceId() {
        this.getResourceId();
        this.initResourceData();
        this.updateLookNum();
      },
    },
    created: function () {
      this.initResourceData();
      this.initResourceMoreSixData();
      this.getResourceId();
    },
    mounted: function () {

    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .myResource {
      background-color: white;
      margin-top: 20px;
      min-height: 900px;
      .resource_title {
        font-size: 18px;
        font-weight: bold;
      }
      .resource_info {
        font-size: 14px;
        line-height: 25px;
        color: #999;
        span {
          margin-right: 20px;
        }
      }
    }

    .myAside {
      padding-top: 20px;
      .panel {

        .panel-heading {
          background-color: #16a085;
          color: #fff;
        }
        .panel-body {
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

          .hot_resource_div {
            width: 47%;
            height: 130px;
            float: left;
            border: 1px solid #e3e3e3;
            margin-left: 2%;
            margin-top: 2%;
            .hot_resource_img {
              width: 100%;
              height: 100px;
              img {
                width: 100%;
                height: 100px;
              }
            }
            .hot_resource_title {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              color: #555;
            }
            .hot_resource_title:hover {
              color: #16a085;
            }
          }
        }

      }
    }

  }
</style>
