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
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年全面从严治党2018年全面从严治党</span><span
                      class="notice-tag">浙江大学</span></router-link>
                  </li>


                </ul>
                <router-link to=""><span class="notice-more">>>更多</span></router-link>
              </div>


          </div>
        </el-col>
      </el-row>
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName2: 'first',
        mark: 0,
        img: [
          '../../static/img/logo.png',
          '../../static/img/logo.png',
          '../../static/img/logo.png',
          '../../static/img/logo.png'
        ],
        time: null
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
      }
    },
    created() {
      this.play()
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/css/animate.min.css";

  .all-content {
    position: absolute;
    background-color: #F6F6F6;
    width: 100%;
    top: 60px;
    bottom: 0px;
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
        margin-top: 70px;
        margin-left: 20px;
        background-color: white;
        .nav-tab-title{
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
              a{
                text-decoration: none;
                .notice-a {
                  display: inline-block;
                  padding-left: 5px;
                  width: 160px;
                  height: 35px;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
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
