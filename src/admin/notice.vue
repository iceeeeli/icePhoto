<!-- 意见反馈列表 -->
<template>
  <div>
    <h3>通知列表</h3>
    <br>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-button @click="addnotice">添加通知</el-button>
    <el-table
      ref="filterTable"
      :data="notices"
      style="width: 100%"
      max-height="100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      stripe
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="通知类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <br>
            <el-form-item label="通知ID">
              <span>{{ props.row.creatime }}</span>
            </el-form-item>
            <el-form-item label="通知者">
              <span>{{ props.row.fromid }}</span>
            </el-form-item>
            <el-form-item label="被通知者">
              <span>{{ props.row.toid }}</span>
            </el-form-item>
            <br>
            <el-form-item label="通知内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <br>
            <el-form-item label="备注">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="通知ID" sortable prop="creatime" width="150"></el-table-column>
      <el-table-column label="通知者" width="100" prop="fromid"></el-table-column>
      <el-table-column label="被通知者" width="180" prop="toid"></el-table-column>
      <el-table-column label="通知内容" width="180" prop="content"></el-table-column>
      <el-table-column
        prop="type"
        label="通知类型"
        width="150"
        :filters="[{ text: '系统通知', value: '系统通知' }, { text: '群通知', value: '群通知' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === '系统通知' ? 'warning' : 'success'"
            disable-transitions
          >{{scope.row.type}}</el-tag>
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
          <el-select v-model="touser" clearable placeholder="请选择">
            <el-option v-for="(item,i) in tousers" :key="i" :label="item" :value="item"></el-option>
          </el-select>
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
        fromid: "",
        toid: "",
        intro: "",
        content: "",
        type: "系统通知"
      },
      photo: "img/upload.jpg",
      update: true,
      types: ["系统通知", "活动通知"],
      tousers: ["所有用户", "某一指定用户"],
      touser: "所有用户"
    };
  },
  computed: {
    users() {
      return this.$store.state.Userlists.userMessages;
    },
    notices() {
      return this.$store.state.Notice.notices;
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
      return row.type === value;
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
      this.$alert("确认要删除该通知？", "确认删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.notices.splice(index, 1);
          this.$message({
            message: "删除通知成功",
            type: "success"
          });
        }
      });
    },
    handleAvatarSuccess(res, file, fileList) {
      this.ifupload = false;
      this.photo = res.data;

      this.$notify({
        title: "成功",
        message: "上传图片成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },

    create(form) {
      this.$alert("确认要创建该通知信息？", "确认创建", {
        confirmButtonText: "确定",
        callback: action => {
          this.dialogFormVisible = false;
          if (this.touser === "所有用户") {
            this.users.forEach(el => {
              if (el.ifnotice) {
                let date = new Date();
                let strDate = date
                  .toLocaleString()
                  .replace(/[年月]/g, "-")
                  .replace(/[日上下午]/g, "");
                var form1 = {
                  creatime: strDate,
                  fromid: form.fromid,
                  toid: "",
                  intro: form.intro,
                  content: form.content,
                  type: form.type,
                  ifread:false
                };
                form1.toid = el.username;
                console.log(form1);
                this.$store.commit("addNoticeFromAdmin", form1);
              }
            });
          } else {
            this.$store.commit("addNoticeFromAdmin", form);
          }
          this.creatform = {
            creatime: "",
            fromid: "",
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
    addnotice() {
      let date = new Date();
      let strDate = date
        .toLocaleString()
        .replace(/[年月]/g, "-")
        .replace(/[日上下午]/g, "");
      this.form = this.creatform;
      this.form.creatime = strDate;
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