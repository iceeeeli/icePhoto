<!-- 文章编辑 -->
<template>
  <div class="uploadart">
    <el-col :span="18" :offset="3">
      <span class="art">文章标题</span>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <span class="art">请选择一张背景图</span>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/upload"
        method="post"
        enctype="multipart/form-data"
        :on-success="handleAvatarSuccess"
        list-type="picture"
        :auto-upload="true"
      >
        <img src="@/assets/icon1/upload1.svg" alt="上传文件" v-if="afterpost">
        <img src="@/assets/icon1/upload2.svg" alt="上传成功" v-else>
        <div slot="tip" class="el-upload__tip" v-if="afterpost">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span class="art">文章内容</span>
      <quill-editor
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
      <div class="limit" ref="foot">
        当前已输入
        <span>{{nowLength}}</span> 个字符，您还可以输入
        <span>{{SurplusLength}}</span> 个字符。
        <!-- <button @click="sendart">发送</button> -->
      </div>
      <!-- <el-button type="primary" style=" margin-top:10px">发布</el-button> -->
    </el-col>
    
  </div>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"]
];
export default {
  data() {
    return {
      title:'',
      content: "",
      editorOption: {},
      SurplusLength: "5000",
      afterpost: true
    };
  },
  computed: {
    nowLength() {
      return this.content.replace(/<.+?>/g, "").length;
    }
  },
  created() {
    this.$store.commit("hidefoot");
    this.$store.commit("sendart");
  },
  methods: {
    //   onEditorChange({editor, html, text}) {
    //     console.log("---内容改变事件---")
    //     this.content = html
    //     console.log(html)
    //   },
    //   富文本图片上传前
    //   beforeUpload() {
    //     显示loading动画
    //     this.quillUpdateImg = true
    //   },

    //   uploadSuccess(res, file) {
    //     res为图片服务器返回的数据
    //     获取富文本组件实例
    //     console.log(res);
    //     let quill = this.$refs.myQuillEditor.quill
    //     如果上传成功
    //     if (res.code == 200 ) {
    //       获取光标所在位置
    //       let length = quill.getSelection().index;
    //       插入图片  res.url为服务器返回的图片地址
    //       quill.insertEmbed(length, 'image', res.url)
    //       调整光标到最后
    //       quill.setSelection(length + 1)
    //     } else {
    //       this.$message.error('图片插入失败')
    //     }
    //     loading动画消失
    //     this.quillUpdateImg = false
    //   },
    //   富文本图片上传失败
    //   uploadError() {
    //     loading动画消失
    //     this.quillUpdateImg = false
    //     this.$message.error('图片插入失败')
    //   }
    // }
    onEditorBlur(editor) {
      //失去焦点事件
    },
    onEditorFocus(editor) {
      //获得焦点事件
    },
    onEditorChange({ editor, html, text }) {
      //编辑器文本发生变化
      //this.content可以实时获取到当前编辑器内的文本内容
      
    },
    sendart(){
      this.$store.commit("addart",this.content)
    },
    handleAvatarSuccess(res, file, fileList) {
      this.afterpost = false;
      this.$refs.foot.style.bottom="-290px"
      this.$store.commit("addart",{content:this.content,title:this.title})
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
  }
};
</script>

<style lang="scss" scoped>
.uploadart {
  margin-top: 50px;
  margin-bottom: 1000px;
}
.quill-editor {
  height: 550px;

  .ql-container {
    height: 650px;
  }
}
.limit {
  position: absolute;
  height: 40px;
  width: 847px;
  bottom: -201px;
  background-color: #fff;
  border: 1px solid #ccc;
  line-height: 40px;
  text-align: right;
  span {
    color: black;
  }
}
.el-button {
  display: block;
  margin: 5px auto;
  margin-top: 1500px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  letter-spacing: 3px;
}
.avatar-uploader {
  height: 5px;
}
.art {
  display: block;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  margin-top: 10px;
}

.ql-snow .ql-editor img {
  max-width: 480px;
}

.ql-editor .ql-video {
  max-width: 480px;
}
img {
  cursor: pointer;
  transition: all 0.6s;
}
img:hover {
  transform: scale(1.4);
}
</style>