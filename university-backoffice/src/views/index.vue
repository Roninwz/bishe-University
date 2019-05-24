<template>
  <div>
    <el-card>
      <el-row class="countPanel">
        <el-col :span="6">
          <div class="countBlock">
            <div class="blockIcon" style="background: rgb(255, 236, 242);color:rgb(237, 96, 179);">
              <i class="fa  fa-users"></i>
            </div>
            <div class="blockInfo">
              <div class="blockNumber">{{userNum}}</div>
              <div>用户人数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="countBlock">
            <div class="blockIcon" style="background: rgb(235, 232, 253);color:rgb(209, 84, 248);">
              <i class="fa fa-book"></i>
            </div>
            <div class="blockInfo">
              <div class="blockNumber">{{technologyNum}}</div>
              <div>技术文章数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="countBlock">
            <div class="blockIcon" style="background: rgb(227, 240, 253);color:rgb(106, 86, 246);">
              <i class="fa fa-database"></i>
            </div>
            <div class="blockInfo">
              <div class="blockNumber">{{resourceNum}}</div>
              <div>资源数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="countBlock">
            <div class="blockIcon" style="background: rgb(238, 250, 230);color:rgb(139, 195, 74);">
              <i class="fa fa-simplybuilt"></i>
            </div>
            <div class="blockInfo">
              <div class="blockNumber">{{topicNum}}</div>
              <div>话题数</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!--i18n: {{ $t("message.hello") }}-->
  </div>
</template>

<script>

  export default {
    name: 'index',
    data(){
      return {
        message: 'hello',
        result: '',
        /**
         * 用户数量
         */
        userNum: 0,
        /**
         * 技术文章数
         */
        technologyNum: 0,
        /**
         * 资源数
         */
        resourceNum: 0,
        /**
         * 话题数
         */
        topicNum: 0,
      }
    },
    methods: {
      /*初始化用户数量*/
      initUserList: function () {
        let _this = this;
        this.$ajax({
          method: 'get',
          url: '/api/users/find',
        }).then(data => {
          _this.userNum = data.rows.length;
        });
      },
      /*初始化技术文章数量*/
      initTeachnologyList: function () {
        let _this = this;
        this.$ajax({
          method: 'get',
          url: '/api/admin/technology/find',
        }).then(data => {
          _this.technologyNum = data.rows.length;
        });
      },
      /*初始化资源数量*/
      initResourceList: function () {
        let _this = this;
        this.$ajax({
          method: 'get',
          url: '/api/admin/resource/find',
        }).then(data => {
          _this.resourceNum = data.rows.length;
        });
      },
      /*初始化话题数量*/
      initTopicList: function () {
        let _this = this;
        this.$ajax({
          method: 'get',
          url: '/api/admin/topic/find',
        }).then(data => {
          _this.topicNum = data.rows.length;
        });
      },



    },
    created(){
      this.initUserList();
      this.initTeachnologyList();
      this.initResourceList();
      this.initTopicList();

    }
  }
</script>
