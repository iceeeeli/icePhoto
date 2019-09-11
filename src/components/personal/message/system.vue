<!-- 系统 -->
<template>
  <div >
      <el-row class="Nav">
      <el-col :span="12" :offset="10">
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
        { Tagname: "私信", id: 1, router: {name:'sixin'} },
        { Tagname: "通知", id: 2, router: {name:'notice'} },
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