<template>
  <dol-upload :on-success="uploadImg" :type="type">
    <div class="upload-img" :style="divStyle">
      <template v-if="value">
        <img :src="$Dolphin.path.publicPath + value.filePath" class="img-responsive"/>
      </template>
      <template v-else>
        <i class="fa fa-plus"></i>
      </template>
    </div>
  </dol-upload>
</template>

<script>
  export default {
    props: {
      value: {},                 //value
      type: {type: String, default: ''},            //文件类型，可为空
      maxHeight: {type: String},            //文件类型，可为空
      maxWidth: {type: String},            //文件类型，可为空
      size: {type: String},            //文件类型，可为空
    },
    data(){
      return {}
    },
    computed: {
      divStyle(){
        return {
          'max-height': this.maxHeight || 'none',
          'max-width': this.maxWidth || 'none',
          'min-height': this.size || 'none',
          'min-width': this.size || 'none',
          'line-height': this.size || 'none',
          'font-size': this.size?(this.size.replace('px','')/3 + 'px'):'none',

        }
      }
    },
    methods: {
      uploadImg(res){
        this.$emit('input', res.data);
      },
    },
    watch: {},
    created(){
    }
  }
</script>
