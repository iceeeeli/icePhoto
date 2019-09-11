<!-- 通知 -->
<template>
  <div>
      <div class="row" v-for="item in mynotice" :key="item.creatime">
           <div class="con">
               <div class="left-con">
                 <span>[{{item.type}}] </span>
                    <span>{{item.content}}  </span>
                    <router-link :to="{name:'noticeinfo',params:item}">查看详情</router-link>
                   
               </div>
               <div class="right-con">
                   <span>{{item.creatime}}</span>
               </div>
           </div>
      </div>
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
      return this.$store.state.Notice.mynotices1.system.Notice
    }
  },
  created(){
    this.getMyNotices()
  },
  methods: {
    getMyNotices(){
      var username=localStorage.getItem('localuser')
      this.$store.commit('getMySystemNotices1',username)
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
        right:150px;
    }
    .con{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .left-con{
            margin-left:50px;
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