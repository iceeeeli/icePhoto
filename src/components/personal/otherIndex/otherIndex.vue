<!-- 个人中心 -->
<template>
  <div>
    <div class="header" ref="header">
      <div class="left">
        <div class="face">
          <img src="img/vip_line_MT_UI_Mk2.svg" alt="" width="70px" class="vip" v-if="usermess.ifvip=='VIP'">
          <img :src="usermess.touxaing" alt width="150px" height="150px">
        </div>

        <div class="mymess">
          <span id="name">{{usermess.username}}</span>
          <br>
          <span id="place">
            坐标：{{usermess.city}} &nbsp;&nbsp;
            <router-link style="color:#fff;" to="/home/myIndex/myfocus">关注：</router-link>
            {{usermess.myfocus.length}}人 &nbsp;&nbsp;
            <router-link style="color:#fff;" to="/home/myIndex/myfans">粉丝：</router-link>
            {{usermess.myfans.length}}人
          </span>
          <br>
          <span id="sign">{{usermess.intro}}</span>
        </div>
      </div>
    </div>
    <el-row class="tagNav">
      <el-col :span="12" :offset="8">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          text-color="black"
          active-text-color="#303133"
        >
          <el-menu-item
            v-for="title in titles"
            :key="title.id"
            :index="title.name"
          >{{title.Tagname}}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
      <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-input
  type="textarea"
  :rows="4"
  :placeholder="placeholder"
  v-model="textarea"
  width="100%">
</el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendSixin">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid:null,
      local: true,
      get:this.$route.params.id,
      titles: [
        { Tagname: "图片", id: 1, name: "/home/otherIndex/otherphoto" },
        { Tagname: "文章", id: 2, name: "/home/otherIndex/otherart" },
        { Tagname: "活动", id: 3, name: "/home/otherIndex/otheract" },
        { Tagname: "喜欢", id: 4, name: "/home/otherIndex/otherlike" },
        { Tagname: "收藏", id: 5, name: "/home/otherIndex/otherhidd" },
        { Tagname: "关注", id: 6, name: "/home/otherIndex/otherfocus" },
        { Tagname: "粉丝", id: 7, name: "/home/otherIndex/otherfans" }
      ],
      centerDialogVisible:false,
      placeholder:'',
      textarea:''
    };
  },
  computed: {
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    },
    sixin(){
      return this.$store.state.Userlists.sixin
    },
  },
  created() {
     this.ifSixin()
       console.log("zzdcsc")
       console.log(this.sixin)
  },
  mounted() {
    this.$refs.header.style.backgroundImage =
      "url(" + this.usermess.bcgphoto + ")";
  },
  watch:{
    $route(to,from){
      if(from.path=="/home/myIndex/myfocus"||from.path=="/home/myIndex/myfans"){
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file, fileList) {
      this.$refs.header.style.backgroundImage = "url(" + res.data + ")";
      var id=this.userid
      this.$store.commit('updateBcg',{id:id,photo:res.data})
      this.$notify({
        title: "成功",
        message: "编辑封面成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
  ifSixin(){
      if(this.sixin!=null){
        this.centerDialogVisible=true
        this.placeholder="私信@"+this.sixin.toid
      }
    },
    sendSixin(){
      if(this.textarea.trim().length===0){
        this.$message({
          message:'请输入私信内容',
          type:'warning'
        })
      }else{
        var m=this.sixin
        var n={creatime:'',fromid:'',toid:'',content:'',intro:'',type:'私信',ifread:false}
        n.creatime=m.creatime
        var username=n.fromid=m.fromid=localStorage.getItem('localuser')
        n.intro=n.fromid+"给您发了私信"
        n.content=m.content=this.textarea
        var toid=n.toid =this.sixin.toid
        this.$store.commit('sendSixin',{toid:toid,mess:m})
        this.$store.commit('sendSixinNotice',n)
        this.$store.commit('getMySystemNotices1',username)
        this.centerDialogVisible = false
        this.$store.commit('clearSixin')
        this.$message({
          message:'发送成功！',
          type:'success'
        })
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  background-image: url("../../../images/4.png");
  background-position: fixed;
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: 400px;
  .left {
    position: absolute;
    top: 200px;
    left: 80px;
    overflow: hidden;
    .face {
      float: left;
      width: 180px;
      .vip{
        position: absolute;
        left:112px;
        bottom: 85px;
        transform:rotate(9deg);
      }
      img {
        border-radius: 50%;
      }
    }
    .mymess {
      margin-left: 200px;
      #name {
        line-height: 50px;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 3px;
        color: #fff;
      }
      #place {
        line-height: 50px;
        font-size: 20px;
        letter-spacing: 3px;
        color: #fff;
      }
      #sign {
        line-height: 50px;
        font-size: 20px;
        letter-spacing: 3px;
        color: #fff;
      }
    }
  }
  .right {
    color: #fff;
    position: absolute;
    right: 50px;
    top: 330px;
    .updatebcg {
      color: #eee;
    }
    .updatebcg:hover {
      cursor: pointer;
    }
  }
}
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
</style>