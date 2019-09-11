<!-- 活动详情图 -->
<template>
  <div>
    <div class="header" ref="header"></div>
    <div class="join">
      <div class="intro-card">
        <span id="title">介绍</span>
        <br>
        <span class="title">标题：</span>
        <span class="content">{{actinfo.title}}</span>
        <br>
        <span class="title">内容：</span>
        <span class="content">{{actinfo.intro}}</span>
        <br>
        <span class="title">状态：</span>
        <span class="content">{{actinfo.state}}</span>
      </div>
      <div class="join-card">
        <span id="join-title"  v-if="actinfo.state=='进行中'">距离截稿还有{{days}}天 共{{actinfo.imglists.length}}件作品</span>
         <span id="join-title"  v-else>已截稿 共{{actinfo.imglists.length}}件作品</span>
        <br>
        <span id="join-host">主办方：{{actinfo.author}}</span>
        <br>
        <button
          type="button"
          class="mui-btn mui-btn-warning mybutton"
          width="500px"
          v-if="actinfo.state=='进行中'"
          @click="joinact"
        >立即参加</button>
         <button
          type="button"
          class="mui-btn mui-btn-warning mybutton"
          width="500px"
          v-else disabled
          @click="joinact"
        >已结束</button>
      </div>
    </div>
    <div class="photo">
      <span id="phtitle">作品</span>
      <br>
      <div class="row" v-for="(rows,index) in rowLists" :key="index">
        <!-- 每一张图片区域 -->
        <div class="photoInfo" v-for="(img,index) in rows" :key="index">
          <!-- 图片 -->
          <div class="img-box">
            <router-link :to="{name: 'photoInfo',params:img}">
              <el-card shadow="always" :body-style="{ padding: '0px' }">
                <img :src="img.src[0]" style="height:320px;">
                <div id="zhezhao">
                  <img
                    src="@/images/icon.jpg"
                    alt
                    style="width:40px;margin-top:230px;border-radius:50%;"
                  >
                </div>
              </el-card>
            </router-link>
          </div>
        </div>
      </div>
     <div class="more" style="text-align:center;margin-top:20px;">
      <el-button type="info" v-if="more" @click="more=!more">加载更多</el-button>
      <span v-else>没有更多了~~</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgLists: [
        {
          src: require("../../images/1.png"),
          id: 1
        },
        {
          src: require("../../images/2.png"),
          id: 2
        },
        {
          src: require("../../images/3.png"),
          id: 3
        },
        {
          src: require("../../images/2.png"),
          id: 4
        },
        {
          src: require("../../images/1.png"),
          id: 5
        },
        {
          src: require("../../images/3.png"),
          id: 6
        },
        {
          src: require("../../images/2.png"),
          id: 7
        },
        {
          src: require("../../images/1.png"),
          id: 8
        }
      ],
      rowLists: [],
      actinfo: this.$route.params,
      more:true
    };
  },
  computed: {
    days() {
      return parseInt(
        Math.abs(
          Date.parse(this.actinfo.endtime) - Date.parse(this.actinfo.creatime)
        ) /
          1000 /
          60 /
          60 /
          24
      );
    }
  },
  mounted: function() {
   this.$refs.header.style.backgroundImage='url('+this.actinfo.photo+')';
    this.changeRow();
  },

  methods: {
    bcg(){
     
    },
    changeRow() {
      var rowNum = parseInt(Math.ceil(this.actinfo.imglists.length / 4));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 4;
        var end = start + 4;
        this.rowLists.push(this.actinfo.imglists.slice(start, end));
      }
      return;
    },
    joinact() {
      this.$router.push("/home/sendindex/sendphoto/" + this.actinfo.title);
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  height: 500px;
  background-image: url("../../images/3.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: fixed;
}
.join {
  display: flex;
  justify-content: space-between;
  margin: 50px 50px;

  .intro-card {
    width: 70%;
    height: auto;
    border: 1px solid #909399;
    box-shadow: 1px 1px 3px 2px #909399;

    #title {
      margin-left: 30px;
      text-decoration: underline;
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      letter-spacing: 10px;
      color: #606266;
    }
    .title {
      margin-left: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #050505;
    }
    .content {
      margin-left: 10px;
      line-height: 50px;
      font-size: 16px;

      letter-spacing: 5px;
      color: #909399;
    }
  }
  .join-card {
    width: 25%;
    height: 150px;
    border: 1px solid #909399;
    box-shadow: 1px 1px 3px 2px #909399;
    border-radius: 2%;
    #join-title {
      margin-left: 20px;
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      letter-spacing: 5px;
      color: #606266;
    }
    #join-host {
      margin-left: 20px;
      line-height: 30px;
      font-size: 16px;
      letter-spacing: 5px;
      color: #909399;
    }
    .mybutton {
      margin: 20px 20px;
      width: 90%;
    }
  }
}
.photo {
  margin: 50px 50px 100px 50px;
  #phtitle {
    margin-left: 30px;
    font-size: 22px;
    font-weight: bold;
    line-height: 50px;
    letter-spacing: 5px;
    color: #606266;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin: 50px 10px 0 10px;

    .img-box {
      position: relative;
      overflow: hidden;
      z-index: 0;
      #zhezhao {
        position: absolute;
        z-index: -1;
        top: 0;
        width: 100%;
        height: 320px;
        text-align: center;
        background-color: #fff;
      }
    }
    .img-box:hover {
      #zhezhao {
        z-index: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>