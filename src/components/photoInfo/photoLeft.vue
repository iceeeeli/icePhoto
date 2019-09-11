<template>
  <div>
    <div class="header">
      <img src="@/assets/icon1/quanping.svg" alt="全屏展示" title="全屏展示" style="width:20px;" id="tt">
      <span style="color:#fff;font-size:24px;">{{page}}/{{allphoto}}</span>
      <div class="other">
         <a :href="imageList.src[0]" style="color:#fff;" download="" v-if="showload">
          <i class="el-icon-download" title="下载图片" alt="下载图片"></i></a>
      <img
        src="@/assets/icon1/close.svg"
        alt="关闭"
        title="关闭"
        style="width:20px;"
        @click="back"
      >
      </div>
    

    </div>
    <div class="showphoto" style="height:700px;">
      <el-carousel :autoplay="false" trigger="click" height="700px" @change="handleChange">
        <el-carousel-item v-for="(img,index) in imageList.src" :key="index" style="text-align:center;">
          <img
            :src="img"
            alt
            preview="actPre"
            preview-text=""
            height="600px"
            style="margin-top:20px;"
            ref="photoData"
          >
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actPre: "1",
      cards: [],
      photoData: {
        id: "",
        Make: "",
        time: "",
        artpure: "",
        shutspeed: "",
        ISO: ""
      },
      photoDatas: [],
      images: [
        {
          src: require("@/images/about.jpg"),
          id: 1
        },
        {
          src: require("@/images/2.jpg"),
          id: 2
        },
        {
          src: require("@/images/3.jpg"),
          id: 3
        },
        {
          src: require("@/images/4.jpg"),
          id: 4
        },
        {
          src: require("@/images/5.jpg"),
          id: 5
        },
        {
          src: require("@/images/1.jpg"),
          id: 6
        }
      ],
      page:'',
      showload:false
    };
  },
  props:["id","users"],
  computed:{
    imageList(){
      return this.$store.state.imgList
    },
    allphoto(){
      return this.$store.state.imgList.src.length
    },
    fromGroup(){
      return this.$store.state.Group.oneGroup
    }
  },
  created: function() {
     this.$store.commit('imglist',this.id)
    this. getPhotoData(0)
    this.checkupload()
  },
  mounted: function() {
    this.changeRow();
  },

  methods: {
    checkupload(){
      var myid=localStorage.getItem('userid')
      if( this.users.focusupload){
        console.log("同意下载")
        this.users.myfans.some(el=>{
        if(el.userid==myid){
          console.log("关注了")
          this.showload=true
        }
      })
      }  
    },
    changeRow() {
      var rowNum = parseInt(Math.ceil(this.images.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var rowList = [];
        n = i * 3;
        for (var j = n; j < n + 3; j++) {
          rowList.push(this.images[j]);
        }
        this.cards.push(rowList);
      }
      return;
    },
    back() {
      if(this.fromGroup.length!=0){//判断是否来自小组里的动态
      console.log("是来自小组的")
        var g=this.fromGroup
        this.$router.push({name:'onegroup',params:g})
      }else{
        this.$router.go(-1);
      }
      
    },
      handleChange(selVal){
        console.log(selVal)
        this.page=selVal+1
        this.getPhotoData(selVal)
      },
    getPhotoData(i) {
      var length = this.images.length;
      const _this = this;
      this.$nextTick(() => {
          var date = new Object();
          this.EXIF.getData(this.$refs.photoData[i], function() {
            date.Make = _this.EXIF.getTag(this, "Make");
            date.Model = _this.EXIF.getTag(this, "Model");
            date.artpure = _this.EXIF.getTag(this, "FNumber");
            date.shutspeed = _this.EXIF.getTag(this, "ExposureTime");
            date.ISO = _this.EXIF.getTag(this, "ISOSpeedRatings");
            date.time = _this.EXIF.getTag(this, "DateTimeOriginal");
            date.jintou = _this.EXIF.getTag(this, "undefined");
            _this.photoDatas.push(date);
            // date=_this.EXIF.pretty(this);
            _this.photoDatas.push(date);
            if(typeof(date.Make) == "undefined"){
              date={Make:"SONY",Model:"ICLE6000",artpure:"1.8",shutspeed:"100",ISO:"400",time:"",jintou:"E 50mm F1.8 OSS"}
            }else{
               _this.sendDate(date)
            }
          });
        
      });
    },
    sendDate(date) {
      this.$emit("photoDates", date);
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  margin: 0 20px;
  .other{
    a{
      color: rgb(255, 255, 255);
    font-size: 25px;
    margin-right: 20px;
    cursor: pointer;
    }
    img {
    cursor: pointer;
    transition: all 0.6s;
  }
  img:hover {
    transform: scale(1.4);
  }
  }
  
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
</style>