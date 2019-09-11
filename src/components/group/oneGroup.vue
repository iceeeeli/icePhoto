<!-- 小组页面
 -->
<template>
  <div>
      <div class="header">
          <div class="hemain">
              <img :src="groupinfo.photo" alt="" width="150px" height="150px">
              <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="rgba(0,0,0,0.5)"
               text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">首页</el-menu-item>
                      <el-menu-item index="2">成员</el-menu-item>
                      <el-menu-item index="3">设置</el-menu-item>
              </el-menu>
              <div class="title">
                  <span id="group-title">{{groupinfo.name}}</span><br>
                  <span id="group-intro">简介：{{groupinfo.intro}}</span>
                  <el-button style="left: 20px; bottom: -5px;" v-if="usertype" @click="centerDialogVisible = true">申请加入</el-button>
              </div>
          </div>
      </div>
      <div class="content">
          <group-index v-if="index" :groupinfo="groupinfo" :type="type"></group-index>
          <group-per v-else-if="group" :groupinfo="groupinfo" :type="type"></group-per>
          <group-set v-else :groupinfo="groupinfo" :type="type" :userlist="userlist"></group-set>
      </div>
      <el-dialog
  title="申请加入该小组"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
   <el-form :model="form">
    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="form.intro" autocomplete="off" autofocus placeholder="请添加备注，方便群主查看"></el-input>
    </el-form-item>
    <el-form-item label="城市" :label-width="formLabelWidth">
      <el-input v-model="form.city" autocomplete="off" autofocus placeholder="请输入所在城市"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addgroup">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import GroupIndex from './oneGroupIndex.vue'
import GroupPer from './oneGroupPer.vue'
import GroupSet from './groupSet.vue'
export default {
  data () {
    return {
           activeIndex: '1',
           index:true,
           group:false,
           groupinfo:this.$route.params,
           type:'游客',
           usertype:true,
           userlist:'',
           centerDialogVisible: false,
           form: {
          intro: '',
          city: '',
           
        },
        formLabelWidth: '80px'
    };
  },
  components:{
      GroupIndex,
      GroupPer,
      GroupSet
  },
 created(){
    this.getlocal()
  },
  methods: {
      getlocal(){//判断登录用户在该小组的身份
      this.username=localStorage.getItem('localuser')
      this.groupinfo.user.some(el=>{
        if(el.name==this.username){
          this.userlist=el
          this.type="成员"
          this.usertype=false
        }
      })
      this.groupinfo.admin.some(el=>{
        if(el.name==this.username&&el.type=="群主"){
          this.type="群主"
          this.usertype=false
        
        }else if(el.name==this.username&&el.type=="管理员"){
          this.type="管理员"
           this.usertype=false
        }
      })
     
    },
    addgroup(){
      let date = new Date();
        let strDate = date
          .toLocaleString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "");
      var creatime=strDate
      var fromid=this.groupinfo.creatime
      var fromuserid=localStorage.getItem('userid')
      var fromname=this.username
      var city=this.form.city
      var intro=this.form.intro
      var toid=''
      this.groupinfo.admin.some(el=>{
        if(el.type=="群主"){
          toid=el.name
        }
      })
      var content="来自"+city+"的"+fromname+"请求加入"+this.groupinfo.name
      var list={creatime:creatime,fromid:fromid,userid:fromuserid,name:fromname,city:city,toid:toid,content:content,intro:intro,type:'群通知',sontype:'申请加入'}
      this.$store.commit("addNoticeFromGroup",list)
      this.centerDialogVisible=false
      this.$message({
        message:'发送成功',
        type:'success'
      })

    },
      handleSelect(key, keyPath) {
        if(key==1){
            this.index=true
            this.group=false
        }else if(key==2){
            this.group=true
            this.index=false
        }else{
            this.index=false
            this.group=false
        }
      }
  }
}

</script>
<style lang='scss' scoped>
.header{
    background-image: url('../../images/3.png');
    background-position: fixed;
    background-repeat: no-repeat;
    background-size:100% auto;
    height: 400px;
    .hemain{
        position:absolute;
        top: 340px;
        height: 62px;
        width:100%;
        padding:0 200px;
        background-color:rgba(0,0,0,0.7);
        img{
            position:absolute;
            bottom: 0;
        }
        .el-menu-demo{
            position: absolute;
            bottom:0;
            margin-left:165px;
            
        }
    }
    .title{
        position:absolute;
        bottom: 70px;
        left: 365px;
        #group-title{
                font-size: 30px;
    color: #303133;
    letter-spacing: 5px;
    font-weight: bold;
        }
        #group-intro{
                font-size: 20px;
    letter-spacing: 3px;
    line-height: 50px;
    color: #060505;
        }
    }
}
.content{
    position: relative;
    width:80%;
    margin:100px 200px;
}
</style>