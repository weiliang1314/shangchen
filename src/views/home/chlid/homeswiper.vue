<template>
<div>
  <swiper>
      <swiperitem v-for="item in banners">
           <a :href="item.link"><img :src="item.image" @load='imageload'></a>
      </swiperitem>
    </swiper>
</div>
</template>

<script>
import {swiper,swiperitem} from 'components/common/swiper'
export default {
name:'homeswiper',
props:{
  banners:{
    type:Array,
    default(){
      return []
    }
  }
},
data(){
  return {
 isload:false
  }
},
components:{
  swiper,
  swiperitem
},
methods:{
  imageload(){
    //监听轮播图片加载完没有
    //只需发一次就可以
    if(!this.isload){
    this.$emit('swiperimage')
    this.isload=true
    }
  }
}
}
</script>

<style>

</style>