<template>
  <span>{{text}}</span>
</template>

<script>
  export default {
    props: {
      code: {type: String},            //数据源，server | local
      labelField: {type: String, default: 'text'},            //数据源，server | local
      option: {},            //数据源，server | local
    },
    data(){
      return {
        text: '',
      }
    },
    methods: {
      getText(){
        if(this.option && this.code){
          this.$dict(this.code, this.option, {labelField: this.labelField}).then(text => {
            this.text = text;
          }).catch(e => {
            console.error(e);
          });
        }
      }
    },
    watch:{
      code(){
        this.getText();
      },
      option(){
        this.getText();
      },
      labelField(){
        this.getText();
      },
    },
    created(){
      this.getText();
    }
  }
</script>
