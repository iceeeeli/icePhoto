<<<<<<< HEAD
# icePhoto
基于vue.js的摄影师社交平台网站


=======
# 摄影爱好者交流社区平台

## 前端总框架vue.js+element
   使用element:
   1,安装 npm install element-ui -S
   2,在入口文件导入 import 并注册  vue.use()
   
## 后台数据交互axios 

## 状态管理器 vuex

## 组件路由 vue-router

## 业务逻辑
    1，一级导航：首页，图库，社区，供稿
       图库：共享图库 优选图库 更多（卖图，意见反馈）
       社区：首页，活动，发现，交流，更多

    2，首页页面：整体介绍整个平台
                顶部区域：一级导航，搜索框
                内容区域：社区（热门作品，热门活动），供稿
                底部区域：合作品牌，关于我们

## 项目结构
    入门文件：main.js 路由文件：router.js app.vue
    组件文件夹 components: home:home.vue
                          photoWarehouse:
                          community:community.vue
                                    activity.vue
                          find:tag.vue
                               photographers.vue
                               tutorial.vue
                               equipment.vue
                          communication:
                          more:
                          provideWork
              subcomponents:footer.vue
                            photoinfo.vue
                            
## 响应式导航栏设计：
   1，调用element-ui的nav组件->点击每一项，传值data,再实现激活高亮
   2，布局用的bootstrap的相应式布局， 
      2.1 在页面缩小为手机屏幕时，会溢出最右边元素
      2.2 解决方案：调用element的类，当屏幕为xs,sm时隐藏起来 需要在main.js导入css文件 再在元素类名中
          加 hidden-xs-only hidden-sm-only
                                


       


## 重点：
    1，获取本地图片资源并上传后台服务器
    2，从后台获取图片资源并展示在页面

## 关于element-ui navmenu中下拉菜单的图标，如何修改或去除
   1，在node_modules中找到element/bin/index.css
   2，找到.el-icon-arrow-down:before 并修改它即可

## 实现从图片数组对象一行取3个slice（）
    1，把获取到的资源数组放入一个二维数组中
    2，在页面遍历二维数组

    另一个问题：如何把喜欢的图片和文章一起显示
    1，文章涉及需要的：
    a 路由地址 b 标题 c 简介 d 作者 e 阅读量 f 喜欢 h 评价 i 图片
    2，图片信息所需要：
    a 路由地址 b 张数 c 作者 d 喜欢 e 评论 f图片
    3，长板原则：让文章作为长板，图片满足
    4，把获取到自己喜欢的文章id和图片id同时放入一个数组中 数组的concat方法
    5，以时间降序去遍历数组
    
    问题：如何把文章和图片一起放入一个数组并按时间排序
    1，把两个数组合在一起，按时间排序
    2，按时间排序：array.sort(a,b)=>a-b 小于0，a排在签名 
    date.prase(time)会把时间转化为1970/1/1至今的毫秒数
    p13.sort(function(a,b){
                     return Date.parse(b.time) - Date.parse(a.time);//时间正序
    });
    
>>>>>>> 项目第一次提交
