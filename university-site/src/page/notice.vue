<template>
  <div class="main">

    <div class="notice_list">

      <div class="notice_one">

      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: "notice",
    data: function () {
      return {};
    },
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .notice_list {
      width: 80%;
      .notice_one{
        width: 100%;
        height: 50px;
      }
    }

  }
</style>
