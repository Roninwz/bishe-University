<template>
  <div class="app">
    <div class="nav">

      <div class="nav-con">

        <ul>
          <router-link to="/one">
          <li class="active">
            问答首页
          </li></router-link>
          <router-link to="/one">
          <li>
            发现问答
          </li></router-link>
          <router-link to="/one">
          <li>
           等待回答
          </li></router-link>

        </ul>
      </div>
    </div>

    <div class="content">
      <el-row :gutter="20">
        <el-col :span="15"><div class="grid-content bg-purple">

          <p><span></span><span class="hot-title">热门问答</span></p>

          <ul>
            <router-link to="/one">
              <li>
                发现问答发现问答发现问答发现问答发现问答发现问答发现问答
              </li></router-link>
            <router-link to="/one">
              <li>
                发现问答发现问答发现问答发现问答发现问答发现问答
              </li></router-link>
            <router-link to="/one">
              <li>
                发现问答发现问答发现问答发现问答发现问答发现问答
              </li></router-link>
            <router-link to="/one">
              <li>
                发现问答发现问答发现问答发现问答发现问答发现问答
              </li></router-link>
          </ul>
        </div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple kong">
        </div>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple">


          <span class="hot-title">最佳回答者</span>
            <el-tabs v-model="activeName2" type="card">
              <el-tab-pane label="本日" name="first">本日</el-tab-pane>
              <el-tab-pane label="本月" name="second">本月</el-tab-pane>
            </el-tabs>
        </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          activeName: 'second'
        };

      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
      },
      created(){

      }
    }
</script>

<style scoped>

  .app{
    width: 100%;
    height: 100%;
    background-color: #F6F6F6;
  }
  .nav{
    width: 100%;
    height: 120px;
    background-color: white;
    border-bottom: 1px solid  #F6F6F6;
  }
  .nav-con{
    width: 800px;
    margin: 0 auto;
  }
  .nav-con ul{
    margin-top: 20px;
  }
  .nav-con ul .active{
    background-color: #F6F6F6;
  }
  .nav-con ul li{
    width: 150px;
    height: 45px;
    display: block;
    font-size: 17px;
    text-align: center;
    line-height:45px;
    color: black;
    float: left;
  }
  .nav-con ul li:hover{
    background-color: #eeeeee;
  }
  .content{
    width: 1200px;

    margin: 0 auto;
  }
  .grid-content{
    background-color:white ;
  border-bottom: 1px solid #eeeeee;
  }
  .grid-content li{
    list-style:disc;
    margin-left: 30px;
    line-height: 35px;
  }
/*.el-tabs__nav-wrap::after{*/
  /*content: "";*/
  /*width: 0;*/
  /*height: 0;*/
/*}*/
  .content p{
    margin: 10px 10px 10px 10px;
  }
  .content a:hover{
    color: lightsteelblue;
  }
.hot{
  width: 100px;
}
  .hot-tab{
    width: 200px;
    float: left;
  }
  .hot-title{
    font-size: 25px;
    margin-left: 10px;
  }

</style>
