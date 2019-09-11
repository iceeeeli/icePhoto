<!-- 这是我的小组 -->
<template>
  <div class="my-group">
     <el-card shadow="always" :body-style="	{ padding: '100px' }" v-if="joingroup">
       <span v-if="joingroup">你还没有加入任何小组，去找找有意思的小组吧</span>
    </el-card>
    <el-tabs v-model="editableTabsValue" type="border-card" @tab-click="handleClick">
     <el-tab-pane
    v-for="(item, i) in editableTabs"
    :key="i"
    :label="item.title"
    :name="item.name"
  >
  <span v-if="creatgroup" class="nogroup">你还没有加入任何小组，去找找有意思的小组吧</span>
   <span v-if="admingroup" class="nogroup">你还没有创建或管理任何小组，去创建有意思的小组吧</span>
    <div class="group-cards" v-if="groups">
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
     </div>
  </el-tab-pane>
  </el-tabs>
     
  </div>
</template>

<script>
export default {
  data () {
    return {
          editableTabsValue: '1',
         editableTabs: [{
          title: '加入的小组',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: '管理的小组',
          name: '2',
          content: 'Tab 2 content'
        }],
      joingroup:false,
      rows:[],
      createdgroup:[],
      creatgroup:false,
      admingroup:false,
      groups:true
    };
  },
  props:["mygroups"],
    mounted(){
     this.getcreatgroup()
     this.handleClick()
    this.getrows(this.mygroups)
    
  },
  methods: {
     handleClick(tab, event) {
        if(this.editableTabsValue==1){
          if(this.mygroups.length==0){
            this.creatgroup=true
            this.admingroup=false
            this.groups=false
          }else{
            this.groups=true
            this.creatgroup=false
            this.admingroup=false
            this.getrows(this.mygroups)
          }
        }else{
          if(this.createdgroup.length==0){
            this.admingroup=true
            this.groups=false
            this.creatgroup=false
          }else{
            this.groups=true
            this.creatgroup=false
            this.admingroup=false
            this.getrows(this.mygroups)
          }
           this.getrows(this.createdgroup)
        }
      },
      getcreatgroup(){
         var username=localStorage.getItem('localuser')
         this.mygroups.some(el=>{
           el.admin.some(al=>{
             if(al.name==username){
               this.createdgroup.push(el)
             }
           })
         })
      },
       getrows(groups){
         this.rows=[]
      var rowNum = parseInt(Math.ceil(groups.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.rows.push(groups.slice(start, end));
      }
      return;
    },
      groupinto(g){
      this.$router.push({name:'onegroup',params:g})
    }
  }
}

</script>
<style lang='scss' scoped>
.my-group{

  margin-bottom:100px;
  .nogroup{
    display: block;
    margin:50px;
  }
}
  .group-cards{
    margin:50px 0;
    .row{
      display:flex;
      justify-content: space-around;
      width:100%;
      height: 100px;
      margin:40px 0;
      .group{
        width:30%;
        height:110px;
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
</style>