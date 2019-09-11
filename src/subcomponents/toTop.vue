
<template>
   <transition name="el-fade-in">
    <div
      class="page-up"
      @click.prevent="backTop"
      v-show="btnFlag"
    >
      <i class="el-icon-caret-top"></i>
    </div>
   </transition>
  
</template>


<script>
export default {
  name: "app-to-top",
  data() {
    return {
      btnFlag: true
    };
  },
  methods: {
    
     
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
  backTop () {
      let that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
  },
 
  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  scrollToTop () {
    let that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 300) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  }

  },
  mounted () {
  window.addEventListener('scroll', this.scrollToTop)
},
destroyed () {
  window.removeEventListener('scroll', this.scrollToTop)
},

};
</script>

<style scoped lang="scss">
.page-up {
  background-color: #909399;
  position: fixed;
  right: 50px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 9000;
  .el-icon-caret-top {
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  p {
    display: none;
    text-align: center;
    color: #fff;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
