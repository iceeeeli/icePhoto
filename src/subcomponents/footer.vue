<template>
  <div class="footer-container">
    <el-col :span="24" style="padding:50px 120px;height:300px;background-color:#eee; margin-bottom: -300px;">
      <h3>关于我们</h3>
      <p>在这里，发现基于共同兴趣的同好，
        鼓励原创和分享精神<br>
        除了美好的摄影和技能，我们更在意影像背后价值观的认同
      </p>
      
      <ul >
        <li> ice</li>
        <li>用户手册&nbsp; |</li>
        <li>版权政策&nbsp; |</li>
        <li>帮助&nbsp; |</li>
        <li>关于&nbsp; |</li>
        <li>服务&nbsp; |</li>
        <li>联系&nbsp; |</li>
        <li>加入我们</li>
      </ul>
    </el-col>
    
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
h3{
  text-decoration:underline;
}
p{
  margin-top:40px;
  line-height: 30px;
}
ul{
  list-style:none;
  padding-inline-start:0px;
  margin-top:20px;
  li{
    display:inline-block;
    vertical-align: top;
    padding-right: 20px;
  }
}
</style>
