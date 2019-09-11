<!-- 热门话题 -->
<template>
  <div class="new-talk">
    <div class="left">
      <el-card shadow="always" :body-style="	{ padding: '0px' }" class="titl">
        <div class="title">
          <span>最新话题</span>
        </div>
      </el-card>
      <el-card
        shadow="hover"
        :body-style="	{ padding: '0px' }"
        class="talk-card"
        v-for="card in newtalks"
        :key="card.creatime"
      >
        <div class="talk-face">
          <router-link :to="{name:'onetalk',params:card}">
            <img :src="card.photo" alt width="70px" height="70px">
          </router-link>
        </div>
        <div class="main">
          <div class="talk-title">
            <span>{{card.title}}</span>
          </div>
          <div class="talk-con" v-for="talk in card.arts" :key="talk.id">
            <a href="#">{{talk.title}}</a>
            <span>{{talk.arguelength}}条评论</span>
          </div>
        </div>
      </el-card>
      <div class="fenye" style="text-align:center;margin:80px auto;">
          <el-button type="info" v-if="more" @click="more=!more">加载更多</el-button>
          <span v-else>没有更多了~~</span>
      </div>
    </div>
    <el-card shadow="hover" :body-style="	{ padding: '0px' }" class="intro">
      <div class="title">
        <span>最新讨论区</span>
      </div>
     <div class="right" v-for="item in newtalks" :key="item.creatime">
        <img :src="item.photo" alt width="30px" style="margin-left:10px;">

        <span>{{item.title}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      more:true
    };
  },
  props: ["newtalks"],
  methods: {}
};
</script>
<style lang='scss' scoped>
.new-talk {
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
  .title {
    background-color: #f5f5f5;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px;
      letter-spacing: 3px;
      font-weight: bold;
    }
  }
  .left {
    width: 75%;
    .talk-card {
      height: auto;
      margin-top: 20px;
      .talk-face {
        float: left;
        width: 90px;
        height: 100%;
        padding: 20px 20px;
        img {
          box-shadow: 1px 1px 2px 2px #eee;
        }
      }
      .main {
        padding: 20px 10px;
        margin-left: 100px;
        .talk-title {
          margin-bottom: 10px;
          span {
            font-size: 20px;
            letter-spacing: 3px;
          }
        }
        .talk-con {
          padding: 5px 0;
          font-size: 14px;
          letter-spacing: 2px;
          span {
            font-size: 13px;
            color: #909399;
          }
        }
      }
    }
  }
  .intro {
    width: 23%;
    height: auto;
    span {
      font-size: 15px;
      letter-spacing: 2px;
      line-height: 25px;
    }
    .right {
      height: 50px;
      border: 1px solid;
      display: flex;
      align-items: center;
      span {
        margin-left: 20px;
      }
    }
  }
}
</style>