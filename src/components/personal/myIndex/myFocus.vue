<!-- 我的关注 -->
<template>
  <div class="myfocus-container">
    <div class="row" v-for="(focus,index) in rows" :key="index">
<el-card shadow="always" :body-style="{ padding: '0px' }" v-for="(item,index) in focus" :key="index" class="card">
    <author-card :focus="item" :userid="userid"></author-card>
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
    length(){
       return this.$store.state.Userlists.oneUserMess.myfocus.length
    },
    focusLists(){
       return this.$store.state.Userlists.oneUserMess.myfocus
    }
  },
  components:{
    AuthorCard
  },
  mounted: function() {
    this.userid = localStorage.getItem("userid");
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
    }
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