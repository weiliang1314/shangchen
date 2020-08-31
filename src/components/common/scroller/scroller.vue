<template>
<!--ref绑定在元素上this.$refs.名字获取的就是元素对象，绑定到组件上获取的就是组件对象-->
  <div class='wrapper' ref='wrapper'>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "scroller",
        props:{
          probeType:{
            type:Number,
            default:0
          },
          pullUpLoad:{
            type:Boolean,
            default:false
          }
        },
        data() {
            return {
               scroll:null 
            }
        },
        //接收父组件来的值
        
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
              probeType:this.probeType,
              click:true,
              pullUpLoad:this.pullUpLoad

            })
          
            //this.scroll.scrollTo(0,0)
            //监听箭头图标的显示与隐藏,滚动的位置变化
            this.scroll.on('scroll', (postion) => {
               //console.log(postion);
                this.$emit('scroll', postion)
            })
                //监听上拉事件
                this.scroll.on('pullingUp',()=>{
                 // console.log("jiazai")
                  this.$emit('pullingUp',)
                })
            },
        methods:{
          //监听点击箭头回到开始
            scrollTo(x, y, time=1000) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp(){
  this.scroll.finishPullUp()
},
            refresh(){
              //先做一个判断scroll有木有值，再加载
              
             this.scroll&&this.scroll.refresh()
           }
        },
        getscroy(){
          return this.scroll?this.scroll.y:0
        }
        ,
        }
           /* this.scroll.on('scroll', (postion) => {
                //console.log(postion);
                this.$emit('scroll', postion)
            })

        },
        methods:{
            scrollTo(x, y, time=300) {
                this.scroll.scrollTo(0, 0, time)
            },

        }*/
    
</script>

<style scoped>

</style>
