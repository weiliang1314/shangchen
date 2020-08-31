<template>
  <div class='cart-list'>
    <listitem v-for='(item,index) in cartlist' :item-info='item' :key='index'></listitem>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import listitem from './listitem'

export default {
name:'cartlist',
computed:{
  ...mapGetters(['cartlist'])
},
components:{
 listitem,
},

}
</script>

<style>


</style>