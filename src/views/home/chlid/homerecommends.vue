<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommenditem">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
name:'hoemrecommends',
props:{
  recommends:{
    type:Array,
    default(){
      return []
    }
  }
}
}
</script>

<style>
.recommends{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 15px 0 20px;
  border-bottom: 8px solid #eee;
  
 
  
}
.recommenditem{
  flex: 1;
 
}
.recommenditem img{
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>