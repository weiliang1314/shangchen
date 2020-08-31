<template>

  <div class="tabitem" @click="itemclick">
    <div v-if="!isactive"> <slot name="item-img"></slot></div>
    <div v-else><slot name="item-img-s"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
    

   <!-- <img src="../../assets/img/tab/首页-选中.png"><div>首页</div>-->
    </div>
     
</template>

<script>
export default {
  name:"tabs",
  props:{
    path:String,
    activecolor:{
      type:String,
      //默认颜色
      default:'red'
    }
  },
  data(){
    return{
      //isactive:true
    }
  },
  computed:{
    //动态控制颜色变化
    isactive(){
      return this.$route.path.indexOf(this.path)!==-1;
    },
    //控制字体颜色
    activestyle(){
      return this.isactive?{color:this.activecolor}:{}
    }
  },
methods:{
  itemclick(){
    //点击跳转
    this.$router.replace(this.path)
  }
}
}
</script>

<style>
.tabitem {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    
}
.tabitem img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;

}
/*.active{
  color: red;
}*/
</style>