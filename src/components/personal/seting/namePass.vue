<!-- 账号与密码 -->
<template>
  <div class="name-pass">
      <el-card shadow="always" :body-style="{ padding: '0px' }" class="base">
      <div class="left">
          <span id="base-title">账号</span>
        <el-form ref="form" :model="callform" label-width="100px" class="base-form">
          <el-form-item label="用户名">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="Email地址">
            <el-input v-model="form.email" ></el-input>
          </el-form-item>
          <el-form-item>
    <el-button type="warning" @click="submit">保存</el-button>
   
  </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '0px' }" class="base">
      <div class="left">
          <span id="base-title">密码</span>
        <el-form ref="form" :model="callform" label-width="100px" class="base-form">
          <el-form-item label="原密码">
            <el-input v-model="form.oldpass" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newpass" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="form.renewpass" show-password></el-input>
          </el-form-item>
          <el-form-item>
    <el-button type="warning" @click="logout">保存</el-button>
   
  </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form:{
        name: "",
        email: "",
        oldpass: "",
        newpass: "",
        renewpass: "" 
      }
    };
  },
  computed: {
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    },
  },
  created() {
    this.getMyMess();
    this.info()
  },

  methods: {
     getMyMess() {
      this.userid = localStorage.getItem("userid");
      this.$store.commit("getUserMess", this.userid);
    },
    info(){
      this.form.name=this.usermess.username
      this.form.email=this.usermess.email
    },
    submit(){
      this.$notify({
        title: "成功",
        message: "修改资料成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    logout(){
      this.$notify({
        title: "成功",
        message: "修改密码成功，请重新登录",
        type: "success",
        offset: 80,
        duration: 1500
      });
       localStorage.removeItem("localuser")
         this.$store.commit('logout');
          this.$router.push('/home/homeIndex')
    }
  }
}

</script>
<style lang='scss' scoped>
.name-pass{
  margin: 20px 200px;
  .base {
    position: relative;
    margin-top:50px;
    .left {
      width: 50%;
      padding:50px;
      #base-title{
          font-size:30px;
          font-weight: bold;
          letter-spacing: 3px;
      }
      .base-form{
          margin-top:50px;
      }
    }
  }
}
</style>