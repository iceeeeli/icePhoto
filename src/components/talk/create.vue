<!-- 创建话题 -->
<template>
  <div class="my-talk">
    <el-card shadow="always" :body-style="	{ padding: '0px' }" class="create">
      <div class="title">
        <span>创建话题</span>
      </div>
      <div class="form">
        <el-form  label-width="80px">
          <el-form-item label="话题名称">
            <el-input v-model="formLabelAlign.title" placeholder="请输入话题名称"></el-input><br>
                  <span>话题名称应当明确指出话题定位，过于诗意的名字不容易让人理解</span>
          </el-form-item>
    
          <el-form-item label="简介">
            <el-input v-model="formLabelAlign.intro" placeholder="请输入话题的简介，在180字内"></el-input>
          </el-form-item>
          <el-form-item label="主题">
            <el-input v-model="formLabelAlign.tag" placeholder="请输入题材或风格"></el-input>
            <span>请选择话题头像：</span>
            <up-load style="margin-bottom:10px;"></up-load>
             <el-button type="primary" @click="open">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="always" :body-style="	{ padding: '0px' }" class="intro">
      <div class="title">
        <span>什么是话题</span>
      </div>
      <span v-if="joingroup">话题是一类摄影热点<br>
可以是当下热门机型讨论<br>
可以是交流讨论圈子<br>
可以是城市+主题(如北京胡同) <br>
可以是城市+器材(如上海大画幅、成都胶片)</span>
    </el-card>
  </div>
</template>

<script>
import UpLoad from '@/subcomponents/uploadface.vue'

export default {
  data() {
    return {
      joingroup: true,
       formLabelAlign: {
          title: '',
          intro: '',
          tag: '',
        }
    };
  },
  computed:{
    src(){
      return this.$store.state.artimg
    },
    talk(){
      return this.$store.state.talk
    }
  },
    components:{
        UpLoad,
    },
  methods: {
    open(){
     
      if (this.formLabelAlign.title.length===0||this.formLabelAlign.intro.length===0||this.src.length===0) {
        this.$notify.error({
          title: "错误",
          message: "请完整编辑表单！",
          offset: 80,
          duration: 1500
        });
      } else {
        var title=this.formLabelAlign.title
        var intro=this.formLabelAlign.intro
        var tag=this.formLabelAlign.tag

        this.$store.dispatch("addTalkList",{title:title,intro:intro,tag:tag});
        this.$notify({
          title: "成功",
          message: "创建话题成功！",
          type: "success",
          offset: 80,
          duration: 1500
        });
        var talk=this.talk
        this.$router.push({name:'onetalk',params:talk});
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.my-talk {
  text-align: center;
  margin: 50px 100px;
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
    .form{
        margin: 30px 30px;
    }
  }
  .intro {
    width: 23%;
    height: 230px;
    span{
        font-size:15px;
        letter-spacing: 2px;
        line-height: 25px;
    }
  }
}
</style>