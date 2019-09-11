<!-- 我的图片 -->
<template>
  <div class="myphoto-container">
    <div class="row" v-for="(rows,index) in rowLists" :key="index">
      <!-- 每一张图片区域 -->
      <div class="photoInfo" v-for="(img,index) in rows" :key="index">
        <!-- 图片 -->
        <div class="img-box">
          <router-link :to="{name: 'photoInfo',params:img}">
            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img :src="img.src[0]" style="height:320px;">
              <div id="zhezhao">
                <span id="photo-num">{{img.src.length}}张</span>
                <br>
                <span id="argue-num">{{img.arguelength}}评论</span>&nbsp;
                <span id="argue-num">{{img.read}}浏览量</span>&nbsp;
                <span id="like-num">{{img.belike}}喜欢</span>
              </div>
            </el-card>
          </router-link>
        </div>
      </div>
    </div>
    <div class="more" style="text-align:center;margin-top:20px;">
      <el-button type="info">加载更多</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rowLists: []
    };
  },
  created() {
  },
  mounted: function() {
    this.changeRow();
  },
  computed: {
    imgLists() {
      return this.$store.state.Query.queryPhoto;
    }
  },

  methods: {

    changeRow() {
      var rowNum = parseInt(Math.ceil(this.imgLists.length / 4));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 4;
        var end = start + 4;
        this.rowLists.push(this.imgLists.slice(start, end));
      }
      return;
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
      overflow: hidden;
      z-index: 0;
      #zhezhao {
        position: absolute;
        z-index: -1;
        top: 0;
        width: 100%;
        height: 320px;
        background-color: #fff;
        color: #fff;
        padding: 20px;
        #argue-num {
          line-height: 50px;
        }
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