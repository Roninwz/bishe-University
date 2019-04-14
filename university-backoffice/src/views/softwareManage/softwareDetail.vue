<template>
  <div>
    <el-form ref="form" :model="editForm" label-width="100px" size="small" class="editFrom">
      <div class="float-right">
        <el-button @click="$router.go(-1)" size="small">返回</el-button>
      </div>
      <h3 style="margin:0 0 15px;">
        软件详情
      </h3>
      <hr/>
      <el-card>
        <div slot="header">
          <span>基本信息</span>
        </div>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件名">
              {{ editForm.name}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件版本">
              {{ editForm.version}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件大小">
              {{ editForm.size}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件链接">
              {{ editForm.link}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件链接密码">
              {{ editForm.pass}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件链接类型">
              <span v-if="editForm.linkType===0">百度云</span>
              <span v-else>蓝奏云</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="软件链接类型">
              <span v-if="editForm.softType==1">编程软件</span>
              <span v-else-if="editForm.softType==2">娱乐软件</span>
              <span v-else-if="editForm.softType==3">影视音图</span>
              <span v-else-if="editForm.softType==4">实用工具</span>
              <span v-else>其它</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="软件简介">
              {{ editForm.introduction}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <div slot="header">
          <span>封面图片</span>
        </div>
        <img class="uImg"  :src="$Dolphin.path.publicPath+editForm.imgUrl"/>
      </el-card>
      <el-card>
        <div slot="header">
          <span>应用截图</span>
        </div>
        <img class="uImg"  :src="$Dolphin.path.publicPath+editForm.screenImgUrl"/>
      </el-card>
    </el-form>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        url: {
          save: '/api/admin/software/save/{id}',
          detail: '/api/admin/software/detail/{id}',
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
        softwareId: this.$route.query['softwareId'] || '',
      };
    },
    computed: {},
    methods: {
    },
    created(){
      if (this.softwareId) {
        this.$ajax({
          url: this.url.detail,
          pathData: {id: this.softwareId},
        }).then(reData => {
          this.editForm = reData.data;
        }).catch(e => {
        });
      }
    }
  }
</script>
