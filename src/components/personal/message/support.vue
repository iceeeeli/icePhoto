<!-- 支持 -->
<template>
  <div class="like-container">
      <div class="row" v-for="item in mynotice" :key="item.creatime">
           <img :src="item.touxiang" alt="" width="60px" height="60px" 
           style="border-radius:50%;" id="face">
           <img :src="item.photo" alt="" width="60px" height="60px" id="photo" >
           <div class="con">
               <div class="left-con">
                   <a href="#" @click="look(item)">{{item.intro}}</a>
               </div>
               <div class="right-con">
                   
                   <span>{{item.creatime}}</span>
               </div>
           </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
        more:true
    };
  },
  computed:{
    mynotice(){
      return this.$store.state.Notice.mynotices1.hudong.support
    }
  },
  created(){
    this.getMyNotices()
  },
  methods: {
    getMyNotices(){
      var username=localStorage.getItem('localuser')
      this.$store.commit('getMySystemNotices1',username)
    },
    look(item){
        var id=item.creatime
        if(item.cont.art){
            this.$router.push({name: 'talkcon',params:{art:item.cont}})
            this.$store.commit('readNotice',{id:id,type:'support'})
        }else{         
            this.$router.push({name: 'photoInfo',params:item.cont})
            this.$store.commit('readNotice',{id:id,type:'support'})
        }
    }
  }
}
</script>
<style lang='scss' scoped>
.row{
    position: relative;
    height: 100px;
    width:100%;
    margin-top:20px;
    background-color:#EBEEF5;
    #face{
        position: absolute;
        top:20px;
        left:20px;
    }
    #photo{
        position: absolute;
        top:20px;
        right:250px;
    }
    .con{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .left-con{
            margin-left:100px;
             font-size:18px;
            letter-spacing: 5px;
        }
        .right-con{
            margin-right:50px;
            font-size:16px;
                letter-spacing: 3px;
                color:#909399;
        }
    }
}
</style>