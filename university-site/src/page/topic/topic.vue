<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <div class="myTopic" v-if="userInfo!=null">
            <p>我关注的话题</p>
            <div class="my_topic_list">
              <div class="topic_one" v-for="myTopic in MyTopicList">
                <div class="topic_img">
                  <img :src="$Roninwz.path.publicPath+myTopic.imgUrl" alt="">
                </div>
                <div class="topic_info">
                  <router-link :to="{path:'/view/user/topicDetail',query:{id:myTopic.id}}">
                    <span class="topic_title">{{myTopic.name}}</span>
                  </router-link>
                  <span class="topic_num">{{myTopic.attentionNum}}关注</span>
                  <span class="topic_attention" @click="cancelAttention(myTopic)">取消关注</span>
                </div>
              </div>


            </div>
          </div>
          <div class="allTopic">
            <p>全部话题</p>
            <div class="my_topic_list">
              <div class="topic_one" v-for="topic in topicList">
                <div class="topic_img">
                  <img :src="$Roninwz.path.publicPath+topic.imgUrl" alt="">
                </div>
                <div class="topic_info">
                  <router-link :to="{path:'/view/user/topicDetail',query:{id:topic.id}}">
                  <span class="topic_title">{{topic.name}}</span>
                  </router-link>
                  <span class="topic_num">{{topic.attentionNum}}关注</span>
                  <span class="topic_attention" v-if="!topic.isAttention" @click="attention(topic)">+关注</span>
                  <span class="topic_attention" v-if="topic.isAttention">已关注</span>
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
        url: {
          list: '/api/admin/topic/list',
          find: '/api/admin/topic/find',
          save: '/api/admin/topic/save/{id}',
          saveAttention: '/api/admin/topicattention/save',
          findAttention: '/api/admin/topicattention/find',
          removeAttention: '/api/admin/topicattention/remove',
        },
        topicList: [],
        MyTopicList: [],
        userInfo: null,
      };
    },
    methods: {
      initTopicData: function () {
        let _this = this;
        _this.$fetch(this.url.find).then(reData => {
          if (reData.success) {
            _this.topicList = reData.rows;
            if (_this.userInfo != null) {

              _this.topicList.forEach(to => {
                let count = 0;
                _this.$fetch(this.url.findAttention, {user: _this.userInfo._id, topic: to._id}).then(reData => {
                  if (reData.success) {
                    console.log(JSON.stringify(reData));
                    if (reData.rows.length > 0) {
                      _this.$set(to, "isAttention", true);
                    } else {
                      _this.$set(to, "isAttention", false);
                    }
                  }
                })
              });

              _this.topicList.forEach(to => {
                _this.$fetch(this.url.findAttention, {topic: to._id}).then(reData => {
                  if (reData.success) {
                    _this.$set(to, "attentionNum", reData.rows.length);
                  }
                })
              });

            }
          }
        });
      },
      attention: function (topic) {
        let _this = this;
        if (_this.userInfo != null) {
          _this.$post(this.url.saveAttention, {user: _this.userInfo._id, topic: topic._id}).then(reData => {
            if (reData.success) {
              _this.$message({
                message: '关注成功',
                type: 'success',
                duration:1000
              });
              _this.MyTopicList = [];
              _this.topicList = [];
              _this.initTopicData();
              _this.initMyAttention();

            }
          });
        } else {
          _this.$message({
            message: '请登录',
            type: 'warning',
            duration:1000
          });
        }
      },
      cancelAttention:function (topic) {
        let _this = this;
        _this.$post(this.url.removeAttention, {user: _this.userInfo._id, topic: topic._id}).then(reData => {
          if (reData.success) {
            _this.$message({
              message: '取消关注成功',
              type: 'success',
              duration:1000
            });
            _this.MyTopicList = [];
            _this.topicList = [];
            _this.initTopicData();
            _this.initMyAttention();
          }
        });
      },
      initMyAttention: function () {
        let _this = this;
        _this.$fetch(this.url.findAttention, {user: _this.userInfo._id}).then(reData => {
            if (reData.success) {

              let datas = reData.rows;
              datas.forEach(data => {
                _this.$fetch(this.url.find, {_id: data.topic}).then(reData2 => {
                  if (reData2.success) {
                    if(reData2.rows.length>0){
                      _this.MyTopicList.push(reData2.rows[0]);
                      _this.MyTopicList.forEach(to2 => {
                        _this.$fetch(this.url.findAttention, {topic: to2._id}).then(reData3 => {
                          if (reData3.success) {
                            _this.$set(to2, "attentionNum", reData3.rows.length);
                          }
                        })
                      });
                    }
                  }
                })
              });


            }
          }
        )

      }
    },
    created: function () {
      this.initTopicData();
      this.userInfo = this.$store.state.userInfo;
      if (this.userInfo != null) {
        this.initMyAttention();
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
      overflow: hidden; /*加上它，即可*/
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
          .topic_info {
            margin-top: 10px;
            height: 80px;
            width: 50%;
            float: left;
            line-height: 1 !important;
            .topic_title {
              width: 100%;
              height: 20px;
              display: inline-block;
              line-height: 0.8 !important;
              font-size: 18px;
              font-weight: bold;
            }
            .topic_num {
              width: 100%;
              height: 20px;
              font-size: 12px;
              padding: 0;
              display: inline-block;
              color: #8a9aa9;
              text-align: left;
            }
            .topic_attention {
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
      overflow: hidden; /*加上它，即可*/
      .my_topic_list {
        width: 100%;
        height: auto;
        .topic_one {
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
          .topic_info {
            margin-top: 10px;
            height: 100px;
            width: 50%;
            float: left;
            line-height: 1 !important;
            .topic_title {
              width: 100%;
              height: 20px;
              display: inline-block;
              line-height: 0.8 !important;
              font-size: 18px;
              font-weight: bold;
            }
            .topic_num {
              width: 100%;
              height: 20px;
              font-size: 12px;
              padding: 0;
              display: inline-block;
              color: #8a9aa9;
              text-align: left;
            }
            .topic_attention {
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
