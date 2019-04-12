<template>
  <div>
    <dol-list
      :url="url.list"
      :default-query-params="queryForm"
      :check-flag="false"
      title="文件列表"
      ref="list">
      <dol-upload
        slot="button"
        :on-success="uploadSuccess">
        <el-button size="small" type="text" ><i class="fa fa-plus"></i> 上传文件</el-button>
      </dol-upload>
      <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name_like" placeholder="名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <img
            :src="$Dolphin.path.publicPath+scope.row.filePath"
            class="thumbnail"
            @click="showImg(scope.row.filePath)"
            v-if="/^image/.test(scope.row.fileType)" />
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="fileSize" label="文件大小">
        <template slot-scope="scope">
          {{$util.getFileSize(scope.row.fileSize)}}
        </template>
      </el-table-column>
      <el-table-column prop="fileType" label="文件类型" />
      <el-table-column prop="lastUseTime" label="最近使用时间" />
      <el-table-column prop="locked" label="是否锁定">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.locked"></el-switch>
        </template>
      </el-table-column>
      <dol-col-dict prop="type" label="类型" dict-code="fileFolder" />
      <el-table-column prop="_id" width="90px" label="" fixed="right">
        <template slot-scope="scope">
          <el-button slot="button" type="text" @click="download(scope.row)">
            <i class="el-icon-download"></i>
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
    <el-dialog title="文件维护" top="5vh" :visible.sync="editDialog">
      <el-form ref="form" :model="editForm" label-width="80px" size="small" class="editFrom">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="editForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <dol-select v-model="editForm.type" dict-code="fileFolder" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="图片预览" top="5vh" :visible.sync="imgDialog">
      <img :src="$Dolphin.path.publicPath+imgSrc" v-if="imgSrc" class="img-responsive" />
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        url: {
          list: '/api/admin/file/list',
          remove: '/api/admin/file/remove',
          removeOne: '/api/admin/file/remove/{id}',
          update: '/api/admin/file/save/{id}',
          add: '/api/admin/file/save',
          download: '/api/admin/file/download/{id}',
          detail: '/api/admin/file/detail/{id}',
          importData: '/api/admin/file/import',
          exportData: '/api/admin/file/export',
        },
        queryForm: {},

        editDialog: false,
        editForm: {},
        detailDialog: false,
        detailForm: {},
        imgDialog: false,
        imgSrc: {},
        formId: '',

        fileList: [],

        testValue: '',
        testValue2: '',
      };
    },
    computed: {},
    methods: {
      query: function () {
        this.$refs.list.query(this.queryForm);
      },
      add: function () {
        this.editForm = {};
        this.formId = '';
        this.editDialog = true;
      },
      edit: function (data) {
        this.editForm = Object.assign({}, data);
        this.formId = this.editForm._id;
        this.editDialog = true;
      },
      save: function () {
        this.$ajax({
          url: this.url.update,
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
      uploadSuccess: function (response, file, fileList) {
        this.$message(response.message);
        this.query();
      },
      download: function (file) {
        window.open(this.url.download.replace('{id}', file._id));
      },
      showImg: function (src) {
        this.imgSrc = src;
        this.imgDialog = true;
      }
    },
    created: function () {
    }
  }
</script>
