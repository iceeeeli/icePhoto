<!-- 内容卡片 -->
<template>
  <div>
      <el-card
        shadow="hover"
        :body-style="	{ padding: '0px' }"
        class="group-con"
      >
        <div class="face">
          <el-popover
            placement="left-start"
            width="300px"
            trigger="hover"
            style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;"
          >
            <author-card :username="info.name"></author-card>
            <a href="#" slot="reference">
              <img :src="info.author" alt width="50px" height="50px">
            </a>
          </el-popover>
        </div>
        <div class="main">
          <div class="author">
            <span>{{info.name}}</span>
          </div>
          <div class="time">
            <span>{{info.creatime}}</span>
            <span>发布</span>
          </div>
          <div class="content">
            <span>{{info.content}}</span>
            <h4 v-if="ifart">文章：{{info.title}}</h4>
          </div>
          <div class="tabs">
            <span v-for="(tag,index) in info.tags" :key="index">#{{tag}}</span>
          </div>
          <div class="photo">
            <img
              v-for="(src,i) in info.src.slice(0,3)"
              :key="i"
              :src="src"
              alt
              height="150px"
              width="150px"
            >

            <div class="readmore">
                 <img src="img/readmore.svg" alt="查看详情" title="查看详情" width="50px" @click="readmore(info)">
            </div>
          </div>
        </div>
        <div class="caozuo">
          <div class="shoucan">
            <span style="font-size:12px;">{{info.belike}}</span>
            <img
              src="@/assets/icon1/dianzan.svg"
              alt
              width="20px"
              v-if="info.like"
              @click.prevent="like(info.id)"
            >
            <img
              src="@/assets/icon1/dianzansucc.svg"
              alt="取消点赞"
              title="取消点赞"
              style="width:20px;"
              v-else
              @click.prevent="unlike(info.id)"
            >
            <span>点赞</span>
          </div>
          <span>|</span>
          <div class="like">
            <span style="font-size:12px;">{{info.behide}}</span>
            <img
              src="@/assets/icon1/shoucan.svg"
              alt
              width="20px"
              v-if="info.hide"
              @click.prevent="hide(info.id)"
            >
            <img
              src="@/assets/icon1/shoucansucc.svg"
              alt="取消收藏"
              title="取消收藏"
              style="width:20px;"
              v-else
              @click.prevent="unhide(info.id)"
            >
            <span>收藏</span>
          </div>
          <span>|</span>
          <div class="argue">
            <img src="@/assets/icon1/argue.svg" alt width="20px" @click.prevent="argue()">
            <span>评论</span>
          </div>
        </div>
      </el-card>
        <el-card shadow="hover" :body-style="	{ padding: '0px' }" class="argue-con" v-if="info.ifargue">
        <div class="myface">
          <img :src="usertouxiang" alt width="40px" height="40px">
        </div>
        <div class="ar-con">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea"></el-input>
          <el-button type="warning" @click="postargue(info)">发送</el-button>
        </div>
      </el-card>
  </div>
</template>

