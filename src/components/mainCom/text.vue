<template>
  <div class="getart-container">
      <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-input
  type="textarea"
  :rows="4"
  :placeholder="placeholder"
  v-model="textarea"
  width="100%">
</el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendSixin">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      centerDialogVisible:false,
      placeholder:'',
      textarea:''
    };
  },
  computed:{
    sixin(){
      return this.$store.state.Userlists.sixin
    },
  },
  created(){
    this.ifSixin()
  },
  methods: {
    ifSixin(){
      var local=localStorage.getItem('localuser')
      if(this.sixin.toid===local){
        this.centerDialogVisible=true
        this.placeholder="私信@"+this.sixin.toid
      }
    },
    sendSixin(){
      if(this.textarea.trim().length===0){
        this.$message({
          message:'请输入私信内容',
          type:'warning'
        })
      }else{
        var m=this.sixin
        var n={creatime:'',fromid:'',toid:'',content:'',intro:'',type:'私信',ifread:false}
        n.creatime=m.creatime
        var username=n.fromid=m.fromid=localStorage.getItem('localuser')
        n.intro=n.fromid+"给您发了私信"
        n.content=m.content=this.textarea
        var toid=n.toid =this.sixin.toid
        this.$store.commit('sendSixin',{toid:toid,mess:m})
        this.$store.commit('sendSixinNotice',n)
        this.$store.commit('getMySystemNotices1',username)
        this.centerDialogVisible = false
        this.$message({
          message:'发送成功！',
          type:'success'
        })
      }
    }
  }
};
</script>

<style lang="scss">
.getart-container {
}
</style>

