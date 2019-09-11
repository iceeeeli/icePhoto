<!-- 话题主页 -->
<template>
  <div class="talk-container">
    <el-card shadow="always" :body-style="	{ padding: '0px' }" class="header">
      <div class="face">
        <img :src="talks.photo" alt width="150px" height="150px">
      </div>
      <div class="title">
        <div class="name">
          <span>{{talks.title}}</span>
        </div>
        <div class="intro">
          <span>{{talks.intro}}</span>
        </div>
        <el-button type="warning" size="medium" class="butt" @click="sendart">发新帖</el-button>
      </div>
    </el-card>
    <div class="main">
      <el-card shadow="always" :body-style="	{ padding: '0px' }" class="content">
        <div class="left" v-for="item in talks.arts" :key="item.id">
          <div class="con-title">
            <router-link :to="{name: 'talkcon',params:{art:item}}">
              <span>{{item.title}}</span>
            </router-link>
          </div>
          <div class="con-main">
            <img :src="item.photo" alt width="30px" height="30px">
            <span id="author">{{item.name}}</span>
            <span id="time">{{item.creatime}}</span>
            <span id="back">{{item.arguelength}}评论</span>
            <span id="back">{{item.belike}}点赞</span>
          </div>
        </div>
        <div class="fenye" style="text-align:center;margin:80px auto;">
          <el-button type="info" v-if="more" @click="more=!more">加载更多</el-button>
          <span v-else>没有更多了~~</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      talks: this.$route.params,
      more: true
    };
  },

  methods: {
    sendart() {
      this.$router.push("/home/sendindex/sendart/" + this.talks.title);
    }
  }
};
</script>
<style lang='scss' scoped>
.talk-container {
  margin: 20px 300px;
  width: 60%;
  .header {
    height: 200px;

    .face {
      float: left;
      width: 150px;
      height: 200px;
      display: flex;
      align-items: center;
      margin: 0 50px;
    }
    .title {
      padding: 50px 0;
      .name {
        font-size: 30px;
        letter-spacing: 3px;
      }
      .intro {
        font-size: 16px;
        letter-spacing: 2px;
        padding: 50px 0;
      }
      .butt {
        float: right;
        right: 50px;
        bottom: 120px;
        width: 200px;
        font-size: 20px;
        line-height: 40px;
        letter-spacing: 3px;
      }
    }
  }
  .main {
    width: 100%;
    height: auto;
    margin: 20px auto;
    .left {
      width: 100%;
      height: 100px;
      border: 1px solid #eee;
      .con-title {
        margin-left: 20px;
        margin-top: 20px;
        font-size: 20px;
        letter-spacing: 2px;
      }
      .con-main {
        margin-left: 20px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        #author {
          margin-left: 20px;
          font-size: 16px;
          letter-spacing: 1.5px;
        }
        #time {
          margin-left: 20px;
          font-size: 16px;
          letter-spacing: 1.5px;
        }
        #back {
          margin-left: 20px;
          font-size: 14px;
          letter-spacing: 1.5px;
          color: #909399;
        }
      }
    }
  }
}
</style>