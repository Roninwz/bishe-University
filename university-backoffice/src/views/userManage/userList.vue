<template>
  <div>
	<!--<section>-->
		<!--工具条-->
		<!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
			<!--<el-form :inline="true" :model="filters">-->
				<!--<el-form-item>-->
					<!--<el-input v-model="filters.name" placeholder="姓名"></el-input>-->
				<!--</el-form-item>-->
				<!--<el-form-item>-->
					<!--<el-button type="primary" v-on:click="getUser">查询</el-button>-->
				<!--</el-form-item>-->
			<!--</el-form>-->
		<!--</el-col>-->

		<!--列表-->
		<!--<template>-->
      <dol-list
        :url="url.list"
        :query-params="queryForm"
        :default-query-params="queryForm"
        :check-flag="false"
        :loadDataCallback="callBackData"
        title="用户管理"
        ref="list">
        <el-button slot="button" type="text" style="float: right;">
          <i class="fa fa-plus"></i> 新增
        </el-button>
        <el-form :inline="true" :model="queryForm" size="mini" slot="queryForm">
          <el-form-item label="名称">
            <el-input v-model="queryForm.name_like" placeholder="用户名"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="phone" label="手机号"/>
        <el-table-column prop="email" label="邮箱">
          <!--<template slot-scope="scope">-->
          <!--{{sizeArr&&sizeArr.join('/')}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column prop="_id" width="90px" label="" fixed="right">
          <template slot-scope="scope">
            <!--<el-button slot="button" type="text" @click="detail(scope.row)">-->
              <!--<i class="fa fa-search"></i>-->
            <!--</el-button>-->
            <el-button slot="button" type="text" @click="edit(scope.row)">
              <i class="fa fa-edit"></i>
            </el-button>
            <!--<el-button slot="button" type="text" @click="removeOne(scope.row._id)">-->
              <!--<i class="fa fa-trash"></i>-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </dol-list>

      <!--<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">-->
				<!--<el-table-column type="index" width="60">-->
				<!--</el-table-column>-->
				<!--<el-table-column prop="name" label="姓名" width="120" sortable>-->
				<!--</el-table-column>-->
				<!--<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>-->
				<!--</el-table-column>-->
				<!--<el-table-column prop="age" label="年龄" width="100" sortable>-->
				<!--</el-table-column>-->
				<!--<el-table-column prop="birth" label="生日" width="120" sortable>-->
				<!--</el-table-column>-->
				<!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
				<!--</el-table-column>-->
			<!--</el-table>-->
		<!--</template>-->

	<!--</section>-->
  </div>
</template>
<script>
	import { getUserList } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
        url: {
            list:  '/api/users/list',
        },
        queryForm:{},
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
      query: function () {
        this.$refs.list.query(this.queryForm);
      },
      callBackData:function (serverData) {
        console.log("serverData:"+serverData);
        console.log("serverData:"+JSON.stringify(serverData));
      },
		  initUserList:function () {
        this.$ajax({
          method: 'post',
          url: '/api/users/list',
        }).then(data=>{
            console.log("data:"+data);
            console.log("data:"+JSON.stringify(data.data.rows));
        });
      },
      edit:function () {

      },
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					this.users = res.data.users;
					this.loading = false;
					//NProgress.done();
				});
			}
		},
		mounted() {
			// this.getUser();
		},
    created:function () {
      this.initUserList();
    }
	};

</script>

<style scoped>

</style>
