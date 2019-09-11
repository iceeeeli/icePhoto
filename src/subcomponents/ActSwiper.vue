<template>
  <el-carousel :interval="0" arrow="always" height="250px">
    <el-carousel-item v-for="(items,index) in rowLists" :key="index"
    style="display:flex;  justify-content: space-between; padding:25px 90px;">  
            <img v-for="img in items" :key="img.id" :src="img.photo" style="height:200px;" @click="toactinfo(img)">
            
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data () {
    return {
         imgLists: [
        {
          src: require("../images/3.png"),
          id: 1,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 2,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 3,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 4,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 5,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 6,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 7,
          content:"趣味大赛"
        },
        {
          src: require("../images/3.png"),
          id: 8,
          content:"趣味大赛"
        }
      ],
      rowLists:[],
    };
  },
    computed:{
    actLists(){
      return this.$store.state.actLists
    }
  },
  mounted: function() {
    this.changeRow();
   
  },
  methods: {
          changeRow() {
      var rowNum = parseInt(Math.ceil(this.actLists.length / 4));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
       var start = i * 4;
        var end = start + 4;
        this.rowLists.push(this.actLists.slice(start, end));
      }
      return;
    },
        toactinfo(act){
      this.$router.push({name:'actinfo',params:act})
    }
  }
}

</script>
<style lang='scss' scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
   
  }
  
  .el-carousel__item {
    background-color: #303133;
  }
  
</style>
