<!-- 教程 -->
<template>
  <div class="teach-container">
    <div class="left">
      <el-card shadow="always" :body-style="	{ padding: '0px' }" class="titl">
        <div class="ltitle">
          <el-autocomplete
            class="inline-input"
            v-model="inputinfo"
            :fetch-suggestions="querySearch"
            placeholder="请输入要搜索的教程"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
            <i slot="suffix" class="el-input__icon el-icon-search" @click="query"></i>
            <template slot-scope="{ item }">
              <div
                class="name"
                style="text-overflow: ellipsis;
      overflow: hidden;"
              >{{ item.value }}</div>
              <span class="addr" style="font-size: 12px;
      color: #b4b4b4;">{{ item.name }}</span>
            </template>
          </el-autocomplete>
        </div>
        <div class="selected">
          <el-button v-for="tab in tabs" :key="tab" @click="getTag(tab)">{{tab}}</el-button>
        </div>
      </el-card>
      <el-card
        shadow="hover"
        :body-style="	{ padding: '0px' }"
        class="talk-card"
        v-for="card in artListsPage"
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
            <span>{{card.author[0].name}}|{{card.read}}阅读量</span>
            <span>{{card.belike}}喜欢</span>
            <span>{{card.arguelength}}评论</span>
          </div>
        </div>
      </el-card>
      <div class="fenye" style="text-align:center;margin:80px auto;">
        <el-button type="info" @click="getMore" v-if="more">加载更多</el-button>
        <p v-else>没有更多了~~~</p>
      </div>
    </div>
    <el-card shadow="hover" :body-style="	{ padding: '0px' }" class="intro">
      <div class="title">
        <span>热门文章</span>
      </div>
      <div class="right" v-for="item in hotart" :key="item.id">
        <router-link :to="{name: 'talkcon',params:{art:item}}">
          <img :src="item.photo" alt width="30px" height="30px" style="margin-left:10px;">
        </router-link>
        <span>{{item.title}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["所有", "人像", "后期修图", "手机拍照", "器材应用", "拍摄技巧"],
      inputinfo: "",
      restaurants: [],
      rows: 2,
      artListsPage: [],
      hotart: [],
      more: true,
      queryinput: []
    };
  },
  computed: {
    artlists() {
      return this.$store.state.arts;
    }
  },
  created() {
    this.getRows();
    this.hotart = this.artlists.slice(0, 10);
    this.loadAll();
    this.restaurants = this.queryinput;
  },
  mounted: function() {},
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      this.artlists.forEach(el => {
        var i = {};
        i.value = el.title;
        i.name = "作者：" + el.author[0].username;
        this.queryinput.push(i);
      });
      console.log("11" + this.queryinput);
    },
    handleSelect(item) {
      var queryart = [];
      this.artlists.forEach(el => {
        if (el.title.indexOf(item.value) >= 0) {
          queryart.push(el);
        }
      });
      this.artListsPage = queryart;
    },
    query() {
      var queryart = [];
      this.artlists.forEach(el => {
        if (el.title.indexOf(this.inputinfo) >= 0) {
          queryart.push(el);
        }
      });
      this.artListsPage = queryart;
    },
    getTag(tag) {
      var tagart = [];
      if (tag == "所有") {
        this.getRows();
        return;
      }
      this.artlists.forEach(el => {
        el.tag.some(item => {
          if (item == tag) {
            tagart.push(el);
          }
        });
      });
      this.artListsPage = tagart;
    },
    getRows() {
      var j = this.rows * 2;
      this.artListsPage = this.artlists.slice(0, j);
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
.teach-container {
  margin: 50px 150px;
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
    .ltitle {
      background-color: #f5f5f5;
      height: 100px;
      padding: 50px 100px;
      .inline-input {
        width: 90%;
        height: 45px;
        line-height: 40px;
        border-radius: 25px;
        .el-input__icon {
          height: 50%;
          width: 40px;
        }
        .el-input__icon:hover {
          transform: scale(1.4);
        }
      }
    }
    .selected {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 100px;
      height: 100px;
      background-color: #f5f5f5;
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
          overflow-y: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            line-height: 30px;
            font-size: 30px;
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