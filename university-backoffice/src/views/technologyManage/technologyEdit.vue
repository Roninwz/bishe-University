<template>
  <div>
    <el-form ref="form" :model="editForm" label-width="100px" size="small" class="editFrom">
      <div class="float-right">
        <el-button @click="$router.go(-1)" size="small">返回</el-button>
        <el-button type="primary" @click="save" size="small">保存</el-button>
      </div>
      <h3 style="margin:0 0 15px;">
        技术文章维护
      </h3>
      <hr/>
      <el-card>
        <div slot="header">
          <span>基本信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input v-model="editForm.title"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="摘要">
              <el-input type="textarea" rows="3" aria-placeholder="请少于200字" v-model="editForm.abstract"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
      </el-card>

      <el-card>
        <div slot="header">
          <span>封面图片</span>
        </div>
        <dol-upload v-model="editForm.imgUrl" :on-success="uploadSuccess" type="technology" maxWidth="300px" maxHeight="200px">
          <img class="uImg" v-if="uniformFile" :src="$Dolphin.path.publicPath+editForm.imgUrl"/>
          <div v-else class="upload-img"><i class="fa fa-plus"></i></div>
        </dol-upload>
      </el-card>
      <el-card>
        <div slot="header">
          <span>文章内容</span>
        </div>
        <u-editor v-model="editForm.content" ref="ue"></u-editor>
      </el-card>

    </el-form>

  </div>
</template>

<script>
  import {Slider} from 'vue-color'
  import UEditor from '../../components/ueditor/ueditor.vue'

  export default {
    components: {
      'slider-picker': Slider,
      'u-editor': UEditor,
    },
    data(){
      return {
        url: {
          save: '/api/admin/technology/save/{id}',
          detail: '/api/admin/technology/detail/{id}',

          port:{
            find:'/system/port/port/find'
          },
        },
        uniformFile:false,
        editForm: {
          type: 'local',
          port: [],
          tag: [],
          content: '',
          imgUrl:'',
          bookcase: this.$route.query['bookcase'],
        },
        technologyId: this.$route.query['technologyId'] || '',
      };
    },
    computed: {},
    methods: {
      save(){
        this.$ajax({
          url: this.url.save,
          method: 'post',
          data: this.editForm,
          pathData: {id: this.technologyId},
        }).then(reData => {
          if(reData.success){
            this.$message({
              message: reData.message,
              type: 'success'
            });
            this.$router.push("/view/admin/technologyManage");
          }


        });
      },
      /*
     * 图片上传成功回调
     * */
      uploadSuccess(response, file, fileList) {

        this.editForm.imgUrl = response.data.filePath;
        this.$set(this, 'uniformFile', response.data);

      },
    },
    created(){
      this.$emit('set-menu', 'Article');

      if (this.technologyId) {
        this.$ajax({
          url: this.url.detail,
          pathData: {id: this.technologyId},
        }).then(reData => {
          this.editForm = reData.data;
          this.uniformFile=true;
          this.$refs['ue'].editor && this.$refs['ue'].editor.setContent(this.editForm.content);
        }).catch(e => {
        });
      }
    }
  }
</script>
