<!--  -->
<template>
  <div class="icon-container">
      <div class="shouru" style="text-align:center">
         <img src="@/assets/icon1/money.svg" alt="" height="60px"><br><br>
         <span>享有更多销售渠道</span>
         
      </div>
      <div class="quanwan" style="text-align:center">
 <img src="@/assets/icon1/share.svg" alt="" height="60px"><br><br>
         <span>全网维权通道</span>
      </div>
      <div class="vip" style="text-align:center">
 <img src="@/assets/icon1/vip.svg" alt="" height="60px"><br><br>
         <span>获得官方认证标识</span>
      </div>
      <div class="tuijian" style="text-align:center">
 <img src="@/assets/icon1/tuijian.svg" alt="" height="60px"><br><br>
         <span>获得更多推荐</span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
.icon-container{
    display: flex;
    justify-content: space-between;
    padding:60px 0;
    span{
        font-size: 16px;
        letter-spacing: 1.5px;
        color:white;
    }
}
</style>