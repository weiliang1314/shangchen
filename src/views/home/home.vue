<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
  <tabcontrol  :titles="['流行','新款','精选']" ref="tabcon1" @tabclicks='tabclicks' class='tab-con' v-show="istabfixed"></tabcontrol>
  <scroller class='content' ref='scro' :probe-type='3' @scroll='contionscroll'
   :pull-up-load="true" @pullingUp='loadmore'>   
    <homeswiper :banners="banners" @swiperimage='swiperimage'/>
    <homerecommends :recommends="recommends"/>
    <featureview/>
    <tabcontrol  :titles="['流行','新款','精选']" ref="tabcon" @tabclicks='tabclicks' ></tabcontrol>
    <goods-list :goods="showgood" class="goods"/>
   
  </scroller>
  <!--组件无法直接添加监听，需要加修饰符-->
  <backtop @click.native='backclick' v-show="showbacktop"/>
  
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar';
import {homedata,getgoods} from 'network/home';
import BScroll from 'better-scroll'

//import swiper from 'components/common/swiper/swiper';
//import swiperitem from 'components/common/swiper/swiperitem';

import homeswiper from './chlid/homeswiper';
import homerecommends from './chlid/homerecommends'
import featureview from './chlid/featureview';
import tabcontrol from 'components/content/tabcontrol/tabcontrol'
import GoodsList from 'components/content/good/GoodsList'
import scroller from 'components/common/scroller/scroller'
import backtop from 'components/content/backtop/backtop'

export default {
  name:"home",
  components:{
    navbar,
    homeswiper,
    homerecommends,
    featureview,
    tabcontrol,
    GoodsList,
    scroller,
    backtop,
  },
  //保存请求到的数据
  data(){
    return{
      //result保存数据，避免被垃圾回收
     // result:null,
    banners:[],
    recommends:[],
    //首页商品数据的保存
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    currentype:'pop',
    showbacktop:false,
    taboffsettop:0,   
    istabfixed:false, 
    saveY:0,
    //首页与详情页监听全局事件抽离的保存
    itemlist:null
    }
  }, 
  //用生命周期函数发送网络请求
  created(){
//请求多个数据
this.homedata()
//首页商品数据的请求
this.getgoods('pop')
this.getgoods('new')
this.getgoods('sell')
  },
  mounted(){//图片加载监听,在main.js中给$bus赋值,解决图片在加载时，向下滚动出现滚不下去的问题，做一次刷新计算现在滚动的高度
 /*将refresh传入debounce生成一个新的函数，调用频繁的时候使用新的函数，
 就不会频繁调用，如果下一次执行很快就会将上一次取消（clearTimeout(timer)）*/
 const refresh=this.debounce(this.$refs.scro.refresh,100)
 //对全局监听事件进行保存
this.itemlist=()=>{
refresh()}
//
this.$bus.$on('itemimageload',/*()=>{
//this.$refs.scro.refresh()
//refresh()
}*/this.itemlist)



},
//记录离开首页时的状态和位置
/*activated(){
  
  this.$refs.scro.scrollTo(0,this.saveY,0)
  this.$refs.scro.refresh()
},*/
//离开时的状态位置
deactivated(){
  //this.saveY=this.$refs.scro.getscroy()
  //取消全局监听事件
  this.$bus.$off('itemimageload',this.itemlist)
},
  computed:{
    showgood(){
      //首页商品数据点击切换
      return this.goods[this.currentype].list
    }
  },
  methods:{
    //网络请求方法
  homedata() { homedata().then(res=>{
  console.log(res);
  //this.result=res
  this.banners=res.data.banner.list
  this.recommends=res.data.recommend.list
  
})},
//商品数据网络请求
getgoods(type){
  const page=this.goods[type].page+1
getgoods(type,page).then(res=>{
  console.log(res)
 
this.goods[type].list.push(...res.data.list)
this.goods[type].page+=1;

this.$refs.scro.finishPullUp()
})
},//事件监听方法，点击切换商品数据
  tabclicks(index){
switch(index){
  case 0:
    this.currentype='pop'
    break;
  case 1:
    this.currentype='new'
    break;
  case 2:
    this.currentype='sell'
    break;
    
}
//首页流行、新款、流行选择一致解决
this.$refs.tabcon1.current=index
this.$refs.tabcon.current=index
  },
  //回到顶部
  backclick(){
    this.$refs.scro.scrollTo(0,0)
     
  },
  
contionscroll(position){
  //console.log(position)当滚动的位置大于1000显示向上的箭头
  this.showbacktop=(-position.y)>1000
  //滚动到一定距离吸顶效果
  this.istabfixed=(-position.y)>this.taboffsettop
},
//上拉加载更多的数据
loadmore(){
this.getgoods(this.currentype);
//解决图片在加载时，向下滚动出现滚不下去的问题，做一次刷新计算现在滚动的高度
//this.$refs.scro.scroll.refresh()
},
//防抖函数：防止refresh()刷新频繁
debounce(func,delay){
  let timer=null;
  return function(...args){
    if(timer) clearTimeout(timer)
      timer=setTimeout(()=>{
        func.apply(this,args)
      },delay)
    
  }

},
swiperimage(){
  //获取商品分类组件的offsettop(距离上边)
this.taboffsettop=this.$refs.tabcon.$el.offsetTop
}

  }

}
</script>

<style>
#home{
 /* padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color:var(--color-tint) ;
  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 8;*/
 
}

/*.goods{
  margin-bottom: 45px;
}*/
/*.content{
  height: calc(100%-93px);
  overflow: hidden;
}*/
/**使用定位让中间的页面固定在中间 */
.content{
  
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 54px;
  left: 0;
  right: 0;
  
}
.tab-con{
  position: relative;
  z-index: 8;
}

</style>