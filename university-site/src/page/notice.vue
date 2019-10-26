<template>
  <div class="main">

    <div class="notice_list">
      <p>公告列表</p>
      <div class="notice_one" v-for="notice in noticeList">
        <div class="notice_img">
          <img src="../../static/img/notice.png" alt="">
        </div>
        <div class="notice_title">
          {{notice.title}}
        </div>
        <div class="notice_content">
          {{notice.content}}
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: "notice",
    data: function () {
      return {
        findNoticeUrl: '/api/admin/notice/find',
        noticeList:[],
      };
    },
    methods:{
      initNoticeData: function () {
        let _this = this;
        _this.$fetch(_this.findNoticeUrl).then(reData => {
          if (reData.success) {
            _this.noticeList = reData.rows;
          }
        });
      },
    },
    created:function () {
      this.initNoticeData();
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    padding: 20px 0;

    p{
      padding-top: 15px;
      text-align: center;
      font-size: 25px;
    }
    .notice_list {
      width: 80%;
      margin: 10px auto;
      /*overflow: hidden;*/
      .notice_one {
        width: 100%;
        background-color: white;
        border-radius: 10px;
        .notice_img{
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: white;
          img{
            width: 50px;
            height: 50px;
            margin: 10px;
          }
        }
        .notice_title {
          position: relative;
          width: 95%;
          height: 35px;
          line-height: 35px;
          margin: 10px auto;
          margin-left: 70px;
          padding: 0 10px 0 10px;
          top: 10px;
          background-color: #F5F5F5;
          border-radius: 2px;
        }
        .notice_content {
          position: relative;
          width: 95%;
          height: auto;
          line-height: 35px;
          margin: 10px auto;
          margin-left: 70px;
          padding: 0 10px 0 10px;
          border-radius: 2px;
        }
      }


    }

  }
</style>
