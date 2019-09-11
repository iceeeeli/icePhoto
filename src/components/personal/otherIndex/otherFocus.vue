<!-- 我的关注 -->
<template>
  <div class="myfocus-container">
    <div class="row" v-for="(focus,index) in rows" :key="index">
<el-card shadow="always" :body-style="{ padding: '0px' }" v-for="(item,index) in focus" :key="index" class="card">
    <author-card :focus="item" :userid="userid1"></author-card>
    </el-card>
    </div>
    
  </div>
</template>

<script>
import AuthorCard from '@/subcomponents/oneAuthorCard.vue'
export default {
  data () {
    return {
      userid:'',
      rows: [],
    };
  },
  computed:{
    focusLists(){
       return this.$store.state.Userlists.oneUserMess.myfocus;
    },
    userid1(){
      return this.$store.state.Userlists.oneUserMess.userid
    }
  },
  components:{
    AuthorCard
  },
  mounted: function() {
    this.changeRow();
  },
  methods: {
   changeRow() {
      var rowNum = parseInt(Math.ceil(this.focusLists.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 4;
        var end = start + 4;
        this.rows.push(this.focusLists.slice(start, end));
      }
      return;
    },
        
    
  }
}

</script>
<style lang='scss' scoped>
.myfocus-container{
  margin:50px 100px;
  
  .row{
width:100%;
  display: flex;
  justify-content: flex-start;
  margin:50px;
  .card{
    width:305px;
   margin-right:20px;
    
  }
  }
  
}
</style>