<template>
  <div>
    <el-card class="box-card queryCondition">
      <el-form :inline="true" :model="queryConditions" size="mini">
        <el-form-item label="标题">
          <el-input v-model="queryConditions.title_like" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--新闻动态列表-->
    <dol-list
      :url="url.list"
      :query-params="queryConditions"
      :default-query-params="queryConditions"
      title="技术文章列表"
      ref="list">

      <el-button @click="add()" slot="button" type="text">
          <i class="fa fa-plus"></i> 新增
      </el-button>

      <el-table-column prop="imgUrl" label="封面图片">
        <template slot-scope="scope">
          <!--<img v-for="url in scope.row.imgUrls" :src="$Dolphin.path.publicPath+url" class="uniform_img" alt="">-->
          <img  :src="$Dolphin.path.publicPath+scope.row.imgUrl" class="activityImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"/>
      <!--<el-table-column prop="content" label="内容"/>-->
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="_id" width="190px" label="">
        <template slot-scope="scope">
          <el-button slot="button" type="text">
            <router-link tag="a" :to="{path:'/view/admin/technologyDetail',query:{technologyId:scope.row._id}}">
              <i class="fa fa-search"></i>
            </router-link>
          </el-button>

          <el-button slot="button" type="text">
            <router-link tag="a" :to="{path:'/view/admin/technologyEdit',query:{technologyId:scope.row._id}}">
              <i class="fa fa-edit"></i>
            </router-link>
          </el-button>

          <el-button slot="button" type="text" @click="removeOne(scope.row._id)">
            <i class="fa fa-trash"></i>
          </el-button>
          <template v-if="scope.row.isTop==0">
          <el-button slot="button" type="text" @click="topUp(scope.row._id,1)">
            <i class="fa fa-level-up"></i>
          </el-button>
          </template>
          <template v-else>
          <el-button slot="button" type="text" @click="topUp(scope.row._id,0)">
            <i class="fa fa-level-down"></i>
          </el-button>
          </template>
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
          list: '/api/admin/technology/list',
          remove: '/api/admin/technology/remove',
          removeOne: '/api/admin/technology/remove/{id}',
          save: '/api/admin/technology/save/{id}',
          detail: '/api/admin/technology/detail/{id}',
          updateTop: '/api/admin/technology/updateTop/{id}',
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
        this.$router.push('/view/admin/technologyEdit');
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

      topUp:function (id,isTop) {
        let _this = this;
        if(isTop==1){
          _this.$confirm('是否置顶?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '是',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            _this.$ajax({
              url: this.url.updateTop,
              method:'post',
              pathData: {id: id},
              data: {isTop:isTop},
            }).then(reData => {
              _this.$message({
                message: '置顶成功',
                type: 'success'
              });
              _this.query();
            });


          }).catch(() => {
            this.$message('已取消');
          });
        }else {
          _this.$confirm('是否取消置顶?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '是',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            _this.$ajax({
              url: this.url.updateTop,
              method:'post',
              pathData: {id: id},
              data: {isTop:isTop},
            }).then(reData => {
              _this.$message("取消置顶成功");
              _this.query();
            });


          }).catch(() => {
            this.$message('已取消');
          });
        }

      }

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
