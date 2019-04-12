<template>
  <div class="main">
    <div class="my_contain">
      <div class="resource_div">
        <router-link to="">
          <div class="resource_img">
            <img src="../../../static/img/logo.png" alt="">
          </div>
          <h2 class="resource_title">微信小程序入门与实战 常用组件API开发技巧项目实战</h2>
          <p class="resource_info"><span>2018-2-2</span><span class="read">阅读</span><span class="pinglun">评论</span>
            <span class="resource_zan" @click="zan"><img v-if="isZan" class="zan" src="../../../static/img/zaned.png" alt=""><img v-if="!isZan" class="zan" src="../../../static/img/zan.png" alt=""><span>14</span></span>
          </p>
        </router-link>
      </div>
      <div class="resource_div">

      </div>
      <div class="resource_div">

      </div>
      <div class="resource_div">

      </div>
      <div class="resource_div">

      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "resource",
    data: function () {
      return {
        isZan:false,
      };
    },
    methods:{
      zan:function () {
        this.isZan=!this.isZan;

      }
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .my_contain {
      max-width: 1280px;
      width: 80%;
      margin: 20px auto;
      min-height: 800px;
      padding-top: 2%;
      .resource_div {
        width: 23%;
        height: 260px;
        margin-right: 2%;
        margin-bottom: 2.5%;
        padding: 12px;
        background-color: white;
        float: left;
        .resource_img{
          width: 100%;
          height: 150px;
          img{
            width: 100%;
            height: 150px;
            vertical-align:middle;
            transition: all 0.6s;
            cursor: pointer;
          }
          img:hover{
            transform: scale(1.05);
            z-index:999
          }
        }
        .resource_title{
          text-align: center;
          font-size: 14px;
          color: black;
          font-weight: bold;
          line-height: 20px;
        }
        .resource_info{
          font-size: 14px;
          color: #bbb;
          line-height: 30px;
          .read{
            margin-left: 10px;
          }
          .pinglun{
            margin-left: 10px;
          }
          .resource_zan{
            float: right;
            .zan{
              width: 20px;
              height: 20px;
              vertical-align: middle;
              margin-bottom: 2px;
            }
          }
        }

      }
    }
  }
</style>
