<!-- 意见反馈列表 -->
<template>
  <div>
    <h3>活动列表</h3><br>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
  <el-button @click="addact">添加活动</el-button>
       <el-table
       ref="filterTable"
    :data="act"
    style="width: 100%"
     max-height="600"
     highlight-current-row
    @current-change="handleCurrentChange"
    stripe>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="活动名称">
            <span>{{ props.row.title }}</span>
          </el-form-item><br>
          <el-form-item label="开始日期">
            <span>{{ props.row.creatime }}</span>
          </el-form-item>
          <el-form-item label="结束日期">
            <span>{{ props.row.endtime }}</span>
          </el-form-item>
          <el-form-item label="主办方">
            <span>{{ props.row.author }}</span>
          </el-form-item>
          <el-form-item label="活动描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item><br>
          <el-form-item label="活动简介">
            <span>{{ props.row.intro }}</span>
          </el-form-item><br>
          <el-form-item label="活动状态">
            <span>{{ props.row.state }}</span>
          </el-form-item>
          <el-form-item label="是否推荐">
            <span>{{ props.row.hot }}</span>
          </el-form-item>
          <el-form-item label="宣传图">
            <a :href="props.row.photo" download="">附件</a>
          </el-form-item>
          
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="活动ID"
      fixed
      prop="id"
      width="125">
    </el-table-column>
    <el-table-column
      prop="creatime"
      label="开始日期"
      sortable
      width="150"
      column-key="creatime"
      :filters="[{text: '2019-05-01', value: '2019-05-01'}, {text: '2019-05-02', value: '2019-05-02'}, {text: '2019-05-03', value: '2019-05-03'}, {text: '2019-05-04', value: '2019-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
     <el-table-column
      prop="endtime"
      label="结束日期"
      sortable
      width="150"
      column-key="endtime"
      :filters="[{text: '2019-06-04', value: '2019-06-04'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      label="活动名称"
       width="150"
      prop="title">
    </el-table-column>
    <el-table-column
      label="主办方"
       width="120"
      prop="author">
    </el-table-column>
    <el-table-column
      label="简介"
       width="180"
      prop="desc">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="80"
      :filters="[{ text: '进行中', value: '进行中' }, { text: '已结束', value: '已结束' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state === '已结束' ? 'info' : 'success'"
          disable-transitions>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
     <el-table-column
      prop="hot"
      label="推荐"
      width="80"
      :filters="[{ text: '推荐', value: '推荐' },]"
      :filter-method="filterHot"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.hot === '推荐' ? 'success' : 'info'"
          disable-transitions>{{scope.row.hot}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
       width="200">
      <template slot="header" >
        <span>操作</span>
      </template>
      <template slot-scope="props">
        <el-button
          size="mini"
          @click="handleEdit(props.$index,props.row)">
          编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(props.$index,props.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑活动信息" :visible.sync="dialogFormVisible">
  <el-form :model="form" style="width:60%;">
    <el-form-item label="活动id" :label-width="formLabelWidth">
      <span>{{form.id}}</span>
    </el-form-item>
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.title"  ></el-input>
    </el-form-item>
    <el-form-item label="主办方" :label-width="formLabelWidth">
      <el-input v-model="form.author"  ></el-input>
    </el-form-item>
    <el-form-item label="开始日期" :label-width="formLabelWidth">
      <el-input v-model="form.creatime"  ></el-input>
    </el-form-item>
    <el-form-item label="结束日期" :label-width="formLabelWidth">
      <el-input v-model="form.endtime"  ></el-input>  
    </el-form-item>
    <el-form-item label="活动描述" :label-width="formLabelWidth">
      <el-input v-model="form.desc"  ></el-input>
    </el-form-item>
    <el-form-item label="活动内容" :label-width="formLabelWidth">
      <el-input v-model="form.intro"  ></el-input>
    </el-form-item>
    <el-form-item label="活动状态" :label-width="formLabelWidth">
      <el-input v-model="form.state"  ></el-input>
    </el-form-item>
    <el-form-item label="是否推荐" :label-width="formLabelWidth">
      <el-switch
  v-model="form.hot"
  active-value="推荐"
  inactive-value="不推荐"
  >
</el-switch>
    </el-form-item>
    <el-form-item label="宣传图" :label-width="formLabelWidth" class="groupicon">
       <img :src="form.photo" alt width="148px" height="148px" class="groupicon1">
          <div class="zhezhao">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/api/upload"
              method="post"
              enctype="multipart/form-data"
              :on-success="handleAvatarSuccess"
              list-type="picture-card"
              :auto-upload="true"
              width="100px"
              v-if="ifupload"
            >
              <img src="@/assets/icon1/upload2.svg" alt="上传成功">
              <label>上传图片</label>
            </el-upload>
          </div>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure(form)" v-if="update">确 定</el-button>
    <el-button type="primary" @click="create(form)" v-else>确 定</el-button>
  </div>
</el-dialog>
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
        form: '',
        formindex:null,
        formLabelWidth: '120px',
        ifupload:true,
        creatform:{ id: '', creatime: '', endtime: '', title: '', photo: 'img/upload.jpg', 
        desc: '', author: '', intro: '', state: '进行中', imglists: [],hot:'不推荐' },
        update:true
    };
  },
  computed:{
    act(){
      return this.$store.state.actLists
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
        this.$refs.filterTable.clearFilter('endtime');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.state === value;
      },
      filterHot(value, row) {
        return row.hot === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit(index,row){
        this.dialogFormVisible=true
        this.form=row
        this.formindex=index
      },
      handleDelete(index,row){
         this.$alert("确认要删除该话题？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.act.splice(index,1)
           this.$message({
          message: '删除话题成功',
          type: 'success'
           })
        }}) 
      },
       handleAvatarSuccess(res, file, fileList) {
      this.ifupload = false;
      this.form.photo = res.data;

      this.$notify({
        title: "成功",
        message: "上传图片成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    sure(form){
       this.$alert("确认要编辑该活动信息？", "确认编辑", {
        confirmButtonText: "确定",
        callback: action => {
          this.act.splice(this.formindex,1,form)
           this.dialogFormVisible = false
           this.$message({
          message: '修改活动成功',
          type: 'success'
           })
        }
       }) 
    },
    create(form){
      this.$alert("确认要编辑该活动信息？", "确认编辑", {
        confirmButtonText: "确定",
        callback: action => {
          
           this.dialogFormVisible = false
           this.$store.commit('addAct',form)
           this.creatform={ id: '', creatime: '', endtime: '', title: '', photo: 'img/upload.jpg', 
        desc: '', author: '', intro: '', state: '进行中', imglists: [] ,hot:'不推荐'},
           this.$message({
          message: '添加活动成功',
          type: 'success'
           })
        }
       }) 
    },
    addact(){
      this.form=this.creatform
      this.form.id=Date.now()
      this.dialogFormVisible=true
       this.update=false
    }
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