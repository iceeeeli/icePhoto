<!-- 自定义按钮组件 -->
<template>
  <div>
    <button
      type="button"
      class="mui-btn mui-btn-warning mui-btn-outlined"
      style="width:100%"
    >{{buttonTitle}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['buttonTitle'],
  methods: {
    DownPhoto(){
      
    }
  }
};
</script>
<style lang='scss' scoped>
button:hover{
    background-color: rgb(12, 12, 12);
    color: #fff;
}
</style>