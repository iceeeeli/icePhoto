<!-- 所有小组 -->
<template>
  <div class="all-group">
    <el-card shadow="hover" :body-style="	{ padding: '0px' }">
      <div class="title">
        <span>按条件检索小组</span>
      </div>
      <div class="tabs">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
      </div>
      <div class="items">
          <span>按地区筛选：</span>
          <a href="#" v-for="tab in placeTabs" :key="tab" ref="tabed" value="tab" @click.prevent="addTag1(tab)">{{tab}}</a><br>
          <span>按标签筛选：</span>
          <a href="#" v-for="tab in classTabs" :key="tab" ref="tabed" value="tab" @click.prevent="addTag2(tab)">{{tab}}</a>
      </div>
    </el-card>
    <div class="group-cards">
      <div class="row" v-for="(cols,i) in rows" :key="i">
        <div class="group" v-for="col in cols" :key="col.creatime" style="height:110px;">
          <el-card shadow="hover" :body-style="	{ padding: '10px' }"  >
            <img :src="col.photo" alt="" width="80px" height="80px" @click.prevent="groupinto(col)">
            <div class="right">

            <span id="gtitle">{{col.name}}</span>
            <span id="gnum">{{col.user.length}}位成员</span><br>
            <span id="gcon">{{col.intro}}</span>
            </div>
          </el-card>
        </div>
      </div>
       <div class="fenye" style="text-align:center;margin:80px auto;">
        <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      placeTabs:["广州","北京","深圳","上海"],
      classTabs:["人像","人文","风光","旅拍","静物"],
      inputVisible: false,
      inputValue: "",
      rows:[],
      cols:[]
    };
  },
  computed:{
    groups(){
      return this.$store.state.Group.groups
    }
  },
  created(){
    this.getrows()
    
  },
  methods: {
    getrows(){
      var rowNum = parseInt(Math.ceil(this.groups.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.rows.push(this.groups.slice(start, end));
      }
      return;
    },
      getrows1(){
        console.log("看我")
        console.log(this.cols)
        this.rows=[]
      var rowNum = parseInt(Math.ceil(this.cols.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.rows.push(this.cols.slice(start, end));
      }
      return;
    },
    addTag1(item){
      this.dynamicTags.push(item);
      if(this.cols.length==0){
         this.groups.forEach(el => {
        if(el.city==item){
          this.cols.push(el)
        }
      });
      }
      else{
        this.cols.forEach(el => {
        if(el.city!=item){
          console.log(el)
          var i=this.cols.indexOf(el)
          this.cols.splice(i,1)
        }
      })
      }
      this.getrows1()
    },
    addTag2(item){
      this.dynamicTags.push(item);
      if(this.cols.length==0){
         this.groups.forEach(el => {
        if(el.tab==item){
          this.cols.push(el)
        }
      });
      }
      else{
        this.cols.forEach(el => {
        if(el.tab!=item){
            console.log(el)
          this.cols.splice(this.cols.indexOf(el),1)
        }
      })
      }
      this.getrows1()
    },
    handleClose(tag) {
     
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      var i=this.dynamicTags.length
      this.cols=[]
      if(i==1){
        this.groups.forEach(el=>{
        if(el.city==this.dynamicTags[0]||el.tab==this.dynamicTags[0]){
          this.cols.push(el)
        }
      })
      }else{
        this.cols=this.groups
      }
      
      
    
      this.getrows1()
    },
    groupinto(g){
      this.$router.push({name:'onegroup',params:g})
    }
  }
};
</script>
<style lang='scss' scoped>
.all-group {
  margin-bottom: 100px;
  .title {
    height: 50px;
    padding: 15px 20px;
    background-color: #f5f5f5;
    span {
      font-size: 16px;
      letter-spacing: 3px;
      font-family: auto;
      font-weight: bold;
    }
  }
  .tabs {
    padding: 5px 20px;
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
  .items{
      padding: 15px 20px;
          span {
      font-size: 16px;
      letter-spacing: 3px;
      font-family: auto;
      font-weight: bold;
      line-height: 30px;
    }
    a{
      padding:0 10px;
   
    }
  }
  .group-cards{
    margin:50px 0;
    .row{
      display:flex;
      justify-content: space-between;
      width:100%;
      height: 100px;
      margin:40px 0;
      .group{
        width:30%;
        height:115px;
           border: 1px solid #303133;
        .right{
              display: inline-block;
    position: absolute;
    margin-top: 15px;
    margin-left: 20px;
    #gtitle{

    }
    #gnum{
      margin-left:30px;
    }
    #gcon{
      line-height: 50px;
    }
        }
      }
    
    }
  }
}
</style>