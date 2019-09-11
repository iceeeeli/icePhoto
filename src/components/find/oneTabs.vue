<!-- 标签详情页 -->
<template>
  <div>
    <div class="header">
      <span id="name">{{tabname}}</span>
      <span id="num">{{tabsimg.length}}组作品</span>
      <br>
      <!-- <el-button type="warning" plain v-if="dingyue" @click.prevent="handleDY">订阅</el-button>
      <el-button type="info" plain v-else @click.prevent="handleDY">已订阅</el-button> -->
    </div>
    <div class="main">
      <div class="title">
        <span id="hot">作品列表</span>
      </div>
      <div class="photoArea">
        <div class="row" v-for="(rows,index) in rowLists" :key="index">
          <div class="photoInfo" v-for="(img,index) in rows" :key="index">
            <div class="img-box">
              <router-link :to="{name: 'photoInfo',params:img}">
                <img :src="img.src[0]" style="height:300px;">
              </router-link>
            </div>

            <div class="author">
              <div class="left">
                <img :src="img.author" alt style="width:30px;">
                &nbsp;
                <span>author</span>
              </div>
              <div class="right">
                <img
                  src="@/assets/icon1/dianzan.svg"
                  alt="点赞"
                  title="点赞"
                  style="width:30px;"
                  v-if="img.like"
                  @click.prevent="like(img.id)"
                >
                <img
                  src="@/assets/icon1/dianzansucc.svg"
                  alt="取消点赞"
                  title="取消点赞"
                  style="width:30px;"
                  v-else
                  @click.prevent="unlike(img.id)"
                >
                &nbsp;&nbsp;
                <img
                  src="@/assets/icon1/shoucan.svg"
                  alt="收藏"
                  title="收藏"
                  style="width:30px;"
                  v-if="img.hide"
                  @click.prevent="hide(img.id)"
                >
                <img
                  src="@/assets/icon1/shoucansucc.svg"
                  alt="取消收藏"
                  title="取消收藏"
                  style="width:30px;"
                  v-else
                  @click.prevent="unhide(img.id)"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="more" style="text-align:center;margin-bottom:50px;">
          <el-button type="primary" @click="getMore" v-if="more">加载更多</el-button>
          <p v-else>没有更多了~~~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabname:this.$route.params.tabname,
      
      rowLists: [],
      imgListsPage: [],
      rows: 2,
      more: true
    };
  },
  created() {
    console.log(this.imglists);
    this.getImageRows();
  },
  computed: {
    tabsimg() {
      return this.$store.state.tabphotos;
    }
  },

  methods: {
    handleDY() {
      this.dingyue = !this.dingyue;
    },
    changeRow2() {
      var rowNum = this.rows;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 4;
        var end = start + 4;
        this.rowLists.push(this.imgListsPage.slice(start, end));
      }
      return;
    },
    like(id) {
      if (this.$store.state.login) {
        this.$store.commit("like", id);
      } else {
        alert("请先登录！");
      }
    },
    unlike(id) {
      this.$store.commit("unlike", id);
    },
    hide(id) {
      if (this.$store.state.login) {
        this.$store.commit("hide", id);
      } else {
        alert("请先登录！");
      }
    },
    unhide(id) {
      this.$store.commit("unhide", id);
    },
    getImageRows() {
      this.$store.commit("imgTag", this.imgTag);
      var j = this.rows * 4;
      this.imgListsPage = this.tabsimg.slice(0, j);
      this.rowLists = [];
      this.changeRow2();
    },
    getMore() {
      this.rows += 2;
      var a = this.rows * 4;
      var length = this.tabsimg.length;
      if (a >= length) {
        this.rows = parseInt(Math.ceil(length / 4));
        this.more = false;
        this.getImageRows();
      } else {
        this.getImageRows();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  height: 200px;
  background-color: #ebeef5;
  padding: 50px 100px;
  #name {
    font-size: 40px;
    letter-spacing: 5px;
    font-weight: bold;
  }
  #num {
    font-size: 20px;
    letter-spacing: 5px;
    color: #e6a23c;
    margin-left: 30px;
  }
  .el-button {
    margin-top: 50px;
  }
}
.main {
  margin: 80px 100px;
  .row {
    display: flex;
    justify-content: space-between;
    margin: 50px 0;

    .img-box {
      position: relative;
      overflow: hidden;
      img {
        cursor: pointer;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.4);
      }
    }
    .author {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      height: 50px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .left {
        span {
          position: relative;
          bottom: 30%;
        }
      }
      .right {
        img {
          cursor: pointer;
          transition: all 0.6s;
        }
        img:hover {
          transform: scale(1.4);
        }
      }
    }
  }
  .title {
    span {
      padding-right: 50px;
      font-size: 20px;
      letter-spacing: 3px;
    }
  }
}
</style>