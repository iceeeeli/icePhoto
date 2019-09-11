<!-- 黑名单 -->
<template>
  <div class="blacklist">
     <el-card shadow="always" :body-style="{ padding: '0px' }" class="base">
       <el-table
      :data="usermess.backs"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="creatime"
        label="拉黑日期"
        width="200">
      </el-table-column>
      <el-table-column
      align="center"
      width="200">
      <template slot="header">
        <span>操作</span>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">拉回</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
     </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

   computed: {
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    },
  },
  created() {
    this.getMyMess();
  },

  methods: {
    getMyMess() {
      this.userid = localStorage.getItem("userid");
      this.$store.commit("getUserMess", this.userid);
    },
     handleEdit(index, row) {
         this.$alert("确认要拉回该用户？", "确认拉回", {
        confirmButtonText: "确定",
        callback: action => {
          this.usermess.backs.splice(index,1)
           this.$message({
          message: '拉回用户成功',
          type: 'success'
           })
        }}) 
      },
      handleDelete(index, row) {
        this.$alert("确认要删除该用户？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.usermess.backs.splice(index,1)
           this.$message({
          message: '删除用户成功',
          type: 'success'
           })
        }}) 
      }
    }
}

</script>
<style lang='scss' scoped>
.blacklist{
  margin:20px 200px;
  .base{
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>