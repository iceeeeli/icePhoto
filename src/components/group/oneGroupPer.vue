<!-- 小组页面成员 -->
<template>
  <div>
     <a class="mycard" @click="lookmycard" v-if="mycard">查找我的群名片</a>
     <a class="mycard" @click="back" v-else>返回</a>
      <div class="row" v-for="(cols,i) in rows" :key="i">
       <div class="group-per" v-for="col in cols" :key="col.userid">
         <per-card :user="col" :groupid="groupinfo.creatime" @remove="deluser" :type="type"></per-card>
       </div>
      </div>
      
  </div>
</template>

<script>
import PerCard from '@/subcomponents/perCard.vue'
export default {
  data () {
    return {
      rows:[],
      username:'',
    mycard:true
    };
  },
  props:["groupinfo","type"],
  components:{
    PerCard
  },
  created(){
    // this.getlocal()
    this.getrows(this.groupinfo.user)
  },
  methods: {
    // getlocal(){
    //   this.username=localStorage.getItem('localuser')
    //   this.groupinfo.admin.some(el=>{
    //     if(el.name==this.username||el.type=="群主"){
    //       this.type="群主"
    //     }else if(el.name==this.username||el.type=="管理员"){
    //       this.type="管理员"
    //     }
    //   })
    //   this.groupinfo.user.some(el=>{
    //     if(el.name==this.username){
    //       this.type="成员"
    //     }
    //   })
    // },
   lookmycard(){
     var username=localStorage.getItem('localuser')
     var mycard=[]
     this.groupinfo.user.some(el => {
       if(el.name==username){
         mycard.push(el)
       }
     });
     if(mycard.length==1){
       this.mycard=false
     }else{
       this.$notify.error({
          title: "错误",
          message: "您尚未加入该小组！",
          offset: 80,
          duration: 1500
        });
       return
     }
      this.getrows(mycard)
   },
   back(){
      this.mycard=true
      this.getrows(this.groupinfo.user)
   },
        getrows(user){
          this.rows=[]
      var rowNum = parseInt(Math.ceil(user.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.rows.push(user.slice(start, end));
      }
      return;
    },
    deluser(data){
      this.groupinfo.user.some(el=>{
        if(el.userid==data){
          this.groupinfo.user.splice(this.groupinfo.user.indexOf(el),1)
        }
      })
      this.getrows(this.groupinfo.user)
    },
  }
}

</script>
<style lang='scss' scoped>
.mycard{
      margin-left: 118px;
    font-size: 16px;
    letter-spacing: 3px;
}
    .row{
      display:flex;
      justify-content: space-around;
      width:100%;
      height: 100px;
      margin:40px 0;
      .group-per{
        width:30%;
        height:122px;
           border: 1px solid #303133;
        
  }
}
</style>