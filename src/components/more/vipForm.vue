<!-- 签约表单 -->
<template>
  <div>
    <div class="header">
      <el-card class="vipform">
        <h3>签约及信息完善</h3>
        <br>
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="真实姓名">
            <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="居住地址">
            <el-input v-model="form.address" placeholder="请输入居住地址"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.idcard" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证件照" class="idphoto">
             <el-upload
          class="upload-demo"
          ref="upload"
          action="/api/upload"
          method="post"
          enctype="multipart/form-data"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :auto-upload="true"
        >
           <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i><br>
  <span>请上传身份证正面</span>
        </el-upload>
         <el-upload
          class="upload-demo"
          ref="upload"
          action="/api/upload"
          method="post"
          enctype="multipart/form-data"
          :on-success="handleAvatarSuccess1"
          :show-file-list="false"
          :auto-upload="true"
        >
           <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i><br>
  <span>请上传身份证背面</span>
        </el-upload>
            <!-- <upload-photo tips="身份证正面"></upload-photo>
            <upload-photo tips="身份证背面"></upload-photo> -->
          </el-form-item>
           <el-form-item label="5张以上作品" class="idphoto">
            <el-upload
            class="upload-demo"
            ref="upload"             
           action="/api/upload"
           method="post"
           enctype="multipart/form-data"    
            :on-success="handleAvatarSuccess2"        
            list-type="picture-card"
            :file-list="fileList"
            :auto-upload="true"
            :multiple="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.checked">仔细检查信息，并同意</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import UploadPhoto from '@/subcomponents/upload.vue'
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
        address: "",
        idcard: "",
        idphoto: [],
        myphoto: "",
        checked: false
      },
       imageUrl: 'img/idzhen.png',
       imageUrl1: 'img/idzhen.png',
       fileList:[],
    };
  },
  components:{UploadPhoto},
  methods: {
    onSubmit() {
       this.$alert("确认信息无误？", "确认", {
        confirmButtonText: "确定",
        callback: action => {
          var userid=localStorage.getItem('userid')
          this.$store.commit('setVip',userid)
          this.$message({
            message:'发送成功',
            type:'success'
          })
        }
       })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      this.imageUrl=res.data
      // var id=this.userid
      // this.$store.commit('updateBcg',{id:id,photo:res.data})
      this.$notify({
        title: "成功",
        message: "上传图片成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
     handleAvatarSuccess1(res, file, fileList) {
      this.imageUrl1=res.data
      // var id=this.userid
      // this.$store.commit('updateBcg',{id:id,photo:res.data})
      this.$notify({
        title: "成功",
        message: "上传图片成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },

    handleAvatarSuccess2(res, file, fileList) {
      this.$store.commit('sendImgList',res.data) 
      // this.imageUrl = res.data 
      // console.log(this.imageUrl)
      this.$notify({
          title: '成功',
          message: '上传图片成功',
          type: 'success',
          offset: 80,
          duration:1500
        }); 
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  height: auto;
  background-color: #ebeef5;
  position: relative;
  padding-top: 60px;
  padding-bottom: 60px;
  .vipform {
    width: 50%;
    margin: 0 auto;
    .idphoto{
      div{
        display: inline-block;
        margin-right: 25px;
        margin-bottom: 25px;
      }
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    height: 178px;
    width: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    height: 178px;
    display: block;
  }
</style>