<template>
  <div class="home-main-container">
    <el-row>
      <el-col :span="24">
        <act-sw></act-sw>
      </el-col>
    </el-row>
    <el-row class="tagNav">
      <el-col :span="12" :offset="8">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="black"
          active-text-color="#303133"
        >
          <el-menu-item v-for="title in titles" :key="title.id" :index="title.id">{{title.Tagname}}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-col :span="22" :offset="1" style="text-align:center;">
      <!-- <router-view></router-view> -->
      <div class="photo-show-container">
        <!-- 大盒子 -->
        <div class="photoArea">
          <div class="row" v-for="(rows,index) in rowLists" :key="index">
            <div class="photoInfo" v-for="(img,index) in rows" :key="index">
              <div class="img-box">
                <router-link :to="{name: 'photoInfo',params:img}">
                  <img :src="img.src[0]" style="height:320px;">
                </router-link>
              </div>

              <div class="author">
                <div class="left">
                  <img :src="img.author" alt style="width:30px;">
                  &nbsp;
                  <span>{{img.name}}</span>
                </div>
                <div class="right">
                  <span style="font-size:12px;">{{img.belike}}</span>
                  <img
                    src="@/assets/icon1/dianzan.svg"
                    alt="点赞"
                    title="点赞"
                    style="display: inline-block;vertical-align: middle;width:20px;"
                    v-if="img.like"
                    @click.prevent="like(img.id)"
                  >
                  <img
                    src="@/assets/icon1/dianzansucc.svg"
                    alt="取消点赞"
                    title="取消点赞"
                    style="display: inline-block;vertical-align: middle;width:20px;"
                    v-else
                    @click.prevent="unlike(img.id)"
                  >
                  &nbsp;
                  <span style="font-size:12px;">{{img.behide}}</span>
                  <img
                    src="@/assets/icon1/shoucan.svg"
                    alt="收藏"
                    title="收藏"
                    style="display: inline-block;vertical-align: middle;width:20px;"
                    v-if="img.hide"
                    @click.prevent="hide(img.id)"
                  >
                  <img
                    src="@/assets/icon1/shoucansucc.svg"
                    alt="取消收藏"
                    title="取消收藏"
                    style="display: inline-block;vertical-align: middle;width:20px;"
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
    </el-col>
  </div>
</template>

<script>
import ActSw from "@/subcomponents/ActSwiper.vue";
import PhotoShow from "../homeMainInfo/photoShow.vue";
export default {
  data() {
    return {
      activeIndex: "推荐",
      txt: "推荐",
      titles: [
        { Tagname: "推荐", id: "推荐" },
        { Tagname: "精选", id: "精选" },
        { Tagname: "最新", id: "最新" },
        { Tagname: "人文", id: "人文" },
        { Tagname: "人像", id: "人像" },
        { Tagname: "风光", id: "风光" }
      ],
      rowLists: [],
      imgListsPage: [],
      rows: 2,
      more: true
    };
  },
  mounted: function() {
    this.getImageRows();
    window.addEventListener("scroll", this.scrollToTop);
  },
  computed: {
    imgLists() {
      return this.$store.state.imgTag;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      var id = parseInt(key);
      this.txt = key;
      this.getImageRows()
      // var id=parseInt(key.substr(25,1))
      // this.$store.commit('imgTag',id)
    },
    scrollToTop() {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 388) {
      } else {
      }
    },
    photoShow(id) {
      this.$router.push({
        name: "photoShow",
        params: {
          id: "1"
        }
      });
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
      this.$store.commit("imgTag", this.txt);
      var j = this.rows * 4;
      this.imgListsPage = this.imgLists.slice(0, j);
      this.rowLists = [];
      this.changeRow2();
    },
    getMore() {
      this.rows += 2;
      var a = this.rows * 4;
      var length = this.imgLists.length;
      if (a >= length) {
        this.rows = parseInt(Math.ceil(length / 4));
        this.more = false;
        this.getImageRows();
      } else {
        this.getImageRows();
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },

  components: { ActSw, PhotoShow }
};
</script>
<style lang="scss" scoped>
.home-main-container {
  .tagNav {
    width: 100%;

    padding-bottom: 0;

    font-size: 18px;
    letter-spacing: 1.5px;

    border-bottom: solid 1px #e6e6e6;
    background-color: #fff;
    .el-menu-demo {
      border-bottom: solid 1px #fff;
      height: 66px;
      .el-menu-item.is-active {
        font-weight: bold;
      }
    }
  }
}
.photo-show-container {
  margin: 0px;
  .row {
    display: flex;
    justify-content: space-around;
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
}
</style>

