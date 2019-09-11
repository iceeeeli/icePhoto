<template>
  <div class="main-home-container">
    <!-- 导航栏 -->
    <el-row class="nav">
      <el-col :span="16">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="black"
          active-text-color="#ffd04b"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose"
          menu-trigger="hover"
        >
          <el-menu-item>
            <img src="img/icon.jpg" alt style="width:50px;">
          </el-menu-item>
          <el-menu-item index="/home/homeIndex">首页</el-menu-item>
          <el-menu-item index="/home/homemain">社区</el-menu-item>
          <el-menu-item index="/home/focus" v-if="iflogin">关注</el-menu-item>
          <el-menu-item index="/home/activity">活动</el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <router-link to="/home/find" tag="li">
                <i class="el-icon-location"></i>
                <span>发现</span>
              </router-link>
            </template>
            <el-menu-item index="/home/find/tabs">标签</el-menu-item>
            <el-menu-item index="/home/find/photographer">摄影师</el-menu-item>
            <el-menu-item index="/home/find/teach">教程</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <router-link to="/home/group" tag="li">
                <i class="el-icon-location"></i>
                <span>交流</span>
              </router-link>
            </template>
            <el-menu-item index="/home/talk">论坛</el-menu-item>
            <el-menu-item index="/home/group">小组</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <router-link to="/home/vip" tag="li">
                <i class="el-icon-location"></i>
                <span>更多</span>
              </router-link>
            </template>
            <el-menu-item index="/home/vip">供稿</el-menu-item>
            <el-menu-item index="/home/problem">意见反馈</el-menu-item>
            <el-menu-item index="/home/about">关于我们</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="3" id="query-box">
        <!-- <el-input size="small" placeholder="请输入内容" v-if="showquery" v-model="inputinfo"></el-input> -->
        <el-input class="inline-input" v-model="inputinfo" placeholder="请输入关键字" v-if="showquery">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="query"></i>
        </el-input>
        <el-button
          icon="el-icon-search"
          circle
          v-else
          @click.prevent="showquery=true"
          style="float:right;"
        ></el-button>
      </el-col>
      <!-- 登录按钮，登录后切换成个人信息 -->
      <el-col :span="5" v-if="iflogin">
        <personal-info></personal-info>
      </el-col>
      <el-col :span="4" :offset="1" id="login-register" v-else>
        <el-button @click.prevent="show">登录</el-button>
        <el-button type="warning" @click="toreg">注册</el-button>
      </el-col>
    </el-row>
    <!-- 内容区域 -->
    <el-row class="main-container">
      <el-col :span="24">
        <router-view></router-view>
      </el-col>
      <to-top></to-top>
    </el-row>
    <!-- 底部区域 -->
    <el-col :span="24" class="footer" v-if="showfoot">
      <footer-info></footer-info>
    </el-col>
    <!-- 登录弹框 -->
    <el-dialog class="dialog" :visible.sync="login" width="30%">
      <span slot="title" class="dialog-title">
        <span id="titl">登录</span>&nbsp;
        <span id="torestiger">
          还没有账号，
          <a href="#" @click="toreg">去注册</a>
        </span>
      </span>
      <div class="dialog-body">
        <el-form label-width="50px" :model="form" :rules="rules">
          <el-form-item label="登录" prop="name">
            <el-input autocomplete="off" v-model="form.name" placeholder="请输入账号，手机号或邮箱"></el-input>
            <span>请输入账号，手机号或邮箱</span>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input autocomplete="off" v-model="form.pass" show-password placeholder="请输入正确密码"></el-input>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <button
          class="mui-btn mui-btn-warning mui-btn-outlined"
          style="width:100%;height:50px;font-size:20px;letter-spacing:5px; "
          @click.prevent="login2"
        >登录</button>
      </span>
    </el-dialog>
    <!-- 注册弹框 -->
    <el-dialog class="dialog" :visible.sync="register" width="30%">
      <span slot="title" class="dialog-title">
        <span id="titl">注册</span>&nbsp;
        <span id="torestiger">
          已有账号，
          <a href="#" @click="tolog">去登录</a>
        </span>
      </span>
      <div class="dialog-body">
        <el-form label-width="80px" :model="registform" :rules="rules">
          <el-form-item label="登录" prop="name">
            <el-input autocomplete="off" v-model="registform.name" placeholder="请输入账号，手机号或邮箱"></el-input>
            <span>请输入账号，手机号或邮箱</span>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              autocomplete="off"
              v-model="registform.pass"
              show-password
              placeholder="请输入正确密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pass">
            <el-input
              autocomplete="off"
              v-model="registform.repass"
              show-password
              placeholder="请输入正确密码"
            ></el-input>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button
          class="mui-btn mui-btn-warning mui-btn-outlined"
          style="width:100%;height:50px;font-size:20px;letter-spacing:5px; "
          @click.prevent="register2"
        >注册</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalInfo from "@/subcomponents/personalinfo.vue";
