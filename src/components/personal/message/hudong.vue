<!-- 互动 -->
<template>
  <div >
      <el-row class="Nav">
      <el-col :span="12" :offset="9">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          text-color="black"
          active-text-color="#303133"
        >
          <el-menu-item
            v-for="title in titles"
            :key="title.id"
            :index="title.router.name"
          >{{title.Tagname}}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div class="humain">
 <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
export default {
  data () {
    return {
     titles: [
        { Tagname: "评论", id: 1, router: {name:'argue'} },
        { Tagname: "喜欢", id: 2, router: {name:'like'} },
        { Tagname: "支持", id: 3, router: {name:'support'} },
        { Tagname: "收藏", id: 4, router: {name:'hidd'} },
      ]
    };
  },

  methods: {
     
  }
}

</script>
<style lang='scss' scoped>
.Nav{
 width: 100%;
 
 .el-menu-demo {
    border-bottom: solid 1px #fff;
 }
}
.humain{
  margin:10px 300px 210px 300px;
}
</style>