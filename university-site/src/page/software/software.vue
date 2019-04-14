<template>
  <div class="main">
    <section>
      <div class="container">
        <div class="nav">
          <span @click="softTypeSelect('all','所有')" class="nav_title" :class="{'active':softType=='all'}">所有</span>
          <span @click="softTypeSelect(1,'编程软件')" class="nav_title" :class="{'active':softType==1}">编程软件</span>
          <span @click="softTypeSelect(2,'娱乐软件')" class="nav_title"
                :class="{'active':softType==2}">娱乐软件</span>
          <span @click="softTypeSelect(3,'影视音图')" class="nav_title" :class="{'active':softType==3}">影视音图</span>
          <span @click="softTypeSelect(4,'实用工具')" class="nav_title" :class="{'active':softType==4}">实用工具</span>
          <span @click="softTypeSelect(5,'其它')" class="nav_title" :class="{'active':softType==5}">其它</span>
          <div class="search_div">
            <input class="search" type="text" placeholder="请输入软件名" onfocus="this.placeholder=''"
                   onblur="this.placeholder='请输入软件名'">
            <div class="search_btn" id="flymeSearchBtn"><img src="../../../static/img/search.png" alt=""></div>
          </div>
        </div>

        <div class="soft_img">
          <img src="../../../static/img/software.jpg" alt="">
        </div>

        <div class="soft_div">
          <p class="soft_type">{{softTypeTxt}} <span class="soft_tag"> <router-link to="">最新</router-link> | <router-link
            to="">最热</router-link></span></p>
          <hr class="soft_hr">
          <div class="soft_list">

            <div class="soft_one" v-for="software in softwareList">
              <router-link :to="{path:'/view/user/softwareDetail',query:{id:software._id,type:software.softType}}">
                <div class="soft_one_img">
                  <img :src="$Roninwz.path.publicPath+software.imgUrl" alt="">
                </div>
                <p class="soft_one_title">{{software.name}}</p>
              </router-link>

              <!--<div class="soft_download">下载</div>-->
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
  export default {
    name: "software",
    data: function () {
      return {
        url: {
          findSoftWare: '/api/admin/software/find',
        },
        softwareList: [],
        softwareListTime: [],
        softType: 'all',
        softTypeTxt: '所有'
      };
    },
    methods: {
      initSoftwareData: function () {
        let _this = this;
        _this.$fetch(this.url.findSoftWare).then(reData => {
          if (reData.success) {
            _this.softwareList = reData.rows;
            _this.softwareListTime = reData.rows;
          }
        });
      },
      softTypeSelect:function (type,typeTxt) {
        let oldSoftwareList = this.softwareListTime;
        let newSoftwareList = [];
        console.log(type)
        oldSoftwareList.forEach(soft=>{
          if(soft.softType==type){
            newSoftwareList.push(soft);
          }
        });
        if(type!='all'){
          this.softwareList = newSoftwareList;
        }else {
          this.initSoftwareData();
        }
        this.softType = type;
        this.softTypeTxt = typeTxt;
      }
    },
    created: function () {
      this.initSoftwareData();
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
    .nav {
      width: 100%;
      height: 100px;

      .nav_title {
        display: inline-block;
        float: left;
        line-height: 100px;
        font-size: 20px;
        /*padding: 0 40px 0 40px;*/
        margin: 0 30px 0 30px;
        color: #505050;
        text-align: left;
      }
      .nav_title:hover {
        color: #16a085;
      }
      .active {
        color: #16a085;
      }
      .search_div {
        width: 230px;
        height: 100px;
        display: inline-block;
        line-height: 100px;
        float: left;
        .search {
          width: 180px;
          height: 35px;
          padding-left: 5px;
        }
        .search_btn {
          margin-top: 32px;
          width: 35px;
          height: 35px;
          float: right;
          background-color: #505050;
          text-align: center;
          line-height: 35px;
          img {
            transition: all 0.6s;
            cursor: pointer;
            width: 25px;
            height: 25px;
          }
          img:hover {
            transform: scale(1.05);
            z-index: 999;
          }
        }
      }
    }
    .soft_img {
      width: 100%;
      height: 400px;
    }

    .soft_div {
      width: 100%;
      .soft_hr {
        width: 88%;
      }
      .soft_type {
        width: 88%;
        margin-top: 30px;
        font-size: 18px;
        line-height: 25px;
        letter-spacing: 1px;
        font-family: "微软雅黑", "Microsoft Yahei", Arial, Helvetica, sans-serif, "宋体";
        color: #000;
        .soft_tag {
          float: right
        }
      }

      .soft_list {
        width: 88%;
        .soft_one {
          width: 100px;
          height: 140px;
          text-align: center;
          .soft_one_img {
            display: inline-block;
            width: 100%;
            height: 100px;
            img {
              width: 100%;
              height: 100px;
              object-fit: cover;
            }
          }
          .soft_one_title {
            font-size: 16px;
            line-height: 40px;
            display: inline-block;
          }
          .soft_one_title:hover {
            color: #16a085;
          }
        }
      }
    }
  }
</style>
