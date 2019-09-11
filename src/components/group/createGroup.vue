<!-- 创建小组 -->
<template>
  <div class="my-group">
    <el-card shadow="always" :body-style="	{ padding: '0px' }" class="create">
      <div class="title">
        <span>创建小组</span>
      </div>
      <div class="form">
        <el-form label-width="80px">
          <el-form-item label="小组名称">
            <el-input v-model="formLabelAlign.name" placeholder="请输入小组名称"></el-input>
            <br>
            <span>名称应当明确指出小组定位，过于诗意的名字不容易让人理解</span>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="formLabelAlign.intro" type="textarea" placeholder="请输入小组简介"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="formLabelAlign.city" placeholder="请输入小组所在城市"></el-input>
          </el-form-item>
          <el-form-item label="主题">
            <el-input v-model="formLabelAlign.tab" placeholder="请输入题材或风格"></el-input>
            <span>请选择小组头像：</span>
            <up-load style="margin-bottom:10px;"></up-load>
            <el-button type="primary" @click="open">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="always" :body-style="	{ padding: '0px' }" class="intro">
      <div class="title">
        <span>什么是小组？</span>
      </div>
      <span v-if="joingroup">
        小组是一种摄影组织
        <br>可以是学校摄影社团
        <br>可以是城市摄影家协会
        <br>可以是摄影QQ群
        <br>可以是城市+主题(如北京胡同)
        <br>可以是城市+器材(如上海大画幅、成都胶片)
      </span>
    </el-card>
  </div>
</template>

<script>
import UpLoad from "@/subcomponents/uploadface.vue";
export default {
  data() {
    return {
      joingroup: true,
      formLabelAlign: {
        name: "",
        city:"",
        intro:"",
        tab: ""
      },

    };
  },
    computed:{
    src(){
      return this.$store.state.artimg
    },
    talk(){
      return this.$store.state.talk
    },
    users(){
      return this.$store.state.Userlists.userlists
    }
  },
  components: {
    UpLoad
  },
  methods: {
    open(){
     
      if (this.formLabelAlign.name.length===0||this.formLabelAlign.intro.length===0||this.src.length===0) {
        this.$notify.error({
          title: "错误",
          message: "请完整编辑表单！",
          offset: 80,
          duration: 1500
        });
      } else {
        var username=localStorage.getItem('localuser')
        var userid=localStorage.getItem('userid')
        var u = { intotime: '', userid: '', touxaing: '', name: '', city: '', intro: '', type: '群主', iftell: true }
        u.userid=userid
        this.users.some(el => {
            if (el.name == username) {
                u.touxaing = el.touxaing
                u.name = el.name
                u.city = el.city
                u.intro = el.intro
            }
        })
        var list={creatime:'',name:'',intro:'',city:'',tab:'',photo:'',tell:'',user:[],admin:[],Dyinfo:[]}
        let date = new Date();
        let strDate = date
            .toLocaleString()
            .replace(/[年月]/g, "-")
            .replace(/[日上下午]/g, "");
        u.intotime=list.creatime=strDate
        list.name=this.formLabelAlign.name
        list.intro=this.formLabelAlign.intro
        list.city=this.formLabelAlign.city
        list.tab=this.formLabelAlign.tab
        list.photo=this.src
        list.user.push(u)
        list.admin.push(u)
        this.$store.commit('createGroup',list)
        this.$notify({
          title: "成功",
          message: "创建小组成功！",
          type: "success",
          offset: 80,
          duration: 1500
        });
        var g=list
        this.$router.push({name:'onegroup',params:g})
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.my-group {
  text-align: center;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
  .title {
    background-color: #f5f5f5;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px;
      letter-spacing: 3px;
      font-weight: bold;
    }
  }
  .create {
    width: 75%;
    .form {
      margin: 30px 30px;
    }
  }
  .intro {
    width: 23%;
    height: 230px;
    span {
      font-size: 15px;
      letter-spacing: 2px;
      line-height: 25px;
    }
  }
}
</style>