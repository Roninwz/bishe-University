<template>
  <div class="footer">
    <div>Copyrights © 2019 roninwz.com. All rights reserved.豫ICP备090917770号</div>
    <div>友情链接：
      <a target="_blank" href="https://juejin.im/">掘金</a>
      <a target="_blank" href="https://www.9xkd.com/">侠客岛</a>
      <a target="_blank" href="https://segmentfault.com/">SegmentFault 思否</a>
      <a target="_blank" href="http://shequ.jb51.net/">脚本之家知识社区</a>
      <a target="_blank" href="https://shenzjd.com/">神族九帝</a>
    </div>
  </div>

</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style lang="scss" scoped>

  .footer{
    width: 100%;
    height: 80px;
    background-color: #16a085;
    div{
      padding-top: 5px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      a{
        color: white;
        margin-left: 10px;
      }
      a:hover{
        color: #303133;
      }
    }
  }
</style>
