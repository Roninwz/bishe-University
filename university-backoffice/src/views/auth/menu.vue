<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <dol-tree
          title="菜单树"
          :url="url.tree"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @current-change="showDetail"
          ref="tree">
          <el-button slot="button" type="text" @click="add">
            <i class="fa fa-plus"></i>
          </el-button>
        </dol-tree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>菜单信息</span>
            <span class="card-button">
              <el-button slot="button" type="text" @click="addChild" :disabled="!detailForm._id">
                  <i class="fa fa-plus"></i>
              </el-button>
              <el-button slot="button" type="text" @click="edit" :disabled="!detailForm._id">
                  <i class="fa fa-edit"></i>
              </el-button>
              <el-button slot="button" type="text" @click="removeOne" :disabled="!detailForm._id">
                  <i class="fa fa-trash"></i>
              </el-button>
            </span>
          </div>
          <el-form :model="detailForm" label-width="80px" size="small" class="detailForm">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="名称">{{detailForm.name}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="编码">{{detailForm.code}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="链接">{{detailForm.link}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="icon">
                  <i class="fa" :class="detailForm.icon"></i> {{detailForm.icon}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序">{{detailForm.sort}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上级节点">{{detailForm.parent && detailForm.parent.name}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="菜单维护"
      top="5vh"
      :visible.sync="editDialog">
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
          <el-col :span="12">
            <el-form-item label="链接">
              <el-input v-model="editForm.link"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="icon">
              <el-input v-model="editForm.icon"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input v-model="editForm.sort"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级节点">
              {{editForm.parent && editForm.parent.name}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
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
          find: '/admin/menu/find',
          tree: '/api/admin/menu/tree',
          removeOne: '/api/admin/menu/remove/{id}',
          save: '/api/admin/menu/save/{id}',
          detail: '/api/admin/menu/detail/{id}',
          importData: '/api/admin/menu/import',
          exportData: '/api/admin/menu/export',
        },
        editDialog: false,
        editForm: {},
        detailForm: {},
        formId: '',
      };
    },
    computed: {},
    methods: {
      query: function () {
        this.$refs.tree.query();
      },
      add: function () {
        this.editForm = {};
        this.formId = '';
        this.editDialog = true;
      },
      addChild: function () {
        this.editForm = {
          parent: this.detailForm
        };
        this.formId = '';
        this.editDialog = true;
      },
      edit: function () {
        this.editForm = Object.assign({}, this.detailForm);
        this.formId = this.detailForm._id;
        this.editDialog = true;
      },
      save: function () {
        this.$ajax({
          url: this.url.save,
          method: 'post',
          data: this.editForm,
          pathData: {id: this.formId},
        }).then(reData => {
          this.editDialog = false;
          this.$message(reData.message);
          this.detailForm = this.editForm;
          this.query();
        });
      },
      removeOne: function () {
        this.$ajax({
          url: this.url.removeOne,
          pathData: {id: this.detailForm._id},
        }).then((reData) => {
          this.$message(reData.message);
          this.query();
          this.detailForm = {};
        });
      },
      showDetail: function (data, node) {
        this.detailForm = data;
      },
    },
    created: function () {
    }
  }
</script>
