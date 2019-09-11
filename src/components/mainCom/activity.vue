<!-- 活动页面 -->
<template>
  <div>
    <div class="header">
          <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="item in actLists.slice(0,4)" :key="item.id">
        <img :src="item.photo" alt width="100%" @click="toactinfo(item)">
      </el-carousel-item>
    </el-carousel>
    </div>
    <el-col :span="20" :offset="2" class=main>
      <span @click.prevent="actstate('进行中')">进行中</span><span>/</span>
      <span @click.prevent="actstate('已结束')">已结束</span>
           <div class="actrow" v-for="(rows,index) in actrows" :key="index">
        <!-- 每一张图片区域 -->
        <div class="actInfo" v-for="(act,index) in rows" :key="index">
          <!-- 图片 -->
          <div class="act-box">
            <router-link :to="{name: 'actinfo',params:act}">
              <el-card shadow="always" :body-style="{ padding: '0px' }">
                <div class="card" style=" height:280px; width: 400px;">
                  <act-card :actinfo="act"></act-card>
                </div>
              </el-card>
            </router-link>
          </div>
        </div>
      </div>
      <div class="fenye" style="text-align:center;margin:80px auto;">
     <el-button type="info" v-if="more" @click="more=!more">加载更多</el-button>
      <span v-else>没有更多了~~</span>
      </div>
    </el-col>

  </div>
</template>

<script>
import ActCard from "@/subcomponents/actCard.vue";
export default {
  data() {
    return {
       actrows: [],
       actLists:[],
       more:true
    };
  },
  computed:{
    acts(){
      return this.$store.state.actLists
    }
  },
  components: {
    ActCard,
    
  },
  mounted: function() {
    this.actstate('进行中')
    console.log(this.acts)
  },
  methods: {
    
    changeAct() {
      this.actrows=[]
      var rowNum = parseInt(Math.ceil(this.actLists.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.actrows.push(this.actLists.slice(start, end));
      }
      return;
    },
    actstate(i){
      this.actLists=[]
      this.acts.forEach(el => {
        if(el.state==i){
          this.actLists.push(el)
        }
      });
      this.changeAct();
    },
    toactinfo(act){
      this.$router.push({name:'actinfo',params:act})
    }
  }
};
</script>
<style lang='scss' scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.main{
  margin-top:50px;
  margin-bottom: 50px;
  span{
    font-size: 16px;
    letter-spacing: 5px;
    padding:0 10px;
  }
 .actrow {
      display: flex;
      justify-content: space-between;
      margin: 50px 10px 0 10px;
    }
}

</style>