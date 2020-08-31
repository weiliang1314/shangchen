<template>
  <div class='bottom-bar'>
    <div class='check-button'>
      <checkbutton class='checkcheck'  :ischeck="issekect" @click.native="checkclick"></checkbutton>
      <span>全选</span>
    </div>
    <div class='price'>
      合计：{{totalprice}}
    </div>
    <div class='calculate'>
      去结账：{{checklength}}
    </div>
  </div>
</template>

<script>
import checkbutton from 'components/content/checkbutton/checkbutton'
export default {
name:'checkbar',
props:{
 
},
components:{
  checkbutton,
},
computed:{
  //计算选中商品的总价格
  totalprice(){
    return '￥'+this.$store.state.cartlist.filter(item=>{
      return item.checked
      //reduce()方法为接收一个函数作为累加器，它为数组中依次回调执行的函数，prevalue为上一次回调返回的值item为当前处理的
    }).reduce((preValue,item)=>{
      return preValue+item.price*item.count
    },0).toFixed(2)
  },
  //计算选中的商品个数
  checklength(){
    return this.$store.state.cartlist.filter(item=>{return item.checked}).length
  },
  //全选按钮判断,购物车只要有一个没选择，全选按钮就不会红
  issekect(){
    if(this.$store.state.cartlist.length===0) return false
   // return !(this.$store.state.cartlist.filter(item=>!item.checked).length)
   //find数组的高阶函数性能更好
    return !this.$store.state.cartlist.find(item=>!item.checked)
    //遍历方法
    /*for(let item of this.$store.state.cartlist){
      if(!item.checked){
        return false
      }
    }
    return true*/
  }
},
methods: {
      checkclick(){
        //全部选中点击全部变为不选中
        if(this.issekect){
          this.$store.state.cartlist.forEach(item=>item.checked=false)
        }
        else{
          //部分或全部不选中
          this.$store.state.cartlist.forEach(item=>item.checked=true)
        }
        //
      }
    },
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  display: flex;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 53px;
  z-index: 8;
  line-height: 40px;
  font-size: 17px;
  
}
.check-button{
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 60px;
}
.checkcheck{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 6px;
}
.price{
  margin-left: 30px;
  flex: 1;
 
  font-weight: bold;
}
.calculate{
  width: 120px;
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
}
</style>