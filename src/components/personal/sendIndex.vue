<!-- 发布首页-->
<template>
  <div class="send-main">
    <!-- 发布内容 -->
    <div class="send-container">
      <router-view></router-view>
    </div>
    <aside class="send-tag">
      <el-form ref="form" :model="form" label-width="10px">
        <el-form-item v-if="photo">
          <label class="formtype">标题</label>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item >
          <label class="formtype">描述</label>
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <label class="formtype">常用标签</label>
          <el-checkbox-group v-model="form.checkedusualsign" >
            <el-checkbox v-for="(item,index) in form.usualsign" :key="index" :label="item" name="usualsign">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <label class="formtype">推荐标签</label>
          <el-checkbox-group v-model="form.checkedpostsign">
            <el-checkbox v-for="(item,index) in form.postsign" :key="index" :label="item" name="postsign">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <label class="formtype">自定义标签</label>
          <el-input v-model="form.mysign" @blur="addsign"></el-input>
        </el-form-item>
        <el-form-item v-if="photo">
          <label class="formtype">参加活动</label>
          <el-select v-model="form.act" placeholder="请选择要参加的活动">
            <el-option v-for="(item,index) in form.acts" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item v-if="art">
          <label class="formtype" >参与话题讨论</label>
          <el-select v-model="form.talk" placeholder="请选择要参与的话题">
            <el-option v-for="(item,index) in form.talks" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item >
          <label class="formtype">同时发布在我的小组</label>
          <el-select v-model="form.group" placeholder="请选择要发布的小组">
            <el-option v-for="(item,index) in form.groups" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="send-button">
        <el-button type="warning" @click="sendphoto" v-if="photo">发送</el-button>
        <el-button type="warning" @click="sendart" v-else>发送</el-button>
      </div>
    </aside>
  </div>
</template>

<script>
import SendRight from "./sendright.vue";
const usign= ["室内人像","广州约拍","毕业跟拍","宠物","建筑",]
const psign= ["人像","广州","人文","街头","毕业",]
const acts= ["广州人像摄影大赛","广州街头摄影大赛","广州风光摄影大赛"]
const talks=["佳能摄影","手机摄影"]
export default {
  data() {
    return {
      cities: ["上海", "北京", "广州", "深圳"],
      form: {
        title: "",//标题
        acts:acts,
        act: "",//参加活动
        talks:talks,
        talk:"",
        groups:[],
        group:'',
        usualsign: usign,//常用标签
        postsign: psign,//推荐标签
        checkedusualsign: [],//常用标签
        checkedpostsign: [],//推荐标签
        mysign:"",//自定义标签
        desc: ""//描述
      },
      getact:this.$route.params.act,
      gettalk:this.$route.params.talk,
    };
  },
  computed: {
    imgList() {
      return this.$store.state.src;
    },
    photo() {
      return this.$store.state.photo;
    },
    art() {
      return this.$store.state.ifart;
    },
    content() {
      return this.$store.state.art;
    },
    groups(){
      return this.$store.state.Group.groups
    }
  },
  components: {
    SendRight
  },
  created(){
    this.getmygroup()
  },
  mounted: function() {
    this.joinact()
    this.jointalk()
    this.$store.commit("hidefoot");
  },
  methods: {
     getmygroup(){
      var username=localStorage.getItem('localuser')
      this.groups.some(el=>{
        el.user.some(al=>{
          if(al.name==username){
            this.form.groups.push(el.name)
          }
        })
      })
    },
    joinact(){
      if(typeof(this.getact)=="undefined"){
        return
      }else{
        this.form.acts.unshift(this.getact)
        this.form.act=this.getact
      }
      
    },
    jointalk(){
      if(typeof(this.gettalk)=="undefined"){
        return
      }else{
      this.form.talks.unshift(this.gettalk)
      this.form.talk=this.gettalk
      }
    },
    addsign(){
      usign.unshift(this.form.mysign)
    },
    sendphoto() {
      if (!this.imgList[0]) {
        this.$notify.error({
          title: "错误",
          message: "请选择图片！",
          offset: 80,
          duration: 1500
        });
      } else {
         var tag=this.form.checkedusualsign
           this.form.checkedpostsign.forEach(item=>{
          tag.push(item)
        })
        var form1={}
        form1.title=this.form.title
        form1.desc=this.form.desc
        form1.tag=tag
        form1.act=this.form.act
        form1.group=this.form.group
        this.$store.dispatch("addImgList",form1);
        this.$notify({
          title: "成功",
          message: "发送图片成功",
          type: "success",
          offset: 80,
          duration: 1500
        });
        this.$router.push("/home/homemain");
      }
    },
    sendart() {
       if (this.content.length===0) {
        this.$notify.error({
          title: "错误",
          message: "请编辑文章！",
          offset: 80,
          duration: 1500
        });
      } else {
        var tag=this.form.checkedusualsign
        var desc=this.form.desc
        var talk=this.form.talk
        var group=this.form.group
        this.form.checkedpostsign.forEach(item=>{
          tag.push(item)
        })
        this.$store.dispatch("addArtList",{desc:desc,tag:tag,talk:talk,group:group});
        this.$notify({
          title: "成功",
          message: "发送文章成功",
          type: "success",
          offset: 80,
          duration: 1500
        });
        this.$router.push("/home/homemain");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.send-main {
  position: relative;
  width: 100%;
  .send-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 340px;
    bottom: 0;
    height: 100%;
    padding: 20px 30px 80px 20px;
    overflow-y: auto;
  }
  .send-tag {
    width: 340px;
    height: 100%;
    min-height: 700px;
    padding: 18px 20px 140px;
    margin-left: auto;
    font-size: 13px;
    line-height: 18px;
    overflow-y: scroll;
    color: #222;
    background-color: #ebeef5;
    .formtype {
      font-size: 18px;
      letter-spacing: 3px;
    }
    .send-button {
      position: fixed;
      bottom: 0px;
      right: 0;
      z-index: 1;
      width: 340px;
      height: auto;
      text-align: center;
      .el-button {
        width: 340px;
        height: 50px;
        font-size: 20px;
        letter-spacing: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>