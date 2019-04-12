<template>
  <div>
    <dol-list
      :url="url.list"
      :query-params="queryForm"
      :default-query-params="queryForm"
      :check-flag="false"
      title="账号管理"
      ref="list">
      <el-button @click="add" slot="button" type="text" style="float: right;">
        <i class="fa fa-plus"></i> 新增
      </el-button>
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name_like" placeholder="名称"/>
        </el-form-item>
        <el-form-item label="角色">
          <dol-select multiple v-model="queryForm.role_in" source="server" :url="url.role.find"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="role.name" label="角色"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="creater.name" label="创建人"/>
      <el-table-column prop="_id" width="90px" label="" fixed="right">
        <template slot-scope="scope">
          <el-button slot="button" type="text" @click="edit(scope.row)">
            <i class="fa fa-edit"></i>
          </el-button>
          <el-button slot="button" type="text" @click="removeOne(scope.row._id)">
            <i class="fa fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </dol-list>

    <el-dialog title="用户维护" top="5vh" :visible.sync="editDialog">
      <el-form ref="form" :model="editForm" label-width="80px" size="small">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="editForm.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <dol-select v-model="editForm.role" source="server" :url="url.role.find"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="editForm.password" type="password"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="editForm.phone"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="editForm.remark" type="textarea" autosize/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="用户详情" top="5vh" :visible.sync="detailDialog">
      <el-form ref="form" :model="detailForm" label-width="80px" size="small" class="editForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="名称">{{detailForm.name}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码">{{detailForm.code}}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">{{detailForm.remark}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="detailDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        url: {
          list: '/api/admin/admin/list',
          remove: '/api/admin/admin/remove',
          removeOne: '/api/admin/admin/remove/{id}',
          save: '/api/admin/admin/save/{id}',
          detail: '/api/admin/admin/detail/{id}',
          importData: '/api/admin/admin/user/import',
          exportData: '/api/admin/admin/user/export',

          role: {
            find: '/api/admin/role/find',
          }
        },
        queryForm: {
          role_in: []
        },
        //管理员类型为2  普通用户类型为1
        userType: [
          {
            code: 2,
            name: "管理员"
          },
          {
            code: 1,
            name: "前台用户"
          }
        ],
        editDialog: false,
        editForm: {},
        detailDialog: false,
        detailForm: {},
        formId: '',
        isAdd: false
      }
    },
    computed: {},
    methods: {
      query: function () {
        this.$refs.list.query(this.queryForm);
      },
      add: function () {
        this.isAdd = false;
        this.editForm = {};
        this.formId = '';
        this.editDialog = true;
      },
      edit: function (data) {
        this.isAdd = true;
        this.editForm = Object.assign({}, data);
        this.formId = this.editForm._id;
        this.editDialog = true;
      },
      save: function () {
        if (!this.formId) {
          this.editForm.type = 2;
        }
        this.$ajax({
          url: this.url.save,
          method: 'post',
          data: this.editForm,
          pathData: {id: this.formId},
        }).then(reData => {
          this.editDialog = false;
          this.$message({
            message: reData.message,
            type: 'success'
          });
          this.query();
        });
      },
      removeOne: function (id) {
        this.$ajax({
          url: this.url.removeOne,
          pathData: {id: id},
        }).then(reData => {
          this.$message(reData.message);
          this.query();
        });
      },
      detail: function (data) {
        this.detailForm = data;
        this.detailDialog = true;
      },
    },
    created: function () {
    }
  }
</script>
