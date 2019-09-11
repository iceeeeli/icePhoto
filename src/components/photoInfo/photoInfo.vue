<!-- 这是图片详情页面 -->
<template>
  <div class="photoInfo-container">
    <div class="left">
      <photo-left @photoDates="sendDate" :id="text.id" :users="usermess"></photo-left>
    </div>
    <div class="right">
      <!-- 侧边栏顶部 -->
      <div class="header">
        <img
          src="@/assets/icon1/dianzanw.svg"
          alt="点赞"
          title="点赞"
          style="width:20px;"
          v-if="text.like"
          @click.prevent="like(text.id)"
        >
        <img
          src="@/assets/icon1/dianzansucc.svg"
          alt="取消点赞"
          title="取消点赞"
          style="width:20px;"
          v-else
          @click.prevent="unlike(text.id)"
        >
        &nbsp;&nbsp;
        <img
          src="@/assets/icon1/shoucanw.svg"
          alt="收藏"
          title="收藏"
          style="width:20px;"
          v-if="text.hide"
          @click.prevent="hide(text.id)"
        >
        <img
          src="@/assets/icon1/shoucansucc.svg"
          alt="取消收藏"
          title="取消收藏"
          style="width:20px;"
          v-else
          @click.prevent="unhide(text.id)"
        >

        <el-dropdown style="padding-left: 200px;">
          <span class="el-dropdown-link">
            <img src="@/assets/icon1/menu.svg" alt="下拉菜单" title="下拉菜单" style="width:20px;">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a href="javascript:void(0)" style="color:black;" @click="dialogjubao=true">举报</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="javascript:void(0)" style="color:black;" @click="dialogblack=true">拉黑</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="main">
        <!-- 作者，关注 -->
        <div class="author">
          <div class="touxaing" style=" display: flex;">
            <el-popover
              placement="bottom"
              width="300px"
              trigger="hover"
              style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;"
            >
              <author-card :username="text.name" @func="focus"></author-card>
              <a href="#" slot="reference">
                <img
                  :src="text.author"
                  alt
                  style="width:40px;border-radius: 50%;background-color:#fff;"
                >
              </a>
            </el-popover>&nbsp;&nbsp;&nbsp;
            <div class="name-time">
              <div class="name">
                <span>{{text.name}}</span>
              </div>
              <div class="time">
                <span>{{text.creatime}}</span>
              </div>
            </div>
          </div>
          <div class="focus">
            <my-button buttonTitle="已关注" v-if="iffocus"></my-button>
            <my-button buttonTitle="关注" v-else></my-button>
          </div>
        </div>
      </div>
      <!-- 发表内容，标签，下载或购买 -->
      <div class="centent" style="    padding:10px 10px 15px 20px;">
        <span style="font-size:16px;">{{text.title}}</span>
        <br>
        <br>
        <span style="margin-top:20px; color: #fff;">{{text.content}}</span>
        <br>
        <br>
        <span v-for="(item,index) in text.tags" :key="index">
          <a style="color:#a57736;">#{{item}}</a>
        </span>
        <button
          type="button"
          class="mui-btn mui-btn-warning mui-btn-outlined hoverl"
          style="width:100%"
          @click="dialogVisible = true"
          v-if="usermess.moneyupload"
        >购买并下载</button>

        <span style="font-size:13px;" v-if="usermess.moneyupload">购买版权后可将图片用于商业或新闻用途</span>
      </div>
      <!-- 相机参数 -->
      <div class="camera-parameters" style="font-size:13px; margin:10px 20px;">
        <span>相机：{{child.Make}} {{child.Model}}</span>
        <br>
        <span>镜头：{{child.jintou}}</span>
        <br>
        <span>参数：F{{child.Fnumber}}, 1/{{child.shutspeed}}s，{{child.ISO}}</span>
      </div>
      <!-- 打赏 -->
      <div
        class="exceptional"
        style="display: flex;justify-content: space-between; margin:10px 10px 20px 20px;"
      >
        <span style="padding-top: 5px;">你的打赏是我最好的鼓励</span>
        <button
          type="button"
          class="mui-btn mui-btn-warning mui-btn-outlined hoverl"
          style="width:30%"
          @click="dialogmoney = true"
        >打赏</button>
      </div>
      <!-- 评论 -->
      <div class="argue" style="margin:10px 10px 20px 20px;">
        <argue :photoid="text.id" :arguelist="text.arguelist" :imgs="text"></argue>
      </div>
    </div>
    <!-- 举报 -->
    <el-dialog title="举 报" :visible.sync="dialogjubao" width="30%" center>
      <div style="text-align:center;">
        <h4>举报内容</h4>
        <br>
        <el-select v-model="value" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" v-if="other"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogjubao = false">取 消</el-button>
        <el-button type="primary" @click="handeleJubao">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 拉黑 -->
    <el-dialog title="拉 黑" :visible.sync="dialogblack" width="30%" center>
      <div style="text-align:center;">
        <h4>确认拉黑该用户？</h4>
        <br>
        <p>拉黑用户后将不再推荐该用户动态</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogblack = false">取 消</el-button>
        <el-button type="primary" @click="handeleBlack">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 下载弹框 -->
    <el-dialog
      title="购买并下载图片"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center
    >
      <img src="../../images/repay.jpg" alt width="200px" style="display:block;margin:0 auto;">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消 付 款</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          <a :href="text.src[0]" style="color:#fff;" download>确 认 付 款</a>
        </el-button>
      </span>
    </el-dialog>
    <!-- 打赏 -->
    <el-dialog
      title="打 赏"
      :visible.sync="dialogmoney"
      width="30%"
      :before-close="handleClose"
      center
    >
      <img src="../../images/repay.jpg" alt width="200px" style="display:block;margin:0 auto;">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogmoney = false">取 消 打 赏</el-button>
        <el-button type="primary" @click="handeleMoney">确 认 打 赏</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PhotoLeft from "./photoLeft.vue";
