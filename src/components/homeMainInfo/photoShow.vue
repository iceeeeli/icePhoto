<!-- 社区页面中的图片展示 -->
<template>
  <div class="photo-show-container">
    <!-- 大盒子 -->
    <div class="photoArea">
      
      
      <div class="row" v-for="(rows,index) in rowLists" :key="index">
       
        <div class="photoInfo" v-for="(img,index) in rows" :key="index">
         
          <div class="img-box">
            <router-link :to="{name: 'photoInfo',params:img}">
            <img :src="img.src[0]" style="height:300px;">
            </router-link>
          </div>
    
          <div class="author">
            <div class="left">
              <img :src="img.author" alt style="width:30px;">
              &nbsp;
              <span>author</span>
            </div>
            <div class="right">
              <img src="@/assets/icon1/dianzan.svg" alt="点赞" title="点赞" style="width:30px;" 
              v-if="img.like" @click.prevent="like(img.id)">
              <img src="@/assets/icon1/dianzansucc.svg" alt="取消点赞" title="取消点赞" style="width:30px;" 
              v-else @click.prevent="unlike(img.id)">
              &nbsp;&nbsp;
              <img src="@/assets/icon1/shoucan.svg" alt="收藏" title="收藏" style="width:30px;" 
              v-if="img.hide" @click.prevent="hide(img.id)">
              <img src="@/assets/icon1/shoucansucc.svg" alt="取消收藏" title="取消收藏" style="width:30px;" 
              v-else @click.prevent="unhide(img.id)">
            </div>
          </div>
        </div>
      </div>
      <div class="more" style="text-align:center;margin-bottom:50px;">
        <el-button type="primary" @click="getMore" v-if="more">加载更多</el-button>
        <p v-else>没有更多了~~~</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rowLists:[],
      imgListsPage:[],
      rows:2,
      more:true,
    };
  },
  props:['imgTag'],
  mounted:function(){
   this.getImageRows()
  },
 computed:{
    // id(){
    //   return this.$route.params
    // },
    imgLists(){
      return this.$store.state.imgTag
    },

  },

  // mounted:function(){
  //   this.getImageRows()
  //   console.log(this.imgLists)
  // },
// watch: {
//     '$route' (to, from) {
//         if(to.params.id === 'post'){
//            alert('11')
//         }
//     }
// },
  // beforeRouteUpdate (to, from, next) {
  //     var ids = to.params.id
  //     this.getPost(ids)
     
  //     next()
  // },
  methods: {
    // getPost(postId){
    //    this.$store.commit('imgTag',postId)
    //   this.getImageRows()
    // },
    changeRow2() {
      var rowNum= this.rows
      for (var i = 0; i < rowNum; i++) {
        var start =i*4;
        var end =start+4
        this.rowLists.push(this.imgListsPage.slice(start,end))
      }
      return;
    }, 
    like(id){
      if(this.$store.state.login){
        this.$store.commit('like',id)
      }else{
        alert("请先登录！")
      }      
    },
    unlike(id){
      this.$store.commit('unlike',id)
    },
    hide(id){
      if(this.$store.state.login){
        this.$store.commit('hide',id)
      }else{
        alert("请先登录！")
      }      
    },
    unhide(id){
      this.$store.commit('unhide',id)
    },
    getImageRows(){
      this.$store.commit('imgTag',this.imgTag)
      var j=this.rows*4
      this.imgListsPage=this.imgLists.slice(0,j)
      this.rowLists=[]
      this.changeRow2()
    },
    getMore(){
      this.rows+=2
      var a=this.rows*4
      var length=this.imgLists.length
      if(a>=length){
        this.rows=parseInt(Math.ceil(length/4));  
        this.more=false
        this.getImageRows()
      }else{
        this.getImageRows()
      }
    },
  },

};
</script>
<style lang='scss' scoped>
.photo-show-container {
  margin: 0px;
  .row {
    display: flex;
    justify-content: space-between;
    margin: 50px 0;
    
    .img-box {
      position: relative;
      overflow: hidden;
      img {
        cursor: pointer;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.4);
      }
    }
    .author {
      
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      height: 50px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .left{
        span{
          position: relative;
          bottom: 30%;
        }
      }
      .right{
        img{
          cursor: pointer;
        transition: all 0.6s;
        }
        img:hover {
        transform: scale(1.4);
      }
      }
    }
  }
}
</style>