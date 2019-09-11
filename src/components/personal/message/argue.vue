<!-- 评论 -->
<template>
  <div class="argue-container">
      <el-card shadow="hover" :body-style="{ padding: '0px' }" class="list" v-for="item in mynotice" :key="item.creatime">
          <div class="face">
              <img :src="item.touxiang" alt="" width="60px" height="60px">
          </div>
          <div class="argue">
              <div class="argue-title">
                  <div class="argue-left">
                   <a href="#" @click="look(item)">{{item.intro}}</a>
                  </div>
                  <div class="argue-right">
                      <span>{{item.creatime}}</span>
                  </div>
              </div>
              <div class="argue-con">
                  <span>"{{item.content}}"</span>
              </div>
          </div>
     </el-card>
      <div class="more" style="text-align:center;margin-top:50px;">
            <el-button type="primary" @click="more=!more" v-if="more">加载更多</el-button>
            <p v-else>没有更多了~~~</p>
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
      return this.$store.state.Notice.mynotices1.hudong.argueNotice
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
            this.$store.commit('readNotice',{id:id,type:'argue'})
        }else{         
            this.$router.push({name: 'photoInfo',params:item.cont})
            this.$store.commit('readNotice',{id:id,type:'argue'})
        }
    }
  }
}
</script>
<style lang='scss' scoped>
.argue-container{
   
    .list{
        position: relative;
    height: 100px;
    width:100%;
    margin-top:20px;
    .face{
       position: absolute;
        top:20px;
        left:20px;
        img{
            border-radius: 50%;
        }
    }
    .argue{
        margin-left:100px;
        padding:20px ;
        .argue-title{
            display: flex;
            justify-content: space-between;
            .argue-left{
                font-size:18px;
                letter-spacing: 5px;
            }
            .argue-right{
                font-size:16px;
                letter-spacing: 3px;
                color:#909399;
            }
        }
        .argue-con{
            margin-top:15px;
            font-size:16px;
            letter-spacing: 1.5px;
        }
    }
}
}

</style>