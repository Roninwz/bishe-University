<template>
  <div class="main">
    <div class="my_contain">
      <div class="resource_div" v-for="(resource,index) in resourceList">
        <router-link :to="{path:'/view/user/resourceDetail',query:{id:resource._id}}">
          <div class="resource_img">
            <img :src="$Roninwz.path.publicPath+resource.imgUrl" alt="">
          </div>
          <h2 class="resource_title">{{resource.title}}</h2>
        </router-link>
          <p class="resource_info"><span>{{resource.createTime}}</span><span class="read">阅读({{resource.lookNum}})</span>
            <!--<span class="pinglun">评论</span>-->
            <span class="resource_zan" @click="zan(resource,index)"><img v-if="resource.isZan" class="zan" src="../../../static/img/zaned.png" alt=""><img v-if="!resource.isZan" class="zan" src="../../../static/img/zan.png" alt=""><span>{{resource.zanNum}}</span></span>
          </p>

      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "resource",
    data: function () {
      return {
        url:{
          findResource:'/api/admin/resource/find',
          updateZanNum:'/api/admin/resource/updateZanNum',
        },
        isZan:false,
        resourceList:[],
      };
    },
    methods:{
      zan:function (resource,index) {
        if(resource.isZan){
          if(resource.zanNum>0){
            resource.zanNum--;
          }
          resource.isZan = false;
          localStorage.setItem("isZan"+resource._id,"nozan");
        }else {
          resource.zanNum++;
          resource.isZan = true;
          localStorage.setItem("isZan"+resource._id,"zan");
        }
        this.$set(this.resourceList,index,resource);
        this.updateZanNum(resource._id,resource.zanNum);
      },
      initResourceData:function () {
        let _this = this;
        _this.$fetch(this.url.findResource).then(reData => {
          if (reData.success) {

            _this.resourceList = reData.rows;
            for (let i = 0;i<_this.resourceList.length;i++){
              if(localStorage.getItem("isZan"+_this.resourceList[i]._id)=='zan'){
                _this.$set(_this.resourceList[i],"isZan",true);
              }else {
                _this.$set(_this.resourceList[i],"isZan",false);
              }
            }
          }
        });
      },
      updateZanNum:function (id,zanNum) {
        let _this = this;
        _this.$fetch(this.url.updateZanNum,{id:id,zanNum:zanNum}).then(reData => {
          if (reData.success) {

          }
        });
      },
    },
    created:function () {
      this.initResourceData();
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .my_contain {
      max-width: 1280px;
      width: 80%;
      margin: 20px auto;
      min-height: 800px;
      padding-top: 2%;
      .resource_div {
        position:relative;
        width: 23%;
        height: 260px;
        margin-right: 2%;
        margin-bottom: 2.5%;
        padding: 12px;
        background-color: white;
        float: left;
        .resource_img{
          width: 100%;
          height: 150px;
          img{
            width: 100%;
            height: 150px;
            vertical-align:middle;
            transition: all 0.6s;
            cursor: pointer;
          }
          img:hover{
            transform: scale(1.05);
            z-index:999
          }
        }
        .resource_title{
          text-align: center;
          font-size: 14px;
          color: black;
          font-weight: bold;
          line-height: 20px;
        }
        .resource_info{
          position:absolute;
          bottom:0;
          width: 100%;
          font-size: 14px;
          color: #bbb;
          line-height: 30px;
          .read{
            margin-left: 10px;
          }
          .pinglun{
            margin-left: 10px;
          }
          .resource_zan{
            float: right;
            margin-right: 30px;
            .zan{
              width: 20px;
              height: 20px;
              vertical-align: middle;
              margin-bottom: 2px;
            }
          }
        }

      }
    }
  }
</style>
