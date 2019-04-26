<template>
  <div>
    <dol-list
      :url="url.listUser"
      :query-params="queryForm"
      :default-query-params="queryForm"
      :check-flag="false"
      title="公告管理"
      ref="list">
      <el-button slot="button" @click="addUser" type="text" style="float: right;">
        <i class="fa fa-plus"></i> 新增
      </el-button>
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="公告标题">
          <el-input v-model="queryForm.title_like" placeholder="公告标题"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table-column prop="title" label="公告标题"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="creater" width="120px" label="创建人" fixed="right">
        <template slot-scope="scope">
          {{scope.row.creater.name}}
        </template>
      </el-table-column>
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
    <el-dialog class="myInput" title="公告维护" top="5vh" :visible.sync="showCreateOrEditDialog"
               :before-close="closeCreateOrEditDialog">
      <el-form ref="userForm" :model="userForm" label-width="80px" size="small">
        <el-row :gutter="10">

          <el-col :span="24">
            <el-form-item label="公告标题">
              <el-input v-model="userForm.title"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告内容">
              <el-input type="textarea" rows="15" v-model="userForm.content"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateOrEditDialog()" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="公告详情" top="5vh" :visible.sync="detailDialog">
      <el-form ref="form" :model="detailForm" label-width="80px" size="small" class="editForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="公告标题:">{{detailForm.title}}</el-form-item>
          </el-col>
          <el-col :span="12">
            {{detailForm.content}}
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
          listUser: '/api/admin/notice/list',
          saveUser: '/api/admin/notice/save/{id}',
          removeUser: '/api/admin/notice/remove/{id}',
        },
        queryForm: {},
        detailForm: {},
        filters: {
          name: ''
        },
        showAddress: '',
        formId: '',
        loading: false,
        users: [],
        showCreateOrEditDialog: false,
        detailDialog: false,
        userForm: {},
        uniformFile:false,
      }
    },
    methods: {
      /*查询方法*/
      query: function () {
        this.$refs.list.query(this.queryForm);
      },

      /*添加用户*/
      addUser: function () {
        this.userForm = {};
        this.formId = '';
        this.showCreateOrEditDialog = true;
      },
      /*编辑用户*/
      edit: function (data) {
        this.userForm = Object.assign({}, data);
        this.formId = this.userForm._id;
        this.showCreateOrEditDialog = true;
      },


      /*删除用户*/
      removeUser: function (id) {

        this.$confirm('确认删除该公告?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          //确认删除
          this.$ajax({
            url: this.url.removeUser,
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
          url: _this.url.saveUser,
          data: _this.userForm,
          pathData: {id: this.formId},
        }).then(data => {
          if (data.success) {

            if (_this.formId) {
              _this.$message({
                type: 'success',
                message: "更新公告成功"
              });
            } else {
              _this.$message({
                type: 'success',
                message: "添加公告成功"
              });
              // _this.$message("添加公告成功");
            }
            // _this.$router.push('/view/admin/userList');
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
      // this.getUser();
    },
    created: function () {
      this.initUserList();
    }
  };

</script>
<style>
  .myInput .el-cascader {
    width: 100%;
  }
</style>
<style scoped>
  .activityImg{
    width: 100px;
    height: 100px;
  }
</style>
