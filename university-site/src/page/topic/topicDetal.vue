<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <section class="col-md-8 myPost" id="mainstay">
            <div class="post_content" v-if="userInfo!=null">
              <u-editor v-model="myTopicPost.content" ref="ue"></u-editor>
              <button class="post_push" @click="pushPost">发布</button>
            </div>


            <div class="post_one" v-for="(topicPost,index) in topicPostList">
              <div class="post_userInfo">
                <img :src="$Roninwz.path.publicPath+topicPost.user.imgUrl" alt="">
                <div class="post_username">
                  <span>{{topicPost.user.name}}</span>
                </div>
                <div class="post_datetime">
                  <span>{{topicPost.createTime}}</span>
                </div>
              </div>
              <div class="post_content_txt" v-html="topicPost.content">
              </div>
              <hr class="post_hr">
              <div class="post_footer">
                <span class="resource_zan" @click="zan(topicPost,index)">
                  <img v-if="topicPost.isTopicZan" class="zan" src="../../../static/img/zaned.png" alt="">
                  <img v-if="!topicPost.isTopicZan" class="zan" src="../../../static/img/zan.png" alt="">
                  <span class="zanTxt">{{topicPost.zanNum}}</span>
                </span>
                <span class="post_ge"></span>
                <span class="coment" @click="topicPost.isComment=!topicPost.isComment"><img
                  src="../../../static/img/comment.png" alt=""></span>
              </div>
              <div class="my_comment_div" v-if="topicPost.isComment">
                <div class="comment_div" id="editor">
                  <u-editor2 v-model="commentUeditorList[index].content" ref="ue2" :id="topicPost._id"></u-editor2>
                  <button class="post_comment" @click="pushComment(topicPost,index)">评论</button>
                </div>
                <div class="comment_list" v-for="comment in topicPost.commentList">
                  <div class="post_userInfo">
                    <img :src="$Roninwz.path.publicPath+comment.user.imgUrl" alt="">
                    <div class="post_username">
                      <span>{{comment.user.name}}</span>
                    </div>
                    <div class="post_datetime">
                      <span>{{comment.createTime}}</span>
                    </div>
                  </div>
                  <div class="comment_content" v-html="comment.content">

                  </div>
                </div>
              </div>
            </div>

          </section>
          <aside class="col-md-4 myAside" id="sidebar">
            <div class="aside_div">

              <div class="aside_img">
                <img :src="$Roninwz.path.publicPath+topic.imgUrl" alt="">
              </div>
              <div class="aside_logo">
                <img :src="$Roninwz.path.publicPath+topic.imgUrl" alt="">
              </div>
              <p class="aside_title">{{topic.name}}</p>
              <button v-if="isAttention" @click="cancelAttentionTopic" class="aside_atten">已关注</button>
              <button v-if="!isAttention" @click="attentionTopic" class="aside_atten">关注</button>
              <div class="aside_intro">
                <p class="aside_intro_title">话题介绍</p>
                <div class="aside_content">
                  {{topic.introduction}}
                </div>


              </div>
            </div>


          </aside>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
  import UEditor from '../../components/ueditor/ueditor.vue'
  import UEditor2 from '../../components/ueditor2/ueditor.vue'

  export default {
    components: {
      'u-editor': UEditor,
      'u-editor2': UEditor2,
    },
    name: "topic",
    data: function () {
      return {
        url: {
          find: '/api/admin/topicpost/find',
          findTopic: '/api/admin/topic/find',
          save: '/api/admin/topicpost/save',
          saveComment: '/api/admin/topicpostcomment/save',
          findComment: '/api/admin/topicpostcomment/find',
          findAttention: '/api/admin/topicattention/find',
          saveAttention: '/api/admin/topicattention/save',
          removeAttention: '/api/admin/topicattention/remove',
          updateZanTopicPostNum: '/api/admin/topicpost/updateZanNum',
        },
        myTopicPost: {
          content: ''
        },
        comment: {
          content: ''
        },
        commentUeditorList: [],
        commentList: [],
        isComment: false,
        topic: {},
        topicPostList: [],
        topicId: '',
        userInfo: null,
        isAttention: false,//该话题是否被关注
      };
    },
    methods: {
      initTopicData: function () {
        let _this = this;
        _this.$fetch(this.url.find+'?topic='+_this.topicId).then(reData => {
          if (reData.success) {
            if (reData.rows.length > 0) {
              _this.topicPostList = reData.rows;
              let arrObject = {content: ''};
              for (let i = 0; i < _this.topicPostList.length; i++) {
                _this.$set(_this.topicPostList[i], "isComment", false);
                _this.commentUeditorList.push(arrObject);
                if (localStorage.getItem("isTopicZan" + _this.topicPostList[i]._id) == 'zan') {
                  _this.$set(_this.topicPostList[i], "isTopicZan", true);
                } else {
                  _this.$set(_this.topicPostList[i], "isTopicZan", false);
                }

                let commentList = [];
                _this.$fetch(this.url.findComment, {topicPost: _this.topicPostList[i]._id}).then(reData2 => {
                  if (reData2.success) {
                    commentList = reData2.rows;
                    _this.$set(_this.topicPostList[i], "commentList", commentList);

                    console.log("topicPostList:" + JSON.stringify(_this.topicPostList));
                  }
                });


              }
            }
          }
        });
        _this.$fetch(this.url.findTopic, {_id: _this.topicId}).then(reData => {
          if (reData.success) {
            if (reData.rows.length > 0) {
              _this.topic = reData.rows[0];
            }
          }
        });


      },

      initIsAttention: function () {
        let _this = this;
        if (_this.userInfo != null) {
          _this.$fetch(this.url.findAttention, {user: _this.userInfo._id, topic: _this.topicId}).then(reData => {
            if (reData.success) {

              if (reData.rows.length > 0) {
                _this.isAttention = true;
              } else {
                _this.isAttention = false;
              }

            }

          })
        }
      },

      attentionTopic: function () {
        let _this = this;
        if (_this.userInfo != null) {
          _this.$post(this.url.saveAttention, {user: _this.userInfo._id, topic: _this.topicId}).then(reData => {
            if (reData.success) {
              _this.$message({
                message: '关注成功',
                type: 'success',
                duration:1000
              });
              _this.isAttention = true;
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
      cancelAttentionTopic:function () {
        let _this = this;
        if (_this.userInfo != null) {
          _this.$post(this.url.removeAttention, {user: _this.userInfo._id, topic: _this.topicId}).then(reData => {
            if (reData.success) {
              _this.$message({
                message: '取消关注成功',
                type: 'success',
                duration:1000
              });
              _this.isAttention = false;
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

      //发布帖子
      pushPost: function () {
        let _this = this;
        if (_this.myTopicPost.content.trim() != '') {
          _this.$post(this.url.save, {
            user: this.userInfo._id,
            topic: _this.topicId,
            content: _this.myTopicPost.content
          }).then(reData => {
            if (reData.success) {
              _this.$message({
                message: "发布成功",
                type: 'success',
                duration:1000
              });
              _this.myTopicPost.content = '';
              _this.initTopicData();
            }
          });
        } else {
          _this.$message({
            message: "内容不能为空",
            type: 'warning',
            duration:1000
          });
        }
      },
      //发布评论
      pushComment: function (topicPost, index) {
        let _this = this;
        if (_this.userInfo != null) {
          if (_this.commentUeditorList[index].content.trim() != '') {
            _this.$post(this.url.saveComment, {
              user: this.userInfo._id,
              topicPost: topicPost._id,
              content: _this.commentUeditorList[index].content
            }).then(reData => {
              if (reData.success) {
                _this.$message({
                  message: "评论成功",
                  type: 'success',
                  duration:1000
                });
                _this.commentUeditorList[index].content = '';
                _this.initTopicData();
              }
            });
          } else {
            _this.$message({
              message: "评论内容不能为空",
              type: 'warning',
              duration:1000
            });
          }
        } else {
          _this.$message({
            message: '请登录',
            type: 'warning',
            duration:1000
          });
        }

      },
      updateZanTopicPostNum: function (id, zanNum) {
        let _this = this;
        _this.$fetch(this.url.updateZanTopicPostNum, {id: id, zanNum: zanNum}).then(reData => {
          if (reData.success) {

          }
        });
      },
      zan: function (topicPost, index) {
        if (topicPost.isTopicZan) {
          if (topicPost.zanNum > 0) {
            topicPost.zanNum--;
          }
          topicPost.isTopicZan = false;
          localStorage.setItem("isTopicZan" + topicPost._id, "nozan");
        } else {
          topicPost.zanNum++;
          topicPost.isTopicZan = true;
          localStorage.setItem("isTopicZan" + topicPost._id, "zan");
        }
        this.$set(this.topicPostList, index, topicPost);
        this.updateZanTopicPostNum(topicPost._id, topicPost.zanNum);
      },
    },
    mounted() {
    },
    created: function () {
      this.initTopicData();
      this.userInfo = this.$store.state.userInfo;
      if (this.userInfo != null) {
        this.initIsAttention();
      }
      this.topicId = this.$route.query.id;
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .myPost {
      margin-top: 20px;
      .post_content {
        width: 100%;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        height: 290px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        img {
          width: 40px;
          height: 40px;
        }
        .post_push {
          margin-top: 10px;
          float: right;
          width: 6.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          text-align: center;
          background-color: #16a085;
          color: white;
          border: none;
          border-radius: 2px;
        }
      }

      .post_one {
        margin-top: 20px;
        width: 100%;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        .post_userInfo {
          padding: 10px 10px 10px 20px;
          width: 100%;
          line-height: 50px;
          img {
            width: 45px;
            height: 45px;
            float: left;
          }
          .post_username {
            margin-left: 20px;
            margin-top: -10px;
            width: 70%;
            height: 20px;
            float: left;
          }
          .post_datetime {
            margin-left: 20px;
            width: 70%;
            font-size: 14px;
            color: #999;
            height: 20px;
            float: left;
          }
        }
        .post_content_txt {
          padding: 10px 10px 5px 20px;
          margin-top: 55px;
          width: 100%;
          display: block;
        }
        .post_hr {
          width: 100%;
          height: 1px;
        }
        .post_footer {
          position: relative;
          padding: 0 10px 10px 0;
          top: -10px;
          width: 100%;
          height: 20px;
          line-height: 20px;
          .resource_zan {
            position: relative;
            width: 50%;
            font-size: 16px;
            float: left;
            text-align: center;
            img {
              width: 25px;
              height: 25px;
              vertical-align: middle;
            }
            .zanTxt {
              position: relative;
              top: 2px;
              display: inline-block;
            }
          }
          .post_ge {
            margin-top: -5px;
            width: 1px;
            height: 30px;
            background-color: #e3e3e3;
            float: left;
          }
          .coment {
            position: relative;
            margin-top: -5px;
            width: 48%;
            float: right;
            text-align: center;
          }
        }
        .my_comment_div {
          position: relative;
          width: 100%;
          height: auto;
          .comment_div {
            width: 100%;
            height: 200px;
            overflow: hidden;
            .post_comment {
              margin-top: 10px;
              margin-right: 10px;
              float: right;
              width: 6.5rem;
              height: 2.5rem;
              line-height: 2.5rem;
              text-align: center;
              background-color: #16a085;
              color: white;
              border: none;
              border-radius: 2px;
            }
          }
          .comment_list {
            width: 100%;
            height: 150px;
            margin-top: 10px;
            padding-left: 70px;
            .post_userInfo {
              position: relative;
              padding: 10px 10px 10px 20px;
              width: 100%;
              line-height: 50px;
              img {
                width: 45px;
                height: 45px;
                float: left;
              }
              .post_username {
                margin-left: 20px;
                margin-top: -10px;
                width: 70%;
                height: 20px;
                float: left;
              }
              .post_datetime {
                margin-left: 20px;
                width: 70%;
                font-size: 14px;
                color: #999;
                height: 20px;
                float: left;
              }
            }
            .comment_content {
              padding-left: 20px;
              position: relative;
              width: 100%;
              height: 70px;
              overflow: hidden;
              top: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }

      }
    }

    .myAside {
      margin-top: 20px;
      .aside_div {
        position: relative;
        width: 100%;
        background-color: white;
        min-height: 360px;
        height: auto;
        .aside_img {
          width: 100%;
          height: 100px;
          img {
            width: 100%;
            height: 100px;
            object-fit: cover;
          }
        }
        .aside_logo {
          position: absolute;
          top: 60px;
          text-align: center;
          width: 100%;
          img {
            width: 60px;
            height: 60px;
            border: 2px solid hsla(0, 0%, 100%, .6);
            background-color: white;
            box-sizing: content-box;
            border-radius: 3px;
          }
        }

        .aside_title {
          position: relative;
          top: 40px;
          width: 100%;
          text-align: center;
          color: #17181a;
          font-size: 15px;
          font-weight: 600;
        }

        .aside_atten {
          position: relative;
          top: 40px;
          left: 140px;
          width: 6.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          text-align: center;
          background: #fff;
          border-radius: 3px;
          color: #16a085;
          border: 1px solid #16a085;
          font-size: 15px;
          margin: 10px 0 8px;
        }

        .aside_intro {
          position: relative;
          top: 60px;
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
          .aside_intro_title {
            font-size: 16px;
            font-weight: bold;
          }
          .aside_content {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
      }

    }

  }
</style>
