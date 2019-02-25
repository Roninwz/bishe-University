<template>
  <div class="all-content">
    <div class="content">
      <el-row :gutter="20" class="nav">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <div class="con-article">
              <ul>
                <li v-for="data in technologyList">
                  <span class="article">
                    <a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"><img
                      :src="$Roninwz.path.publicPath+data.imgUrl" :alt="data.title"></a>
                  </span>
                  <span class="article-right">
                    <span class="article-title"><a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"
                                                   rel="bookmark">{{data.title}}</a></span>
                    <span class="article-con"><a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"
                                                 rel="bookmark" v-html="data.content">
                      <!--{{data.content}}-->
                    </a></span>
                  <span class="article-boot">
                    <span class="article-date">{{data.createTime}}</span><span class="article-eye"><i
                    class="fa fa-eye"></i>&nbsp;{{data.lookNum}}</span>
                  </span>
                  <span class="article-button">
                  <el-button type="info" plain>阅读全文</el-button>
                  </span>
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card class="box-card nav-tab">
              <div slot="header" class="clearfix">
                <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
                <span>本站推荐</span>
              </div>
              <div class="text item">
                <ul>
                  <li>
				<span class="thumbnail">
					<a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"><img
            src="http://www.pcdaxue.com/wp-content/themes/begin/timthumb.php?src=http://www.pcdaxue.com/wp-content/uploads/2017/05/1f2539bc1ae084c33370.jpg&amp;w=280&amp;h=210&amp;a=&amp;zc=1"
            alt="WannaCry 比特币勒索病毒防范和解决办法"></a>				</span>
                    <span class="hot-title"><a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"
                                               rel="bookmark">WannaCry 比特币勒索病毒防范和解决</a></span>
                    <span class="views_time"><i class="glyphicon glyphicon-time">&nbsp;2017-10-10</i></span><span
                    class="views"><i class="fa fa-eye"></i> 93</span>
                  </li>

                  <li>
				<span class="thumbnail">
					<a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"><img
            src="http://www.pcdaxue.com/wp-content/themes/begin/timthumb.php?src=http://www.pcdaxue.com/wp-content/uploads/2017/05/1f2539bc1ae084c33370.jpg&amp;w=280&amp;h=210&amp;a=&amp;zc=1"
            alt="WannaCry 比特币勒索病毒防范和解决办法"></a>				</span>
                    <span class="hot-title"><a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"
                                               rel="bookmark">WannaCry 比特币勒索病毒防范和解决</a></span>
                    <span class="views_time"><i class="glyphicon glyphicon-time">&nbsp;2017-10-10</i></span><span
                    class="views"><i class="fa fa-eye"></i> 93</span>
                  </li>
                  <li>
				<span class="thumbnail">
					<a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"><img
            src="http://www.pcdaxue.com/wp-content/themes/begin/timthumb.php?src=http://www.pcdaxue.com/wp-content/uploads/2017/05/1f2539bc1ae084c33370.jpg&amp;w=280&amp;h=210&amp;a=&amp;zc=1"
            alt="WannaCry 比特币勒索病毒防范和解决办法"></a>				</span>
                    <span class="hot-title"><a href="http://www.pcdaxue.com/wannacry-precautions-and-solutions.html"
                                               rel="bookmark">WannaCry 比特币勒索病毒防范和解决办法办法办法办法办法</a></span>
                    <span class="views_time"><i class="glyphicon glyphicon-time">&nbsp;2017-10-10</i></span><span
                    class="views"><i class="fa fa-eye"></i> 93</span>
                  </li>
                </ul>
              </div>


            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        url: {
          list: '/api/admin/technology/list',
          find: '/api/admin/technology/find',
          remove: '/api/admin/technology/remove',
          removeOne: '/api/admin/technology/remove/{id}',
          save: '/api/admin/technology/save/{id}',
          detail: '/api/admin/technology/detail/{id}',
        },
        technologyList: [],

      };
    },
    computed: {},
    methods: {
      //  初始化数据
      initArticleData: function () {
        // this.$api.get(this.url.find, {
        //
        // }, response => {
        //   if (response.status >= 200 && response.status < 300) {
        //     console.log(response.data);
        //   } else {
        //     console.log(response.message);
        //   }
        // });
        this.$fetch(this.url.find).then(reData => {
          console.log("redata:" + JSON.stringify(reData));
          console.log("redata:" + reData);
          if (reData.success) {
            this.technologyList = reData.rows;
          }
        });
      }

    },
    created: function () {
      this.initArticleData();
    }
  }
</script>

<style scoped>
  @import "../assets/plugin/bootstrap/css/bootstrap.min.css";

  .all-content {
    width: 100%;
    height: 100%;
    min-height: 900px;
    background-color: #F6F6F6;
  }

  .all-content a:hover {
    color: #000;
  }

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }

  .item ul li {
    width: 100%;
    height: 90px;
    font-size: 14px;
    margin-top: 10px;
    border-bottom: 1px solid #F6F6F6;
  }

  .thumbnail {
    position: relative;
    float: left;
    width: 100px;
    height: 75px;
    margin: 8px 8px 8px 0;
    overflow: hidden;
    border-radius: 4px;
  }

  .thumbnail img {
    width: 80px;
    height: 75px;
  }

  .thumbnail a {
    color: #555;
  }

  .hot-title {
    width: 130px;
    height: 35px;
    display: block;
    overflow: hidden;
    margin-top: 15px;
  }

  .hot-title a {
    color: #555;
  }

  .views {
    float: right;
    margin-top: 20px;
  }

  .views_time {
    float: left;
    margin-top: 20px;
  }

  .item ul li .fa-thumbs-o-up {
    float: right;
    margin-top: 20px;
  }

  .con-article {

  }

  .article-right {
    width: 100%;
    height: 150px;
  }

  .con-article ul li {
    width: 900px;
    height: 200px;
    font-size: 14px;
    margin-top: 20px;
    border-bottom: 1px solid #F6F6F6;
    background-color: white;
  }

  .con-article .article {
    position: relative;
    float: left;
    width: 200px;
    height: 150px;
    margin: 28px 28px 28px 28px;
    overflow: hidden;
    border-radius: 4px;
  }

  .con-article .article-title {
    position: relative;
    width: 600px;
    height: 35px;
    display: block;
    overflow: hidden;
    font-size: 25px;

    top: 20px;
  }

  .con-article .article-title a {
    color: #555;
  }

  .con-article .article-con {
    position: relative;
    width: 600px;
    height: 60px;
    overflow: hidden;
    display: block;
    font-size: 15px;
    top: 40px;

  }

  .con-article .article-boot {
    position: relative;
    top: 70px;
  }

  .con-article .article-con a {
    text-align: justify;
    color: #999;
  }

  .article-eye {
    margin-left: 30px;
  }

  .article-button {
    position: relative;
    top: 50px;
    left: 350px;
  }

  .nav-tab {
    margin-top: 20px;
    width: 305px;
  }
</style>
