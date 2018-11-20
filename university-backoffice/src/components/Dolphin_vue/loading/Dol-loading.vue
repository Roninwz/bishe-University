<template>
  <div class="dol-loading" v-show="showFlag">
    <div class="dol-loading-icon">
      <i class="fa fa-spinner"></i>
    </div>
  </div>
</template>

<style lang="scss">
  div.dol-loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
    text-align: center;
    vertical-align: middle;
    z-index:9999;

    .dol-loading-icon{
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 36px;
      margin-left: -18px;
      margin-top: -18px;

      > i{
        animation: rotate 1.5s linear infinite;
      }
    }
  }

  div.dolphin-list{
    div.dol-loading {
      position: absolute;
    }
  }
</style>

<script>
  export default {
    props: {
        flag:{}
    },
    computed: {
      showFlag(){
        let flag = false;
        if(typeof this.flag === 'boolean'){
            flag = this.flag;
        }else if (typeof this.$store.state.loading === 'boolean') {
          flag = this.$store.state.loading;
        }
        return flag
      }
    },
    methods: {
    },
    created(){
    }
  }
</script>
