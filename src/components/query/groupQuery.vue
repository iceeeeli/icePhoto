<!-- ss -->
<template>
  <div>
    <div class="group-cards" >
      <div class="row" v-for="(cols,i) in rows" :key="i">
        <div class="group" v-for="col in cols" :key="col.creatime" style="height:110px;">
          <el-card shadow="hover" :body-style="	{ padding: '10px' }">
            <img :src="col.photo" alt width="80px" height="80px" @click.prevent="groupinto(col)">
            <div class="right">
              <span id="gtitle">{{col.name}}</span>
              <span id="gnum">{{col.user.length}}位成员</span>
              <br>
              <span id="gcon">{{col.intro}}</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows:[]
    };
  },
  computed: {
    grouplists() {
      return this.$store.state.Query.queryGroup;
    }
  },
  mounted() {
    this.getrows(this.grouplists);
  },
  methods: {
    getrows(groups) {
      this.rows = [];
      var rowNum = parseInt(Math.ceil(groups.length / 3));
      var n = 0;
      for (var i = 0; i < rowNum; i++) {
        var start = i * 3;
        var end = start + 3;
        this.rows.push(groups.slice(start, end));
      }
      return;
    },
    groupinto(g) {
      this.$router.push({ name: "onegroup", params: g });
    }
  }
};
</script>
<style lang='scss' scoped>
.group-cards {
  margin: 50px 0;
  .row {
    display: flex;
    justify-content: space-around;
    width: 90%;
    height: 100px;
    margin: 40px 0;
    margin-left: 60px;
    .group {
      width: 30%;
      height: 110px;
      border: 1px solid #303133;
      .right {
        display: inline-block;
        position: absolute;
        margin-top: 15px;
        margin-left: 20px;
        #gtitle {
        }
        #gnum {
          margin-left: 30px;
        }
        #gcon {
          line-height: 50px;
        }
      }
    }
  }
}
</style>