import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'//打入路由包
import router from '@/routes/router'
import './lib/css/mui.css'//导入mui组件库
import './lib/css/icons-extra.css'
import ElementUI from 'element-ui';//导入element框架
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/icon/iconfont.css';//引入阿里图标库css
import './assets/icon/iconfont.js'
import './assets/icon/symnolall.css'
import Viewer from 'v-viewer'//实现图片放大缩小
import 'viewerjs/dist/viewer.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
import store from './store'//引入store


import VueQuillEditor  from 'vue-quill-editor'//引入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor);

import EXIF from 'exif-js'//引入exif-js获取图片exif元数据，光圈值等
Vue.prototype.EXIF = EXIF


import axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.$axios=axios

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(preview)


Vue.use(VueRouter)
// Vue.use(ElementUI);
Vue.use(ElementUI, {  zIndex: 10000 });
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
      zIndex: 9999
  }
})


Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: c => c(App),
  components:{
    
  }
  
})
