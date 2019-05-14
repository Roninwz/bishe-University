<template>
  <div>
    <dol-list
      :url="url.list"
      :query-params="queryForm"
      :check-flag="false"
      title="角色列表"
      ref="list">
      <el-button slot="button" type="text" @click="add">
        <i class="fa fa-plus"></i>
      </el-button>
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name_like" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="queryForm.code_like" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table-column prop="name" width="100" label="名称"/>
      <el-table-column prop="code" width="100" label="编码"/>
      <el-table-column prop="menus" label="菜单">
        <template slot-scope="scope">
          <template v-for="(menu, index) in scope.row.menus">{{index > 0 ? '、' : ''}}{{menu.name}}</template>
        </template>
      </el-table-column>
      <el-table-column prop="_id" width="90px" label="" fixed="right">
        <template slot-scope="scope">
          <el-button slot="button" type="text" @click="detail(scope.row)">
            <i class="fa fa-search"></i>
          </el-button>
          <el-button slot="button" type="text" @click="edit(scope.row)">
            <i class="fa fa-edit"></i>
          </el-button>
          <el-button slot="button" type="text" @click="removeOne(scope.row._id)">
            <i class="fa fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </dol-list>
    <el-dialog title="角色维护" top="5vh" :visible.sync="editDialog">
      <el-form ref="form" :model="editForm" label-width="80px" size="small" class="editForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="editForm.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码">
              <el-input v-model="editForm.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单">
              <el-tree
                ref="tree"
                show-checkbox
                :check-strictly="false"
                node-key="_id"
                :default-checked-keys="checkedMenu"
                :data="menuData"
                :props="{label:'name', children: 'children'}"></el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="角色详情" top="5vh" :visible.sync="detailDialog">
      <el-form ref="form" :model="detailForm" label-width="80px" size="small" class="detailForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="名称">{{detailForm.name}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码">{{detailForm.code}}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单">
              <template v-for="(menu, index) in detailForm.menus">{{index > 0 ? '、' : ''}}{{menu.name}}</template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间">{{detailForm.createTime}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新时间">{{detailForm.updateTime}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        url: {
          list: '/api/admin/role/list',
          remove: '/api/admin/role/remove',
          removeOne: '/api/admin/role/remove/{id}',
          save: '/api/admin/role/save/{id}',
          detail: '/api/admin/role/detail/{id}',
          importData: '/api/admin/role/import',
          exportData: '/api/admin/role/export',

          menu: {
            tree: '/api/admin/menu/tree'
          }
        },
        queryForm: {},

        editDialog: false,
        editForm: {},
        detailDialog: false,
        detailForm: {},
        formId: '',

        menuData: [],
      };
    },
    computed: {
      checkedMenu: function () {
        let ids = [];
        if (this.editForm.menus) {
          this.editForm.menus.forEach(m => ids.push(m._id));
        }
        return ids;
      }
    },
    methods: {
      query: function () {
        this.$refs.list.query();
      },
      add: function () {
        this.editForm = {};
        this.formId = '';
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(this.checkedMenu);
        }
        this.editDialog = true;
      },
      edit: function (data) {
        this.editForm = Object.assign({}, data);
        this.formId = this.editForm._id;
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(this.checkedMenu);
        }
        this.editDialog = true;
      },
      save: function () {
        this.editForm.menus = this.$refs.tree.getCheckedKeys();
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
        }).then((reData) => {
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
      this.$ajax({
        url: this.url.menu.tree,
      }).then((reData) => {
        this.menuData = reData.rows;
      });
    }
  }
</script>
