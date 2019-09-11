<!-- 供稿 -->
<template>
  <div class="vip-container">
    <div class="header">
      <div id="zhe">
            <span>ICE摄影签约</span><br>
              <button type="button" class="mui-btn mui-btn-warning" style="border: 3px solid #f0ad4e;" @click="ifvip">
        <span style="font-size:30px;letter-spacing:2px;font-weight:bold;">
        马上申请</span></button>
          
      </div>
    </div>
       <div class="gonggao">
        <span id="go" style="">供稿</span>
      <button type="button" class="mui-btn mui-btn-warning" style="border: 3px solid #f0ad4e;" @click="ifvip">
        <span style="font-size:30px;letter-spacing:2px;font-weight:bold;">
        申请<i class="mui-icon mui-icon-arrowright" ></i></span></button><br><br>
        <span style="color:white;">在ICE摄影网分享照片可同时赚取收益</span>
        <br><br>
        <icon-con></icon-con>
    </div>
  </div>
</template>

<script>
import IconCon from "@/subcomponents/gongGaoIcon.vue";
export default {
  data () {
    return {
    };
  },
  components:{IconCon},
    computed: {
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    },

  },
  created() {
    this.getMyMess();
  },
  methods: {
    getMyMess() {
      this.userid = localStorage.getItem("userid");
        this.$store.commit("getUserMess", this.userid);
    },
    ifvip(){
      if(this.usermess.ifvip=="VIP"){
        this.$message({
          message:"您已经是签约用户了",
          type:'warning'
        })
      }else{
        this.$router.push("/home/vipform")
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.vip-container{
    .header {
    height: 500px;
    background-image: url("../../images/about1.jpg");
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
  .gonggao {   
    // background-image: url("../../images/about1.jpg");
    // background-repeat: no-repeat;
    // background-size:100% auto;
    background-color: #d1c4b8;
    height: 500px;
    padding:60px 120px;
   
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