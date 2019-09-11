<!-- 评论列表 -->
<template>
  <div>
    <el-card shadow="always" :body-style="	{ padding: '40px' }" class="argue">
      <span id="title">全部{{alength}}条评论</span>
      <div class="my-argue">
        <div class="my-face">
          <img :src="usertouxiang" alt width="70px" height="70px">
        </div>
        <div class="my-input">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="content"></el-input>
          <el-button type="warning" @click.prevent="postargue()">发送</el-button>
        </div>
      </div>
      <div class="other-argue" v-for="item in argueListsPage" :key="item.id+ '-label'">
        <div class="other-face">
          <el-popover
            placement="left"
            width="300px"
            trigger="hover"
            style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;"
          >
            <author-card></author-card>
            <a href="#" slot="reference">
              <img :src="item.fromtouxiang" alt width="70px" height="70px">
            </a>
          </el-popover>
        </div>
        <div class="other-con">
          <p style="font-size:20px;">{{item.fromname}}</p>
          <span id="con">{{item.content}}</span>
          <br>
          <span style="font-size:20px;">{{item.belike}}</span>
          <img
            src="@/assets/icon1/dianzan.svg"
            alt
            width="20px"
            v-if="item.like"
            @click.prevent="like(item.id)"
          >
          <img
            src="@/assets/icon1/dianzansucc.svg"
            alt="取消点赞"
            title="取消点赞"
            style="width:20px;"
            v-else
            @click.prevent="unlike(item.id)"
          >
          <span style="margin:0 20px 0 10px;">点赞  </span>
           <span>{{item.creatime}}发布</span>
          <a href="#title" @click.prevent="toinput(item.fromname)">
            <span id="back">回复</span>
          </a>

          <!-- <div class="other-input" v-if="back">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="list1.content"></el-input>
            <el-button type="warning" @click="postargue1(item.id)">发送</el-button>
          </div> -->
        </div>
      </div>
      <!-- <div class="fenye" style="text-align:center;margin:80px auto;">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div> -->
      <div class="fenye" style="text-align:center;margin:80px auto;">
      <el-button type="primary" @click="getMore()" v-show="more">加载更多评论</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import AuthorCard from "@/components/photoInfo/authorCard.vue";
export default {
  data() {
    return {
      content:'',
      list: {
        id:'',
        fromid:'',
        fromname:'',
        fromtouxiang:'',
        toid: '',
        content: '',
        belike:0,
        like:true,
      },
      arguelists:[],
      username: "",
      usertouxiang: "",
      fromid:'',
      more:true,
      rows:1,
      argueListsPage:[]
    };
  },
  props: ["artid","arguelength","arts"],
  components: {
    AuthorCard
  },
  created() {
    this.getarguelist()//获取原有评论列表
    this.getlocaluser();//获取登录用户信息
    this.getMore();//获取前两条评论数据
  },
  beforeDestroy(){
    this.postarguelist()
  },
  computed:{
    // arguelists(){
    //   return this.$store.state.argueLists
    // },
    alength(){
      return this.arguelists.length
    }
  },
  methods: {
    getlocaluser() {//获取登录数据
      this.username =this.list.fromname = localStorage.getItem("localuser");
      this.usertouxiang =this.list.fromtouxiang= localStorage.getItem("usertouxiang");
      this.fromid=localStorage.getItem("userid");
      this.list.toid=this.artid
    },
    getarguelist(){
      this.arguelength.forEach(el => {
        this.arguelists.push(el)
      });
    },
    like(argueid) {//点赞
      this.arguelists.some(item=>{
        if(item.id==argueid){
           console.log(argueid)
          item.like=false
          item.belike++
          return
        }
      })
    },
    unlike(argueid) {
       this.arguelists.some(item=>{
        if(item.id==argueid){
          console.log(argueid)
          item.like=true
          item.belike--
          return
        }
      })
    },
    postargue() {//发表评论
       var n={creatime:'',fromid:'',toid:'',content:'',touxiang:'',intro:'',type:'评论',cont:null}
       let date = new Date();
        let strDate = date
          .toLocaleString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "");
      var argue={
        id:'',
        creatime:'',
        fromid:'',
        fromname:'',
        fromtouxiang:'',
        toid: '',
        content: '',
        belike:0,
        like:true,
      }
      n.cont=this.arts
      n.toid=this.arts.name
      argue.id=this.alength+1
      n.creatime=argue.creatime=strDate
      argue.fromid=this.fromid
      n.fromid=argue.fromname=this.username
      n.touxiang=argue.fromtouxiang=this.usertouxiang
      argue.toid=this.artid
      n.content=argue.content=this.content
      n.intro=n.fromid+"在您的"+this.arts.title+"下发布了评论"
      this.$store.commit('sendArgueNotice',n)
      this.arguelists.unshift(argue)
      this.argueListsPage.unshift(argue)
       this.$message({
        message:'发送评论成功',
        type:'success'
      })
      this.content=''
    },
    toinput(name){//评论列表中的回复事件
      this.content='@'+name
    },
    getargue(){//获取评论列表
      var j=this.rows
      this.argueListsPage=this.arguelists.slice(0,j)
    },
    getMore(){//查看更多
      this.rows+=2
      if(this.rows===this.arguelists.length){
        this.getargue()
        return this.more=false
      }else if(this.rows>this.arguelists.length){
        this.rows=this.arguelists.length
        this.getargue()
        return this.more=false
      }else{
        this.getargue()
      }
    },
    postarguelist(){//提交后台仓库
      var end=this.arguelists.length-this.arguelength
      var newlists=this.arguelists.slice(0,end)
        this.$store.commit('addarguelist',{id:this.artid,lists:newlists})
    }
  }
};
</script>
<style lang='scss' scoped>
.argue {
  #title {
    font-size: 18px;
    letter-spacing: 1.5px;
    color: #909399;
    line-height: 40px;
  }
  .my-argue {
    height: 90px;
    margin-top: 20px;
    .my-face {
      float: left;
      width: 90px;
      height: auto;
    }
    .my-input {
      margin-left: 100px;
      .el-button {
        float: right;
      }
    }
  }
  .other-argue {
    height: auto;
    margin: 40px 0;
    .other-face {
      float: left;
      width: 90px;
      height: auto;
    }
    .other-con {
      margin-left: 100px;
      #con {
        font-size: 18px;
        letter-spacing: 1.5px;
        line-height: 40px;
      }
      img {
        cursor: pointer;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.4);
      }
      #back {
        margin-left: 20px;
        font-size: 16px;
        letter-spacing: 1.5px;
        color: #909399;
      }
      .other-argue {
        .el-input {
        }
      }
    }
  }
}
</style>