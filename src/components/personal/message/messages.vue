<!-- 信息 -->
<template>
  <div>
    <el-row class="tagNav">
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
            :index="title.name"
          >{{title.Tagname}}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div class="main" style="margin-bottom:280px;">
 <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        { Tagname: "互动", id: 1, name: "/home/mess/hudong" },
        { Tagname: "系统", id: 2, name: "/home/mess/system" },
      ]
    };
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.tagNav {
  width: 100%;

  padding-bottom: 0;

  font-size: 18px;
  letter-spacing: 1.5px;
margin-top:20px;
  border-bottom: solid 1px #e6e6e6;
  background-color: #fff;
  .el-menu-demo {
    border-bottom: solid 1px #fff;
    height: 66px;
    .el-menu-item.is-active {
      font-weight: bold;
    }
  }
}
</style>