<template>
  <div>
    <el-form ref="form" :model="editForm" label-width="100px" size="small" class="editFrom">
      <div class="float-right">
        <el-button @click="$router.go(-1)" size="small">返回</el-button>
        <el-button type="primary" @click="save" size="small">保存</el-button>
      </div>
      <h3 style="margin:0 0 15px;">
        软件维护
      </h3>
      <hr/>
      <el-card>
        <div slot="header">
          <span>基本信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件名称">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件版本">
              <el-input v-model="editForm.version"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件大小">
              <el-input v-model="editForm.size"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件链接">
              <el-input v-model="editForm.link"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件链接密码">
              <el-input v-model="editForm.pass"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item label="资源类型">
            <el-radio-group v-model="editForm.linkType">
              <el-radio :label="0">百度云</el-radio>
              <el-radio :label="1">蓝奏云</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="软件类型">
            <el-radio-group v-model="editForm.softType">
              <el-radio :label="1">编程软件</el-radio>
              <el-radio :label="2">娱乐软件</el-radio>
              <el-radio :label="3">影视音图</el-radio>
              <el-radio :label="4">实用工具</el-radio>
              <el-radio :label="5">其它</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <!--<el-col :span="24">-->
          <!--<el-form-item label="软件简介">-->
            <!--<el-input rows="10" type="textarea" v-model="editForm.introduction" placeholder="不超过1000字" ></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-card>

      <el-card>
        <div slot="header">
          <span>封面图片</span>
        </div>
        <dol-upload v-model="editForm.imgUrl" :on-success="uploadSuccess" type="software" maxWidth="300px" maxHeight="200px">
          <img class="uImg" v-if="uniformFile" :src="$Dolphin.path.publicPath+editForm.imgUrl"/>
          <div v-else class="upload-img"><i class="fa fa-plus"></i></div>
        </dol-upload>
      </el-card>
      <el-card>
        <div slot="header">
          <span>应用截图</span>
        </div>
        <dol-upload v-model="editForm.screenImgUrl" :on-success="uploadSuccessScreenImgUrl" type="software" maxWidth="300px" maxHeight="200px">
          <img class="uImg" v-if="uniformFileScreenImgUrl" :src="$Dolphin.path.publicPath+editForm.screenImgUrl"/>
          <div v-else class="upload-img"><i class="fa fa-plus"></i></div>
        </dol-upload>
      </el-card>

      <el-card>
        <div slot="header">
          <span>软件简介</span>
        </div>
        <u-editor v-model="editForm.introduction" ref="ue"></u-editor>
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
          save: '/api/admin/software/save/{id}',
          detail: '/api/admin/software/detail/{id}',

          port:{
            find:'/system/port/port/find'
          },
        },
        uniformFile:false,
        uniformFileScreenImgUrl:false,
        editForm: {
          type: 'local',
          port: [],
          tag: [],
          content: '',
          imgUrl:'',
          screenImgUrl:'',
          introduction:'',
          bookcase: this.$route.query['bookcase'],
        },
        softwareId: this.$route.query['softwareId'] || '',
      };
    },
    computed: {},
    methods: {
      save(){
        this.$ajax({
          url: this.url.save,
          method: 'post',
          data: this.editForm,
          pathData: {id: this.softwareId},
        }).then(reData => {
          if(reData.success){
            this.$message({
              message: reData.message,
              type: 'success'
            });
            var operateLog = null;
            if(this.softwareId){
              operateLog = {
                name: '更新软件',
                type: 'update',
                action: this.url.save,
                status: 1,
              };
            }else {
              operateLog = {
                name: '添加软件',
                type: 'add',
                action: this.url.save,
                status: 1,
              };
            }

            this.$store.dispatch('operateLog', operateLog).then(data => {

            });

            this.$router.push("/view/admin/softwareManage");
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
      /*
     * 图片上传成功回调
     * */
      uploadSuccessScreenImgUrl(response, file, fileList) {

        this.editForm.screenImgUrl = response.data.filePath;
        this.$set(this, 'uniformFileScreenImgUrl', response.data);

      },
    },
    created(){
      this.$emit('set-menu', 'Article');

      if (this.softwareId) {
        this.$ajax({
          url: this.url.detail,
          pathData: {id: this.softwareId},
        }).then(reData => {
          this.editForm = reData.data;
          this.uniformFile=true;
          this.uniformFileScreenImgUrl=true;
          this.$refs['ue'].editor && this.$refs['ue'].editor.setContent(this.editForm.content);
        }).catch(e => {
        });
      }
    }
  }
</script>
