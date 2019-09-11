<!--设置 -->
<template>
  <div class="seting">
    <el-card shadow="always" :body-style="{ padding: '0px' }" class="base">
    <div class="like">
<span id="base-title">偏好</span><br>
 <el-switch
  v-model="checked1"
  @change="getNotice"
  >
</el-switch>
<span id="like-title">系统通知提醒</span><br>
<span id="like-con">当系统发布通知时，信息栏显示提醒</span><br><br>
<el-switch
  v-model="checked2"
  @change="getNotice1"
  >
</el-switch>
<span  id="like-title">关注提醒</span><br>
<span id="like-con">当有人关注我时，信息栏显示提醒</span><br>
    </div>
    <div class="upload">
<span id="base-title">下载功能</span><br>
<el-switch
  v-model="checked3"
  @change="focusUpload"
  >
</el-switch>
<span id="like-title">关注后下载</span><br>
<span id="like-con">您的粉丝可下载你的任意图片作品</span><br><br>
<el-switch
  v-model="checked4"
  @change="moneyUpload"
  >
</el-switch>
<span  id="like-title">打赏下载</span><br>
<span id="like-con">用户付费后可下载您的这一图片作品</span><br> 
    </div>
    </el-card>
      
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked1:true,
      checked2:true,
      checked3:true,
      checked4:true,
    };
  },
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
    getNotice(val){
      if(val){
        this.$store.commit('getNotice',this.userid)
      }else{
        this.$store.commit('getNotice',this.userid)
      }
    },
     getNotice1(val){
      if(val){
        this.$store.commit('getNotice',this.userid)
      }else{
        this.$store.commit('getNotice',this.userid)
      }
    },
    moneyUpload(val){
       this.$store.commit('moneyUpload',this.userid)
    },
    focusUpload(val){
      this.$store.commit('focusUpload',this.userid)
    }
    }
}

</script>
<style lang='scss' scoped>
.seting{
  margin: 20px 200px;
  .base{
    padding:50px;
     #base-title{
          font-size:30px;
          font-weight: bold;
          letter-spacing: 3px;
          line-height: 50px;
      }
      
        .el-switch{
          margin:20px 0;
        }
        #like-title{
          font-size: 18px;
          margin-left:20px;
          letter-spacing: 3px;
        }
        #like-con{
           font-size: 16px;
          margin-left:60px;
          letter-spacing: 3px;
        }
      
      .upload{
        margin-top:50px;
      }
  }
 
}
</style>