<!-- 摄影师 -->
<template>
  <div class="photographer-container">
      <div class="header">
        <a @click="getHot" class="tab">热门摄影师</a>
        <a @click="getMuch" class="tab">累计关注量</a>
        <a @click="getNew" class="tab">潜力新星</a>
      </div>
      <div class="main">
        <el-card shadow="hover" :body-style="{ padding: '0px' }"
                class="card" v-for="col in lists" :key="col.userid">
                <div class="face">
                   <el-popover placement="right" width="300px" trigger="hover"  style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;">
              <author-card :usercard="col"></author-card>
              <a href="#" slot="reference">
              <img :src="col.touxaing" alt="" width="120px" height="120px">
              </a>
            </el-popover>
                  <br>
                  <span id="name">{{col.username}}</span><span id="num">粉丝量：{{col.myfans.length}}</span><br>
                  <span id="sign">{{col.intro}}</span>

                </div>
                <div class="photo">
                  <img :src="img.src[0]" alt="" height="150px" v-for="img in col.myphoto.slice(0,6)" :key="img.id">
                </div>
        </el-card>
        <div class="fenye" style="text-align:center;margin:80px auto;">
        <el-button type="primary" @click="more=!more" v-if="more">加载更多</el-button>
            <p v-else>没有更多了~~~</p>
      </div>
      </div>
  </div>
</template>

<script>
import AuthorCard from "@/components/photoInfo/otherAuthor.vue";
export default {
  data () {
    return {
      hot:[],
      much:[],
      new:[],
      lists:[],
      more:true
    };
  },
  computed:{
    users(){
      return this.$store.state.Userlists.userMessages
    }
  },
  created(){
    this.getLists(this.users)
  },
components:{
  AuthorCard
},
  methods: {
    getHot(){
      this.users.some(el=>{
        if(el.type=="hot"){
          this.hot.push(el)
        }
      })
      this.getLists(this.hot)
    },
    getMuch(){
      this.users.some(el=>{
        if(el.type=="much"){
          this.much.push(el)
        }
      })
       this.getLists(this.much)
    },
    getNew(){
      this.users.some(el=>{
        if(el.type=="new"){
          this.new.push(el)
        }
      })
       this.getLists(this.new)
    },
    getLists(lists){
      this.lists=lists
    }
  }
}

</script>
<style lang='scss' scoped>
.photographer-container{
  margin:50px 100px;
  .header{
    .tab{
      cursor: pointer;
      transition: all 0.6s;
  font-size:20px;
    letter-spacing: 3px;
    padding-right:20px;
    color:#303133;
    }
    .tab:hover{
      transform: scale(1.4);
      color:#409EFF;
    }
    .tab:visited{
      color:#409EFF;
      font-size:25px;
    }
  }
  .main{
    margin:50px 0;
      .card{
    height: 250px;
    width: 100%;
    margin:20px 0;
    .face{
      float: left;
      width: 250px;
      height: 250px;
     text-align: center;
     margin:40px 0;
     #name{
       font-size:16px;
       letter-spacing: 3px;
       line-height: 30px;
     }
     #num{
       font-size:13px;
       letter-spacing: 2px;
       color:#909399;
       margin-left:20px;
     }
     #sign{
       font-size:16px;
       letter-spacing: 3px;
     }
    }
    .photo{
      height: 250px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
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