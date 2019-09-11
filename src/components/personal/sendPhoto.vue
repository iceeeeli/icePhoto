<template>
  <div class="uploadimg">
    <el-row :gutter="20">
      <el-col :span="24" >
        <el-card class="box-card">
          <el-upload
            class="upload-demo"
            ref="upload"             
           action="/api/upload"
           method="post"
           enctype="multipart/form-data"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"        
            :on-success="handleAvatarSuccess"        
            list-type="picture-card"
            :file-list="fileList"
            :auto-upload="true"
            :multiple="true"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-card>
        <p>{{imageUrl}}</p>
        <img :src="imageUrl" alt="">
        <!-- <div v-for="item in imgList.src" :key="item">
          <p>{{item}}</p>
          <img :src="imageUrl" alt="" width="100px">
        </div> -->
        
           <!-- <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >发送</el-button>
            <p>{{imageUrl}}</p> -->
            
           
            <!-- <p>{{photoData.Make}}</p>
            <p>{{photoData.time}}</p>
            <p>{{photoData.artpure}}</p>
            <p>{{photoData.shutspeed}}</p>
            <p>{{photoData.ISO}}</p>
            <img src="../../images/DSC00150.jpg" alt ref="photodata" > -->
        
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" width="650px" :modal=false>
          <img width="600px" :src="dialogImageUrl" alt  >
        </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      photoData:{
        Make: '',
        time: '',
        artpure: '',
        shutspeed:'',
        ISO: ''
      },
      fileList:[],
      imageUrl:''
    };
  },
  computed:{
    imgList(){
      return this.$store.state.sendImgList
    }
  },
  created:function(){
    this.$store.commit('hidefoot');
    this.$store.commit("sendphoto");
    const _this = this
    this.$nextTick(function(){
       this.EXIF.getData(this.$refs.photodata,function(){
        _this.photoData.Make=_this.EXIF.getTag(this,'Make')
        _this.photoData.time=_this.EXIF.getTag(this,'DateTimeOriginal')
        _this.photoData.artpure=_this.EXIF.getTag(this,'FNumber')
        _this.photoData.shutspeed=_this.EXIF.getTag(this,'ShutterSpeedValue')
        _this.photoData.ISO=_this.EXIF.getTag(this,'ISOSpeedRatings')
      
      });
    })
  },
  // created:function(){
  //   this.$store.commit("sendphoto");
  // },
  methods: {
     upload() {
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        
        const files=[];
        this.$refs.upload.uploadFiles.forEach(item => {
          files.push(item.raw)
        });
        console.log(files)
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        if (!file) { // 若未选择文件
          alert('请选择文件');
          return;
        }
        formData.append('files', files);
        
        this.$axios.post('/api/upload', formData, headerConfig).then(res => {
          
          
        })
      },

      changeFile(file, fileList) {
    // var This = this;  
    // var reader = new FileReader();
    // reader.readAsDataURL(file.raw);
    // reader.onload = function(e){ 
    //     this.result
    //     This.imageUrl = this.result;
    //     var length=this.result.length
    //     console.log(length)
    // }
    console.log(file.raw)
    console.log(fileList)
  },
    submitUpload() {
    if(!this.$refs.upload.uploadFiles[0]){
       this.$notify.error({
          title: '错误',
          message: '请选择图片！',
          offset: 80,
          duration:1500
        });
    }
      this.$refs.upload.submit();
    
    },
    handleRemove(file, fileList) {
     
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file, fileList) {
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
.uploadimg{
  margin-top:50px;
  margin-bottom:200px;
  .el-button{
    float: right;
    display: block;
    margin-top: 20px;
    width: 150px;
    height: 40px;
    font-size: 16px;
    letter-spacing: 5px;
    font-weight: bold;
  }
}
</style>