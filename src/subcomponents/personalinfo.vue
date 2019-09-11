<template>
  <div class="per-info">

    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="black"
      active-text-color="#ffd04b"
      :unique-opened=true
      @open="handleOpen"
      @close="handleClose"
      menu-trigger="hover"
    >
      <el-submenu index="2">
        <template slot="title">

          <router-link
            :to="'/home/myIndex'"
            tag="li"
          >
            <!-- <img :src="user[0].touxiang" alt="" width="30px" style="margin-right:5px;"> -->
            <img :src="usermess.touxaing" alt="" width="30px" style="margin-right:5px;">
            <!-- <span>{{user[0].username}}</span> -->
             <span>{{usermess.username}}</span>
          </router-link>
        </template>

        <el-menu-item index="/home/myIndex">我的主页</el-menu-item>
        <el-menu-item index="/home/group">我的小组</el-menu-item>
        <el-menu-item index="/home/myIndex/mylike">我的喜欢</el-menu-item>
        <el-menu-item index="/home/myIndex/myfocus">我的关注</el-menu-item>
        <el-menu-item index="/home/vip">申请认证</el-menu-item>
        <el-menu-item index="/home/setmess">设置</el-menu-item>
        <el-menu-item index="/home/homemain" @click="logout">退出</el-menu-item>

      </el-submenu>

      <el-submenu
        index="/home/mess/hudong/argue"
        class="message"
      >
        <template slot="title">
          <router-link
            to="/home/mess/hudong/argue"
            tag="li"
          >
            <span class="mui-icon mui-icon-email">
              <span class="mui-badge mui-badge-danger" v-if="allnoticenum!=0" >{{allnoticenum}}</span></span>
          </router-link>
        </template>

        <el-menu-item-group>

          <el-menu-item index="/home/mess/hudong/argue">评论<span
              class="mui-badge mui-badge-danger"
              style="float:right; margin-top:10px;" v-if="arguenoticenum!=0"
            >{{arguenoticenum}}</span></el-menu-item>
          <el-menu-item index="/home/mess/hudong/like">喜欢<span
              class="mui-badge mui-badge-danger"
              style="float:right; margin-top:10px;" v-if="likenoticenum!=0"
            >{{likenoticenum}}</span></el-menu-item>
          <el-menu-item index="/home/mess/hudong/support">支持<span
              class="mui-badge mui-badge-danger"
              style="float:right; margin-top:10px;" v-if="supportnoticenum!=0"
            >{{supportnoticenum}}</span></el-menu-item>
          <el-menu-item index="/home/mess/hudong/hidd">收藏<span
              class="mui-badge mui-badge-danger"
              style="float:right; margin-top:10px;" v-if="hideenoticenum!=0"
            >{{hideenoticenum}}</span></el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">——— 系统 ———</template>
          <el-menu-item index="/home/mess/system/sixin">私信<span
              class="mui-badge mui-badge-danger"
              style="float:right; margin-top:10px;" v-if="sixinnoticenum!=0"
            >{{sixinnoticenum}}</span></el-menu-item>
          <el-menu-item index="/home/mess/system/notice">通知<span
              class="mui-badge mui-badge-danger"
              style="float:right; margin-top:10px;" v-if="noticenum!=0"
            >{{noticenum}}</span></el-menu-item>

        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="4">
        <template slot="title">

          <router-link
            to="/home/sendindex/sendphoto"
            tag="li"
          >
            <el-button
              type="warning"
              round
            >发布</el-button>
          </router-link>
        </template>

        <el-menu-item index="/home/sendindex/sendphoto">发照片</el-menu-item>
        <el-menu-item index="/home/sendindex/sendart">发文章</el-menu-item>

      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid:''
    };
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    arguenoticenum(){
      return this.$store.state.Notice.mynotices1.length.argue
    },
    likenoticenum(){
      return this.$store.state.Notice.mynotices1.length.like
    },
    supportnoticenum(){
      return this.$store.state.Notice.mynotices1.length.support
    },
    hideenoticenum(){
      return this.$store.state.Notice.mynotices1.length.hide
    },
    sixinnoticenum(){
      return this.$store.state.Notice.mynotices1.length.sixin
    },
    noticenum(){
      return this.$store.state.Notice.mynotices1.length.notice
    },
    // noticenum1(){
    //   return this.$store.state.Notice.mynotices1.system.Notice.length--
    // },
    allnoticenum(){
      return this.arguenoticenum+this.likenoticenum+this.supportnoticenum+this.hideenoticenum+this.sixinnoticenum+this.noticenum
    },
    usermess() {
      return this.$store.state.Userlists.otherUserMess;
    },
  },
  created(){
    this.getMyMess()
    this.shownum()
  },
  mounted(){
    var username=localStorage.getItem('localuser')
    this.$store.commit('getMySystemNotices1',username)
    
  },
  methods: {
       getMyMess() {
      this.userid = localStorage.getItem("userid");
        this.$store.commit("getMyMess", this.userid);
    },
    shownum(){
      if(this.allnoticenum>0){
        this.ifall=true
      }
      if(this.arguenoticenum>0){
        this.ifargue=true
      }
      if(this.likenoticenum>0){
        this.iflike=true
      }
      if(this.supportnoticenum>0){
        this.ifsupport=true
      }
      if(this.hideenoticenum>0){
        this.ifhide=true
      }
      if(this.sixinnoticenum>0){
        this.ifsixin=true
      }
      if(this.noticenum>0){
        this.ifnotice=true
      }
   
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
   
    },
    logout(){
       this.$confirm('您将退出本平台, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem("localuser")
         this.$store.commit('logout');
          this.$router.push('/home/homeIndex')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.per-info {
  height: 66px;
  
   .el-submenu{
      overflow: hidden;
    }
  .el-menu-demo {
    border-bottom: solid 1px #fff;
    height: 66px;

    .mui-icon .mui-badge {
      top: 5px;
      margin-left: -15px;
    }
    .message {
      padding: 0 10px;
    }
  }
}
</style>

