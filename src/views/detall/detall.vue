<template>
  <div id='detall'>
   <detallnavbar class="detallnav" @titleclick='titleclick' ref='nav'></detallnavbar>
   <detallbottom @addtocart='addtocart'></detallbottom>
   <scroller class="content" ref='scroll' :probe-type='3' @scroll='contentscroll'>
     
   <detallswiper :top-images='topImages'></detallswiper>
   <detail-base-info :goods="goods"></detail-base-info>
   <detail-shop-info :shop="shop"></detail-shop-info>
   <detail-goods-info :detail-info="detailInfo" @imageLoad='imageLoad'></detail-goods-info>
   <detail-param-info :param-info='paraminfo' ref='param'></detail-param-info>
   <!--<detail-comment-info :comment-info='commentinfo'></detail-comment-info>-->
   <goods-list :goods='recommend' ref='recomm'/>
   
   
   
   </scroller>
   <backtop @click.native='backclick' v-show="showbacktop"/>
   <toast />
  </div>
  
 
</template>

<script>
import detallnavbar from './childdetall/detallnavbar';
import {getdetall,Goods,Shop,GoodsParam,getrecommend} from 'network/detall';
import detallswiper from './childdetall/detallswiper';
import DetailBaseInfo from './childdetall/DetailBaseInfo';
import DetailShopInfo from './childdetall/DetailShopInfo';
import scroller from 'components/common/scroller/scroller';
import DetailGoodsInfo from './childdetall/DetailGoodsInfo';
import DetailParamInfo from './childdetall/DetailParamInfo';
//import DateilCommentInfo from './childdetall/DetailCommentInfo';
import GoodsList from 'components/content/good/GoodsList';
import {debounce} from 'common/utits'
import detallbottom from './childdetall/detallbottom'
import backtop from 'components/content/backtop/backtop'
import toast from 'components/common/toast/toast'
import {mapGetters} from 'vuex'
//混入不进去
//import {itemlistmixin} from 'common/mixin'
export default {
name:'detall',
components:{
  detallnavbar,
  detallswiper,
  DetailBaseInfo,
  DetailShopInfo,
  scroller,
  DetailGoodsInfo ,
  DetailParamInfo,
 //DetailCommentInfo,
 GoodsList,
 detallbottom,
 backtop,
 toast,
  
  
},
//minixs:[itemlistmixin],
data(){
  return{
    iid:null,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paraminfo:{},
    commentinfo:{},
    recommend:[],
     itemlist:null,
     themtopy:[],
     gettopy:null,
     currentindex:0,
     showbacktop:false,
    // message:'',
     //show:false
  }
},
created(){
  //console.log(this.$route.params)
  this.iid=this.$route.params.iid
  //根据iid请求到数据详情，详情页的数据
  getdetall(this.iid).then(res=>{
    console.log(res)
    const datas=res.result
    //获取顶部轮播数据
    this.topImages=datas.itemInfo.topImages
    //获取商品信息，获得整合后复杂的数据
    this.goods=new Goods(datas.itemInfo,datas.columns,datas.shopInfo.services)
    //店铺数据的获取
    this.shop=new Shop(datas.shopInfo)
    //保存详情页的数据图片等
    this.detailInfo=datas.detailInfo
    //获取参数数据
    this.paraminfo=new GoodsParam(datas.itemParams.info,datas.itemParams.rule)
    //取出评论信息
    if(datas.rate.cRate!==0){
      this.commentinfo=datas.rate.list[0]||{}
    }


  });
 
  //详情页推荐数据
  getrecommend().then(res=>{
    console.log(res)
    this.recommend=res.data.list
  })
  //对点击标题滚动图片加载问题做防抖解决（防抖目前运用有点问题），图片加载完成后才能获取高度
this.gettopy=debounce(()=>{
  this.themtopy=[]
    this.themtopy.push(0)
     this.themtopy.push(2600)
    this.themtopy.push(this.$refs.param.$el.offsetTop)
   
    this.themtopy.push(this.$refs.recomm.$el.offsetTop)
    console.log(this.themtopy)

},60)
  
},
 mounted(){
    
   //防抖防止频繁的刷新
   /*let refresh=debounce(this.$refs.scroll.refresh,100)
   this.itemlist=()=>{
   refresh()}
this.$bus.$on('itemimageload',this.itemlist)
console.log('hhh')*/
  },
  //取消监听事件
  deatroyed(){this.$bus.$off('itemimageload',this.itemlist)},
  //根据标题获取相应内容距离顶部的高度,等到数据都渲染完成后才可以加载出来，在updatad函数中完成(会做两次更新，影响不大)或在created函数中
  //有this.$nextTick(=>{})把它放在里面,但这里仅仅是dom渲染完成图片不一定加载完成
  /*updated(){
    this.themtopy=[]
    this.themtopy.push(0)
    this.themtopy.push(this.$refs.param.$el.offsetTop)
    this.themtopy.push(10)
    this.themtopy.push(this.$refs.recomm.$el.offsetTop)
    console.log(this.themtopy)
  },*/
methods:{
  ...mapGetters(['addcart']),
  imageLoad(){
    //做一次刷新，解决滚动问题（用防抖有的有点问题，混入也有问题）
    this.$refs.scroll.refresh()
    //this.refreshs()
    this.gettopy()

  },
  titleclick(index){
console.log(index)
//点击标题滚动到相应位置
this.$refs.scroll.scrollTo(0,-this.themtopy[index],100)
  },
  //滚动到相应的内容，相应的标题就变红
  contentscroll(postion){
    const positiony=-postion.y
    let themlength=this.themtopy.length
    for(let i=0;i<themlength;i++){
   // if(positiony>this.themtopy[i]&&positiony<this.themtopy[i+1]){}
   //判断滚动区域的变化,在哪个区域之间
/**
 * 条件一：防止赋值过程过于频繁，this.currentindex!==i
 * 条件二：判断区间0和某个数字之间i<themlength-1&&positiony>=this.themtopy[i]&&positiony<this.themtopy[i+1]
 * 条件三：判断区间等于大于
 */
   if(this.currentindex!==i&&((i<themlength-1&&positiony>=this.themtopy[i]&&positiony<this.themtopy[i+1])||
   (i===themlength-1&&positiony>=
   this.themtopy[i]))){//console.log(i)
   //避免位置变化频繁刷新
   this.currentindex=i
   //console.log(this.currentindex)
   this.$refs.nav.current=this.currentindex
   }
    }
    //滚动到一定位置显示图标
     this.showbacktop=(-postion.y)>1000
  },
    //回到顶部
  backclick(){
    this.$refs.scroll.scrollTo(0,0)
     
  },
  addtocart(){
    //将商品加入购物车·
    //1、获取购物车展示的信息
    const product={}
    product.image=this.topImages[0]
    product.title=this.goods.title
    product.desc=this.goods.desc
    product.price=this.goods.lowNowPrice
    product.iid=this.iid
    //2、将商品加到购物车vuex
   // this.$store.commit('addcart',product)
   //actions-vuex调用
  this.$store.dispatch('addcart',product).then(res=>{
    /*this.show=true
    this.message=res
    setTimeout(()=>{
      this.show=false
      this.message=''
    },1500)*/
    this.$toasts.show(res,1500)

     
   })
   //通过映射也可以获得addcart,要在vuex文件夹store中把各个单独封装成模块
    /*this.addcart(product).then(res=>{
     console.log(res)
   })*/
    
  }
  
}


}
</script>

<style>
/*把原来下边首页。。。覆盖住 */
#detall{
  position: relative;
  
  background-color: #fff;
  height: 100vh;
}

/**使用定位让中间的页面固定在中间 */
.content{
  
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 54px;
  left: 0;
  right: 0;
  
}
/*
此方式定义中间滑动的高度不起作用
.content{
  height: calc(100%-44px);}*/
.detallnav{
  position: relative;
  z-index: 8;
  background-color: #fff;
}
</style>