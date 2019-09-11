<!-- ss -->
<template>
  <div class="talk-container">
      <div class="row" v-for="(rows,i) in rowLists" :key="i" >
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
  data () {
    return {
      rowLists:[]
    };
  },
  computed: {
    talklists() {
      return this.$store.state.Query.queryTalk;
    }
  },
created() {
    this.changerows();
  },
  methods: {
    changerows() {
      var rowNum = parseInt(Math.ceil(this.talklists.length / 2));
      for (var i = 0; i < rowNum; i++) {
        var start = i * 2;
        var end = start + 2;
        this.rowLists.push(this.talklists.slice(start, end));
      }
      return;
    }
  }
}

</script>
<style lang='scss' scoped>
.talk-container{
  margin-bottom:100px;
}
  .row {
    width: 90%;
    margin-left:100px;
     margin-bottom:50px;
    display: flex;
    justify-content: space-around;
.el-card {
  background-color: #F2F6FC;
}
    .talk-card {
      width: 38%;
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
</style>