<!-- 我的喜欢 -->
<template>
  <div class="myphoto-container">
    <div class="row" v-for="(rows,index) in rowLists" :key="index">
      <!-- 每一张图片区域 -->
      <div class="photoInfo" v-for="(img,index) in rows" :key="index">
        <!-- 图片 -->
        <div class="img-box">
          <el-card shadow="always" :body-style="{ padding: '0px' }">
            <img :src="img.src[0]" style="height:320px;" @click="toinfo(img.id)">
            <div id="zhezhao">
              <div class="top">
                <img
                  src="@/images/icon.jpg"
                  alt
                  width="50px"
                  height="50px"
                  style="border-radius:50%;"
                >
                <br>
                <span class="title">{{img.title}}</span>
              </div>

              <div class="bottom">
                <span id="photo-num">{{img.name}}</span>
                <br>
                <span id="argue-num">{{img.arguelength}}评论</span>&nbsp;
                <span id="like-num">{{img.belike}}喜欢</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="more" style="text-align:center;margin-top:20px;">
      <el-button type="info" v-if="more" @click="more=!more">加载更多</el-button>
      <span v-else>没有更多了~~</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imglists: [
        {
          src: require("../../../images/1.png"),
          id: 1
        },
        {
          src: require("../../../images/2.png"),
          id: 2
        },
        {
          src: require("../../../images/3.png"),
          id: 3
        },
        {
          src: require("../../../images/2.png"),
          id: 4
        },
        {
          src: require("../../../images/1.png"),
          id: 5
        },
        {
          src: require("../../../images/3.png"),
          id: 6
        },
        {
          src: require("../../../images/2.png"),
          id: 7
        },
        {
          src: require("../../../images/1.png"),
          id: 8
        }
      ],
      rowLists: [],
      more: true
    };
  },
  computed: {
    imgLists() {
      return this.$store.state.Userlists.oneUserMess.mylike;
    }
  },
  mounted: function() {
    this.changeRow();
  },

  methods: {
    changeRow() {
      var rowNum = parseInt(Math.ceil(this.imgLists.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.rowLists.push(this.imgLists.slice(start, end));
      }
      return;
    },
    toinfo(id) {
      this.imgLists.some(el => {
        if (el.id == id) {
          if (el.art) {
            this.$router.push({ name: "talkcon", params:{art:el} });
          } else {
            this.$router.push({ name: "photoInfo", params: el });
            return;
          }
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.myphoto-container {
  margin: 50px 100px;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 50px 10px 0 10px;

    .img-box {
      position: relative;
      z-index: 0;
      img {
        cursor: pointer;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.4);
      }
      #zhezhao {
        position: absolute;
        z-index: 0;
        bottom: 0;
        width: 100%;
        height: 80px;
        background-color: #fff;
        color: #606266;
        .top {
          display: flex;
          .title {
            font-size: 20px;
            color: black;
            line-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .bottom {
          display: flex;
          span {
            margin-left: 13px;
            font-size: 16px;
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>