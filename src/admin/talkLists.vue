<!-- 话题列表 -->
<template>
  <div>
    <h3>话题列表</h3>
    <br>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-button @click="addact">添加话题</el-button>
    <el-table
      ref="filterTable"
      :data="talks"
      style="width: 100%"
      max-height="600"
      highlight-current-row
      @current-change="handleCurrentChange"
      stripe
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="话题名称">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <br>
            <el-form-item label="活动ID">
              <span>{{ props.row.creatime }}</span>
            </el-form-item>
            <el-form-item label="创建者">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="话题描述">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
            <br>
            <el-form-item label="话题标签">
              <span>{{ props.row.tag }}</span>
            </el-form-item>
            <br>
            <el-form-item label="话题热度">
              <span>{{ props.row.read }}</span>
            </el-form-item>
            <el-form-item label="帖子数">
              <span>{{ props.row.arts.length }}</span>
            </el-form-item>
            <el-form-item label="话题头像">
              <a :href="props.row.photo" download>附件</a>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="话题ID" sortable prop="creatime" width="150"></el-table-column>
      <el-table-column label="话题名称" width="180" prop="title"></el-table-column>
      <el-table-column label="创建者" width="100" prop="author"></el-table-column>
      <el-table-column label="描述" width="180" prop="intro"></el-table-column>
      <el-table-column label="文章数" width="80" prop="arts.length"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '手机', value: '手机' }, { text: '佳能', value: '佳能' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '手机' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="read"
        label="话题热度"
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
      <el-table-column fixed="right" width="200">
        <template slot="header">
          <span>操作</span>
        </template>
        <template slot-scope="props">
          <el-button size="mini" @click="handleEdit(props.$index,props.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(props.$index,props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑话题信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:60%;">
        <el-form-item label="话题id" :label-width="formLabelWidth">
          <span>{{form.creatime}}</span>
        </el-form-item>
        <el-form-item label="话题名称" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="创建者" :label-width="formLabelWidth">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="话题标签" :label-width="formLabelWidth">
          <el-input v-model="form.tag"></el-input>
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
      return row.tag === value;
    },
    filterHot(value, row) {
      return row.read >= value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.formindex = index;
    },
    handleDelete(index, row) {
      this.$alert("确认要删除该话题？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.talks.splice(index, 1);
          this.$message({
            message: "删除话题成功",
            type: "success"
          });
        }
      });
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
    sure(form) {
      this.$alert("确认要编辑该话题信息？", "确认编辑", {
        confirmButtonText: "确定",
        callback: action => {
          this.talks.splice(this.formindex, 1, form);
          this.dialogFormVisible = false;
          this.$message({
            message: "修改话题成功",
            type: "success"
          });
        }
      });
    },
    create(form) {
      this.$alert("确认要创建该话题信息？", "确认创建", {
        confirmButtonText: "确定",
        callback: action => {
          this.dialogFormVisible = false;
          this.$store.commit("addTalkFromAdmin", form);
          this.creatform = {
            creatime: "",
            author: "",
            title: "",
            intro: "",
            tag: "",
            photo: "img/upload.jpg",
            read: 0,
            arts: []
          },
            this.$message({
              message: "添加活动成功",
              type: "success"
            });
        }
      });
    },
    addact() {
      this.form = this.creatform;
      this.form.creatime = Date.now();
      this.dialogFormVisible = true;
      this.update = false;
    }
  }
};
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