import MyButton from "./myButton.vue";
import Argue from "./argue.vue";
import AuthorCard from "./authorCard.vue";
export default {
  data() {
    return {
      seen: true,
      dianzan: true,
      shoucan: true,
      msg: "关注",
      dialogVisible: false,
      dialogjubao: false,
      dialogblack: false,
      dialogmoney: false,
      innerVisible: false,
      text: this.$route.params,
      options: [
        {
          value: "选项1",
          label: "上传少儿不宜作品"
        },
        {
          value: "选项2",
          label: "上传血腥暴力作品"
        },
        {
          value: "选项3",
          label: "人身攻击"
        },
        {
          value: "选项4",
          label: "抄袭他人作品"
        },
        {
          value: "选项5",
          label: "其他"
        }
      ],
      value: "",
      textarea: "",
      other: false,
      photoDates: [],
      child: {
        Make: "SONY",
        Model: "ICLE-6000",
        Fnumber: "4",
        shutspeed: "640",
        ISO: "400",
        jintou: "E 50mm F1.8 OSS",
        time: ""
      },
      iffocus: false,
      userid: ""
    };
  },
  computed: {
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log(val); //新路由信息
        console.log(oldval); //老路由信息
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.getMyMess();
    this.userid = localStorage.getItem("userid");
    // this.iffocus1(userid)
  },
  beforeDestroy() {
    this.read(this.text.id);
    this.$store.commit("clearOneGroup");
  },
  components: {
    PhotoLeft,
    MyButton,
    Argue,
    AuthorCard
  },
  methods: {
    focus(data) {
      this.iffocus = data;
    },
    getMyMess() {
      this.$store.commit("getUserMess1", this.text.name);
    },
    //  iffocus1(id){
    //   this.usermess.myfans.some(el=>{
    //     if(el.userid==id){
    //       this.iffocus=true
    //     }
    //   })
    // },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // downimg(){//点击确认付款后的下载图片事件
    //   this.$refs.down
    //   this.text.src.forEach(el => {
    //     this.$refs.down.href=el
    //     this.$refs.down.download=
    //   });

    // },
    handleChange(selVal) {
      if (selVal == "其他") {
        this.other = true;
      } else {
        this.other = false;
      }
    },
    handeleBlack() {
      this.$confirm("此操作将拉黑该用户，确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var list = {
            creatime: "",
            username: this.text.name,
            touxaing: this.text.author
          };
          var date = new Date();
          var str = date.toLocaleDateString();
          list.creatime = str;
          this.$store.commit("backUser", {
            userid: this.userid,
            list: list
          });
          this.$message({
            type: "success",
            message: "拉黑成功!"
          });
          this.$router.go(-1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消拉黑"
          });
        });
      this.dialogblack = false;
    },
    handeleJubao() {
      var advice = {
        id: "",
        creatime: "",
        fromid: "",
        toid: "system",
        title: "",
        content: "",
        ifcheck: false
      };
      let date = new Date();
      let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
      advice.id = Date.now();
      advice.creatime = strDate;
      var user = (advice.fromid = localStorage.getItem("localuser"));
      var jubaocontent = "";
      if (this.other) {
        jubaocontent = this.textarea;
      } else {
        jubaocontent = this.value;
      }
      var author = this.text.name;
      advice.title =
        "举报：" +
        author +
        "的发布的ID为" +
        this.text.id +
        "作品涉嫌违规被" +
        user +
        "用户举报";
      advice.content =
        author +
        "的发布ID为" +
        this.text.id +
        "作品因为" +
        jubaocontent +
        "原因被" +
        user +
        "用户举报，请审核举报内容信息真伪，如举报内容属实，该作品将被删除处理";
      this.$alert(
        "确认举报该动态信息？如举报内容属实，该作品将被删除处理",
        "确认举报",
        {
          confirmButtonText: "确定",
          callback: action => {
            this.$store.commit("sendAdviceFromUser", advice);
            this.dialogjubao = false;
            this.$message({
              message: "发送成功，系统将审核举报信息真伪，感谢您的监督！",
              type: "success"
            });
            this.$router.go(-1);
          }
        }
      );
    },
    handeleMoney() {
      var n = {
        creatime: "",
        fromid: "",
        toid: "",
        content: "",
        touxiang: "",
        intro: "",
        type: "支持",
        photo: "",
        cont: null
      };
      let date = new Date();
      let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
      n.creatime = strDate;
      n.fromid = localStorage.getItem("localuser");
      n.toid = this.text.name;
      n.content = "打赏了0.1元";
      n.touxiang = localStorage.getItem("usertouxiang");
      n.intro = n.fromid + "支持了您的" + this.text.title + "作品";
      n.photo = this.text.src[0];
      n.cont = this.text;
      this.$store.commit("sendSupportNotice", n);
      this.$message({
        message: "打赏成功！",
        type: "success"
      });
      this.dialogmoney = false;
    },
    sendDate(data) {
      this.child.Make = data.Make;
      this.child.Model = data.Model;
      this.child.Fnumber = data.artpure;
      this.child.shutspeed = data.shutspeed.denominator;
      this.child.ISO = data.ISO;
      this.child.time = data.time;
      this.child.jintou = data.jintou;
    },
    like(id) {
      if (this.$store.state.login) {
        var n = {
          creatime: "",
          fromid: "",
          toid: "",
          content: "",
          touxiang: "",
          intro: "",
          type: "喜欢",
          photo: "",
          cont: null
        };
        let date = new Date();
        let strDate = date
          .toLocaleString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "");
        n.creatime = strDate;
        n.fromid = localStorage.getItem("localuser");
        n.toid = this.text.name;
        n.content = "点赞";
        n.touxiang = localStorage.getItem("usertouxiang");
        n.intro = n.fromid + "点赞了您的" + this.text.title + "作品";
        n.photo = this.text.src[0];
        n.cont = this.text;
        this.$store.commit("sendSupportNotice", n);
        this.$store.commit("like", id);
      } else {
        alert("请先登录！");
      }
    },
    unlike(id) {
      this.$store.commit("unlike", id);
    },
    hide(id) {
      if (this.$store.state.login) {
        var n = {
          creatime: "",
          fromid: "",
          toid: "",
          content: "",
          touxiang: "",
          intro: "",
          type: "收藏",
          photo: "",
          cont: null
        };
        let date = new Date();
        let strDate = date
          .toLocaleString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "");
        n.creatime = strDate;
        n.fromid = localStorage.getItem("localuser");
        n.toid = this.text.name;
        n.content = "收藏";
        n.touxiang = localStorage.getItem("usertouxiang");
        n.intro = n.fromid + "收藏了您的" + this.text.title + "作品";
        n.photo = this.text.src[0];
        n.cont = this.text;
        this.$store.commit("sendSupportNotice", n);
        this.$store.commit("hide", id);
      } else {
        alert("请先登录！");
      }
    },
    unhide(id) {
      this.$store.commit("unhide", id);
    },
    read(id) {
      this.$store.commit("photoread", id);
    }
  }
};
</script>
<style lang="scss" scoped>
.photoInfo-container {
  position: relative;
  width: 100%;
  display: block;
  overflow: hidden;
  height: 753px;
  background-color: black;
  font-size: 13px;

  .left {
    position: absolute;
    top: 0;
    right: 320px;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: black;
  }
  .right {
    position: relative;
    width: 320px;
    height: 100%;
    margin-left: auto;
    overflow-y: auto;
    color: #fff;
    .header {
      position: fixed;
      top: 0;
      padding: 10px 10px;
      height: 45px;
      background-color: black;
      img {
        cursor: pointer;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.4);
      }
    }
    .main {
      margin-top: 50px;
      .author {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
        height: 75px;
        margin-bottom: 20px;
        .touxiang {
          img {
            cursor: pointer;
            transition: all 0.6s;
          }
          img:hover {
            transform: scale(1.4);
          }
        }
      }
      .content {
        button:hover {
          background-color: rgb(12, 12, 12);
          color: #fff;
        }
        #buy {
          margin-top: 50px;
        }
        .camera-parameters {
          margin: 10px 20px;
          font-size: 13px;
          line-height: 20px;
          color: #fff;
        }
      }
      .exceptional {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 13px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>