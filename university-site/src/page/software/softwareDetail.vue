<template>
  <div class="main">
    <section>
      <div class="container">
      </div>
    </section>
  </div>

</template>

<script>
  export default {
    name: "articleDetail",
    data: function () {
      return {
        url: {
          findResourceById: '/api/admin/resource/find',
          findMoreSix: '/api/admin/resource/findMoreSix',
          updateLookNum: '/api/admin/resource/updateLookNum/'
        },
        resourceId: '',
        resource: {
          creater: {}
        },
        resourceMoreSix: [],
      };

    },
    methods: {
      initResourceData: function () {
        let _this = this;
        _this.$fetch(this.url.findResourceById, {_id: _this.resourceId}).then(reData => {
          if (reData.success) {
            if (reData.rows.length > 0) {
              _this.resource = reData.rows[0];
            }
          }
        });
      },
      initResourceMoreSixData: function () {
        let _this = this;
        _this.$fetch(this.url.findMoreSix).then(reData => {
          if (reData.success) {
            _this.resourceMoreSix = reData.rows;
            console.log(JSON.stringify(_this.resourceMoreSix))
          }
        });
      },
      updateLookNum: function () {
        let _this = this;
        _this.$post(this.url.updateLookNum + _this.resourceId, {id: _this.resourceId}).then(reData => {
          if (reData.success) {
            _this.$set(_this.resource, "lookNum", reData.data.lookNum);
          }
        });
      },
      getResourceId: function () {
        this.resourceId = this.$route.query.id;
      }
    },
    created: function () {
    },
    mounted: function () {

    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;


  }
</style>
