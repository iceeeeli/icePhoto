<!-- 作者卡片 -->
<template>
  <div class="author-card">
    <div class="bgi" ref="header">
      <img
        src="@/assets/icon1/sixin.svg"
        alt="私信"
        title="私信"
        style="width:30px;"
        id="sixin"
        @click="sendsixin"
      >
    </div>
    <div class="mess">
      <img :src="usercard.touxaing" width="60px" id="touxiang" @click="toIndex">
      <span>{{usercard.username}}</span>
      <el-button type="info" plain size="mini" @click.prevent="handleDY" v-if="iffocus">已关注</el-button>
      <el-button type="warning" plain v-else size="mini" @click.prevent="handleFC">关注</el-button>
    </div>
    <div class="fans-focus">
      <span>关注{{usercard.myfocus.length}}人</span>
      <span>/</span>
      <span>粉丝{{usercard.myfans.length}}人</span>
      <span>/</span>
      <span>{{usercard.city}}</span>
    </div>
    <br>
    <span id="sign">{{usercard.intro}}</span>
  </div>
</template>

<script>
import MyButton from "./myButton.vue";
export default {
  data() {
    return {
      iffocus: false,
      templist: null,
      userid: "",
    };
  },
  props: ["usercard"],
  computed: {
    mess() {
      return this.$store.state.Userlists.usercard;
    },
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    },
  },
  created() {
    this.userid = localStorage.getItem("userid");
 
    this.iffocus1()
  },
  mounted() {
    this.$refs.header.style.backgroundImage = "url(" + this.usercard.bcgphoto + ")";
  },
  components: {
    MyButton
  },
  methods: {
    getMess() {
    
      this.$store.commit("getUserMess", this.userid);

    },
    iffocus1(){
      this.usermess.myfocus.some(el=>{
        if(el.username==this.usercard.username){
          this.iffocus=true
        
        }
      })
      this.$emit('func',this.iffocus)
    },
    handleDY() {
      this.$alert("确认取消关注该用户？", "确认取消", {
        confirmButtonText: "确定",
        callback: action => {
          this.iffocus = false;
          var list = {
            userid: this.usercard.userid,
            username: this.usercard.username,
            focus: this.usercard.myfocus.length,
            fans: this.usercard.myfans.length--,
            city: this.usercard.city,
            intro: this.usercard.intro,
            bcg: this.usercard.bcgphoto,
            touxaing: this.usercard.touxaing,
            iffocus: false
          };
          var list1 = {
        userid: this.usermess.userid,
        username: this.usermess.username,
        focus: this.usermess.myfocus.length++,
        fans: this.usermess.myfans.length,
        city: this.usermess.city,
        intro: this.usermess.intro,
        bcg: this.usermess.bcgphoto,
        touxaing: this.usermess.touxaing,
        iffocus: false
      };
          this.iffocus = false;
           this.$emit('func',this.iffocus)
          this.$store.commit("nofocusUser", { id: this.userid, list: list,mylist:list1 });
          this.$message({
            message: "取消关注成功",
            type: "success"
          });
        }
      });
    },
    handleFC() {
      var list = {
        userid: this.usercard.userid,
        username: this.usercard.username,
        focus: this.usercard.myfocus.length,
        fans: this.usercard.myfans.length++,
        city: this.usercard.city,
        intro: this.usercard.intro,
        bcg: this.usercard.bcgphoto,
        touxaing: this.usercard.touxaing,
        iffocus: true
      };
      var list1 = {
        userid: this.usermess.userid,
        username: this.usermess.username,
        focus: this.usermess.myfocus.length++,
        fans: this.usermess.myfans.length,
        city: this.usermess.city,
        intro: this.usermess.intro,
        bcg: this.usermess.bcgphoto,
        touxaing: this.usermess.touxaing,
        iffocus: false
      };
      this.$store.commit("focusUser", { id: this.userid, list: list,mylist:list1 });
      this.iffocus = true;
       this.$emit('func',this.iffocus)
      this.$message({
        message: "关注成功",
        type: "success"
      });
    },
    sendsixin() {
      var s = { creatime: "", fromid: "", toid: "", content: "" };
      let date = new Date();
      let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
      s.creatime = strDate;
      s.fromid = localStorage.getItem("localuser");
      s.toid = this.usercard.username;
      this.$store.commit("setSixin", s);
      this.$store.commit("getUserMess", this.usercard.userid);
      this.$router.push("/home/otherIndex");
    },
    toIndex() {
      this.$store.commit("getUserMess", this.usercard.userid);
      this.$router.push({ name: "otherIndex" });
    }
  }
};
</script>
<style lang='scss' scoped>
.author-card {
  margin-bottom: 20px;
  width: 300px;
  height: auto;
  .bgi {
    height: 120px;
    background-image: url("../../images/4.png");
    background-size: 100% auto;
    background-position: fixed;

    #sixin {
      float: right;
      margin-top: 80px;
      margin-right: 10px;
      cursor: pointer;
      transition: all 0.6s;
    }
    #sixin:hover {
      transform: scale(1.4);
    }
  }
  .mess {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    margin-left: 100px;
    #touxiang {
      position: absolute;
      border-radius: 50%;
      top: 105px;
      left: 20px;
      cursor: pointer;
      transition: all 0.6s;
    }
    #touxiang:hover {
      transform: scale(1.4);
    }
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .fans-focus {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;
  }
  #sign {
    margin: 40px 10px;
  }
}
</style>