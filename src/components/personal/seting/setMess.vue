<!-- 设置：修改个人信息 -->
<template>
  <div>
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
  data() {
    return {
      titles: [
        { Tagname: "资料", id: 1, name: "/home/setmess/mydata" },
        { Tagname: "账号与密码", id: 2, name: "/home/setmess/namepass" },
        { Tagname: "设置", id: 3, name: "/home/setmess/set" },
        { Tagname: "黑名单", id: 4, name: "/home/setmess/blacklist" }
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