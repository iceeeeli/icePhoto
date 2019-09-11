<!-- 我的资料 -->
<template>
  <div class="mydata-container">
    <el-card shadow="always" :body-style="{ padding: '0px' }" class="base">
      <div class="face">
        <img :src="photo" alt width="150px" height="150px">
        <br>
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
          <el-button type="warning" plain>更换头像</el-button>
        </el-upload>
      </div>
      <div class="left">
        <span id="base-title">真实信息</span>
        <el-form ref="form" :model="form" label-width="100px" class="base-form">
          <el-form-item label="真实姓名">
            <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex">
              <el-option label="男" value="boy"></el-option>
              <el-option label="女" value="girl"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.intro" placeholder="请输入个人简介"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="form.place" placeholder="请选择">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '0px' }" class="base">
      <div class="left">
        <span id="base-title">联系信息</span>
        <br>
        <span id="base-title1">有时候会寄送纪念品，绝对不会泄露你的联系信息</span>
        <el-form ref="callform" :model="callform" label-width="100px" class="base-form">
          <el-form-item label="邮政编码">
            <el-input v-model="callform.yzcode"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="callform.address"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input v-model="callform.qqnum"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="callform.telephone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="callform.idcard" placeholder="比赛奖金发放时需要身份证号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
        date1: "",
        intro: "",
        place: ""
      },
      cities: [
        {
          value: "Beijing",
          label: "北京"
        },
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Nanjing",
          label: "南京"
        },
        {
          value: "Chengdu",
          label: "成都"
        },
        {
          value: "Shenzhen",
          label: "深圳"
        },
        {
          value: "Guangzhou",
          label: "广州"
        }
      ],
      callform: {
        yzcode: "",
        address: "",
        qqnum: "",
        telephone: "",
        idcard: ""
      },
      userid: "",
      photo:''
    };
  },
  computed: {
    usermess() {
      return this.$store.state.Userlists.oneUserMess;
    },
  },
  created() {
    this.getMyMess();
    this.info()
  },

  methods: {
    getMyMess() {
      this.userid = localStorage.getItem("userid");
      this.$store.commit("getUserMess", this.userid);
    },
    info(){
      this.form.name=this.usermess.realname
      this.form.sex=this.usermess.sex
      this.form.date1=this.usermess.birth
      this.form.intro=this.usermess.intro
      this.form.place=this.usermess.city
      this.callform.yzcode=this.usermess.postcode
      this.callform.address=this.usermess.address
      this.callform.qqnum=this.usermess.qq
      this.callform.telephone=this.usermess.phone
      this.callform.idcard=this.usermess.IDcard
      this.photo=this.usermess.touxaing
      console.log(this.callform)
    },
    handleAvatarSuccess(res, file, fileList) {
      this.photo=res.data
      var id=this.usermess.userid
      this.$store.commit('updateTouxiang',{id:id,photo:res.data})
      this.$notify({
        title: "成功",
        message: "更改头像成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    submit(){
      this.$notify({
        title: "成功",
        message: "修改资料成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.mydata-container {
  margin: 20px 200px;
  .base {
    position: relative;
    margin-top: 50px;
    .face {
      position: absolute;
      top: 100px;
      right: 50px;
      text-align: center;
    }
    .left {
      width: 50%;
      padding: 50px;
      #base-title {
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 3px;
      }
      #base-title1 {
        font-size: 16px;
        line-height: 40px;
        letter-spacing: 3px;
      }
      .base-form {
        margin-top: 40px;
      }
    }
  }
}
</style>