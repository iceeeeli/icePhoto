<template>
  <div class="getart-container1">
    <div class="one-talk">
      <el-card shadow="always" :body-style="	{ padding: '20px' }" class="header" v-if="fromtalk">
        <div class="face">
          <img :src="talk.photo" alt width="70px" height="70px">
          <span>{{art.talk}}</span>
        </div>
        <router-link :to="{name:'onetalk',params:talk}">进入讨论</router-link>
      </el-card>
      <el-card shadow="always" :body-style="	{ padding: '50px' }" class="main">
        <div class="title">
          <span id="title">{{art.title}}</span>
          <br>
          <span id="time">{{art.creatime}}发布</span>
          <span style="margin-left:20px; color: #909399;">阅读量：{{art.read}}</span>
        </div>
        <div class="author">
          <el-popover
            placement="left"
            width="300px"
            trigger="hover"
            style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;"
          >
            <author-card  :username="art.name"></author-card>
            <a href="#" slot="reference">
              <!-- <img :src="art.author[0].touxiang" alt="" width="70px" height="70px"
              style="box-shadow: 0px 0px 0px 0px #909399;"> -->
              <img :src="art.author" alt="" width="70px" height="70px"
              style="box-shadow: 0px 0px 0px 0px #909399;">
            </a>
          </el-popover>
          <!-- <span id="name">{{art.author[0].username}}</span> -->
          <span id="name">{{art.name}}</span>
          <el-button type="warning">关注</el-button>
        </div>
        <div class="tmain">
          <span class="gatarttag" v-for="item in art.tag" :key="item">#{{item}}</span>
          <div class="getart" v-html="art.context" ref="art">{{content}}</div>
        </div>
          <div
        class="exceptional"
        style="display: flex;justify-content: space-around; margin:10px 10px 30px 20px;">
        <span style="padding-top: 5px;">你的打赏是我最好的鼓励</span>
        <button
          type="button"
          class="mui-btn mui-btn-warning mui-btn-outlined hoverl"
          style="width:20%"
          @click="dialogmoney = true"
        >打赏</button>
      </div>
        <div class="caozuo">
          <div class="shoucan">
            <span style="font-size:20px;">{{art.belike}}</span>
            <img
              src="@/assets/icon1/dianzan.svg"
              alt
              width="20px"
              v-if="art.like"
              @click.prevent="like(art.id)"
            >
            <img
              src="@/assets/icon1/dianzansucc.svg"
              alt="取消点赞"
              title="取消点赞"
              style="width:20px;"
              v-else
              @click.prevent="unlike(art.id)"
            >
            <span>点赞</span>
          </div>
          <span>|</span>
          <div class="like">
            <span style="font-size:20px;">{{art.behide}}</span>
            <img
              src="@/assets/icon1/shoucan.svg"
              alt
              width="20px"
              v-if="art.hide"
              @click.prevent="hide(art.id)"
            >
            <img
              src="@/assets/icon1/shoucansucc.svg"
              alt="取消收藏"
              title="取消收藏"
              style="width:20px;"
              v-else
              @click.prevent="unhide(art.id)"
            >
            <span>收藏</span>
          </div>
        </div>
      </el-card>

      <div class="argue">
        <argue :artid="art.id" :arguelength="art.arguelist" :arts="art"></argue>
      </div>
    </div>
    <!-- 打赏 -->
    <el-dialog
      title="打 赏"
      :visible.sync="dialogmoney"
      width="30%"
      :before-close="handleClose"
      center
    >
      <img src="../../../images/repay.jpg" alt width="200px" style="display:block;margin:0 auto;">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogmoney = false">取 消 打 赏</el-button>
        <el-button type="primary" @click="handeleMoney">
          确 认 打 赏</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Argue from "@/subcomponents/argue.vue";
import AuthorCard from "@/components/photoInfo/authorCard.vue";
export default {
  data: function() {
    return {
      dialogmoney:false,
      fromtalk:false,
      dianzan: true,
      shoucan: true,
      art:this.$route.params.art,
      talk:[]
    };
  },
  components: {
    Argue,
    AuthorCard
  },
  computed: {

  },
  created(){
  
    
  },

  beforeDestroy() {
    this.read(this.art.id);
  },
  mounted() {
    this.$refs.art.style.width = "100px";
  },

  methods: {
handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handeleMoney(){
      var n={creatime:'',fromid:'',toid:'',content:'',touxiang:'',intro:'',type:'支持',photo:'',cont:null}
       let date = new Date();
        let strDate = date
          .toLocaleString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "");
          n.creatime=strDate
          n.fromid=localStorage.getItem('localuser')
          n.toid=this.art.name
          n.content="打赏了0.1元"
          n.touxiang= localStorage.getItem("usertouxiang");
          n.intro=n.fromid+"支持了您的"+this.art.title+"作品"
          n.photo=this.art.src[0]
          n.cont=this.art
          this.$store.commit('sendSupportNotice',n)
       this.$message({
          message: '打赏成功！',
          type: 'success'
        });
      this.dialogmoney=false;
    },
    like(id) {
      if (this.$store.state.login) {
        this.$store.commit("artlike", id);
      } else {
        alert("请先登录！");
      }
    },
    read(id) {
      this.$store.commit("artread", id);
    },
    unlike(id) {
      this.$store.commit("artunlike", id);
    },
    hide(id) {
      if (this.$store.state.login) {
        this.$store.commit("arthide", id);
      } else {
        alert("请先登录！");
      }
    },
    unhide(id) {
      this.$store.commit("artunhide", id);
    }
  }
};
</script>

<style lang="scss">
.getart-container1 {
  .one-talk {
    margin: 20px 300px;
    width: 60%;
    .header {
      width: 100%;
      height: 110px;

      .face {
        display: flex;
        align-items: center;
        span {
          margin-left: 20px;
          font-size: 16px;
          letter-spacing: 2px;
          color: #909399;
        }
      }
      a {
        position: absolute;
        right: 400px;
        top: 70px;
      }
    }
    .main {
      height: auto;
      margin-top: 20px;

      .title {
        #title {
          font-size: 40px;
          letter-spacing: 1.5px;
          font-weight: bold;
          line-height: 70px;
        }
        #time {
          line-height: 50px;
          font-size: 16px;
          letter-spacing: 2px;
          color: #909399;
        }
      }
      .author {
        margin: 20px 20px;
        display: flex;
        align-items: center;
        img {
          box-shadow: 1px 0px 0px 0px #909399;
        }
        #name {
          margin: 0px 40px 0 20px;
          font-size: 20px;
          letter-spacing: 2px;
        }
      }
      .tmain {
        margin: 80px 20px;
      }
      .caozuo {
        display: flex;
        justify-content: space-around;
        img {
          cursor: pointer;
          transition: all 0.6s;
        }
        img:hover {
          transform: scale(1.4);
        }
      }
    }
    .argue {
      margin: 20px 0;
    }
  }
  .gatarttag {
    font-size: 14px;
    color: #0077ff;
    margin-left: 10px;
  }
}
.getart {
  margin: 80px 20px;
  .ql-size-huge {
    font-size: 20px;
  }
  img {
    width: 700px;
  }
}
</style>

