<!-- 意见反馈列表 -->
<template>
  <div>
    <h3>文章作品列表</h3><br>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
 
       <el-table
       ref="filterTable"
    :data="arts"
    style="width: 100%"
     max-height="600"
     highlight-current-row
    @current-change="handleCurrentChange"
    stripe>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="文章ID">
            <span>{{ props.row.id }}</span>
          </el-form-item><br>
          <el-form-item label="发布日期">
            <span>{{ props.row.creatime }}</span>
          </el-form-item>
          <el-form-item label="作者">
            <span>{{ props.row.name }}</span>
          </el-form-item><br>
          <el-form-item label="标题">
            <span>{{ props.row.title }}</span>
          </el-form-item><br>
          <el-form-item label="描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item><br>
          <el-form-item label="点赞数">
            <span>{{ props.row.belike }}</span>
          </el-form-item><br>
          <el-form-item label="收藏数">
            <span>{{ props.row.behide }}</span>
          </el-form-item>
          <el-form-item label="评论数">
            <span>{{ props.row.arguelength }}</span>
          </el-form-item>
          <el-form-item label="浏览量">
            <span>{{ props.row.read }}</span>
          </el-form-item><br>
            <el-form-item label="标签">
            <span v-for="(item,i) in props.row.tag" :key="i">{{item}}</span>
          </el-form-item>
          <el-form-item label="类别">
            <span>{{ props.row.tag }}</span>
          </el-form-item>
          <el-form-item label="参与话题">
            <span>{{ props.row.talk}}</span>
          </el-form-item><br>  
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      fixed
       sortable
      prop="id"
      width="70">
    </el-table-column>
    <el-table-column
      prop="creatime"
      label="日期"
      sortable
      width="100"
      column-key="creatime"
      :filters="[{text: '2019.06.05', value: '2019.06.05'},]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      label="作者"
       width="80"
      prop="name">
    </el-table-column>
    <el-table-column
      label="点赞数"
       width="80"
      prop="belike">
    </el-table-column>
    <el-table-column
      label="收藏数"
       width="80"
      prop="behide">
    </el-table-column>
    <el-table-column
      label="评论数"
       width="80"
      prop="arguelength">
    </el-table-column>
    <el-table-column
        prop="read"
        label="浏览量"
        width="120"
        sortable
        :filters="[{ text: 100, value: 100 }, { text: 10, value: 10 }]"
        :filter-method="filterHot"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.read > 10 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.read}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      label="参与话题"
       width="120"
      prop="talk">
    </el-table-column>
    <!-- <el-table-column
      prop="tag"
      label="状态"
      width="80"
      :filters="[{ text: '推荐', value: '推荐' }, { text: '精选', value: '精选' }, { text: '最新', value: '最新' }, { text: '人文', value: '人文' }
      , { text: '人像', value: '人像' }, { text: '风光', value: '风光' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === ('推荐'||'精选'||'最新') ? 'warning' : 'primary'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column> -->
    <el-table-column
      fixed="right"
       width="250">
      <template slot="header" >
        <span>操作</span>
      </template>
      <template slot-scope="props">
        <el-button
          size="mini" type="primary"
          @click="handleLook(props.$index,props.row)">
          查看详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(props.$index,props.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import UpLoad from "@/subcomponents/uploadface.vue";
export default {
  data () {
    return {
        currentRow:'',
        search: '',
        dialogFormVisible: false,
        form: { id: '',tag:'' },
        formindex:null,
        formLabelWidth: '120px',
        ifupload:true,
        creatform:{ id: '',tag:'' },
        update:true,
        hot:"不推荐",
        types:["推荐","精选","最新","人像","人文","风光"]
    };
  },
  computed:{
    arts(){
      return this.$store.state.arts
    }
  },
  components: {
    UpLoad
  },
  methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
       resetDateFilter() {
        this.$refs.filterTable.clearFilter('creatime');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHot(value, row) {
      return row.read >= value;
    },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleLook(index,row){
        this.$router.push({name: 'talkcon',params:{art:row}})
      },
      handleEdit(index,row){
        this.dialogFormVisible=true
        this.form.id=row.id
        this.form.tag=row.tag
        this.formindex=index
      },
      handleDelete(index,row){
         this.$alert("确认要删除该文章？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.arts.splice(index,1)
           this.$message({
          message: '删除成功',
          type: 'success'
           })
        }}) 
      },
    // sure(form){
    //    this.$alert("确认要修改图片推荐信息？", "确认修改", {
    //     confirmButtonText: "确定",
    //     callback: action => {
    //       var i=this.formindex
    //       this.imgs[i].tag=form.tag
    //       this.$store.commit('updateImgTagFromAdmin',{i:i,tag:form.tag})
    //       var newimg=this.imgs[i]
    //       if(this.hot==="推荐"){
    //         alert("推荐")
    //         this.$store.commit('imgToIndexFromAdmin',{i:i,list:newimg})
    //       }
         
          
    //        this.dialogFormVisible = false
    //        this.$message({
    //       message: '修改成功',
    //       type: 'success'
    //        })
    //     }
    //    }) 
    // },
  }
}

</script>
<style lang='scss' scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .groupicon {
      position: relative;
      width: 268px;
      z-index: 10;
      cursor: pointer;
      transition: all 0.6s;
      .zhezhao {
        position: absolute;
        z-index: -1;
        top: 0;
        width: 100%;
        height: 148px;
        background-color: #eee;
        label {
          display: block;
          margin-top: -120px;
          color: #f6e563fa;
        }
        .el-upload {
          .el-upload--picture-card {
            width: 100px;
          }
        }
      }  
  }
  .groupicon:hover {
      // transform: scale(1.4);
      .zhezhao {
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
   
</style>