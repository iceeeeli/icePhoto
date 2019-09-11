<!-- 关于我们 -->
<template>
  <div class="about-container">
      <el-card class="about-card">
         <h3>关于我们</h3><br>
         <h4>初衷</h4><br>
         <p>在这里，发现基于共同兴趣的爱好，鼓励原创和分享精神</p>
         <p>除了美好的摄影和技能，我们更在意影响背后价值观的认同</p><br>
         <h4>商务合作</h4><br>
         <p>联系人：李秉奇</p>
         <p>手机：13527602794</p>
         <p>邮箱：13527602794@163.com</p><br>
         <h4>用户反馈</h4><br>
         <p>邮箱：13527602794@163.com</p>
      </el-card>
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
.about-container{
    width:100%;
    height:650px;
    background-image:url('../../images/5.png');
    background-size: 100% auto;
    background-repeat:no-repeat;
    padding-top:50px;
    .about-card{
        width:50%;
        margin:0 auto;
    }
}
</style>