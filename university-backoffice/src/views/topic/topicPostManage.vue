<template>
  <div>
    <dol-list
      :url="url.listTopicPost"
      :query-params="queryForm"
      :default-query-params="queryForm"
      :check-flag="false"
      title="话题帖子管理"
      ref="list">
      <el-button slot="button" @click="addTopic" type="text" style="float: right;">
        <i class="fa fa-plus"></i> 新增
      </el-button>
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="话题名称">
          <el-input v-model="queryForm.name_like" placeholder="话题名称"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table-column prop="topic.name" label="话题名称"/>
      <el-table-column prop="topic.imgUrl" label="话题缩略图">
        <template slot-scope="scope">
          <img :src="$Dolphin.path.publicPath+scope.row.topic.imgUrl" class="activityImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="content" label="帖子内容">
        <template slot-scope="scope">
         <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="帖子发布者"/>
      <el-table-column prop="zanNum" label="点赞量"/>

      <el-table-column prop="_id" width="120px" label="" fixed="right">
        <template slot-scope="scope">
          <el-button slot="button" type="text" @click="detail(scope.row)">
            <i class="fa fa-search"></i>
          </el-button>
          <el-button slot="button" type="text" @click="edit(scope.row)">
            <i class="fa fa-edit"></i>
          </el-button>
          <el-button slot="button" type="text" @click="removeUser(scope.row._id)">
            <i class="fa fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </dol-list>


    <!--用户维护-->
    <el-dialog class="myInput" title="话题维护" top="5vh" :visible.sync="showCreateOrEditDialog"
               :before-close="closeCreateOrEditDialog">
      <el-form ref="topicForm" :model="topicForm" label-width="80px" size="small">
        <el-row :gutter="10">

          <el-col :span="24">
            <el-form-item label="话题名称">
              <el-input v-model="topicForm.name"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="话题简介">
              <el-input type="textarea" rows="5" aria-placeholder="请输入少于1000字" v-model="topicForm.introduction"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card>
          <div slot="header">
            <span>话题缩略图</span>
          </div>
          <dol-upload v-model="topicForm.imgUrl" :on-success="uploadSuccess" type="topic" maxWidth="300px"
                      maxHeight="200px">
            <img class="uImg" v-if="uniformFile" :src="$Dolphin.path.publicPath+topicForm.imgUrl"/>
            <div v-else class="upload-img"><i class="fa fa-plus"></i></div>
          </dol-upload>
        </el-card>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateOrEditDialog()" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>


    <!--话题详情-->
    <el-dialog title="话题详情" top="5vh" :visible.sync="detailDialog">
      <el-form ref="form" :model="detailForm" label-width="80px" size="small" class="editForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="话题名称:">{{detailForm.name}}</el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="话题简介:">{{detailForm.introduction}}</el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="话题缩略图:">
            <img class="uImg"  :src="$Dolphin.path.publicPath+detailForm.imgUrl"/></el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="detailDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="detailSure" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {getUserList} from '../../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        url: {
          listTopicPost: '/api/admin/topicpost/list',
          saveTopic: '/api/admin/topicpost/save/{id}',
          removeTopic: '/api/admin/topicpost/remove/{id}',
        },
        queryForm: {},
        detailForm: {},
        uniformFile: false,
        filters: {
          name: ''
        },
        showAddress: '',
        formId: '',
        loading: false,
        users: [],
        showCreateOrEditDialog: false,
        detailDialog: false,
        topicForm: {},
      }
    },
    methods: {
      /*查询方法*/
      query: function () {
        this.$refs.list.query(this.queryForm);
      },

      /*
       * 图片上传成功回调
       * */
      uploadSuccess(response, file, fileList) {

        this.topicForm.imgUrl = response.data.filePath;
        this.$set(this, 'uniformFile', response.data);

      },

      /*添加用户*/
      addTopic: function () {
        this.showAddress = [];
        this.topicForm = {};
        this.formId = '';
        this.showCreateOrEditDialog = true;
      },
      /*编辑用户*/
      edit: function (data) {
        this.topicForm = Object.assign({}, data);
        this.formId = this.topicForm._id;
        this.showCreateOrEditDialog = true;
      },


      /*删除用户*/
      removeUser: function (id) {

        this.$confirm('确认删除该话题?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          //确认删除
          this.$ajax({
            url: this.url.removeTopic,
            pathData: {id: id},
          }).then(reData => {

            if (reData.success) {
              this.query();
              this.$message("删除成功");
            } else {
              this.$message(reData.message);
            }

          });

        }).catch(() => {
          this.$message('已取消');
        });

      },
      save: function () {
        let _this = this;
        _this.$ajax({
          method: 'post',
          url: _this.url.saveTopic,
          data: _this.topicForm,
          pathData: {id: this.formId},
        }).then(data => {
          if (data.success) {

            if (_this.formId) {
              _this.$message({
                type: 'success',
                message: "更新话题成功"
              });
            } else {
              _this.$message({
                type: 'success',
                message: "添加话题成功"
              });
            }
            _this.query();
            this.showCreateOrEditDialog = false;
          }
        });
      },


      /*
       * 详情
       * */
      detail: function (data) {
        this.detailForm = data;
        this.detailDialog = true;
      },
      detailSure: function () {
        this.detailDialog = false;
      },
      /**
       * 关闭用户维护对话框
       */
      closeCreateOrEditDialog: function () {
        this.showCreateOrEditDialog = false;
      },
    },
    mounted() {
    },
    created: function () {
    }
  };

</script>
<style>
  .myInput .el-cascader {
    width: 100%;
  }
</style>
<style scoped>
  .activityImg {
    width: 120px;
    height: 100px;
  }
</style>
