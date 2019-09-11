<!-- 意见反馈 -->
<template>
  <div class="advice-container">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="意见标题">
    <el-input v-model="form.name" placeholder="请输入意见标题"></el-input>
  </el-form-item>
  <el-form-item label="意见内容">
    <el-input type="textarea" :rows="5" v-model="form.desc" placeholder="请输入意见内容"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即发送</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        var advice={id:'',creatime:'',fromid:'',toid:'system',title:'',content:'',ifcheck:false}
        let date = new Date();
        let strDate = date
          .toLocaleString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "");
        advice.id=Date.now()
        advice.creatime=strDate
        advice.fromid=localStorage.getItem('localuser')
        advice.title=this.form.name
        advice.content=this.form.desc
        this.$alert("确认要创建该通知信息？", "确认创建", {
        confirmButtonText: "确定",
        callback: action => {
          this.$store.commit('sendAdviceFromUser',advice)
          this.$message({
            message:'发送成功',
            type:'success'
          })
        }})
        
      }
    }
  }
</script>
<style lang='scss' scoped>
.advice-container{
  .el-card{
    width:50%;
    margin:70px auto;
  }
}
</style>