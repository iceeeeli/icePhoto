<!-- 我的文章 -->
<template>
  <div class="art-container">
    <div class="row" v-for="(rows,index) in rowLists" :key="index">
      <el-card
        shadow="hover"
        :body-style="	{ padding: '0px' }"
        class="talk-card"
        v-for="card in rows"
        :key="card.id"
      >
        <div class="talk-face">
           <router-link :to="{name: 'talkcon',params:{art:card}}">
            <img :src="card.photo" alt width="150px" height="150px">
          </router-link>
        </div>
        <div class="main">
          <div class="talk-title">
            <span>{{card.title}}</span>
          </div>
          <div class="talk-con">
            <span>{{card.desc}}</span>
          </div>
        </div>
        <div class="sign">
          <div class="s-left">
            <img src="@/assets/icon1/sign.svg" height="25px">&nbsp;
            <el-button size="mini" v-for="sign in card.tag" :key="sign">{{sign}}</el-button>
          </div>
          <div class="s-right">
            <span>{{card.name}}|{{card.read}}阅读量</span>
            <span>{{card.belike}}喜欢</span>
            <span>{{card.arguelength}}评论</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="more" style="text-align:center;margin-top:50px;">
      <el-button type="info" @click="getMore" v-if="more">加载更多</el-button>
      <p v-else>没有更多了~~~</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: 2,
      rowLists: [],
      artListsPage: [],
      more: true
    };
  },
  computed: {
    artlists() {
      return this.$store.state.Userlists.oneUserMess.myart;
    }
  },
  mounted: function() {
    this.getRows();
  },
  methods: {
    changeRow() {
      var rowNum = this.rows;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 2;
        var end = start + 2;
        this.rowLists.push(this.artListsPage.slice(start, end));
      }
      return;
    },
    getRows() {
      var j = this.rows * 2;
      this.artListsPage = this.artlists.slice(0, j);
      this.rowLists = [];
      this.changeRow();
    },
    getMore() {
      this.rows += 2;
      var a = this.rows * 2;
      var length = this.artlists.length;
      if (a >= length) {
        this.rows = parseInt(Math.ceil(length / 2));
        this.more = false;
        this.getRows();
      } else {
        this.getRows();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.art-container {
  margin: 50px 200px;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 45%;
    }
    .talk-card {
      height: 230px;
      margin-top: 20px;
      .talk-face {
        float: left;
        width: 190px;
        height: 190px;
        padding: 20px 25px;
        img {
          box-shadow: 1px 1px 2px 2px #eee;
        }
      }
      .main {
        padding: 20px 30px;
        height: 190px;
        margin-left: 130px;
        .talk-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            line-height: 30px;
            font-size: 25px;
            letter-spacing: 3px;
            font-weight: bold;
          }
        }
        .talk-con {
          padding: 20px 0;

          span {
            letter-spacing: 2px;
            font-size: 18px;
            color: #909399;
          }
        }
      }
    }
    .sign {
      display: flex;
      justify-content: space-between;
      height: 40px;
      width: 100%;
      padding: 0 20px;
      .el-button {
        border-radius: 10px;
        color: #909399;
      }
      .s-right {
        span {
          font-size: 16px;
          color: #909399;
          letter-spacing: 2px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>