import FooterInfo from "@/subcomponents/footer.vue";
import ToTop from "@/subcomponents/toTop.vue";
import MyButton from "@/components/photoInfo/myButton.vue";
// import {mapActions, mapState,mapGetters} from 'vuex'
export default {
  data() {
    return {
      activeIndex: "1",
      tabPosition: "top",
      inputinfo: "",
      showquery: false,
      focus: false,
      login: false,
      register: false,
      checked: true,
      users: "",
      form: {
        name: "",
        pass: ""
      },
      registform: {
        name: "",
        pass: "",
        repass: ""
      },
      result: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入账号，手机号或邮箱",
            trigger: "blur"
          },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入正确密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 58个字符", trigger: "blur" }
        ]
      }
    };
  },
  
  computed: {
    showfoot() {
      return this.$store.state.showfoot;
    },
    iflogin() {
      return this.$store.state.login;
    },
    usermess() {
      return this.$store.state.Userlists.otherUserMess;
    },
  },
  watch: {
    $route(to, from) {
      console.log(to);
      if (
        to.name == "sendindex" ||
        to.name == "sendphoto" ||
        to.name == "sendart"
      ) {
        this.$store.commit("hidefoot");
      } else {
        this.$store.commit("showfoot");
      }
    }
  },
  created() {
    this.getMyNotices();
  },
  mounted: function() {
    this.login_();
  },
  methods: {
    getMyNotices() {
      var username = localStorage.getItem("localuser");
      this.$store.commit("getMyNotices", username);
    },
    getMyMess(userid) {
        this.$store.commit("getMyMess", userid);
    },
    handleSelect(key, keyPath) {},
    show() {
      this.login = true;
    },
    login2() {
      this.$axios
        .get(
          "/api/users/login?username=" +
            this.form.name +
            "&password=" +
            this.form.pass
        )
        .then(res => {
          var user = res.data[0];
          user.touxiang = "img/unlogin.svg";
          if (res.data.length == 1) {
            this.result = res.data;
            this.getMyMess(res.data[0].userid)
            if(this.usermess.touxaing!="img/unlogin.svg"){
              localStorage.setItem("usertouxiang", this.usermess.touxaing);
            }
            localStorage.setItem("localuser", this.form.name);
            localStorage.setItem("userid", res.data[0].userid);
            this.$store.commit("usermessage", user);
            this.login = false;
            this.login_();
          } else {
            alert("未发现该账号");
            this.result = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    login_() {
      if (localStorage.hasOwnProperty("localuser")) {
        this.$store.commit("login");
      } else {
        this.$store.commit("logout");
      }
    },
    register2() {
      this.$axios
        .get(
          "/api/users/register?username=" +
            this.registform.name +
            "&password=" +
            this.registform.pass
        )
        .then(res => {
          var user = res.data;
          user.touxiang = "img/unlogin.svg";
          this.$store.commit('createUser',user)
          if (res.data.userid != null) {
            this.result = res.data;
            localStorage.setItem("localuser", user.username);
            localStorage.setItem("usertouxiang", user.touxiang);
            localStorage.setItem("userid", user.userid);
            this.$store.commit("usermessage", user);
            this.register = false;
            this.login_();
          } else {
            this.result = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tolog() {
      this.register = false;
      this.login = true;
    },
    toreg() {
      this.login = false;
      this.register = true;
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    query() {
      var query = this.inputinfo;
      if (query.trim().length == 0) {
        this.$message({
          message: "请输入搜索内容！",
          type: "warning"
        });
      } else {
        this.$store.commit("getInfo", query);
        this.$router.push({ name: "queryIndex" });
        this.inputinfo=''
      }
    }
  },
  components: {
    PersonalInfo,
    FooterInfo,
    ToTop,
    MyButton
  }
};
</script>

 <style lang="scss" scoped>
.main-home-container {
  margin-top: 66px;
  .el-submenu {
    overflow: hidden;
  }
  .nav {
    width: 100%;
    position: fixed;
    top: 0;
    padding-bottom: 0;
    z-index: 5000;
    font-size: 18px;
    letter-spacing: 1.5px;
    font-weight: bold;
    border-bottom: solid 1px #e6e6e6;
    background-color: #fff;

    .el-menu-demo {
      border-bottom: solid 1px #fff;
      height: 66px;
    }
    #query-box {
      padding-top: 13px;
      .inline-input {
        width: 90%;
        height: 45px;
        line-height: 40px;
        border-radius: 25px;
        .el-input__icon {
          height: 50%;
          width: 40px;
        }
        .el-input__icon:hover {
          transform: scale(1.4);
        }
      }
      .el-input-group__append {
        background-color: #fff;
      }
    }
    #login-register {
      padding-top: 10px;
    }
  }
  .dialog {
    .dialog-title {
      display: flex;
      justify-content: space-between;
      #titl {
        margin-left: 10px;
        font-size: 20px;
        letter-spacing: 2px;
        font-weight: bold;
      }
      #torestiger {
        margin-right: 30px;
        font-size: 16px;
        letter-spacing: 1.5px;
      }
    }
    .el-dialog__body {
      padding-bottom: 0;
    }
    .dialog-body {
      padding-bottom: 0;
    }
    button:hover {
      background-color: rgb(255, 196, 0);
      color: #fff;
    }
  }
}
</style>

