<template>
  <div class="tabcon">
<div v-for="(item,index) in titles" class='tabconitem' :class="{active:index===current}" @click='tabclick(index)'>
  <span>{{item}}</span>
</div>
  </div>
</template>

<script>
export default {
name:'tabcontrol',
props:{
  titles:{
    tyep:Array,
    default(){
      return []
    }
  }
},
data(){
  return{
    current:0
  }
},
methods:{
  tabclick(index){
    this.current=index
    this.$emit('tabclicks',index)
  }
}
}
</script>

<style>
.tabcon{
  display: flex;
  text-align: center;
  font-size: 17px;
  background-color: #eee;
}
.tabconitem{
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tabconitem span{
  padding: 4px;
}
.active{
  color:var(--color-tint)
}
.active span{
  border-bottom: 2px solid var(--color-tint);
}
</style>