<!-- 活动卡片 -->
<template>
  <div class="act-card">
    <div class="header" ref="header"  @click="toactinfo()">
      <div class="endtime">
        <span v-if="actinfo.state=='进行中'">距离截稿还有{{days}}天</span>
        <span v-else>已截稿</span>
      </div>
    </div>
    <div class="content">
        <div class="con-title">
          <span id="title">{{actinfo.title}}</span>
          <span id="num">{{actinfo.imglists.length}}件作品</span>
        </div>
        <span id="maincon"><img src="@/assets/icon1/jiangbei.svg" alt="" 
        height="18px" style="padding-top:5px;">{{actinfo.desc}}</span>
        <button type="button" class="mui-btn mui-btn-warning" style="float:right;margin-right:5px;" v-if="actinfo.state=='进行中'" @click="toactinfo()">立即参加</button>
        <button type="button" class="mui-btn mui-btn-warning" style="float:right;margin-right:5px;" v-else disabled >已结束</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  props:['actinfo',"perIndex"],
  computed:{
    days(){
      return parseInt(Math.abs(Date.parse(this.actinfo.endtime)-Date.parse(this.actinfo.creatime)) /  1000  /  60  /  60  /24)
    }
  },
  created(){
  },
  mounted(){
    this.$refs.header.style.backgroundImage='url('+this.actinfo.photo+')';
  },
  methods: {
    toactinfo(){
      this.$router.push({name:'actinfo',params:this.actinfo})
    }
  }
}

</script>
<style lang='scss' scoped>
.act-card{
  .header{
    position: relative;
    background-image: url("../images/3.png");
    background-position: fixed;
    background-size: 100% auto;
    height: 200px;
    .endtime{
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      background: linear-gradient(to left
      , rgba(255, 136, 0, 0), rgb(255, 196, 0));
      height: 40px;
      padding: 10px 20px;
      span{
        font-size: 13px;
        letter-spacing: 1.5px;
        color: #fff;
      }
    }
  }
  .content{
    .con-title{
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      #title{
        font-size: 20px;
        letter-spacing: 2px;
      }
      #num{
        font-size: 13px;
        color:#909399;
      }
    }
    #maincon{
      font-size:14px;
      letter-spacing: 1.5px;
      float: left;
      
      margin:5px 20px;
    
    }
  }

}
</style>