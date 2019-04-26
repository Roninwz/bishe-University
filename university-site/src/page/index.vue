<template>
  <div class="all-content">
    <div class="content">
      <el-row :gutter="20" class="nav">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <div class="carousel" @mouseenter="enter" @mouseleave="leave">
              <transition-group
                tag="ul"
                name="image"
                enter-active-class="animated lightSpeedIn"
                leave-active-class="animated lightSpeedOut"
              >
                <li v-for='(image,index) in img' :key='index' v-show="index === mark">
                  <a href="javascript:;">
                    <img :src="image">
                  </a>
                </li>
              </transition-group>
              <div class="bullet">
              <span v-for="(item,index) in img.length" :class="{'active':index === mark}"
                    @click="change(index)" :key="index"></span>
              </div>
              <div class="switch">
                <span class="prev" @click="prev">&lt;</span>
                <span class="next" @click="next">&gt;</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="nav-tab">
            <div class="nav-tab-title">
              <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
              <span>本站公告</span>
            </div>
            <div class="text item">
              <ul>
                <li v-for="notice in lastTimeNoticeList">
                  <router-link to=""><span class="notice-a">{{notice.title}}</span><span
                    class="notice-tag">{{notice.tag}}</span></router-link>
                </li>

              </ul>
              <router-link to=""><span class="notice-more">>>更多</span></router-link>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="new_technology">
        <div class="new_technology_title">
          <span class="head_left_shu"></span>
          <span class="head_left">最新技术文章</span>
          <router-link to="/view/user/technology">
            <span class="head_right">更多>></span>
          </router-link>
        </div>

        <div class="article_one" v-for="article in lastLookFiveArticlesList">
          <router-link :to="{path:'/view/user/technologyArticleDetail',query:{id:article.id}}">
          <p>{{article.title}}</p>
          <div class="art_content">
            <img :src="$Roninwz.path.publicPath+article.imgUrl" alt="">
            <div class="art_con">
              {{article.abstract}}
            </div>
          </div>
          </router-link>
        </div>

      </div>
      <div class="new_resource">
        <div class="new_technology_title">
          <span class="head_left_shu"></span>
          <span class="head_left">最新资源分享</span>
          <router-link to="/view/user/resource">
            <span class="head_right">更多>></span>
          </router-link>
        </div>

        <div class="resource_one" v-for="resource in lastLookFiveResourceList">
          <router-link :to="{path:'/view/user/resourceDetail',query:{id:resource._id}}">
          <div class="art_content">
            <img :src="$Roninwz.path.publicPath+resource.imgUrl" alt="">
            <div class="resource_title">
              {{resource.title}}
            </div>
          </div>
          </router-link>
        </div>

      </div>
      <!--<router-view/>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        findLastLookArticlesUrl: '/api/admin/technology/findLastLook',
        findLastLookResourceUrl: '/api/admin/resource/findLastLook',
        findLastTimeNoticeUrl: '/api/admin/notice/findLastTimeTen',
        activeName2: 'first',
        mark: 0,
        img: [
          '../../static/img/lun1.jpg',
          '../../static/img/lun2.jpg',
          '../../static/img/lun3.jpg',
          '../../static/img/lun4.jpeg'
        ],
        time: null,
        lastLookFiveArticlesList:[],
        lastLookFiveResourceList:[],
        lastTimeNoticeList:[],
      };

    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      change(i) {
        this.mark = i;
      },
      prev() {
        this.mark--;
        if (this.mark === -1) {
          this.mark = 3;
          return
        }
      },
      next() {
        this.mark++;
        if (this.mark === 4) {
          this.mark = 0;
          return
        }
      },
      autoPlay() {
        this.mark++;
        if (this.mark === 4) {
          this.mark = 0;
          return
        }
      },
      play() {
        this.time = setInterval(this.autoPlay, 3000);
      },
      enter() {
        console.log('enter')
        clearInterval(this.time);
      },
      leave() {
        console.log('leave')
        this.play();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },


      initLastLookArticlesData: function () {
        let _this = this;
        _this.$fetch(_this.findLastLookArticlesUrl).then(reData => {
          if (reData.success) {
            _this.lastLookFiveArticlesList = reData.rows;
          }
        });
      },
      initLastLookResouceData: function () {
        let _this = this;
        _this.$fetch(_this.findLastLookResourceUrl).then(reData => {
          if (reData.success) {
            _this.lastLookFiveResourceList = reData.rows;
          }
        });
      },
      initLastTimeNoticeData: function () {
        let _this = this;
        _this.$fetch(_this.findLastTimeNoticeUrl).then(reData => {
          if (reData.success) {
            _this.lastTimeNoticeList = reData.data;
          }
        });
      },
    },
    created() {
      this.play();
      this.initLastLookArticlesData();
      this.initLastLookResouceData();
      this.initLastTimeNoticeData();
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/css/animate.min.css";

  .all-content {
    position: relative;
    background-color: #F6F6F6;
    width: 100%;
    height: 100%;
    min-height: 1400px;
    /*top: 60px;*/
    left: 0px;
    .content {
      width: 1200px;
      margin: 0 auto;
      .carousel {
        width: 800px;
        height: 430px;
        overflow: hidden;
        margin: 50px 100px 50px 50px;
        position: relative;
        background-color: #F6F6F6;
        ul {
          width: 100%;
          height: 100%;
          li {
            position: absolute;
            a img {
              width: 800px;
              height: 430px;
              display: table-cell;
              vertical-align: middle;
              text-align: center;
            }
          }
        }

        .bullet {
          position: absolute;
          font-size: 0;
          bottom: 20px;
          left: 50%;
          margin-left: -42px;
          span {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: #ffffff;
            margin-left: 15px;
            border-radius: 10px;
          }
          span:first-child {
            margin-left: 0;
          }
          .active {
            background-color: #16a085;
          }
        }

        .switch {
          span {
            position: absolute;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: rgba(0, 0, 0, .1);
            font-size: 20px;
            color: #ffffff;
            top: 50%;
            margin-top: -25px;
            cursor: pointer;
            font-family: "宋体";
          }
          span:hover {

            background-color: rgba(0, 0, 0, .5);

          }

          .prev {
            left: 0;
          }

          .next {
            right: 0;
          }

          .active {
            background-color: red !important;
          }
        }

      }

      .nav-tab {
        width: 305px;
        height: 430px;
        margin-top: 50px;
        margin-left: 20px;
        background-color: white;
        .nav-tab-title {
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding-left: 10px;
          background-color: #16a085;
          color: white;
        }
        .item {
          ul {
            li {
              width: 100%;
              height: 35px;
              line-height: 35px;
              padding-left: 10px;
              display: block;
              font-size: 13px;
              border-bottom: 1px solid #F6F6F6;
              a {
                text-decoration: none;
                .notice-a {
                  display: inline-block;
                  padding-left: 5px;
                  width: 160px;
                  height: 35px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .notice-tag {
                  display: inline-block;
                  padding-right: 10px;
                  width: 80px;
                  height: 35px;
                  float: right;
                }
              }
              a:hover {
                color: red;
              }

            }
            li::before {
              content: "★";
              color: #16a085;
              font-size: 13px;
              vertical-align: top;
            }
          }
          .notice-more {
            padding-left: 10px;
            width: 100%;
            float: left;
          }

        }

      }

      .new_technology {
        position: relative;
        top: 20px;
        width: 103%;
        height: 500px;
        background-color: white;
        border-radius: 2px;
        .new_technology_title {
          width: 100%;
          height: 50px;
          .head_left_shu {
            display: inline-block;
            line-height: 30px;
            width: 2px;
            height: 27px;
            margin: 16px 0 5px 20px;
            background-color: #16a085;
            border-radius: 1px;
            float: left;
          }
          .head_left {
            display: inline-block;
            line-height: 30px;
            padding: 15px 10px 5px 10px;
            color: #16a085;
            font-size: 24px;
            float: left;
          }
          .head_right {
            display: inline-block;
            line-height: 30px;
            padding: 15px 10px 5px 10px;
            float: right;
            color: #888888;
          }
        }

        .article_one{
          position: relative;
          width:31%;
          height: 110px;
          margin-left: 2%;
          margin-top: 60px;
          float: left;
          p{
            width: 100%;
            padding-left: 5px;
            padding-top: 5px;
            line-height: 25px;
          }
          .art_content{
            width: 100%;
            img{
              width: 45%;
              height: 95px;
              float: left;
            }
            .art_con{
              width: 54%;
              height: 100%;
              padding: 3px 3px 3px 8px;
              float: left;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              color:#888888;
            }
          }

        }

      }


      .new_resource{
        position: relative;
        top: 40px;
        width: 103%;
        height: 550px;
        background-color: white;
        border-radius: 2px;
        margin-bottom: 50px;
        .new_technology_title {
          width: 100%;
          height: 50px;
          .head_left_shu {
            display: inline-block;
            line-height: 30px;
            width: 2px;
            height: 27px;
            margin: 16px 0 5px 20px;
            background-color: #16a085;
            border-radius: 1px;
            float: left;
          }
          .head_left {
            display: inline-block;
            line-height: 30px;
            padding: 15px 10px 5px 10px;
            color: #16a085;
            font-size: 24px;
            float: left;
          }
          .head_right {
            display: inline-block;
            line-height: 30px;
            padding: 15px 10px 5px 10px;
            float: right;
            color: #888888;
          }
        }

        .resource_one{
          position: relative;
          width:22%;
          height: 180px;
          margin-left: 2.5%;
          margin-top: 50px;
          float: left;
          .art_content{
            width: 100%;
            img{
              width: 100%;
              height: 180px;
            }
            .resource_title{
              position: absolute;
              background-color: #888;
              width: 100%;
              height: 40px;
              color: white;
              padding-left: 10px;
              padding-right: 10px;
              opacity: 0.8;
              line-height: 20px;
              margin-top: -40px;
            }

          }

        }
      }
    }

    .model {
      width: 1280px;
      height: 600px;
      margin: 0 auto;
    }

  }

  /*.el-tabs__item {*/
  /*width: 105px;*/
  /*}*/

  /*.hot-title {*/
  /*width: 130px;*/
  /*height: 35px;*/
  /*display: block;*/
  /*overflow: hidden;*/
  /*margin-top: 15px;*/
  /*}*/

  /*.views {*/
  /*float: left;*/
  /*margin-top: 20px;*/
  /*}*/

  /*.item ul li .fa-thumbs-o-up {*/
  /*float: right;*/
  /*margin-top: 20px;*/
  /*}*/
</style>
