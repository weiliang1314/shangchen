<template>
  <div class="goods-item" @click='itemclick'>
    <img :src="showimage" alt="" @load="imageload">
    <div class="goods-info">
      <p >{{goodItem.title}}</p>
      <span class="price">￥{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>

</template>

<script>
    export default {
        name: "GoodListItem",
        props:{
            goodItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed:{
          showimage(){
            //首页图片数据护详情页图片数据
            return this.goodItem.image||this.goodItem.show.img
          }
        },
        methods:{
          imageload(){
            this.$bus.$emit('itemimageload')
          },
          itemclick(){
          //  console.log('dhah')
          //路由跳转传入路由iid
          this.$router.push('/detall/'+this.goodItem.iid)
          }

}
    }
</script>


<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-tint);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
