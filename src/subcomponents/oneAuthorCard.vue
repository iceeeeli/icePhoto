<!-- 子组件的卡片 -->
<template>
  <div class="card">
      <div class="header" ref="header">
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
          
          <img :src="focus.touxaing" width="60px" height="60px" id="touxiang" @click="toIndex">
          <span>{{focus.username}}</span>
           <el-button type="info" plain
          size="mini" @click.prevent="handleDY" v-if="focus.iffocus">已关注</el-button>
         <el-button type="warning" plain   v-else
         size="mini" @click.prevent="handleFC">关注</el-button>
         
     
      </div>
      <div class="fans-focus">
          <span>关注:{{focus.focus}}人</span>
          <span>/</span>
          <span>粉丝:{{focus.fans}}人</span>
          <span>/</span>
          <span>{{focus.city}}</span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    };
  },
  props:["focus","userid"],
  mounted(){
      this.$refs.header.style.backgroundImage =
      "url(" + this.focus.bcg + ")";
  },
  methods: {
       handleDY(){
          this.$alert("确认取消关注该用户？", "确认取消", {
          confirmButtonText: "确定",
          callback: action => {
            this.focus.iffocus=false
          this.$store.commit('nofocusUser',{id:this.userid,list:this.focus})
          this.$message({
            message: "取消关注成功",
            type: "success"
          });
        }
      });
      },
      handleFC(){
         this.$store.commit('focusUser',{id:this.userid,list:this.focus}) 
          this.focus.iffocus=true
         this.$message({
            message: "关注成功",
            type: "success"
          });
      },
        sendsixin(){
      var s={creatime:'',fromid:'',toid:'',content:''}
      let date = new Date();
      let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
      s.creatime=strDate
      s.fromid=localStorage.getItem('localuser')
      s.toid=this.focus.username
      this.$store.commit('setSixin',s)
      this.$router.push("/home/otherIndex/otherphoto")
    },
      toIndex(){
          this.$store.commit('getUserMess',this.focus.userid)
          this.$router.push({name:'otherIndex'})
      }
  }
}

</script>
<style lang='scss' scoped>
.card{
   

    width: 300px;

    
    .header{
         height: 120px;
        background-image:  url("../images/4.png");
        background-size: 100% auto;
        background-position: fixed;
         #sixin {
          float:right;
          margin-top:80px;
          margin-right:10px;
          cursor: pointer;
          transition: all 0.6s;
        }
        #sixin:hover {
          transform: scale(1.4);
        }  
    }
    .mess{
        margin-top:10px;
        #touxiang{
            cursor: pointer;
            transition: all 0.6s;
            float:left;
            border-radius: 50%;
            margin-top:-40px;
            margin-left:20px;
        }
        #touxiang:hover{
            transform: scale(1.4);
        }
        span{
            font-size: 18px;
            letter-spacing: 3px;
            font-weight: bold;
            margin-left:20px;
        }
        .el-button{
            float:right;
            margin-right:10px;
        }
    }
    .fans-focus{
        display:flex;
        justify-content:space-between;
        margin:10px 10px;
        font-size: 14px;
        letter-spacing: 2px;
        margin:20px 10px;
        color:#939099;
    }
}
</style>