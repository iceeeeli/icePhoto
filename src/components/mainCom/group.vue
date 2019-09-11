<!-- 小组页面 -->
<template>
  <div class="group-container">
    <el-col :span="18" :offset="3" class="tag">
      
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="我的小组" name="first"><my-group :mygroups="mygroups"></my-group></el-tab-pane>
    <el-tab-pane label="所有小组" name="second"><all-group></all-group></el-tab-pane>
        <el-tab-pane label="创建小组" name="third"><create-group></create-group></el-tab-pane>
  </el-tabs>
    </el-col>

  </div>
 
</template>

<script>
import MyGroup from '../group/myGroup.vue'
import AllGroup from '../group/allGroup.vue'

import CreateGroup from '../group/createGroup.vue'
export default {
  data () {
    return {
       activeName: 'first',
       mygroups:[]
       
    };
  },
   computed:{
    groups(){
      return this.$store.state.Group.groups
    }
  },
  components:{
    MyGroup,
    AllGroup,
    CreateGroup
  },
  created(){
    this.getmygroup()
  },
  methods: {
    getmygroup(){
      var username=localStorage.getItem('localuser')
      this.groups.some(el=>{
        el.user.some(al=>{
          if(al.name==username){
            this.mygroups.push(el)
          }
        })
      })
    },
    handleClick(tab, event) {
        
      }
  }
}

</script>
<style lang='scss' scoped>
.group-container{
  .tag{
    margin-top:50px;
  }
}
</style>