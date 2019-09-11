<!-- 通知详情 -->
<template>
  <div>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>通知详情</span>
    
  </div>
  <div  class="text item">
    <h3>{{noticeinfo.content}}</h3><br>
    <h4 v-if="fromsysytm">申请人：{{noticeinfo.name}}</h4><br>
    <h4>备注：{{noticeinfo.intro}}</h4><br>
    <h4>时间：{{noticeinfo.creatime}}</h4><br>
    <el-button  type="primary" v-if="fromsysytm" @click="sure">确认并同意</el-button>
    <el-button  type="primary" v-if="fromsixin" @click="backsixin">回 复</el-button>
    <el-button   type="info" v-if="fromsysytm" @click="centerDialogVisible=true">驳回</el-button>
  </div>
</el-card>
<!-- 群通知-申请加入被驳回时触发 -->
 <el-dialog
  title="请求驳回"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
   <el-form :model="form">
    <el-form-item label="" :label-width="formLabelWidth">
      <el-input v-model="form.intro" autocomplete="off" type="textarea" autofocus placeholder="请输入驳回理由"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="nosure">确 定</el-button>
  </span>
</el-dialog>
<!-- 回复私信时触发 -->
<el-dialog
  title="回复私信"
  :visible.sync="centerDialogVisible1"
  width="30%"
  center>
   <el-form :model="form">
    <el-form-item label="" :label-width="formLabelWidth">
      <el-input v-model="form.intro" autocomplete="off" type="textarea" autofocus :placeholder="placeholder"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="sendsixin">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
        fromsixin:false,
        fromsysytm:false,
        noticeinfo:this.$route.params,
        centerDialogVisible:false,
        centerDialogVisible1:false,
        form:{
            intro:''
        },
        placeholder:'请输入回复理由'
    };
  },
    mounted(){
        this.fromtype()
    },
  methods: {
      fromtype(){
          var id=this.noticeinfo.creatime
          if(this.noticeinfo.type=="群通知"&&this.noticeinfo.sontype=="申请加入"){
              this.fromsysytm=true
              this.$store.commit('readNotice',{id:id,type:'system'})
          }else if(this.noticeinfo.type=="群通知"&&this.noticeinfo.sontype=="驳回加入"){
             this.$store.commit('readNotice',{id:id,type:'system'})
          }else if(this.noticeinfo.type=="群通知"&&this.noticeinfo.sontype=="群公告"){
             this.$store.commit('readNotice',{id:id,type:'system'})
          }else if(this.noticeinfo.type=="私信"){
            this.fromsixin=true
             this.$store.commit('readNotice',{id:id,type:'sixin'})
          }
          
         
      },
      sure(){
          var userid=this.noticeinfo.name
          var groupid=this.noticeinfo.fromid
          this.$store.commit("addGroup", { id: userid, groupid: groupid });
          this.$notify({
              title: "成功",
              message: "用户添加至小组成功！",
              type: "success",
              offset: 80,
              duration: 1500
            });
      },
      nosure(){
        var n={creatime:'',fromid:'',toid:'',content:'',intro:'',type:'群通知',ifread:false,sontype:"驳回加入"}
         let date = new Date();
        let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
        n.creatime=strDate
        n.fromid=localStorage.getItem('localuser')
        n.toid=this.noticeinfo.name
        n.intro=this.form.intro
        n.content="您的 ‘‘"+this.noticeinfo.content+"’’ 申请被驳回，理由如下"+this.form.intro
        this.$store.commit('sendSixinNotice',n)
        this.centerDialogVisible = false
        this.form.intro=''
        this.$message({
          message:'发送成功！',
          type:'success'
        })
      },
      backsixin(){
        this.placeholder="回复"+this.noticeinfo.fromid
        this.centerDialogVisible1=true
      },
      sendsixin(){
        if(this.form.intro.trim().length===0){
        this.$message({
          message:'请输入私信内容',
          type:'warning'
        })
      }else{
        var m={creatime:'',fromid:'',toid:'',content:''}
        var n={creatime:'',fromid:'',toid:'',content:'',intro:'',type:'私信',ifread:false}
        let date = new Date();
        let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
        n.creatime=m.creatime=strDate
        var username=n.fromid=m.fromid=localStorage.getItem('localuser')
        n.intro=n.fromid+"给您回了私信"
        n.content=m.content=this.form.intro
        var toid=n.toid =this.noticeinfo.fromid
        this.$store.commit('sendSixin',{toid:toid,mess:m})
        this.$store.commit('sendSixinNotice',n)
        this.$store.commit('getMySystemNotices1',username)
        this.centerDialogVisible1 = false
        this.form.intro=''
        this.$message({
          message:'发送成功！',
          type:'success'
        })
      }
      }
  }
}

</script>
<style lang='scss' scoped>
.text {
    font-size: 18px;
    text-align: center;
  }

  .item {
    margin-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 580px;
    margin-left:120px;
  }
</style>