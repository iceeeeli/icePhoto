<!-- 上传组件 -->
<template>
  <div>
   <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/upload"
        method="post"
        enctype="multipart/form-data"
        :on-success="handleAvatarSuccess"
        list-type="picture-card"
        :auto-upload="true"
      >
        <img src="@/assets/icon1/upload1.svg" alt="上传文件" v-if="afterpost">
        <img src="@/assets/icon1/upload2.svg" alt="上传成功" v-else>
        <div slot="tip" class="el-upload__tip" v-if="afterpost">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      afterpost: true,
      imageUrl: ''
    };
  },
  methods: {
     handleAvatarSuccess(res, file, fileList) {
      this.afterpost = false;
      this.$store.commit('artimg',res.data)
      // this.imageUrl = res.data
      // console.log(this.imageUrl)
      this.$notify({
        title: "成功",
        message: "上传图片成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    }
  },
  props: ["tips"]
};
</script>
<style lang='scss' scoped>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 158px;
    height: 158px;
    display: block;
  }
</style>