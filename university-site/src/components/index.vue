<template>
  <div class="all-content">
    <div class="content">
      <el-row :gutter="20" class="nav">
        <el-col :span="18"><div class="grid-content bg-purple">
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
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
            <el-card class="box-card nav-tab">
              <div slot="header" class="clearfix">
                <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
                <span>本站公告</span>
              </div>
              <div  class="text item">
                <ul>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                  <li>
                    <router-link to=""><span class="notice-a">2018年教育系统全面从严治党...</span><span class="notice-tag">浙江大学</span></router-link>
                  </li>
                </ul>
                <router-link to=""><span class="notice-more">>>更多</span></router-link>
              </div>


            </el-card>
        </div></el-col></el-row>
      <router-view/>
    </div>
    <div class="model">
    <el-row :gutter="20">
      <el-col :span="18"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-card class="box-card2">
          <div slot="header" class="clearfix">
            <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

      </div></el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          activeName2: 'first',
          mark:0,
          img:[
            '../../static/img/logo.png',
            '../../static/img/logo.png',
            '../../static/img/logo.png',
            '../../static/img/logo.png'
          ],
          time:null
        };

      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        change(i){
          this.mark = i;
        },
        prev(){
          this.mark--;
          if(this.mark === -1){
            this.mark = 3;
            return
          }
        },
        next(){
          this.mark++;
          if(this.mark === 4){
            this.mark = 0;
            return
          }
        },
        autoPlay(){
          this.mark++;
          if(this.mark === 4){
            this.mark = 0;
            return
          }
        },
        play(){
          this.time = setInterval(this.autoPlay,3000);
        },
        enter(){
          console.log('enter')
          clearInterval(this.time);
        },
        leave(){
          console.log('leave')
          this.play();
        },
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      created(){
        this.play()
      }
    }
</script>

<style scoped>
  @import "../assets/css/animate.min.css";
  .carousel{
    /*width: 600px;*/
    width: 800px;
    height: 430px;
    overflow: hidden;
    margin: 50px 100px 50px 50px;
    position: relative;
    background-color: #F6F6F6;
  }
  .carousel ul{
    width: 100%;
    height: 100%;
  }
  .carousel ul li{
    position: absolute;
  }
  .carousel ul li a img{
    width: 800px;
    height: 430px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .bullet{
    position: absolute;
    font-size: 0;
    bottom: 20px;
    left: 50%;
    margin-left: -42px;
  }
  .bullet span{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    margin-left: 15px;
    border-radius: 10px;
  }
  .bullet span:first-child{
    margin-left: 0;
  }
  .switch{

  }
  .switch span{
    position: absolute;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(0,0,0,.1);
    font-size: 20px;
    color: #ffffff;
    top: 50%;
    margin-top: -25px;
    cursor: pointer;
    font-family: "宋体";
  }
  .switch span:hover{

    background-color: rgba(0,0,0,.5);

  }
  .prev{
    left: 0;
  }
  .next{
    right: 0;
  }
  .active{
    background-color: red !important;
  }

  .all-content{
    width: 100%;
    background-color: #F6F6F6;
  }
  .content{
    width: 1200px;
    margin: 0 auto;
  }

  .nav-tab{
    width: 305px;
    height: 430px;
    margin-top: 70px;
    margin-left: 20px;
    background-color: white;
  }
  .el-tabs__item{
    width: 105px;
  }
  .model{
    width: 1280px;
    height: 600px;
    margin: 0 auto;
  }
  /*.model .box-card{*/
    /*width: 1000px;*/
    /*height: 600px;*/
  /*}*/

  .item ul li{
    width: 100%;
    height: 25px;
    display: block;
    font-size: 13px;
    border-bottom: 1px solid #F6F6F6;
  }
  .item ul li::before{
    content:"★";
    color:blue;
    font-size:13px;
  }
  .item a:hover{
    color: red;
  }
.notice-a{
  width:160px;
  height: 25px;
}
  .notice-tag{
    padding-left: 20px;
    width: 70px;
    height: 25px;
  }
  .notice-more{
    float: right;
  }
  .hot-title{
    width: 130px;
   height: 35px;
    display: block;
    overflow: hidden;
    margin-top: 15px;
  }
  .views{
    float: left;
  margin-top: 20px;
  }
  .item ul li .fa-thumbs-o-up{
    float: right;
    margin-top: 20px;
  }
</style>
