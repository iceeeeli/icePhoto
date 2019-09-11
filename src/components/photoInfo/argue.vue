<!-- 评论组件 -->
<template>
  <div class="argue-container">
    <span id="title">评论列表</span>
    <br>
    <br>
    <div class="send-argue" style>
      <form>
        <a href="#" class="touxian">
          <img :src="usertouxiang" alt style="width:30px;border-radius: 50%;">
        </a>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="textarea"
          id="tarea"
        ></el-input>
        <button
          type="button"
          class="mui-btn mui-btn-warning mui-btn-outlined hoverl"
          style="width:100%"
          @click="postargue"
        >评论</button>
      </form>
    </div>
    <div class="arguelist">
      <ul>
        <li style v-for="item in argueListsPage" :key="item.id">
          <img :src="item.fromtouxiang" class="imglist" alt style="width:30px;border-radius: 50%;background-color:#fff;">

          <span>{{item.fromname}}</span>
          <br>
          <span>{{item.content}}</span>
          <br>
          <span style="line-height:30px;">{{item.creatime}}</span>
          
            <span id="back" style="line-height:30px;margin-left:5px;" @click.prevent="toinput(item.fromname)">回复</span>
  
         <span style="float:right; font-size:20px;">{{item.belike}}</span> 
          <img
            src="@/assets/icon1/dianzanw.svg"
            alt="点赞"
            title="点赞"
            style="width:20px;"
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
        </li>
      </ul>
      <button
          type="button"
          class="mui-btn mui-btn-warning mui-btn-outlined hoverl"
          style="width:100%"
          @click="getMore()"
          v-show="arguemore"
        >加载更多评论</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      textarea: "",
      user: {
        src: 'img/1.jpg',
        name: "ice"
      },
      argueLists: [
      ],
      argueListsPage:[],
      page:2,
      arguemore:true,
      username: "",
      usertouxiang: "",
      fromid:'',
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
    };
  },
  props:["photoid","arguelist","imgs"],
  created:function(){
    this.getarguelist()//获取原有评论列表
    this.getlocaluser();
    this.getPhotoPage()
  },
  beforeDestroy(){
    this.postarguelist()
  },
  methods: {
    getlocaluser() {
      this.username= localStorage.getItem("localuser");
      this.usertouxiang = localStorage.getItem("usertouxiang");
      this.fromid=localStorage.getItem("userid");
      this.list.toid=this.photoid
    },
    getarguelist(){
      this.arguelist.forEach(el => {
        this.argueLists.push(el)
      });
    },
     like(argueid) {//点赞
      this.argueListsPage.some(item=>{
        if(item.id==argueid){
          item.like=false
          item.belike++
          return
        }
      })
    },
    unlike(argueid) {
       this.argueListsPage.some(item=>{
        if(item.id==argueid){
          item.like=true
          item.belike--
          return
        }
      })
    },
    postargue() {
      if (this.textarea.trim().length === 0) {
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
      n.cont=this.imgs
      n.toid=this.imgs.name
      argue.id=Date.now()
      n.creatime=argue.creatime=strDate
      argue.fromid=this.fromid
      n.fromid=argue.fromname=this.username
      n.touxiang=argue.fromtouxiang=this.usertouxiang
      argue.toid=this.photoid
      n.content=argue.content=this.textarea
      n.intro=n.fromid+"在您的"+this.imgs.title+"下发布了评论"
      this.$store.commit('sendArgueNotice',n)
      this.argueLists.unshift(argue)
      this.argueListsPage.unshift(argue)
      this.$message({
        message:'发送评论成功',
        type:'success'
      })
      this.textarea=''
      }
    },
     toinput(name){//评论列表中的回复事件
      this.textarea='@'+name
    },
    getPhotoPage(){
      var j=this.page
      this.argueListsPage=this.argueLists.slice(0,j)
    },
    getMore(){
      this.page+=2
      if(this.page===this.argueLists.length){
        this.getPhotoPage()
        return this.arguemore=false
      }else if(this.page>this.argueLists.length){
        this.page=this.argueLists.length
        this.getPhotoPage()
        return this.arguemore=false
      }else{
        this.getPhotoPage()
      }  
    },
    postarguelist(){//提交后台仓库
      var end=this.argueLists.length-this.arguelist.length
      var newlists=this.argueLists.slice(0,end)
        this.$store.commit('addphotoarguelist',{id:this.photoid,lists:newlists})
    }
  }
};
</script>
<style lang='scss' scoped>
.argue-container {
  .send-argue {
    padding-left: 35px;
    position: relative;
    a {
      position: absolute;
      left: 0;
      top: 3px;
      width: 26px;
      height: 26px;
    }
    #tarea {
      height: 64px;
      padding: 7px 10px 9px 15px;
      font-size: 13px;
      border: 0;
      color: #fff;
    }
  }
  .arguelist {
    padding-left: 35px;
    position: relative;
    a {
      position: absolute;
      left: 0;
      top: 3px;
      width: 26px;
      height: 26px;
    }
    ul {
      list-style: none;
      padding-inline-start: 0px;
      margin-top: 20px;
      .imglist {
        position: absolute;
        left: -3px;
      }
      li {
        margin-bottom: 10px;
        img {
          float: right;
          cursor: pointer;
          transition: all 0.6s;
        }
        img:hover {
          transform: scale(1.4);
        }
      }
    }
  }
}
</style>