<template>
  <div>
    <el-card class="box-card queryCondition">
      <el-form :inline="true" :model="queryConditions" size="mini">
        <el-form-item label="软件名">
          <el-input v-model="queryConditions.name_like" placeholder="软件名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--软件列表-->
    <dol-list
      :url="url.list"
      :query-params="queryConditions"
      :default-query-params="queryConditions"
      title="软件列表"
      ref="list">

      <el-button @click="add()" slot="button" type="text">
          <i class="fa fa-plus"></i> 新增
      </el-button>

      <el-table-column prop="imgUrl" label="缩略图">
        <template slot-scope="scope">
          <!--<img v-for="url in scope.row.imgUrls" :src="$Dolphin.path.publicPath+url" class="uniform_img" alt="">-->
          <img  :src="$Dolphin.path.publicPath+scope.row.imgUrl" class="activityImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="screenImgUrl" label="应用截图">
        <template slot-scope="scope">
          <!--<img v-for="url in scope.row.imgUrls" :src="$Dolphin.path.publicPath+url" class="uniform_img" alt="">-->
          <img  :src="$Dolphin.path.publicPath+scope.row.screenImgUrl" class="activityImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="软件名"/>
      <el-table-column prop="version" label="版本"/>
      <el-table-column prop="size" label="大小"/>
      <el-table-column prop="link" label="资源链接"/>
      <el-table-column prop="pass" label="资源密码"/>
      <el-table-column prop="linkType" label="资源类型">
        <template slot-scope="scope">
          <span v-if="scope.row.linkType===0">百度云</span>
          <span v-else>蓝奏云</span>
        </template>
      </el-table-column>
      <el-table-column prop="softType" label="软件类型">
        <template slot-scope="scope">
          <span v-if="scope.row.softType==1">编程软件</span>
          <span v-else-if="scope.row.softType==2">娱乐软件</span>
          <span v-else-if="scope.row.softType==3">影视音图</span>
          <span v-else-if="scope.row.softType==4">实用工具</span>
          <span v-else>其它</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="content" label="内容"/>-->
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="_id" width="90px" label="">
        <template slot-scope="scope">
          <el-button slot="button" type="text">
            <router-link tag="a" :to="{path:'/view/admin/softwareDetail',query:{softwareId:scope.row._id}}">
              <i class="fa fa-search"></i>
            </router-link>
          </el-button>
          <el-button slot="button" type="text">
            <router-link tag="a" :to="{path:'/view/admin/softwareEdit',query:{softwareId:scope.row._id}}">
              <i class="fa fa-edit"></i>
            </router-link>
          </el-button>

          <el-button slot="button" type="text" @click="removeOne(scope.row._id)">
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
          list: '/api/admin/software/list',
          remove: '/api/admin/software/remove',
          removeOne: '/api/admin/software/remove/{id}',
          save: '/api/admin/software/save/{id}',
          detail: '/api/admin/software/detail/{id}',
        },
        queryConditions:{},

      };
    },
    computed: {

    },
    methods: {
      /*
     * 查询
     * */
      query: function () {
        this.$refs.list.query(this.queryConditions);
      },
      add:function () {
        this.$router.replace('/view/admin/softwareEdit');
      },
      removeOne: function (id) {

        this.$confirm('删除, 是否继续?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          //确认删除活动简讯
          this.$ajax({
            url: this.url.removeOne,
            pathData: {id: id},
          }).then(reData => {

            this.$message(reData.message);
            this.query();
          });


        }).catch(() => {
          this.$message('已取消');
        });


      },

    },
    created() {
    }
  }
</script>

<style  scoped>

  a{
    text-decoration: none;
    color: #409EFF;
  }
  .activityImg{
    width: 120px;
    height: 100px;
  }
</style>
