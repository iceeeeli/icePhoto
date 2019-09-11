<!-- 意见反馈列表 -->
<template>
  <div>
    <h3>图片作品列表</h3><br>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
 
       <el-table
       ref="filterTable"
    :data="users"
    style="width: 100%"
     max-height="600"
     highlight-current-row
    @current-change="handleCurrentChange"
    stripe>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="基本信息">
          </el-form-item><br>
          <el-form-item label="用户ID">
            <span>{{ props.row.userid }}</span>
          </el-form-item>
          <el-form-item label="注册日期">
            <span>{{ props.row.creatime }}</span>
          </el-form-item>
          <el-form-item label="用户名">
            <span>{{ props.row.username }}</span>
          </el-form-item><br>
          <el-form-item label="个人简介">
            <span>{{ props.row.intro }}</span>
          </el-form-item><br>
          <el-form-item label="详细信息">
          </el-form-item><br>
          <el-form-item label="真实姓名">
            <span>{{ props.row.realname }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span>{{ props.row.birth }}</span>
          </el-form-item><br>
          <el-form-item label="城市">
            <span>{{ props.row.city }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="邮政编码">
            <span>{{ props.row.postcode }}</span>
          </el-form-item><br>
          <el-form-item label="QQ">
            <span>{{ props.row.qq }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="Email">
            <span>{{ props.row.email }}</span>
          </el-form-item><br>
          <el-form-item label="身份证号码">
            <span>{{ props.row.IDcard }}</span>
          </el-form-item>
          <el-form-item label="是否VIP">
            <span>{{ props.row.ifvip }}</span>
          </el-form-item><br>  
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
       sortable
      prop="userid"
      width="150">
    </el-table-column>
    <el-table-column
      prop="creatime"
      label="日期"
      sortable
      width="150"
      column-key="creatime"
      :filters="[{text: '2019/5/1', value: '2019/5/1'},{text: '2019/5/2', value: '2019/5/2'},]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      label="用户名"
       width="100"
      prop="username">
    </el-table-column>
    <el-table-column
      label="所在城市"
       width="100"
      prop="city">
    </el-table-column>
    <el-table-column
      label="图片数"
       width="100"
      prop="myphoto.length">
    </el-table-column>
    <el-table-column
      label="文章数"
       width="100"
      prop="myart.length">
    </el-table-column>
    <el-table-column
      label="关注量"
       width="100"
      prop="myfocus.length">
    </el-table-column>
    <el-table-column
        prop="ifvip"
        label="VIP"
        width="100"
        sortable
        :filters="[{ text: 'VIP', value: 'VIP' }, { text: 'NO', value: 'NO' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.ifvip === 'VIP' ? 'success' : 'info'"
            disable-transitions
          >{{scope.row.ifvip}}</el-tag>
        </template>
      </el-table-column>
    <el-table-column
      fixed="right"
       width="150">
      <template slot="header" >
        <span>操作</span>
      </template>
      <template slot-scope="props">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(props.$index,props.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-dialog title="编辑图片信息" :visible.sync="dialogFormVisible" style="width:60%;margin-left:300px;">
  <el-form :model="form" style="width:90%;">
    <el-form-item label="图片id" :label-width="formLabelWidth">
      <span>{{form.id}}</span>
    </el-form-item>
    <el-form-item label="修改类型" :label-width="formLabelWidth">
          <el-select v-model="form.tag" clearable placeholder="请选择">
            <el-option v-for="(item,i) in types" :key="i" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
    <el-form-item label="是否推荐上首页" :label-width="formLabelWidth">
      <el-switch
  v-model="hot"
  active-value="推荐"
  inactive-value="不推荐"
  >
</el-switch>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure(form)" >确 定</el-button>
  </div>
</el-dialog> -->
  </div>
</template>

<script>
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

    };
  },
  computed:{
    users(){
      return this.$store.state.Userlists.userMessages
    },
  },
  created(){
    // var date=new Date()
    // var str=date.toLocaleDateString();
    // console.log(str)
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
        return row.ifvip === value;
      },
      filterHot(value, row) {
      return row.read >= value;
    },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleLook(index,row){
        this.$router.push({name: 'photoInfo',params:row})
      },
      handleEdit(index,row){
        this.dialogFormVisible=true
        this.form.id=row.id
        this.form.tag=row.tag
        this.formindex=index
      },
      handleDelete(index,row){
         this.$alert("确认要删除该用户？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.users.splice(index,1)
           this.$message({
          message: '删除用户成功',
          type: 'success'
           })
        }}) 
      },
    sure(form){
       this.$alert("确认要修改图片推荐信息？", "确认修改", {
        confirmButtonText: "确定",
        callback: action => {
          var i=this.formindex
          this.imgs[i].tag=form.tag
          this.$store.commit('updateImgTagFromAdmin',{i:i,tag:form.tag})
          var newimg=this.imgs[i]
          if(this.hot==="推荐"){
            alert("推荐")
            this.$store.commit('imgToIndexFromAdmin',{i:i,list:newimg})
          }
         
          
           this.dialogFormVisible = false
           this.$message({
          message: '修改成功',
          type: 'success'
           })
        }
       }) 
    },
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