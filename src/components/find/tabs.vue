<!-- 标签页面 -->
<template>
  <div class="tabs-container">
    <div class="ticai">
      <div class="title">
        <span id="name">题材</span>
        <span id="all">选择你喜欢</span>
      </div>
      <div class="main">
        <div class="row" v-for="(rows,index) in ticais1" :key="index">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="card"
            v-for="(col,i) in rows"
            :key="i"
          >
            <a @click="gettabs(col.tab)">
              <img :src="col.img" alt width="150px" height="150px">
              <div class="zhe">
                <span>{{col.tab}}</span>
              </div>
            </a>
          </el-card>
        </div>
      </div>
    </div>
    <div class="fengge">
      <div class="title">
        <span id="name">风格</span>
        <span id="all">选择你喜欢</span>
      </div>
      <div class="main">
        <div class="row" v-for="(rows,index) in ticais2" :key="index">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="card"
            v-for="(col,i) in rows"
            :key="i"
          >
            <a @click="gettabs(col.tab)">
              <img :src="col.img" alt width="150px" height="150px">
              <div class="zhe">
                <span>{{col.tab}}</span>
              </div>
            </a>
          </el-card>
        </div>
      </div>
    </div>
    <div class="qicai">
      <div class="title">
        <span id="name">器材</span>
        <span id="all">选择你喜欢</span>
      </div>
      <div class="main">
        <div class="row" v-for="rows in ticais3" :key="rows">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="card"
            v-for="col in rows"
            :key="col"
          >
            <a @click="gettabs(col.tab)">
              <img :src="col.img" alt width="150px" height="150px">
              <div class="zhe">
                <span>{{col.tab}}</span>
              </div>
            </a>
          </el-card>
        </div>
      </div>
    </div>
    <div class="place">
      <div class="title">
        <span id="name">地区</span>
        <span id="all">选择你喜欢</span>
      </div>
      <div class="main">
        <div class="row" v-for="rows in ticais4" :key="rows">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="card"
            v-for="col in rows"
            :key="col"
          >
            <a @click="gettabs(col.tab)">
              <img :src="col.img" alt width="150px" height="150px">
              <div class="zhe">
                <span>{{col.tab}}</span>
              </div>
            </a>
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
      ticais: [
        ["风光", "人像", "城市", "纪实", "旅行"],
        ["街拍", "夜景", "少女", "写真", "人文"],
        ["宠物", "光影", "静物", "花卉", "建筑"]
      ],
      ticais1: [
        [
          { tab: "城市", img: "img/风格1/城市/1.jpg" },
          { tab: "儿童", img: "img/风格1/儿童/1.jpg" },
          { tab: "风光", img: "img/风格1/风光/1.jpg" },
          { tab: "花卉", img: "img/风格1/花卉/1.jpg" },
          { tab: "自然", img: "img/风格1/自然/1.jpg" }
        ],
        [
          { tab: "建筑", img: "img/风格1/建筑/1.jpg" },
          { tab: "街拍", img: "img/风格1/街拍/1.jpg" },
          { tab: "静物", img: "img/风格1/静物/1.jpg" },
          { tab: "旅行", img: "img/风格1/旅行/1.jpg" },
          { tab: "美食", img: "img/风格1/美食/1.jpg" }
        ],
        [
          { tab: "男生", img: "img/风格1/男生/1.jpg" },
          { tab: "人文", img: "img/风格1/人文/1.jpg" },
          { tab: "人像", img: "img/风格1/人像/1.jpg" },
          { tab: "少女", img: "img/风格1/少女/1.jpg" },
          { tab: "夜景", img: "img/风格1/夜景/1.jpg" }
        ]
      ],
      ticais2: [
        [
          { tab: "黑白", img: "img/风格/黑白/1.jpg" },
          { tab: "极简", img: "img/风格/极简/1.jpg" },
          { tab: "情绪", img: "img/风格/情绪/1.jpg" },
          { tab: "日系", img: "img/风格/日系/1.jpg" },
          { tab: "色彩", img: "img/风格/色彩/1.jpg" }
        ],
        [
          { tab: "时尚", img: "img/风格/时尚/1.jpg" },
          { tab: "微距", img: "img/风格/微距/1.jpg" },
          { tab: "唯美", img: "img/风格/唯美/1.jpg" },
          { tab: "小清新", img: "img/风格/小清新/1.jpg" },
          { tab: "抓拍", img: "img/风格/抓拍/1.jpg" }
        ]
      ],
      ticais3: [
        [
          { tab: "佳能", img: "img/器材/佳能/1.jpg" },
          { tab: "尼康", img: "img/器材/尼康/1.jpg" },
          { tab: "富士", img: "img/器材/富士/1.jpg" },
          { tab: "索尼", img: "img/器材/索尼/1.jpg" },
          { tab: "宾得", img: "img/器材/宾得/1.jpg" }
        ],
        [
          { tab: "徕卡", img: "img/器材/徕卡/1.jpg" },
          { tab: "手机", img: "img/器材/手机/1.jpg" },
          { tab: "奥林巴斯", img: "img/器材/奥林巴斯/1.jpg" },
          { tab: "胶片", img: "img/器材/胶片/1.jpg" },
          { tab: "广角", img: "img/器材/广角/1.jpg" }
        ]
      ],
      ticais4: [
        [
          { tab: "北京", img: "img/地区/北京/1.jpg" },
          { tab: "成都", img: "img/地区/成都/1.jpg" },
          { tab: "广州", img: "img/地区/广州/1.jpg" },
          { tab: "南京", img: "img/地区/南京/1.jpg" },
          { tab: "日本", img: "img/地区/日本/1.jpg" }
        ],
        [
          { tab: "厦门", img: "img/地区/厦门/1.jpg" },
          { tab: "上海", img: "img/地区/上海/1.jpg" },
          { tab: "深圳", img: "img/地区/深圳/1.jpg" },
          { tab: "台湾", img: "img/地区/台湾/1.jpg" },
          { tab: "武汉", img: "img/地区/武汉/1.jpg" }
        ],
        [
          { tab: "香港", img: "img/地区/香港/1.jpg" },
          { tab: "新疆", img: "img/地区/新疆/1.jpg" },
          { tab: "云南", img: "img/地区/云南/1.jpg" },
          { tab: "重庆", img: "img/地区/重庆/1.jpg" },
          { tab: "其他", img: "img/地区/其他/1.jpg" }
        ]
      ],
      tabs: []
    };
  },
  computed: {
    imgLists() {
      return this.$store.state.imgLists;
    }
  },

  methods: {
    gettabs(tab) {
      this.imgLists.forEach(el => {
        if (el.tags.includes(tab)) {
          this.tabs.unshift(el);
        }
      });
      this.$store.commit("gettabsimg", tab);
      this.$router.push({ name: "onetabs", params: { tabname: tab } });
    }
  }
};
</script>
<style lang='scss' scoped>
.tabs-container {
  margin: 50px 200px;
  .title {
    height: 50px;
    #name {
      font-size: 40px;
      letter-spacing: 5px;
    }
    #all {
      font-size: 18px;
      margin-left: 20px;
      color: #909399;
      letter-spacing: 3px;
    }
  }
  .main {
    margin-bottom: 100px;
    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .card {
        position: relative;
        height: 150px;
        .zhe {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.2);
          span {
            font-size: 20px;
            letter-spacing: 2px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>