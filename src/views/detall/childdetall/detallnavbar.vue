<template>
  <div><navbar ><div slot="center" class='title'>
    <div v-for="(item,index) in titles" class="titleitem" :class="{active:index===current}" @click="detallclick(index)">
    {{item}}</div>
  </div>
  <div slot="left" class="back" @click='backclick'><img src="~assets/img/common/back.svg"></div></navbar></div>
</template>

<script>
import navbar from 'components/common/navbar/navbar';
export default {
  name:'detallnavbar',
  components:{
    navbar,
  },
  data(){
    return{
      titles:['商品','评论','参数','推荐']  ,
      current:0  }
  },
  methods:{
    detallclick(index){
      this.current=index
      this.$emit('titleclick',index)
    },
    backclick(){
      //点击返回
      this.$router.back()
    }
  }

}
</script>

<style>
.title{
  display: flex;
  color: black;
}
.titleitem{
  flex: 1;
}
.active{
  color:var(--color-tint)
}
.back img{
  margin-top: 11px;
}
</style>