<!-- 搜索 -->
<template>
  <div class="query-container">
    <div class="header">
        <span>{{info}}</span>
    </div>
    <el-row class="tagNav">
      <el-col :span="12" :offset="8">
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
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
         titles: [
        { Tagname: "摄影师", id: 0, name: "/home/queryIndex/all" },
        { Tagname: "图片", id: 1, name: "/home/queryIndex/photo" },
        { Tagname: "文章", id: 2, name: "/home/queryIndex/art" },
        { Tagname: "活动", id: 3, name: "/home/queryIndex/act" },
        { Tagname: "话题", id: 4, name: "/home/queryIndex/talk" },
        { Tagname: "小组", id: 5, name: "/home/queryIndex/group" },
      ],
    };
  },
  computed:{
      info(){
          return this.$store.state.Query.queryInfo
      }
  },
  methods: {}
}

</script>
<style lang='scss' scoped>
.header {
  background-image: url("/img/gonggao.da7ec3e0.png");
  background-position: fixed;
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: 150px;
  span{
    display: block;
    padding: 120px auto 20px 40px;
    padding-top: 90px;
    padding-left: 90px;
    font-size: 25px;
    color: #fff;
    letter-spacing: 5px;
    font-weight: bold;
  }
}
.tagNav {
  width: 100%;

  padding-bottom: 0;

  font-size: 18px;
  letter-spacing: 1.5px;

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