<script>
import AuthorCard from '@/components/photoInfo/authorCard.vue'
export default {
  data () {
    return {
       username:'',
      usertouxiang:'',
      ifart:false,
      fromid:'',
      read:'',
      textarea: "",
      myarguelists:[],
      ListsPage:[],
      more:true,
      page:10
    };
  },
  props:["info","groupinfo","type"],
    components:{
        AuthorCard
    },
      created(){
    this.getlocaluser()
  this.showart()
  },
  methods: {
  getlocaluser() {
      this.username= localStorage.getItem("localuser");
      this.usertouxiang = localStorage.getItem("usertouxiang");
      this.fromid=localStorage.getItem("userid");
    },
    showart(){
        if(this.info.art){
            this.ifart=true
        }
    },
    readmore(item){
        this.$store.commit('setOneGroup',this.groupinfo)
        if(this.info.art){
            this.$router.push({name: 'groupart',params:{art:item}})
        }else{
      this.$router.push({name: 'photoInfo',params:item})
        }
        
    },
    like(id) {
        if(this.type=="游客"){
            this.$message({
                message:'您尚未加入该小组，无法进行相应操作',
                type:'warning'
            })
        }else{
             this.$store.commit("like", id);
            this.info.belike+=1
            this.info.like=false
        }
    },
    unlike(id) {
      this.$store.commit("unlike", id);
      this.info.belike-=1
      this.info.like=true
    },
    hide(id) {
        if(this.type=="游客"){
            this.$message({
                message:'您尚未加入该小组，无法进行相应操作',
                type:'warning'
            })
        }else{
            this.$store.commit("hide", id);
        this.info.behide+=1
        this.info.hide=false
        }
    },
    unhide(id) {
      this.$store.commit("unhide", id);
      this.info.behide-=1
        this.info.hide=true
    },
    argue(){
         if(this.type=="游客"){
            this.$message({
                message:'您尚未加入该小组，无法进行相应操作',
                type:'warning'
            })
        }else{
            this.info.ifargue=!this.info.ifargue
        }
    },
 postargue(item) {//此处有个小bug,评价只对图片信息有用
      if (this.textarea.trim().length === 0) {
        alert("0")
        this.$message({
          type: "warning",
          message: "输入内容不能为空!"
        });
      } else {
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
      n.cont=item
      n.toid=item.name
      argue.id=Date.now()
      n.creatime=argue.creatime=strDate
      argue.fromid=this.fromid
      n.fromid=argue.fromname=this.username
      n.touxiang=argue.fromtouxiang=this.usertouxiang
      argue.toid=item.id
      n.content=argue.content=this.textarea
      n.intro=n.fromid+"在您的"+item.title+"下发布了评论"
      this.$store.commit('sendArgueNotice',n)
      this.myarguelists.unshift(argue)
      var group=this.groupinfo.creatime
      this.$store.commit('addgrouparguelist',{group:group,id:item.id,lists:this.myarguelists})
       this.$message({
         message:'发送成功',
         type:'success'
       })
       this.myarguelists=[]
         this.textarea=''
      }
    },
  }
}

</script>
<style lang='scss' scoped>
   .group-con {
      position: relative;
      height: 400px;

      .face {
        float: left;
        width: 90px;
        height: 400px;
        padding: 20px 20px;
        img {
          box-shadow: 1px 1px 2px 2px #eee;
        }
      }
      .main {
        padding: 20px 20px;
        .author {
          span {
            font-size: 20px;
            letter-spacing: 2px;
            font-weight: bold;
          }
        }
        .time {
          margin: 10px 0;
          span {
            font-size: 14px;
            letter-spacing: 1.5px;
            color: #5e5e5e;
            padding-right: 20px;
          }
        }
        .content {
          margin: 10px 0;
          span {
            font-size: 16px;
            letter-spacing: 1.5px;
            padding-right: 20px;
          }
        }
        .tabs {
          margin: 30px 0 10px 0;
          span {
            font-size: 16px;
            letter-spacing: 1.5px;
            color: #e6a23c;
            padding-right: 20px;
          }
        }
        .readmore {
          display: inline-flex;
          background-color: #f2f6fc;
          width: 150px;
          height: 150px;
          justify-content: center;
          img {
          cursor: pointer;
          transition: all 0.6s;
        }
        img:hover {
          transform: scale(1.4);
        }
        }
      }
      .caozuo {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-top-width: 1px;
        border-top-style: solid;
        img {
          cursor: pointer;
          transition: all 0.6s;
        }
        img:hover {
          transform: scale(1.4);
        }
      }
    }
    .argue-con {
      position: relative;
      height: 120px;
      background: #c0c4cc;
      .myface {
        float: left;
        width: 90px;
        height: 100px;
        padding: 20px 20px;
        img {
          box-shadow: 1px 1px 2px 2px #eee;
        }
      }
      .ar-con {
        margin-left: 70px;
        padding: 20px 20px;
        .el-button {
          float: right;
        }
      }
    }
</style>