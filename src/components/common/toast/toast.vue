<template>
  <div class='toast' v-show="istrue"><div >{{message}}</div></div>
</template>

<script>
export default {
  name:'toast',
  props:{
    /*message:{
      type:String,
      default:''
    },
    istrue:{
      type:Boolean,
      default:false
    }*/
  },
  data(){
    return{
      message:'',
      istrue:false

    }
  },
  methods:{
    show(message='默认值',duration=2000){
      this.message=message
      this.istrue=true
      setTimeout(()=>{
   this.istrue=false
   this.message=''
      },duration)
      
    }
  }

}
</script>

<style scoped>
.toast{
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
 color:#fff;
  background-color:rgba(0, 0, 0, 0.7);
  font-size: 18px;
}
</style>