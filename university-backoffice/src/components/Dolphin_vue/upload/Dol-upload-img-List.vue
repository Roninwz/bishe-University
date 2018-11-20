<template>
  <div class="dol-img-list-preview">
    <span v-for="(img, index) in fileList">
      <img :src="$Dolphin.path.publicPath + img.filePath" class="img-responsive"/>
      <i class="fa fa-times-circle dol-remove-icon" @click="removeFile(index)" v-if="editFlag"></i>
    </span>
    <dol-upload :on-success="uploadFile" :type="type" list-type="picture-card" :multiple="multiple" v-if="editFlag">
      <i class="fa fa-plus"></i>
    </dol-upload>
  </div>
</template>

<style lang="scss">
  .dol-img-list-preview{
    display: inline-block;

  > span{
      display: inline-block;
      position: relative;
      vertical-align: top;

  + span{
      margin-left: 10px;
    }

  img{
    max-height:130px;
    max-width: 130px;
  }
  .dol-remove-icon{
    position: absolute;
    right: -8px;
    top: -8px;
    font-size: 20px;
    cursor: pointer;
    background: #ffffff;
    border-radius: 20px;
    opacity: 0.7;
  }

  + div {
      margin-left: 20px;
    }
  }
  > div{
      display: inline-block;
      vertical-align: top;

  .el-upload--picture-card{
    width: 130px;
    height: 130px;
    vertical-align: top;
  }
  }
  }
</style>

<script>
  export default {
    props: {
      value: {default: () => []},                 //value
      type: {type: String, default: ''},            //文件类型，可为空
      multiple: {type: Boolean, default: false},            //是否多选
      editFlag: {type: Boolean, default: false},            //是否可编辑
    },
    data(){
      return {
        fileList: this.value.concat(),
      }
    },
    computed: {

    },
    methods: {
      uploadFile(response, file, fileList){
        this.fileList.push(response.data);
        this.$emit('input', this.fileList);
      },
      removeFile(index){
        this.fileList.splice(index, 1);
        this.$emit('input', this.fileList);
      }
    },
    watch: {
        value(){
            this.fileList = this.value;
        }
    },
    created(){
    }
  }
</script>
