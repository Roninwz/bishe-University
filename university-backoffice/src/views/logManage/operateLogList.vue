<template>
  <div>
    <dol-list
      :url="url.listLoginLog"
      :query-params="queryForm"
      :default-query-params="queryForm"
      :check-flag="false"
      title="操作日志管理"
      ref="list">
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name_like" placeholder="操作名"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table-column prop="name" label="操作名"/>
      <el-table-column prop="type" label="操作类型"/>
      <el-table-column prop="action" label="操作url"/>
      <el-table-column prop="createTime" label="操作时间"/>
      <el-table-column prop="status" label="操作状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">操作失败</span>
          <span v-else>操作成功</span>
        </template>
      </el-table-column>
      <el-table-column prop="_id" width="120px" label="" fixed="right">
        <template slot-scope="scope">
          <el-button slot="button" type="text" @click="removeUser(scope.row._id)">
            <i class="fa fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </dol-list>


  </div>
</template>
<script>

  export default {
    data() {
      return {
        url: {
          listLoginLog: '/api/admin/operateLog/list',
          removeLoginLog: '/api/admin/operateLog/remove/{id}',
        },
        queryForm: {},
        detailForm: {},
        formId: '',
        loading: false,
        users: [],
        showCreateOrEditDialog: false,
        detailDialog: false,
        userForm: {},
      }
    },
    methods: {
      /*查询方法*/
      query: function () {
        this.$refs.list.query(this.queryForm);
      },

      /*删除用户*/
      removeUser: function (id) {

        this.$confirm('确认删除该操作日志?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          //确认删除
          this.$ajax({
            url: this.url.removeLoginLog,
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

</style>
