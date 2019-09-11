<!-- 小组馈列表 -->
<template>
  <div>
    <h3>小组列表</h3>
    <br>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="groups"
      style="width: 100%"
      max-height="600"
      highlight-current-row
      @current-change="handleCurrentChange"
      stripe
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="小组名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <br>
            <el-form-item label="小组ID">
              <span>{{ props.row.creatime }}</span>
            </el-form-item>
            <el-form-item label="创建者">
              <span>{{ props.row.admin[0].name }}</span>
            </el-form-item>
            <el-form-item label="小组描述">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
            <br>
            <el-form-item label="所在城市">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <br>
            <el-form-item label="小组标签">
              <span>{{ props.row.tab }}</span>
            </el-form-item>
            <br>
            <el-form-item label="成员数">
              <span>{{ props.row.user.length }}</span>
            </el-form-item>
            <el-form-item label="管理员数">
              <span>{{ props.row.admin.length }}</span>
            </el-form-item>
             <el-form-item label="动态数">
              <span>{{ props.row.Dyinfo.length }}</span>
            </el-form-item>
            <el-form-item label="话题头像">
              <a :href="props.row.photo" download>附件</a>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="小组ID" sortable prop="creatime" width="150"></el-table-column>
      <el-table-column label="小组名称" width="180" prop="name"></el-table-column>
      <el-table-column label="创建者" width="70" prop="admin[0].name"></el-table-column>
      <el-table-column label="描述" width="180" prop="intro"></el-table-column>
      <el-table-column label="成员数" width="120" prop="user.length"   sortable></el-table-column>
      <el-table-column
        prop="tab"
        label="标签"
        width="100"
        :filters="[{ text: '人像', value: '人像' }, { text: '风光', value: '风光' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tab === '人像' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tab}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市"
        width="120"
        :filters="[{ text: '广州', value: '广州' }, { text: '北京', value: '北京' }, { text: '深圳', value: '深圳' }, { text: '上海', value: '上海' }]"
        :filter-method="filterHot"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.city === '广州' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.city}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="200">
        <template slot="header">
          <span>操作</span>
        </template>
        <template slot-scope="props">
          
          <el-button size="mini" type="danger" @click="handleDelete(props.$index,props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>

<script>
import { setTimeout } from "timers";
import UpLoad from "@/subcomponents/uploadface.vue";
export default {
  data() {
    return {
      currentRow: "",
      search: "",
      dialogFormVisible: false,
      form: "",
      formindex: null,
      formLabelWidth: "120px",
      ifupload: true,
      creatform: {
        creatime: "",
        author: "",
        title: "",
        intro: "",
        tag: "",
        photo: "img/upload.jpg",
        read: 0,
        arts: []
      },
      update: true
    };
  },
  computed: {
    talks() {
      return this.$store.state.talks;
    },
    groups(){
      return this.$store.state.Group.groups
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
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.tab === value;
    },
    filterHot(value, row) {
      return row.city === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    
    handleDelete(index, row) {
      this.$alert("确认要删除该小组？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.groups.splice(index, 1);
          this.$message({
            message: "删除小组成功",
            type: "success"
          });
        }
      });
    },
  }
};
</script>
<style lang='scss' scoped>