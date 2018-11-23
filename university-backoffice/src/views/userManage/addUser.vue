<template>
	<el-form ref="form" :model="form" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="用户名">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio  :label="0">男</el-radio>
        <el-radio  :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
		<el-form-item label="手机号">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item label="邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		 <el-form-item label="地址">
      <dol-address v-model="showAddress" detail-flag="false"/>
		</el-form-item>
    <el-form-item label="详细地址">
      <el-input v-model="form.detailAddress"></el-input>
    </el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit"></el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
				},
        showAddress:[]
			}
		},
		methods: {
		  /*添加方法*/
			onSubmit() {
			  this.form.address=this.showAddress.join("-");
        this.$ajax({
          method: 'post',
          url: '/api/users/save',
          data:this.form,
        }).then(data=>{
          if(data.success){
            this.$message("添加成功");
            this.$router.push('/view/admin/userList');
          }
        });
			}
		}
	}

</script>
