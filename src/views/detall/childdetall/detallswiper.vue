<template>
 
<swiper class="detall-swiper">
  <swiperitem v-for='item in topImages' class='swiper-item'>
    <img :src='item'>
  </swiperitem>
</swiper>
  
</template>

<script>
import {swiper,swiperitem} from 'components/common/swiper'
export default {
  name:'detallswiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    swiper,
    swiperitem
  }

}
</script>

<style>
.detall-swiper{
  height: 300px;
  overflow: hidden;
}
</style>