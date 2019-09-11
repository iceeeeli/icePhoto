<!-- 这是我的话题 -->
<template>
  <div class="my-talk">
    <el-card shadow="always" :body-style="	{ padding: '100px' }" v-if="joingroup">
      <div class="main">
        <span>你还没有参与话题，快去参与话题讨论吧！或者您也可以自己</span>
        <router-link to="/home/mytalk">创建话题</router-link>
      </div>
    </el-card>
    <div class="row" v-for="(rows,i) in rowLists" :key="i" v-else>
      <el-card
        shadow="hover"
        :body-style="	{ padding: '0px' }"
        class="talk-card"
        v-for="card in rows"
        :key="card.creatime"
      >
        <div class="talk-face">
         <router-link :to="{name:'onetalk',params:card}">
            <img :src="card.photo" alt width="70px" height="70px">
          </router-link>
        </div>
        <div class="tmain">
          <div class="talk-title">
            <span>{{card.title}}</span>
          </div>
          <div class="talk-con" v-for="talk in card.arts" :key="talk.id">
            <a href="#">{{talk.title}}</a>
            <span>{{talk.arguelength}}条评论</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joingroup: false,
      rows: 2,
      rowLists: []
    };
  },
  props: ["mytalks"],
  created() {
    this.iftalks()
    this.changerows();
  },
  methods: {
    iftalks(){
      if(this.mytalks.length==0){
        this.joingroup=true
      }
    },
    changerows() {
      var rowNum = this.rows;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 2;
        var end = start + 2;
        this.rowLists.push(this.mytalks.slice(start, end));
      }
      return;
    }
  }
};
</script>
<style lang='scss' scoped>
.my-talk {
  margin-bottom: 150px;
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .talk-card {
      width: 48%;
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
      .tmain {
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
}
</style>