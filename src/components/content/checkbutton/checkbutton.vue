<template>
  <div class='check' :class="{checks:ischeck}">
    <img src='~assets/img/cart/tick.svg'>
  </div>
</template>

<script>
export default {
name:'checkbutton',
props:{
  ischeck:{
    type:Boolean,
    default:false
  }
}
}
</script>

<style>
.check{
  background-color: burlywood;
  border-radius: 50%;
}
.checks{
  background-color: red;
}
</style>