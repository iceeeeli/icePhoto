<!-- 首页 -->
<template>
  <div class="home-index-container">
    <!-- 头部 -->
    <div class="header">
      <div id="zhe">
            <span>优质摄影师交流平台</span><br>
              <router-link to="/home/vip">
            <button type="button" class="mui-btn mui-btn-warning" style="border: 3px solid #f0ad4e;">
        <span style="font-size:30px;letter-spacing:2px;font-weight:bold;">
        马上加入</span></button></router-link>
                  
      </div>

    </div>
    <!-- 推荐图片 -->
    <div class="tuijian">
      <span style="font-size:20px; letter-space:1.25px;font-weight:bold;">更多优质摄影师作品都在ICE摄影网</span>
      <br>
      <br>
      <span>在这里，发现基于共同兴趣的同好；鼓励原创和分享精神；除了美好的摄影和技能，我们更在意影像背后价值观的认同。</span>
      <div class="row" v-for="(rows,index) in rowLists" :key="index">
        <!-- 每一张图片区域 -->
        <div class="photoInfo" v-for="(img,index) in rows" :key="index">
          <!-- 图片 -->
          <div class="img-box">
            <router-link :to="{name: 'photoInfo',params:img}">
              <el-card shadow="always" :body-style="{ padding: '0px' }">
                <img :src="img.src[0]" style="height:320px;">
                <div id="zhezhao">
                  <img
                    :src="img.author"
                    alt
                    style="width:40px;margin-top:230px;border-radius:50%;background-color: #fff;"
                  >
                </div>
              </el-card>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动 -->
    <div class="activity">
      <span
        style="font-size:20px; letter-space:1.25px;font-weight:bold;"
      >全年超过百万奖金的活动和大赛，好照片不再寂寞······</span>
      <br>
      <br>
      <span>展示摄影作品，找到志趣相同的伙伴；上传视频；学习摄影；参与比赛赢取奖金；成为图库签约摄影师。</span>
      <div class="actrow" v-for="(rows,index) in actrows" :key="index">
        <!-- 每一张图片区域 -->
        <div class="actInfo" v-for="(act,index) in rows" :key="index">
          <!-- 图片 -->
          <div class="act-box">
           <router-link :to="{name: 'actinfo',params:act}">
              <el-card shadow="always" :body-style="{ padding: '0px' }">
                <div class="card" style=" height:280px; width: 400px;">
                  <act-card :actinfo="act"></act-card>
                </div>
              </el-card>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 供稿 -->
    <div class="gonggao">
        <span id="go" style="">供稿</span>  
        <router-link to="/home/vip">
      <button type="button" class="mui-btn mui-btn-warning" style="border: 3px solid #f0ad4e;">
        <span style="font-size:30px;letter-spacing:2px;font-weight:bold;">
        进入<i class="mui-icon mui-icon-arrowright" ></i></span></button>
        </router-link><br><br>
        <span style="color:white;">在ICE摄影网分享照片可同时赚取收益</span>
        <br><br>
        <icon-con></icon-con>
        
    </div>
    <!-- 合作商家 -->
    <div class="cooper" style="text-align:center;margin:30px 30px;">
      <span style="font-size:20px; color:#909399; letter-spacing:3px;">合作品牌</span><br>
      <img src="@/images/icon.jpg" alt="" height="60px" style="margin:70px 0;">
    </div>
  </div>
</template>

<script>
import ActCard from "@/subcomponents/actCard.vue";
import IconCon from "@/subcomponents/gongGaoIcon.vue";
export default {
  data() {
    return {
      rowLists: [],
      // actLists: [
      //   {
      //     id: 1
      //   },
      //   {
      //     id: 2
      //   },

      //   {
      //     id: 3
      //   },

      //   {
      //     id: 4
      //   },

      //   {
      //     id: 5
      //   },
      //   {
      //     id: 6
      //   }
      // ],
      actrows: []
    };
  },
  components: {
    ActCard,
    IconCon
  },
  computed:{
    imgLists(){
      return this.$store.state.imgLists
    },
    actLists(){
      return this.$store.state.actLists.slice(0,6)
    }
  },
  mounted: function() {
    this.changeRow();
    this.changeAct();
  },

  methods: {
    changeRow() {
      var rowNum = parseInt(Math.ceil(this.imgLists.length / 4));
      if(rowNum>3){
        rowNum=2
      }
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 4;
        var end = start + 4;
        this.rowLists.push(this.imgLists.slice(start, end));
      }
      return;
    },
    changeAct() {
      var acrowNum = parseInt(Math.ceil(this.actLists.length / 3));
      var n = 0;
      for (var i = 0; i < acrowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.actrows.push(this.actLists.slice(start, end));
      }
      return;
    }
  }
};
</script>
<style lang='scss' scoped>
.home-index-container {
  .header {
    height: 500px;
    background-image: url("../../images/3.jpg");
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: fixed;
    position: relative;
        overflow: hidden;
        z-index: 0;
     #zhe {
          position: absolute;
          z-index: -1;
          top: 0;
          width: 100%;
          height: 500px;
          background-color: rgba(0, 0, 0, 0.3);
          text-align: center;
         padding:150px 0;
         span{
           font-size: 50px;
           color:white;
           letter-spacing: 10px;
         }
         button{
           margin-left:20px;
           margin-top:80px;
         }
        }
  }

  .tuijian {
    width: 1320px;
    margin:50px auto;
    text-align: center;
    min-width: 1300px;
    overflow: hidden;
    span {
      font-size: 16px;
      letter-spacing: 1.5px;
    }
    .row {
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
  .activity {
    margin: 100px 100px;
    text-align: center;
    span {
      font-size: 16px;
      letter-spacing: 1.5px;
    }
    .actrow {
      display: flex;
      justify-content: space-between;
      margin: 50px 10px 0 10px;
    }
  }
  .gonggao {   
    background-image: url("../../images/gonggao.png");
    background-repeat: no-repeat;
    background-size:100% auto;
    height: 500px;
    padding:60px 120px;
    margin-bottom:100px;
    #go{
      font-size:50px;
      letter-spacing:2px;
      font-weight:bold;
       color:white; 
       line-height:60px;
       padding-right:20px;
    }
  }
}
</style>