<template>
  <div>
    <p>测试1</p>
    <p v-for="(item,index) in users" :key="index">{{item.username}}</p>
  </div>
</template>

<script>
import ActSw from "@/subcomponents/ActSwiper.vue";
export default {
  data() {
    return {
      images: [
        {
          src: require("@/images/1.png"),
          id: 1
        },
        {
          src: require("@/images/2.png"),
          id: 2
        },
        {
          src: require("@/images/3.png"),
          id: 3
        },
        {
          src: require("@/images/2.png"),
          id: 4
        },
        {
          src: require("@/images/1.png"),
          id: 5
        },
        {
          src: require("@/images/3.png"),
          id: 6
        }
      ],
      users: ""
    };
  },
  mounted: function() {
    this.text();
    console.log(this.users);
  },
  methods: {
    text() {
      this.$axios
        .get("/api/users/all")
        .then(res => {
          this.users = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    ActSw
  }
};
</script>

<style lang="scss" scoped>
</style>

