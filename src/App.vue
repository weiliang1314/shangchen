<template>
  <div id="app">
    <tab class="tab">
    <tabs path="/home" activecolor="red"> <img slot="item-img" src="~assets/img/tab/首页-选中.png"> 
    <img slot="item-img-s" src="~assets/img/tab/首页.png"><div slot="item-text">首页</div></tabs>
     <tabs path="/fen"><img slot="item-img" src="./assets/img/tab/分类-选中.png">
     <img slot="item-img-s" src="~assets/img/tab/分类.png"><div slot="item-text">分类</div></tabs>
     <tabs path="/by"><img slot="item-img" src="./assets/img/tab/g.png">
     <img slot="item-img-s" src="~assets/img/tab/gs.png"><div slot="item-text">购物车</div></tabs>
      <tabs path="/profile"><img slot="item-img" src="~assets/img/tab/w.png">
      <img slot="item-img-s" src="~assets/img/tab/ws.png"><div slot="item-text">我的</div></tabs>
  </tab>
  <!--保持原来状态,把点击首页图片跳转到的详情页除外-->
  <keep-alive exclude="detall"><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import tab from 'components/common/tabbar/tab'
import tabs from 'components/common/tabbar/tabs'

export default {
  name: 'App',
  components: {
    tab,
    tabs
  }
}
</script>

<style>
@import "./assets/css/base.css";
.tab{
  z-index: 8;
}
</style>
