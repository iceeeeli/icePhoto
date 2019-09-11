<!-- 意见反馈列表 -->
<template>
  <div>
    <h3>意见反馈列表</h3>
    <br>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="advices"
      style="width: 100%"
      max-height="600"
      highlight-current-row
      @current-change="handleCurrentChange"
      stripe
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="意见ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.creatime }}</span>
            </el-form-item>
            <el-form-item label="发送者">
              <span>{{ props.row.fromid }}</span>
            </el-form-item><br>
            <el-form-item label="意见标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <br>
            <el-form-item label="意见内容">
              <span>{{ props.row.content}}</span>
            </el-form-item><br>
            <el-form-item label="是否已回复">
              <span>{{ props.row.ifcheck}}</span>
            </el-form-item>
            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="意见ID" sortable prop="id" width="150"></el-table-column>
      <el-table-column
      prop="creatime"
      label="创建时间"
      sortable
      width="180"
      column-key="creatime"
      :filters="[{text: '2019-05-01', value: '2019-05-01'}, {text: '2019-05-02', value: '2019-05-02'}, {text: '2019-05-03', value: '2019-05-03'}, {text: '2019-05-04', value: '2019-05-04'}]"
      :filter-method="filterHandler"
    >
      </el-table-column>
      <el-table-column label="创建者" width="100" prop="fromid"></el-table-column>
      <el-table-column label="标题" width="200" prop="title"></el-table-column>
      <el-table-column fixed="right" width="250">
        <template slot="header">
          <span>操作</span>
        </template>
        <template slot-scope="props">
          <el-button size="mini" @click="handleBack(props.$index,props.row)" v-if="!props.row.ifcheck">回复</el-button>
          <el-button size="mini" @click="handleBacked(props.$index,props.row)" v-else disabled>已回复</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(props.$index,props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog title="发布通知" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:60%;">
        <el-form-item label="通知ID" :label-width="formLabelWidth">
          <span>{{form.creatime}}</span>
        </el-form-item>
        <el-form-item label="通知者" :label-width="formLabelWidth">
          <el-input v-model="form.fromid"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" :label-width="formLabelWidth">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="被通知者" :label-width="formLabelWidth">
          <el-input v-model="form.toid"></el-input>
        </el-form-item>
        <el-form-item label="通知类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" clearable placeholder="请选择">
            <el-option v-for="(item,i) in types" :key="i" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传附图" :label-width="formLabelWidth" class="groupicon">
          <img :src="photo" alt width="148px" height="148px" class="groupicon1">
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
        <el-button type="primary" @click="create(form)" >确 定</el-button>
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
        fromid: "system",
        toid: "",
        intro: "",
        content: "",
        type: "系统通知",
        ifread:false
      },
      photo: "img/upload.jpg",
      update: true,
      types: ["系统通知", "活动通知"],
      tousers: ["所有用户", "某一指定用户"],
      touser: "所有用户"
    };
  },
  computed: {
    advices() {
      return this.$store.state.Notice.advices;
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
    handleBack(index, row) {
      // this.dialogFormVisible = true;
      // this.form = row;
      this.formindex = index;
      var toid=row.fromid
      this.addact(toid)
    },
    handleDelete(index, row) {
      this.$alert("确认要删除该意见？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.advices.splice(index, 1);
          this.$message({
            message: "删除意见成功",
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
      this.$alert("确认要创建该通知信息？", "确认创建", {
        confirmButtonText: "确定",
        callback: action => {
          var i=this.formindex
          this.$store.commit("addNoticeFromAdmin", form);
          this.$store.commit("checkAdvice", i);
          // this.advices[this.formindex].ifcheck=true
          this.dialogFormVisible = false;
          // if (this.touser === "所有用户") {
          //   this.users.forEach(el => {
          //     if (el.ifnotice) {
          //       let date = new Date();
          //       let strDate = date
          //         .toLocaleString()
          //         .replace(/[年月]/g, "-")
          //         .replace(/[日上下午]/g, "");
          //       var form1 = {
          //         creatime: strDate,
          //         fromid: form.fromid,
          //         toid: "",
          //         intro: form.intro,
          //         content: form.content,
          //         type: form.type
          //       };
          //       form1.toid = el.name;
          //       console.log(form1);
          //       this.$store.commit("addNoticeFromAdmin", form1);
          //     }
          //   });
          // } else {
          //   this.$store.commit("addNoticeFromAdmin", form);
          // }
          this.creatform = {
            creatime: "",
            fromid: "system",
            toid: "",
            intro: "",
            content: "",
            type: "系统通知"
          },
            this.$message({
              message: "发布通知成功",
              type: "success"
            });
        }
      });
    },
    addact(toid) {
      this.form = this.creatform;
      this.form.creatime = Date.now();
      this.form.toid=toid
      this.dialogFormVisible = true;
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