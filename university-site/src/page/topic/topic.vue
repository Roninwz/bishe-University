<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <div class="myTopic">
            <p>我关注的话题</p>
            <div class="my_topic_list">
              <div class="topic_one">
                <div class="topic_img">
                  <img src="../../../static/img/software1.png" alt="">
                </div>
                <div class="topic_info">
                  <span class="topic_title">一图胜千言</span>
                  <span class="topic_num">3000关注</span>
                  <span class="topic_attention" @click="attention()">+关注</span>
                </div>
              </div>
              <div class="topic_one">
                <div class="topic_img">
                  <img src="../../../static/img/software1.png" alt="">
                </div>
                <div class="topic_info">
                  <span class="topic_title">一图胜千言</span>
                  <span class="topic_num">3000关注</span>
                  <span class="topic_attention" @click="attention()">+关注</span>
                </div>
              </div>
              <div class="topic_one">
                <div class="topic_img">
                  <img src="../../../static/img/software1.png" alt="">
                </div>
                <div class="topic_info">
                  <span class="topic_title">一图胜千言</span>
                  <span class="topic_num">3000关注</span>
                  <span class="topic_attention" @click="attention()">+关注</span>
                </div>
              </div>
              <div class="topic_one">
                <div class="topic_img">
                  <img src="../../../static/img/software1.png" alt="">
                </div>
                <div class="topic_info">
                  <span class="topic_title">一图胜千言</span>
                  <span class="topic_num">3000关注</span>
                  <span class="topic_attention" @click="attention()">+关注</span>
                </div>
              </div>

            </div>
          </div>
          <div class="allTopic">
            <p>全部话题</p>
            <div class="my_topic_list">
              <div class="topic_one">
                <div class="topic_img">
                  <img src="../../../static/img/software1.png" alt="">
                </div>
                <div class="topic_info">
                  <span class="topic_title">一图胜千言</span>
                  <span class="topic_num">3000关注</span>
                  <span class="topic_attention" @click="attention()">+关注</span>
                </div>
              </div>

            </div>
          </div>


        </section>
      </div>
    </section>
  </div>

</template>

<script>
  export default {
    name: "topic",
    data: function () {
      return {

      };
    },
    methods:{
      attention:function () {

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
    .myTopic {
      position: relative;
      padding-left: 100px;
      margin-top: 20px;
      font-size: 24px;
      width: 100%;
      height: auto;
      color: #0e0e0e;
      font-weight: 600;
      overflow:hidden;/*加上它，即可*/
      .my_topic_list {
        width: 88%;
        height: auto;
        .topic_one {
          margin-top: 15px;
          width: 30%;
          height: 100px;
          float: left;
          .topic_img {
            width: 30%;
            height: 100%;
            text-align: left;
            float: left;
            line-height: 100px;
            img {
              width: 72px;
              height: 72px;
            }
          }
          .topic_info{
            margin-top: 10px;
            height: 80px;
            width: 50%;
            float: left;
            line-height: 1 !important;
            .topic_title{
              width: 100%;
              height: 20px;
              display: inline-block;
              line-height: 0.8 !important;
              font-size: 18px;
              font-weight: bold;
            }
            .topic_num{
              width: 100%;
              height: 20px;
              font-size: 12px;
              padding: 0;
              display: inline-block;
              color: #8a9aa9;
             text-align: left;
            }
            .topic_attention{
              width: 100%;
              height: 20px;
              padding: 0;
              display: inline-block;
              font-size: 12px;
              color: #37c701;
              text-align: left;
            }
          }
        }
      }
    }

    .allTopic {
      position: relative;
      padding-left: 100px;
      margin-top: 40px;
      font-size: 24px;
      width: 100%;
      height: auto;
      color: #0e0e0e;
      font-weight: 600;
      overflow:hidden;/*加上它，即可*/
      .my_topic_list {
        width: 100%;
        height: auto;
        .topic_one {
          width: 30%;
          height: 100px;
          .topic_img {
            width: 30%;
            height: 100%;
            text-align: left;
            float: left;
            line-height: 100px;
            img {
              width: 72px;
              height: 72px;
            }
          }
          .topic_info{
            margin-top: 10px;
            height: 100px;
            width: 50%;
            float: left;
            line-height: 1 !important;
            .topic_title{
              width: 100%;
              height: 20px;
              display: inline-block;
              line-height: 0.8 !important;
              font-size: 18px;
              font-weight: bold;
            }
            .topic_num{
              width: 100%;
              height: 20px;
              font-size: 12px;
              padding: 0;
              display: inline-block;
              color: #8a9aa9;
             text-align: left;
            }
            .topic_attention{
              width: 100%;
              height: 20px;
              padding: 0;
              display: inline-block;
              font-size: 12px;
              color: #37c701;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>
