<!-- 群设置 -->
<template>
  <div>
    <el-card shadow="always" :body-style="	{ padding: '20px' }" class="mess">
      <h3 style="margin:10px auto 20px 10px;">群资料</h3>
      <el-form label-width="80px">
        <el-form-item label="小组名称">
          <el-input v-model="formLabelAlign.name" :placeholder="groupinfo.name" v-if="admin"></el-input>
          <el-input
            v-model="formLabelAlign.name"
            :placeholder="groupinfo.name"
            v-else
            :disabled="true"
          ></el-input>
          <br>
          <span>名称应当明确指出小组定位，过于诗意的名字不容易让人理解</span>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="formLabelAlign.intro" placeholder="请输入小组简介" v-if="admin"></el-input>
          <el-input v-model="formLabelAlign.intro" placeholder="请输入小组简介" v-else :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地方">
          <el-input v-model="formLabelAlign.city" placeholder="请输入小组所在地方" v-if="admin"></el-input>
          <el-input v-model="formLabelAlign.city" placeholder="请输入小组所在地方" v-else :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="主题">
          <el-input v-model="formLabelAlign.tab" placeholder="请输入题材或风格" v-if="admin"></el-input>
          <el-input v-model="formLabelAlign.tab" placeholder="请输入题材或风格" v-else :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="群头像" class="groupicon">
          <img :src="photo" alt width="148px" height="148px" class="groupicon1">
          <div class="zhezhao">
            <!-- <img src="@/assets/icon1/upload2.svg" alt="上传文件" title="编辑群头像" @click="update"> -->
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
              <label>编辑头像</label>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="updatemess" v-if="usertype" round plain>保存</el-button>
        </el-form-item>
        <br>
        <el-form-item label="通知">
          <el-input
            v-model="formLabelAlign.tell"
            type="textarea"
            placeholder="请输入要通知的内容"
            v-if="admin"
          ></el-input>
          <el-input
            v-model="formLabelAlign.tell"
            type="textarea"
            placeholder="请输入要通知的内容"
            v-else
            :disabled="true"
          ></el-input>
          <br>
          <el-switch
            v-model="userlist.iftell"
            active-text="是否接受群通知"
            v-if="outgroup"
            @change="iftell"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="sendtellcont" v-if="sendtell" round plain>确认发布</el-button>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="info" @click.prevent="dialogTableVisible = true" v-if="updategroup" round plain>转让群主</el-button>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="danger" @click.prevent="delgroup" v-if="outgroup">删除并退出该群</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="管理员列表" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
     <el-table-column property="type" label="权限" width="80"></el-table-column>
    <el-table-column property="name" label="名称" width="100"></el-table-column>
    <el-table-column property="city" label="城市" width="100"></el-table-column>
    <el-table-column property="intotime" label="加入时间" width="120"></el-table-column>
     <el-table-column property="intro" label="个性签名" width="100"></el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">转让群主</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="delcreater" v-if="del">确 定</el-button>
    <el-button type="primary" @click="dialogTableVisible = false" v-else>确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import UpLoad from "@/subcomponents/uploadface.vue";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      photo: "img/风格1/夜景/1.jpg",
      formLabelAlign: {
        name: "",
        intro: "",
        city: "",
        tab: "",
        tell: "",
        afterpost: true,
        succ: false,
        imageUrl: ""
      },
      admin: false,
      ifupload: true,
      to: 1,
      usertype: true,
      sendtell: true,
      outgroup: true,
      updategroup:false,
      value3: true,
      gridData: [],
      dialogTableVisible: false,
      del:false
    };
  },
  components: {
    UpLoad
  },
  props: ["groupinfo", "type", "userlist"],
  mounted() {
    this.ifadmin();
    this.getson();
    this.showadmin()
  },
  methods: {
    ifadmin() {
      var username = localStorage.getItem("localuser");
      if (this.type == "群主") {
        this.admin = true;
        this.updategroup=true
      }else if(this.type == "管理员"){
this.admin = true;

      } 
      else if (this.type == "成员") {
        this.ifupload = false;
        this.usertype = false;
        this.sendtell = false;
      } else {
        this.ifupload = false;
        this.usertype = false;
        this.sendtell = false;
        this.outgroup = false;
      }
    },
    getson() {
      this.formLabelAlign.name = this.groupinfo.name;
      this.formLabelAlign.intro = this.groupinfo.intro;
      this.formLabelAlign.city = this.groupinfo.city;
      this.formLabelAlign.tab = this.groupinfo.tab;
      this.photo = this.groupinfo.photo;
      this.formLabelAlign.tell = this.groupinfo.tell;
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
    updatemess() {
      var groupid = this.groupinfo.creatime;
      var name = this.formLabelAlign.name;
      var intro = this.formLabelAlign.intro;
      var city = this.formLabelAlign.city;
      var tab = this.formLabelAlign.tab;
      var src = this.photo;
      this.$store.commit("updateGroupMess", {
        id: groupid,
        name: name,
        intro: intro,
        city: city,
        tab: tab,
        src: src
      });
      this.$notify({
        title: "成功",
        message: "编辑资料成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    sendtellcont() {
      var groupid = this.groupinfo.creatime;
      var tell = this.formLabelAlign.tell;
      this.$store.commit("sendtell", {
        id: groupid,
        content: tell
      });
      var username=localStorage.getItem('localuser')
      this.$store.commit('getMySystemNotices1',username)
      this.$notify({
        title: "成功",
        message: "发布通知成功！",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    iftell() {
      var groupid = this.groupinfo.creatime;
      var iftelled = this.userlist.iftell;
      this.$store.commit("iftell", {
        id: groupid,
        telled: iftelled
      });
      this.$notify({
        title: "成功",
        message: "修改通知成功！",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    showadmin(){
      this.gridData=this.groupinfo.admin
    },
    handleClick(row) {
    var groupid = this.groupinfo.creatime;
    var oldcreater=this.userlist
        if(row.type=="群主"){
          this.$message({
          message: '已经是群主，不需要转让',
          type: 'warning'
        });
        }else{
          this.$store.commit("updateCreater", {
            id: groupid,
            admin: row,
            oldadmin:oldcreater
          });
          this.type="管理员"
          this.$message({
          message: '转让群主成功!',
          type: 'success'
        });
        }
      },
      delcreater(){
        var groupid = this.groupinfo.creatime;
    var oldcreater=this.userlist
        this.$store.commit("delcreater", {
            id: groupid,
            admin: oldcreater,
          });
          this.dialogTableVisible = false
          this.$notify({
            title: "成功",
            message: "删除并退出小组成功！",
            type: "success",
            offset: 80,
            duration: 1500
          });
           this.$router.push("/home/group");
      },
    delgroup() {
      var groupid = this.groupinfo.creatime;
      var deluser = this.userlist;
      this.$alert("确认要退出该小组吗？不再考虑考虑？", "删除并退出该小组", {
        confirmButtonText: "确定",
        callback: action => {
          if(this.type=="群主"){
            this.dialogTableVisible = true
            this.del=true
          }else if(this.type=="管理员"){
            this.$store.commit("delGroupAdmin", {
            id: groupid,
            deluser: deluser
          });
          this.$store.commit("delGroup", {
            id: groupid,
            deluser: deluser
          });
           this.$notify({
            title: "成功",
            message: "删除并退出小组成功！",
            type: "success",
            offset: 80,
            duration: 1500
          });
          this.$router.push("/home/group");
          
          }else{
             
            this.$store.commit("delGroup", {
            id: groupid,
            deluser: deluser
          });
           this.$notify({
            title: "成功",
            message: "删除并退出小组成功！",
            type: "success",
            offset: 80,
            duration: 1500
          });
          this.$router.push("/home/group");
          }
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.mess {
  width: 70%;
  .el-form {
    margin: 30px 30px;
    .groupicon {
      position: relative;
      width: 228px;
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
  }
}
</style>