<template>
  <div class="main">
    <section>
      <div class="container">
        <section class="row">
          <aside class="col-md-4 myAside" id="sidebar">
            <div class="soft_img">
              <img :src="$Roninwz.path.publicPath+software.imgUrl" alt="">
            </div>
            <a target="_blank" :href="software.link">
            <div class="soft_btn">
              下载
            </div>
            </a>
            <p class="soft_info">类别：{{softwareType}}</p>
            <p class="soft_info">版本：{{software.version}}</p>
            <p class="soft_info">大小：{{software.size}}</p>
            <p class="soft_info">更新时间：{{software.updateTime | formatDate}}</p>
            <p class="soft_info">密码：{{software.pass}}</p>
          </aside>
          <section class="col-md-8 mySoftware" id="mainstay">
            <div class="software clearfix">
              <p class="software_title">{{software.name}}</p>
              <div class="software_info">
                <p class="software_tro">应用简介：</p>
                <div class="soft_contain" v-html="software.introduction">
                </div>
                <p class="software_tro">应用截图：</p>
                <div class="soft_screen_img">
                  <img :src="$Roninwz.path.publicPath+software.screenImgUrl" alt="">
                </div>
              </div>
            </div>

          </section>

        </section>
      </div>
    </section>
  </div>

</template>

<script>
  import {formatDate} from '../../util/date.js';
  export default {
    name: "softwareDetail",
    data: function () {
      return {
        url: {
          findSoftwareById: '/api/admin/software/find',
          findMoreSix: '/api/admin/software/findMoreSix',
          updateLookNum: '/api/admin/software/updateLookNum/'
        },
        softwareId: '',
        softwareType:'其它',
        software: {
          creater: {}
        },
        softwareMoreSix: [],
      };

    },
    filters: {
      formatDate: function (time) {
        if (time != null && time != "") {
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd");
        } else {
          return "";
        }
      }
    },
    methods: {
      initSoftwareData: function () {
        let _this = this;
        _this.$fetch(this.url.findSoftwareById, {_id: _this.softwareId}).then(reData => {
          if (reData.success) {
            if (reData.rows.length > 0) {
              _this.software = reData.rows[0];
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
        _this.$post(this.url.updateLookNum + _this.softwareId, {id: _this.softwareId}).then(reData => {
          if (reData.success) {
            _this.$set(_this.resource, "lookNum", reData.data.lookNum);
          }
        });
      },
      getResourceId: function () {
        this.softwareId = this.$route.query.id;
       let type = this.$route.query.type;
       if(type==1){
         this.softwareType = '编程软件';
       }else if(type==2){
         this.softwareType = '娱乐软件';
       }else if(type==3){
         this.softwareType = '影视音图';
       }else if(type==4){
         this.softwareType = '实用工具';
       }else{
         this.softwareType = '其它';
       }
      },

    },
    created: function () {
      this.getResourceId();
      this.initSoftwareData();
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
    padding-bottom: 20px;
    .myAside {
      margin-top: 20px;
      padding-left: 50px;
      .soft_img {
        width: 150px;
        height: 150px;
      }
      .soft_btn {
        margin-top: 20px;
        width: 150px;
        height: 36px;
        color: white;
        line-height: 36px;
        text-align: center;
        background-color: #32A5E7;
        font-size: 16px;
      }
      .soft_info {
        margin-top: 20px;
        color: #7f7f7f;
        line-height: 25px;
      }
    }

    .mySoftware {
      .software {
        margin-top: 20px;
        width: 100%;
        .software_title {
          width: 100%;
          font-size: 20px;
          line-height: 30px;
          color: #00a7ea;
        }
        .software_info {
          .software_tro{
            font-size: 20px;
            line-height: 30px;
            color: black;
          }

        }
      }

    }
  }
</style>
