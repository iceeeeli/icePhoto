<!-- 成员卡片 -->
<template>
  <div>
    <el-card shadow="hover" :body-style="	{ padding: '0px' }" class="per-card">
      <div class="face">
        <el-popover
          placement="left-start"
          width="300px"
          trigger="hover"
          style="border-shadow:5px 5px 5px 5px #eee; margin:0; padding:0;"
        >
          <author-card></author-card>
          <a href="#" slot="reference">
            <img :src="user.touxaing" alt width="50px" height="50px">
          </a>
        </el-popover>
      </div>
      <div class="main">
        <div class="author">
          <span>{{user.type}}</span>
          <input
            type="text"
            name
            id
            style="width:100px;height:25px;"
            v-if="update"
            v-model="updatename"
          >
          <span v-else>{{user.name}}</span>
        </div>
        <div class="time">
          <span>地点：</span>
          <span>{{user.city}}</span>
        </div>
        <div class="content">
          <span>{{user.intro}}</span>
        </div>
      </div>
      <div class="tabs">
        <el-button
          type="danger"
          size="mini"
          plain
          @click="removeuser(user)"
          ref="remove"
          disabled="true"
        >移除</el-button>
        <br>
        <el-button
          type="primary"
          size="mini"
          plain
          v-if="update"
          @click="succupdate()"
          ref="succ"
        >确认更改</el-button>
        <el-button
          type="primary"
          size="mini"
          plain
          @click.prevent="update1()"
          v-if="updated"
          ref="update"
          disabled="true"
        >编辑群名片</el-button>
        <br>

        <el-button
          type="warning"
          size="mini"
          plain
          @click="setadmin(user)"
          ref="setadmin"
          disabled="true"
        >设置为管理员</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import AuthorCard from "@/components/photoInfo/authorCard.vue";
export default {
  data() {
    return {
      update: false,
      updated: true,
      updatename: ""
    };
  },
  components: {
    AuthorCard
  },
  props: ["user", "groupid", "type"],
  mounted() {
    this.ifadmin();
  },
  methods: {
    ifadmin() {
      var username = localStorage.getItem("localuser");
      if (this.type == "群主") {
        this.$refs.remove.disabled = false;

        if (this.user.type == "群主" || this.user.type == "管理员") {
          this.$refs.setadmin.disabled = true;
        } else {
          this.$refs.setadmin.disabled = false;
        }
      } else if (this.type == "管理员") {
        if (this.user.type == "群主" || this.user.type == "管理员") {
          this.$refs.remove.disabled = true;
        } else {
          this.$refs.remove.disabled = false;
        }
      }
      if (this.user.name == username) {
        this.$refs.update.disabled = false;
      }
    },
    removeuser(user) {
      var groupid1 = this.groupid;
      this.$store.commit("removeGroupUser", { id: groupid1, per: user });
      this.$notify({
        title: "成功",
        message: "移除用户成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
      this.$emit("remove", user.userid);
    },
    update1() {
      this.update = true;
      this.updated = false;
    },
    succupdate() {
      var groupid1 = this.groupid;
      var userid = this.user.userid;
      var name = (this.user.name = this.updatename);
      this.update = false;
      this.updated = true;
      this.$store.commit("updateusername", {
        id: groupid1,
        perid: userid,
        name: name
      });
      this.$notify({
        title: "成功",
        message: "编辑群名片成功",
        type: "success",
        offset: 80,
        duration: 1500
      });
    },
    setadmin(user) {
      var groupid1 = this.groupid;
      var userid = this.user.userid;
      this.$alert(
        "确认设置该成员为管理员？其将有一定权力管理该小组",
        "设置管理员",
        {
          confirmButtonText: "确定",
          callback: action => {
            this.user.type = "管理员";
            this.$store.commit("setadmin", { id: groupid1, perid: userid });
            this.$notify({
              title: "成功",
              message: "设置该成员为管理员成功！",
              type: "success",
              offset: 80,
              duration: 1500
            });
          }
        }
      );
    }
  }
};
</script>
<style lang='scss' scoped>
.per-card {
  position: relative;
  height: 120px;
  .face {
    float: left;
    width: 90px;
    height: 100px;
    padding: 20px 20px;
    img {
      box-shadow: 1px 1px 2px 2px #eee;
    }
  }
  .main {
    padding: 20px 20px;
    .author {
      span {
        font-size: 16px;
        letter-spacing: 2px;
        font-weight: bold;
      }
    }
    .time {
      margin: 2px 0;
      span {
        font-size: 13px;
        letter-spacing: 1.5px;
        color: #5e5e5e;
      }
    }
    .content {
      margin: 5px 0;
      span {
        font-size: 14px;
        letter-spacing: 1.5px;
        padding-right: 20px;
      }
    }
  }
  .tabs {
    position: absolute;

    right: 10px;
    top: 10px;
    text-align: center;
    .el-button {
      margin-bottom: 8px;
    }
  }
}
</style>