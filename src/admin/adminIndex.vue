<!-- 后台主页面 -->
<template>
  <div class="admin-index-container">
      <el-row class="tac">
           <el-col :span="4" class="nav">
      <el-menu
       router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <el-menu-item index="/adminIndex/userlists">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="/adminIndex/imgLists">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>动态管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">
              <i class="el-icon-picture"></i>图片</template>
          <el-menu-item index="/adminIndex/imgLists">图片管理</el-menu-item>
          <!-- <el-menu-item index="/adminIndex/imgIndex">首页推荐</el-menu-item> -->
        </el-menu-item-group>
        <el-menu-item-group >
            <template slot="title">
              <i class="el-icon-tickets"></i>文章</template>
          <el-menu-item index="/adminIndex/artLists">文章列表</el-menu-item>
           <!-- <el-menu-item index="/adminIndex/artManager">文章管理</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/adminIndex/actLists">
        <i class="el-icon-medal-1"></i>
        <span slot="title">活动管理</span>
      </el-menu-item>
        <el-menu-item index="/adminIndex/groupLists">
        <i class="el-icon-menu"></i>
        <span slot="title">小组管理</span>
      </el-menu-item>
      <el-menu-item index="/adminIndex/talkLists">
        <i class="el-icon-s-data"></i>
        <span slot="title">话题管理</span>
      </el-menu-item>
      <el-menu-item index="/adminIndex/notice">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">通知管理</span>
      </el-menu-item>
       <el-menu-item index="/adminIndex/advice">
        <i class="el-icon-phone"></i>
        <span slot="title">意见反馈</span>
      </el-menu-item>
       <!-- <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">退出</span>
      </el-menu-item> -->
    </el-menu>
           </el-col>
           <el-col :span="21" :offset="2" class="main-container">
               <router-view></router-view>
           </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  methods: {
       handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}

</script>
<style lang='scss' scoped>
.admin-index-container{
    width:100%;
    height: 100%;
    .tac{
        height: 100%;
        .nav{
            position: fixed;
            left:0;
            bottom:0;
            top:0;
            width:200px;
            background-color:#545c64;
            .el-menu{
                border-right:0px;
            } 
        }
        .main-container{
            margin-top:20px;
        }
    }
}
</style>