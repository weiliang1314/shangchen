<template>
  <div class='by-cart'>
    <navbar class="nav-bars">
      <div slot="center">购物车({{cartlength}})</div>
    </navbar>
    <checkbar></checkbar>
    <scroller class='content' ref='scroll'><cartlist></cartlist></scroller>
    
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar';
import cartlist from './cartlist'
import {mapGetters} from 'vuex'
import scroller from 'components/common/scroller/scroller';
import checkbar from './checkbar';
export default {
  name:"by",
  components:{
    navbar,
    cartlist,
    scroller,
    checkbar,
  },
  computed:{
   /* cartlength(){
      return this.$store.getters.cartlength
    }*/
    ...mapGetters(['cartlength'])
  },
  activated(){
     //刷新解决添加新数据到购物车，滚动的问题
      this.$refs.scroll.refresh();
      
    }

}
</script>

<style>
.nav-bars{
  background-color: var(--color-tint);
  color:#fff
}
.by-cart{
  position: relative;
  height:100vh;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 54px;
  left: 0;
  right: 0;
  
}
</style>