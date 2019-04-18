<template>
  <div>
    <div :id="`editor_${id}`" style="width: 100%;height: 150px;"></div>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
      }
    },
    props: {
      value: {
        type: String
      },
      config: {
        type: Object
      },
      id:{
        type: String
      }
    },
    mounted() {
      this.editor = UE.getEditor(`editor_${this.id}`, this.config); // 初始化UE
      this.editor.addListener("ready", () => {
        this.editor.setHeight(100);
        this.editor.setContent(this.value); // 确保UE加载完成后，放入内容。
      });
      this.editor.addListener("contentChange", () => {
        let html = this.editor.getContent();
        this.$emit('input', html);
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
