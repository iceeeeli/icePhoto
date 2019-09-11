<!-- 小组页面 -->
<template>
  <div class="talk-container">
    <el-col :span="18" :offset="3" class="tag">
      
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="热门话题" name="first"><hot-talk :hottalks="hottalk"></hot-talk></el-tab-pane>
    <el-tab-pane label="最新话题" name="second"><new-talk :newtalks="newtalk"></new-talk></el-tab-pane>
        <el-tab-pane label="我的话题" name="third"><my-talk :mytalks="mytalk"></my-talk></el-tab-pane>
        <el-tab-pane label="创建话题" name="four"><create-talk></create-talk></el-tab-pane>
  </el-tabs>
    </el-col>

  </div>
 
</template>

<script>
import HotTalk from './hotTalk.vue'
import NewTalk from './newTalk.vue'
import MyTalk from './myTalk.vue'
import CreateTalk from './create.vue'
export default {
  data () {
    return {
       activeName: 'first',
       hottalk:[],
       newtalk:[],
       mytalk:[],
       username:''
    };
  },
  components:{
    HotTalk,
    NewTalk,
    MyTalk,
    CreateTalk
  },
  computed:{
    talks(){
      return this.$store.state.talks
    }
  },
  created(){
    this.getlocluser()
    this.gethottalks()
    this.getmytalks()
  },
  methods: {
    getlocluser(){
      this.username=localStorage.getItem('localuser')
    },
    gethottalks(){
      this.talks.forEach(el => {
        if(el.read>=10){
          this.hottalk.push(el)
        }else{
          this.newtalk.push(el)
        }
      });
    },
    getnewtalks(){

    },
    getmytalks(){
      this.talks.forEach(el=>{
        if(el.author==this.username){
          this.mytalk.push(el)
        }
      })
    },
    handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}

</script>
<style lang='scss' scoped>
.talk-container{
  .tag{
    margin-top:50px;
  }
}
</style>