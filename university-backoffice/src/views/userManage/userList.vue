<template>
  <div>
    <dol-list
      :url="url.listUser"
      :query-params="queryForm"
      :default-query-params="queryForm"
      :check-flag="false"
      :loadDataCallback="callBackData"
      title="用户管理"
      ref="list">
      <el-button slot="button" @click="addUser" type="text" style="float: right;">
        <i class="fa fa-plus"></i> 新增
      </el-button>
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name_like" placeholder="用户名"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table-column prop="name" label="用户名"/>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex===0">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="imgUrl" label="头像">
        <template slot-scope="scope">
          <img  :src="$Dolphin.path.publicPath+scope.row.imgUrl" class="activityImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="userAddress" label="地址">
        <template slot-scope="scope">
          {{scope.row.userAddress}}
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
    <el-dialog class="myInput" title="用户维护" top="5vh" :visible.sync="showCreateOrEditDialog"
               :before-close="closeCreateOrEditDialog">
      <el-form ref="userForm" :model="userForm" label-width="80px" size="small">
        <el-row :gutter="10">

          <el-col :span="24">
            <el-form-item label="用户名">
              <el-input v-model="userForm.name"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="性别">
              <el-radio-group v-model="userForm.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="手机号">
              <el-input v-model="userForm.phone"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="头像">
              <dol-upload v-model="userForm.imgUrl" :on-success="uploadSuccess" type="user" maxWidth="300px" maxHeight="200px">
                <img class="activityImg" v-if="uniformFile" :src="$Dolphin.path.publicPath+userForm.imgUrl"/>
                <div v-else class="upload-img"><i class="fa fa-plus"></i></div>
              </dol-upload>
            </el-form-item>

          </el-col>

          <el-col :span="24">
            <el-form-item label="邮箱">
              <el-input v-model="userForm.email"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="地址">
              <dol-address v-model="showAddress" detail-flag="false"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="详细地址">
              <el-input v-model="userForm.detailAddress"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateOrEditDialog()" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>


    <!--用户详情-->
    <el-dialog title="用户详情" top="5vh" :visible.sync="detailDialog">
      <el-form ref="form" :model="detailForm" label-width="80px" size="small" class="editForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="用户名:">{{detailForm.name}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              <span v-if="detailForm.sex===0">男</span>
              <span v-else>女</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号:">{{detailForm.phone}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱:">{{detailForm.email}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址:">{{detailForm.address}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址:">{{detailForm.detailAddress}}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="头像:">
            <img class="activityImg"  :src="$Dolphin.path.publicPath+detailForm.imgUrl"/></el-form-item>
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
          listUser: '/api/users/list',
          saveUser: '/api/users/save/{id}',
          removeUser: '/api/users/remove/{id}',
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

      /*处理list数据的回调函数*/
      callBackData: function (serverData) {
        serverData.rows.forEach(user => {
          if(user.address){
            user.userAddress = user.address;
          }
          if(user.address&&user.detailAddress){
            user.userAddress = user.address + ' ' + user.detailAddress;
          }else {
            user.userAddress = '';
          }

        });
      },
      /*
          * 图片上传成功回调
          * */
      uploadSuccess(response, file, fileList) {

        this.userForm.imgUrl = response.data.filePath;
        this.$set(this, 'uniformFile', response.data);

      },
      /*初始化用户列表*/
      initUserList: function () {
        this.$ajax({
          method: 'post',
          url: '/api/users/list',
        }).then(data => {
          console.log("data:" + data);
        });
      },

      /*添加用户*/
      addUser: function () {
        this.showAddress = [];
        this.userForm = {};
        this.formId = '';
        this.showCreateOrEditDialog = true;
      },
      /*编辑用户*/
      edit: function (data) {
        this.userForm = Object.assign({}, data);
        if(this.userForm.address){
          if(this.userForm.address.indexOf('-')){
            this.showAddress = this.userForm.address.split('-');
          }
        }


        this.formId = this.userForm._id;
        this.showCreateOrEditDialog = true;
      },


      /*删除用户*/
      removeUser: function (id) {

        this.$confirm('确认删除该用户?', '提示', {
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
              let operateLog = {
                name: '删除用户',
                type: 'delete',
                action: this.url.removeUser,
                status: 1,
              };

                this.$store.dispatch('operateLog', operateLog).then(data => {

                });

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
        _this.userForm.address = _this.showAddress.join("-");
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
                message: "更新用户成功"
              });
              let operateLog = {
                name: '更新用户',
                type: 'update',
                action: this.url.saveUser,
                status: 1,
              };
              this.$store.dispatch('operateLog', operateLog).then(data => {

              });
            } else {
              _this.$message({
                type: 'success',
                message: "添加用户成功"
              });
              _this.$message("添加用户成功");
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
