<!-- 我的 活动 -->
<template>
  <div class="myact-container">
      <div class="actrow" v-for="(rows,index) in actrows" :key="index">
        <!-- 每一张图片区域 -->
        <div class="actInfo" v-for="(act,index) in rows" :key="index">
          <!-- 图片 -->
          <div class="act-box">
           <router-link :to="{name: 'actinfo',params:act}">
              <el-card shadow="always" :body-style="{ padding: '0px' }">
                <div class="card" style=" height:280px; width: 400px;">
                  <act-card :actinfo="act" :perIndex="actjoin"></act-card>
                </div>
              </el-card>
            </router-link>
          </div>
        </div>
      </div>
       <div class="more" style="text-align:center;margin-top:50px;">
     <el-button type="info" v-if="more" @click="more=!more">加载更多</el-button>
      <span v-else>没有更多了~~</span>
      </div>
  </div>
</template>

<script>
import ActCard from "@/subcomponents/actCard.vue";
export default {
  data () {
    return {
      actrows: [],
      more:true,
      actjoin:true
    };
  },
  computed:{
    actLists(){
      return this.$store.state.Query.queryAct;
    }
  },
  components: {
    ActCard,

  },
mounted: function() {
   console.log(this.actLists)
    this.changeAct();
  },
  methods: {
    changeAct() {
      var rowNum = parseInt(Math.ceil(this.actLists.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.actrows.push(this.actLists.slice(start, end));
      }
      return;
    }
  }
}

</script>
<style lang='scss' scoped>
.myact-container{
  margin: 50px 100px;
    
    span {
      font-size: 16px;
      letter-spacing: 1.5px;
    }
    .actrow {
      display: flex;
      justify-content: space-between;
      margin: 50px 10px 0 10px;
    }
}
</style>