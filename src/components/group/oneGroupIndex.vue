<!-- 小组页面首页 -->
<template>
  <div class="group-index">
        
    <el-card shadow="always" :body-style="	{ padding: '0px' }" class="group-hoster" ref="host">
      <div class="hoster" v-for="item in hosters" :key="item.userid">
        
         <el-popover placement="right-start" width="300px" trigger="hover"  style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;">
              <author-card :username="item.name"></author-card>
              <a href="#" slot="reference">
               <img :src="item.touxaing" alt="" width="100px">
              </a>
            </el-popover>
        <div class="intro">
            <span id="name">{{item.type}}:{{item.name}}</span><br>
            <span id="sign">个性签名：</span><br>
            <span id="sign-con">{{item.intro}}</span>
        </div>
      </div>
    </el-card>
    <div class="group-content">
       <el-card shadow="hover" :body-style="	{ padding: '20px' }" class="per-card">
         <h4>群通知</h4><br>
         <el-tag type="danger">管理员有话要说：{{groupinfo.tell}}</el-tag>
       </el-card><br>
        <group-card v-for="item in ListsPage" :key="item.id" style="margin-bottom:50px;" :info="item" :groupinfo="groupinfo" :type="type"></group-card>
    </div><br>
       <div class="more" style="text-align:center;margin-top:20px;">
      <el-button type="info" v-if="more" @click="getMore">加载更多</el-button>
      <span v-else>没有更多了~~</span>
    </div>
  </div>
</template>

<script>
import GroupCard from '@/subcomponents/conCard.vue'
import AuthorCard from '../photoInfo/authorCard.vue'
export default {
  data () {
    return {
        hosters:[
        ],
        more:true,
        page:5,
        ListsPage:[]
    };
  },
  components:{
      GroupCard,
      AuthorCard
  },
  props:["groupinfo","type"],
  created(){
    this.hosters=this.groupinfo.admin
    this.getPhotoPage()
  },
  mounted(){
   
  },
  methods: {
    getPhotoPage(){
      var j=this.page
      this.ListsPage=this.groupinfo.Dyinfo.slice(0,j)
    },
    getMore(){
      this.page+=5
      if(this.page===this.groupinfo.Dyinfo.length){
        this.getPhotoPage()
        return this.more=false
      }else if(this.page>this.groupinfo.Dyinfo.length){
        this.page=this.groupinfo.Dyinfo.length
        this.getPhotoPage()
        return this.more=false
      }else{
        this.getPhotoPage()
      }  
    },
  }
}

</script>
<style lang='scss' scoped>
.group-index{
  margin-bottom: 100px;
  display: flex;
  justify-content: flex-start;
  .group-hoster{
      width: 25%;
      height:100%;
      padding:30px 20px;
      .hoster{
          display: flex;
          justify-content: flex-start;
          height:150px;
          align-items: center;
          padding-left:10px;
          margin:10px auto;
          border:1px solid;
          img{
              box-shadow: 1px 1px 1px 2px #eee;
              height:120px;
              margin-right:10px;
          }
              .intro{
                  #name{
                          line-height: 40px;
    font-size: 16px;
    letter-spacing: 5px;
                  }
                  #sign{
                          line-height: 40px;
    font-size: 16px;
    letter-spacing: 5px;
                  }
                  #sign-con{
                          line-height: 40px;
    font-size: 16px;
    letter-spacing: 5px;
                  }
              }
          

      }
  }
  .group-content{
      margin-left:20px;
      width: 70%;

  }
  .more{
    position: absolute;
    bottom: -30px;
    left: 500px;
  }
}
</style>