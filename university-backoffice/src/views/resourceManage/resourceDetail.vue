<template>
  <div>
    <el-form ref="form" :model="editForm" label-width="100px" size="small" class="editFrom">
      <div class="float-right">
        <el-button @click="$router.go(-1)" size="small">返回</el-button>
      </div>
      <h3 style="margin:0 0 15px;">
        资源详情
      </h3>
      <hr/>
      <el-card>
        <div slot="header">
          <span>基本信息</span>
        </div>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="标题">
              {{ editForm.title}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="资源链接">
              {{ editForm.link}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="资源密码">
              {{ editForm.pass}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="资源类型">
              <span v-if="editForm.linkType===0">百度云</span>
              <span v-else>蓝奏云</span>
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
          <span>文章内容</span>
        </div>
        <div v-html="editForm.content"></div>
      </el-card>
    </el-form>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        url: {
          save: '/api/admin/resource/save/{id}',
          detail: '/api/admin/resource/detail/{id}',
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
        resourceId: this.$route.query['resourceId'] || '',
      };
    },
    computed: {},
    methods: {
    },
    created(){
      if (this.resourceId) {
        this.$ajax({
          url: this.url.detail,
          pathData: {id: this.resourceId},
        }).then(reData => {
          this.editForm = reData.data;
        }).catch(e => {
        });
      }
    }
  }
</script>
